package models

import (
	"time"

	"gorm.io/gorm"
)

// Compliance for legal documents tracking
type Compliance struct {
	gorm.Model
	DocumentName  string    `json:"documentName" gorm:"not null"`
	DocumentType  string    `json:"documentType"` // Contract, Permit, License, Certificate
	BuildingID    uint      `json:"buildingId" gorm:"index"`
	Building      Building  `json:"-" gorm:"foreignKey:BuildingID"`
	BuildingName  string    `json:"buildingName"`
	AssetNo       string    `json:"assetNo"`
	IssueDate     time.Time `json:"issueDate"`
	ExpiryDate    time.Time `json:"expiryDate"`
	IssuingBody   string    `json:"issuingBody"`
	DocumentNo    string    `json:"documentNo"`
	Category      string    `json:"category"` // Insurance, Lease, Legal, Permit
	Status        string    `json:"status"`   // Safe, Warning, Urgent, Expired
	AttachmentUrl string    `json:"attachmentUrl"`
	Notes         string    `json:"notes"`
}
