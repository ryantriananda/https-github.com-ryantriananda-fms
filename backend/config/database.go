package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"fms-backend/models"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDatabase() {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	// First, connect to postgres database to create fms_db if not exists
	createDBIfNotExists(host, port, user, password, dbname)

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta",
		host, user, password, dbname, port)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully")

	// Auto migrate models
	err = DB.AutoMigrate(
		// Core models
		&models.User{},
		&models.Vehicle{},
		&models.Building{},
		&models.GeneralAsset{},
		&models.Vendor{},
		&models.Insurance{},
		&models.InsuranceClaim{},
		// Transaction models
		&models.Service{},
		&models.SparePart{},
		&models.TaxKir{},
		&models.Mutation{},
		&models.Sale{},
		&models.Bid{},
		&models.Utility{},
		&models.Timesheet{},
		&models.LogBook{},
		// Stationery models
		&models.StationeryRequest{},
		&models.StationeryRequestItem{},
		&models.MasterItem{},
		&models.Purchase{},
		// Building asset models
		&models.BuildingAsset{},
		&models.BuildingMaintenance{},
		// Vehicle contract
		&models.VehicleContract{},
		// Reminder models
		&models.VehicleReminder{},
		&models.BuildingReminder{},
		&models.MaintenanceSchedule{},
		// Master data models
		&models.MasterApproval{},
		&models.ApprovalTier{},
		&models.DeliveryLocation{},
		&models.GeneralMaster{},
		&models.MasterCategory{},
		// Compliance
		&models.Compliance{},
	)

	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	log.Println("Database migrated successfully")
}

func createDBIfNotExists(host, port, user, password, dbname string) {
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=postgres sslmode=disable",
		host, port, user, password)
	
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Printf("Warning: Could not connect to postgres database: %v", err)
		return
	}
	defer db.Close()

	// Check if database exists
	var exists bool
	err = db.QueryRow("SELECT EXISTS(SELECT datname FROM pg_catalog.pg_database WHERE datname = $1)", dbname).Scan(&exists)
	if err != nil {
		log.Printf("Warning: Could not check if database exists: %v", err)
		return
	}

	if !exists {
		_, err = db.Exec(fmt.Sprintf("CREATE DATABASE %s", dbname))
		if err != nil {
			log.Printf("Warning: Could not create database: %v", err)
			return
		}
		log.Printf("Database %s created successfully", dbname)
	}
}
