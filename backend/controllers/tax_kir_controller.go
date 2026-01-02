package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetTaxKirs(c *gin.Context) {
	var taxKirs []models.TaxKir
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.TaxKir{})

	// Filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if jenis := c.Query("jenis"); jenis != "" {
		query = query.Where("jenis = ?", jenis)
	}
	if cabang := c.Query("cabang"); cabang != "" {
		query = query.Where("cabang = ?", cabang)
	}
	if noPolisi := c.Query("noPolisi"); noPolisi != "" {
		query = query.Where("no_polisi LIKE ?", "%"+noPolisi+"%")
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("jatuh_tempo ASC").Find(&taxKirs)

	c.JSON(http.StatusOK, gin.H{
		"data":       taxKirs,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetTaxKir(c *gin.Context) {
	var taxKir models.TaxKir
	if err := config.DB.First(&taxKir, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tax/KIR record not found"})
		return
	}
	c.JSON(http.StatusOK, taxKir)
}

func CreateTaxKir(c *gin.Context) {
	var taxKir models.TaxKir
	if err := c.ShouldBindJSON(&taxKir); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&taxKir).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, taxKir)
}

func UpdateTaxKir(c *gin.Context) {
	var taxKir models.TaxKir
	if err := config.DB.First(&taxKir, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tax/KIR record not found"})
		return
	}

	if err := c.ShouldBindJSON(&taxKir); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&taxKir)
	c.JSON(http.StatusOK, taxKir)
}

func DeleteTaxKir(c *gin.Context) {
	var taxKir models.TaxKir
	if err := config.DB.First(&taxKir, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tax/KIR record not found"})
		return
	}

	config.DB.Delete(&taxKir)
	c.JSON(http.StatusOK, gin.H{"message": "Tax/KIR record deleted successfully"})
}
