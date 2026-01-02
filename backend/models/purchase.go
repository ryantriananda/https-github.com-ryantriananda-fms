package models

import (
	"time"

	"gorm.io/gorm"
)

type Purchase struct {
	gorm.Model
	Date          time.Time  `json:"date"`
	VendorID      uint       `json:"vendorId" gorm:"index"`
	Vendor        Vendor     `json:"-" gorm:"foreignKey:VendorID"`
	VendorName    string     `json:"vendorName"`
	ItemID        uint       `json:"itemId" gorm:"index"`
	Item          MasterItem `json:"-" gorm:"foreignKey:ItemID"`
	ItemName      string     `json:"itemName"`
	Qty           int        `json:"qty"`
	UnitPrice     float64    `json:"unitPrice"`
	TotalPrice    float64    `json:"totalPrice"`
	Status        string     `json:"status" gorm:"default:'Pending'"`
	AttachmentUrl string     `json:"attachmentUrl"`
}
