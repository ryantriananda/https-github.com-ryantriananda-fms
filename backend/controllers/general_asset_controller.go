package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetGeneralAssets(c *gin.Context) {
	var assets []models.GeneralAsset
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.GeneralAsset{})

	// Filters
	if category := c.Query("category"); category != "" {
		query = query.Where("asset_category = ?", category)
	}
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if department := c.Query("department"); department != "" {
		query = query.Where("department = ?", department)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Find(&assets)

	c.JSON(http.StatusOK, gin.H{
		"data":       assets,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetGeneralAsset(c *gin.Context) {
	var asset models.GeneralAsset
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}
	c.JSON(http.StatusOK, asset)
}

func CreateGeneralAsset(c *gin.Context) {
	var asset models.GeneralAsset
	if err := c.ShouldBindJSON(&asset); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&asset).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, asset)
}

func UpdateGeneralAsset(c *gin.Context) {
	var asset models.GeneralAsset
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}

	if err := c.ShouldBindJSON(&asset); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&asset)
	c.JSON(http.StatusOK, asset)
}

func DeleteGeneralAsset(c *gin.Context) {
	var asset models.GeneralAsset
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}

	config.DB.Delete(&asset)
	c.JSON(http.StatusOK, gin.H{"message": "Asset deleted successfully"})
}
