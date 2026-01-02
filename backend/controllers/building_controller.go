package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetBuildings(c *gin.Context) {
	var buildings []models.Building
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Building{})

	// Filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if ownership := c.Query("ownership"); ownership != "" {
		query = query.Where("ownership = ?", ownership)
	}
	if location := c.Query("location"); location != "" {
		query = query.Where("location ILIKE ?", "%"+location+"%")
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Find(&buildings)

	c.JSON(http.StatusOK, gin.H{
		"data":       buildings,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetBuilding(c *gin.Context) {
	var building models.Building
	if err := config.DB.First(&building, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building not found"})
		return
	}
	c.JSON(http.StatusOK, building)
}

func CreateBuilding(c *gin.Context) {
	var building models.Building
	if err := c.ShouldBindJSON(&building); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&building).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, building)
}

func UpdateBuilding(c *gin.Context) {
	var building models.Building
	if err := config.DB.First(&building, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building not found"})
		return
	}

	if err := c.ShouldBindJSON(&building); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&building)
	c.JSON(http.StatusOK, building)
}

func DeleteBuilding(c *gin.Context) {
	var building models.Building
	if err := config.DB.First(&building, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building not found"})
		return
	}

	config.DB.Delete(&building)
	c.JSON(http.StatusOK, gin.H{"message": "Building deleted successfully"})
}
