package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetSales(c *gin.Context) {
	var sales []models.Sale
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Sale{})

	// Filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if assetType := c.Query("assetType"); assetType != "" {
		query = query.Where("asset_type = ?", assetType)
	}
	if cabang := c.Query("cabang"); cabang != "" {
		query = query.Where("cabang = ?", cabang)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("created_at DESC").Find(&sales)

	c.JSON(http.StatusOK, gin.H{
		"data":       sales,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetSale(c *gin.Context) {
	var sale models.Sale
	if err := config.DB.First(&sale, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
		return
	}
	c.JSON(http.StatusOK, sale)
}

func CreateSale(c *gin.Context) {
	var sale models.Sale
	if err := c.ShouldBindJSON(&sale); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&sale).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, sale)
}

func UpdateSale(c *gin.Context) {
	var sale models.Sale
	if err := config.DB.First(&sale, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
		return
	}

	if err := c.ShouldBindJSON(&sale); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&sale)
	c.JSON(http.StatusOK, sale)
}

func DeleteSale(c *gin.Context) {
	var sale models.Sale
	if err := config.DB.First(&sale, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
		return
	}

	config.DB.Delete(&sale)
	c.JSON(http.StatusOK, gin.H{"message": "Sale deleted successfully"})
}
