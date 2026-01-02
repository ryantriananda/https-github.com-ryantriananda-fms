package models

import (
	"time"

	"gorm.io/gorm"
)

type Timesheet struct {
	gorm.Model
	EmployeeID uint      `json:"employeeId" gorm:"index"`
	Employee   User      `json:"employee" gorm:"foreignKey:EmployeeID"`
	Location   string    `json:"location"`
	Area       string    `json:"area"`
	Date       time.Time `json:"date"`
	Shift      string    `json:"shift"`
	ClockIn    time.Time `json:"clockIn"`
	ClockOut   time.Time `json:"clockOut"`
	Status     string    `json:"status"` // Tepat Waktu, Terlambat, Absen
}
