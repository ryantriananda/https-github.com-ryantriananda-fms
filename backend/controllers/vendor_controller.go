package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetVendors(c *gin.Context) {
	var vendors []models.Vendor
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Vendor{})

	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if vendorType := c.Query("type"); vendorType != "" {
		query = query.Where("type = ?", vendorType)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Find(&vendors)

	c.JSON(http.StatusOK, gin.H{
		"data":       vendors,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetVendor(c *gin.Context) {
	var vendor models.Vendor
	if err := config.DB.First(&vendor, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vendor not found"})
		return
	}
	c.JSON(http.StatusOK, vendor)
}

func CreateVendor(c *gin.Context) {
	var vendor models.Vendor
	if err := c.ShouldBindJSON(&vendor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&vendor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, vendor)
}

func UpdateVendor(c *gin.Context) {
	var vendor models.Vendor
	if err := config.DB.First(&vendor, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vendor not found"})
		return
	}

	if err := c.ShouldBindJSON(&vendor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&vendor)
	c.JSON(http.StatusOK, vendor)
}

func DeleteVendor(c *gin.Context) {
	var vendor models.Vendor
	if err := config.DB.First(&vendor, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vendor not found"})
		return
	}

	config.DB.Delete(&vendor)
	c.JSON(http.StatusOK, gin.H{"message": "Vendor deleted successfully"})
}
