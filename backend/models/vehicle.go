package models

import (
	"time"

	"gorm.io/gorm"
)

type Vehicle struct {
	gorm.Model
	NoPolisi          string    `json:"noPolisi" gorm:"uniqueIndex;not null"`
	NoRegistrasi      string    `json:"noRegistrasi"`
	Nama              string    `json:"nama" gorm:"not null"`
	Merek             string    `json:"merek"`
	TipeKendaraan     string    `json:"tipeKendaraan"`
	VehicleModel      string    `json:"model" gorm:"column:model"`
	TahunPembuatan    string    `json:"tahunPembuatan"`
	Warna             string    `json:"warna"`
	IsiSilinder       string    `json:"isiSilinder"`
	NoRangka          string    `json:"noRangka"`
	NoMesin           string    `json:"noMesin"`
	NoBpkb            string    `json:"noBpkb"`
	MasaBerlaku1      time.Time `json:"masaBerlaku1"`      // STNK 1 Tahun
	MasaBerlaku5      time.Time `json:"masaBerlaku5"`      // STNK 5 Tahun
	MasaBerlakuKir    time.Time `json:"masaBerlakuKir"`
	TglBeli           time.Time `json:"tglBeli"`
	HargaBeli         float64   `json:"hargaBeli"`
	NoPolisAsuransi   string    `json:"noPolisAsuransi"`
	JangkaPertanggungan string  `json:"jangkaPertanggungan"`
	Channel           string    `json:"channel"`
	Cabang            string    `json:"cabang"`
	Pengguna          string    `json:"pengguna"`
	Status            string    `json:"status" gorm:"default:'Active'"`
	Ownership         string    `json:"ownership" gorm:"default:'Milik Modena'"` // Milik Modena or Sewa
	ApprovalStatus    string    `json:"approvalStatus" gorm:"default:'Approved'"`
	PhotoFront        string    `json:"photoFront"`
	PhotoRear         string    `json:"photoRear"`
	PhotoRight        string    `json:"photoRight"`
	PhotoLeft         string    `json:"photoLeft"`
	StnkUrl           string    `json:"stnkUrl"`
	KirUrl            string    `json:"kirUrl"`
}
