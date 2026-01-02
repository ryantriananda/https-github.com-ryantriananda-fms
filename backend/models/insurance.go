package models

import (
	"time"

	"gorm.io/gorm"
)

type Insurance struct {
	gorm.Model
	PolicyNumber  string    `json:"policyNumber" gorm:"uniqueIndex;not null"`
	AssetID       uint      `json:"assetId"`
	AssetName     string    `json:"assetName"`
	Category      string    `json:"category"` // Vehicle or Building
	Provider      string    `json:"provider"`
	VendorID      uint      `json:"vendorId"`
	Vendor        Vendor    `json:"vendor" gorm:"foreignKey:VendorID"`
	Type          string    `json:"type"` // All Risk, TLO, Property All Risk, etc.
	StartDate     time.Time `json:"startDate"`
	EndDate       time.Time `json:"endDate"`
	Premium       float64   `json:"premium"`
	SumInsured    float64   `json:"sumInsured"`
	Status        string    `json:"status" gorm:"default:'Active'"` // Active, Expiring, Expired
	Deductible    float64   `json:"deductible"`
	AttachmentUrl string    `json:"attachmentUrl"`
	Claims        []InsuranceClaim `json:"claims" gorm:"foreignKey:InsuranceID"`
}

type InsuranceClaim struct {
	gorm.Model
	InsuranceID   uint      `json:"insuranceId" gorm:"index"`
	Insurance     Insurance `json:"-" gorm:"foreignKey:InsuranceID"`
	IncidentDate  time.Time `json:"incidentDate"`
	Description   string    `json:"description"`
	ClaimAmount   float64   `json:"claimAmount"`
	CoveredAmount float64   `json:"coveredAmount"`
	Status        string    `json:"status"` // Submitted, Survey, Approved, Paid, Rejected
	Remarks       string    `json:"remarks"`
}
