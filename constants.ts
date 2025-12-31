
import { AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem, UserRecord, BuildingAssetRecord, BuildingMaintenanceRecord, UtilityRecord, GeneralAssetRecord, VendorRecord, TimesheetRecord, ServiceRecord, MutationRecord, SalesRecord, InsuranceRecord, MaintenanceScheduleRecord, VehicleReminderRecord } from './types';

// --- ATK & ARK ---
export const MOCK_MASTER_DATA: MasterItem[] = [
    { id: 1, category: 'ATK', itemName: 'Kertas A4 80gr', itemCode: 'P-001', uom: 'Rim', remainingStock: 50, minimumStock: 10, maximumStock: 100, requestedStock: 0, lastPurchasePrice: '45.000', averagePrice: '44.500', purchaseDate: '2024-01-10' },
    { id: 2, category: 'ATK', itemName: 'Pulpen Hitam', itemCode: 'P-002', uom: 'Pcs', remainingStock: 120, minimumStock: 20, maximumStock: 200, requestedStock: 0, lastPurchasePrice: '2.500', averagePrice: '2.400', purchaseDate: '2024-01-15' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
    { id: 101, category: 'Cleaning', itemName: 'Cairan Pembersih Lantai', itemCode: 'C-001', uom: 'Jerrycan 5L', remainingStock: 5, minimumStock: 2, maximumStock: 10, requestedStock: 0, lastPurchasePrice: '85.000', averagePrice: '84.000', purchaseDate: '2024-01-05' },
    { id: 102, category: 'Pantry', itemName: 'Kopi Kapal Api', itemCode: 'K-001', uom: 'Pack', remainingStock: 8, minimumStock: 5, maximumStock: 20, requestedStock: 2, lastPurchasePrice: '15.000', averagePrice: '15.000', purchaseDate: '2024-01-20' }
];

export const MOCK_DATA: AssetRecord[] = []; // ATK Request Mock
export const MOCK_ARK_DATA: AssetRecord[] = []; // ARK Request Mock

// --- VEHICLE ---
export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noPolisi: 'B 1234 ABC', nama: 'Toyota Avanza 1.5 G', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'Avanza', tahunPembuatan: '2022', warna: 'Hitam', isiSilinder: '1500', noRangka: 'MHF...', noMesin: '1TR...', noBpkb: 'L-123', masaBerlaku1: '2025-01-01', masaBerlaku5: '2027-01-01', masaBerlakuKir: '2024-12-31', tglBeli: '2022-01-01', hargaBeli: '250000000', noPolisAsuransi: 'POL-001', jangkaPertanggungan: '2025-01-01', channel: 'Direct', cabang: 'Jakarta', pengguna: 'Staff GA', status: 'Aktif', ownership: 'Milik Modena', approvalStatus: 'Approved' }
];

export const MOCK_VEHICLE_REMINDER_DATA: VehicleReminderRecord[] = [
    { id: 'REM-V-001', noPolisi: 'B 1234 ABC', vehicleName: 'Toyota Avanza 1.5 G', type: 'STNK 1 Tahunan', expiryDate: '2025-01-01', branch: 'Jakarta', status: 'Safe' },
    { id: 'REM-V-002', noPolisi: 'B 9876 XYZ', vehicleName: 'Daihatsu Gran Max', type: 'KIR', expiryDate: '2024-03-30', branch: 'Surabaya', status: 'Warning' },
    { id: 'REM-V-003', noPolisi: 'D 4567 HIJ', vehicleName: 'Honda HRV', type: 'STNK 5 Tahunan', expiryDate: '2024-03-10', branch: 'Bandung', status: 'Critical' }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    { id: 'REQ-TAX-001', noPolisi: 'B 1234 ABC', aset: 'Toyota Avanza', tglRequest: '2024-03-01', jenis: 'Pajak STNK', channel: 'Direct', cabang: 'Jakarta', status: 'Proses', statusApproval: 'Approved', jatuhTempo: '2024-03-15', estimasiBiaya: '3.500.000', targetSelesai: '2024-03-10', jenisPembayaran: 'Kasbon' }
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    { id: 'CTR-001', noKontrak: 'KTR/2024/001', noPolisi: 'B 9999 XYZ', aset: 'Daihatsu Gran Max', vendor: 'TRAC', tglMulai: '2024-01-01', tglBerakhir: '2025-01-01', biayaSewa: '5000000', approvalStatus: 'Approved', status: 'Active' }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [];
export const MOCK_MUTATION_DATA: MutationRecord[] = [];
export const MOCK_SALES_DATA: SalesRecord[] = [];

// --- BUILDING ---
export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    { id: 'BLD-001', name: 'Head Office Satrio', assetNo: 'AST-BLD-001', type: 'Office', location: 'Jakarta', address: 'Jl. Prof Dr Satrio', status: 'Active', ownership: 'Own', rentCost: '0', totalMaintenanceCost: '50000000', utilityCost: '25000000' }
];

export const MOCK_BUILDING_ASSETS: BuildingAssetRecord[] = [
    { id: 'BA-001', assetName: 'AC Split 2PK', assetCode: 'AC-L1-01', assetType: 'AC', buildingName: 'Head Office Satrio', floor: '1', roomName: 'Lobby', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Quarterly' }
];
export const MOCK_IT_BUILDING_ASSETS: BuildingAssetRecord[] = [];
export const MOCK_CS_BUILDING_ASSETS: BuildingAssetRecord[] = [];

export const MOCK_BUILDING_MAINTENANCE_DATA: BuildingMaintenanceRecord[] = [
    { id: 'MT-001', assetId: 'BA-001', assetName: 'AC Split 2PK', buildingLocation: 'Head Office - Lt 1', requestDate: '2024-03-10', maintenanceType: 'Preventive', cost: '150000', status: 'Completed', approvalStatus: 'Approved', description: 'Cuci AC Rutin' }
];

export const MOCK_BRANCH_IMPROVEMENT_DATA: BuildingRecord[] = [];
export const MOCK_UTILITY_DATA: UtilityRecord[] = [
    { id: 'UTIL-001', period: 'Maret 2024', date: '2024-03-25', location: 'Head Office Satrio', type: 'Listrik (PLN)', meterStart: 1000, meterEnd: 1500, usage: 500, unit: 'kWh', cost: '750000', status: 'Paid' }
];

// --- GENERAL & MASTERS ---
export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    { id: 'REM-001', documentName: 'SHGB Certificate', buildingName: 'Head Office Satrio', assetNo: 'AST-BLD-001', expiryDate: '2024-06-01', status: 'Warning', daysRemaining: 85 }
];
export const MOCK_MAINTENANCE_REMINDER: ReminderRecord[] = [];

export const MOCK_MAINTENANCE_SCHEDULE_DATA: MaintenanceScheduleRecord[] = [
    { id: 'SCH-001', assetId: 'BA-001', assetName: 'AC Split 2PK - Lobby', assetCode: 'AC-L1-01', location: 'HO Satrio', category: 'AC', frequency: 'Quarterly', lastMaintenanceDate: '2024-01-15', nextMaintenanceDate: '2024-04-15', status: 'Safe', vendor: 'PT. Sejuk Selalu' },
    { id: 'SCH-002', assetId: 'BA-005', assetName: 'Genset 500KVA', assetCode: 'GEN-B1-01', location: 'HO Satrio', category: 'Genset', frequency: 'Monthly', lastMaintenanceDate: '2024-02-28', nextMaintenanceDate: '2024-03-28', status: 'Warning', vendor: 'PT. Power Utama' },
    { id: 'SCH-003', assetId: 'BA-012', assetName: 'APAR 5KG', assetCode: 'APAR-L2-03', location: 'HO Satrio', category: 'APAR', frequency: 'Yearly', lastMaintenanceDate: '2023-03-10', nextMaintenanceDate: '2024-03-10', status: 'Overdue', vendor: 'CV. Damkar Mandiri' }
];

export const MOCK_VENDOR_DATA: VendorRecord[] = [
    { id: 'V-001', vendorName: 'PT. Service Maju', vendorCode: 'VND-001', type: 'Service', category: 'AC Maintenance', email: 'service@maju.com', phone: '021-1234567', address: 'Jakarta', status: 'Active' }
];
export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = []; // Can be same as VendorRecord

export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [];
export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [];
export const MOCK_USER_DATA: UserRecord[] = [
    { id: 'USR-001', name: 'Ibnu Faisal', role: 'Facility Manager', avatar: 'https://i.pravatar.cc/150?u=ibnu', phone: '08123456789', status: 'Active', department: 'GA', location: 'Head Office', joinDate: '2020-01-01' }
];

export const MOCK_GENERAL_ASSET_DATA: GeneralAssetRecord[] = [
    { id: 'GA-001', assetNumber: 'GA-001', assetCategory: 'Furniture', type: 'Office Chair', ownership: 'Own', assetLocation: 'Head Office', subLocation: 'Lt 2', department: 'HR', channel: 'Direct', status: 'Good', approvalStatus: 'Approved', purchasePrice: '1500000', purchaseDate: '2023-01-01' }
];
export const MOCK_IT_ASSET_DATA: GeneralAssetRecord[] = [];

export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [
    { id: 1, name: 'Head Office', address: 'Jl. Satrio', type: 'HO' }
];

export const MOCK_INSURANCE_DATA: InsuranceRecord[] = [
    { id: 'INS-V-001', policyNumber: 'POL-ASW-2024-001', assetId: '1', assetName: 'B 1234 ABC - TOYOTA AVANZA', category: 'Vehicle', provider: 'Asuransi Astra Buana', type: 'All Risk', startDate: '2024-01-01', endDate: '2025-01-01', premium: '4500000', sumInsured: '200000000', status: 'Active', deductible: '300000', claims: [] }
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
