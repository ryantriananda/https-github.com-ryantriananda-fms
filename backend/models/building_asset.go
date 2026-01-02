package models

import (
	"time"

	"gorm.io/gorm"
)

type BuildingAsset struct {
	gorm.Model
	AssetName            string    `json:"assetName" gorm:"not null"`
	AssetCode            string    `json:"assetCode" gorm:"uniqueIndex;not null"`
	AssetType            string    `json:"assetType"` // AC, Genset, Lift, etc.
	BuildingID           uint      `json:"buildingId" gorm:"index"`
	Building             Building  `json:"-" gorm:"foreignKey:BuildingID"`
	BuildingName         string    `json:"buildingName"`
	Floor                string    `json:"floor"`
	RoomName             string    `json:"roomName"`
	Status               string    `json:"status" gorm:"default:'Active'"`
	ApprovalStatus       string    `json:"approvalStatus" gorm:"default:'Draft'"`
	MaintenanceFrequency string    `json:"maintenanceFrequency"` // Monthly, Quarterly, Yearly
	Ownership            string    `json:"ownership"`
	PurchasePrice        float64   `json:"purchasePrice"`
	PurchaseDate         time.Time `json:"purchaseDate"`
	PIC                  string    `json:"pic"`
	Brand                string    `json:"brand"`
	AttachmentUrl        string    `json:"attachmentUrl"`
	Maintenances         []BuildingMaintenance `json:"maintenances" gorm:"foreignKey:AssetID"`
}

type BuildingMaintenance struct {
	gorm.Model
	AssetID          uint          `json:"assetId" gorm:"index"`
	BuildingAsset    BuildingAsset `json:"-" gorm:"foreignKey:AssetID"`
	AssetName        string        `json:"assetName"`
	BuildingLocation string        `json:"buildingLocation"`
	RequestDate      time.Time     `json:"requestDate"`
	CompletionDate   time.Time     `json:"completionDate"`
	MaintenanceType  string        `json:"maintenanceType"` // Preventive, Corrective, Emergency
	Description      string        `json:"description"`
	Cost             float64       `json:"cost"`
	VendorID         uint          `json:"vendorId" gorm:"index"`
	Vendor           string        `json:"vendor"`
	Technician       string        `json:"technician"`
	Status           string        `json:"status" gorm:"default:'Scheduled'"`
	ApprovalStatus   string        `json:"approvalStatus" gorm:"default:'Draft'"`
	EvidenceBefore   string        `json:"evidenceBefore"`
	EvidenceAfter    string        `json:"evidenceAfter"`
	Rating           int           `json:"rating"`
}
