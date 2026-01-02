package config

import (
	"fms-backend/models"
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	host := os.Getenv("DB_HOST")
	if host == "" {
		host = "localhost"
	}
	port := os.Getenv("DB_PORT")
	if port == "" {
		port = "5433"
	}
	user := os.Getenv("DB_USER")
	if user == "" {
		user = "postgres"
	}
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		password = "12345"
	}
	dbname := os.Getenv("DB_NAME")
	if dbname == "" {
		dbname = "fms_db"
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta",
		host, user, password, dbname, port)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully")

	// Auto migrate models
	DB.AutoMigrate(
		&models.GeneralMaster{},
		&models.MasterCategory{},
		&models.ModenaPOD{},
		&models.PODOccupant{},
		&models.PODRequest{},
	)
	log.Println("Database migrated successfully")
}
