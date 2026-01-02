package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name        string    `json:"name" gorm:"not null"`
	Email       string    `json:"email" gorm:"uniqueIndex;not null"`
	Password    string    `json:"-" gorm:"not null"`
	Phone       string    `json:"phone"`
	Role        string    `json:"role" gorm:"default:'Staff'"`
	Department  string    `json:"department"`
	Location    string    `json:"location"`
	Avatar      string    `json:"avatar"`
	Status      string    `json:"status" gorm:"default:'Active'"`
	JoinDate    time.Time `json:"joinDate"`
	LastActive  time.Time `json:"lastActive"`
	Permissions []string  `json:"permissions" gorm:"type:text[]"`
}

type UserResponse struct {
	ID         uint      `json:"id"`
	Name       string    `json:"name"`
	Email      string    `json:"email"`
	Phone      string    `json:"phone"`
	Role       string    `json:"role"`
	Department string    `json:"department"`
	Location   string    `json:"location"`
	Avatar     string    `json:"avatar"`
	Status     string    `json:"status"`
	JoinDate   time.Time `json:"joinDate"`
	LastActive time.Time `json:"lastActive"`
}

func (u *User) ToResponse() UserResponse {
	return UserResponse{
		ID:         u.ID,
		Name:       u.Name,
		Email:      u.Email,
		Phone:      u.Phone,
		Role:       u.Role,
		Department: u.Department,
		Location:   u.Location,
		Avatar:     u.Avatar,
		Status:     u.Status,
		JoinDate:   u.JoinDate,
		LastActive: u.LastActive,
	}
}
