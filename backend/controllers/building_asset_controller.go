package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetBuildingAssets(c *gin.Context) {
	var assets []models.BuildingAsset
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.BuildingAsset{})

	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if buildingId := c.Query("buildingId"); buildingId != "" {
		query = query.Where("building_id = ?", buildingId)
	}
	if assetType := c.Query("assetType"); assetType != "" {
		query = query.Where("asset_type = ?", assetType)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("created_at DESC").Find(&assets)

	c.JSON(http.StatusOK, gin.H{
		"data":       assets,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetBuildingAsset(c *gin.Context) {
	var asset models.BuildingAsset
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building asset not found"})
		return
	}
	c.JSON(http.StatusOK, asset)
}


func CreateBuildingAsset(c *gin.Context) {
	var asset models.BuildingAsset
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

func UpdateBuildingAsset(c *gin.Context) {
	var asset models.BuildingAsset
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building asset not found"})
		return
	}

	if err := c.ShouldBindJSON(&asset); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&asset)
	c.JSON(http.StatusOK, asset)
}

func DeleteBuildingAsset(c *gin.Context) {
	var asset models.BuildingAsset
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building asset not found"})
		return
	}

	config.DB.Delete(&asset)
	c.JSON(http.StatusOK, gin.H{"message": "Building asset deleted successfully"})
}
