package models

import (
	"time"

	"gorm.io/gorm"
)

type LogBook struct {
	gorm.Model
	LokasiModena     string    `json:"lokasiModena"`
	KategoriTamu     string    `json:"kategoriTamu"` // Customer, Supplier, etc.
	NamaTamu         string    `json:"namaTamu"`
	TanggalKunjungan time.Time `json:"tanggalKunjungan"`
	JamDatang        string    `json:"jamDatang"`
	JamPulang        string    `json:"jamPulang"`
	Wanita           int       `json:"wanita"`
	LakiLaki         int       `json:"lakiLaki"`
	AnakAnak         int       `json:"anakAnak"`
	Note             string    `json:"note"`
}
