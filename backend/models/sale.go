package models

import (
	"time"

	"gorm.io/gorm"
)

type Sale struct {
	gorm.Model
	NoPolisi       string    `json:"noPolisi"`
	AssetNumber    string    `json:"assetNumber"`
	AssetName      string    `json:"assetName"`
	TglRequest     time.Time `json:"tglRequest"`
	Channel        string    `json:"channel"`
	Cabang         string    `json:"cabang"`
	HargaTertinggi float64   `json:"hargaTertinggi"`
	HargaPembuka   float64   `json:"hargaPembuka"`
	Status         string    `json:"status" gorm:"default:'Open Bidding'"`
	StatusApproval string    `json:"statusApproval" gorm:"default:'Pending'"`
	AssetType      string    `json:"assetType"` // VEHICLE or GENERAL_ASSET
	Bids           []Bid     `json:"bids" gorm:"foreignKey:SaleID"`
}

type Bid struct {
	gorm.Model
	SaleID      uint      `json:"saleId" gorm:"index"`
	Sale        Sale      `json:"-" gorm:"foreignKey:SaleID"`
	Amount      float64   `json:"amount"`
	BidderName  string    `json:"bidderName"`
	BidderRole  string    `json:"bidderRole"`
	BidderEmail string    `json:"bidderEmail"`
	BidderPhone string    `json:"bidderPhone"`
	BidderKtp   string    `json:"bidderKtp"`
	Timestamp   time.Time `json:"timestamp"`
}
