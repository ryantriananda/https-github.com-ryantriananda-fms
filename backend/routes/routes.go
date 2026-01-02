package routes

import (
	"fms-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// General Masters - Public routes (no auth required)
	r.GET("/api/general-masters", controllers.GetGeneralMasters)
	r.GET("/api/general-masters/category/:category", controllers.GetMastersByCategory)
	r.GET("/api/general-masters/:id", controllers.GetGeneralMaster)
	r.POST("/api/general-masters", controllers.CreateGeneralMaster)
	r.PUT("/api/general-masters/:id", controllers.UpdateGeneralMaster)
	r.DELETE("/api/general-masters/:id", controllers.DeleteGeneralMaster)
	r.POST("/api/general-masters/bulk", controllers.BulkCreateGeneralMasters)

	// Master Categories
	r.GET("/api/master-categories", controllers.GetMasterCategories)
	r.POST("/api/master-categories", controllers.CreateMasterCategory)
	r.PUT("/api/master-categories/:id", controllers.UpdateMasterCategory)
	r.DELETE("/api/master-categories/:id", controllers.DeleteMasterCategory)

	// Modena POD
	r.GET("/api/pods", controllers.GetPODs)
	r.GET("/api/pods/:id", controllers.GetPOD)
	r.POST("/api/pods", controllers.CreatePOD)
	r.PUT("/api/pods/:id", controllers.UpdatePOD)
	r.DELETE("/api/pods/:id", controllers.DeletePOD)

	// POD Occupants (Penghuni)
	r.GET("/api/pod-occupants", controllers.GetPODOccupants)
	r.GET("/api/pod-occupants/:id", controllers.GetPODOccupant)
	r.POST("/api/pod-occupants", controllers.CreatePODOccupant)
	r.PUT("/api/pod-occupants/:id", controllers.UpdatePODOccupant)
	r.DELETE("/api/pod-occupants/:id", controllers.DeletePODOccupant)

	// POD Requests (Permintaan)
	r.GET("/api/pod-requests", controllers.GetPODRequests)
	r.GET("/api/pod-requests/:id", controllers.GetPODRequest)
	r.POST("/api/pod-requests", controllers.CreatePODRequest)
	r.PUT("/api/pod-requests/:id", controllers.UpdatePODRequest)
	r.DELETE("/api/pod-requests/:id", controllers.DeletePODRequest)
}
