package models

import (
	"time"

	"gorm.io/gorm"
)

type Building struct {
	gorm.Model
	Name                  string    `json:"name" gorm:"not null"`
	AssetNo               string    `json:"assetNo" gorm:"uniqueIndex"`
	Type                  string    `json:"type"`
	Location              string    `json:"location"`
	Address               string    `json:"address"`
	City                  string    `json:"city"`
	District              string    `json:"district"`
	Province              string    `json:"province"`
	DistanceToDealer      string    `json:"distanceToDealer"`
	RoadCondition         string    `json:"roadCondition"`
	ElectricityPower      string    `json:"electricityPower"`
	WaterSource           string    `json:"waterSource"`
	PhoneLineCount        string    `json:"phoneLineCount"`
	LandArea              string    `json:"landArea"`
	BuildingArea          string    `json:"buildingArea"`
	FrontYardArea         string    `json:"frontYardArea"`
	TotalFloors           string    `json:"totalFloors"`
	ParkingCapacity       string    `json:"parkingCapacity"`
	BuildingAge           string    `json:"buildingAge"`
	FenceCondition        string    `json:"fenceCondition"`
	GateCondition         string    `json:"gateCondition"`
	RenovationNeeded      bool      `json:"renovationNeeded"`
	RenovationCostEstimate string   `json:"renovationCostEstimate"`
	RenovationTimeEstimate string   `json:"renovationTimeEstimate"`
	RentCost              float64   `json:"rentCost"`
	StartDate             time.Time `json:"startDate"`
	EndDate               time.Time `json:"endDate"`
	TaxPPH                string    `json:"taxPPH"`
	NotaryFee             string    `json:"notaryFee"`
	PurchasePrice         float64   `json:"purchasePrice"`
	OwnerName             string    `json:"ownerName"`
	OwnerPhone            string    `json:"ownerPhone"`
	OwnerAddress          string    `json:"ownerAddress"`
	Status                string    `json:"status" gorm:"default:'Active'"`
	Ownership             string    `json:"ownership" gorm:"default:'Rent'"` // Rent or Own
	TotalMaintenanceCost  float64   `json:"totalMaintenanceCost"`
	UtilityCost           float64   `json:"utilityCost"`
	FloorPlanImage        string    `json:"floorPlanImage"`
}
