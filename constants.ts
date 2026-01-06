import { 
    AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, 
    DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, 
    VehicleContractRecord, GeneralMasterItem, UserRecord, BuildingAssetRecord, 
    BuildingMaintenanceRecord, UtilityRecord, GeneralAssetRecord, VendorRecord, 
    TimesheetRecord, ServiceRecord, MutationRecord, SalesRecord, InsuranceRecord, 
    MaintenanceScheduleRecord, VehicleReminderRecord, LockerRecord, ModenaPodRecord, 
    StockOpnameRecord, LockerRequestRecord, PodRequestRecord, MasterPodRecord, 
    MasterLockerRecord, InsuranceProviderRecord 
} from './types';

export const MOCK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ATK/2024/001', employee: { name: 'John Doe', role: 'Staff', avatar: 'https://via.placeholder.com/150' }, category: 'ATK', itemName: 'Ballpoint', qty: 10, date: '2024-03-20', status: 'Approved', remainingStock: 50, itemCode: 'ATK-001', uom: 'Pcs' },
    { id: 2, transactionNumber: 'TRX/ATK/2024/002', employee: { name: 'Jane Smith', role: 'Manager', avatar: 'https://via.placeholder.com/150' }, category: 'ATK', itemName: 'Paper A4', qty: 5, date: '2024-03-21', status: 'Pending', remainingStock: 20, itemCode: 'ATK-002', uom: 'Rim' },
];

export const MOCK_MASTER_DATA: MasterItem[] = [
    { id: 1, itemCode: 'ATK-001', category: 'Writing', itemName: 'Ballpoint', uom: 'Pcs', remainingStock: 100, minimumStock: 10, maximumStock: 200, requestedStock: 0, lastPurchasePrice: '5000', averagePrice: '4800' },
    { id: 2, itemCode: 'ATK-002', category: 'Paper', itemName: 'Paper A4', uom: 'Rim', remainingStock: 50, minimumStock: 5, maximumStock: 100, requestedStock: 0, lastPurchasePrice: '45000', averagePrice: '44000' },
];

export const MOCK_ARK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ARK/2024/001', employee: { name: 'Admin', role: 'GA', avatar: 'https://via.placeholder.com/150' }, category: 'ARK', itemName: 'Tissue', qty: 20, date: '2024-03-22', status: 'Approved', remainingStock: 100, itemCode: 'ARK-001', uom: 'Pack' },
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
    { id: 1, itemCode: 'ARK-001', category: 'Hygiene', itemName: 'Tissue', uom: 'Pack', remainingStock: 150, minimumStock: 20, maximumStock: 300, requestedStock: 0, lastPurchasePrice: '10000', averagePrice: '9500' },
];

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noPolisi: 'B 1234 ABC', nama: 'Toyota Avanza', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'G', tahunPembuatan: '2022', warna: 'Hitam', status: 'Aktif', ownership: 'Milik Modena', channel: 'HCO', cabang: 'Jakarta' },
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    { id: 'CTR-001', noKontrak: 'CTR/2024/001', noPolisi: 'B 5678 DEF', aset: 'Honda Civic', vendor: 'Rental Co', tglMulai: '2024-01-01', tglBerakhir: '2025-01-01', biayaSewa: '5000000', status: 'Active', approvalStatus: 'Approved', channel: 'HCO', cabang: 'Jakarta' },
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    { id: 'SRV-001', noPolisi: 'B 1234 ABC', tglRequest: '2024-03-10', status: 'Completed', statusApproval: 'Approved', jenisServis: 'Servis Rutin', estimasiBiaya: '1500000', cost: '1500000' },
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    { id: 'TAX-001', noPolisi: 'B 1234 ABC', tglRequest: '2024-02-01', jenis: 'Pajak STNK', status: 'Proses', statusApproval: 'Approved' },
];

export const MOCK_VEHICLE_REMINDER_DATA: VehicleReminderRecord[] = [
    { id: 'REM-001', noPolisi: 'B 1234 ABC', vehicleName: 'Toyota Avanza', type: 'STNK 1 Tahunan', expiryDate: '2024-05-01', status: 'Warning' },
];

export const MOCK_MUTATION_DATA: MutationRecord[] = [
    { id: 'MUT-001', noPolisi: 'B 1234 ABC', cabangAset: 'Jakarta', tipeMutasi: 'Permanent', tglPermintaan: '2024-03-01', lokasiAsal: 'Jakarta', lokasiTujuan: 'Bandung', status: 'Pending', statusApproval: 'Pending', assetType: 'VEHICLE' },
];

export const MOCK_SALES_DATA: SalesRecord[] = [
    { id: 'SALE-001', noPolisi: 'B 9999 XYZ', tglRequest: '2024-03-15', channel: 'Direct', cabang: 'Surabaya', hargaTertinggi: '150000000', hargaPembuka: '120000000', status: 'Open Bidding', statusApproval: 'Approved', assetType: 'VEHICLE' },
];

export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    { id: 'BLD-001', name: 'MODENA Head Office', assetNo: 'BLD-HO-001', type: 'Office', ownership: 'Rent', location: 'Jakarta', address: 'Jl. Satrio', status: 'Active' },
];

export const MOCK_UTILITY_DATA: UtilityRecord[] = [
    { id: 'UTL-001', period: 'March 2024', date: '2024-03-01', type: 'Listrik (PLN)', location: 'Head Office', meterStart: 1000, meterEnd: 1200, usage: 200, unit: 'kWh', cost: '300000', status: 'Unpaid' },
];

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    { id: 'DOC-001', category: 'Permit', documentName: 'Izin Domisili', buildingName: 'Head Office', assetNo: 'BLD-HO-001', expiryDate: '2024-12-31', status: 'Safe', daysRemaining: 200 },
];

export const MOCK_BUILDING_MAINTENANCE_DATA: BuildingMaintenanceRecord[] = [
    { id: 'MNT-001', assetId: 'AST-AC-001', assetName: 'AC Split Lobby', buildingLocation: 'Lobby', requestDate: '2024-03-20', maintenanceType: 'Corrective', cost: '500000', status: 'In Progress', approvalStatus: 'Approved' },
];

export const MOCK_GENERAL_ASSET_DATA: GeneralAssetRecord[] = [
    { id: 'GA-001', assetNumber: 'GA-PC-001', assetCategory: 'IT', type: 'Laptop', ownership: 'Own', assetLocation: 'Head Office', subLocation: 'IT Room', department: 'IT', approvalStatus: 'Approved', status: 'Good' },
];

export const MOCK_INSURANCE_DATA: InsuranceRecord[] = [
    { id: 'INS-001', policyNumber: 'POL-001', provider: 'AXA', type: 'All Risk', category: 'Vehicle', startDate: '2024-01-01', endDate: '2025-01-01', premium: '5000000', sumInsured: '200000000', status: 'Active', assetName: 'Toyota Avanza' },
];

export const MOCK_INSURANCE_PROVIDERS: InsuranceProviderRecord[] = [
    { id: 1, name: 'AXA Mandiri', contactPerson: 'Budi', phone: '021-555555', email: 'axa@example.com', address: 'Jakarta', rating: 5 },
];

export const MOCK_POD_DATA: ModenaPodRecord[] = [
    { id: 'POD-001', lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', nomorKamar: '201', namaPenghuni: 'Budi', status: 'Occupied', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', jadwalLaundry: 'Senin' },
];

export const MOCK_POD_REQUEST_DATA: PodRequestRecord[] = [
    { id: 'REQ-POD-001', requesterName: 'Andi', department: 'Sales', requestDate: '2024-03-20', roomType: 'Single Bed', status: 'Pending' },
];

export const MOCK_LOCKER_DATA: LockerRecord[] = [
    { id: 'LOC-001', lockerNumber: 'L-001', floor: 'Lantai 1', area: 'Lobby', assignedTo: 'Budi', status: 'Terisi', spareKeyStatus: 'Ada', lastAuditDate: '2024-03-01' },
];

export const MOCK_LOCKER_REQUEST_DATA: LockerRequestRecord[] = [
    { id: 'REQ-LOC-001', requesterName: 'Siti', department: 'Finance', requestDate: '2024-03-21', reason: 'Need locker', status: 'Pending' },
];

export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [
    { id: 'LOG-001', tanggalKunjungan: '2024-03-25', jamDatang: '09:00', lokasiModena: 'Head Office', kategoriTamu: 'Visitor', namaTamu: 'Tamu A', wanita: 1, lakiLaki: 0, anakAnak: 0 },
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [
    { id: 'TS-001', employee: { name: 'Cleaner A', role: 'Cleaner', avatar: 'https://via.placeholder.com/150' }, location: 'Head Office', area: 'Lobby', date: '2024-03-25', shift: 'Pagi', clockIn: '07:00', clockOut: '16:00', status: 'Tepat Waktu' },
];

export const MOCK_VENDOR_DATA: VendorRecord[] = [
    { id: 1, vendorName: 'PT Vendor Jaya', vendorCode: 'V-001', type: 'Goods', category: 'ATK', email: 'vendor@example.com', phone: '021-123456', address: 'Jakarta', status: 'Active' },
];

export const MOCK_USER_DATA: UserRecord[] = [
    { id: 'USR-001', name: 'Admin', role: 'Administrator', status: 'Active', avatar: 'https://via.placeholder.com/150' },
];

export const MOCK_GENERAL_MASTER_DATA: GeneralMasterItem[] = []; 
export const MOCK_BRAND_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Toyota' }, { id: 2, name: 'Honda' }];
export const MOCK_COLOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Hitam' }, { id: 2, name: 'Putih' }];
export const MOCK_BUILDING_ASSETS: BuildingAssetRecord[] = [
    { id: 'AST-AC-001', assetCode: 'AC-001', assetName: 'AC Split', assetType: 'AC', buildingName: 'Head Office', floor: '1', roomName: 'Lobby', status: 'Good', approvalStatus: 'Approved' }
];

export const MOCK_PPN_DATA: GeneralMasterItem[] = [{ id: 1, name: '11%' }];
export const MOCK_BRAND_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Vehicle' }, { id: 2, name: 'Electronics' }];
export const MOCK_VEHICLE_MODEL_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Avanza' }, { id: 2, name: 'Innova' }];
export const MOCK_BUILDING_COMPONENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Roof' }, { id: 2, name: 'Wall' }];
export const MOCK_DOC_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'STNK' }, { id: 2, name: 'KIR' }];
export const MOCK_UTILITY_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Listrik' }, { id: 2, name: 'Air' }];
export const MOCK_OPERATOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Telkomsel' }, { id: 2, name: 'Indosat' }];
export const MOCK_ASSET_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Monitor' }];
export const MOCK_DEPARTMENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'IT' }, { id: 2, name: 'HR' }];
export const MOCK_LOCATION_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Head Office' }, { id: 2, name: 'Warehouse' }];
export const MOCK_UOM_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pcs' }, { id: 2, name: 'Unit' }, { id: 3, name: 'Box' }];
export const MOCK_BUILDING_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Office' }, { id: 2, name: 'Store' }];
export const MOCK_COST_CENTER_DATA: GeneralMasterItem[] = [{ id: 1, name: 'CC-001' }];
export const MOCK_ASSET_CATEGORY_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Fixed Asset' }];
export const MOCK_TAX_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pajak Kendaraan' }];
export const MOCK_PAYMENT_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Transfer' }, { id: 2, name: 'Cash' }];
export const MOCK_SERVICE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Regular' }, { id: 2, name: 'Repair' }];
export const MOCK_MUTATION_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Pending' }, { id: 2, name: 'Approved' }];
export const MOCK_SALES_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Open' }, { id: 2, name: 'Closed' }];
export const MOCK_REQUEST_STATUS_DATA: GeneralMasterItem[] = [{ id: 1, name: 'New' }, { id: 2, name: 'Processed' }];
export const MOCK_MUTATION_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Permanent' }, { id: 2, name: 'Temporary' }];
export const MOCK_VENDOR_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Supplier' }, { id: 2, name: 'Contractor' }];
export const MOCK_ROLE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }];
export const MOCK_VEHICLE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'Passenger' }, { id: 2, name: 'Commercial' }];
export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Writing' }, { id: 2, name: 'Paper' }];
export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [{ id: 1, name: 'Cleaning' }, { id: 2, name: 'Pantry' }];
export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [{ id: 1, name: 'Front Desk', type: 'Internal', status: 'Active' }];

export const MOCK_STOCK_OPNAME_DATA: StockOpnameRecord[] = [
    { 
        id: '1', 
        opnameId: 'SO-HO-001', 
        date: '2024-03-25', 
        itemCode: 'ATK-001', 
        itemName: 'Kertas A4 70gr', 
        category: 'ATK', 
        uom: 'Rim',
        systemQty: 50, 
        physicalQty: 50, 
        diff: 0, 
        performedBy: 'Ibnu Faisal', 
        status: 'MATCHED' 
    },
    { 
        id: '2', 
        opnameId: 'SO-HO-001', 
        date: '2024-03-25', 
        itemCode: 'ATK-004', 
        itemName: 'Ballpoint Pilot Black', 
        category: 'ATK', 
        uom: 'Pcs', 
        systemQty: 100, 
        physicalQty: 95, 
        diff: -5, 
        performedBy: 'Ibnu Faisal', 
        status: 'DISCREPANCY' 
    },
    { 
        id: '3', 
        opnameId: 'SO-HO-002', 
        date: '2024-03-24', 
        itemCode: 'ARK-001', 
        itemName: 'Pembersih Lantai', 
        category: 'ARK', 
        uom: 'Galon', 
        systemQty: 20, 
        physicalQty: 20, 
        diff: 0, 
        performedBy: 'Budi Santoso', 
        status: 'MATCHED' 
    },
    { 
        id: '4', 
        opnameId: 'SO-HO-002', 
        date: '2024-03-24', 
        itemCode: 'ARK-005', 
        itemName: 'Tissue Roll', 
        category: 'ARK', 
        uom: 'Pack', 
        systemQty: 45, 
        physicalQty: 50, 
        diff: 5, 
        performedBy: 'Budi Santoso', 
        status: 'DISCREPANCY' 
    }
];
