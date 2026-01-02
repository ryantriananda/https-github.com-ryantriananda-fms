package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetLogBooks(c *gin.Context) {
	var logbooks []models.LogBook
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.LogBook{})

	// Filters
	if location := c.Query("location"); location != "" {
		query = query.Where("lokasi_modena = ?", location)
	}
	if kategori := c.Query("kategori"); kategori != "" {
		query = query.Where("kategori_tamu = ?", kategori)
	}
	if namaTamu := c.Query("namaTamu"); namaTamu != "" {
		query = query.Where("nama_tamu LIKE ?", "%"+namaTamu+"%")
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("tanggal_kunjungan DESC").Find(&logbooks)

	c.JSON(http.StatusOK, gin.H{
		"data":       logbooks,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetLogBook(c *gin.Context) {
	var logbook models.LogBook
	if err := config.DB.First(&logbook, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "LogBook not found"})
		return
	}
	c.JSON(http.StatusOK, logbook)
}

func CreateLogBook(c *gin.Context) {
	var logbook models.LogBook
	if err := c.ShouldBindJSON(&logbook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&logbook).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, logbook)
}

func UpdateLogBook(c *gin.Context) {
	var logbook models.LogBook
	if err := config.DB.First(&logbook, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "LogBook not found"})
		return
	}

	if err := c.ShouldBindJSON(&logbook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&logbook)
	c.JSON(http.StatusOK, logbook)
}

func DeleteLogBook(c *gin.Context) {
	var logbook models.LogBook
	if err := config.DB.First(&logbook, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "LogBook not found"})
		return
	}

	config.DB.Delete(&logbook)
	c.JSON(http.StatusOK, gin.H{"message": "LogBook deleted successfully"})
}
