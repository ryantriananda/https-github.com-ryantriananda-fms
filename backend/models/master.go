package models

import (
	"time"

	"gorm.io/gorm"
)

// MasterApproval for approval workflow configuration
type MasterApproval struct {
	gorm.Model
	Module    string    `json:"module" gorm:"not null"` // Service, TaxKir, Mutation, etc.
	Branch    string    `json:"branch"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// ApprovalTier for multi-level approval
type ApprovalTier struct {
	gorm.Model
	MasterApprovalID uint           `json:"masterApprovalId" gorm:"index"`
	MasterApproval   MasterApproval `json:"-" gorm:"foreignKey:MasterApprovalID"`
	Level            int            `json:"level"`
	Type             string         `json:"type"`  // Role or User
	Value            string         `json:"value"` // Role name or User ID
	SLA              int            `json:"sla"`   // SLA in hours
}

// DeliveryLocation for stationery delivery
type DeliveryLocation struct {
	gorm.Model
	Name    string `json:"name" gorm:"not null"`
	Address string `json:"address"`
	Type    string `json:"type"` // Warehouse, Branch, etc.
}

// GeneralMaster for dropdown options - flexible and dynamic
type GeneralMaster struct {
	gorm.Model
	Category    string  `json:"category" gorm:"index;not null"` // PPN, BRAND, COLOR, VEHICLE_TYPE, etc.
	Name        string  `json:"name" gorm:"not null"`
	Code        string  `json:"code" gorm:"index"`
	Description string  `json:"description"`
	ParentID    *uint   `json:"parentId" gorm:"index"` // For hierarchical data (e.g., sub-categories)
	SortOrder   int     `json:"sortOrder" gorm:"default:0"`
	Value       string  `json:"value"`    // Additional value (e.g., percentage for PPN)
	Metadata    string  `json:"metadata"` // JSON string for extra flexible data
	IsActive    bool    `json:"isActive" gorm:"default:true;index"`
	IsDefault   bool    `json:"isDefault" gorm:"default:false"` // Default selection
}

// MasterCategory to manage available categories dynamically
type MasterCategory struct {
	gorm.Model
	Code        string `json:"code" gorm:"uniqueIndex;not null"` // PPN, BRAND, COLOR, etc.
	Name        string `json:"name" gorm:"not null"`             // Display name
	Description string `json:"description"`
	Module      string `json:"module"`   // Which module uses this (Vehicle, Building, etc.)
	IsEditable  bool   `json:"isEditable" gorm:"default:true"` // Can user edit items?
	IsActive    bool   `json:"isActive" gorm:"default:true"`
}
