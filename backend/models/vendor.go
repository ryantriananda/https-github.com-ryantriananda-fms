package models

import "gorm.io/gorm"

type Vendor struct {
	gorm.Model
	VendorName string `json:"vendorName" gorm:"not null"`
	VendorCode string `json:"vendorCode" gorm:"uniqueIndex;not null"`
	Type       string `json:"type"`       // Goods, Service, Both
	Category   string `json:"category"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Address    string `json:"address"`
	Status     string `json:"status" gorm:"default:'Active'"` // Active, Inactive, Blacklist
	PICName    string `json:"picName"`
}
