package models

import (
	"time"
)

// ModenaPOD - Data kamar/kos yang disewakan ke karyawan
type ModenaPOD struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	KodePOD       string    `json:"kodePod" gorm:"uniqueIndex;not null"`
	NamaPOD       string    `json:"namaPod" gorm:"not null"`
	Alamat        string    `json:"alamat"`
	Kota          string    `json:"kota"`
	JumlahKamar   int       `json:"jumlahKamar"`
	KamarTersedia int       `json:"kamarTersedia"`
	HargaPerBulan float64   `json:"hargaPerBulan"`
	Fasilitas     string    `json:"fasilitas"`
	Status        string    `json:"status" gorm:"default:'Aktif'"` // Aktif, Nonaktif
	Keterangan    string    `json:"keterangan"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

// PODOccupant - Data penghuni POD
type PODOccupant struct {
	ID              uint      `json:"id" gorm:"primaryKey"`
	PODID           uint      `json:"podId" gorm:"index"`
	POD             ModenaPOD `json:"pod" gorm:"foreignKey:PODID"`
	NoKamar         string    `json:"noKamar"`
	NamaKaryawan    string    `json:"namaKaryawan" gorm:"not null"`
	NIK             string    `json:"nik"`
	Departemen      string    `json:"departemen"`
	Cabang          string    `json:"cabang"`
	TglMasuk        string    `json:"tglMasuk"`
	TglKeluar       string    `json:"tglKeluar"`
	StatusHuni      string    `json:"statusHuni" gorm:"default:'Aktif'"` // Aktif, Keluar
	BiayaPerBulan   float64   `json:"biayaPerBulan"`
	MetodePembayaran string   `json:"metodePembayaran"`
	Keterangan      string    `json:"keterangan"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

// PODRequest - Permintaan kamar POD
type PODRequest struct {
	ID             uint      `json:"id" gorm:"primaryKey"`
	NoRequest      string    `json:"noRequest" gorm:"uniqueIndex;not null"`
	NamaKaryawan   string    `json:"namaKaryawan" gorm:"not null"`
	NIK            string    `json:"nik"`
	Departemen     string    `json:"departemen"`
	Cabang         string    `json:"cabang"`
	TglRequest     string    `json:"tglRequest"`
	TglMulai       string    `json:"tglMulai"`
	DurasiSewa     int       `json:"durasiSewa"` // dalam bulan
	Alasan         string    `json:"alasan"`
	Status         string    `json:"status" gorm:"default:'Pending'"` // Pending, Approved, Rejected
	ApprovedBy     string    `json:"approvedBy"`
	ApprovedDate   string    `json:"approvedDate"`
	PODID          *uint     `json:"podId"`
	POD            *ModenaPOD `json:"pod" gorm:"foreignKey:PODID"`
	NoKamarAssigned string   `json:"noKamarAssigned"`
	Keterangan     string    `json:"keterangan"`
	CreatedAt      time.Time `json:"createdAt"`
	UpdatedAt      time.Time `json:"updatedAt"`
}
