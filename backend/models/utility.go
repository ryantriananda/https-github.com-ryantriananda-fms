package models

import (
	"time"

	"gorm.io/gorm"
)

type Utility struct {
	gorm.Model
	Period        string    `json:"period"`
	Date          time.Time `json:"date"`
	Location      string    `json:"location"`
	Type          string    `json:"type"` // Listrik, Air, Internet
	MeterStart    float64   `json:"meterStart"`
	MeterEnd      float64   `json:"meterEnd"`
	Usage         float64   `json:"usage"`
	Unit          string    `json:"unit"`
	Cost          float64   `json:"cost"`
	Status        string    `json:"status" gorm:"default:'Pending'"` // Paid, Unpaid, Pending
	AttachmentUrl string    `json:"attachmentUrl"`
}
