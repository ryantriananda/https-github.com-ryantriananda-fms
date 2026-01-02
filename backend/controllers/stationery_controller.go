package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetStationeryRequests(c *gin.Context) {
	var requests []models.StationeryRequest
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.StationeryRequest{})

	// Filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if reqType := c.Query("type"); reqType != "" {
		query = query.Where("type = ?", reqType)
	}
	if location := c.Query("location"); location != "" {
		query = query.Where("location = ?", location)
	}
	if approvalStatus := c.Query("approvalStatus"); approvalStatus != "" {
		query = query.Where("approval_status = ?", approvalStatus)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("created_at DESC").Find(&requests)

	c.JSON(http.StatusOK, gin.H{
		"data":       requests,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetStationeryRequest(c *gin.Context) {
	var request models.StationeryRequest
	if err := config.DB.First(&request, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stationery request not found"})
		return
	}
	c.JSON(http.StatusOK, request)
}

func CreateStationeryRequest(c *gin.Context) {
	var request models.StationeryRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, request)
}

func UpdateStationeryRequest(c *gin.Context) {
	var request models.StationeryRequest
	if err := config.DB.First(&request, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stationery request not found"})
		return
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&request)
	c.JSON(http.StatusOK, request)
}

func DeleteStationeryRequest(c *gin.Context) {
	var request models.StationeryRequest
	if err := config.DB.First(&request, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stationery request not found"})
		return
	}

	config.DB.Delete(&request)
	c.JSON(http.StatusOK, gin.H{"message": "Stationery request deleted successfully"})
}
