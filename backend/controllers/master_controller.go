package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

// Master Approval
func GetMasterApprovals(c *gin.Context) {
	var approvals []models.MasterApproval
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.MasterApproval{})

	if module := c.Query("module"); module != "" {
		query = query.Where("module = ?", module)
	}
	if branch := c.Query("branch"); branch != "" {
		query = query.Where("branch = ?", branch)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Find(&approvals)

	c.JSON(http.StatusOK, gin.H{
		"data":       approvals,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetMasterApproval(c *gin.Context) {
	var approval models.MasterApproval
	if err := config.DB.Preload("Tiers").First(&approval, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master approval not found"})
		return
	}
	c.JSON(http.StatusOK, approval)
}

// Delivery Locations
func GetDeliveryLocations(c *gin.Context) {
	var locations []models.DeliveryLocation
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.DeliveryLocation{})

	if locType := c.Query("type"); locType != "" {
		query = query.Where("type = ?", locType)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("name ASC").Find(&locations)

	c.JSON(http.StatusOK, gin.H{
		"data":       locations,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}


func CreateMasterApproval(c *gin.Context) {
	var approval models.MasterApproval
	if err := c.ShouldBindJSON(&approval); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&approval).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, approval)
}

func UpdateMasterApproval(c *gin.Context) {
	var approval models.MasterApproval
	if err := config.DB.First(&approval, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master approval not found"})
		return
	}

	if err := c.ShouldBindJSON(&approval); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&approval)
	c.JSON(http.StatusOK, approval)
}

func DeleteMasterApproval(c *gin.Context) {
	var approval models.MasterApproval
	if err := config.DB.First(&approval, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master approval not found"})
		return
	}

	config.DB.Delete(&approval)
	c.JSON(http.StatusOK, gin.H{"message": "Master approval deleted successfully"})
}

func GetDeliveryLocation(c *gin.Context) {
	var location models.DeliveryLocation
	if err := config.DB.First(&location, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Delivery location not found"})
		return
	}
	c.JSON(http.StatusOK, location)
}

func CreateDeliveryLocation(c *gin.Context) {
	var location models.DeliveryLocation
	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&location).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, location)
}

func UpdateDeliveryLocation(c *gin.Context) {
	var location models.DeliveryLocation
	if err := config.DB.First(&location, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Delivery location not found"})
		return
	}

	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&location)
	c.JSON(http.StatusOK, location)
}

func DeleteDeliveryLocation(c *gin.Context) {
	var location models.DeliveryLocation
	if err := config.DB.First(&location, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Delivery location not found"})
		return
	}

	config.DB.Delete(&location)
	c.JSON(http.StatusOK, gin.H{"message": "Delivery location deleted successfully"})
}
