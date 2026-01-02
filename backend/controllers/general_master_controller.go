package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetGeneralMasters - Get all general masters
func GetGeneralMasters(c *gin.Context) {
	var masters []models.GeneralMaster
	config.DB.Order("category, sort_order, name").Find(&masters)
	c.JSON(http.StatusOK, masters)
}

// GetMastersByCategory - Get masters by category
func GetMastersByCategory(c *gin.Context) {
	category := c.Param("category")
	var masters []models.GeneralMaster
	config.DB.Where("category = ? AND is_active = ?", category, true).
		Order("sort_order, name").Find(&masters)
	c.JSON(http.StatusOK, masters)
}

// GetGeneralMaster - Get single general master
func GetGeneralMaster(c *gin.Context) {
	id := c.Param("id")
	var master models.GeneralMaster
	if err := config.DB.First(&master, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master not found"})
		return
	}
	c.JSON(http.StatusOK, master)
}

// CreateGeneralMaster - Create new general master
func CreateGeneralMaster(c *gin.Context) {
	var master models.GeneralMaster
	if err := c.ShouldBindJSON(&master); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&master)
	c.JSON(http.StatusCreated, master)
}

// UpdateGeneralMaster - Update general master
func UpdateGeneralMaster(c *gin.Context) {
	id := c.Param("id")
	var master models.GeneralMaster
	if err := config.DB.First(&master, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master not found"})
		return
	}
	if err := c.ShouldBindJSON(&master); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&master)
	c.JSON(http.StatusOK, master)
}

// DeleteGeneralMaster - Delete general master
func DeleteGeneralMaster(c *gin.Context) {
	id := c.Param("id")
	var master models.GeneralMaster
	if err := config.DB.First(&master, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master not found"})
		return
	}
	config.DB.Delete(&master)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

// BulkCreateGeneralMasters - Bulk create general masters
func BulkCreateGeneralMasters(c *gin.Context) {
	var masters []models.GeneralMaster
	if err := c.ShouldBindJSON(&masters); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&masters)
	c.JSON(http.StatusCreated, masters)
}

// GetMasterCategories - Get all master categories
func GetMasterCategories(c *gin.Context) {
	var categories []models.MasterCategory
	config.DB.Where("is_active = ?", true).Order("name").Find(&categories)
	c.JSON(http.StatusOK, categories)
}

// CreateMasterCategory - Create master category
func CreateMasterCategory(c *gin.Context) {
	var category models.MasterCategory
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&category)
	c.JSON(http.StatusCreated, category)
}

// UpdateMasterCategory - Update master category
func UpdateMasterCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.MasterCategory
	if err := config.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&category)
	c.JSON(http.StatusOK, category)
}

// DeleteMasterCategory - Delete master category
func DeleteMasterCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.MasterCategory
	if err := config.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	config.DB.Delete(&category)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}
