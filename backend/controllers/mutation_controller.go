package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetMutations(c *gin.Context) {
	var mutations []models.Mutation
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.Mutation{})

	// Filters
	if status := c.Query("status"); status != "" {
		query = query.Where("status = ?", status)
	}
	if assetType := c.Query("assetType"); assetType != "" {
		query = query.Where("asset_type = ?", assetType)
	}
	if tipeMutasi := c.Query("tipeMutasi"); tipeMutasi != "" {
		query = query.Where("tipe_mutasi = ?", tipeMutasi)
	}
	if lokasiAsal := c.Query("lokasiAsal"); lokasiAsal != "" {
		query = query.Where("lokasi_asal = ?", lokasiAsal)
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("created_at DESC").Find(&mutations)

	c.JSON(http.StatusOK, gin.H{
		"data":       mutations,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetMutation(c *gin.Context) {
	var mutation models.Mutation
	if err := config.DB.First(&mutation, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mutation not found"})
		return
	}
	c.JSON(http.StatusOK, mutation)
}

func CreateMutation(c *gin.Context) {
	var mutation models.Mutation
	if err := c.ShouldBindJSON(&mutation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&mutation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, mutation)
}

func UpdateMutation(c *gin.Context) {
	var mutation models.Mutation
	if err := config.DB.First(&mutation, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mutation not found"})
		return
	}

	if err := c.ShouldBindJSON(&mutation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&mutation)
	c.JSON(http.StatusOK, mutation)
}

func DeleteMutation(c *gin.Context) {
	var mutation models.Mutation
	if err := config.DB.First(&mutation, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mutation not found"})
		return
	}

	config.DB.Delete(&mutation)
	c.JSON(http.StatusOK, gin.H{"message": "Mutation deleted successfully"})
}
