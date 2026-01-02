package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetBuildingMaintenances(c *gin.Context) {
	var maintenances []models.BuildingMaintenance
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.BuildingMaintenance{})

	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if assetId := c.Query("assetId"); assetId != "" {
		query = query.Where("asset_id = ?", assetId)
	}
	if maintenanceType := c.Query("maintenanceType"); maintenanceType != "" {
		query = query.Where("maintenance_type = ?", maintenanceType)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("request_date DESC").Find(&maintenances)

	c.JSON(http.StatusOK, gin.H{
		"data":       maintenances,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetBuildingMaintenance(c *gin.Context) {
	var maintenance models.BuildingMaintenance
	if err := config.DB.First(&maintenance, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building maintenance not found"})
		return
	}
	c.JSON(http.StatusOK, maintenance)
}


func CreateBuildingMaintenance(c *gin.Context) {
	var maintenance models.BuildingMaintenance
	if err := c.ShouldBindJSON(&maintenance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&maintenance).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, maintenance)
}

func UpdateBuildingMaintenance(c *gin.Context) {
	var maintenance models.BuildingMaintenance
	if err := config.DB.First(&maintenance, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building maintenance not found"})
		return
	}

	if err := c.ShouldBindJSON(&maintenance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&maintenance)
	c.JSON(http.StatusOK, maintenance)
}

func DeleteBuildingMaintenance(c *gin.Context) {
	var maintenance models.BuildingMaintenance
	if err := config.DB.First(&maintenance, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Building maintenance not found"})
		return
	}

	config.DB.Delete(&maintenance)
	c.JSON(http.StatusOK, gin.H{"message": "Building maintenance deleted successfully"})
}
