package controllers

import (
	"fms-backend/config"
	"fms-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ==================== MODENA POD ====================

func GetPODs(c *gin.Context) {
	var pods []models.ModenaPOD
	config.DB.Order("nama_pod").Find(&pods)
	c.JSON(http.StatusOK, pods)
}

func GetPOD(c *gin.Context) {
	id := c.Param("id")
	var pod models.ModenaPOD
	if err := config.DB.First(&pod, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "POD not found"})
		return
	}
	c.JSON(http.StatusOK, pod)
}

func CreatePOD(c *gin.Context) {
	var pod models.ModenaPOD
	if err := c.ShouldBindJSON(&pod); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&pod)
	c.JSON(http.StatusCreated, pod)
}

func UpdatePOD(c *gin.Context) {
	id := c.Param("id")
	var pod models.ModenaPOD
	if err := config.DB.First(&pod, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "POD not found"})
		return
	}
	if err := c.ShouldBindJSON(&pod); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&pod)
	c.JSON(http.StatusOK, pod)
}

func DeletePOD(c *gin.Context) {
	id := c.Param("id")
	var pod models.ModenaPOD
	if err := config.DB.First(&pod, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "POD not found"})
		return
	}
	config.DB.Delete(&pod)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

// ==================== POD OCCUPANTS ====================

func GetPODOccupants(c *gin.Context) {
	var occupants []models.PODOccupant
	config.DB.Preload("POD").Order("created_at DESC").Find(&occupants)
	c.JSON(http.StatusOK, occupants)
}

func GetPODOccupant(c *gin.Context) {
	id := c.Param("id")
	var occupant models.PODOccupant
	if err := config.DB.Preload("POD").First(&occupant, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Occupant not found"})
		return
	}
	c.JSON(http.StatusOK, occupant)
}

func CreatePODOccupant(c *gin.Context) {
	var occupant models.PODOccupant
	if err := c.ShouldBindJSON(&occupant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&occupant)
	c.JSON(http.StatusCreated, occupant)
}

func UpdatePODOccupant(c *gin.Context) {
	id := c.Param("id")
	var occupant models.PODOccupant
	if err := config.DB.First(&occupant, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Occupant not found"})
		return
	}
	if err := c.ShouldBindJSON(&occupant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&occupant)
	c.JSON(http.StatusOK, occupant)
}

func DeletePODOccupant(c *gin.Context) {
	id := c.Param("id")
	var occupant models.PODOccupant
	if err := config.DB.First(&occupant, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Occupant not found"})
		return
	}
	config.DB.Delete(&occupant)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

// ==================== POD REQUESTS ====================

func GetPODRequests(c *gin.Context) {
	var requests []models.PODRequest
	config.DB.Preload("POD").Order("created_at DESC").Find(&requests)
	c.JSON(http.StatusOK, requests)
}

func GetPODRequest(c *gin.Context) {
	id := c.Param("id")
	var request models.PODRequest
	if err := config.DB.Preload("POD").First(&request, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}
	c.JSON(http.StatusOK, request)
}

func CreatePODRequest(c *gin.Context) {
	var request models.PODRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&request)
	c.JSON(http.StatusCreated, request)
}

func UpdatePODRequest(c *gin.Context) {
	id := c.Param("id")
	var request models.PODRequest
	if err := config.DB.First(&request, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&request)
	c.JSON(http.StatusOK, request)
}

func DeletePODRequest(c *gin.Context) {
	id := c.Param("id")
	var request models.PODRequest
	if err := config.DB.First(&request, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}
	config.DB.Delete(&request)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}
