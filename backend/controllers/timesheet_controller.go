package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetTimesheets(c *gin.Context) {
	var timesheets []models.Timesheet
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Timesheet{})

	// Filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if location := c.Query("location"); location != "" {
		query = query.Where("location = ?", location)
	}
	if area := c.Query("area"); area != "" {
		query = query.Where("area = ?", area)
	}
	if shift := c.Query("shift"); shift != "" {
		query = query.Where("shift = ?", shift)
	}
	if employeeID := c.Query("employeeId"); employeeID != "" {
		query = query.Where("employee_id = ?", employeeID)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("date DESC").Find(&timesheets)

	c.JSON(http.StatusOK, gin.H{
		"data":       timesheets,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetTimesheet(c *gin.Context) {
	var timesheet models.Timesheet
	if err := config.DB.First(&timesheet, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Timesheet not found"})
		return
	}
	c.JSON(http.StatusOK, timesheet)
}

func CreateTimesheet(c *gin.Context) {
	var timesheet models.Timesheet
	if err := c.ShouldBindJSON(&timesheet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&timesheet).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, timesheet)
}

func UpdateTimesheet(c *gin.Context) {
	var timesheet models.Timesheet
	if err := config.DB.First(&timesheet, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Timesheet not found"})
		return
	}

	if err := c.ShouldBindJSON(&timesheet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&timesheet)
	c.JSON(http.StatusOK, timesheet)
}

func DeleteTimesheet(c *gin.Context) {
	var timesheet models.Timesheet
	if err := config.DB.First(&timesheet, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Timesheet not found"})
		return
	}

	config.DB.Delete(&timesheet)
	c.JSON(http.StatusOK, gin.H{"message": "Timesheet deleted successfully"})
}
