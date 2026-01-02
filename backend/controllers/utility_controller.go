package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetUtilities(c *gin.Context) {
	var utilities []models.Utility
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Utility{})

	// Filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if utilityType := c.Query("type"); utilityType != "" {
		query = query.Where("type = ?", utilityType)
	}
	if location := c.Query("location"); location != "" {
		query = query.Where("location = ?", location)
	}
	if period := c.Query("period"); period != "" {
		query = query.Where("period = ?", period)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("date DESC").Find(&utilities)

	c.JSON(http.StatusOK, gin.H{
		"data":       utilities,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetUtility(c *gin.Context) {
	var utility models.Utility
	if err := config.DB.First(&utility, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Utility record not found"})
		return
	}
	c.JSON(http.StatusOK, utility)
}

func CreateUtility(c *gin.Context) {
	var utility models.Utility
	if err := c.ShouldBindJSON(&utility); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Calculate usage
	utility.Usage = utility.MeterEnd - utility.MeterStart

	if err := config.DB.Create(&utility).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, utility)
}

func UpdateUtility(c *gin.Context) {
	var utility models.Utility
	if err := config.DB.First(&utility, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Utility record not found"})
		return
	}

	if err := c.ShouldBindJSON(&utility); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Recalculate usage
	utility.Usage = utility.MeterEnd - utility.MeterStart

	config.DB.Save(&utility)
	c.JSON(http.StatusOK, utility)
}

func DeleteUtility(c *gin.Context) {
	var utility models.Utility
	if err := config.DB.First(&utility, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Utility record not found"})
		return
	}

	config.DB.Delete(&utility)
	c.JSON(http.StatusOK, gin.H{"message": "Utility record deleted successfully"})
}
