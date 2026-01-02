package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

func GetMasterItems(c *gin.Context) {
	var items []models.MasterItem
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.MasterItem{})

	// Filters
	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}
	if itemName := c.Query("itemName"); itemName != "" {
		query = query.Where("item_name LIKE ?", "%"+itemName+"%")
	}
	if itemCode := c.Query("itemCode"); itemCode != "" {
		query = query.Where("item_code LIKE ?", "%"+itemCode+"%")
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("item_name ASC").Find(&items)

	c.JSON(http.StatusOK, gin.H{
		"data":       items,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

func GetMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master item not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}


func CreateMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, item)
}

func UpdateMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master item not found"})
		return
	}

	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master item not found"})
		return
	}

	config.DB.Delete(&item)
	c.JSON(http.StatusOK, gin.H{"message": "Master item deleted successfully"})
}
