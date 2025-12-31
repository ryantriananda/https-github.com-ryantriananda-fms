
export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  phone?: string;
}

export interface UserRecord extends Employee {
  email?: string;
  department?: string;
  location?: string;
  joinDate?: string;
  status?: string;
  lastActive?: string;
  permissions?: string[];
  employeeId?: string;
}

export interface MasterItem {
  id: number;
  category: string;
  itemName: string;
  itemCode: string;
  uom: string;
  remainingStock: number;
  minimumStock: number;
  maximumStock: number;
  requestedStock: number;
  lastPurchasePrice: string;
  averagePrice: string;
  purchaseDate: string;
  imageUrl?: string;
}

export interface GeneralMasterItem {
  id: number;
  name: string;
}

export interface AssetRecord {
  id: string;
  transactionNumber: string;
  employee: Employee;
  category: string;
  itemName: string;
  itemDescription?: string;
  qty: number;
  date: string;
  remainingStock: number;
  itemCode: string;
  status: string;
}

export interface StationeryRequestItem {
  itemId: string;
  qty: string;
  categoryId: string;
  uom: string;
}

export interface StationeryRequestRecord {
  id?: string;
  type: string;
  deliveryType: string;
  location: string;
  date: string;
  remarks?: string;
  items?: StationeryRequestItem[];
}

export interface VehicleRecord {
  id: number;
  noPolisi: string;
  nama: string;
  merek: string;
  tipeKendaraan: string;
  model: string;
  tahunPembuatan: string;
  warna: string;
  isiSilinder: string;
  noRangka: string;
  noMesin: string;
  noBpkb: string;
  masaBerlaku1: string; // STNK 1 Tahun
  masaBerlaku5: string; // STNK 5 Tahun
  masaBerlakuKir: string;
  tglBeli: string;
  hargaBeli: string;
  noPolisAsuransi: string;
  jangkaPertanggungan: string;
  channel: string;
  cabang: string;
  pengguna: string;
  status: string;
  ownership: 'Milik Modena' | 'Sewa';
  approvalStatus: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
  stnkUrl?: string;
  kirUrl?: string;
  depreciationMethod?: string;
  usefulLife?: number;
  residualValue?: string;
  keteranganBpkb?: string;
  penggunaUtama?: string;
  address?: string; // For compatibility
  subLocation?: string; // For compatibility
  location?: string; // For compatibility
}

export interface VehicleReminderRecord {
  id: string;
  noPolisi: string;
  vehicleName: string;
  type: 'STNK 1 Tahunan' | 'STNK 5 Tahunan' | 'KIR';
  expiryDate: string;
  branch: string;
  status: 'Safe' | 'Warning' | 'Critical' | 'Expired';
}

export interface TaxKirRecord {
  id: string;
  noPolisi: string;
  aset?: string; // nama kendaraan
  tglRequest: string;
  jenis: string; // Pajak STNK or KIR
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
  jatuhTempo?: string;
  estimasiBiaya?: string;
  targetSelesai?: string;
  jenisPembayaran?: string;
  attachmentUrl?: string;
}

export interface ServiceRecord {
  id: string;
  noPolisi: string;
  aset?: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
  vendor?: string;
  kmKendaraan?: string;
  masalah?: string;
  jenisServis?: string;
  spareParts?: SparePart[];
  estimasiBiaya?: string;
  technician?: string; // For building maintenance compatibility or vehicle
}

export interface SparePart {
  name: string;
  qty: number;
  price: string;
  imageUrl?: string;
}

export interface MutationRecord {
  id: string;
  noPolisi?: string;
  assetNumber?: string;
  assetName?: string;
  cabangAset: string;
  tipeMutasi: string;
  tglPermintaan: string;
  lokasiAsal: string;
  lokasiTujuan: string;
  status: string;
  statusApproval: string;
  picBefore?: string;
  picAfter?: string;
  assetType?: 'VEHICLE' | 'GENERAL_ASSET';
  biayaMutasi?: string;
  checklistCondition?: string[];
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
  photoInterior?: string;
  documentStnk?: string;
}

export interface SalesRecord {
  id: string;
  noPolisi?: string;
  assetNumber?: string;
  assetName?: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  hargaTertinggi: string;
  hargaPembuka?: string;
  status: string;
  statusApproval: string;
  assetType?: 'VEHICLE' | 'GENERAL_ASSET';
  bids?: BidRecord[];
}

export interface BidRecord {
  id: string;
  amount: string;
  bidderName: string;
  bidderRole: string;
  bidderEmail: string;
  bidderPhone: string;
  bidderKtp: string;
  bidderAvatar: string;
  timestamp: string;
}

export interface BidderRegistration {
  name: string;
  ktp: string;
  phone: string;
  email: string;
  agreedToTerms: boolean;
}

export interface VehicleContractRecord {
  id: string;
  noKontrak: string;
  noPolisi: string;
  aset: string; // Deskripsi unit
  vendor: string;
  tglMulai: string;
  tglBerakhir: string;
  biayaSewa: string;
  approvalStatus: string;
  status: string;
  channel?: string;
  cabang?: string;
  penggunaUtama?: string;
  attachmentUrl?: string; // Contract doc
  stnkUrl?: string;
  kirUrl?: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
  merek?: string;
  tipeKendaraan?: string;
  model?: string;
  tahunPembuatan?: string;
  warna?: string;
  isiSilinder?: string;
  ownership?: string;
}

export interface VendorRecord {
  id: string;
  vendorName: string;
  vendorCode: string;
  type: 'Goods' | 'Service' | 'Both';
  category: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive' | 'Blacklist';
  picName?: string;
}

// Re-using VendorRecord for MasterVendorRecord as they seem identical in purpose
export type MasterVendorRecord = VendorRecord & { 
  nama?: string; 
  aktif?: boolean; 
  noTelp?: string; 
  merek?: string; 
  alamat?: string;
  tipe?: string;
  cabang?: string;
};

export interface DeliveryLocationRecord {
  id: number;
  name: string;
  address: string;
  type: string;
}

export interface LogBookRecord {
  id: string;
  lokasiModena: string;
  kategoriTamu: string;
  namaTamu: string;
  tanggalKunjungan: string;
  jamDatang: string;
  jamPulang?: string;
  wanita: number;
  lakiLaki: number;
  anakAnak: number;
  note?: string;
}

export interface TimesheetRecord {
  id: string;
  employee: Employee;
  location: string;
  area: string;
  date: string;
  shift: string;
  clockIn?: string;
  clockOut?: string;
  status: string;
  tasks?: string[];
  photos?: string[];
}

export interface BuildingRecord {
  id: string;
  name: string;
  assetNo: string;
  type: string;
  location: string; // City/Branch Name
  address: string;
  city?: string;
  district?: string;
  province?: string;
  distanceToDealer?: string;
  roadCondition?: string;
  electricityPower?: string;
  waterSource?: string;
  phoneLineCount?: string;
  landArea?: string;
  buildingArea?: string;
  frontYardArea?: string;
  totalFloors?: string;
  parkingCapacity?: string;
  buildingAge?: string;
  fenceCondition?: string;
  gateCondition?: string;
  structureChecklist?: { [key: string]: string[] };
  environmentConditions?: string[];
  renovationNeeded?: boolean;
  renovationCostEstimate?: string;
  renovationTimeEstimate?: string;
  renovationDetailsObj?: { costSharing: string; gracePeriod: string; items: any };
  locationContext?: { right: string; left: string; front: string; back: string; nearIndustry: boolean; operationalHours: string };
  rentCost?: string;
  startDate?: string;
  endDate?: string;
  taxPPH?: string;
  notaryFee?: string;
  purchasePrice?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerAddress?: string;
  documentsAvailable?: string[];
  businessNotes?: { deliveryTime: string; dealersCount: string; staffComposition: string; margin: string; competitorPareto: string };
  status: string;
  ownership: 'Rent' | 'Own';
  proposals?: BuildingProposal[];
  workflow?: WorkflowStep[];
  totalMaintenanceCost?: string;
  utilityCost?: string;
  floorPlanImage?: string;
}

export interface BuildingProposal {
  id: string;
  name: string;
  address: { jl: string; kota: string; kabupaten: string; propinsi: string };
  floors?: any;
  owner?: { name: string; address: string; phone: string };
  surveySummary?: any;
  securityFeatures?: string[];
  structureChecklist?: any;
  renovationDetailsObj?: any;
  locationContext?: any;
  businessNotes?: any;
  documents?: string[];
  environmentConditions?: string[];
  rentPrice?: string;
  leaseNature?: string; // e.g. "Sewa"
  leasePeriod?: string;
  taxPPH?: string;
  notaryFee?: string;
  previousRentPrice?: string;
  electricity?: string;
  water?: string;
  phoneLines?: string;
  telephoneDetails?: any;
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
}

export interface WorkflowStep {
  role: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date?: string;
  approver?: string;
  comment?: string;
}

export interface ReminderRecord {
  id: string;
  documentName: string;
  buildingName: string;
  assetNo: string;
  expiryDate: string;
  daysRemaining?: number;
  status: 'Safe' | 'Warning' | 'Urgent' | 'Expired';
  category?: 'Insurance' | 'Lease' | 'Legal' | 'Permit'; // Added category
  source?: 'System' | 'Manual'; // Added source
}

export interface MaintenanceScheduleRecord {
  id: string;
  assetId: string;
  assetName: string;
  assetCode: string;
  location: string;
  category: string; // AC, Genset, etc.
  frequency: 'Monthly' | 'Quarterly' | 'Yearly';
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  status: 'Safe' | 'Warning' | 'Overdue';
  vendor?: string;
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
  approvalStatus: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Revised';
  maintenanceFrequency?: string;
  ownership?: string;
  purchasePrice?: string;
  purchaseDate?: string;
  pic?: string;
  brand?: string;
  attachmentUrl?: string; // photo
  proposals?: MaintenanceProposal[];
}

export interface MaintenanceProposal {
  id: string;
  vendorName: string;
  proposalName: string;
  estimatedCost: string;
  status: 'Pending' | 'Reviewing' | 'Approved' | 'Rejected';
  submissionDate: string;
  unitPhoto?: string;
  proposalDoc?: string;
}

export interface BuildingMaintenanceRecord {
  id: string;
  assetId: string;
  assetName: string;
  buildingLocation: string;
  requestDate: string;
  completionDate?: string;
  maintenanceType: 'Preventive' | 'Corrective' | 'Emergency';
  description?: string;
  cost: string;
  vendor?: string;
  technician?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Pending';
  approvalStatus: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Revised';
  evidenceBefore?: string;
  evidenceAfter?: string;
  rating?: number;
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
  status: 'Paid' | 'Unpaid' | 'Pending' | 'Pending Review';
  attachmentUrl?: string;
}

export interface GeneralAssetRecord {
  id: string;
  assetNumber: string;
  assetCategory: string;
  type: string; // e.g. Laptop, Chair
  assetName?: string;
  ownership: string;
  assetLocation: string;
  subLocation: string;
  department: string;
  channel: string;
  status: string;
  approvalStatus: string;
  address?: string;
  purchasePrice?: string;
  purchaseDate?: string;
  brand?: string;
  modelNumber?: string;
  pic?: string;
  sourceCategory?: string; // e.g. 'Asset HC', 'Asset IT'
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

export interface ContractRecord {
    id: string;
    assetCategory: string;
    assetNumber: string;
    address: string;
    type: string;
    location: string;
    channel: string;
    subLocation: string;
    status: string;
}

export interface InsuranceClaim {
  id: string;
  incidentDate: string;
  description: string;
  claimAmount: string; // Estimasi biaya klaim
  coveredAmount: string; // Yang dibayar asuransi
  status: 'Submitted' | 'Survey' | 'Approved' | 'Paid' | 'Rejected';
  evidencePhotos?: string[];
  remarks?: string;
}

export interface InsuranceRecord {
  id: string;
  policyNumber: string;
  assetId: string; // Relation to Vehicle or Building
  assetName: string; // Display Name (No Polisi or Building Name)
  category: 'Vehicle' | 'Building';
  provider: string; // Insurance Vendor
  type: 'All Risk' | 'TLO' | 'Property All Risk' | 'Earthquake' | string;
  startDate: string;
  endDate: string;
  premium: string; // Biaya Premi
  sumInsured: string; // Nilai Pertanggungan
  status: 'Active' | 'Expiring' | 'Expired';
  deductible?: string; // Biaya resiko sendiri (OR)
  claims?: InsuranceClaim[];
  attachmentUrl?: string; // Softcopy Polis
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
