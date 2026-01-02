package models

import (
	"time"

	"gorm.io/gorm"
)

type Mutation struct {
	gorm.Model
	NoPolisi       string    `json:"noPolisi"`
	AssetNumber    string    `json:"assetNumber"`
	AssetName      string    `json:"assetName"`
	CabangAset     string    `json:"cabangAset"`
	TipeMutasi     string    `json:"tipeMutasi"`
	TglPermintaan  time.Time `json:"tglPermintaan"`
	LokasiAsal     string    `json:"lokasiAsal"`
	LokasiTujuan   string    `json:"lokasiTujuan"`
	Status         string    `json:"status" gorm:"default:'Pending'"`
	StatusApproval string    `json:"statusApproval" gorm:"default:'Pending'"`
	PICBefore      string    `json:"picBefore"`
	PICAfter       string    `json:"picAfter"`
	AssetType      string    `json:"assetType"` // VEHICLE or GENERAL_ASSET
	BiayaMutasi    float64   `json:"biayaMutasi"`
}
