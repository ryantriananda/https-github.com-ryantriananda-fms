package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetVehicleContracts(c *gin.Context) {
	var contracts []models.VehicleContract
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.VehicleContract{})

	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if cabang := c.Query("cabang"); cabang != "" {
		query = query.Where("cabang = ?", cabang)
	}
	if vendor := c.Query("vendor"); vendor != "" {
		query = query.Where("vendor = ?", vendor)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("created_at DESC").Find(&contracts)

	c.JSON(http.StatusOK, gin.H{
		"data":       contracts,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetVehicleContract(c *gin.Context) {
	var contract models.VehicleContract
	if err := config.DB.First(&contract, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle contract not found"})
		return
	}
	c.JSON(http.StatusOK, contract)
}


func CreateVehicleContract(c *gin.Context) {
	var contract models.VehicleContract
	if err := c.ShouldBindJSON(&contract); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&contract).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, contract)
}

func UpdateVehicleContract(c *gin.Context) {
	var contract models.VehicleContract
	if err := config.DB.First(&contract, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle contract not found"})
		return
	}

	if err := c.ShouldBindJSON(&contract); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&contract)
	c.JSON(http.StatusOK, contract)
}

func DeleteVehicleContract(c *gin.Context) {
	var contract models.VehicleContract
	if err := config.DB.First(&contract, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle contract not found"})
		return
	}

	config.DB.Delete(&contract)
	c.JSON(http.StatusOK, gin.H{"message": "Vehicle contract deleted successfully"})
}
