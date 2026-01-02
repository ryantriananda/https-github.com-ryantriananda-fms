package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetCompliances(c *gin.Context) {
	var compliances []models.Compliance
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Compliance{})

	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}
	if buildingId := c.Query("buildingId"); buildingId != "" {
		query = query.Where("building_id = ?", buildingId)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("expiry_date ASC").Find(&compliances)

	c.JSON(http.StatusOK, gin.H{
		"data":       compliances,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetCompliance(c *gin.Context) {
	var compliance models.Compliance
	if err := config.DB.First(&compliance, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Compliance document not found"})
		return
	}
	c.JSON(http.StatusOK, compliance)
}

func CreateCompliance(c *gin.Context) {
	var compliance models.Compliance
	if err := c.ShouldBindJSON(&compliance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&compliance).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, compliance)
}

func UpdateCompliance(c *gin.Context) {
	var compliance models.Compliance
	if err := config.DB.First(&compliance, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Compliance document not found"})
		return
	}

	if err := c.ShouldBindJSON(&compliance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&compliance)
	c.JSON(http.StatusOK, compliance)
}

func DeleteCompliance(c *gin.Context) {
	var compliance models.Compliance
	if err := config.DB.First(&compliance, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Compliance document not found"})
		return
	}

	config.DB.Delete(&compliance)
	c.JSON(http.StatusOK, gin.H{"message": "Compliance document deleted successfully"})
}
