package models

import (
	"time"

	"gorm.io/gorm"
)

type StationeryRequest struct {
	gorm.Model
	Type           string    `json:"type"` // ATK or ARK
	DeliveryType   string    `json:"deliveryType"`
	LocationID     uint      `json:"locationId" gorm:"index"`
	Location       string    `json:"location"`
	Date           time.Time `json:"date"`
	Remarks        string    `json:"remarks"`
	Status         string    `json:"status" gorm:"default:'Pending'"`
	ApprovalStatus string    `json:"approvalStatus" gorm:"default:'Pending'"`
	RequestedBy    uint      `json:"requestedBy" gorm:"index"`
	Requester      User      `json:"-" gorm:"foreignKey:RequestedBy"`
	Items          []StationeryRequestItem `json:"items" gorm:"foreignKey:RequestID"`
}

type StationeryRequestItem struct {
	gorm.Model
	RequestID  uint              `json:"requestId" gorm:"index"`
	Request    StationeryRequest `json:"-" gorm:"foreignKey:RequestID"`
	ItemID     uint              `json:"itemId" gorm:"index"`
	Item       MasterItem        `json:"item" gorm:"foreignKey:ItemID"`
	Qty        int               `json:"qty"`
	CategoryID uint              `json:"categoryId"`
	UOM        string            `json:"uom"`
}

type MasterItem struct {
	gorm.Model
	Category          string    `json:"category"` // ATK or ARK
	ItemName          string    `json:"itemName" gorm:"not null"`
	ItemCode          string    `json:"itemCode" gorm:"uniqueIndex;not null"`
	UOM               string    `json:"uom"`
	RemainingStock    int       `json:"remainingStock"`
	MinimumStock      int       `json:"minimumStock"`
	MaximumStock      int       `json:"maximumStock"`
	RequestedStock    int       `json:"requestedStock"`
	LastPurchasePrice float64   `json:"lastPurchasePrice"`
	AveragePrice      float64   `json:"averagePrice"`
	PurchaseDate      time.Time `json:"purchaseDate"`
	ImageUrl          string    `json:"imageUrl"`
}
