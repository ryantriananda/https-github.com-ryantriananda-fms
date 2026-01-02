package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

// Vehicle Reminders
func GetVehicleReminders(c *gin.Context) {
	var reminders []models.VehicleReminder
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.VehicleReminder{})

	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if reminderType := c.Query("type"); reminderType != "" {
		query = query.Where("type = ?", reminderType)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("expiry_date ASC").Find(&reminders)

	c.JSON(http.StatusOK, gin.H{
		"data":       reminders,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

// Building Reminders
func GetBuildingReminders(c *gin.Context) {
	var reminders []models.BuildingReminder
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.BuildingReminder{})

	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("expiry_date ASC").Find(&reminders)

	c.JSON(http.StatusOK, gin.H{
		"data":       reminders,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}
