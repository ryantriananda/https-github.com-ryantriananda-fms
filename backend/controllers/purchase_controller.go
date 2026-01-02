package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetPurchases(c *gin.Context) {
	var purchases []models.Purchase
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Purchase{})

	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if vendorId := c.Query("vendorId"); vendorId != "" {
		query = query.Where("vendor_id = ?", vendorId)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("date DESC").Find(&purchases)

	c.JSON(http.StatusOK, gin.H{
		"data":       purchases,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetPurchase(c *gin.Context) {
	var purchase models.Purchase
	if err := config.DB.First(&purchase, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Purchase not found"})
		return
	}
	c.JSON(http.StatusOK, purchase)
}

func CreatePurchase(c *gin.Context) {
	var purchase models.Purchase
	if err := c.ShouldBindJSON(&purchase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	purchase.TotalPrice = float64(purchase.Qty) * purchase.UnitPrice

	if err := config.DB.Create(&purchase).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, purchase)
}

func UpdatePurchase(c *gin.Context) {
	var purchase models.Purchase
	if err := config.DB.First(&purchase, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Purchase not found"})
		return
	}

	if err := c.ShouldBindJSON(&purchase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	purchase.TotalPrice = float64(purchase.Qty) * purchase.UnitPrice
	config.DB.Save(&purchase)
	c.JSON(http.StatusOK, purchase)
}

func DeletePurchase(c *gin.Context) {
	var purchase models.Purchase
	if err := config.DB.First(&purchase, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Purchase not found"})
		return
	}

	config.DB.Delete(&purchase)
	c.JSON(http.StatusOK, gin.H{"message": "Purchase deleted successfully"})
}
