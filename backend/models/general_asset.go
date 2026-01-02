package models

import (
	"time"

	"gorm.io/gorm"
)

type GeneralAsset struct {
	gorm.Model
	AssetNumber    string    `json:"assetNumber" gorm:"uniqueIndex;not null"`
	AssetCategory  string    `json:"assetCategory" gorm:"not null"` // HC, IT, CS
	Type           string    `json:"type"`
	AssetName      string    `json:"assetName"`
	Ownership      string    `json:"ownership" gorm:"default:'Own'"`
	AssetLocation  string    `json:"assetLocation"`
	SubLocation    string    `json:"subLocation"`
	Department     string    `json:"department"`
	Channel        string    `json:"channel"`
	Status         string    `json:"status" gorm:"default:'Active'"`
	ApprovalStatus string    `json:"approvalStatus" gorm:"default:'Approved'"`
	Address        string    `json:"address"`
	PurchasePrice  float64   `json:"purchasePrice"`
	PurchaseDate   time.Time `json:"purchaseDate"`
	Brand          string    `json:"brand"`
	ModelNumber    string    `json:"modelNumber"`
	PIC            string    `json:"pic"`
	SourceCategory string    `json:"sourceCategory"` // Asset HC, Asset IT, etc.
}
