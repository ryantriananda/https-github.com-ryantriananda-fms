package models

import (
	"time"

	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	VehicleID      uint      `json:"vehicleId" gorm:"index"`
	Vehicle        Vehicle   `json:"-" gorm:"foreignKey:VehicleID"`
	NoPolisi       string    `json:"noPolisi"`
	AssetName      string    `json:"aset"`
	TglRequest     time.Time `json:"tglRequest"`
	Channel        string    `json:"channel"`
	Cabang         string    `json:"cabang"`
	Status         string    `json:"status" gorm:"default:'Pending'"`
	StatusApproval string    `json:"statusApproval" gorm:"default:'Pending'"`
	VendorID       uint      `json:"vendorId" gorm:"index"`
	Vendor         string    `json:"vendor"`
	KmKendaraan    string    `json:"kmKendaraan"`
	Masalah        string    `json:"masalah"`
	JenisServis    string    `json:"jenisServis"`
	EstimasiBiaya  float64   `json:"estimasiBiaya"`
	Technician     string    `json:"technician"`
	SpareParts     []SparePart `json:"spareParts" gorm:"foreignKey:ServiceID"`
}

type SparePart struct {
	gorm.Model
	ServiceID uint    `json:"serviceId" gorm:"index"`
	Service   Service `json:"-" gorm:"foreignKey:ServiceID"`
	Name      string  `json:"name"`
	Qty       int     `json:"qty"`
	Price     float64 `json:"price"`
	ImageUrl  string  `json:"imageUrl"`
}
