
import { 
    AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, 
    DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, 
    VehicleContractRecord, GeneralMasterItem, UserRecord, BuildingAssetRecord, 
    BuildingMaintenanceRecord, UtilityRecord, GeneralAssetRecord, VendorRecord, 
    TimesheetRecord, ServiceRecord, MutationRecord, SalesRecord, InsuranceRecord, 
    MaintenanceScheduleRecord, VehicleReminderRecord, LockerRecord, 
    StockOpnameRecord, LockerRequestRecord, PodRequestRecord, MasterPodRecord, 
    MasterLockerRecord, InsuranceProviderRecord, TenantPodRecord, MasterApprovalRecord
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

// --- ATK & ARK MODULES ---

export const MOCK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ATK/24/001', employee: { name: 'Andi Saputra', role: 'Staff Sales', avatar: 'https://ui-avatars.com/api/?name=Andi+Saputra&background=random' }, category: 'ATK', itemName: 'Ballpoint Pilot Black', qty: 12, date: '2024-03-20', status: 'Approved', remainingStock: 50, itemCode: 'ATK-001', uom: 'Pcs' },
    { id: 2, transactionNumber: 'TRX/ATK/24/002', employee: { name: 'Siti Aminah', role: 'Manager HR', avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=random' }, category: 'ATK', itemName: 'Kertas A4 70gr', qty: 5, date: '2024-03-21', status: 'Pending', remainingStock: 20, itemCode: 'ATK-002', uom: 'Rim' },
    { id: 3, transactionNumber: 'TRX/ATK/24/003', employee: { name: 'Budi Santoso', role: 'Staff Finance', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random' }, category: 'ATK', itemName: 'Binder Clip No. 260', qty: 2, date: '2024-03-22', status: 'Rejected', remainingStock: 100, itemCode: 'ATK-003', uom: 'Box' },
    { id: 4, transactionNumber: 'TRX/ATK/24/004', employee: { name: 'Rina Marlina', role: 'Marketing', avatar: 'https://ui-avatars.com/api/?name=Rina+Marlina&background=random' }, category: 'ATK', itemName: 'Spidol Boardmarker Hitam', qty: 3, date: '2024-03-24', status: 'Approved', remainingStock: 40, itemCode: 'ATK-004', uom: 'Pcs' },
    { id: 5, transactionNumber: 'TRX/ATK/24/005', employee: { name: 'Doni Pratama', role: 'IT Support', avatar: 'https://ui-avatars.com/api/?name=Doni+Pratama&background=random' }, category: 'ATK', itemName: 'Baterai AA Alkaline', qty: 4, date: '2024-03-25', status: 'Pending', remainingStock: 15, itemCode: 'ATK-005', uom: 'Pack' },
];

export const MOCK_MASTER_DATA: MasterItem[] = [
    { id: 1, itemCode: 'ATK-001', category: 'Writing', itemName: 'Ballpoint Pilot Black', uom: 'Pcs', remainingStock: 100, minimumStock: 20, maximumStock: 500, requestedStock: 12, lastPurchasePrice: '5000', averagePrice: '4800' },
    { id: 2, itemCode: 'ATK-002', category: 'Paper', itemName: 'Kertas A4 70gr', uom: 'Rim', remainingStock: 15, minimumStock: 20, maximumStock: 100, requestedStock: 5, lastPurchasePrice: '45000', averagePrice: '44000' },
    { id: 3, itemCode: 'ATK-003', category: 'Organizer', itemName: 'Binder Clip No. 260', uom: 'Box', remainingStock: 50, minimumStock: 10, maximumStock: 100, requestedStock: 0, lastPurchasePrice: '12000', averagePrice: '11500' },
    { id: 4, itemCode: 'ATK-004', category: 'Writing', itemName: 'Spidol Boardmarker Hitam', uom: 'Pcs', remainingStock: 80, minimumStock: 15, maximumStock: 200, requestedStock: 3, lastPurchasePrice: '8000', averagePrice: '7800' },
    { id: 5, itemCode: 'ATK-005', category: 'Electronics', itemName: 'Baterai AA Alkaline', uom: 'Pack', remainingStock: 10, minimumStock: 5, maximumStock: 50, requestedStock: 4, lastPurchasePrice: '25000', averagePrice: '24500' },
];

export const MOCK_ARK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ARK/24/001', employee: { name: 'Cleaner A', role: 'Cleaning Service', avatar: 'https://ui-avatars.com/api/?name=Cleaner+A&background=random' }, category: 'ARK', itemName: 'Pembersih Lantai (Galon)', qty: 2, date: '2024-03-22', status: 'Approved', remainingStock: 10, itemCode: 'ARK-001', uom: 'Galon' },
    { id: 2, transactionNumber: 'TRX/ARK/24/002', employee: { name: 'Receptionist', role: 'GA', avatar: 'https://ui-avatars.com/api/?name=Receptionist&background=random' }, category: 'ARK', itemName: 'Tissue Wajah', qty: 10, date: '2024-03-23', status: 'Pending', remainingStock: 50, itemCode: 'ARK-002', uom: 'Pack' },
    { id: 3, transactionNumber: 'TRX/ARK/24/003', employee: { name: 'Pantry Staff', role: 'OB', avatar: 'https://ui-avatars.com/api/?name=Pantry+Staff&background=random' }, category: 'ARK', itemName: 'Sabun Cuci Tangan', qty: 5, date: '2024-03-24', status: 'Approved', remainingStock: 20, itemCode: 'ARK-003', uom: 'Botol' },
    { id: 4, transactionNumber: 'TRX/ARK/24/004', employee: { name: 'Cleaner B', role: 'Cleaning Service', avatar: 'https://ui-avatars.com/api/?name=Cleaner+B&background=random' }, category: 'ARK', itemName: 'Kain Pel Microfiber', qty: 3, date: '2024-03-25', status: 'Rejected', remainingStock: 15, itemCode: 'ARK-004', uom: 'Pcs' },
    { id: 5, transactionNumber: 'TRX/ARK/24/005', employee: { name: 'Security A', role: 'Security', avatar: 'https://ui-avatars.com/api/?name=Security+A&background=random' }, category: 'ARK', itemName: 'Baterai Senter Besar', qty: 2, date: '2024-03-25', status: 'Pending', remainingStock: 8, itemCode: 'ARK-005', uom: 'Pcs' },
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
    { id: 1, itemCode: 'ARK-001', category: 'Cleaning', itemName: 'Pembersih Lantai (Galon)', uom: 'Galon', remainingStock: 8, minimumStock: 5, maximumStock: 20, requestedStock: 2, lastPurchasePrice: '120000', averagePrice: '118000' },
    { id: 2, itemCode: 'ARK-002', category: 'Pantry', itemName: 'Tissue Wajah', uom: 'Pack', remainingStock: 45, minimumStock: 20, maximumStock: 200, requestedStock: 10, lastPurchasePrice: '10000', averagePrice: '9500' },
    { id: 3, itemCode: 'ARK-003', category: 'Pantry', itemName: 'Sabun Cuci Tangan', uom: 'Botol', remainingStock: 12, minimumStock: 10, maximumStock: 50, requestedStock: 5, lastPurchasePrice: '25000', averagePrice: '24000' },
    { id: 4, itemCode: 'ARK-004', category: 'Cleaning', itemName: 'Kain Pel Microfiber', uom: 'Pcs', remainingStock: 15, minimumStock: 10, maximumStock: 50, requestedStock: 3, lastPurchasePrice: '35000', averagePrice: '34000' },
    { id: 5, itemCode: 'ARK-005', category: 'Safety', itemName: 'Baterai Senter Besar', uom: 'Pcs', remainingStock: 6, minimumStock: 5, maximumStock: 20, requestedStock: 2, lastPurchasePrice: '15000', averagePrice: '14500' },
];

// --- VEHICLE MODULES ---

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noPolisi: 'B 1234 ABC', nama: 'Toyota Avanza 1.3 G', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'G', tahunPembuatan: '2022', warna: 'Hitam', status: 'Aktif', ownership: 'Milik Modena', channel: 'HCO', cabang: 'Jakarta Head Office', approvalStatus: 'Approved', masaBerlaku1: '2024-08-01', masaBerlaku5: '2027-08-01' },
    { id: 2, noPolisi: 'B 5678 DEF', nama: 'Toyota Innova Reborn', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'V', tahunPembuatan: '2023', warna: 'Putih', status: 'Aktif', ownership: 'Sewa', channel: 'Sales', cabang: 'Surabaya Branch', approvalStatus: 'Approved', masaBerlaku1: '2024-12-15', masaBerlaku5: '2028-12-15' },
    { id: 3, noPolisi: 'B 9101 GHI', nama: 'Daihatsu Gran Max Box', merek: 'Daihatsu', tipeKendaraan: 'Commercial', model: '1.5', tahunPembuatan: '2021', warna: 'Silver', status: 'Service', ownership: 'Milik Modena', channel: 'Logistics', cabang: 'Warehouse Cikupa', approvalStatus: 'Approved', masaBerlaku1: '2024-05-10', masaBerlaku5: '2026-05-10', masaBerlakuKir: '2024-06-01' },
    { id: 4, noPolisi: 'B 2233 JKL', nama: 'Mitsubishi Xpander', merek: 'Mitsubishi', tipeKendaraan: 'MPV', model: 'Ultimate', tahunPembuatan: '2023', warna: 'Abu-abu', status: 'Aktif', ownership: 'Sewa', channel: 'Marketing', cabang: 'Bandung Branch', approvalStatus: 'Approved', masaBerlaku1: '2025-01-20', masaBerlaku5: '2028-01-20' },
    { id: 5, noPolisi: 'B 4455 MNO', nama: 'Toyota Hilux Single Cab', merek: 'Toyota', tipeKendaraan: 'Commercial', model: '2.4', tahunPembuatan: '2020', warna: 'Putih', status: 'In Use', ownership: 'Milik Modena', channel: 'Service Center', cabang: 'Medan Branch', approvalStatus: 'Approved', masaBerlaku1: '2024-09-15', masaBerlaku5: '2025-09-15', masaBerlakuKir: '2024-10-01' },
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    { id: 'CTR-001', noKontrak: 'KTR/RENT/24/001', noPolisi: 'B 5678 DEF', aset: 'Toyota Innova Reborn', vendor: 'PT TRAC Astra', tglMulai: '2024-01-01', tglBerakhir: '2025-01-01', biayaSewa: '6500000', status: 'Active', approvalStatus: 'Approved', channel: 'Sales', cabang: 'Surabaya Branch', ownership: 'Sewa' },
    { id: 'CTR-002', noKontrak: 'KTR/RENT/24/002', noPolisi: 'B 2233 JKL', aset: 'Mitsubishi Xpander', vendor: 'MPMRent', tglMulai: '2024-02-01', tglBerakhir: '2026-02-01', biayaSewa: '5800000', status: 'Active', approvalStatus: 'Approved', channel: 'Marketing', cabang: 'Bandung Branch', ownership: 'Sewa' },
    { id: 'CTR-003', noKontrak: 'KTR/RENT/23/055', noPolisi: 'B 8899 XYZ', aset: 'Honda City', vendor: 'Adi Sarana', tglMulai: '2023-06-01', tglBerakhir: '2024-06-01', biayaSewa: '7000000', status: 'Expiring Soon', approvalStatus: 'Approved', channel: 'Management', cabang: 'Jakarta HO', ownership: 'Sewa' },
    { id: 'CTR-004', noKontrak: 'KTR/RENT/24/010', noPolisi: 'B 7777 ABC', aset: 'Toyota Fortuner', vendor: 'PT TRAC Astra', tglMulai: '2024-03-01', tglBerakhir: '2025-03-01', biayaSewa: '12000000', status: 'Pending', approvalStatus: 'Pending', channel: 'Director', cabang: 'Jakarta HO', ownership: 'Sewa' },
    { id: 'CTR-005', noKontrak: 'KTR/RENT/22/001', noPolisi: 'D 1234 GGG', aset: 'Daihatsu Luxio', vendor: 'Local Rent', tglMulai: '2022-01-01', tglBerakhir: '2023-12-31', biayaSewa: '4500000', status: 'Expired', approvalStatus: 'Approved', channel: 'Ops', cabang: 'Bandung Branch', ownership: 'Sewa' },
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    { id: 'SRV-24-001', noPolisi: 'B 1234 ABC', aset: 'Toyota Avanza 1.3 G', tglRequest: '2024-03-10', status: 'Completed', statusApproval: 'Approved', jenisServis: 'Servis Rutin', estimasiBiaya: '1500000', cost: '1450000', vendor: 'Auto2000', kmKendaraan: '25000', masalah: 'Ganti Oli, Cek Rem' },
    { id: 'SRV-24-002', noPolisi: 'B 9101 GHI', aset: 'Daihatsu Gran Max Box', tglRequest: '2024-03-24', status: 'In Progress', statusApproval: 'Approved', jenisServis: 'Perbaikan', estimasiBiaya: '3000000', cost: '0', vendor: 'Bengkel Resmi Daihatsu', kmKendaraan: '45000', masalah: 'Kopling slip, AC tidak dingin' },
    { id: 'SRV-24-003', noPolisi: 'B 5678 DEF', aset: 'Toyota Innova Reborn', tglRequest: '2024-03-25', status: 'Scheduled', statusApproval: 'Pending', jenisServis: 'Servis Rutin', estimasiBiaya: '2000000', cost: '0', vendor: 'Shop & Drive', kmKendaraan: '15000', masalah: 'Servis Berkala 15K' },
    { id: 'SRV-24-004', noPolisi: 'B 4455 MNO', aset: 'Toyota Hilux', tglRequest: '2024-03-20', status: 'Completed', statusApproval: 'Approved', jenisServis: 'Ganti Ban', estimasiBiaya: '4000000', cost: '3800000', vendor: 'Bridgestone Toko Model', kmKendaraan: '60000', masalah: 'Ban tipis 4pcs' },
    { id: 'SRV-24-005', noPolisi: 'B 2233 JKL', aset: 'Mitsubishi Xpander', tglRequest: '2024-03-26', status: 'Draft', statusApproval: 'Pending', jenisServis: 'Perbaikan Body', estimasiBiaya: '1500000', cost: '0', vendor: 'Ketok Magic', kmKendaraan: '22000', masalah: 'Baret bumper depan' },
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    { id: 'TAX-24-001', noPolisi: 'B 9101 GHI', aset: 'Daihatsu Gran Max Box', tglRequest: '2024-03-01', jenis: 'KIR', status: 'Proses', statusApproval: 'Approved', channel: 'Logistics', cabang: 'Warehouse Cikupa', jatuhTempo: '2024-06-01', estimasiBiaya: '500000' },
    { id: 'TAX-24-002', noPolisi: 'B 1234 ABC', aset: 'Toyota Avanza 1.3 G', tglRequest: '2024-03-15', jenis: 'Pajak STNK', status: 'Pending', statusApproval: 'Pending', channel: 'HCO', cabang: 'Jakarta HO', jatuhTempo: '2024-08-01', estimasiBiaya: '3500000' },
    { id: 'TAX-24-003', noPolisi: 'B 4455 MNO', aset: 'Toyota Hilux', tglRequest: '2024-03-20', jenis: 'KIR', status: 'Completed', statusApproval: 'Approved', channel: 'Service', cabang: 'Medan Branch', jatuhTempo: '2024-10-01', estimasiBiaya: '600000' },
    { id: 'TAX-24-004', noPolisi: 'B 5678 DEF', aset: 'Toyota Innova', tglRequest: '2024-03-25', jenis: 'Pajak STNK', status: 'Proses', statusApproval: 'Approved', channel: 'Sales', cabang: 'Surabaya Branch', jatuhTempo: '2024-05-01', estimasiBiaya: '4500000' },
    { id: 'TAX-24-005', noPolisi: 'B 2233 JKL', aset: 'Mitsubishi Xpander', tglRequest: '2024-02-28', jenis: 'Pajak STNK', status: 'Completed', statusApproval: 'Approved', channel: 'Marketing', cabang: 'Bandung Branch', jatuhTempo: '2024-03-15', estimasiBiaya: '4000000' },
];

export const MOCK_VEHICLE_REMINDER_DATA: VehicleReminderRecord[] = [
    { id: 'REM-V-001', noPolisi: 'B 9101 GHI', vehicleName: 'Daihatsu Gran Max Box', type: 'KIR', expiryDate: '2024-04-15', status: 'Critical', branch: 'Warehouse Cikupa' },
    { id: 'REM-V-002', noPolisi: 'B 1234 ABC', vehicleName: 'Toyota Avanza 1.3 G', type: 'STNK 1 Tahunan', expiryDate: '2024-08-01', status: 'Safe', branch: 'Jakarta HO' },
    { id: 'REM-V-003', noPolisi: 'B 5678 DEF', vehicleName: 'Toyota Innova Reborn', type: 'STNK 5 Tahunan', expiryDate: '2024-05-20', status: 'Warning', branch: 'Surabaya Branch' },
    { id: 'REM-V-004', noPolisi: 'B 4455 MNO', vehicleName: 'Toyota Hilux', type: 'KIR', expiryDate: '2024-03-30', status: 'Expired', branch: 'Medan Branch' },
    { id: 'REM-V-005', noPolisi: 'B 2233 JKL', vehicleName: 'Mitsubishi Xpander', type: 'Asuransi', expiryDate: '2024-06-15', status: 'Safe', branch: 'Bandung Branch' },
];

export const MOCK_MUTATION_DATA: MutationRecord[] = [
    { id: 'MUT-24-001', noPolisi: 'B 1234 ABC', cabangAset: 'Jakarta HO', tipeMutasi: 'Permanent', tglPermintaan: '2024-03-20', lokasiAsal: 'Jakarta HO', lokasiTujuan: 'Bandung Branch', status: 'Pending', statusApproval: 'Pending', assetType: 'VEHICLE', picBefore: 'Ahmad', picAfter: 'Budi' },
    { id: 'MUT-24-002', assetNumber: 'GA-IT-005', assetName: 'Laptop Dell Latitude', cabangAset: 'Jakarta HO', tipeMutasi: 'Temporary', tglPermintaan: '2024-03-18', lokasiAsal: 'IT Room HO', lokasiTujuan: 'Event PRJ', status: 'Approved', statusApproval: 'Approved', assetType: 'GENERAL_ASSET', picBefore: 'IT Staff', picAfter: 'Event Coordinator' },
    { id: 'MUT-24-003', noPolisi: 'B 9101 GHI', cabangAset: 'Warehouse Cikupa', tipeMutasi: 'Permanent', tglPermintaan: '2024-03-22', lokasiAsal: 'Warehouse Cikupa', lokasiTujuan: 'Surabaya Branch', status: 'Approved', statusApproval: 'Approved', assetType: 'VEHICLE', picBefore: 'Driver A', picAfter: 'Driver B' },
    { id: 'MUT-24-004', assetNumber: 'GA-HC-010', assetName: 'Kursi Kerja Ergonomis', cabangAset: 'MHC Suryopranoto', tipeMutasi: 'Permanent', tglPermintaan: '2024-03-25', lokasiAsal: 'MHC Suryopranoto', lokasiTujuan: 'Jakarta HO', status: 'Pending', statusApproval: 'Pending', assetType: 'GENERAL_ASSET', picBefore: 'Store Mgr', picAfter: 'GA Admin' },
    { id: 'MUT-24-005', noPolisi: 'B 4455 MNO', cabangAset: 'Medan Branch', tipeMutasi: 'Temporary', tglPermintaan: '2024-03-26', lokasiAsal: 'Medan Branch', lokasiTujuan: 'Project Site Aceh', status: 'Draft', statusApproval: 'Pending', assetType: 'VEHICLE', picBefore: 'Site Mgr', picAfter: 'Project Mgr' },
];

export const MOCK_SALES_DATA: SalesRecord[] = [
    { id: 'SALE-24-001', noPolisi: 'B 9999 XYZ', assetName: 'Toyota Camry 2015', tglRequest: '2024-02-01', channel: 'Management', cabang: 'Jakarta HO', hargaTertinggi: '180000000', hargaPembuka: '150000000', status: 'Open Bidding', statusApproval: 'Approved', assetType: 'VEHICLE', bids: [
        { id: 'BID-1', amount: '180000000', bidderName: 'Budi Santoso', bidderRole: 'External', bidderEmail: 'budi@gmail.com', bidderPhone: '0811...', bidderKtp: '317...', bidderAvatar: '', timestamp: '2024-03-10 10:00' },
        { id: 'BID-2', amount: '165000000', bidderName: 'Karyawan A', bidderRole: 'Internal', bidderEmail: 'emp@modena.com', bidderPhone: '0812...', bidderKtp: '317...', bidderAvatar: '', timestamp: '2024-03-09 14:00' }
    ] },
    { id: 'SALE-24-002', assetNumber: 'GA-IT-OLD-01', assetName: 'Old Server Rack 2010', tglRequest: '2024-03-15', channel: 'IT', cabang: 'Jakarta HO', hargaTertinggi: '5000000', hargaPembuka: '2000000', status: 'Sold', statusApproval: 'Approved', assetType: 'GENERAL_ASSET', bids: [] },
    { id: 'SALE-24-003', noPolisi: 'B 1111 OLD', assetName: 'Daihatsu Gran Max 2012', tglRequest: '2024-03-20', channel: 'Logistics', cabang: 'Warehouse Cikupa', hargaTertinggi: '0', hargaPembuka: '45000000', status: 'Open Bidding', statusApproval: 'Approved', assetType: 'VEHICLE', bids: [] },
    { id: 'SALE-24-004', assetNumber: 'GA-FF-005', assetName: 'Sofa Lobby Rusak', tglRequest: '2024-03-22', channel: 'GA', cabang: 'MHC Suryopranoto', hargaTertinggi: '0', hargaPembuka: '500000', status: 'Scrap', statusApproval: 'Pending', assetType: 'GENERAL_ASSET', bids: [] },
    { id: 'SALE-24-005', noPolisi: 'B 2222 EXP', assetName: 'Honda CRV 2016', tglRequest: '2024-03-25', channel: 'Management', cabang: 'Jakarta HO', hargaTertinggi: '0', hargaPembuka: '200000000', status: 'Draft', statusApproval: 'Pending', assetType: 'VEHICLE', bids: [] },
];

// --- BUILDING & ASSET MODULES ---

export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    { id: 'BLD-001', name: 'MODENA Head Office', assetNo: 'BLD-HO-JKT', type: 'Office', ownership: 'Rent', location: 'Jakarta Selatan', address: 'Jl. Prof. Dr. Satrio C4 No. 13', status: 'Active', startDate: '2020-01-01', endDate: '2025-01-01', rentCost: '2500000000' },
    { id: 'BLD-002', name: 'MODENA Cikupa Warehouse', assetNo: 'BLD-WH-CKP', type: 'Warehouse', ownership: 'Own', location: 'Tangerang', address: 'Kawasan Industri Cikupa Mas', status: 'Active', startDate: '2015-01-01' },
    { id: 'BLD-003', name: 'MHC Suryopranoto', assetNo: 'BLD-MHC-SRY', type: 'Store', ownership: 'Rent', location: 'Jakarta Pusat', address: 'Jl. Suryopranoto No. 25', status: 'Expiring Soon', startDate: '2022-06-01', endDate: '2024-06-01', rentCost: '450000000' },
    { id: 'BLD-004', name: 'MHC Kelapa Gading', assetNo: 'BLD-MHC-KGD', type: 'Store', ownership: 'Rent', location: 'Jakarta Utara', address: 'Jl. Boulevard Raya', status: 'Active', startDate: '2023-01-01', endDate: '2026-01-01', rentCost: '550000000' },
    { id: 'BLD-005', name: 'Bandung Branch Office', assetNo: 'BLD-BR-BDG', type: 'Office', ownership: 'Own', location: 'Bandung', address: 'Jl. Soekarno Hatta', status: 'Active', startDate: '2018-01-01' },
];

export const MOCK_UTILITY_DATA: UtilityRecord[] = [
    { id: 'UTL-24-001', period: 'Maret 2024', date: '2024-03-25', type: 'Listrik (PLN)', location: 'MODENA Head Office', meterStart: 12500, meterEnd: 13200, usage: 700, unit: 'kWh', cost: '1250000', status: 'Unpaid' },
    { id: 'UTL-24-002', period: 'Februari 2024', date: '2024-02-25', type: 'Air (PDAM)', location: 'MODENA Head Office', meterStart: 500, meterEnd: 550, usage: 50, unit: 'm3', cost: '350000', status: 'Paid' },
    { id: 'UTL-24-003', period: 'Maret 2024', date: '2024-03-25', type: 'Internet', location: 'MHC Suryopranoto', meterStart: 0, meterEnd: 0, usage: 0, unit: 'Mbps', cost: '850000', status: 'Pending' },
    { id: 'UTL-24-004', period: 'Maret 2024', date: '2024-03-25', type: 'Listrik (PLN)', location: 'Warehouse Cikupa', meterStart: 50000, meterEnd: 52000, usage: 2000, unit: 'kWh', cost: '3500000', status: 'Paid' },
    { id: 'UTL-24-005', period: 'Maret 2024', date: '2024-03-26', type: 'Gas', location: 'MHC Kelapa Gading', meterStart: 100, meterEnd: 150, usage: 50, unit: 'L', cost: '500000', status: 'Pending Review' },
];

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    { id: 'DOC-001', category: 'Lease', documentName: 'Perpanjangan Sewa Gedung', buildingName: 'MHC Suryopranoto', assetNo: 'BLD-MHC-SRY', expiryDate: '2024-06-01', status: 'Warning', daysRemaining: 68, source: 'System' },
    { id: 'DOC-002', category: 'Permit', documentName: 'Izin Domisili Perusahaan', buildingName: 'MODENA Head Office', assetNo: 'BLD-HO-JKT', expiryDate: '2024-12-31', status: 'Safe', daysRemaining: 270, source: 'Manual' },
    { id: 'DOC-003', category: 'Tax', documentName: 'PBB 2024', buildingName: 'Warehouse Cikupa', assetNo: 'BLD-WH-CKP', expiryDate: '2024-09-30', status: 'Safe', daysRemaining: 180, source: 'System' },
    { id: 'DOC-004', category: 'Insurance', documentName: 'Property All Risk Policy', buildingName: 'Bandung Branch', assetNo: 'BLD-BR-BDG', expiryDate: '2024-04-15', status: 'Urgent', daysRemaining: 20, source: 'System' },
    { id: 'DOC-005', category: 'Permit', documentName: 'Reklame Signage', buildingName: 'MHC Kelapa Gading', assetNo: 'BLD-MHC-KGD', expiryDate: '2024-05-10', status: 'Warning', daysRemaining: 45, source: 'Manual' },
];

export const MOCK_BUILDING_MAINTENANCE_DATA: BuildingMaintenanceRecord[] = [
    { id: 'MNT-24-001', assetId: 'AST-AC-001', assetName: 'AC Central Lt. 1', buildingLocation: 'Head Office - Lt 1', requestDate: '2024-03-20', maintenanceType: 'Corrective', cost: '2500000', status: 'In Progress', approvalStatus: 'Approved', description: 'AC Bocor dan tidak dingin', vendor: 'PT Pendingin Sejahtera' },
    { id: 'MNT-24-002', assetId: 'AST-GEN-001', assetName: 'Genset Utama', buildingLocation: 'Warehouse Cikupa', requestDate: '2024-03-10', maintenanceType: 'Preventive', cost: '1500000', status: 'Completed', approvalStatus: 'Approved', description: 'Service Berkala Genset', vendor: 'Mitra Teknik' },
    { id: 'MNT-24-003', assetId: 'AST-LIFT-001', assetName: 'Lift Penumpang 1', buildingLocation: 'Head Office', requestDate: '2024-03-25', maintenanceType: 'Preventive', cost: '3000000', status: 'Scheduled', approvalStatus: 'Approved', description: 'Monthly Maintenance', vendor: 'Schindler' },
    { id: 'MNT-24-004', assetId: 'AST-PLMB-002', assetName: 'Pompa Air Utama', buildingLocation: 'MHC Suryopranoto', requestDate: '2024-03-24', maintenanceType: 'Emergency', cost: '500000', status: 'Completed', approvalStatus: 'Approved', description: 'Pompa mati total', vendor: 'Tukang Lokal' },
    { id: 'MNT-24-005', assetId: 'AST-AC-005', assetName: 'AC Split Ruang Meeting', buildingLocation: 'Bandung Branch', requestDate: '2024-03-26', maintenanceType: 'Corrective', cost: '0', status: 'Scheduled', approvalStatus: 'Pending Approval', description: 'Bunyi berisik', vendor: 'CV Sejuk' },
];

export const MOCK_GENERAL_ASSET_DATA: GeneralAssetRecord[] = [
    { id: 'GA-001', assetNumber: 'GA-IT-001', assetCategory: 'IT', type: 'Laptop', ownership: 'Own', assetLocation: 'Head Office', subLocation: 'IT Dept', department: 'IT', approvalStatus: 'Approved', status: 'Good', assetName: 'MacBook Pro M1', purchaseDate: '2022-01-15', purchasePrice: '20000000' },
    { id: 'GA-002', assetNumber: 'GA-HC-005', assetCategory: 'HC', type: 'Furniture', ownership: 'Own', assetLocation: 'Head Office', subLocation: 'Meeting Room A', department: 'GA', approvalStatus: 'Approved', status: 'Good', assetName: 'Meja Meeting Oval', purchaseDate: '2021-06-10', purchasePrice: '5000000' },
    { id: 'GA-003', assetNumber: 'GA-CS-010', assetCategory: 'Customer Service', type: 'Phone System', ownership: 'Rent', assetLocation: 'MHC Suryopranoto', subLocation: 'CS Desk', department: 'CS', approvalStatus: 'Approved', status: 'Fair', assetName: 'PABX System', purchaseDate: '2023-01-01', purchasePrice: '0' },
    { id: 'GA-004', assetNumber: 'GA-IT-002', assetCategory: 'IT', type: 'Server', ownership: 'Own', assetLocation: 'Warehouse Cikupa', subLocation: 'Server Room', department: 'IT', approvalStatus: 'Approved', status: 'Good', assetName: 'Dell PowerEdge', purchaseDate: '2020-05-20', purchasePrice: '45000000' },
    { id: 'GA-005', assetNumber: 'GA-HC-015', assetCategory: 'HC', type: 'Electronics', ownership: 'Own', assetLocation: 'Bandung Branch', subLocation: 'Lobby', department: 'GA', approvalStatus: 'Approved', status: 'Good', assetName: 'Smart TV 50 Inch', purchaseDate: '2022-12-10', purchasePrice: '6000000' },
];

export const MOCK_ASSET_MAINTENANCE_DATA: MaintenanceScheduleRecord[] = [
    { id: 'SCH-001', assetId: 'GA-001', assetName: 'MacBook Pro M1', assetCode: 'GA-IT-001', location: 'Head Office', category: 'IT', frequency: 'Yearly', lastMaintenanceDate: '2023-01-15', nextMaintenanceDate: '2024-01-15', status: 'Overdue' },
    { id: 'SCH-002', assetId: 'AST-AC-001', assetName: 'AC Central Lt. 1', assetCode: 'AC-HO-01', location: 'Head Office', category: 'Building', frequency: 'Quarterly', lastMaintenanceDate: '2023-12-20', nextMaintenanceDate: '2024-03-20', status: 'Warning' },
    { id: 'SCH-003', assetId: 'AST-GEN-001', assetName: 'Genset Utama', assetCode: 'GEN-CKP-01', location: 'Warehouse Cikupa', category: 'Building', frequency: 'Monthly', lastMaintenanceDate: '2024-02-25', nextMaintenanceDate: '2024-03-25', status: 'Warning' },
    { id: 'SCH-004', assetId: 'GA-004', assetName: 'Dell PowerEdge', assetCode: 'GA-IT-002', location: 'Warehouse Cikupa', category: 'IT', frequency: 'Quarterly', lastMaintenanceDate: '2024-01-10', nextMaintenanceDate: '2024-04-10', status: 'Safe' },
    { id: 'SCH-005', assetId: 'AST-LIFT-001', assetName: 'Lift Penumpang', assetCode: 'LIFT-HO-01', location: 'Head Office', category: 'Building', frequency: 'Monthly', lastMaintenanceDate: '2024-02-28', nextMaintenanceDate: '2024-03-28', status: 'Safe' },
];

// --- INSURANCE MODULE ---

export const MOCK_INSURANCE_DATA: InsuranceRecord[] = [
    { id: 'INS-001', policyNumber: 'POL-VH-001', provider: 'AXA Mandiri', type: 'All Risk', category: 'Vehicle', startDate: '2024-01-01', endDate: '2025-01-01', premium: '5000000', sumInsured: '250000000', status: 'Active', assetName: 'Toyota Avanza 1.3 G', assets: [{ id: '1', name: 'Toyota Avanza 1.3 G', type: 'Vehicle', identifier: 'B 1234 ABC' }] },
    { id: 'INS-002', policyNumber: 'POL-BD-002', provider: 'Allianz', type: 'Property All Risk', category: 'Building', startDate: '2023-06-01', endDate: '2024-06-01', premium: '15000000', sumInsured: '5000000000', status: 'Expiring', assetName: 'MHC Suryopranoto', assets: [{ id: 'BLD-003', name: 'MHC Suryopranoto', type: 'Building', identifier: 'BLD-MHC-SRY' }] },
    { id: 'INS-003', policyNumber: 'POL-FLT-003', provider: 'Zurich', type: 'Fleet Policy', category: 'Vehicle', startDate: '2024-02-01', endDate: '2025-02-01', premium: '25000000', sumInsured: '1000000000', status: 'Active', assetName: 'Truck Fleet Cikupa', assets: [{ id: '3', name: 'Daihatsu Gran Max Box', type: 'Vehicle', identifier: 'B 9101 GHI' }, { id: '5', name: 'Toyota Hilux', type: 'Vehicle', identifier: 'B 4455 MNO' }] },
    { id: 'INS-004', policyNumber: 'POL-GA-004', provider: 'Asuransi Sinar Mas', type: 'All Risk', category: 'Mixed', startDate: '2023-04-10', endDate: '2024-04-10', premium: '2000000', sumInsured: '50000000', status: 'Expiring', assetName: 'IT Equipment HO', assets: [{ id: 'GA-001', name: 'MacBook Pro M1', type: 'Vehicle', identifier: 'GA-IT-001' }] },
    { id: 'INS-005', policyNumber: 'POL-BD-005', provider: 'ACA Insurance', type: 'Fire Insurance', category: 'Building', startDate: '2022-01-01', endDate: '2023-12-31', premium: '10000000', sumInsured: '3000000000', status: 'Expired', assetName: 'Warehouse Cikupa', assets: [{ id: 'BLD-002', name: 'Cikupa Warehouse', type: 'Building', identifier: 'BLD-WH-CKP' }] },
];

export const MOCK_INSURANCE_PROVIDERS: InsuranceProviderRecord[] = [
    { id: 1, name: 'AXA Mandiri', contactPerson: 'Budi Santoso', phone: '021-555555', email: 'claim@axa-mandiri.co.id', address: 'Jl. Sudirman Kav 1', rating: 5 },
    { id: 2, name: 'Allianz Indonesia', contactPerson: 'Sarah Lim', phone: '021-666666', email: 'support@allianz.co.id', address: 'Allianz Tower', rating: 4 },
    { id: 3, name: 'Zurich Insurance', contactPerson: 'Michael Tan', phone: '021-777777', email: 'service@zurich.co.id', address: 'Jakarta Selatan', rating: 5 },
    { id: 4, name: 'Asuransi Sinar Mas', contactPerson: 'Dewi Sri', phone: '021-888888', email: 'info@sinarmas.co.id', address: 'Jakarta Pusat', rating: 4 },
    { id: 5, name: 'ACA Insurance', contactPerson: 'Rudi Hartono', phone: '021-999999', email: 'claim@aca.co.id', address: 'Jakarta Barat', rating: 3 },
];

// --- FACILITY MODULES ---

export const MOCK_MASTER_POD_DATA: MasterPodRecord[] = [
    { 
        id: '1', lantai: 'LT 2', gender: 'PRIA', jenisKamar: 'SINGLE BED', nomorKamar: '201', kapasitas: 1, status: 'ACTIVE', biayaAwal: '2250000', biayaTerbaru: '2350000',
        priceHistory: [{ date: '01 JAN 2024', price: '2.350.000', note: 'Penyesuaian Biaya' }],
        transactions: [],
        facilities: { meja: true, ac: true, kursi: true, colokan: true, lemari: true, cermin: true, parkirMotor: true, parkirMobil: false, kmLuar: false, kmDalam: true, gym: true, pantry: true, lokerPantry: true, lokerBarang: true, kitchen: true, laundry: true, kolamRenang: true }
    },
    { 
        id: '2', lantai: 'LT 3', gender: 'PEREMPUAN', jenisKamar: 'DOUBLE BED', nomorKamar: '305', kapasitas: 2, status: 'ACTIVE', biayaAwal: '1500000', biayaTerbaru: '1650000',
        priceHistory: [], transactions: [],
        facilities: { meja: true, ac: true, kursi: true, colokan: true, lemari: true, cermin: true, parkirMotor: true, parkirMobil: false, kmLuar: true, kmDalam: false, gym: true, pantry: true, lokerPantry: true, lokerBarang: true, kitchen: true, laundry: true, kolamRenang: false }
    },
    { 
        id: '3', lantai: 'LT 3', gender: 'PRIA', jenisKamar: 'QUADRUPLE BED', nomorKamar: '310', kapasitas: 4, status: 'ACTIVE', biayaAwal: '1000000', biayaTerbaru: '1100000',
        priceHistory: [], transactions: [],
        facilities: { meja: true, ac: true, kursi: true, colokan: true, lemari: true, cermin: true, parkirMotor: true, parkirMobil: false, kmLuar: true, kmDalam: false, gym: true, pantry: true, lokerPantry: true, lokerBarang: true, kitchen: true, laundry: true, kolamRenang: false }
    },
    { 
        id: '4', lantai: 'LT 2', gender: 'PEREMPUAN', jenisKamar: 'SINGLE BED', nomorKamar: '215', kapasitas: 1, status: 'MAINTENANCE', biayaAwal: '2250000', biayaTerbaru: '2350000',
        priceHistory: [], transactions: [],
        facilities: { meja: true, ac: false, kursi: true, colokan: true, lemari: true, cermin: true, parkirMotor: true, parkirMobil: false, kmLuar: false, kmDalam: true, gym: true, pantry: true, lokerPantry: true, lokerBarang: true, kitchen: true, laundry: true, kolamRenang: true }
    },
    { 
        id: '5', lantai: 'LT 3', gender: 'PRIA', jenisKamar: 'DOUBLE BED', nomorKamar: '301', kapasitas: 2, status: 'INACTIVE', biayaAwal: '1500000', biayaTerbaru: '1650000',
        priceHistory: [], transactions: [],
        facilities: { meja: true, ac: true, kursi: true, colokan: true, lemari: true, cermin: true, parkirMotor: true, parkirMobil: false, kmLuar: true, kmDalam: false, gym: true, pantry: true, lokerPantry: true, lokerBarang: true, kitchen: true, laundry: true, kolamRenang: false }
    },
];

export const MOCK_POD_REQUEST_DATA: PodRequestRecord[] = [
    { id: 'REQ/POD/24/001', requesterName: 'Aan Junaidi', requesterRole: 'Technician', department: 'After Sales', requestDate: '2024-03-20', roomType: 'Single Bed', floorPreference: 'LT 2 Pria', status: 'Waiting Approval', gender: 'Pria', isExpat: false },
    { id: 'REQ/POD/24/002', requesterName: 'Budi Santoso', requesterRole: 'Staff Admin', department: 'HRGA', requestDate: '2024-03-21', roomType: 'Double Bed', floorPreference: 'LT 3 Pria', status: 'Approved', gender: 'Pria', isExpat: false },
    { id: 'REQ/POD/24/003', requesterName: 'Siti Aminah', requesterRole: 'SPG', department: 'Sales', requestDate: '2024-03-22', roomType: 'Quadruple Bed', floorPreference: 'LT 3 Perempuan', status: 'Rejected', gender: 'Perempuan', isExpat: false },
    { id: 'REQ/POD/24/004', requesterName: 'John Doe', requesterRole: 'Engineer', department: 'Production', requestDate: '2024-03-23', roomType: 'Single Bed', floorPreference: 'LT 2 Pria', status: 'Approved', gender: 'Pria', isExpat: true },
    { id: 'REQ/POD/24/005', requesterName: 'Linda Wati', requesterRole: 'Admin', department: 'Finance', requestDate: '2024-03-25', roomType: 'Double Bed', floorPreference: 'LT 2 Perempuan', status: 'Waiting Approval', gender: 'Perempuan', isExpat: false },
];

export const MOCK_TENANT_POD_DATA: TenantPodRecord[] = [
    { id: '1', lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', nomorKamar: '201', namaPenghuni: 'Gian Nanda Pratama', gender: 'Pria', isExpat: false, posisi: 'Technician Team Leader', departemen: 'After Sales', jadwalLaundry: 'Senin & Kamis', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Tidak Terpakai', keterangan: 'Penghuni Lama', history: [], facilities: MOCK_MASTER_POD_DATA[0].facilities },
    { id: '2', lantai: 'Lt 3 Pria', jenisKamar: 'Quadruple Bed', nomorKamar: '317 B', namaPenghuni: 'Sung Yong Hong', gender: 'Pria', isExpat: true, posisi: 'Expert Engineer', departemen: 'Production', jadwalLaundry: 'Tidak Ada', statusLokerBarang: 'Extra Loker Terpakai', statusLokerPantry: 'Extra Loker Terpakai', keterangan: 'Expat Korea', history: [], facilities: MOCK_MASTER_POD_DATA[0].facilities },
    { id: '3', lantai: 'Lt 3 Perempuan', jenisKamar: 'Double Bed', nomorKamar: '305 A', namaPenghuni: 'Siti Rahma', gender: 'Perempuan', isExpat: false, posisi: 'Staff Admin', departemen: 'Finance', jadwalLaundry: 'Rabu & Sabtu', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', keterangan: '-', history: [], facilities: MOCK_MASTER_POD_DATA[1].facilities },
    { id: '4', lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', nomorKamar: '202', namaPenghuni: 'Budi Santoso', gender: 'Pria', isExpat: false, posisi: 'Driver', departemen: 'Logistics', jadwalLaundry: 'Senin & Kamis', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Belum Dapat', keterangan: '-', history: [], facilities: MOCK_MASTER_POD_DATA[0].facilities },
    { id: '5', lantai: 'Lt 3 Pria', jenisKamar: 'Quadruple Bed', nomorKamar: '317 A', namaPenghuni: 'Kim Jong Un', gender: 'Pria', isExpat: true, posisi: 'Manager', departemen: 'Production', jadwalLaundry: 'Tidak Ada', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', keterangan: 'Expat Korea', history: [], facilities: MOCK_MASTER_POD_DATA[0].facilities },
];

export const MOCK_LOCKER_DATA: LockerRecord[] = [
    { id: 'LOC-001', lockerNumber: 'L-001', floor: 'Lantai 1', area: 'Lobby', assignedTo: 'Budi Santoso', department: 'HRGA', status: 'Terisi', spareKeyStatus: 'Ada', lastAuditDate: '2024-03-01' },
    { id: 'LOC-002', lockerNumber: 'L-002', floor: 'Lantai 1', area: 'Lobby', assignedTo: '', department: '', status: 'Kosong', spareKeyStatus: 'Ada', lastAuditDate: '2024-03-01' },
    { id: 'LOC-003', lockerNumber: 'L-003', floor: 'Lantai 2', area: 'Corridor', assignedTo: 'Andi', department: 'Sales', status: 'Kunci Hilang', spareKeyStatus: 'Tidak Ada', lastAuditDate: '2024-03-01', remarks: 'Kunci patah di dalam' },
    { id: 'LOC-004', lockerNumber: 'L-004', floor: 'Lantai 2', area: 'Corridor', assignedTo: 'Rina', department: 'Marketing', status: 'Terisi', spareKeyStatus: 'Ada', lastAuditDate: '2024-03-01' },
    { id: 'LOC-005', lockerNumber: 'L-005', floor: 'Lantai 3', area: 'Pantry', assignedTo: 'Chef', department: 'GA', status: 'Terisi', spareKeyStatus: 'Tidak Ada', lastAuditDate: '2024-03-01' },
];

export const MOCK_LOCKER_REQUEST_DATA: LockerRequestRecord[] = [
    { id: 'REQ-LOC-24-001', requesterName: 'Siti Aminah', department: 'Finance', requesterRole: 'Staff', requestDate: '2024-03-24', reason: 'Barang pribadi banyak', status: 'Pending', requestType: 'REQUEST LOKER BARU' },
    { id: 'REQ-LOC-24-002', requesterName: 'Doni Pratama', department: 'IT', requesterRole: 'Staff', requestDate: '2024-03-25', reason: 'Pindah meja kerja', status: 'Approved', requestType: 'PINDAH LOKER' },
    { id: 'REQ-LOC-24-003', requesterName: 'Rudi Hartono', department: 'Sales', requesterRole: 'Manager', requestDate: '2024-03-26', reason: 'Kunci patah', status: 'Pending', requestType: 'LAPOR KUNCI HILANG' },
    { id: 'REQ-LOC-24-004', requesterName: 'Lisa Blackpink', department: 'Marketing', requesterRole: 'Staff', requestDate: '2024-03-20', reason: 'Butuh loker dekat pantry', status: 'Rejected', requestType: 'REQUEST LOKER BARU' },
    { id: 'REQ-LOC-24-005', requesterName: 'Joko Widodo', department: 'GA', requesterRole: 'Head', requestDate: '2024-03-27', reason: 'Audit kunci', status: 'Approved', requestType: 'PINJAM KUNCI CADANGAN LOKER' },
];

// --- DAILY OPS & ADMIN ---

export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [
    { id: 'LOG-24-001', tanggalKunjungan: '2024-03-25', jamDatang: '09:00', jamPulang: '11:30', lokasiModena: 'SATRIO', kategoriTamu: 'Visitor', namaTamu: 'Pak Bambang (PT Maju)', wanita: 0, lakiLaki: 2, anakAnak: 0, note: 'Meeting dengan Pak Budi', phone: '0812...' },
    { id: 'LOG-24-002', tanggalKunjungan: '2024-03-25', jamDatang: '10:00', lokasiModena: 'SATRIO', kategoriTamu: 'Supplier', namaTamu: 'Kurir JNE', wanita: 0, lakiLaki: 1, anakAnak: 0, note: 'Antar Paket Dokumen', phone: '-' },
    { id: 'LOG-24-003', tanggalKunjungan: '2024-03-25', jamDatang: '13:00', jamPulang: '14:30', lokasiModena: 'SATRIO', kategoriTamu: 'Customer', namaTamu: 'Ibu Ani', wanita: 1, lakiLaki: 0, anakAnak: 1, note: 'Service Center Visit', phone: '0813...' },
    { id: 'LOG-24-004', tanggalKunjungan: '2024-03-26', jamDatang: '08:30', lokasiModena: 'WAREHOUSE', kategoriTamu: 'Internal', namaTamu: 'Pak Rahmat (HO)', wanita: 0, lakiLaki: 1, anakAnak: 0, note: 'Audit Warehouse', phone: 'Internal' },
    { id: 'LOG-24-005', tanggalKunjungan: '2024-03-26', jamDatang: '11:00', lokasiModena: 'SURYOPRANOTO', kategoriTamu: 'Visitor', namaTamu: 'Vendor AC', wanita: 0, lakiLaki: 2, anakAnak: 0, note: 'Maintenance AC', phone: '0856...' },
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [
    { 
        id: 'TS-24-001', 
        employee: { name: 'Cleaner A', role: 'Cleaning', avatar: 'https://ui-avatars.com/api/?name=Cleaner+A&background=random', phone: '08123456789' }, 
        location: 'Head Office', 
        area: 'Lobby & Toilet Lt 1', 
        date: '2024-03-25', 
        shift: 'Pagi', 
        clockIn: '07:00', 
        clockOut: '16:00', 
        status: 'Tepat Waktu',
        totalHours: 8,
        activities: [
            { id: 'ACT-1', activityType: 'Penyapuan lantai', location: 'Lobby', startTime: '07:00', endTime: '09:00', duration: 2, notes: 'Bersih' },
            { id: 'ACT-2', activityType: 'Pembersihan kamar mandi', location: 'Toilet Lt 1', startTime: '09:00', endTime: '10:00', duration: 1, notes: 'Stok tisu aman' }
        ]
    },
    { 
        id: 'TS-24-002', 
        employee: { name: 'Security B', role: 'Security', avatar: 'https://ui-avatars.com/api/?name=Security+B&background=random', phone: '08198765432' }, 
        location: 'Warehouse Cikupa', 
        area: 'Gate 1', 
        date: '2024-03-25', 
        shift: 'Malam', 
        clockIn: '19:00', 
        clockOut: '07:00', 
        status: 'Tepat Waktu',
        totalHours: 12,
        activities: [
            { id: 'ACT-3', activityType: 'Patroli area', location: 'Perimeter Luar', startTime: '20:00', endTime: '22:00', duration: 2, notes: 'Aman' },
            { id: 'ACT-4', activityType: 'CCTV check', location: 'Pos Utama', startTime: '23:00', endTime: '00:00', duration: 1, notes: 'Camera 4 flicker' }
        ]
    },
    { 
        id: 'TS-24-003', 
        employee: { name: 'Teknisi C', role: 'Teknisi', avatar: 'https://ui-avatars.com/api/?name=Teknisi+C&background=random', phone: '08133344455' }, 
        location: 'MHC Suryopranoto', 
        area: 'Maintenance Room', 
        date: '2024-03-25', 
        shift: 'Pagi', 
        clockIn: '08:00', 
        clockOut: '17:00', 
        status: 'Tepat Waktu',
        totalHours: 8,
        activities: [
            { id: 'ACT-5', activityType: 'Perbaikan AC', location: 'Lt 2', startTime: '09:00', endTime: '11:00', duration: 2, notes: 'Ganti freon' }
        ]
    },
    { 
        id: 'TS-24-004', 
        employee: { name: 'Cleaner D', role: 'Cleaning', avatar: 'https://ui-avatars.com/api/?name=Cleaner+D&background=random', phone: '08155566677' }, 
        location: 'Head Office', 
        area: 'Lt 3', 
        date: '2024-03-25', 
        shift: 'Pagi', 
        clockIn: '07:15', 
        clockOut: '16:15', 
        status: 'Terlambat',
        totalHours: 8,
        activities: []
    },
    { 
        id: 'TS-24-005', 
        employee: { name: 'Security E', role: 'Security', avatar: 'https://ui-avatars.com/api/?name=Security+E&background=random', phone: '08177788899' }, 
        location: 'Head Office', 
        area: 'Lobby', 
        date: '2024-03-25', 
        shift: 'Pagi', 
        clockIn: '', 
        clockOut: '', 
        status: 'Izin',
        totalHours: 0,
        activities: []
    },
];

export const MOCK_VENDOR_DATA: VendorRecord[] = [
    { id: 1, vendorName: 'PT ATK Jaya', vendorCode: 'VEN-001', type: 'Goods', category: 'Stationery', email: 'sales@atkjaya.com', phone: '021-123456', address: 'Jakarta Barat', status: 'Active', picName: 'Pak Tono', aktif: true },
    { id: 2, vendorName: 'CV Bersih Selalu', vendorCode: 'VEN-002', type: 'Service', category: 'Cleaning Service', email: 'info@bersih.com', phone: '021-987654', address: 'Jakarta Selatan', status: 'Active', picName: 'Bu Ani', aktif: true },
    { id: 3, vendorName: 'PT TRAC Astra', vendorCode: 'VEN-003', type: 'Service', category: 'Car Rental', email: 'cs@trac.astra.co.id', phone: '021-500009', address: 'Jakarta', status: 'Active', picName: 'Account Mgr', aktif: true },
    { id: 4, vendorName: 'Toko Bangunan Makmur', vendorCode: 'VEN-004', type: 'Goods', category: 'Building Material', email: 'sales@makmur.com', phone: '021-444555', address: 'Tangerang', status: 'Active', picName: 'Ko Aseng', aktif: true },
    { id: 5, vendorName: 'PT Secure Corp', vendorCode: 'VEN-005', type: 'Service', category: 'Security Service', email: 'contact@secure.com', phone: '021-777888', address: 'Jakarta Pusat', status: 'Inactive', picName: 'Pak Budi', aktif: false },
];

export const MOCK_USER_DATA: UserRecord[] = [
    { id: 'USR-001', name: 'Ibnu Faisal', role: 'Admin', department: 'GA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Ibnu+Faisal&background=random', email: 'ibnu.faisal@modena.com', phone: '0812...', lastActive: 'Just now' },
    { id: 'USR-002', name: 'Budi Santoso', role: 'Manager', department: 'HRGA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random', email: 'budi@modena.com', lastActive: '1 hour ago' },
    { id: 'USR-003', name: 'Cleaner A', role: 'Cleaning', department: 'Facility', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Cleaner+A&background=random' },
    { id: 'USR-004', name: 'Security B', role: 'Security', department: 'Security', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Security+B&background=random' },
    { id: 'USR-005', name: 'Teknisi C', role: 'Teknisi', department: 'Maintenance', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Teknisi+C&background=random' },
];

export const MOCK_STOCK_OPNAME_DATA: StockOpnameRecord[] = [
    { id: '1', opnameId: 'SO-HO-24-001', date: '2024-03-25', itemCode: 'ATK-001', itemName: 'Ballpoint Pilot Black', category: 'ATK', uom: 'Pcs', systemQty: 100, physicalQty: 100, diff: 0, performedBy: 'Ibnu Faisal', status: 'MATCHED', statusApproval: 'Approved' },
    { id: '2', opnameId: 'SO-HO-24-001', date: '2024-03-25', itemCode: 'ATK-002', itemName: 'Kertas A4 70gr', category: 'ATK', uom: 'Rim', systemQty: 15, physicalQty: 12, diff: -3, performedBy: 'Ibnu Faisal', status: 'DISCREPANCY', statusApproval: 'Pending' },
    { id: '3', opnameId: 'SO-HO-24-002', date: '2024-03-24', itemCode: 'ARK-001', itemName: 'Pembersih Lantai', category: 'ARK', uom: 'Galon', systemQty: 8, physicalQty: 8, diff: 0, performedBy: 'Cleaner A', status: 'MATCHED', statusApproval: 'Approved' },
    { id: '4', opnameId: 'SO-HO-24-002', date: '2024-03-24', itemCode: 'ARK-002', itemName: 'Tissue Wajah', category: 'ARK', uom: 'Pack', systemQty: 45, physicalQty: 40, diff: -5, performedBy: 'Cleaner A', status: 'DISCREPANCY', statusApproval: 'Rejected' },
    { id: '5', opnameId: 'SO-HO-24-003', date: '2024-03-26', itemCode: 'ATK-004', itemName: 'Spidol Boardmarker', category: 'ATK', uom: 'Pcs', systemQty: 80, physicalQty: 80, diff: 0, performedBy: 'Admin GA', status: 'MATCHED', statusApproval: 'Pending' },
];

export const MOCK_MASTER_APPROVAL_DATA: MasterApprovalRecord[] = [
    { id: 'WF-001', module: 'Stationery Request (Permintaan ATK)', branch: 'All Branches', updatedAt: '2024-01-10', tiers: [{ level: 1, type: 'Role', value: 'Admin GA', sla: 1 }, { level: 2, type: 'Role', value: 'Head of GA', sla: 2 }] },
    { id: 'WF-002', module: 'Vehicle Request (Pengajuan Baru)', branch: 'Jakarta Head Office', updatedAt: '2024-02-15', tiers: [{ level: 1, type: 'Role', value: 'Head of GA', sla: 2 }, { level: 2, type: 'Role', value: 'Director', sla: 5 }] },
    { id: 'WF-003', module: 'Building Maintenance Request', branch: 'All Branches', updatedAt: '2024-03-01', tiers: [{ level: 1, type: 'Role', value: 'Building Manager', sla: 2 }] },
    { id: 'WF-004', module: 'Vendor Registration Approval', branch: 'All Branches', updatedAt: '2024-01-20', tiers: [{ level: 1, type: 'Role', value: 'Procurement', sla: 3 }, { level: 2, type: 'Role', value: 'Finance Manager', sla: 3 }] },
    { id: 'WF-005', module: 'Pod Request', branch: 'Jakarta Head Office', updatedAt: '2024-02-28', tiers: [{ level: 1, type: 'Role', value: 'Admin Pod', sla: 1 }, { level: 2, type: 'Role', value: 'HR Manager', sla: 2 }] },
];

// --- GENERAL MASTER MOCKS ---
export const MOCK_GENERAL_MASTER_DATA: GeneralMasterItem[] = []; 
export const MOCK_BRAND_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Toyota' }, { id: 2, name: 'Honda' }, { id: 3, name: 'Daihatsu' }, { id: 4, name: 'Mitsubishi' }, { id: 5, name: 'Suzuki' }];
export const MOCK_COLOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Hitam' }, { id: 2, name: 'Putih' }, { id: 3, name: 'Silver' }, { id: 4, name: 'Abu-abu' }, { id: 5, name: 'Merah' }];
export const MOCK_BUILDING_ASSETS: BuildingAssetRecord[] = [
    { id: 'AST-AC-001', assetCode: 'AC-001', assetName: 'AC Split Daikin 1PK', assetType: 'AC', buildingName: 'MODENA Head Office', floor: '1', roomName: 'Lobby', status: 'Good', approvalStatus: 'Approved' },
    { id: 'AST-GEN-001', assetCode: 'GEN-001', assetName: 'Genset Perkins', assetType: 'Genset', buildingName: 'Warehouse Cikupa', floor: 'Ground', roomName: 'Power House', status: 'Good', approvalStatus: 'Approved' },
    { id: 'AST-LIFT-001', assetCode: 'LIFT-HO-01', assetName: 'Lift Penumpang', assetType: 'Lift', buildingName: 'MODENA Head Office', floor: 'All', roomName: 'Core', status: 'Good', approvalStatus: 'Approved' },
    { id: 'AST-PLMB-002', assetCode: 'PUMP-01', assetName: 'Pompa Air Utama', assetType: 'Plumbing', buildingName: 'MHC Suryopranoto', floor: 'Ground', roomName: 'Backyard', status: 'Fair', approvalStatus: 'Approved' },
    { id: 'AST-AC-005', assetCode: 'AC-BDG-01', assetName: 'AC Cassette', assetType: 'AC', buildingName: 'Bandung Branch', floor: '2', roomName: 'Meeting Room', status: 'Maintenance', approvalStatus: 'Pending Approval' },
];

export const MOCK_PPN_DATA: GeneralMasterItem[] = [{ id: 1, name: '11%' }, { id: 2, name: '0%' }];
export const MOCK_BRAND_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Vehicle' }, { id: 2, name: 'Electronics' }, { id: 3, name: 'Furniture' }];
export const MOCK_VEHICLE_MODEL_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Avanza' }, { id: 2, name: 'Innova' }, { id: 3, name: 'Gran Max' }, { id: 4, name: 'Camry' }, { id: 5, name: 'Xpander' }];
export const MOCK_BUILDING_COMPONENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Roof' }, { id: 2, name: 'Wall' }, { id: 3, name: 'Floor' }, { id: 4, name: 'Electrical' }];
export const MOCK_DOC_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'STNK' }, { id: 2, name: 'KIR' }, { id: 3, name: 'SIUP' }, { id: 4, name: 'TDP' }];
export const MOCK_UTILITY_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Listrik (PLN)' }, { id: 2, name: 'Air (PDAM)' }, { id: 3, name: 'Internet' }, { id: 4, name: 'Gas' }];
export const MOCK_OPERATOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Telkomsel' }, { id: 2, name: 'Indosat' }, { id: 3, name: 'XL' }];
export const MOCK_ASSET_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Monitor' }, { id: 3, name: 'Printer' }, { id: 4, name: 'Chair' }, { id: 5, name: 'Desk' }];
export const MOCK_DEPARTMENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'IT' }, { id: 2, name: 'HRGA' }, { id: 3, name: 'Finance' }, { id: 4, name: 'Sales' }, { id: 5, name: 'Marketing' }];
export const MOCK_LOCATION_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Jakarta Head Office' }, { id: 2, name: 'Warehouse Cikupa' }, { id: 3, name: 'Surabaya Branch' }, { id: 4, name: 'Medan Branch' }, { id: 5, name: 'Bandung Branch' }];
export const MOCK_UOM_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pcs' }, { id: 2, name: 'Unit' }, { id: 3, name: 'Box' }, { id: 4, name: 'Rim' }, { id: 5, name: 'Pack' }, { id: 6, name: 'Galon' }];
export const MOCK_BUILDING_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Office' }, { id: 2, name: 'Warehouse' }, { id: 3, name: 'Store (MHC)' }, { id: 4, name: 'Factory' }];
export const MOCK_COST_CENTER_DATA: GeneralMasterItem[] = [{ id: 1, name: 'CC-HO-GA' }, { id: 2, name: 'CC-HO-IT' }, { id: 3, name: 'CC-SBY-OPS' }];
export const MOCK_ASSET_CATEGORY_DATA: GeneralMasterItem[] = [{ id: 1, name: 'IT Asset' }, { id: 2, name: 'Furniture & Fixture' }, { id: 3, name: 'Vehicle' }, { id: 4, name: 'Machinery' }];
export const MOCK_TAX_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pajak Kendaraan' }, { id: 2, name: 'PBB' }];
export const MOCK_PAYMENT_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Transfer' }, { id: 2, name: 'Cash' }, { id: 3, name: 'Corporate Card' }];
export const MOCK_SERVICE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Servis Rutin' }, { id: 2, name: 'Perbaikan' }, { id: 3, name: 'Overhaul' }];
export const MOCK_MUTATION_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pending' }, { id: 2, name: 'Approved' }, { id: 3, name: 'Rejected' }, { id: 4, name: 'Completed' }];
export const MOCK_SALES_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Open Bidding' }, { id: 2, name: 'Closed' }, { id: 3, name: 'Sold' }];
export const MOCK_REQUEST_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'New' }, { id: 2, name: 'Pending Approval' }, { id: 3, name: 'Approved' }, { id: 4, name: 'Rejected' }];
export const MOCK_MUTATION_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Permanent' }, { id: 2, name: 'Temporary' }];
export const MOCK_VENDOR_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Goods' }, { id: 2, name: 'Service' }, { id: 3, name: 'Both' }];
export const MOCK_ROLE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Admin' }, { id: 2, name: 'Manager' }, { id: 3, name: 'Staff' }, { id: 4, name: 'Viewer' }];
export const MOCK_VEHICLE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'MPV' }, { id: 2, name: 'SUV' }, { id: 3, name: 'Sedan' }, { id: 4, name: 'Box' }, { id: 5, name: 'Blind Van' }, { id: 6, name: 'Truck' }, { id: 7, name: 'Motorcycle' }];
export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Writing' }, { id: 2, name: 'Paper' }, { id: 3, name: 'Organizer' }, { id: 4, name: 'Tools' }];
export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Cleaning' }, { id: 2, name: 'Pantry' }, { id: 3, name: 'Bathroom' }, { id: 4, name: 'Safety' }];
export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [
    { id: 1, name: 'PICKUP HO', type: 'Internal', status: 'Active' },
    { id: 2, name: 'PICKUP WAREHOUSE', type: 'Internal', status: 'Active' },
    { id: 3, name: 'DELIVERY JNE', type: 'External', status: 'Active' }
];

