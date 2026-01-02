package models

import (
	"time"

	"gorm.io/gorm"
)

// VehicleReminder for STNK/KIR expiry reminders
type VehicleReminder struct {
	gorm.Model
	VehicleID   uint      `json:"vehicleId" gorm:"index"`
	Vehicle     Vehicle   `json:"-" gorm:"foreignKey:VehicleID"`
	NoPolisi    string    `json:"noPolisi"`
	VehicleName string    `json:"vehicleName"`
	Type        string    `json:"type"` // STNK 1 Tahunan, STNK 5 Tahunan, KIR
	ExpiryDate  time.Time `json:"expiryDate"`
	Branch      string    `json:"branch"`
	Status      string    `json:"status"` // Safe, Warning, Critical, Expired
}

// BuildingReminder for document expiry reminders
type BuildingReminder struct {
	gorm.Model
	BuildingID   uint      `json:"buildingId" gorm:"index"`
	Building     Building  `json:"-" gorm:"foreignKey:BuildingID"`
	DocumentName string    `json:"documentName"`
	BuildingName string    `json:"buildingName"`
	AssetNo      string    `json:"assetNo"`
	ExpiryDate   time.Time `json:"expiryDate"`
	Category     string    `json:"category"` // Insurance, Lease, Legal, Permit
	Source       string    `json:"source"`   // System, Manual
	Status       string    `json:"status"`   // Safe, Warning, Urgent, Expired
}

// MaintenanceSchedule for asset maintenance reminders
type MaintenanceSchedule struct {
	gorm.Model
	AssetID             uint          `json:"assetId" gorm:"index"`
	BuildingAsset       BuildingAsset `json:"-" gorm:"foreignKey:AssetID"`
	AssetName           string        `json:"assetName"`
	AssetCode           string        `json:"assetCode"`
	Location            string        `json:"location"`
	Category            string        `json:"category"` // AC, Genset, etc.
	Frequency           string        `json:"frequency"` // Monthly, Quarterly, Yearly
	LastMaintenanceDate time.Time     `json:"lastMaintenanceDate"`
	NextMaintenanceDate time.Time     `json:"nextMaintenanceDate"`
	Status              string        `json:"status"` // Safe, Warning, Overdue
	VendorID            uint          `json:"vendorId" gorm:"index"`
	Vendor              string        `json:"vendor"`
}
