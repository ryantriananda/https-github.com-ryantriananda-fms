package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetServices(c *gin.Context) {
	var services []models.Service
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Service{})

	// Filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if cabang := c.Query("cabang"); cabang != "" {
		query = query.Where("cabang = ?", cabang)
	}
	if noPolisi := c.Query("noPolisi"); noPolisi != "" {
		query = query.Where("no_polisi LIKE ?", "%"+noPolisi+"%")
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("created_at DESC").Find(&services)

	c.JSON(http.StatusOK, gin.H{
		"data":       services,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetService(c *gin.Context) {
	var service models.Service
	if err := config.DB.First(&service, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}
	c.JSON(http.StatusOK, service)
}

func CreateService(c *gin.Context) {
	var service models.Service
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&service).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, service)
}

func UpdateService(c *gin.Context) {
	var service models.Service
	if err := config.DB.First(&service, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}

	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&service)
	c.JSON(http.StatusOK, service)
}

func DeleteService(c *gin.Context) {
	var service models.Service
	if err := config.DB.First(&service, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}

	config.DB.Delete(&service)
	c.JSON(http.StatusOK, gin.H{"message": "Service deleted successfully"})
}
