package models

import (
	"time"

	"gorm.io/gorm"
)

type TaxKir struct {
	gorm.Model
	VehicleID       uint      `json:"vehicleId" gorm:"index"`
	Vehicle         Vehicle   `json:"-" gorm:"foreignKey:VehicleID"`
	NoPolisi        string    `json:"noPolisi" gorm:"not null"`
	AssetName       string    `json:"aset"`
	TglRequest      time.Time `json:"tglRequest"`
	Jenis           string    `json:"jenis"` // Pajak STNK or KIR
	Channel         string    `json:"channel"`
	Cabang          string    `json:"cabang"`
	Status          string    `json:"status" gorm:"default:'Pending'"`
	StatusApproval  string    `json:"statusApproval" gorm:"default:'Pending'"`
	JatuhTempo      time.Time `json:"jatuhTempo"`
	EstimasiBiaya   float64   `json:"estimasiBiaya"`
	TargetSelesai   time.Time `json:"targetSelesai"`
	JenisPembayaran string    `json:"jenisPembayaran"`
	AttachmentUrl   string    `json:"attachmentUrl"`
}
