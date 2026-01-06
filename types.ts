
export interface GeneralMasterItem {
  id: number | string;
  name: string;
  category?: string;
  sourceCategory?: string;
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

export interface VendorRecord {
  id: string | number;
  vendorName: string;
  vendorCode?: string;
  type: 'Goods' | 'Service' | 'Both';
  category: string;
  email: string;
  phone: string;
  address: string;
  picName?: string;
  status: 'Active' | 'Inactive' | 'Blacklist';
  aktif?: boolean; 
  nama?: string; 
  alamat?: string; 
  noTelp?: string; 
  merek?: string; 
  cabang?: string; 
}

export interface MasterVendorRecord extends VendorRecord {}

export interface AssetRecord {
  id: number | string;
  transactionNumber?: string;
  employee: {
    name: string;
    avatar?: string;
    role?: string;
    phone?: string;
  };
  category: string;
  itemName: string;
  itemDescription?: string;
  qty: number;
  date: string;
  remainingStock?: number;
  itemCode?: string;
  status: string;
  uom?: string; 
}

export interface MasterItem {
  id: number | string;
  itemCode: string;
  category: string;
  itemName: string;
  uom: string;
  remainingStock: number;
  minimumStock: number;
  maximumStock: number;
  requestedStock: number;
  purchaseDate?: string;
  lastPurchasePrice?: string;
  averagePrice?: string;
  imageUrl?: string;
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
  id: number | string;
  noPolisi: string;
  nama: string; 
  merek: string;
  tipeKendaraan: string;
  model: string;
  tahunPembuatan: string;
  warna: string;
  isiSilinder?: string;
  noRangka?: string;
  noMesin?: string;
  noBpkb?: string;
  keteranganBpkb?: string;
  masaBerlaku1?: string;
  masaBerlaku5?: string;
  masaBerlakuKir?: string;
  tglBeli?: string;
  hargaBeli?: string;
  noPolisAsuransi?: string;
  jangkaPertanggungan?: string;
  status: string;
  ownership: 'Milik Modena' | 'Sewa';
  channel: string;
  cabang: string;
  pengguna?: string;
  approvalStatus?: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
  stnkUrl?: string;
  kirUrl?: string;
  depreciationMethod?: string;
  usefulLife?: number;
  residualValue?: string;
}

export interface VehicleContractRecord {
  id: string;
  noKontrak: string;
  noPolisi: string;
  aset?: string; 
  vendor: string;
  tglMulai: string;
  tglBerakhir: string;
  biayaSewa: string;
  status: string;
  approvalStatus: string;
  channel?: string;
  cabang?: string;
  ownership?: string;
  penggunaUtama?: string;
  attachmentUrl?: string;
  stnkUrl?: string;
  kirUrl?: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
}

export interface SparePart {
    name: string;
    qty: number;
    price: string;
    imageBefore?: string;
    imageAfter?: string;
}

export interface ServiceRecord {
  id: string;
  noPolisi: string;
  aset?: string; 
  tglRequest: string;
  channel?: string;
  cabang?: string;
  status: string;
  statusApproval: string;
  vendor?: string;
  kmKendaraan?: string;
  masalah?: string;
  jenisServis?: string;
  spareParts?: SparePart[];
  estimasiBiaya?: string;
  photoBefore?: string;
  photoAfter?: string;
  technician?: string;
  description?: string;
  cost?: string;
  completionDate?: string;
  requestDate?: string; 
}

export interface TaxKirRecord {
  id: string;
  noPolisi: string;
  aset?: string;
  tglRequest: string;
  jenis: string; 
  channel?: string;
  cabang?: string;
  status: string;
  statusApproval: string;
  jatuhTempo?: string;
  targetSelesai?: string;
  estimasiBiaya?: string;
  jenisPembayaran?: string;
  attachmentUrl?: string;
}

export interface VehicleReminderRecord {
  id: string;
  noPolisi: string;
  vehicleName: string;
  branch?: string;
  type: string;
  expiryDate: string;
  status: 'Safe' | 'Warning' | 'Critical' | 'Expired';
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
  checklistNotes?: Record<string, string>;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
  photoInterior?: string;
  documentStnk?: string;
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

export interface SalesRecord {
  id: string;
  noPolisi?: string;
  assetNumber?: string;
  assetName?: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  hargaTertinggi: string;
  hargaPembuka: string;
  status: string;
  statusApproval: string;
  assetType?: 'VEHICLE' | 'GENERAL_ASSET';
  bids?: BidRecord[];
}

export interface WorkflowStep {
    role: string;
    status: string;
    date?: string;
    approver?: string;
    comment?: string;
}

export interface BuildingProposal {
    id: string;
    name: string;
    address: { jl: string; kota: string; kabupaten: string; propinsi: string; };
    floors?: any;
    owner?: { name: string; address: string; phone: string; };
    surveySummary?: any;
    securityFeatures?: string[];
    structureChecklist?: any;
    renovationDetailsObj?: any;
    locationContext?: any;
    businessNotes?: any;
    documents?: string[];
    environmentConditions?: string[];
    rentPrice?: string;
    leasePeriod?: string;
    leaseNature?: string; 
    taxPPH?: string;
    notaryFee?: string;
    previousRentPrice?: string;
    distanceToDealer?: string;
    roadCondition?: string;
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
    status?: 'Pending' | 'Reviewing' | 'Approved' | 'Rejected';
    submissionDate?: string;
    vendorName?: string;
    proposalName?: string;
    estimatedCost?: string;
    unitPhoto?: string;
    proposalDoc?: string;
}

export interface BuildingRecord {
  id: string;
  name: string;
  assetNo: string;
  type: string;
  ownership: 'Rent' | 'Own';
  location: string; 
  address: string;
  city?: string;
  district?: string;
  province?: string;
  startDate?: string;
  endDate?: string;
  status: string;
  rentCost?: string;
  purchasePrice?: string;
  totalMaintenanceCost?: string;
  utilityCost?: string;
  securityFeatures?: string[];
  documentsAvailable?: string[];
  proposals?: BuildingProposal[]; 
  workflow?: WorkflowStep[];
  structureChecklist?: any;
  renovationDetailsObj?: any;
  locationContext?: any;
  businessNotes?: any;
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
  environmentConditions?: string[];
  renovationNeeded?: boolean;
  renovationCostEstimate?: string;
  renovationTimeEstimate?: string;
  taxPPH?: string;
  notaryFee?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerAddress?: string;
  floorPlanImage?: string;
}

export interface UtilityRecord {
  id: string;
  period: string;
  date: string;
  type: string; 
  location: string;
  meterStart: number;
  meterEnd: number;
  usage: number;
  unit: string; 
  cost: string;
  status: 'Paid' | 'Unpaid' | 'Pending' | 'Pending Review';
  attachmentUrl?: string;
}

export interface ReminderRecord {
  id: string;
  category: 'Insurance' | 'Lease' | 'Permit' | 'Tax';
  documentName: string;
  buildingName: string; 
  assetNo: string;
  expiryDate: string;
  daysRemaining?: number;
  status: 'Safe' | 'Warning' | 'Urgent' | 'Expired';
  source?: 'System' | 'Manual';
}

export interface MaintenanceProposal {
    id: string;
    vendorName: string;
    proposalName: string;
    estimatedCost: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Reviewing';
    submissionDate: string;
}

export interface BuildingAssetRecord {
  id: string;
  assetCode: string;
  assetName: string;
  assetType: string; 
  buildingName: string;
  floor: string;
  roomName: string;
  status: string; 
  approvalStatus: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Revised';
  maintenanceFrequency?: 'Monthly' | 'Quarterly' | 'Yearly' | 'None';
  ownership?: string;
  proposals?: MaintenanceProposal[];
  pic?: string;
  purchasePrice?: string;
  purchaseDate?: string;
  brand?: string;
  attachmentUrl?: string;
}

export interface BuildingMaintenanceRecord {
  id: string;
  assetId: string;
  assetName: string;
  buildingLocation: string; 
  requestDate: string;
  completionDate?: string;
  vendor?: string;
  technician?: string;
  maintenanceType: 'Preventive' | 'Corrective' | 'Emergency';
  description?: string;
  cost: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  approvalStatus: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Revised';
  evidenceBefore?: string;
  evidenceAfter?: string;
  rating?: number;
}

export interface GeneralAssetRecord {
  id: string;
  assetNumber: string;
  assetCategory: string; 
  type: string; 
  ownership: 'Rent' | 'Own';
  assetLocation: string; 
  subLocation?: string; 
  department?: string;
  channel?: string;
  approvalStatus: string;
  status?: string; 
  address?: string;
  purchasePrice?: string;
  purchaseDate?: string;
  assetCode?: string; 
  assetName?: string; 
  buildingName?: string; 
  brand?: string;
  modelNumber?: string;
  pic?: string;
  sourceCategory?: string;
}

export interface MaintenanceScheduleRecord {
  id: string;
  assetId: string;
  assetName: string;
  assetCode: string;
  location: string;
  category: string;
  frequency: 'Monthly' | 'Quarterly' | 'Yearly';
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  status: 'Safe' | 'Warning' | 'Overdue';
  vendor?: string;
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

export interface InsuranceRecord {
  id: string;
  policyNumber: string;
  provider: string;
  type: string; 
  category: 'Vehicle' | 'Building' | 'Mixed';
  startDate: string;
  endDate: string;
  premium: string;
  sumInsured: string;
  deductible?: string;
  status: 'Active' | 'Expiring' | 'Expired';
  assetName?: string; 
  assets?: LinkedAsset[];
  claims?: InsuranceClaim[];
  attachmentUrl?: string;
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

export interface ModenaPodRecord {
  id: string;
  lantai: string;
  jenisKamar: string;
  nomorKamar: string;
  namaPenghuni: string;
  status: 'Available' | 'Occupied'; 
  statusLokerBarang: string;
  statusLokerPantry: string;
  jadwalLaundry: string;
  keterangan?: string;
  occupiedBy?: string; 
}

export interface PodRequestRecord {
  id: string;
  requesterName: string;
  department: string;
  requesterRole?: string;
  checkInDate?: string;
  checkOutDate?: string;
  requestDate: string;
  roomType: string;
  floorPreference?: string;
  reason?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface MasterPodRecord {
    id: string;
    lantai: string;
    jenisKamar: string;
    nomorKamar: string;
    status: string;
    occupiedBy?: string;
}

export interface LockerRecord {
  id: string;
  lockerNumber: string;
  floor: string;
  area: string;
  assignedTo?: string; 
  department?: string;
  status: 'Terisi' | 'Kosong' | 'Kunci Hilang';
  spareKeyStatus: 'Ada' | 'Tidak Ada';
  lastAuditDate: string;
  remarks?: string;
}

export interface LockerRequestRecord {
  id: string;
  requesterName: string;
  department: string;
  requesterRole?: string;
  requestDate: string;
  reason: string;
  preferredLocation?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface MasterLockerRecord {
    id: string;
    lockerNumber: string;
    floor: string;
    type: string;
    status: string;
    remarks?: string;
}

export interface LogBookRecord {
  id: string;
  tanggalKunjungan: string;
  jamDatang: string;
  jamPulang?: string;
  lokasiModena: string;
  kategoriTamu: 'Visitor' | 'Supplier' | 'Customer' | 'Internal';
  namaTamu: string;
  wanita: number;
  lakiLaki: number;
  anakAnak: number;
  note?: string;
}

export interface TimesheetRecord {
  id: string;
  employee: {
      name: string;
      role: string;
      avatar: string;
      phone?: string;
  };
  location: string;
  area: string;
  date: string;
  shift: string;
  clockIn: string;
  clockOut: string;
  status: 'Tepat Waktu' | 'Terlambat' | 'Absen';
  tasks?: string[];
  photos?: string[];
}

export interface ApprovalTier {
    level: number;
    type: 'Role' | 'User';
    value: string; 
    sla: number; 
}

export interface MasterApprovalRecord {
  id: string;
  module: string;
  branch: string;
  tiers: ApprovalTier[];
  updatedAt: string;
}

export interface DeliveryLocationRecord {
  id: number;
  name: string;
  type: 'Internal' | 'External';
  status: 'Active' | 'Inactive';
}

export interface StockOpnameRecord {
  id: string;
  opnameId: string;
  date: string;
  itemCode: string;
  itemName: string;
  category: string;
  systemQty: number;
  physicalQty: number;
  diff: number;
  uom: string;
  performedBy: string;
  status: 'MATCHED' | 'DISCREPANCY';
  statusApproval?: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
  approvalDate?: string;
  approvalNote?: string;
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

// Helper type for the Modal Table
export interface StockOpnameInputItem {
    id: string | number;
    itemCode: string;
    itemName: string;
    uom: string;
    systemQty: number;
    physicalQty: number;
    diff: number;
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
