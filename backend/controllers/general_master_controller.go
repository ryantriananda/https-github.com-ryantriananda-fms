package controllers

import (
	"net/http"

	"fms-backend/config"
	"fms-backend/models"
	"fms-backend/utils"

	"github.com/gin-gonic/gin"
)

// Get all masters with optional category filter
func GetGeneralMasters(c *gin.Context) {
	var masters []models.GeneralMaster
	pagination := utils.GetPagination(c)

	var total int64
	query := config.DB.Model(&models.GeneralMaster{})

	// Filter by category (required for dropdown)
	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}
	// Filter active only
	if isActive := c.Query("isActive"); isActive == "true" {
		query = query.Where("is_active = ?", true)
	}
	// Filter by parent (for hierarchical)
	if parentId := c.Query("parentId"); parentId != "" {
		query = query.Where("parent_id = ?", parentId)
	}
	// Search by name
	if search := c.Query("search"); search != "" {
		query = query.Where("name ILIKE ?", "%"+search+"%")
	}

	query.Count(&total)
	query.Offset(pagination.Offset).Limit(pagination.Limit).Order("sort_order ASC, name ASC").Find(&masters)

	c.JSON(http.StatusOK, gin.H{
		"data":       masters,
		"total":      total,
		"page":       pagination.Page,
		"limit":      pagination.Limit,
		"totalPages": (total + int64(pagination.Limit) - 1) / int64(pagination.Limit),
	})
}

// Get masters by category (simple list for dropdowns)
func GetMastersByCategory(c *gin.Context) {
	category := c.Param("category")
	var masters []models.GeneralMaster

	config.DB.Where("category = ? AND is_active = ?", category, true).
		Order("sort_order ASC, name ASC").
		Find(&masters)

	c.JSON(http.StatusOK, masters)
}

func GetGeneralMaster(c *gin.Context) {
	var master models.GeneralMaster
	if err := config.DB.First(&master, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "General master not found"})
		return
	}
	c.JSON(http.StatusOK, master)
}

func CreateGeneralMaster(c *gin.Context) {
	var master models.GeneralMaster
	if err := c.ShouldBindJSON(&master); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&master).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, master)
}


// Bulk create masters (for seeding)
func BulkCreateGeneralMasters(c *gin.Context) {
	var masters []models.GeneralMaster
	if err := c.ShouldBindJSON(&masters); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&masters).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Masters created successfully", "count": len(masters)})
}

func UpdateGeneralMaster(c *gin.Context) {
	var master models.GeneralMaster
	if err := config.DB.First(&master, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "General master not found"})
		return
	}

	if err := c.ShouldBindJSON(&master); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&master)
	c.JSON(http.StatusOK, master)
}

func DeleteGeneralMaster(c *gin.Context) {
	var master models.GeneralMaster
	if err := config.DB.First(&master, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "General master not found"})
		return
	}

	config.DB.Delete(&master)
	c.JSON(http.StatusOK, gin.H{"message": "General master deleted successfully"})
}

// === Master Categories ===
func GetMasterCategories(c *gin.Context) {
	var categories []models.MasterCategory
	
	query := config.DB.Model(&models.MasterCategory{})
	
	if module := c.Query("module"); module != "" {
		query = query.Where("module = ?", module)
	}
	if isActive := c.Query("isActive"); isActive == "true" {
		query = query.Where("is_active = ?", true)
	}

	query.Order("name ASC").Find(&categories)
	c.JSON(http.StatusOK, categories)
}

func CreateMasterCategory(c *gin.Context) {
	var category models.MasterCategory
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, category)
}

func UpdateMasterCategory(c *gin.Context) {
	var category models.MasterCategory
	if err := config.DB.First(&category, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master category not found"})
		return
	}

	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&category)
	c.JSON(http.StatusOK, category)
}

func DeleteMasterCategory(c *gin.Context) {
	var category models.MasterCategory
	if err := config.DB.First(&category, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master category not found"})
		return
	}

	// Also delete all items in this category
	config.DB.Where("category = ?", category.Code).Delete(&models.GeneralMaster{})
	config.DB.Delete(&category)
	
	c.JSON(http.StatusOK, gin.H{"message": "Master category and its items deleted successfully"})
}
