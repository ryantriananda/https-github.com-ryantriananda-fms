package routes

import (
	"fms-backend/controllers"
	"fms-backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Public routes
	r.POST("/api/auth/login", controllers.Login)
	r.POST("/api/auth/register", controllers.Register)

	// Protected routes
	api := r.Group("/api")
	api.Use(middleware.AuthMiddleware())
	{
		// Users
		api.GET("/users", controllers.GetUsers)
		api.GET("/users/:id", controllers.GetUser)
		api.POST("/users", controllers.CreateUser)
		api.PUT("/users/:id", controllers.UpdateUser)
		api.DELETE("/users/:id", controllers.DeleteUser)

		// Vehicles
		api.GET("/vehicles", controllers.GetVehicles)
		api.GET("/vehicles/:id", controllers.GetVehicle)
		api.POST("/vehicles", controllers.CreateVehicle)
		api.PUT("/vehicles/:id", controllers.UpdateVehicle)
		api.DELETE("/vehicles/:id", controllers.DeleteVehicle)

		// Buildings
		api.GET("/buildings", controllers.GetBuildings)
		api.GET("/buildings/:id", controllers.GetBuilding)
		api.POST("/buildings", controllers.CreateBuilding)
		api.PUT("/buildings/:id", controllers.UpdateBuilding)
		api.DELETE("/buildings/:id", controllers.DeleteBuilding)

		// General Assets
		api.GET("/general-assets", controllers.GetGeneralAssets)
		api.GET("/general-assets/:id", controllers.GetGeneralAsset)
		api.POST("/general-assets", controllers.CreateGeneralAsset)
		api.PUT("/general-assets/:id", controllers.UpdateGeneralAsset)
		api.DELETE("/general-assets/:id", controllers.DeleteGeneralAsset)

		// Vendors
		api.GET("/vendors", controllers.GetVendors)
		api.GET("/vendors/:id", controllers.GetVendor)
		api.POST("/vendors", controllers.CreateVendor)
		api.PUT("/vendors/:id", controllers.UpdateVendor)
		api.DELETE("/vendors/:id", controllers.DeleteVendor)

		// Insurance
		api.GET("/insurance", controllers.GetInsurances)
		api.GET("/insurance/:id", controllers.GetInsurance)
		api.POST("/insurance", controllers.CreateInsurance)
		api.PUT("/insurance/:id", controllers.UpdateInsurance)
		api.DELETE("/insurance/:id", controllers.DeleteInsurance)

		// Services
		api.GET("/services", controllers.GetServices)
		api.GET("/services/:id", controllers.GetService)
		api.POST("/services", controllers.CreateService)
		api.PUT("/services/:id", controllers.UpdateService)
		api.DELETE("/services/:id", controllers.DeleteService)

		// Tax & KIR
		api.GET("/tax-kir", controllers.GetTaxKirs)
		api.GET("/tax-kir/:id", controllers.GetTaxKir)
		api.POST("/tax-kir", controllers.CreateTaxKir)
		api.PUT("/tax-kir/:id", controllers.UpdateTaxKir)
		api.DELETE("/tax-kir/:id", controllers.DeleteTaxKir)

		// Mutations
		api.GET("/mutations", controllers.GetMutations)
		api.GET("/mutations/:id", controllers.GetMutation)
		api.POST("/mutations", controllers.CreateMutation)
		api.PUT("/mutations/:id", controllers.UpdateMutation)
		api.DELETE("/mutations/:id", controllers.DeleteMutation)

		// Sales
		api.GET("/sales", controllers.GetSales)
		api.GET("/sales/:id", controllers.GetSale)
		api.POST("/sales", controllers.CreateSale)
		api.PUT("/sales/:id", controllers.UpdateSale)
		api.DELETE("/sales/:id", controllers.DeleteSale)

		// Utilities
		api.GET("/utilities", controllers.GetUtilities)
		api.GET("/utilities/:id", controllers.GetUtility)
		api.POST("/utilities", controllers.CreateUtility)
		api.PUT("/utilities/:id", controllers.UpdateUtility)
		api.DELETE("/utilities/:id", controllers.DeleteUtility)

		// Timesheets
		api.GET("/timesheets", controllers.GetTimesheets)
		api.GET("/timesheets/:id", controllers.GetTimesheet)
		api.POST("/timesheets", controllers.CreateTimesheet)
		api.PUT("/timesheets/:id", controllers.UpdateTimesheet)
		api.DELETE("/timesheets/:id", controllers.DeleteTimesheet)

		// LogBooks
		api.GET("/logbooks", controllers.GetLogBooks)
		api.GET("/logbooks/:id", controllers.GetLogBook)
		api.POST("/logbooks", controllers.CreateLogBook)
		api.PUT("/logbooks/:id", controllers.UpdateLogBook)
		api.DELETE("/logbooks/:id", controllers.DeleteLogBook)

		// Stationery (ATK/ARK)
		api.GET("/stationery-requests", controllers.GetStationeryRequests)
		api.GET("/stationery-requests/:id", controllers.GetStationeryRequest)
		api.POST("/stationery-requests", controllers.CreateStationeryRequest)
		api.PUT("/stationery-requests/:id", controllers.UpdateStationeryRequest)
		api.DELETE("/stationery-requests/:id", controllers.DeleteStationeryRequest)

		// Master Items
		api.GET("/master-items", controllers.GetMasterItems)
		api.GET("/master-items/:id", controllers.GetMasterItem)
		api.POST("/master-items", controllers.CreateMasterItem)
		api.PUT("/master-items/:id", controllers.UpdateMasterItem)
		api.DELETE("/master-items/:id", controllers.DeleteMasterItem)

		// Purchases
		api.GET("/purchases", controllers.GetPurchases)
		api.GET("/purchases/:id", controllers.GetPurchase)
		api.POST("/purchases", controllers.CreatePurchase)
		api.PUT("/purchases/:id", controllers.UpdatePurchase)
		api.DELETE("/purchases/:id", controllers.DeletePurchase)

		// Vehicle Contracts
		api.GET("/vehicle-contracts", controllers.GetVehicleContracts)
		api.GET("/vehicle-contracts/:id", controllers.GetVehicleContract)
		api.POST("/vehicle-contracts", controllers.CreateVehicleContract)
		api.PUT("/vehicle-contracts/:id", controllers.UpdateVehicleContract)
		api.DELETE("/vehicle-contracts/:id", controllers.DeleteVehicleContract)

		// Building Assets
		api.GET("/building-assets", controllers.GetBuildingAssets)
		api.GET("/building-assets/:id", controllers.GetBuildingAsset)
		api.POST("/building-assets", controllers.CreateBuildingAsset)
		api.PUT("/building-assets/:id", controllers.UpdateBuildingAsset)
		api.DELETE("/building-assets/:id", controllers.DeleteBuildingAsset)

		// Building Maintenances
		api.GET("/building-maintenances", controllers.GetBuildingMaintenances)
		api.GET("/building-maintenances/:id", controllers.GetBuildingMaintenance)
		api.POST("/building-maintenances", controllers.CreateBuildingMaintenance)
		api.PUT("/building-maintenances/:id", controllers.UpdateBuildingMaintenance)
		api.DELETE("/building-maintenances/:id", controllers.DeleteBuildingMaintenance)

		// Reminders
		api.GET("/vehicle-reminders", controllers.GetVehicleReminders)
		api.GET("/building-reminders", controllers.GetBuildingReminders)

		// Master Approvals
		api.GET("/master-approvals", controllers.GetMasterApprovals)
		api.GET("/master-approvals/:id", controllers.GetMasterApproval)
		api.POST("/master-approvals", controllers.CreateMasterApproval)
		api.PUT("/master-approvals/:id", controllers.UpdateMasterApproval)
		api.DELETE("/master-approvals/:id", controllers.DeleteMasterApproval)

		// Delivery Locations
		api.GET("/delivery-locations", controllers.GetDeliveryLocations)
		api.GET("/delivery-locations/:id", controllers.GetDeliveryLocation)
		api.POST("/delivery-locations", controllers.CreateDeliveryLocation)
		api.PUT("/delivery-locations/:id", controllers.UpdateDeliveryLocation)
		api.DELETE("/delivery-locations/:id", controllers.DeleteDeliveryLocation)

		// General Masters (dropdown data) - Dynamic & Flexible
		api.GET("/general-masters", controllers.GetGeneralMasters)
		api.GET("/general-masters/category/:category", controllers.GetMastersByCategory) // Simple list by category
		api.GET("/general-masters/:id", controllers.GetGeneralMaster)
		api.POST("/general-masters", controllers.CreateGeneralMaster)
		api.POST("/general-masters/bulk", controllers.BulkCreateGeneralMasters) // Bulk create for seeding
		api.PUT("/general-masters/:id", controllers.UpdateGeneralMaster)
		api.DELETE("/general-masters/:id", controllers.DeleteGeneralMaster)

		// Master Categories (manage available categories)
		api.GET("/master-categories", controllers.GetMasterCategories)
		api.POST("/master-categories", controllers.CreateMasterCategory)
		api.PUT("/master-categories/:id", controllers.UpdateMasterCategory)
		api.DELETE("/master-categories/:id", controllers.DeleteMasterCategory)

		// Compliance & Legal Documents
		api.GET("/compliances", controllers.GetCompliances)
		api.GET("/compliances/:id", controllers.GetCompliance)
		api.POST("/compliances", controllers.CreateCompliance)
		api.PUT("/compliances/:id", controllers.UpdateCompliance)
		api.DELETE("/compliances/:id", controllers.DeleteCompliance)
	}
}
