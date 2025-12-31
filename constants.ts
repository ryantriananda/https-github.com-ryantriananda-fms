
import { AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem, UserRecord, BuildingAssetRecord, BuildingMaintenanceRecord, UtilityRecord, GeneralAssetRecord, VendorRecord, TimesheetRecord, ServiceRecord, MutationRecord, SalesRecord, InsuranceRecord, MaintenanceScheduleRecord, VehicleReminderRecord } from './types';

// --- ATK & ARK ---
export const MOCK_MASTER_DATA: MasterItem[] = [
    { id: 1, category: 'ATK', itemName: 'Kertas A4 80gr', itemCode: 'P-001', uom: 'Rim', remainingStock: 50, minimumStock: 10, maximumStock: 100, requestedStock: 0, lastPurchasePrice: '45.000', averagePrice: '44.500', purchaseDate: '2024-01-10' },
    { id: 2, category: 'ATK', itemName: 'Pulpen Hitam', itemCode: 'P-002', uom: 'Pcs', remainingStock: 120, minimumStock: 20, maximumStock: 200, requestedStock: 0, lastPurchasePrice: '2.500', averagePrice: '2.400', purchaseDate: '2024-01-15' },
    { id: 3, category: 'ATK', itemName: 'Spidol Boardmarker Biru', itemCode: 'P-003', uom: 'Pcs', remainingStock: 15, minimumStock: 5, maximumStock: 50, requestedStock: 0, lastPurchasePrice: '8.000', averagePrice: '8.000', purchaseDate: '2024-02-01' },
    { id: 4, category: 'ATK', itemName: 'Staples No. 10', itemCode: 'S-001', uom: 'Box', remainingStock: 30, minimumStock: 5, maximumStock: 50, requestedStock: 0, lastPurchasePrice: '3.500', averagePrice: '3.500', purchaseDate: '2024-02-05' },
    { id: 5, category: 'ATK', itemName: 'Map Plastik Clear', itemCode: 'M-001', uom: 'Pcs', remainingStock: 80, minimumStock: 20, maximumStock: 150, requestedStock: 0, lastPurchasePrice: '5.000', averagePrice: '5.000', purchaseDate: '2024-02-10' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
    { id: 101, category: 'Cleaning', itemName: 'Cairan Pembersih Lantai', itemCode: 'C-001', uom: 'Jerrycan 5L', remainingStock: 5, minimumStock: 2, maximumStock: 10, requestedStock: 0, lastPurchasePrice: '85.000', averagePrice: '84.000', purchaseDate: '2024-01-05' },
    { id: 102, category: 'Pantry', itemName: 'Kopi Kapal Api', itemCode: 'K-001', uom: 'Pack', remainingStock: 8, minimumStock: 5, maximumStock: 20, requestedStock: 2, lastPurchasePrice: '15.000', averagePrice: '15.000', purchaseDate: '2024-01-20' },
    { id: 103, category: 'Pantry', itemName: 'Gula Pasir', itemCode: 'K-002', uom: 'Kg', remainingStock: 10, minimumStock: 2, maximumStock: 20, requestedStock: 0, lastPurchasePrice: '18.000', averagePrice: '18.000', purchaseDate: '2024-02-01' },
    { id: 104, category: 'Cleaning', itemName: 'Sabun Cuci Tangan', itemCode: 'C-002', uom: 'Botol 500ml', remainingStock: 12, minimumStock: 5, maximumStock: 25, requestedStock: 0, lastPurchasePrice: '25.000', averagePrice: '25.000', purchaseDate: '2024-02-05' },
    { id: 105, category: 'Pantry', itemName: 'Teh Celup Sariwangi', itemCode: 'K-003', uom: 'Box', remainingStock: 20, minimumStock: 5, maximumStock: 40, requestedStock: 0, lastPurchasePrice: '10.000', averagePrice: '10.000', purchaseDate: '2024-02-10' }
];

export const MOCK_DATA: AssetRecord[] = []; // ATK Request Mock
export const MOCK_ARK_DATA: AssetRecord[] = []; // ARK Request Mock

// --- VEHICLE (5 Records) ---
export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noPolisi: 'B 1234 ABC', nama: 'Toyota Avanza 1.5 G', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'Avanza', tahunPembuatan: '2022', warna: 'Hitam', isiSilinder: '1500', noRangka: 'MHF...', noMesin: '1TR...', noBpkb: 'L-123', masaBerlaku1: '2025-01-01', masaBerlaku5: '2027-01-01', masaBerlakuKir: '2024-12-31', tglBeli: '2022-01-01', hargaBeli: '250000000', noPolisAsuransi: 'POL-001', jangkaPertanggungan: '2025-01-01', channel: 'Direct', cabang: 'Jakarta', pengguna: 'Staff GA', status: 'Aktif', ownership: 'Milik Modena', approvalStatus: 'Approved' },
    { id: 2, noPolisi: 'B 2233 XYZ', nama: 'Daihatsu Gran Max Blind Van', merek: 'Daihatsu', tipeKendaraan: 'Box', model: 'Gran Max', tahunPembuatan: '2021', warna: 'Putih', isiSilinder: '1500', noRangka: 'MHK...', noMesin: '3SZ...', noBpkb: 'L-456', masaBerlaku1: '2024-06-15', masaBerlaku5: '2026-06-15', masaBerlakuKir: '2024-05-20', tglBeli: '2021-06-15', hargaBeli: '160000000', noPolisAsuransi: 'POL-002', jangkaPertanggungan: '2024-06-15', channel: 'Direct', cabang: 'Surabaya', pengguna: 'Logistik Team', status: 'Aktif', ownership: 'Milik Modena', approvalStatus: 'Approved' },
    { id: 3, noPolisi: 'D 1778 KJ', nama: 'Honda HRV SE', merek: 'Honda', tipeKendaraan: 'SUV', model: 'HRV', tahunPembuatan: '2023', warna: 'Silver', isiSilinder: '1500', noRangka: 'MRH...', noMesin: 'L15...', noBpkb: 'L-789', masaBerlaku1: '2025-03-10', masaBerlaku5: '2028-03-10', masaBerlakuKir: '-', tglBeli: '2023-03-10', hargaBeli: '400000000', noPolisAsuransi: 'POL-003', jangkaPertanggungan: '2025-03-10', channel: 'Direct', cabang: 'Bandung', pengguna: 'Branch Manager', status: 'Aktif', ownership: 'Milik Modena', approvalStatus: 'Approved' },
    { id: 4, noPolisi: 'BK 9988 AA', nama: 'Toyota Innova Zenix', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'Innova Zenix', tahunPembuatan: '2023', warna: 'Hitam', isiSilinder: '2000', noRangka: 'MHF...', noMesin: 'M20...', noBpkb: '-', masaBerlaku1: '2025-08-20', masaBerlaku5: '2028-08-20', masaBerlakuKir: '-', tglBeli: '2023-08-20', hargaBeli: '450000000', noPolisAsuransi: 'POL-RENT-001', jangkaPertanggungan: '2025-08-20', channel: 'Rental', cabang: 'Medan', pengguna: 'Sales Manager', status: 'Aktif', ownership: 'Sewa', approvalStatus: 'Approved' },
    { id: 5, noPolisi: 'H 4556 FG', nama: 'Mitsubishi L300 Box', merek: 'Mitsubishi', tipeKendaraan: 'Box', model: 'L300', tahunPembuatan: '2020', warna: 'Hitam', isiSilinder: '2500', noRangka: 'MHM...', noMesin: '4D5...', noBpkb: 'L-112', masaBerlaku1: '2024-11-05', masaBerlaku5: '2025-11-05', masaBerlakuKir: '2024-10-30', tglBeli: '2020-11-05', hargaBeli: '210000000', noPolisAsuransi: 'POL-004', jangkaPertanggungan: '2024-11-05', channel: 'Direct', cabang: 'Semarang', pengguna: 'Logistik Team', status: 'Maintenance', ownership: 'Milik Modena', approvalStatus: 'Approved' }
];

export const MOCK_VEHICLE_REMINDER_DATA: VehicleReminderRecord[] = [
    { id: 'REM-V-001', noPolisi: 'B 1234 ABC', vehicleName: 'Toyota Avanza 1.5 G', type: 'STNK 1 Tahunan', expiryDate: '2025-01-01', branch: 'Jakarta', status: 'Safe' },
    { id: 'REM-V-002', noPolisi: 'B 2233 XYZ', vehicleName: 'Daihatsu Gran Max', type: 'KIR', expiryDate: '2024-05-20', branch: 'Surabaya', status: 'Warning' },
    { id: 'REM-V-003', noPolisi: 'D 1778 KJ', vehicleName: 'Honda HRV SE', type: 'STNK 1 Tahunan', expiryDate: '2025-03-10', branch: 'Bandung', status: 'Safe' },
    { id: 'REM-V-004', noPolisi: 'H 4556 FG', vehicleName: 'Mitsubishi L300', type: 'KIR', expiryDate: '2024-04-15', branch: 'Semarang', status: 'Critical' },
    { id: 'REM-V-005', noPolisi: 'BK 9988 AA', vehicleName: 'Toyota Innova Zenix', type: 'STNK 5 Tahunan', expiryDate: '2028-08-20', branch: 'Medan', status: 'Safe' }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    { id: 'REQ-TAX-001', noPolisi: 'B 1234 ABC', aset: 'Toyota Avanza', tglRequest: '2024-03-01', jenis: 'Pajak STNK', channel: 'Direct', cabang: 'Jakarta', status: 'Proses', statusApproval: 'Approved', jatuhTempo: '2024-03-15', estimasiBiaya: '3.500.000', targetSelesai: '2024-03-10', jenisPembayaran: 'Kasbon' },
    { id: 'REQ-TAX-002', noPolisi: 'B 2233 XYZ', aset: 'Daihatsu Gran Max', tglRequest: '2024-04-01', jenis: 'KIR', channel: 'Direct', cabang: 'Surabaya', status: 'Pending', statusApproval: 'Pending', jatuhTempo: '2024-05-20', estimasiBiaya: '850.000', targetSelesai: '2024-05-15', jenisPembayaran: 'Reimburse' }
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    { id: 'CTR-001', noKontrak: 'KTR/2024/001', noPolisi: 'BK 9988 AA', aset: 'Toyota Innova Zenix', vendor: 'TRAC', tglMulai: '2023-08-20', tglBerakhir: '2025-08-20', biayaSewa: '12000000', approvalStatus: 'Approved', status: 'Active' },
    { id: 'CTR-002', noKontrak: 'KTR/2024/002', noPolisi: 'DK 1234 BB', aset: 'Toyota Hiace', vendor: 'MPM Rent', tglMulai: '2024-01-01', tglBerakhir: '2026-01-01', biayaSewa: '18000000', approvalStatus: 'Approved', status: 'Active' }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [];
export const MOCK_MUTATION_DATA: MutationRecord[] = [];
export const MOCK_SALES_DATA: SalesRecord[] = [];

// --- BUILDING (5 Records) ---
export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    { id: 'BLD-001', name: 'Head Office Satrio', assetNo: 'AST-BLD-001', type: 'Office', location: 'Jakarta', address: 'Jl. Prof Dr Satrio Kav 1', status: 'Active', ownership: 'Own', rentCost: '0', totalMaintenanceCost: '150000000', utilityCost: '45000000', startDate: '2010-01-01', endDate: '2099-12-31' },
    { id: 'BLD-002', name: 'MEC Suryo', assetNo: 'AST-BLD-002', type: 'Showroom', location: 'Jakarta', address: 'Jl. Suryo No. 23, Senopati', status: 'Active', ownership: 'Rent', rentCost: '850000000', totalMaintenanceCost: '60000000', utilityCost: '25000000', startDate: '2022-05-01', endDate: '2027-05-01' },
    { id: 'BLD-003', name: 'Branch Surabaya', assetNo: 'AST-BLD-003', type: 'Office & Warehouse', location: 'Surabaya', address: 'Jl. Raya Darmo No. 55', status: 'Active', ownership: 'Rent', rentCost: '450000000', totalMaintenanceCost: '40000000', utilityCost: '15000000', startDate: '2023-01-01', endDate: '2026-01-01' },
    { id: 'BLD-004', name: 'MHC Bintaro', assetNo: 'AST-BLD-004', type: 'Showroom', location: 'Tangerang Selatan', address: 'Jl. Boulevard Bintaro Jaya', status: 'Active', ownership: 'Rent', rentCost: '350000000', totalMaintenanceCost: '30000000', utilityCost: '12000000', startDate: '2021-08-15', endDate: '2026-08-15' },
    { id: 'BLD-005', name: 'Warehouse Cakung', assetNo: 'AST-BLD-005', type: 'Warehouse', location: 'Jakarta Timur', address: 'Kawasan Industri Cakung', status: 'Active', ownership: 'Own', rentCost: '0', totalMaintenanceCost: '80000000', utilityCost: '30000000', startDate: '2015-06-01', endDate: '2099-12-31' }
];

export const MOCK_BUILDING_ASSETS: BuildingAssetRecord[] = [
    { id: 'BA-001', assetName: 'AC Split 2PK', assetCode: 'AC-L1-01', assetType: 'AC', buildingName: 'Head Office Satrio', floor: '1', roomName: 'Lobby', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Quarterly', brand: 'Daikin', purchaseDate: '2022-01-15' },
    { id: 'BA-002', assetName: 'Genset 500KVA', assetCode: 'GEN-B1-01', assetType: 'Genset', buildingName: 'Head Office Satrio', floor: 'Basement', roomName: 'Utility Room', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Monthly', brand: 'Perkins', purchaseDate: '2020-05-20' },
    { id: 'BA-003', assetName: 'CCTV Dome Camera', assetCode: 'CCTV-L2-05', assetType: 'CCTV', buildingName: 'MEC Suryo', floor: '2', roomName: 'Display Area', status: 'Fair', approvalStatus: 'Approved', maintenanceFrequency: 'Yearly', brand: 'Hikvision', purchaseDate: '2022-06-10' },
    { id: 'BA-004', assetName: 'APAR Powder 6kg', assetCode: 'APAR-L1-02', assetType: 'APAR', buildingName: 'Branch Surabaya', floor: '1', roomName: 'Warehouse', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Yearly', brand: 'Yamato', purchaseDate: '2023-02-01' },
    { id: 'BA-005', assetName: 'Fingerprint Machine', assetCode: 'FP-L1-01', assetType: 'Electronics', buildingName: 'Warehouse Cakung', floor: '1', roomName: 'Security Post', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Six-Monthly', brand: 'Solution', purchaseDate: '2021-11-15' }
];
export const MOCK_IT_BUILDING_ASSETS: BuildingAssetRecord[] = [];
export const MOCK_CS_BUILDING_ASSETS: BuildingAssetRecord[] = [];

export const MOCK_BUILDING_MAINTENANCE_DATA: BuildingMaintenanceRecord[] = [
    { id: 'MT-001', assetId: 'BA-001', assetName: 'AC Split 2PK', buildingLocation: 'Head Office - Lt 1', requestDate: '2024-03-10', maintenanceType: 'Preventive', cost: '150000', status: 'Completed', approvalStatus: 'Approved', description: 'Cuci AC Rutin' }
];

export const MOCK_BRANCH_IMPROVEMENT_DATA: BuildingRecord[] = [];
export const MOCK_UTILITY_DATA: UtilityRecord[] = [
    { id: 'UTIL-001', period: 'Maret 2024', date: '2024-03-25', location: 'Head Office Satrio', type: 'Listrik (PLN)', meterStart: 1000, meterEnd: 1500, usage: 500, unit: 'kWh', cost: '750000', status: 'Paid' },
    { id: 'UTIL-002', period: 'Maret 2024', date: '2024-03-26', location: 'MEC Suryo', type: 'Air (PDAM)', meterStart: 500, meterEnd: 550, usage: 50, unit: 'm3', cost: '250000', status: 'Unpaid' }
];

// --- GENERAL & MASTERS (5 Records for General Asset) ---
export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    { id: 'REM-001', documentName: 'SHGB Certificate', buildingName: 'Head Office Satrio', assetNo: 'AST-BLD-001', expiryDate: '2024-06-01', status: 'Warning', daysRemaining: 85, category: 'Legal', source: 'Manual' },
    { id: 'REM-002', documentName: 'Izin Reklame', buildingName: 'MEC Suryo', assetNo: 'AST-BLD-002', expiryDate: '2024-04-15', status: 'Urgent', daysRemaining: 20, category: 'Permit', source: 'Manual' }
];
export const MOCK_MAINTENANCE_REMINDER: ReminderRecord[] = [];

export const MOCK_MAINTENANCE_SCHEDULE_DATA: MaintenanceScheduleRecord[] = [
    { id: 'SCH-001', assetId: 'BA-001', assetName: 'AC Split 2PK - Lobby', assetCode: 'AC-L1-01', location: 'HO Satrio', category: 'AC', frequency: 'Quarterly', lastMaintenanceDate: '2024-01-15', nextMaintenanceDate: '2024-04-15', status: 'Safe', vendor: 'PT. Sejuk Selalu' },
    { id: 'SCH-002', assetId: 'BA-005', assetName: 'Genset 500KVA', assetCode: 'GEN-B1-01', location: 'HO Satrio', category: 'Genset', frequency: 'Monthly', lastMaintenanceDate: '2024-02-28', nextMaintenanceDate: '2024-03-28', status: 'Warning', vendor: 'PT. Power Utama' },
    { id: 'SCH-003', assetId: 'BA-012', assetName: 'APAR 5KG', assetCode: 'APAR-L2-03', location: 'HO Satrio', category: 'APAR', frequency: 'Yearly', lastMaintenanceDate: '2023-03-10', nextMaintenanceDate: '2024-03-10', status: 'Overdue', vendor: 'CV. Damkar Mandiri' },
    { id: 'SCH-004', assetId: 'BA-003', assetName: 'CCTV Maintenance', assetCode: 'CCTV-SYS-01', location: 'MEC Suryo', category: 'CCTV', frequency: 'Quarterly', lastMaintenanceDate: '2024-01-20', nextMaintenanceDate: '2024-04-20', status: 'Safe', vendor: 'PT. Secure Tech' },
    { id: 'SCH-005', assetId: 'BA-008', assetName: 'Pest Control', assetCode: 'PEST-001', location: 'Warehouse Cakung', category: 'Pest Control', frequency: 'Monthly', lastMaintenanceDate: '2024-03-01', nextMaintenanceDate: '2024-04-01', status: 'Safe', vendor: 'Rentokil' }
];

export const MOCK_VENDOR_DATA: VendorRecord[] = [
    { id: 'V-001', vendorName: 'PT. Service Maju', vendorCode: 'VND-001', type: 'Service', category: 'AC Maintenance', email: 'service@maju.com', phone: '021-1234567', address: 'Jl. Fatmawati No. 10, Jakarta Selatan', status: 'Active', picName: 'Budi Santoso' },
    { id: 'V-002', vendorName: 'CV. Berkah Abadi', vendorCode: 'VND-002', type: 'Goods', category: 'Stationery Supply', email: 'sales@berkahabadi.com', phone: '021-9876543', address: 'Jl. Pangeran Jayakarta, Jakarta Pusat', status: 'Active', picName: 'Ani Wijaya' },
    { id: 'V-003', vendorName: 'PT. Mitra Teknindo', vendorCode: 'VND-003', type: 'Service', category: 'IT Support', email: 'support@mitrateknindo.id', phone: '021-5556667', address: 'Ruko Mangga Dua, Jakarta Utara', status: 'Inactive', picName: 'Doni Pratama' },
    { id: 'V-004', vendorName: 'UD. Sumber Air', vendorCode: 'VND-004', type: 'Goods', category: 'Pantry Supply', email: 'order@sumberair.com', phone: '081234567890', address: 'Jl. Raya Bogor KM 30', status: 'Active', picName: 'Siti Aminah' },
    { id: 'V-005', vendorName: 'Bengkel Mobil Sejahtera', vendorCode: 'VND-005', type: 'Service', category: 'Vehicle Maintenance', email: 'bengkel@sejahtera.com', phone: '021-7778889', address: 'Jl. TB Simatupang, Jakarta Selatan', status: 'Active', picName: 'Rudi Hartono' }
];

export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [
    { id: 'MV-001', nama: 'PT. Astra International', merek: 'Toyota, Daihatsu', alamat: 'Jl. Gaya Motor Raya No. 8', noTelp: '021-6522555', tipe: 'Service', cabang: 'Jakarta', aktif: true, vendorName: 'PT. Astra International', vendorCode: 'MV-001', type: 'Service', category: 'Automotive', email: '-', phone: '021-6522555', address: 'Jl. Gaya Motor Raya No. 8', status: 'Active' },
    { id: 'MV-002', nama: 'PT. Honda Prospect Motor', merek: 'Honda', alamat: 'Jl. Mitra Utara II', noTelp: '021-99988877', tipe: 'Service', cabang: 'Surabaya', aktif: true, vendorName: 'PT. Honda Prospect Motor', vendorCode: 'MV-002', type: 'Service', category: 'Automotive', email: '-', phone: '021-99988877', address: 'Jl. Mitra Utara II', status: 'Active' },
    { id: 'MV-003', nama: 'CV. Sinar Dunia', merek: 'Sinar Dunia', alamat: 'Kawasan Industri Pulogadung', noTelp: '021-4610000', tipe: 'Goods', cabang: 'Jakarta', aktif: true, vendorName: 'CV. Sinar Dunia', vendorCode: 'MV-003', type: 'Goods', category: 'Office Supply', email: '-', phone: '021-4610000', address: 'Kawasan Industri Pulogadung', status: 'Active' },
    { id: 'MV-004', nama: 'PT. Datascrip', merek: 'Canon, Asus', alamat: 'Jl. Selaparang Blok B-15', noTelp: '021-6544515', tipe: 'Both', cabang: 'All Branches', aktif: true, vendorName: 'PT. Datascrip', vendorCode: 'MV-004', type: 'Both', category: 'Office Equipment', email: '-', phone: '021-6544515', address: 'Jl. Selaparang Blok B-15', status: 'Active' }
];

export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [];
export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [];
export const MOCK_USER_DATA: UserRecord[] = [
    { id: 'USR-001', name: 'Ibnu Faisal', role: 'Facility Manager', avatar: 'https://i.pravatar.cc/150?u=ibnu', phone: '08123456789', status: 'Active', department: 'GA', location: 'Head Office', joinDate: '2020-01-01' }
];

export const MOCK_GENERAL_ASSET_DATA: GeneralAssetRecord[] = [
    { id: 'GA-001', assetNumber: 'GA-001', assetCategory: 'Furniture', type: 'Office Chair', ownership: 'Own', assetLocation: 'Head Office', subLocation: 'Lt 2 - HR Area', department: 'HR', channel: 'Direct', status: 'Good', approvalStatus: 'Approved', purchasePrice: '1500000', purchaseDate: '2023-01-01', brand: 'IKEA' },
    { id: 'GA-002', assetNumber: 'GA-002', assetCategory: 'Furniture', type: 'Meeting Table Large', ownership: 'Own', assetLocation: 'MEC Suryo', subLocation: 'Lt 1 - Meeting Room', department: 'Sales', channel: 'Direct', status: 'Good', approvalStatus: 'Approved', purchasePrice: '8500000', purchaseDate: '2022-05-15', brand: 'Informa' },
    { id: 'GA-003', assetNumber: 'IT-001', assetCategory: 'Elektronik', type: 'Laptop Dell Latitude', ownership: 'Own', assetLocation: 'Head Office', subLocation: 'Lt 2 - IT Room', department: 'IT', channel: 'Direct', status: 'Fair', approvalStatus: 'Approved', purchasePrice: '14000000', purchaseDate: '2021-08-20', brand: 'Dell' },
    { id: 'GA-004', assetNumber: 'GA-004', assetCategory: 'Equipment', type: 'Coffee Machine', ownership: 'Rent', assetLocation: 'MHC Bintaro', subLocation: 'Lounge Area', department: 'Marketing', channel: 'Rental', status: 'Good', approvalStatus: 'Approved', purchasePrice: '0', purchaseDate: '2023-11-01', brand: 'Nescafe' },
    { id: 'GA-005', assetNumber: 'GA-005', assetCategory: 'Furniture', type: 'Sofa Tamu 3 Seater', ownership: 'Own', assetLocation: 'Branch Surabaya', subLocation: 'Lobby', department: 'GA', channel: 'Direct', status: 'Critical', approvalStatus: 'Approved', purchasePrice: '5500000', purchaseDate: '2020-03-10', brand: 'Local' }
];
export const MOCK_IT_ASSET_DATA: GeneralAssetRecord[] = [];

export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [
    { id: 1, name: 'Head Office', address: 'Jl. Satrio', type: 'HO' }
];

export const MOCK_INSURANCE_DATA: InsuranceRecord[] = [
    { id: 'INS-V-001', policyNumber: 'POL-ASW-2024-001', assetId: '1', assetName: 'B 1234 ABC - TOYOTA AVANZA', category: 'Vehicle', provider: 'Asuransi Astra Buana', type: 'All Risk', startDate: '2024-01-01', endDate: '2025-01-01', premium: '4500000', sumInsured: '200000000', status: 'Active', deductible: '300000', claims: [] },
    { id: 'INS-B-001', policyNumber: 'POL-PAR-2024-001', assetId: 'BLD-001', assetName: 'Head Office Satrio', category: 'Building', provider: 'Zurich Insurance', type: 'Property All Risk', startDate: '2024-01-01', endDate: '2025-01-01', premium: '15000000', sumInsured: '5000000000', status: 'Active', deductible: '5000000', claims: [] }
];

// --- SIMPLE MASTERS ---
export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Kertas' }, { id: 2, name: 'Alat Tulis' }];
export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Cleaning' }, { id: 2, name: 'Pantry' }];
export const MOCK_UOM_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pcs' }, { id: 2, name: 'Rim' }, { id: 3, name: 'Box' }];

// --- GENERIC MASTER DATA ---
// These are used for the Master Data module dropdowns
export const MOCK_PPN_DATA: GeneralMasterItem[] = [{ id: 1, name: '11%' }, { id: 2, name: '0%' }];
export const MOCK_BRAND_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Jepang' }, { id: 2, name: 'Eropa' }];
export const MOCK_BRAND_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Toyota' }, { id: 2, name: 'Honda' }, { id: 3, name: 'Daihatsu' }, { id: 4, name: 'Daikin' }, { id: 5, name: 'Panasonic' }];
export const MOCK_OPERATOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Telkomsel' }, { id: 2, name: 'XL' }];
export const MOCK_GENERAL_ASSET_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Printer' }, { id: 3, name: 'Meja' }, { id: 4, name: 'Kursi' }];
export const MOCK_DEPARTMENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'HR' }, { id: 2, name: 'Finance' }, { id: 3, name: 'GA' }, { id: 4, name: 'Sales' }];
export const MOCK_LOCATION_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Jakarta Head Office' }, { id: 2, name: 'Surabaya Branch' }, { id: 3, name: 'Medan Branch' }];
export const MOCK_UOM_MASTER_DATA: GeneralMasterItem[] = MOCK_UOM_DATA;
export const MOCK_COLOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Hitam' }, { id: 2, name: 'Putih' }, { id: 3, name: 'Silver' }, { id: 4, name: 'Merah' }];
export const MOCK_BUILDING_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Office' }, { id: 2, name: 'Showroom' }, { id: 3, name: 'Warehouse' }];
export const MOCK_COST_CENTER_DATA: GeneralMasterItem[] = [{ id: 1, name: 'CC-001 (HO)' }, { id: 2, name: 'CC-002 (SBY)' }];
export const MOCK_ASSET_CATEGORY_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Kendaraan' }, { id: 2, name: 'Gedung' }, { id: 3, name: 'Elektronik' }, { id: 4, name: 'Furniture' }];
export const MOCK_VEHICLE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'MPV' }, { id: 2, name: 'SUV' }, { id: 3, name: 'Sedan' }, { id: 4, name: 'Box' }, { id: 5, name: 'Motor' }];

// Object for grouped masters
export const MOCK_GENERAL_MASTER_DATA = {
    jenisPajak: [{ id: 1, name: 'Pajak STNK' }, { id: 2, name: 'KIR' }],
    jenisPembayaran: [{ id: 1, name: 'Kasbon' }, { id: 2, name: 'Reimburse' }, { id: 3, name: 'Corporate Card' }],
    jenisServis: [{ id: 1, name: 'Servis Rutin' }, { id: 2, name: 'Ganti Oli' }, { id: 3, name: 'Ganti Ban' }, { id: 4, name: 'Tune Up' }],
    statusMutasi: [{ id: 1, name: 'Draft' }, { id: 2, name: 'Pending Approval' }, { id: 3, name: 'Approved' }, { id: 4, name: 'Completed' }],
    statusPenjualan: [{ id: 1, name: 'Open Bidding' }, { id: 2, name: 'Sold' }, { id: 3, name: 'Scrapped' }],
    statusRequest: [{ id: 1, name: 'Pending' }, { id: 2, name: 'Approved' }, { id: 3, name: 'Rejected' }],
    tipeMutasi: [{ id: 1, name: 'Permanent' }, { id: 2, name: 'Temporary' }],
    tipeVendor: [{ id: 1, name: 'Goods' }, { id: 2, name: 'Service' }, { id: 3, name: 'Both' }],
    peran: [{ id: 1, name: 'Admin' }, { id: 2, name: 'Manager' }, { id: 3, name: 'Staff' }, { id: 4, name: 'Viewer' }]
};
