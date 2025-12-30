
import React from 'react';

export interface Employee {
  name: string;
  phone: string;
  role: string;
  avatar: string;
}

export interface UserRecord {
  id: string;
  employeeId?: string; // NIK
  name: string;
  email: string;
  role: string;
  department: string;
  location?: string; // Branch Location
  phone: string;
  joinDate?: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar: string;
  permissions?: string[]; // Array of allowed module IDs
}

export interface SparePart {
  name: string;
  qty: number;
  price: string;
  imageUrl?: string; // Added image URL for spare parts
}

export interface PurchaseRecord {
  id: string;
  date: string;
  vendorName: string;
  qty: number;
  unitPrice: string;
  totalPrice: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  attachmentUrl?: string;
}

export interface AssetRecord {
  id: number;
  transactionNumber?: string;
  employee: Employee;
  category: string;
  itemName: string;
  itemDescription: string;
  qty: number;
  date: string;
  remainingStock: number;
  itemCode: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Closed' | 'Draft' | 'On Progress';
}

export interface WorkflowLog {
  step: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Revised';
  actor: string;
  date: string;
  comment?: string;
}

export interface VehicleRecord {
  id: number;
  noRegistrasi: string;
  nama: string;
  noPolisi: string;
  channel: string;
  cabang: string;
  status: 'Aktif' | 'Tidak Aktif';
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected' | 'Revised'; 
  workflow?: WorkflowLog[];
  ownership?: 'Milik Modena' | 'Sewa';
  merek?: string;
  tipeKendaraan?: string;
  jenis?: string;
  model?: string;
  tahunPembuatan?: string;
  warna?: string;
  isiSilinder?: string;
  noRangka?: string;
  noMesin?: string;
  pengguna?: string;
  noBpkb?: string;
  keteranganBpkb?: string;
  masaBerlaku1?: string;
  masaBerlaku5?: string;
  masaBerlakuKir?: string;
  tglBeli?: string;
  hargaBeli?: string;
  noPolisAsuransi?: string;
  jangkaPertanggungan?: string;
  
  // Depreciation Fields
  depreciationMethod?: string;
  usefulLife?: number;
  residualValue?: string;

  // Documents & Photos
  stnkUrl?: string;
  kirUrl?: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
}

export interface VehicleContractRecord {
  id: string;
  noPolisi: string;
  aset: string;
  noKontrak: string;
  vendor: string;
  tglMulai: string;
  tglBerakhir: string;
  biayaSewa: string;
  status: 'Aktif' | 'Selesai';
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected' | 'Revised';
  workflow?: WorkflowLog[];
  keterangan?: string;
  ownership?: 'Milik Modena' | 'Sewa';
  
  // Fields from Image
  merek?: string;
  tipeKendaraan?: string;
  model?: string;
  tahunPembuatan?: string;
  warna?: string;
  isiSilinder?: string;
  channel?: string;
  cabang?: string;
  penggunaUtama?: string;
  noBpkb?: string;
  keteranganBpkb?: string;
  masaBerlaku1?: string;
  masaBerlaku5?: string;
  masaBerlakuKir?: string;
  tglBeli?: string;
  noPolisAsuransi?: string;
  jangkaPertanggungan?: string;
  
  // Documents
  attachmentUrl?: string; // Main Contract Doc
  stnkUrl?: string;
  kirUrl?: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
}

export interface MaintenanceSchedule {
  id: string;
  taskName: string;
  plannedDate: string;
  technician: string;
  status: 'Scheduled' | 'Completed' | 'Missed';
}

export interface MaintenanceProposal {
  id: string;
  vendorName: string;
  proposalName: string;
  submissionDate: string;
  estimatedCost: string;
  status: 'Pending' | 'Reviewing' | 'Approved' | 'Rejected';
  attachmentUrl?: string;
}

export interface CooperationDetail {
  activeVendor?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  serviceLevelAgreement?: string;
  monthlyMaintenanceFee?: string;
}

export type BuildingWorkflowStatus = 'Draft' | 'Pending Approval' | 'Revised' | 'Approved' | 'Rejected';

export interface BuildingAssetRecord {
  id: string;
  assetCode: string;
  assetType: 'AC' | 'APAR' | 'CCTV' | 'Genset' | 'Lift' | 'Pompa' | 'Panel Listrik' | 'Fire Alarm' | string;
  assetName: string;
  brand?: string;
  modelNumber?: string;
  serialNumber?: string;
  capacity?: string;
  
  // Placement
  buildingName: string;
  floor: string;
  roomName: string;
  
  // Maintenance
  maintenanceFrequency: 'Monthly' | 'Quarterly' | 'Yearly' | 'None';
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  schedules?: MaintenanceSchedule[];
  
  // Proposals & Cooperation
  proposals?: MaintenanceProposal[];
  cooperation?: CooperationDetail;

  status: 'Good' | 'Fair' | 'Critical' | 'Maintenance';
  approvalStatus?: BuildingWorkflowStatus;
  ownership: 'Own' | 'Leased';
  vendorMaintenance?: string;
  attachmentUrl?: string;
  qrCodeUrl?: string; // New Field for QR
}

export interface BuildingMaintenanceRecord {
  id: string;
  requestDate: string;
  completionDate?: string;
  assetId: string;
  assetName: string;
  buildingLocation: string; // derived from asset
  maintenanceType: 'Preventive' | 'Corrective' | 'Emergency';
  description: string;
  vendor: string;
  technician?: string;
  cost: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Pending';
  approvalStatus?: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Revised';
  attachmentUrl?: string;
  
  // New Fields for Suggestions
  rating?: number; // 1-5 stars
  evidenceBefore?: string; // URL image
  evidenceAfter?: string; // URL image
  slaStatus?: 'On Track' | 'Overdue' | 'Warning';
}

export interface WorkflowStep {
  role: 'BM' | 'Regional Branches' | 'AVP Dealership' | 'Owner';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Skipped';
  date?: string;
  approver?: string;
  comment?: string;
}

export interface FloorPlanPin {
    id: string;
    x: number; // Percentage
    y: number; // Percentage
    label: string;
    type: 'Asset' | 'Room';
}

export interface BuildingRecord {
  id: string;
  name: string;
  assetNo: string;
  assetCategory?: string;
  type: string;
  ownership: 'Own' | 'Rent';
  location: string;
  subLocation?: string;
  address: string;
  status: string;
  startDate?: string;
  endDate?: string;
  proposals?: BuildingProposal[];
  channel?: string;
  department?: string;
  
  // Financials
  assetValue?: string;
  rentCost?: string;
  purchasePrice?: string; // For Own

  // Workflow
  workflow?: WorkflowStep[];
  currentWorkflowStep?: number; // 0 to 3
  isLeaseProposalFilled?: boolean;

  // New Fields
  floorPlanImage?: string;
  floorPlanPins?: FloorPlanPin[];
  
  // Cost Analysis Data (Mocked)
  totalMaintenanceCost?: string;
  utilityCost?: string; // Electricity, Water

  // PDF Proposal Fields (Expanded)
  city?: string;
  district?: string; // Kabupaten
  province?: string;
  distanceToDealer?: string; // Added field
  
  // Utilities
  electricityPower?: string; // Ampere
  electricitySource?: string; // PLN/Swasta
  waterSource?: string; // PAM/Sumur
  phoneLineCount?: string;
  telephoneDetails?: {
    canAdd: boolean;
    costPerLine: string;
    borneBy: string;
  };
  
  // Physical
  landArea?: string; // Luas Tanah
  buildingArea?: string; // Luas Bangunan
  frontYardArea?: string;
  parkingCapacity?: string;
  buildingAge?: string; // Lama Bangunan Berdiri
  
  // Physical Condition
  fenceCondition?: string;
  gateCondition?: string;
  roadCondition?: string;
  
  // Structure & Materials
  floors?: { ground: string; f1: string; f2: string; f3: string; f4: string; };
  totalFloors?: string;
  structureChecklist?: {
    tiang?: string[]; 
    atap?: string[]; 
    dinding?: string[]; 
    lantai?: string[]; 
    pintu?: string[]; 
    jendela?: string[]; 
    others?: string[]; 
  };

  // Renovation
  renovationNeeded?: boolean;
  renovationCostEstimate?: string;
  renovationTimeEstimate?: string;
  renovationDetailsObj?: {
    costSharing: string;
    gracePeriod: string;
    items: {
      partition: boolean;
      paint: boolean; 
      roof: string;
      lights: boolean; 
      other: string;
    }
  };

  // Environment & Context
  locationContext?: {
    right: string;
    left: string;
    front: string;
    back: string;
    nearIndustry: boolean;
    operationalHours: string;
  };
  environmentConditions?: string[];

  // Security Features (Checkboxes)
  securityFeatures?: string[];
  
  // Owner
  ownerName?: string;
  ownerPhone?: string;
  ownerAddress?: string;
  
  // Documents (Checkboxes)
  documentsAvailable?: string[];
  
  // Financial extras
  taxPPH?: string;
  notaryFee?: string;
  
  // Business Analysis
  businessNotes?: {
    deliveryTime: string;
    dealersCount: string;
    staffComposition: string;
    margin: string;
    competitorPareto: string;
  };
}

// Updated based on PDF F.50/MI-HCO/R00/2021
export interface BuildingProposal {
  id: string;
  name: string; // Used for "Kandidat X"
  
  // 1. Alamat Lokasi
  address: {
    jl: string;
    kota: string;
    kabupaten: string;
    propinsi: string;
  };

  // 2. Telephone Details
  phoneLines: string; // Jumlah & No Line Tlp
  telephoneDetails?: {
    canAdd: boolean; // Dapat ditambah segera?
    costPerLine: string; // Biaya per line
    borneBy: string; // Pemilik / Penyewa
  };

  // 3-4. Utilities
  electricity: string; // Daya Listrik (Ampere/Watt)
  water: string; // PAM/Pompa/Sumur

  // 5. Dimensions & Conditions
  landArea: string; // Luas Tanah (m2)
  buildingArea: string; // Luas Bangunan (m2)
  frontYardArea: string; // Luas Halaman Depan (m2)
  
  fenceCondition: string; // Tembok/Duri/Besi etc.
  fenceHeight: string;
  gateCondition: string; // Pintu Pagar
  gateHeight: string;
  
  parkingCapacity: string; // Parkir Malam (Unit)

  // Security Checkbox
  securityFeatures: string[]; // Security Area Gedung, Security Area Wilayah, CCTV, Alarm, Free Area Assembly Point, Pos Polisi <500m

  // 6. Structure / Floors
  floors: {
    ground: string;
    f1: string;
    f2: string;
    f3: string;
    f4: string;
  };
  totalFloors: string;

  // 7. Material Checklist (Detailed from PDF Page 1 & 2)
  structureChecklist?: {
    tiang?: string[]; // Baja, Kayu
    atap?: string[]; // Alumunium, Tanah Liat, Beton Cor, Genting Beton
    dinding?: string[]; // Batako, Bata, Seng, Triplek
    lantai?: string[]; // Keramik, Tanpa Keramik
    pintu?: string[]; // Kayu, Triplek, Baja, Alumunium, Seng
    jendela?: string[]; // Kayu, Alumunium, Besi
    others?: string[]; // Anti Petir
  };
  
  buildingAge: string; // <5, 5-10, 10-15, >15 tahun

  // 8. Lease Nature
  leaseNature: string; // Baru / Perpanjang
  leasePurpose: string; // Showroom, Kantor, Gudang, Mess, Service

  // 9. Documents
  documents: string[]; // SHM, SHGB, IMB
  shgbExpiryYear?: string; // masa berakhir hak Guna

  // 10. Renovation (Detailed)
  renovationNeeded: boolean;
  renovationCostEstimate: string;
  renovationTimeEstimate: string;
  renovationDetails: string; // Free text
  
  renovationDetailsObj?: {
    costSharing: string; // Pemilik / Penyewa / Kedua Pihak %
    gracePeriod: string; // Hari
    items: {
      partition: boolean;
      paint: boolean; 
      roof: string;
      lights: boolean; 
      other: string;
    }
  };

  // 12. Environment
  environmentConditions: string[]; // Cluster, Padat Penduduk, Rumah Penduduk, Pergudangan, Perkantoran, Lapangan, Terawat/Tidak
  
  // Posisi Lokasi (Page 3)
  locationContext?: {
    right: string;
    left: string;
    front: string;
    back: string;
    nearIndustry: boolean;
    operationalHours: string;
  };

  // 13-15. Logistics
  distanceToDealer: string;
  roadWidth: string;
  roadCondition: string;
  loadingDock: string; // Jenis Truk

  // 16-19. Financials
  rentPrice: string; // Per tahun
  previousRentPrice?: string; // Bila perpanjang
  leasePeriod: string; // Min - Max tahun
  isNegotiable?: boolean;
  taxPPH: string; // Ditanggung oleh...
  notaryFee: string; // Ditanggung oleh...

  // 20. Owner Data
  owner: {
    name: string;
    address: string;
    phone: string;
    representative?: string; // Wakil Pemilik
  };

  // 21. Survey
  surveySummary: {
    pros: string;
    cons: string;
  };

  // 25. Business Notes (Page 5)
  businessNotes?: {
    deliveryTime: string;
    dealersCount: string;
    staffComposition: string;
    margin: string;
    competitorPareto: string;
  };
}

export interface UtilityRecord {
  id: string;
  period: string; // e.g. "January 2024" or specific date
  date: string;
  location: string; // Branch/Building name
  type: 'Listrik (PLN)' | 'Air (PDAM)' | 'Internet' | 'Gas';
  meterStart?: number;
  meterEnd?: number;
  usage: number; // calculated
  unit: 'kWh' | 'm3' | 'Mbps' | 'L';
  cost: string; // IDR
  status: 'Paid' | 'Unpaid' | 'Pending Review';
  attachmentUrl?: string; // Bill or Meter Photo
  recordedBy: string; // Technician Name
}

export interface ServiceRecord {
  id: string;
  noPolisi: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
  workflow?: WorkflowLog[];
  aset?: string;
  tglStnk?: string;
  jenisServis?: string;
  vendor?: string;
  targetSelesai?: string;
  kmKendaraan?: string;
  masalah?: string;
  penyebab?: string;
  estimasiBiaya?: string;
  jenisPembayaran?: string;
  namaBank?: string;
  nomorRekening?: string;
  spareParts?: SparePart[];
}

export interface TaxKirRecord {
  id: string;
  noPolisi: string;
  tglRequest: string;
  jenis: string;
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
  workflow?: WorkflowLog[];
  aset?: string;
  tahunPembuatan?: string;
  vendor?: string;
  estimasiBiaya?: string;
  jenisPembayaran?: string;
  targetSelesai?: string;
  attachmentUrl?: string;
  jatuhTempo?: string; // New Field for Editable Due Date
}

export interface MutationRecord {
  id: string;
  noPolisi: string;
  cabangAset: string;
  tipeMutasi: string;
  tglPermintaan: string;
  lokasiAsal: string;
  lokasiTujuan: string;
  status: string;
  statusApproval: string;
  workflow?: WorkflowLog[];
}

export interface SalesRecord {
  id: string;
  noPolisi: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  hargaTertinggi: string;
  status: string;
  statusApproval: string;
  workflow?: WorkflowLog[];
  
}

export interface MasterVendorRecord {
  id: number;
  nama: string;
  merek: string;
  alamat: string;
  noTelp: string;
  tipe: string;
  cabang: string;
  aktif: boolean;
}

export interface LogBookRecord {
  id: number;
  lokasiModena: string;
  kategoriTamu: string;
  namaTamu: string;
  tanggalKunjungan: string;
  jamDatang: string;
  jamPulang: string;
  wanita: number;
  lakiLaki: number;
  anakAnak: number;
  note: string;
}

export interface MasterItem {
  id: string | number;
  category: string;
  itemName: string;
  itemCode: string;
  uom: string;
  remainingStock: number;
  minimumStock: number;
  maximumStock: number;
  requestedStock: number;
  purchaseDate: string;
  lastPurchasePrice: string;
  averagePrice: string;
  imageUrl?: string;
  purchaseHistory?: PurchaseRecord[];
}

export interface StationeryRequestItem {
  itemId: string;
  qty: string;
  categoryId?: string;
  uom?: string;
}

export interface StationeryRequestRecord {
  type: string;
  date: string;
  remarks?: string;
  deliveryType: string;
  location: string;
  items: StationeryRequestItem[];
}

export interface ContractRecord {
  id: number;
  assetCategory: string;
  assetNumber: string;
  address: string;
  type: string;
  location: string;
  channel: string;
  subLocation: string;
  status: string;
  ownership?: string;
  department?: string;
}

export interface TimesheetRecord {
  id: string | number;
  employee: Employee;
  date: string;
  location?: string; // New: Building/Branch
  area?: string; // New: Lobby, Toilet, etc.
  shift: 'Pagi' | 'Siang' | 'Malam' | string;
  clockIn: string;
  clockOut: string;
  status: 'Tepat Waktu' | 'Terlambat' | 'Absen' | string;
  tasks?: string[]; // List of completed tasks
  photos: string[]; // Evidence
  note?: string;
}

export interface VendorRecord {
  id: string | number;
  vendorName: string;
  vendorCode: string;
  status: 'Active' | 'Inactive' | 'Blacklist';
  type: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  picName?: string;
}

export interface GeneralMasterItem {
  id: number;
  name: string;
  }

export interface DeliveryLocationRecord {
  id: number;
  name: string;
  address: string;
  type: string;
  }

export interface ReminderRecord {
  id: string | number;
  documentName: string;
  buildingName: string;
  assetNo: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'Urgent' | 'Warning' | 'Safe' | string;
}

export interface GeneralAssetRecord {
  id: string; // Added ID for data management
  assetNumber: string;
  assetCategory: string;
  ownership: 'Own' | 'Rent' | string;
  type: string;
  assetLocation: string;
  channel: string;
  department: string;
  subLocation: string;
  address: string;
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected'; // Added approval status
}

export interface ApprovalTier {
    level: number;
    type: 'Role' | 'User'; // Added to distinguish between Role and Specific User
    value: string; // Was 'role', now holds Role Name or User Name
    sla: number; // Days
}

export interface MasterApprovalRecord {
    id: string;
    module: string; // e.g. 'Vehicle Request', 'Service', 'Tax', 'Mutation', 'Sales'
    branch: string; // 'All' or specific branch name
    tiers: ApprovalTier[];
    updatedAt: string;
}
