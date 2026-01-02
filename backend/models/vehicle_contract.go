package models

import (
	"time"

	"gorm.io/gorm"
)

type VehicleContract struct {
	gorm.Model
	NoKontrak      string    `json:"noKontrak" gorm:"uniqueIndex;not null"`
	NoPolisi       string    `json:"noPolisi" gorm:"not null"`
	Aset           string    `json:"aset"` // Deskripsi unit
	VendorID       uint      `json:"vendorId" gorm:"index"`
	VendorRef      Vendor    `json:"-" gorm:"foreignKey:VendorID"`
	Vendor         string    `json:"vendor"`
	TglMulai       time.Time `json:"tglMulai"`
	TglBerakhir    time.Time `json:"tglBerakhir"`
	BiayaSewa      float64   `json:"biayaSewa"`
	ApprovalStatus string    `json:"approvalStatus" gorm:"default:'Pending'"`
	Status         string    `json:"status" gorm:"default:'Active'"`
	Channel        string    `json:"channel"`
	Cabang         string    `json:"cabang"`
	PenggunaUtama  string    `json:"penggunaUtama"`
	AttachmentUrl  string    `json:"attachmentUrl"`
	StnkUrl        string    `json:"stnkUrl"`
	KirUrl         string    `json:"kirUrl"`
	PhotoFront     string    `json:"photoFront"`
	PhotoRear      string    `json:"photoRear"`
	PhotoRight     string    `json:"photoRight"`
	PhotoLeft      string    `json:"photoLeft"`
	Merek          string    `json:"merek"`
	TipeKendaraan  string    `json:"tipeKendaraan"`
	VehicleModel   string    `json:"model" gorm:"column:model"`
	TahunPembuatan string    `json:"tahunPembuatan"`
	Warna          string    `json:"warna"`
	IsiSilinder    string    `json:"isiSilinder"`
	Ownership      string    `json:"ownership" gorm:"default:'Sewa'"`
}
