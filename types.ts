
export interface GeneralMasterItem {
  id: number | string;
  name: string;
  category?: string;
  sourceCategory?: string;
}

export interface RequestTypeRecord {
  id: number | string;
  name: string;
  status: 'Active' | 'Inactive';
}

export interface UserRecord {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  department?: string;
  avatar?: string;
  status: 'Active' | 'Inactive';
  lastActive?: string;
  employeeId?: string;
  joinDate?: string;
  location?: string;
  permissions?: string[];
}

export interface MasterItem {
  id: string | number;
  category: string;
  itemName: string;
  itemCode: string;
  uom: string;
  inStock: number; // Added inStock
  remainingStock: number;
  minimumStock: number;
  maximumStock: number;
  requestedStock: number;
  lastPurchasePrice: string;
  averagePrice: string;
  purchaseDate: string;
  imageUrl?: string;
}

export interface AssetRecord {
  id: number | string;
  transactionNumber?: string;
  employee: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: string;
  itemName: string;
  qty: number;
  uom?: string;
  date: string;
  status: string;
  itemDescription?: string;
  type?: string;
  deliveryType?: string;
  location?: string;
  remarks?: string;
}

export interface StationeryRequestRecord extends AssetRecord {
  items?: StationeryRequestItem[];
}

export interface StationeryRequestItem {
  itemId: string;
  qty: string | number;
  categoryId: string;
  uom: string;
}

export interface VehicleRecord {
  id: number | string;
  noPolisi: string;
  nama: string;
  merek: string;
  tahunPembuatan: string;
  ownership: 'Milik Modena' | 'Sewa';
  channel: string;
  cabang: string;
  approvalStatus: string;
  status: string;
  model?: string;
  warna?: string;
  isiSilinder?: string;
  noRangka?: string;
  noMesin?: string;
  pengguna?: string;
  noBpkb?: string;
  keteranganBpkb?: string;
  noStnk?: string;
  noKir?: string;
  masaBerlaku1?: string;
  masaBerlaku5?: string;
  masaBerlakuKir?: string;
  tglBeli?: string;
  hargaBeli?: string;
  noPolisAsuransi?: string;
  jangkaPertanggungan?: string;
  depreciationMethod?: string;
  usefulLife?: number;
  residualValue?: string;
  stnkUrl?: string;
  kirUrl?: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
  tipeKendaraan?: string;
  // NEW fields for Live Bidding
  odometer?: string;
  images?: Array<{
    id: string;
    url: string;
    type: string;
    caption: string;
  }>;
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    expiry?: string;
  }>;
  condition?: 'Baik' | 'Cukup' | 'Rusak';
  conditionNotes?: string;
}

export interface VehicleContractRecord {
  id: string;
  noKontrak?: string;
  noPolisi: string;
  aset?: string;
  vendor?: string;
  tglMulai?: string;
  tglBerakhir?: string;
  biayaSewa?: string;
  approvalStatus?: string;
  status?: string;
  channel?: string;
  cabang?: string;
  penggunaUtama?: string;
  attachmentUrl?: string;
  stnkUrl?: string;
  kirUrl?: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
}

export interface ServiceRecord {
  id: string | number;
  noPolisi: string;
  tglRequest: string;
  channel?: string;
  cabang?: string;
  status: string;
  statusApproval: string;
  aset?: string;
  vendor?: string;
  kmKendaraan?: string;
  masalah?: string;
  jenisServis?: string;
  spareParts?: SparePart[];
  photoBefore?: string;
  photoAfter?: string;
  estimasiBiaya?: string;
  completionDate?: string;
  technician?: string;
  description?: string;
  cost?: string;
  rating?: number;
  evidenceBefore?: string;
  evidenceAfter?: string;
  buildingLocation?: string; // For building maintenance mapped here
}

export interface SparePart {
  name: string;
  qty: number;
  price: string | number;
  imageBefore?: string;
  imageAfter?: string;
}

export interface TaxKirRecord {
  id: string | number;
  noPolisi: string;
  tglRequest: string;
  jenis: string;
  channel?: string;
  cabang?: string;
  status: string;
  statusApproval?: string;
  aset?: string;
  jatuhTempo?: string;
  targetSelesai?: string;
  estimasiBiaya?: string;
  jenisPembayaran?: string;
  attachmentUrl?: string;
}

export interface VehicleReminderRecord {
  id: string | number;
  noPolisi: string;
  vehicleName: string;
  branch: string;
  type: string;
  status: string;
  expiryDate: string;
}

export interface MutationRecord {
  id: string;
  assetType: 'VEHICLE' | 'GENERAL_ASSET';
  assetNumber?: string;
  assetName?: string;
  noPolisi?: string;
  cabangAset?: string;
  tipeMutasi?: string;
  tglPermintaan: string;
  lokasiAsal?: string;
  lokasiTujuan?: string;
  status?: string;
  statusApproval?: string;
  picBefore?: string;
  picAfter?: string;
  biayaMutasi?: string;
  checklistCondition?: string[];
  checklistNotes?: Record<string, string>;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
  photoInterior?: string;
  documentStnk?: string;
}

export interface SalesRecord {
  id: string;
  assetType: 'VEHICLE' | 'GENERAL_ASSET';
  assetNumber?: string;
  assetName?: string;
  noPolisi?: string;
  tglRequest: string;
  channel?: string;
  cabang?: string;
  hargaTertinggi?: string;
  status?: string;
  statusApproval?: string;
  hargaPembuka?: string;
  bids?: BidRecord[];
}

export interface BidRecord {
  id: string;
  amount: string;
  bidderName: string;
  bidderRole?: string;
  bidderEmail?: string;
  bidderPhone?: string;
  bidderKtp?: string;
  bidderAvatar?: string;
  timestamp: string;
}

export interface BidderRegistration {
  name: string;
  ktp: string;
  phone: string;
  email: string;
  agreedToTerms: boolean;
}

export interface RentalHistoryRecord {
  id: string;
  periodStart: string;
  periodEnd: string;
  lessorName: string;
  annualCost: string;
  notes?: string;
  status: 'Active' | 'Completed' | 'Terminated';
}

export interface BuildingRecord {
  id: string | number;
  name: string;
  assetNo: string;
  type: string;
  startDate?: string;
  endDate?: string;
  ownership: 'Rent' | 'Own';
  location: string;
  address: string;
  status: string;
  
  // PDF Point 1
  city?: string;
  kabupaten?: string;
  province?: string;
  
  // PDF Point 2
  phoneLineCount?: string;
  phoneLineDetails?: {
    canAdd: boolean;
    costPerLine: string;
    borneBy: 'Pemilik' | 'Penyewa';
  };

  // PDF Point 3
  electricityDetails?: {
    power: string;
    source: 'PLN' | 'Swasta';
  };
  electricityPower?: string; // Keeping for backward compat

  // PDF Point 4
  waterSource?: string; // Pam/Pompa/Sumur/Atau

  // PDF Point 5 (Dimensions)
  landDimensions?: { length: string; width: string; total: string };
  buildingDimensions?: { length: string; width: string; total: string };
  yardDimensions?: { length: string; width: string; total: string };
  
  landArea?: string; // Backward compat
  buildingArea?: string; // Backward compat
  frontYardArea?: string; // Backward compat

  fenceDetails?: {
    material: string; // Tembok/Duri/Besi/Seng
    condition: 'Baik' | 'Sedang' | 'Kurang';
    height: string;
    gateMaterial: string;
    gateCondition: 'Baik' | 'Sedang' | 'Kurang';
    gateHeight: string;
  };

  parkingDetails?: { hasParking: boolean; capacity: string };
  
  // PDF Point 5 & 6 (Security & Checklist)
  securityChecklist?: string[]; // Security Area, CCTV, etc.
  
  // PDF Point 6 (Floors)
  totalFloors?: string;
  floorDimensions?: {
    dasar: { l: string; w: string; area: string; photo?: string };
    lt1: { l: string; w: string; area: string; photo?: string };
    lt2: { l: string; w: string; area: string; photo?: string };
    lt3: { l: string; w: string; area: string; photo?: string };
    lt4: { l: string; w: string; area: string; photo?: string };
  };

  // PDF Point 7 (Materials)
  materialChecklist?: string[]; 
  buildingAge?: string; // <5, 5-10, etc.

  // New Documentation Fields
  photoFront?: string;
  photoSide?: string;
  photoRoad?: string;
  photoInterior?: string;
  floorPlanMaster?: string; // NEW: Floor Plan Layout
  
  // New Legal Documents
  docSertifikat?: string;
  docPBB?: string;
  docIMB?: string;
  docContract?: string;

  // Legacy/Other Fields
  distanceToDealer?: string;
  roadCondition?: string;
  parkingCapacity?: string;
  fenceCondition?: string;
  gateCondition?: string;
  structureChecklist?: any; // Deprecated by materialChecklist
  
  locationContext?: {
    right?: string;
    left?: string;
    front?: string;
    back?: string;
    nearIndustry?: boolean;
    operationalHours?: string;
  };
  
  boundaryFront?: string;
  boundaryBack?: string;
  boundaryRight?: string;
  boundaryLeft?: string;
  environmentType?: string[];
  
  environmentConditions?: string[];
  renovationNeeded?: boolean;
  renovationCostEstimate?: string;
  renovationTimeEstimate?: string;
  renovationDetailsObj?: {
    costSharing?: string;
    gracePeriod?: string;
    items: { partition: boolean; paint: boolean; roof: string; lights: boolean; other: string };
  };
  
  renovationItems?: string[];
  renovationCostBearer?: string;
  renovationGracePeriod?: string;

  rentCost?: string;
  rentPeriod?: string; // e.g. "2 Tahun"
  rentDeposit?: string;
  taxPPH?: string;
  taxResponsibility?: string;
  notaryFee?: string;
  
  // Own Specifics
  purchasePrice?: string;
  purchaseDate?: string;
  certificateType?: 'SHM' | 'HGB' | 'Strata';
  certificateNo?: string;
  njop?: string;
  pbbTax?: string;

  // Financials
  annualMaintenanceBudget?: string;
  insuranceCost?: string;
  
  // Rental History
  rentalHistory?: RentalHistoryRecord[];

  ownerName?: string;
  ownerPhone?: string;
  ownerAddress?: string;
  documentsAvailable?: string[];
  
  businessNotes?: {
    deliveryTime?: string;
    dealersCount?: string;
    staffComposition?: string;
    margin?: string;
    competitorPareto?: string;
  };
  estimatedTurnover?: string;
  deliveryTimeDays?: string;
  paretoDealers?: string;
  staffComposition?: string;

  proposals?: BuildingProposal[];
  floorPlanImage?: string;
  totalMaintenanceCost?: string;
  utilityCost?: string;
  workflow?: WorkflowStep[];
}

export interface BuildingAssetRecord {
  id: string;
  assetName: string;
  assetCode: string;
  assetType: string;
  buildingName: string;
  floor: string;
  roomName: string;
  status: string;
  approvalStatus: string;
  maintenanceFrequency: string;
  ownership: string;
  attachmentUrl?: string;
  proposals?: MaintenanceProposal[];
  pic?: string;
  purchasePrice?: string;
  purchaseDate?: string;
  brand?: string;
  buildingLocation?: string; // Optional alias for location string
}

export interface BuildingMaintenanceRecord {
  id: string | number;
  assetId?: string;
  assetName: string;
  requestDate: string;
  maintenanceType: string;
  vendor?: string;
  description?: string;
  cost: string;
  status: string;
  approvalStatus: string;
  completionDate?: string;
  technician?: string;
  rating?: number;
  evidenceBefore?: string;
  evidenceAfter?: string;
  buildingLocation?: string;
  proposals?: any[];
}

export interface UtilityRecord {
  id: string;
  period: string;
  date: string;
  location: string;
  type: string;
  meterStart: number;
  meterEnd: number;
  usage: number;
  unit: string;
  cost: string;
  status: string;
  attachmentUrl?: string;
}

export interface ReminderRecord {
  id: string | number;
  category: string;
  documentName: string;
  buildingName: string;
  assetNo: string;
  expiryDate: string;
  status: 'Safe' | 'Warning' | 'Critical' | 'Expired' | 'Urgent';
  source?: 'System' | 'Manual';
  daysRemaining?: number;
}

export interface GeneralAssetRecord {
  id: string;
  assetNumber: string;
  assetCategory: string;
  type: string;
  ownership: string;
  assetLocation: string;
  subLocation?: string;
  department?: string;
  channel?: string;
  approvalStatus?: string;
  address?: string;
  purchasePrice?: string;
  purchaseDate?: string;
  assetName?: string;
  brand?: string;
  modelNumber?: string;
  assetCode?: string;
  buildingName?: string;
  floor?: string;
  roomName?: string;
  sourceCategory?: string; // Used for filtering
  status?: string;
}

export interface MaintenanceScheduleRecord {
  id: string;
  assetId: string;
  assetName: string;
  assetCode?: string;
  location?: string;
  frequency: 'Monthly' | 'Quarterly' | 'Yearly';
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  status: 'Safe' | 'Warning' | 'Overdue';
  category?: string;
  vendor?: string;
}

export interface InsuranceRecord {
  id: string;
  policyNumber: string;
  assetName?: string;
  category?: string;
  provider: string;
  type: string;
  startDate: string;
  endDate: string;
  premium: string;
  status: string;
  claims?: InsuranceClaim[];
  assets?: LinkedAsset[];
  sumInsured?: string;
  deductible?: string;
}

export interface InsuranceProviderRecord {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
}

export interface InsuranceClaim {
  id: string;
  incidentDate: string;
  description: string;
  claimAmount: string;
  coveredAmount?: string;
  status: 'Submitted' | 'Survey' | 'Approved' | 'Paid' | 'Rejected';
  remarks?: string;
}

export interface LinkedAsset {
  id: string;
  name: string;
  type: 'Vehicle' | 'Building';
  identifier: string;
}

export interface MaintenanceProposal {
  id: string;
  vendorName: string;
  proposalName: string;
  estimatedCost: string;
  status: string;
  submissionDate: string;
  unitPhoto?: string;
  proposalDoc?: string;
}

export interface WorkflowStep {
  role: string;
  status: string;
  approver?: string;
  date?: string;
  comment?: string;
}

export interface BuildingProposal {
  id: string;
  name: string;
  address: { jl: string; kota: string; kabupaten: string; propinsi: string };
  floors?: { ground: string; f1: string; f2: string; f3: string; f4: string };
  owner?: { name: string; address: string; phone: string };
  surveySummary?: { pros: string; cons: string };
  securityFeatures?: string[];
  structureChecklist?: BuildingRecord['structureChecklist'];
  renovationDetailsObj?: BuildingRecord['renovationDetailsObj'];
  locationContext?: BuildingRecord['locationContext'];
  businessNotes?: BuildingRecord['businessNotes'];
  documents?: string[];
  environmentConditions?: string[];
  rentPrice?: string;
  leasePeriod?: string;
  taxPPH?: string;
  notaryFee?: string;
  previousRentPrice?: string;
  distanceToDealer?: string;
  roadCondition?: string;
  electricity?: string;
  water?: string;
  phoneLines?: string;
  telephoneDetails?: { canAdd: boolean; costPerLine: string; borneBy: string };
  landArea?: string;
  buildingArea?: string;
  frontYardArea?: string;
  totalFloors?: string;
  parkingCapacity?: string;
  buildingAge?: string;
  fenceCondition?: string;
  gateCondition?: string;
  renovationNeeded?: boolean;
  renovationCostEstimate?: string;
  renovationTimeEstimate?: string;
  leaseNature?: string;
  status?: string;
}

export interface PurchaseRecord {
  id: string;
  date: string;
  vendorName: string;
  qty: number;
  unitPrice: string;
  totalPrice: string;
  status: string;
  attachmentUrl?: string;
}

export interface LockerRecord {
  id: string | number;
  lockerNumber: string;
  floor: string;
  area?: string;
  assignedTo?: string;
  department?: string;
  spareKeyStatus?: string;
  lastAuditDate: string;
  status: string;
  remarks?: string;
  occupantRole?: string;
  occupantJobTitle?: string;
  type?: string;
}

export interface LockerRequestRecord {
  id: string | number;
  requesterName: string;
  requesterRole: string;
  requestDate: string;
  status: string;
  lockerNumber?: string;
  floor?: string;
  requestType?: string;
  jobTitle?: string;
  department?: string;
  statusLocker?: string;
  reason?: string;
}

export interface PodRequestRecord {
  id: string | number;
  requesterName: string;
  requesterRole: string;
  floorPreference: string;
  roomType: string;
  requestDate: string;
  status: string;
  reason?: string;
  gender?: 'Pria' | 'Perempuan';
  isExpat?: boolean;
  facilities?: {
    meja: boolean; ac: boolean; kursi: boolean; colokan: boolean; lemari: boolean; cermin: boolean;
    parkirMotor: boolean; parkirMobil: boolean; kmLuar: boolean; kmDalam: boolean;
    gym: boolean; pantry: boolean; lokerPantry: boolean; lokerBarang: boolean;
    kitchen: boolean; laundry: boolean; kolamRenang: boolean;
  };
  email?: string;
  phone?: string;
  departemen?: string;
  posisi?: string;
}

export interface MasterPodRecord {
  id: string | number;
  lantai: string;
  jenisKamar: string;
  nomorKamar: string;
  status: string;
  occupiedBy?: string;
  kapasitas: number;
  biayaAwal: string;
  biayaTerbaru: string;
  facilities?: any;
  transactions?: PodTransaction[];
  priceHistory?: { date: string; price: string; note: string }[];
  gender?: string;
  statusLokerBarang?: string;
  statusLokerPantry?: string;
  jadwalLaundry?: string;
  keterangan?: string;
}

export interface TenantPodRecord {
  id: string | number;
  lantai: string;
  jenisKamar: string;
  nomorKamar: string;
  namaPenghuni: string;
  posisi?: string;
  departemen?: string;
  statusLokerBarang: string;
  statusLokerPantry: string;
  jadwalLaundry: string;
  keterangan: string;
  gender?: string;
  isExpat?: boolean;
  facilities?: any;
  history?: TenantHistory[];
}

export interface PodTransaction {
  period: string;
  rentCost: string;
  kwh: string;
  electricityCost: string;
}

export interface TenantHistory {
  id: string;
  dateAdded: string;
  period: string;
  rentCost: string;
  kwh: string;
  electricityCost: string;
  lockerBarangStatus: boolean;
  lockerPantryStatus: boolean;
}

export interface StockOpnameRecord {
  id: string | number;
  opnameId: string;
  date: string;
  itemName: string;
  itemCode: string;
  category: string;
  systemQty: number;
  physicalQty: number;
  diff: number;
  performedBy: string;
  status: 'MATCHED' | 'DISCREPANCY';
  statusApproval?: 'Pending' | 'Approved' | 'Rejected';
  uom?: string;
  approvalNote?: string;
  approvalDate?: string;
}

export interface LogBookRecord {
  id: string;
  tanggalKunjungan: string;
  jamDatang: string;
  jamPulang?: string;
  lokasiModena: string;
  kategoriTamu: string;
  countAdult: number;
  countIndividual?: number;
  countChild: number;
  namaTamu: string;
  email?: string;
  phone?: string;
  identityCardNumber?: string;
  visitorCardNumber?: string;
  note?: string;
  wanita?: number;
  lakiLaki?: number;
  anakAnak?: number;
}

export interface TimesheetRecord {
  id: string | number;
  employee: UserRecord;
  date: string;
  shift: string;
  status: string;
  totalHours: number;
  activities?: TimesheetActivity[];
  generalNotes?: string;
  location?: string;
  coordinates?: { lat: number; lng: number; timestamp: string };
  area?: string;
}

export interface TimesheetActivity {
  id: string;
  activityType: string;
  location?: string;
  startTime: string;
  endTime: string;
  duration: number;
  notes?: string;
  linkedAssetId?: string;
  linkedAssetName?: string;
  checklist?: { label: string; checked: boolean }[];
  isQrVerified?: boolean;
  incidentDescription?: string;
  spareParts?: string;
  photo?: string;
  rejectionNote?: string;
}

export interface VendorRecord {
  id: string | number;
  vendorName: string;
  vendorCode: string;
  type: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  picName: string;
}

export interface MasterVendorRecord extends VendorRecord {
  nama: string; // Alias for vendorName
  noTelp: string; // Alias for phone
  alamat: string; // Alias for address
  aktif: boolean;
  merek?: string;
  cabang?: string;
}

export interface MasterApprovalRecord {
  id: string;
  module: string;
  branch: string;
  tiers: ApprovalTier[];
  updatedAt: string;
}

export interface ApprovalTier {
  level: number;
  type: 'Role' | 'User';
  value: string;
  sla: number;
  
}

export interface DeliveryLocationRecord {
  id: number;
  name: string;
  type: 'Internal' | 'External';
  status: 'Active' | 'Inactive';
}

// Aliases for compatibility
export interface MasterLockerRecord extends LockerRecord {
  // same fields, used in MasterLockerTable
}

export interface ModenaPodRecord extends MasterPodRecord {
  // Alias
}

export interface ContractRecord {
  id: string;
  assetNumber: string;
  assetCategory: string;
  type: string;
  location: string;
  address: string;
  channel: string;
  status: string;
}
