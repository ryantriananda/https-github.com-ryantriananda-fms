package models

import (
	"time"
)

type GeneralMaster struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Category    string    `json:"category" gorm:"index;not null"`
	Name        string    `json:"name" gorm:"not null"`
	Code        string    `json:"code" gorm:"index"`
	Value       string    `json:"value"`
	Description string    `json:"description"`
	SortOrder   int       `json:"sortOrder" gorm:"default:0"`
	IsActive    bool      `json:"isActive" gorm:"default:true"`
	IsDefault   bool      `json:"isDefault" gorm:"default:false"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type MasterCategory struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Code        string    `json:"code" gorm:"uniqueIndex;not null"`
	Name        string    `json:"name" gorm:"not null"`
	Description string    `json:"description"`
	IsActive    bool      `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
