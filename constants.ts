
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

export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [
    { id: 1, name: 'PICKUP HO', type: 'Internal', status: 'Active' },
    { id: 2, name: 'PICKUP WAREHOUSE', type: 'Internal', status: 'Active' },
    { id: 3, name: 'DELIVERY JNE', type: 'External', status: 'Active' }
];

export const MOCK_REQUEST_TYPES: RequestTypeRecord[] = [
    { id: 1, name: 'DAILY REQUEST', status: 'Active' },
    { id: 2, name: 'EVENT REQUEST', status: 'Active' }
];

export const MOCK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ATK/2023/001', employee: { name: 'Budi Santoso', role: 'Staff IT' }, category: 'ATK', itemName: 'Kertas A4', qty: 5, uom: 'Rim', date: '2023-10-25', status: 'Approved' },
    { id: 2, transactionNumber: 'TRX/ATK/2023/002', employee: { name: 'Siti Aminah', role: 'HR Admin' }, category: 'ATK', itemName: 'Pulpen Hitam', qty: 12, uom: 'Pcs', date: '2023-10-26', status: 'Pending' }
];

export const MOCK_MASTER_DATA: MasterItem[] = [
    { id: 1, category: 'Kertas', itemName: 'Kertas A4 80gr', itemCode: 'ATK-P-001', uom: 'Rim', remainingStock: 50, minimumStock: 10, maximumStock: 100, requestedStock: 5, lastPurchasePrice: '45000', averagePrice: '44000', purchaseDate: '2023-10-01' },
    { id: 2, category: 'Tulis', itemName: 'Pulpen Standard', itemCode: 'ATK-W-002', uom: 'Pcs', remainingStock: 120, minimumStock: 20, maximumStock: 200, requestedStock: 0, lastPurchasePrice: '3000', averagePrice: '2900', purchaseDate: '2023-09-15' }
];

export const MOCK_ARK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ARK/2023/001', employee: { name: 'Joko Susilo', role: 'GA Staff' }, category: 'Cleaning', itemName: 'Pembersih Lantai', qty: 2, uom: 'Galon', date: '2023-10-20', status: 'Approved' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
    { id: 1, category: 'Cleaning', itemName: 'Wipol', itemCode: 'ARK-C-001', uom: 'Galon', remainingStock: 15, minimumStock: 5, maximumStock: 30, requestedStock: 0, lastPurchasePrice: '50000', averagePrice: '49000', purchaseDate: '2023-10-05' }
];

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noPolisi: 'B 1234 ABC', nama: 'Toyota Avanza', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'G MT', tahunPembuatan: '2020', warna: 'Hitam', isiSilinder: '1300', ownership: 'Milik Modena', channel: 'HCO', cabang: 'Jakarta', approvalStatus: 'Approved', status: 'Aktif' },
    { id: 2, noPolisi: 'B 5678 DEF', nama: 'Daihatsu Gran Max', merek: 'Daihatsu', tipeKendaraan: 'Blind Van', model: '1.3', tahunPembuatan: '2019', warna: 'Putih', isiSilinder: '1300', ownership: 'Sewa', channel: 'Logistics', cabang: 'Surabaya', approvalStatus: 'Pending', status: 'Aktif' }
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    { id: 'CTR-001', noKontrak: 'KTR/001/2023', noPolisi: 'B 5678 DEF', aset: 'Daihatsu Gran Max', vendor: 'TRAC', tglMulai: '2023-01-01', tglBerakhir: '2024-01-01', biayaSewa: '4500000', approvalStatus: 'Approved', status: 'Active', channel: 'Logistics', cabang: 'Surabaya' }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    { id: 'SRV-001', noPolisi: 'B 1234 ABC', tglRequest: '2023-11-01', channel: 'HCO', cabang: 'Jakarta', status: 'Completed', statusApproval: 'Approved', jenisServis: 'Servis Rutin', cost: '1500000' }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    { id: 'TAX-001', noPolisi: 'B 1234 ABC', tglRequest: '2023-12-01', jenis: 'Pajak STNK', channel: 'HCO', cabang: 'Jakarta', status: 'Proses', statusApproval: 'Approved' }
];

export const MOCK_VEHICLE_REMINDER_DATA: VehicleReminderRecord[] = [
    { id: 1, noPolisi: 'B 1234 ABC', vehicleName: 'Toyota Avanza', branch: 'Jakarta', type: 'STNK 1 Tahunan', status: 'Warning', expiryDate: '2024-01-15' }
];

export const MOCK_MUTATION_DATA: MutationRecord[] = [
    { id: 'MUT-001', assetType: 'VEHICLE', noPolisi: 'B 1234 ABC', cabangAset: 'Jakarta', tipeMutasi: 'Permanent', tglPermintaan: '2023-11-10', lokasiAsal: 'Jakarta', lokasiTujuan: 'Bandung', status: 'Approved', statusApproval: 'Approved' },
    { id: 'MUT-002', assetType: 'GENERAL_ASSET', assetName: 'Laptop Dell', assetNumber: 'GA-IT-001', cabangAset: 'Jakarta', tipeMutasi: 'Temporary', tglPermintaan: '2023-11-12', lokasiAsal: 'Jakarta', lokasiTujuan: 'Surabaya', status: 'Pending', statusApproval: 'Pending' }
];

export const MOCK_SALES_DATA: SalesRecord[] = [
    { id: 'SALE-001', assetType: 'VEHICLE', noPolisi: 'B 9999 XYZ', tglRequest: '2023-10-01', channel: 'HCO', cabang: 'Jakarta', hargaTertinggi: '120000000', status: 'Open Bidding', statusApproval: 'Approved' }
];

export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    { id: 1, name: 'MODENA Head Office', assetNo: 'BDG-001', type: 'Office', ownership: 'Rent', location: 'Jakarta', address: 'Jl. Satrio No. 1', status: 'Active', rentCost: '500000000', electricityPower: '100000 VA', waterSource: 'PDAM' }
];

export const MOCK_UTILITY_DATA: UtilityRecord[] = [
    { id: 'UTIL-001', period: 'November 2023', date: '2023-11-30', location: 'MODENA Head Office', type: 'Listrik (PLN)', meterStart: 1000, meterEnd: 1500, usage: 500, unit: 'kWh', cost: '750000', status: 'Paid' }
];

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    { id: 1, category: 'Permit', documentName: 'Izin Domisili', buildingName: 'MODENA Head Office', assetNo: 'BDG-001', expiryDate: '2024-02-20', status: 'Warning', source: 'Manual', daysRemaining: 60 }
];

export const MOCK_BUILDING_MAINTENANCE_DATA: BuildingMaintenanceRecord[] = [
    { id: 'BM-001', assetName: 'AC Central Lt 1', requestDate: '2023-11-15', maintenanceType: 'Corrective', vendor: 'PT Dingin Sejuk', cost: '2500000', status: 'Completed', approvalStatus: 'Approved', description: 'AC tidak dingin' }
];

export const MOCK_GENERAL_ASSET_DATA: GeneralAssetRecord[] = [
    { id: 'GA-001', assetNumber: 'GA-IT-001', assetName: 'Laptop Dell Latitude', assetCategory: 'IT Asset', type: 'Laptop', ownership: 'Own', assetLocation: 'Jakarta', department: 'IT', status: 'Active' },
    { id: 'GA-002', assetNumber: 'GA-HC-001', assetName: 'Kursi Kerja Ergonomis', assetCategory: 'Asset HC', type: 'Furniture', ownership: 'Own', assetLocation: 'Jakarta', department: 'HR', status: 'Active' }
];

export const MOCK_ASSET_MAINTENANCE_DATA: MaintenanceScheduleRecord[] = [
    { id: 'SCH-001', assetId: 'GA-001', assetName: 'Laptop Dell Latitude', assetCode: 'GA-IT-001', frequency: 'Yearly', lastMaintenanceDate: '2023-01-10', nextMaintenanceDate: '2024-01-10', status: 'Safe', location: 'Jakarta' }
];

export const MOCK_INSURANCE_DATA: InsuranceRecord[] = [
    { id: 'INS-001', policyNumber: 'POL-001-2023', provider: 'AXA Mandiri', type: 'All Risk', startDate: '2023-01-01', endDate: '2024-01-01', premium: '5000000', status: 'Active', assets: [{ id: '1', name: 'Toyota Avanza', type: 'Vehicle', identifier: 'B 1234 ABC' }] }
];

export const MOCK_INSURANCE_PROVIDERS: InsuranceProviderRecord[] = [
    { id: 1, name: 'AXA Mandiri', contactPerson: 'John Doe', phone: '021-1234567', email: 'contact@axa.com', address: 'Jakarta', rating: 5 }
];

export const MOCK_POD_REQUEST_DATA: PodRequestRecord[] = [
    { id: 1, requesterName: 'Andi Saputra', requesterRole: 'Technician', floorPreference: 'LT 2 PRIA', roomType: 'SINGLE BED', requestDate: '2023-11-20', status: 'Pending' }
];

export const MOCK_LOCKER_DATA: LockerRecord[] = [
    { id: 1, lockerNumber: 'L-001', floor: 'Lantai 1', area: 'Lobby', assignedTo: 'Andi Saputra', department: 'Technician', spareKeyStatus: 'Ada', lastAuditDate: '2023-11-01', status: 'Terisi' }
];

export const MOCK_LOCKER_REQUEST_DATA: LockerRequestRecord[] = [
    { id: 1, requesterName: 'Budi Santoso', requesterRole: 'Staff', requestDate: '2023-11-25', status: 'Pending', lockerNumber: 'L-002', floor: 'Lantai 1' }
];

export const MOCK_STOCK_OPNAME_DATA: StockOpnameRecord[] = [
    { id: 1, opnameId: 'SO-ATK-001', date: '2023-11-30', itemName: 'Kertas A4', itemCode: 'ATK-P-001', category: 'ATK', systemQty: 50, physicalQty: 48, diff: -2, performedBy: 'Siti Aminah', status: 'DISCREPANCY', statusApproval: 'Pending' }
];

export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [
    { 
        id: 'LOG-001', 
        tanggalKunjungan: '2024-03-20', 
        jamDatang: '09:00', 
        jamPulang: '11:30', 
        lokasiModena: 'SATRIO', 
        kategoriTamu: 'CUSTOMER', 
        countAdult: 0, 
        countChild: 0, 
        countIndividual: 1,
        namaTamu: 'BUDI SANTOSO', 
        email: 'budi.santoso@email.com',
        phone: '08123456789',
        identityCardNumber: '3201234567890001',
        visitorCardNumber: 'VC-001',
        note: 'Meeting regarding distribution'
    },
    { 
        id: 'LOG-002', 
        tanggalKunjungan: '2024-03-21', 
        jamDatang: '10:15', 
        jamPulang: '14:00', 
        lokasiModena: 'KEMANG', 
        kategoriTamu: 'VENDOR', 
        countAdult: 2, 
        countChild: 0, 
        countIndividual: 0,
        namaTamu: 'PT MULTI TEKNIK', 
        note: 'Maintenance AC regularly'
    },
    { 
        id: 'LOG-003', 
        tanggalKunjungan: '2024-03-21', 
        jamDatang: '13:00', 
        jamPulang: '15:30', 
        lokasiModena: 'SURYO', 
        kategoriTamu: 'CUSTOMER', 
        countAdult: 0, 
        countChild: 2, 
        countIndividual: 1,
        namaTamu: 'ANITA WIJAYA', 
        note: 'Product Viewing in showroom'
    },
    { 
        id: 'LOG-004', 
        tanggalKunjungan: '2024-03-22', 
        jamDatang: '08:45', 
        jamPulang: '10:00', 
        lokasiModena: 'SATRIO', 
        kategoriTamu: 'INTERVIEWEE', 
        countAdult: 0, 
        countChild: 0, 
        countIndividual: 1,
        namaTamu: 'REZA ADITYA', 
        note: 'HR Interview for Tech position'
    },
    { 
        id: 'LOG-005', 
        tanggalKunjungan: '2024-03-22', 
        jamDatang: '11:20', 
        jamPulang: '12:00', 
        lokasiModena: 'KEMANG', 
        kategoriTamu: 'OTHERS', 
        countAdult: 1, 
        countChild: 0, 
        countIndividual: 0,
        namaTamu: 'DEDI KURNIAWAN', 
        note: 'Document Pickup from front desk'
    }
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [
    { id: 1, employee: { name: 'Ujang', role: 'Security', id: 'SEC-01', status: 'Active' }, date: '2023-12-01', shift: 'Pagi', status: 'Tepat Waktu', totalHours: 8, activities: [] }
];

export const MOCK_VENDOR_DATA: VendorRecord[] = [
    { id: 1, vendorName: 'PT ATK Jaya', vendorCode: 'VEN-001', type: 'Goods', category: 'ATK', email: 'sales@atkjaya.com', phone: '021-555555', address: 'Jakarta', status: 'Active', picName: 'Pak Budi' }
];

export const MOCK_USER_DATA: UserRecord[] = [
    { id: 'USR-001', name: 'Admin User', email: 'admin@modena.com', role: 'Admin', department: 'GA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Admin', phone: '08123456789' }
];

export const MOCK_MASTER_APPROVAL_DATA: MasterApprovalRecord[] = [
    { id: 'WFL-001', module: 'Stationery Request', branch: 'All Branches', tiers: [{ level: 1, type: 'Role', value: 'GA Admin', sla: 1 }], updatedAt: '2023-10-01' }
];

// --- GENERAL MASTER DATA MOCKS ---
export const MOCK_GENERAL_MASTER_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Direct Sales' }, { id: 2, name: 'E-Commerce' }
];
export const MOCK_BRAND_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Toyota' }, { id: 2, name: 'Honda' }];
export const MOCK_COLOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Hitam' }, { id: 2, name: 'Putih' }];
export const MOCK_BUILDING_ASSETS: BuildingAssetRecord[] = [
    { id: 'BA-001', assetName: 'AC Split 1PK', assetCode: 'AC-001', assetType: 'AC', buildingName: 'MODENA Head Office', floor: 'Lantai 1', roomName: 'Lobby', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Quarterly', ownership: 'Own' }
];
export const MOCK_PPN_DATA: GeneralMasterItem[] = [{ id: 1, name: '11%' }];
export const MOCK_BRAND_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Kendaraan' }];
export const MOCK_VEHICLE_MODEL_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Avanza' }];
export const MOCK_BUILDING_COMPONENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Atap' }];
export const MOCK_DOC_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Legal' }];
export const MOCK_UTILITY_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Listrik' }];
export const MOCK_OPERATOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Telkomsel' }];
export const MOCK_ASSET_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Furniture' }];
export const MOCK_DEPARTMENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'HR' }, { id: 2, name: 'IT' }, { id: 3, name: 'Finance' }];
export const MOCK_LOCATION_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Jakarta' }, { id: 2, name: 'Surabaya' }];
export const MOCK_UOM_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pcs' }, { id: 2, name: 'Rim' }, { id: 3, name: 'Unit' }];
export const MOCK_BUILDING_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Office' }, { id: 2, name: 'Warehouse' }];
export const MOCK_COST_CENTER_DATA: GeneralMasterItem[] = [{ id: 1, name: 'CC-001' }];
export const MOCK_ASSET_CATEGORY_DATA: GeneralMasterItem[] = [{ id: 1, name: 'IT Equipment' }, { id: 2, name: 'Furniture' }];
export const MOCK_TAX_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pajak STNK' }];
export const MOCK_PAYMENT_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Transfer' }];
export const MOCK_SERVICE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Servis Rutin' }];
export const MOCK_MUTATION_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pending' }];
export const MOCK_SALES_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Open Bid' }];
export const MOCK_REQUEST_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pending' }];
export const MOCK_MUTATION_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Permanent' }];
export const MOCK_VENDOR_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Goods' }];
export const MOCK_ROLE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Admin' }, { id: 2, name: 'Staff' }];
export const MOCK_VEHICLE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'MPV' }, { id: 2, name: 'SUV' }];
export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Kertas' }, { id: 2, name: 'Tulis' }];
export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Cleaning' }, { id: 2, name: 'Pantry' }];
export const MOCK_MASTER_POD_DATA: MasterPodRecord[] = [
    { id: 1, lantai: 'LT 2', jenisKamar: 'Single Bed', nomorKamar: '201', kapasitas: 1, status: 'ACTIVE', biayaAwal: '1500000', biayaTerbaru: '1600000', facilities: {}, gender: 'PRIA' }
];
export const MOCK_TENANT_POD_DATA: TenantPodRecord[] = [
    { id: 1, lantai: 'LT 2', jenisKamar: 'Single Bed', nomorKamar: '201', namaPenghuni: 'Budi', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', jadwalLaundry: 'Senin', keterangan: 'OK', gender: 'Pria', facilities: {} }
];
export const MOCK_LOGBOOK_CATEGORY: GeneralMasterItem[] = [
    { id: 1, name: 'Visitor' }, { id: 2, name: 'Supplier' }, { id: 3, name: 'Contractor' }, { id: 4, name: 'Interviewee' }
];
export const MOCK_LOGBOOK_PURPOSE: GeneralMasterItem[] = [
    { id: 1, name: 'Meeting' }, { id: 2, name: 'Delivery' }, { id: 3, name: 'Maintenance' }
];
