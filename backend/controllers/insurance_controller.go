package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetInsurances(c *gin.Context) {
	var insurances []models.Insurance
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Insurance{})

	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Find(&insurances)

	c.JSON(http.StatusOK, gin.H{
		"data":       insurances,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetInsurance(c *gin.Context) {
	var insurance models.Insurance
	if err := config.DB.First(&insurance, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Insurance not found"})
		return
	}
	c.JSON(http.StatusOK, insurance)
}

func CreateInsurance(c *gin.Context) {
	var insurance models.Insurance
	if err := c.ShouldBindJSON(&insurance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&insurance).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, insurance)
}

func UpdateInsurance(c *gin.Context) {
	var insurance models.Insurance
	if err := config.DB.First(&insurance, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Insurance not found"})
		return
	}

	if err := c.ShouldBindJSON(&insurance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&insurance)
	c.JSON(http.StatusOK, insurance)
}

func DeleteInsurance(c *gin.Context) {
	var insurance models.Insurance
	if err := config.DB.First(&insurance, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Insurance not found"})
		return
	}

	config.DB.Delete(&insurance)
	c.JSON(http.StatusOK, gin.H{"message": "Insurance deleted successfully"})
}
