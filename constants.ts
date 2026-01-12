
import { 
    AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, 
    DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, 
    VehicleContractRecord, GeneralMasterItem, UserRecord, BuildingAssetRecord, 
    BuildingMaintenanceRecord, UtilityRecord, GeneralAssetRecord, VendorRecord, 
    TimesheetRecord, ServiceRecord, MutationRecord, SalesRecord, InsuranceRecord, 
    MaintenanceScheduleRecord, VehicleReminderRecord, LockerRecord, 
    StockOpnameRecord, LockerRequestRecord, PodRequestRecord, MasterPodRecord, 
    MasterLockerRecord, InsuranceProviderRecord, TenantPodRecord, MasterApprovalRecord,
    RequestTypeRecord
} from './types';

// --- HELPER CONSTANTS ---
export const ACTIVITY_TYPES = {
    Cleaning: ["Penyapuan lantai", "Mop lantai", "Pembersihan kamar mandi", "Sanitasi area", "Pengantaran sampah", "Pembersihan kaca"],
    Security: ["Patroli area", "Pemeriksaan identitas", "Kontrol akses", "CCTV check", "Penerimaan tamu", "Pengamanan vendor"],
    Teknisi: ["Perbaikan AC", "Instalasi kabel", "Maintenance perangkat", "Penggantian suku cadang", "Uji coba sistem"]
};

export const CLEANING_CHECKLISTS: Record<string, string[]> = {
    "Penyapuan lantai": ["Sapu bersih debu", "Pastikan sudut bersih", "Buang sampah", "Cek kolong meja"],
    "Mop lantai": ["Gunakan cairan pembersih", "Pasang tanda basah", "Bilas kain pel", "Keringkan area basah"],
    "Pembersihan kamar mandi": ["Isi Tisu", "Lantai Kering", "Wastafel Bersih", "Cermin Bersih", "Sabun Terisi", "Toilet Bowl Bersih"],
    "Sanitasi area": ["Lap gagang pintu", "Lap meja resepsionis", "Semprot disinfektan", "Lap tombol lift"],
    "Pengantaran sampah": ["Pilad sampah (organik/non)", "Ganti plastik sampah", "Ikat plastik sampah", "Bawa ke TPS"],
    "Pembersihan kaca": ["Semprot glass cleaner", "Wiper kaca", "Lap sudut kaca", "Cek noda air"]
};

// --- MASTER CONFIGURATION DATA ---
export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [
    { id: 1, name: 'PICKUP HO SATRIO', type: 'Internal', status: 'Active' },
    { id: 2, name: 'PICKUP WAREHOUSE CIKUPA', type: 'Internal', status: 'Active' },
    { id: 3, name: 'DELIVERY JNE / TIKI', type: 'External', status: 'Active' },
    { id: 4, name: 'GOSEND / GRAB', type: 'External', status: 'Active' },
    { id: 5, name: 'PICKUP SURABAYA BRANCH', type: 'Internal', status: 'Active' }
];

export const MOCK_REQUEST_TYPES: RequestTypeRecord[] = [
    { id: 1, name: 'DAILY REQUEST', status: 'Active' },
    { id: 2, name: 'EVENT REQUEST', status: 'Active' },
    { id: 3, name: 'NEW EMPLOYEE KIT', status: 'Active' },
    { id: 4, name: 'URGENT REQUEST', status: 'Active' },
    { id: 5, name: 'PROJECT SUPPLY', status: 'Active' }
];

// --- ATK & ARK DATA ---
export const MOCK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ATK/2023/001', employee: { name: 'Budi Santoso', role: 'Staff IT', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random' }, category: 'ATK', itemName: 'Kertas A4', qty: 5, uom: 'Rim', date: '2023-10-25', status: 'Approved', location: 'Jakarta' },
    { id: 2, transactionNumber: 'TRX/ATK/2023/002', employee: { name: 'Siti Aminah', role: 'HR Admin', avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=random' }, category: 'ATK', itemName: 'Pulpen Hitam', qty: 12, uom: 'Pcs', date: '2023-10-26', status: 'Pending', location: 'Jakarta' },
    { id: 3, transactionNumber: 'TRX/ATK/2023/003', employee: { name: 'Andi Wijaya', role: 'Sales', avatar: 'https://ui-avatars.com/api/?name=Andi+Wijaya&background=random' }, category: 'ATK', itemName: 'Map Folder Plastik', qty: 50, uom: 'Pcs', date: '2023-10-27', status: 'Approved', location: 'Surabaya' },
    { id: 4, transactionNumber: 'TRX/ATK/2023/004', employee: { name: 'Rina Kartika', role: 'Finance', avatar: 'https://ui-avatars.com/api/?name=Rina+Kartika&background=random' }, category: 'ATK', itemName: 'Stapler Besar', qty: 2, uom: 'Unit', date: '2023-10-28', status: 'Rejected', location: 'Bandung' },
    { id: 5, transactionNumber: 'TRX/ATK/2023/005', employee: { name: 'Doni Pratama', role: 'Marketing', avatar: 'https://ui-avatars.com/api/?name=Doni+Pratama&background=random' }, category: 'ATK', itemName: 'Tinta Printer HP 680', qty: 4, uom: 'Box', date: '2023-10-29', status: 'Waiting Approval', location: 'Jakarta' }
];

export const MOCK_MASTER_DATA: MasterItem[] = [
    { id: 1, category: 'Kertas', itemName: 'Kertas A4 80gr', itemCode: 'ATK-P-001', uom: 'Rim', inStock: 50, remainingStock: 50, minimumStock: 10, maximumStock: 100, requestedStock: 5, lastPurchasePrice: '45000', averagePrice: '44000', purchaseDate: '2023-10-01' },
    { id: 2, category: 'Tulis', itemName: 'Pulpen Standard Hitam', itemCode: 'ATK-W-002', uom: 'Pcs', inStock: 120, remainingStock: 120, minimumStock: 20, maximumStock: 200, requestedStock: 0, lastPurchasePrice: '3000', averagePrice: '2900', purchaseDate: '2023-09-15' },
    { id: 3, category: 'File', itemName: 'Bantex Ordner Blue', itemCode: 'ATK-F-003', uom: 'Pcs', inStock: 25, remainingStock: 10, minimumStock: 15, maximumStock: 50, requestedStock: 15, lastPurchasePrice: '35000', averagePrice: '34500', purchaseDate: '2023-08-20' },
    { id: 4, category: 'Elektronik', itemName: 'Kalkulator Casio 12 Digit', itemCode: 'ATK-E-004', uom: 'Unit', inStock: 5, remainingStock: 5, minimumStock: 2, maximumStock: 10, requestedStock: 0, lastPurchasePrice: '150000', averagePrice: '148000', purchaseDate: '2023-06-10' },
    { id: 5, category: 'Perekat', itemName: 'Lakban Bening 2 Inch', itemCode: 'ATK-T-005', uom: 'Roll', inStock: 40, remainingStock: 38, minimumStock: 10, maximumStock: 60, requestedStock: 0, lastPurchasePrice: '12000', averagePrice: '11500', purchaseDate: '2023-10-05' }
];

export const MOCK_ARK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ARK/2023/001', employee: { name: 'Joko Susilo', role: 'GA Staff' }, category: 'Cleaning', itemName: 'Pembersih Lantai', qty: 2, uom: 'Galon', date: '2023-10-20', status: 'Approved' },
    { id: 2, transactionNumber: 'TRX/ARK/2023/002', employee: { name: 'Sri Wahyuni', role: 'OB' }, category: 'Pantry', itemName: 'Gula Pasir', qty: 5, uom: 'Kg', date: '2023-10-21', status: 'Pending' },
    { id: 3, transactionNumber: 'TRX/ARK/2023/003', employee: { name: 'Bambang', role: 'GA' }, category: 'Cleaning', itemName: 'Tisu Toilet Roll', qty: 100, uom: 'Roll', date: '2023-10-22', status: 'Approved' },
    { id: 4, transactionNumber: 'TRX/ARK/2023/004', employee: { name: 'Susi', role: 'Pantry' }, category: 'Pantry', itemName: 'Kopi Kapal Api', qty: 10, uom: 'Pack', date: '2023-10-23', status: 'Waiting Approval' },
    { id: 5, transactionNumber: 'TRX/ARK/2023/005', employee: { name: 'Rudi', role: 'GA' }, category: 'Cleaning', itemName: 'Hand Soap', qty: 5, uom: 'Galon', date: '2023-10-24', status: 'Rejected' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
    { id: 1, category: 'Cleaning', itemName: 'Wipol Karbol', itemCode: 'ARK-C-001', uom: 'Galon', inStock: 15, remainingStock: 15, minimumStock: 5, maximumStock: 30, requestedStock: 0, lastPurchasePrice: '50000', averagePrice: '49000', purchaseDate: '2023-10-05' },
    { id: 2, category: 'Pantry', itemName: 'Gula Pasir Gulaku', itemCode: 'ARK-P-002', uom: 'Kg', inStock: 20, remainingStock: 5, minimumStock: 10, maximumStock: 50, requestedStock: 15, lastPurchasePrice: '15000', averagePrice: '14500', purchaseDate: '2023-10-10' },
    { id: 3, category: 'Pantry', itemName: 'Teh Sariwangi', itemCode: 'ARK-P-003', uom: 'Box', inStock: 30, remainingStock: 28, minimumStock: 5, maximumStock: 50, requestedStock: 0, lastPurchasePrice: '8000', averagePrice: '7800', purchaseDate: '2023-09-25' },
    { id: 4, category: 'Cleaning', itemName: 'Sunlight Cair', itemCode: 'ARK-C-004', uom: 'Pouch', inStock: 40, remainingStock: 40, minimumStock: 10, maximumStock: 60, requestedStock: 0, lastPurchasePrice: '18000', averagePrice: '17500', purchaseDate: '2023-10-01' },
    { id: 5, category: 'Umum', itemName: 'Pewangi Ruangan Spray', itemCode: 'ARK-U-005', uom: 'Kaleng', inStock: 12, remainingStock: 4, minimumStock: 5, maximumStock: 20, requestedStock: 8, lastPurchasePrice: '25000', averagePrice: '24000', purchaseDate: '2023-08-15' }
];

// --- VEHICLE DATA ---
export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noPolisi: 'B 1234 ABC', nama: 'Toyota Avanza', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'G MT', tahunPembuatan: '2020', warna: 'Hitam', isiSilinder: '1300', ownership: 'Milik Modena', channel: 'HCO', cabang: 'Jakarta', approvalStatus: 'Approved', status: 'Aktif' },
    { id: 2, noPolisi: 'B 5678 DEF', nama: 'Daihatsu Gran Max', merek: 'Daihatsu', tipeKendaraan: 'Blind Van', model: '1.3', tahunPembuatan: '2019', warna: 'Putih', isiSilinder: '1300', ownership: 'Sewa', channel: 'Logistics', cabang: 'Surabaya', approvalStatus: 'Pending', status: 'Aktif' },
    { id: 3, noPolisi: 'D 9999 XYZ', nama: 'Toyota Innova Reborn', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'V AT Diesel', tahunPembuatan: '2021', warna: 'Silver', isiSilinder: '2400', ownership: 'Milik Modena', channel: 'Management', cabang: 'Bandung', approvalStatus: 'Approved', status: 'Service' },
    { id: 4, noPolisi: 'L 4321 CBA', nama: 'Mitsubishi Xpander', merek: 'Mitsubishi', tipeKendaraan: 'MPV', model: 'Ultimate', tahunPembuatan: '2022', warna: 'Putih', isiSilinder: '1500', ownership: 'Sewa', channel: 'Sales', cabang: 'Surabaya', approvalStatus: 'Approved', status: 'Aktif' },
    { id: 5, noPolisi: 'BK 8888 AA', nama: 'Toyota Hilux Single Cab', merek: 'Toyota', tipeKendaraan: 'Pickup', model: '2.4 Diesel', tahunPembuatan: '2018', warna: 'Hitam', isiSilinder: '2400', ownership: 'Milik Modena', channel: 'Warehouse', cabang: 'Medan', approvalStatus: 'Approved', status: 'Aktif' }
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    { id: 'CTR-001', noKontrak: 'KTR/001/2023', noPolisi: 'B 5678 DEF', aset: 'Daihatsu Gran Max', vendor: 'TRAC', tglMulai: '2023-01-01', tglBerakhir: '2024-01-01', biayaSewa: '4500000', approvalStatus: 'Approved', status: 'Active', channel: 'Logistics', cabang: 'Surabaya' },
    { id: 'CTR-002', noKontrak: 'KTR/002/2023', noPolisi: 'L 4321 CBA', aset: 'Mitsubishi Xpander', vendor: 'MPMRent', tglMulai: '2023-02-01', tglBerakhir: '2024-02-01', biayaSewa: '6000000', approvalStatus: 'Approved', status: 'Active', channel: 'Sales', cabang: 'Surabaya' },
    { id: 'CTR-003', noKontrak: 'KTR/003/2023', noPolisi: 'B 2222 GH', aset: 'Toyota Avanza', vendor: 'ASSA Rent', tglMulai: '2023-06-01', tglBerakhir: '2024-06-01', biayaSewa: '5000000', approvalStatus: 'Pending', status: 'Pending', channel: 'Sales', cabang: 'Jakarta' },
    { id: 'CTR-004', noKontrak: 'KTR/004/2022', noPolisi: 'D 1111 JK', aset: 'Honda Brio', vendor: 'TRAC', tglMulai: '2022-01-01', tglBerakhir: '2022-12-31', biayaSewa: '3500000', approvalStatus: 'Approved', status: 'Expired', channel: 'Admin', cabang: 'Bandung' },
    { id: 'CTR-005', noKontrak: 'KTR/005/2023', noPolisi: 'B 9090 KL', aset: 'Isuzu Elf', vendor: 'Bluebird', tglMulai: '2023-03-15', tglBerakhir: '2024-03-15', biayaSewa: '8000000', approvalStatus: 'Approved', status: 'Active', channel: 'Logistics', cabang: 'Jakarta' }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    { id: 'SRV-001', noPolisi: 'B 1234 ABC', tglRequest: '2023-11-01', channel: 'HCO', cabang: 'Jakarta', status: 'Completed', statusApproval: 'Approved', jenisServis: 'Servis Rutin', cost: '1500000', vendor: 'Auto2000' },
    { id: 'SRV-002', noPolisi: 'D 9999 XYZ', tglRequest: '2023-11-05', channel: 'Management', cabang: 'Bandung', status: 'In Progress', statusApproval: 'Approved', jenisServis: 'Ganti Aki', cost: '1200000', vendor: 'Shop&Drive' },
    { id: 'SRV-003', noPolisi: 'B 5678 DEF', tglRequest: '2023-11-10', channel: 'Logistics', cabang: 'Surabaya', status: 'Scheduled', statusApproval: 'Pending', jenisServis: 'Servis Berkala 40k', cost: '2500000', vendor: 'Daihatsu Service' },
    { id: 'SRV-004', noPolisi: 'BK 8888 AA', tglRequest: '2023-10-15', channel: 'Warehouse', cabang: 'Medan', status: 'Completed', statusApproval: 'Approved', jenisServis: 'Ganti Ban', cost: '3000000', vendor: 'Bridgestone' },
    { id: 'SRV-005', noPolisi: 'B 1234 ABC', tglRequest: '2023-06-01', channel: 'HCO', cabang: 'Jakarta', status: 'Completed', statusApproval: 'Approved', jenisServis: 'Servis Rutin', cost: '1400000', vendor: 'Auto2000' }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    { id: 'TAX-001', noPolisi: 'B 1234 ABC', tglRequest: '2023-12-01', jenis: 'Pajak STNK', channel: 'HCO', cabang: 'Jakarta', status: 'Proses', statusApproval: 'Approved', estimasiBiaya: '3500000' },
    { id: 'TAX-002', noPolisi: 'B 5678 DEF', tglRequest: '2023-11-20', jenis: 'KIR', channel: 'Logistics', cabang: 'Surabaya', status: 'Selesai', statusApproval: 'Approved', estimasiBiaya: '450000' },
    { id: 'TAX-003', noPolisi: 'BK 8888 AA', tglRequest: '2023-12-05', jenis: 'Pajak STNK', channel: 'Warehouse', cabang: 'Medan', status: 'Pending', statusApproval: 'Pending', estimasiBiaya: '4200000' },
    { id: 'TAX-004', noPolisi: 'D 9999 XYZ', tglRequest: '2023-10-10', jenis: 'Pajak STNK 5 Tahunan', channel: 'Management', cabang: 'Bandung', status: 'Selesai', statusApproval: 'Approved', estimasiBiaya: '5500000' },
    { id: 'TAX-005', noPolisi: 'L 4321 CBA', tglRequest: '2023-12-10', jenis: 'KIR', channel: 'Sales', cabang: 'Surabaya', status: 'Proses', statusApproval: 'Approved', estimasiBiaya: '500000' }
];

export const MOCK_VEHICLE_REMINDER_DATA: VehicleReminderRecord[] = [
    { id: 1, noPolisi: 'B 1234 ABC', vehicleName: 'Toyota Avanza', branch: 'Jakarta', type: 'STNK 1 Tahunan', status: 'Warning', expiryDate: '2024-01-15' },
    { id: 2, noPolisi: 'B 5678 DEF', vehicleName: 'Daihatsu Gran Max', branch: 'Surabaya', type: 'KIR', status: 'Critical', expiryDate: '2023-12-25' },
    { id: 3, noPolisi: 'D 9999 XYZ', vehicleName: 'Toyota Innova', branch: 'Bandung', type: 'STNK 5 Tahunan', status: 'Safe', expiryDate: '2024-06-20' },
    { id: 4, noPolisi: 'BK 8888 AA', vehicleName: 'Toyota Hilux', branch: 'Medan', type: 'KIR', status: 'Expired', expiryDate: '2023-11-30' },
    { id: 5, noPolisi: 'L 4321 CBA', vehicleName: 'Mitsubishi Xpander', branch: 'Surabaya', type: 'STNK 1 Tahunan', status: 'Safe', expiryDate: '2024-03-10' }
];

export const MOCK_MUTATION_DATA: MutationRecord[] = [
    { id: 'MUT-001', assetType: 'VEHICLE', noPolisi: 'B 1234 ABC', cabangAset: 'Jakarta', tipeMutasi: 'Permanent', tglPermintaan: '2023-11-10', lokasiAsal: 'Jakarta', lokasiTujuan: 'Bandung', status: 'Approved', statusApproval: 'Approved' },
    { id: 'MUT-002', assetType: 'GENERAL_ASSET', assetName: 'Laptop Dell', assetNumber: 'GA-IT-001', cabangAset: 'Jakarta', tipeMutasi: 'Temporary', tglPermintaan: '2023-11-12', lokasiAsal: 'Jakarta', lokasiTujuan: 'Surabaya', status: 'Pending', statusApproval: 'Pending' },
    { id: 'MUT-003', assetType: 'VEHICLE', noPolisi: 'BK 8888 AA', cabangAset: 'Medan', tipeMutasi: 'Permanent', tglPermintaan: '2023-10-01', lokasiAsal: 'Medan', lokasiTujuan: 'Jakarta', status: 'Completed', statusApproval: 'Approved' },
    { id: 'MUT-004', assetType: 'GENERAL_ASSET', assetName: 'Genset Perkins', assetNumber: 'GA-ENG-005', cabangAset: 'Surabaya', tipeMutasi: 'Permanent', tglPermintaan: '2023-11-20', lokasiAsal: 'Surabaya', lokasiTujuan: 'Bali', status: 'Pending', statusApproval: 'Waiting Approval' },
    { id: 'MUT-005', assetType: 'VEHICLE', noPolisi: 'D 9999 XYZ', cabangAset: 'Bandung', tipeMutasi: 'Temporary', tglPermintaan: '2023-12-01', lokasiAsal: 'Bandung', lokasiTujuan: 'Cirebon', status: 'Approved', statusApproval: 'Approved' }
];

export const MOCK_SALES_DATA: SalesRecord[] = [
    { id: 'SALE-001', assetType: 'VEHICLE', noPolisi: 'B 9999 XYZ', tglRequest: '2023-10-01', channel: 'HCO', cabang: 'Jakarta', hargaTertinggi: '120000000', status: 'Open Bidding', statusApproval: 'Approved' },
    { id: 'SALE-002', assetType: 'GENERAL_ASSET', assetName: 'Old Server Rack', assetNumber: 'GA-IT-OLD-01', tglRequest: '2023-11-05', channel: 'IT', cabang: 'Jakarta', hargaTertinggi: '5000000', status: 'Closed', statusApproval: 'Approved' },
    { id: 'SALE-003', assetType: 'VEHICLE', noPolisi: 'L 1111 O', tglRequest: '2023-09-15', channel: 'Sales', cabang: 'Surabaya', hargaTertinggi: '95000000', status: 'Sold', statusApproval: 'Approved' },
    { id: 'SALE-004', assetType: 'GENERAL_ASSET', assetName: 'Office Chair Lot (20pcs)', assetNumber: 'GA-FUR-LOT-02', tglRequest: '2023-11-20', channel: 'GA', cabang: 'Bandung', hargaTertinggi: '2000000', status: 'Open Bidding', statusApproval: 'Approved' },
    { id: 'SALE-005', assetType: 'VEHICLE', noPolisi: 'B 8888 JJ', tglRequest: '2023-12-01', channel: 'Management', cabang: 'Jakarta', hargaTertinggi: '0', status: 'Draft', statusApproval: 'Pending' }
];

// --- BUILDING & ASSET DATA ---
export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    { id: 1, name: 'MODENA Head Office', assetNo: 'BDG-001', type: 'Office', ownership: 'Rent', location: 'Jakarta', address: 'Jl. Satrio No. 1', status: 'Active', rentCost: '500000000', electricityPower: '100000 VA', waterSource: 'PDAM' },
    { id: 2, name: 'MODENA Warehouse Cikupa', assetNo: 'BDG-002', type: 'Warehouse', ownership: 'Own', location: 'Tangerang', address: 'Kawasan Industri Cikupa', status: 'Active', purchasePrice: '15000000000', electricityPower: '150000 VA', waterSource: 'Air Tanah' },
    { id: 3, name: 'MODENA Branch Bandung', assetNo: 'BDG-003', type: 'Office & Showroom', ownership: 'Rent', location: 'Bandung', address: 'Jl. Dago No. 88', status: 'Active', rentCost: '200000000', electricityPower: '33000 VA', waterSource: 'PDAM' },
    { id: 4, name: 'MODENA Branch Surabaya', assetNo: 'BDG-004', type: 'Office & Showroom', ownership: 'Rent', location: 'Surabaya', address: 'Jl. HR Muhammad', status: 'Active', rentCost: '250000000', electricityPower: '44000 VA', waterSource: 'PDAM' },
    { id: 5, name: 'MODENA MEC Kemang', assetNo: 'BDG-005', type: 'Showroom', ownership: 'Own', location: 'Jakarta', address: 'Jl. Kemang Raya', status: 'Renovation', purchasePrice: '25000000000', electricityPower: '66000 VA', waterSource: 'PDAM' }
];

export const MOCK_UTILITY_DATA: UtilityRecord[] = [
    { id: 'UTIL-001', period: 'November 2023', date: '2023-11-30', location: 'MODENA Head Office', type: 'Listrik (PLN)', meterStart: 1000, meterEnd: 1500, usage: 500, unit: 'kWh', cost: '750000', status: 'Paid' },
    { id: 'UTIL-002', period: 'November 2023', date: '2023-11-30', location: 'MODENA Head Office', type: 'Air (PDAM)', meterStart: 500, meterEnd: 550, usage: 50, unit: 'm3', cost: '250000', status: 'Paid' },
    { id: 'UTIL-003', period: 'November 2023', date: '2023-11-30', location: 'MODENA Warehouse Cikupa', type: 'Listrik (PLN)', meterStart: 5000, meterEnd: 6000, usage: 1000, unit: 'kWh', cost: '1500000', status: 'Pending Review' },
    { id: 'UTIL-004', period: 'November 2023', date: '2023-11-30', location: 'MODENA Branch Bandung', type: 'Internet', meterStart: 0, meterEnd: 0, usage: 0, unit: 'Mbps', cost: '550000', status: 'Paid' },
    { id: 'UTIL-005', period: 'Oktober 2023', date: '2023-10-31', location: 'MODENA Branch Surabaya', type: 'Listrik (PLN)', meterStart: 2000, meterEnd: 2400, usage: 400, unit: 'kWh', cost: '600000', status: 'Paid' }
];

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    { id: 1, category: 'Permit', documentName: 'Izin Domisili', buildingName: 'MODENA Head Office', assetNo: 'BDG-001', expiryDate: '2024-02-20', status: 'Warning', source: 'Manual', daysRemaining: 60 },
    { id: 2, category: 'Lease', documentName: 'Kontrak Sewa Gedung', buildingName: 'MODENA Branch Bandung', assetNo: 'BDG-003', expiryDate: '2023-12-31', status: 'Critical', source: 'System', daysRemaining: 10 },
    { id: 3, category: 'Insurance', documentName: 'Polis Asuransi Gedung', buildingName: 'MODENA Warehouse Cikupa', assetNo: 'BDG-002', expiryDate: '2024-05-15', status: 'Safe', source: 'System', daysRemaining: 150 },
    { id: 4, category: 'Permit', documentName: 'SLF (Sertifikat Laik Fungsi)', buildingName: 'MODENA MEC Kemang', assetNo: 'BDG-005', expiryDate: '2024-10-10', status: 'Safe', source: 'Manual', daysRemaining: 300 },
    { id: 5, category: 'Tax', documentName: 'PBB 2024', buildingName: 'MODENA Warehouse Cikupa', assetNo: 'BDG-002', expiryDate: '2024-08-31', status: 'Safe', source: 'Manual', daysRemaining: 250 }
];

export const MOCK_BUILDING_MAINTENANCE_DATA: BuildingMaintenanceRecord[] = [
    { id: 'BM-001', assetName: 'AC Central Lt 1', requestDate: '2023-11-15', maintenanceType: 'Corrective', vendor: 'PT Dingin Sejuk', cost: '2500000', status: 'Completed', approvalStatus: 'Approved', description: 'AC tidak dingin' },
    { id: 'BM-002', assetName: 'Genset Utama', requestDate: '2023-12-01', maintenanceType: 'Preventive', vendor: 'PT Power Genset', cost: '1500000', status: 'Scheduled', approvalStatus: 'Approved', description: 'Monthly checkup' },
    { id: 'BM-003', assetName: 'Pintu Kaca Lobby', requestDate: '2023-12-10', maintenanceType: 'Emergency', vendor: 'CV Kaca Maju', cost: '3000000', status: 'In Progress', approvalStatus: 'Approved', description: 'Pintu pecah' },
    { id: 'BM-004', assetName: 'Lift Penumpang', requestDate: '2023-12-05', maintenanceType: 'Preventive', vendor: 'Schindler', cost: '5000000', status: 'Scheduled', approvalStatus: 'Pending Approval', description: 'Quarterly maintenance' },
    { id: 'BM-005', assetName: 'Instalasi Air', requestDate: '2023-11-20', maintenanceType: 'Corrective', vendor: 'Tukang Ledeng', cost: '500000', status: 'Completed', approvalStatus: 'Approved', description: 'Pipa bocor di toilet' }
];

// --- GENERAL ASSET & INSURANCE ---
export const MOCK_GENERAL_ASSET_DATA: GeneralAssetRecord[] = [
    { id: 'GA-001', assetNumber: 'GA-IT-001', assetName: 'Laptop Dell Latitude', assetCategory: 'IT Asset', type: 'Laptop', ownership: 'Own', assetLocation: 'Jakarta', department: 'IT', status: 'Active', purchaseDate: '2022-01-10', purchasePrice: '15000000' },
    { id: 'GA-002', assetNumber: 'GA-HC-001', assetName: 'Kursi Kerja Ergonomis', assetCategory: 'Asset HC', type: 'Furniture', ownership: 'Own', assetLocation: 'Jakarta', department: 'HR', status: 'Active', purchaseDate: '2021-05-20', purchasePrice: '2500000' },
    { id: 'GA-003', assetNumber: 'GA-CS-001', assetName: 'Headset Jabra', assetCategory: 'Customer Service', type: 'Accessories', ownership: 'Own', assetLocation: 'Bandung', department: 'CS', status: 'Active', purchaseDate: '2023-03-01', purchasePrice: '1200000' },
    { id: 'GA-004', assetNumber: 'GA-IT-002', assetName: 'Projector Epson', assetCategory: 'IT Asset', type: 'Electronics', ownership: 'Rent', assetLocation: 'Surabaya', department: 'Sales', status: 'Active', purchaseDate: '2023-06-15', purchasePrice: '0' },
    { id: 'GA-005', assetNumber: 'GA-HC-002', assetName: 'Meja Meeting Besar', assetCategory: 'Asset HC', type: 'Furniture', ownership: 'Own', assetLocation: 'Medan', department: 'GA', status: 'Active', purchaseDate: '2020-11-10', purchasePrice: '8000000' }
];

export const MOCK_ASSET_MAINTENANCE_DATA: MaintenanceScheduleRecord[] = [
    { id: 'SCH-001', assetId: 'GA-001', assetName: 'Laptop Dell Latitude', assetCode: 'GA-IT-001', frequency: 'Yearly', lastMaintenanceDate: '2023-01-10', nextMaintenanceDate: '2024-01-10', status: 'Safe', location: 'Jakarta' },
    { id: 'SCH-002', assetId: 'BA-001', assetName: 'AC Split 1PK', assetCode: 'AC-001', frequency: 'Quarterly', lastMaintenanceDate: '2023-09-15', nextMaintenanceDate: '2023-12-15', status: 'Warning', location: 'Jakarta' },
    { id: 'SCH-003', assetId: 'BA-002', assetName: 'Genset 500KVA', assetCode: 'GEN-01', frequency: 'Monthly', lastMaintenanceDate: '2023-11-01', nextMaintenanceDate: '2023-12-01', status: 'Overdue', location: 'Cikupa' },
    { id: 'SCH-004', assetId: 'BA-003', assetName: 'Fire Alarm System', assetCode: 'FAS-01', frequency: 'Yearly', lastMaintenanceDate: '2022-12-10', nextMaintenanceDate: '2023-12-10', status: 'Warning', location: 'Jakarta' },
    { id: 'SCH-005', assetId: 'GA-004', assetName: 'Projector Epson', assetCode: 'GA-IT-002', frequency: 'Quarterly', lastMaintenanceDate: '2023-08-20', nextMaintenanceDate: '2023-11-20', status: 'Overdue', location: 'Surabaya' }
];

export const MOCK_INSURANCE_DATA: InsuranceRecord[] = [
    { id: 'INS-001', policyNumber: 'POL-001-2023', provider: 'AXA Mandiri', type: 'All Risk', startDate: '2023-01-01', endDate: '2024-01-01', premium: '5000000', status: 'Active', assets: [{ id: '1', name: 'Toyota Avanza', type: 'Vehicle', identifier: 'B 1234 ABC' }] },
    { id: 'INS-002', policyNumber: 'POL-002-2023', provider: 'Allianz', type: 'Property All Risk', startDate: '2023-03-01', endDate: '2024-03-01', premium: '15000000', status: 'Active', assets: [{ id: '1', name: 'MODENA Head Office', type: 'Building', identifier: 'BDG-001' }] },
    { id: 'INS-003', policyNumber: 'POL-003-2023', provider: 'Sinarmas', type: 'TLO', startDate: '2023-05-15', endDate: '2024-05-15', premium: '3000000', status: 'Active', assets: [{ id: '2', name: 'Daihatsu Gran Max', type: 'Vehicle', identifier: 'B 5678 DEF' }] },
    { id: 'INS-004', policyNumber: 'POL-004-2022', provider: 'ACA Insurance', type: 'All Risk', startDate: '2022-12-01', endDate: '2023-12-01', premium: '4500000', status: 'Expiring', assets: [{ id: '4', name: 'Mitsubishi Xpander', type: 'Vehicle', identifier: 'L 4321 CBA' }] },
    { id: 'INS-005', policyNumber: 'POL-005-2022', provider: 'Zurich', type: 'Fleet Policy', startDate: '2022-11-20', endDate: '2023-11-20', premium: '25000000', status: 'Expired', assets: [{ id: '5', name: 'Toyota Hilux', type: 'Vehicle', identifier: 'BK 8888 AA' }] }
];

export const MOCK_INSURANCE_PROVIDERS: InsuranceProviderRecord[] = [
    { id: 1, name: 'AXA Mandiri', contactPerson: 'John Doe', phone: '021-1234567', email: 'contact@axa.com', address: 'Jakarta', rating: 5 },
    { id: 2, name: 'Allianz Indonesia', contactPerson: 'Jane Smith', phone: '021-9876543', email: 'support@allianz.co.id', address: 'Jakarta Selatan', rating: 4 },
    { id: 3, name: 'Asuransi Sinarmas', contactPerson: 'Budi Hartono', phone: '021-5555555', email: 'info@sinarmas.co.id', address: 'Jakarta Pusat', rating: 4 },
    { id: 4, name: 'ACA Insurance', contactPerson: 'Dewi Sartika', phone: '021-7777777', email: 'cs@aca.co.id', address: 'Jakarta Barat', rating: 3 },
    { id: 5, name: 'Zurich Insurance', contactPerson: 'Michael Tan', phone: '021-8888888', email: 'help@zurich.com', address: 'Jakarta Selatan', rating: 5 }
];

// --- FACILITY DATA (PODS & LOCKERS) ---
export const MOCK_POD_REQUEST_DATA: PodRequestRecord[] = [
    { id: 1, requesterName: 'Andi Saputra', requesterRole: 'Technician', floorPreference: 'LT 2 PRIA', roomType: 'SINGLE BED', requestDate: '2023-11-20', status: 'Pending', gender: 'Pria', isExpat: false },
    { id: 2, requesterName: 'Rina Maryana', requesterRole: 'Staff Admin', floorPreference: 'LT 2 PEREMPUAN', roomType: 'DOUBLE BED', requestDate: '2023-11-22', status: 'Approved', gender: 'Perempuan', isExpat: false },
    { id: 3, requesterName: 'John Smith', requesterRole: 'Manager', floorPreference: 'LT 3 PRIA', roomType: 'SINGLE BED', requestDate: '2023-11-25', status: 'Waiting Approval', gender: 'Pria', isExpat: true },
    { id: 4, requesterName: 'Siti Nurhaliza', requesterRole: 'Sales', floorPreference: 'LT 2 PEREMPUAN', roomType: 'SINGLE BED', requestDate: '2023-11-28', status: 'Rejected', gender: 'Perempuan', isExpat: false },
    { id: 5, requesterName: 'Budi Utomo', requesterRole: 'Driver', floorPreference: 'LT 3 PRIA', roomType: 'QUADRUPLE BED', requestDate: '2023-12-01', status: 'Pending', gender: 'Pria', isExpat: false }
];

export const MOCK_LOCKER_DATA: LockerRecord[] = [
    { id: 1, lockerNumber: 'L-001', floor: 'Lantai 1', area: 'Lobby', assignedTo: 'Andi Saputra', department: 'Technician', spareKeyStatus: 'Ada', lastAuditDate: '2023-11-01', status: 'Terisi', type: 'Personal' },
    { id: 2, lockerNumber: 'L-002', floor: 'Lantai 1', area: 'Lobby', assignedTo: '', department: '', spareKeyStatus: 'Ada', lastAuditDate: '2023-11-01', status: 'Kosong', type: 'Personal' },
    { id: 3, lockerNumber: 'L-P-01', floor: 'Lantai 2', area: 'Pantry', assignedTo: 'Susi Susanti', department: 'Pantry', spareKeyStatus: 'Tidak Ada', lastAuditDate: '2023-10-15', status: 'Terisi', type: 'Pantry' },
    { id: 4, lockerNumber: 'L-003', floor: 'Lantai 1', area: 'Lobby', assignedTo: '', department: '', spareKeyStatus: 'Ada', lastAuditDate: '2023-11-01', status: 'Kunci Hilang', type: 'Personal' },
    { id: 5, lockerNumber: 'L-004', floor: 'Lantai 2', area: 'Corridor', assignedTo: 'Budi', department: 'IT', spareKeyStatus: 'Ada', lastAuditDate: '2023-11-05', status: 'Terisi', type: 'Personal' }
];

export const MOCK_LOCKER_REQUEST_DATA: LockerRequestRecord[] = [
    { id: 1, requesterName: 'Budi Santoso', requesterRole: 'Staff', requestDate: '2023-11-25', status: 'Pending', lockerNumber: 'L-002', floor: 'Lantai 1' },
    { id: 2, requesterName: 'Ani Yuliani', requesterRole: 'Intern', requestDate: '2023-11-26', status: 'Approved', lockerNumber: 'L-005', floor: 'Lantai 2' },
    { id: 3, requesterName: 'Doni Tata', requesterRole: 'Security', requestDate: '2023-11-27', status: 'Rejected', lockerNumber: 'L-001', floor: 'Lantai 1' },
    { id: 4, requesterName: 'Eka Putri', requesterRole: 'Staff', requestDate: '2023-11-28', status: 'Waiting Approval', lockerNumber: 'L-P-02', floor: 'Lantai 2' },
    { id: 5, requesterName: 'Fajar Shodiq', requesterRole: 'Driver', requestDate: '2023-11-29', status: 'Pending', lockerNumber: 'L-006', floor: 'Lantai 1' }
];

export const MOCK_MASTER_POD_DATA: MasterPodRecord[] = [
    { id: 1, lantai: 'LT 2', jenisKamar: 'Single Bed', nomorKamar: '201', kapasitas: 1, status: 'ACTIVE', biayaAwal: '1500000', biayaTerbaru: '1600000', facilities: {}, gender: 'PRIA', occupiedBy: 'Andi' },
    { id: 2, lantai: 'LT 2', jenisKamar: 'Double Bed', nomorKamar: '202', kapasitas: 2, status: 'ACTIVE', biayaAwal: '2500000', biayaTerbaru: '2600000', facilities: {}, gender: 'PRIA', occupiedBy: 'Budi, Candra' },
    { id: 3, lantai: 'LT 2', jenisKamar: 'Single Bed', nomorKamar: '203', kapasitas: 1, status: 'INACTIVE', biayaAwal: '1500000', biayaTerbaru: '1600000', facilities: {}, gender: 'PEREMPUAN', occupiedBy: '' },
    { id: 4, lantai: 'LT 3', jenisKamar: 'Quadruple Bed', nomorKamar: '301', kapasitas: 4, status: 'ACTIVE', biayaAwal: '4000000', biayaTerbaru: '4200000', facilities: {}, gender: 'PRIA', occupiedBy: 'Eko, Feri, Gilang' },
    { id: 5, lantai: 'LT 3', jenisKamar: 'Single Bed', nomorKamar: '302', kapasitas: 1, status: 'MAINTENANCE', biayaAwal: '1500000', biayaTerbaru: '1600000', facilities: {}, gender: 'PRIA', occupiedBy: '' }
];

export const MOCK_TENANT_POD_DATA: TenantPodRecord[] = [
    { id: 1, lantai: 'LT 2', jenisKamar: 'Single Bed', nomorKamar: '201', namaPenghuni: 'Andi Saputra', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', jadwalLaundry: 'Senin', keterangan: 'OK', gender: 'Pria', facilities: {}, posisi: 'Technician', departemen: 'Service' },
    { id: 2, lantai: 'LT 2', jenisKamar: 'Double Bed', nomorKamar: '202', namaPenghuni: 'Budi Santoso', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Tidak Terpakai', jadwalLaundry: 'Selasa', keterangan: 'Bed A', gender: 'Pria', facilities: {}, posisi: 'Sales', departemen: 'Sales' },
    { id: 3, lantai: 'LT 2', jenisKamar: 'Double Bed', nomorKamar: '202', namaPenghuni: 'Candra Wijaya', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', jadwalLaundry: 'Rabu', keterangan: 'Bed B', gender: 'Pria', facilities: {}, posisi: 'Admin', departemen: 'Finance' },
    { id: 4, lantai: 'LT 3', jenisKamar: 'Quadruple Bed', nomorKamar: '301', namaPenghuni: 'Eko Patrio', statusLokerBarang: 'Belum Dapat', statusLokerPantry: 'Belum Dapat', jadwalLaundry: 'Kamis', keterangan: 'New Tenant', gender: 'Pria', facilities: {}, posisi: 'Intern', departemen: 'HR' },
    { id: 5, lantai: 'LT 3', jenisKamar: 'Quadruple Bed', nomorKamar: '301', namaPenghuni: 'Feri Irawan', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', jadwalLaundry: 'Jumat', keterangan: '-', gender: 'Pria', facilities: {}, posisi: 'Driver', departemen: 'GA' }
];

// --- STOCK OPNAME & LOGS ---
export const MOCK_STOCK_OPNAME_DATA: StockOpnameRecord[] = [
    { id: 1, opnameId: 'SO-ATK-001', date: '2023-11-30', itemName: 'Kertas A4', itemCode: 'ATK-P-001', category: 'ATK', systemQty: 50, physicalQty: 48, diff: -2, performedBy: 'Siti Aminah', status: 'DISCREPANCY', statusApproval: 'Pending' },
    { id: 2, opnameId: 'SO-ATK-001', date: '2023-11-30', itemName: 'Pulpen Hitam', itemCode: 'ATK-W-002', category: 'ATK', systemQty: 120, physicalQty: 120, diff: 0, performedBy: 'Siti Aminah', status: 'MATCHED', statusApproval: 'Approved' },
    { id: 3, opnameId: 'SO-ARK-002', date: '2023-12-01', itemName: 'Wipol', itemCode: 'ARK-C-001', category: 'ARK', systemQty: 15, physicalQty: 15, diff: 0, performedBy: 'Joko', status: 'MATCHED', statusApproval: 'Approved' },
    { id: 4, opnameId: 'SO-ARK-002', date: '2023-12-01', itemName: 'Gula Pasir', itemCode: 'ARK-P-002', category: 'ARK', systemQty: 20, physicalQty: 18, diff: -2, performedBy: 'Joko', status: 'DISCREPANCY', statusApproval: 'Rejected' },
    { id: 5, opnameId: 'SO-ATK-003', date: '2023-12-15', itemName: 'Bantex Ordner', itemCode: 'ATK-F-003', category: 'ATK', systemQty: 25, physicalQty: 26, diff: 1, performedBy: 'Siti Aminah', status: 'DISCREPANCY', statusApproval: 'Pending' }
];

export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [
    { id: 'LOG-001', tanggalKunjungan: '2024-03-20', jamDatang: '09:00', jamPulang: '11:30', lokasiModena: 'SATRIO', kategoriTamu: 'CUSTOMER', countAdult: 1, countChild: 0, countIndividual: 0, namaTamu: 'BUDI SANTOSO', email: 'budi@email.com', phone: '08123456789', note: 'Meeting' },
    { id: 'LOG-002', tanggalKunjungan: '2024-03-21', jamDatang: '10:15', jamPulang: '14:00', lokasiModena: 'KEMANG', kategoriTamu: 'VENDOR', countAdult: 2, countChild: 0, countIndividual: 0, namaTamu: 'PT MULTI TEKNIK', note: 'Maintenance AC' },
    { id: 'LOG-003', tanggalKunjungan: '2024-03-21', jamDatang: '13:00', jamPulang: '15:30', lokasiModena: 'SURYO', kategoriTamu: 'CUSTOMER', countAdult: 0, countChild: 2, countIndividual: 1, namaTamu: 'ANITA WIJAYA', note: 'Product Viewing' },
    { id: 'LOG-004', tanggalKunjungan: '2024-03-22', jamDatang: '08:45', jamPulang: '10:00', lokasiModena: 'SATRIO', kategoriTamu: 'INTERVIEWEE', countAdult: 1, countChild: 0, countIndividual: 0, namaTamu: 'REZA ADITYA', note: 'HR Interview' },
    { id: 'LOG-005', tanggalKunjungan: '2024-03-22', jamDatang: '11:20', jamPulang: '', lokasiModena: 'KEMANG', kategoriTamu: 'OTHERS', countAdult: 1, countChild: 0, countIndividual: 0, namaTamu: 'DEDI KURNIAWAN', note: 'Document Pickup' }
];

export const MOCK_USER_DATA: UserRecord[] = [
    { id: 'USR-001', name: 'Admin User', email: 'admin@modena.com', role: 'Admin', department: 'GA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Admin', phone: '08123456789', joinDate: '2020-01-01', employeeId: 'EMP-001', location: 'Jakarta' },
    { id: 'USR-002', name: 'Budi Manager', email: 'budi@modena.com', role: 'Manager', department: 'GA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Budi', phone: '08129876543', joinDate: '2019-05-15', employeeId: 'EMP-002', location: 'Jakarta' },
    { id: 'USR-003', name: 'Siti Staff', email: 'siti@modena.com', role: 'Staff', department: 'Finance', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Siti', phone: '08134567890', joinDate: '2021-08-10', employeeId: 'EMP-003', location: 'Bandung' },
    { id: 'USR-004', name: 'Andi Tech', email: 'andi@modena.com', role: 'Officer', department: 'IT', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Andi', phone: '08198765432', joinDate: '2022-02-20', employeeId: 'EMP-004', location: 'Surabaya' },
    { id: 'USR-005', name: 'Rina HR', email: 'rina@modena.com', role: 'Staff', department: 'HR', status: 'Inactive', avatar: 'https://ui-avatars.com/api/?name=Rina', phone: '08156789012', joinDate: '2021-11-01', employeeId: 'EMP-005', location: 'Jakarta' },
    // NEW USERS FOR TIMESHEET
    { id: 'USR-006', name: 'Ujang Security', email: 'ujang@modena.com', role: 'Security', department: 'GA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Ujang', phone: '0812000001', joinDate: '2023-01-01', employeeId: 'EMP-006', location: 'Jakarta' },
    { id: 'USR-007', name: 'Asep Cleaning', email: 'asep@modena.com', role: 'Cleaning', department: 'GA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Asep', phone: '0812000002', joinDate: '2023-01-15', employeeId: 'EMP-007', location: 'Jakarta' },
    { id: 'USR-008', name: 'Dodi Teknisi', email: 'dodi@modena.com', role: 'Teknisi', department: 'Engineering', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Dodi', phone: '0812000003', joinDate: '2022-06-01', employeeId: 'EMP-008', location: 'Jakarta' }
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [
    { id: 1, employee: { id: 'USR-006', name: 'Ujang Security', role: 'Security', department: 'GA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Ujang' }, date: '2023-12-01', shift: 'Pagi', status: 'Tepat Waktu', totalHours: 8, activities: [{id:'1', activityType: 'Patroli area', startTime: '08:00', endTime: '09:00', duration: 1, location: 'Lobby'}] },
    { id: 2, employee: { id: 'USR-007', name: 'Asep Cleaning', role: 'Cleaning', department: 'GA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Asep' }, date: '2023-12-01', shift: 'Pagi', status: 'Tepat Waktu', totalHours: 8, activities: [{id:'2', activityType: 'Penyapuan lantai', startTime: '07:00', endTime: '08:00', duration: 1, location: 'Lantai 1'}] },
    { id: 3, employee: { id: 'USR-008', name: 'Dodi Teknisi', role: 'Teknisi', department: 'Engineering', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Dodi' }, date: '2023-12-01', shift: 'Siang', status: 'Terlambat', totalHours: 7.5, activities: [{id:'3', activityType: 'Perbaikan AC', startTime: '13:00', endTime: '15:00', duration: 2, location: 'Ruang Meeting'}] },
    { id: 4, employee: { id: 'USR-006', name: 'Ujang Security', role: 'Security', department: 'GA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Ujang' }, date: '2023-12-02', shift: 'Pagi', status: 'Izin', totalHours: 0, activities: [] }
];

export const MOCK_VENDOR_DATA: VendorRecord[] = [
    { id: 1, vendorName: 'PT ATK Jaya', vendorCode: 'VEN-001', type: 'Goods', category: 'ATK', email: 'sales@atkjaya.com', phone: '021-555555', address: 'Jakarta', status: 'Active', picName: 'Pak Budi' },
    { id: 2, vendorName: 'CV Bersih Selalu', vendorCode: 'VEN-002', type: 'Service', category: 'Cleaning', email: 'info@bersih.com', phone: '021-666666', address: 'Bandung', status: 'Active', picName: 'Bu Ani' },
    { id: 3, vendorName: 'PT Technindo', vendorCode: 'VEN-003', type: 'Both', category: 'Maintenance', email: 'support@technindo.com', phone: '021-777777', address: 'Surabaya', status: 'Active', picName: 'Pak Dedi' },
    { id: 4, vendorName: 'Toko Bangunan Abadi', vendorCode: 'VEN-004', type: 'Goods', category: 'Material', email: 'sales@bangunanabadi.com', phone: '021-888888', address: 'Jakarta', status: 'Inactive', picName: 'Ko Aseng' },
    { id: 5, vendorName: 'Jasa Angkut Cepat', vendorCode: 'VEN-005', type: 'Service', category: 'Logistics', email: 'order@angkut.com', phone: '021-999999', address: 'Tangerang', status: 'Active', picName: 'Pak Joko' }
];

export const MOCK_MASTER_APPROVAL_DATA: MasterApprovalRecord[] = [
    { id: 'WFL-001', module: 'Stationery Request', branch: 'All Branches', tiers: [{ level: 1, type: 'Role', value: 'GA Admin', sla: 1 }, { level: 2, type: 'Role', value: 'GA Manager', sla: 2 }], updatedAt: '2023-10-01' },
    { id: 'WFL-002', module: 'Vehicle Request', branch: 'Jakarta', tiers: [{ level: 1, type: 'Role', value: 'Fleet Officer', sla: 2 }, { level: 2, type: 'Role', value: 'GA Manager', sla: 3 }], updatedAt: '2023-09-15' },
    { id: 'WFL-003', module: 'Building Maintenance', branch: 'All Branches', tiers: [{ level: 1, type: 'Role', value: 'Building Manager', sla: 2 }], updatedAt: '2023-11-01' },
    { id: 'WFL-004', module: 'Payment Request', branch: 'Surabaya', tiers: [{ level: 1, type: 'Role', value: 'Branch Manager', sla: 2 }, { level: 2, type: 'Role', value: 'Finance Manager', sla: 3 }], updatedAt: '2023-08-20' },
    { id: 'WFL-005', module: 'IT Asset Request', branch: 'All Branches', tiers: [{ level: 1, type: 'Role', value: 'IT Manager', sla: 2 }, { level: 2, type: 'Role', value: 'GA Manager', sla: 3 }], updatedAt: '2023-12-01' }
];

// --- GENERAL MASTER DATA MOCKS ---
export const MOCK_GENERAL_MASTER_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Direct Sales' }, { id: 2, name: 'E-Commerce' }, { id: 3, name: 'Project' }, { id: 4, name: 'Retail' }, { id: 5, name: 'B2B' }
];
export const MOCK_BRAND_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Toyota' }, { id: 2, name: 'Honda' }, { id: 3, name: 'Daihatsu' }, { id: 4, name: 'Mitsubishi' }, { id: 5, name: 'Suzuki' }];
export const MOCK_COLOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Hitam' }, { id: 2, name: 'Putih' }, { id: 3, name: 'Silver' }, { id: 4, name: 'Abu-abu' }, { id: 5, name: 'Merah' }];
export const MOCK_BUILDING_ASSETS: BuildingAssetRecord[] = [
    { id: 'BA-001', assetName: 'AC Split 1PK', assetCode: 'AC-001', assetType: 'AC', buildingName: 'MODENA Head Office', floor: 'Lantai 1', roomName: 'Lobby', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Quarterly', ownership: 'Own' },
    { id: 'BA-002', assetName: 'Genset 500KVA', assetCode: 'GEN-001', assetType: 'Genset', buildingName: 'MODENA Warehouse Cikupa', floor: 'Outdoor', roomName: 'Power House', status: 'Fair', approvalStatus: 'Approved', maintenanceFrequency: 'Monthly', ownership: 'Own' },
    { id: 'BA-003', assetName: 'CCTV Dome', assetCode: 'CCTV-001', assetType: 'CCTV', buildingName: 'MODENA Head Office', floor: 'Lantai 2', roomName: 'Corridor', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Yearly', ownership: 'Own' },
    { id: 'BA-004', assetName: 'Pompa Air', assetCode: 'PUMP-001', assetType: 'Pump', buildingName: 'MODENA Branch Bandung', floor: 'Basement', roomName: 'Pump Room', status: 'Critical', approvalStatus: 'Pending Approval', maintenanceFrequency: 'Monthly', ownership: 'Own' },
    { id: 'BA-005', assetName: 'APAR 3KG', assetCode: 'APAR-001', assetType: 'Safety', buildingName: 'MODENA Branch Surabaya', floor: 'Lantai 1', roomName: 'Reception', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Yearly', ownership: 'Own' }
];

export const MOCK_PPN_DATA: GeneralMasterItem[] = [{ id: 1, name: '11%' }, { id: 2, name: '0%' }];
export const MOCK_BRAND_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Kendaraan' }, { id: 2, name: 'Elektronik' }];
export const MOCK_VEHICLE_MODEL_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Avanza' }, { id: 2, name: 'Innova' }, { id: 3, name: 'Gran Max' }, { id: 4, name: 'Xpander' }, { id: 5, name: 'Hilux' }];
export const MOCK_BUILDING_COMPONENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Atap' }, { id: 2, name: 'Dinding' }, { id: 3, name: 'Lantai' }, { id: 4, name: 'Pintu' }, { id: 5, name: 'Jendela' }];
export const MOCK_DOC_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Legal' }, { id: 2, name: 'Finance' }, { id: 3, name: 'Technical' }];
export const MOCK_UTILITY_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Listrik' }, { id: 2, name: 'Air' }, { id: 3, name: 'Internet' }, { id: 4, name: 'Telepon' }, { id: 5, name: 'Gas' }];
export const MOCK_OPERATOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Telkomsel' }, { id: 2, name: 'Indosat' }, { id: 3, name: 'XL' }];
export const MOCK_ASSET_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Furniture' }, { id: 3, name: 'Vehicle' }, { id: 4, name: 'Electronic' }, { id: 5, name: 'Machinery' }];
export const MOCK_DEPARTMENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'HR' }, { id: 2, name: 'IT' }, { id: 3, name: 'Finance' }, { id: 4, name: 'GA' }, { id: 5, name: 'Sales' }];
export const MOCK_LOCATION_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Jakarta' }, { id: 2, name: 'Surabaya' }, { id: 3, name: 'Bandung' }, { id: 4, name: 'Medan' }, { id: 5, name: 'Makassar' }];
export const MOCK_UOM_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pcs' }, { id: 2, name: 'Rim' }, { id: 3, name: 'Unit' }, { id: 4, name: 'Box' }, { id: 5, name: 'Kg' }];
export const MOCK_BUILDING_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Office' }, { id: 2, name: 'Warehouse' }, { id: 3, name: 'Showroom' }, { id: 4, name: 'Factory' }, { id: 5, name: 'Dormitory' }];
export const MOCK_COST_CENTER_DATA: GeneralMasterItem[] = [{ id: 1, name: 'CC-001' }, { id: 2, name: 'CC-002' }, { id: 3, name: 'CC-003' }];
export const MOCK_ASSET_CATEGORY_DATA: GeneralMasterItem[] = [{ id: 1, name: 'IT Equipment' }, { id: 2, name: 'Furniture' }, { id: 3, name: 'Vehicle' }, { id: 4, name: 'Building' }, { id: 5, name: 'Machinery' }];
export const MOCK_TAX_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pajak STNK' }, { id: 2, name: 'PBB' }];
export const MOCK_PAYMENT_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Transfer' }, { id: 2, name: 'Cash' }, { id: 3, name: 'Credit Card' }];
export const MOCK_SERVICE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Servis Rutin' }, { id: 2, name: 'Perbaikan' }, { id: 3, name: 'Ganti Sparepart' }];
export const MOCK_MUTATION_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pending' }, { id: 2, name: 'Approved' }, { id: 3, name: 'Rejected' }, { id: 4, name: 'Completed' }];
export const MOCK_SALES_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Open Bid' }, { id: 2, name: 'Sold' }, { id: 3, name: 'Scrap' }, { id: 4, name: 'Cancelled' }];
export const MOCK_REQUEST_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pending' }, { id: 2, name: 'Approved' }, { id: 3, name: 'Rejected' }, { id: 4, name: 'Completed' }];
export const MOCK_MUTATION_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Permanent' }, { id: 2, name: 'Temporary' }];
export const MOCK_VENDOR_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Goods' }, { id: 2, name: 'Service' }, { id: 3, name: 'Both' }];
export const MOCK_ROLE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Admin' }, { id: 2, name: 'Staff' }, { id: 3, name: 'Manager' }, { id: 4, name: 'Officer' }, { id: 5, name: 'Director' }];
export const MOCK_VEHICLE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'MPV' }, { id: 2, name: 'SUV' }, { id: 3, name: 'Sedan' }, { id: 4, name: 'Pickup' }, { id: 5, name: 'Truck' }];
export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Kertas' }, { id: 2, name: 'Tulis' }, { id: 3, name: 'File' }, { id: 4, name: 'Elektronik' }, { id: 5, name: 'Perekat' }];
export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Cleaning' }, { id: 2, name: 'Pantry' }, { id: 3, name: 'Umum' }, { id: 4, name: 'Safety' }, { id: 5, name: 'Medical' }];
export const MOCK_LOGBOOK_CATEGORY: GeneralMasterItem[] = [
    { id: 1, name: 'Visitor' }, { id: 2, name: 'Supplier' }, { id: 3, name: 'Contractor' }, { id: 4, name: 'Interviewee' }, { id: 5, name: 'Others' }
];
export const MOCK_LOGBOOK_PURPOSE: GeneralMasterItem[] = [
    { id: 1, name: 'Meeting' }, { id: 2, name: 'Delivery' }, { id: 3, name: 'Maintenance' }, { id: 4, name: 'Interview' }, { id: 5, name: 'Personal' }
];
