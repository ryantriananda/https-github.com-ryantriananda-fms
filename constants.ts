
import { AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem, UserRecord, BuildingAssetRecord, BuildingMaintenanceRecord, UtilityRecord, GeneralAssetRecord, VendorRecord, TimesheetRecord } from './types';

// ... (Existing MOCK_BUILDING_DATA and others remain unchanged)

// Mock Data for Cleaning Service Timesheet
export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [
    {
        id: 1,
        employee: {
            name: 'Siti Aminah',
            role: 'Cleaning Service',
            phone: '0812-3333-4444',
            avatar: 'https://picsum.photos/id/1011/100/100'
        },
        date: '2024-03-10',
        location: 'Jakarta Head Office',
        area: 'Lobby & Resepsionis',
        shift: 'Pagi',
        clockIn: '06:45',
        clockOut: '15:00',
        status: 'Tepat Waktu',
        tasks: ['Mopping Lantai', 'Dusting Furniture', 'Membersihkan Kaca', 'Membuang Sampah'],
        photos: ['https://picsum.photos/id/1015/200/200', 'https://picsum.photos/id/1016/200/200']
    },
    {
        id: 2,
        employee: {
            name: 'Budi Santoso',
            role: 'Cleaning Service',
            phone: '0811-1111-2222',
            avatar: 'https://picsum.photos/id/1012/100/100'
        },
        date: '2024-03-10',
        location: 'Jakarta Head Office',
        area: 'Toilet Lt 1 & 2',
        shift: 'Pagi',
        clockIn: '06:55',
        clockOut: '15:05',
        status: 'Tepat Waktu',
        tasks: ['Pembersihan Kloset', 'Isi Ulang Sabun & Tissue', 'Mopping Lantai'],
        photos: ['https://picsum.photos/id/1018/200/200']
    },
    {
        id: 3,
        employee: {
            name: 'Agus Setiawan',
            role: 'Cleaning Service',
            phone: '0813-5555-6666',
            avatar: 'https://picsum.photos/id/1025/100/100'
        },
        date: '2024-03-10',
        location: 'Warehouse Cakung',
        area: 'Area Gudang Utama',
        shift: 'Siang',
        clockIn: '13:10',
        clockOut: '21:00',
        status: 'Terlambat',
        tasks: ['Sapu Area Loading', 'Membersihkan Rak'],
        photos: []
    }
];

export const MOCK_BUILDING_DATA: BuildingRecord[] = [
// ... (Keep existing MOCK_BUILDING_DATA content)
    {
        id: '1',
        name: 'MODENA Experience Center Satrio',
        assetNo: 'BDG-JKT-HO-001',
        type: 'Showroom & Office',
        ownership: 'Rent',
        location: 'Jakarta Selatan',
        address: 'Jl. Prof. DR. Satrio No. C4, Kuningan',
        status: 'Open',
        startDate: '2024-01-01',
        endDate: '2028-12-31',
        proposals: [],
        workflow: [
            { role: 'BM', status: 'Approved', date: '2023-11-01', approver: 'Branch Manager JKT' },
            { role: 'Regional Branches', status: 'Approved', date: '2023-11-05', approver: 'Regional Head' },
            { role: 'AVP Dealership', status: 'Approved', date: '2023-11-10', approver: 'AVP Sales' },
            { role: 'Owner', status: 'Approved', date: '2023-11-15', approver: 'Owner' }
        ],
        currentWorkflowStep: 3,
        isLeaseProposalFilled: true
    }
];

export const MOCK_BUILDING_ASSETS: BuildingAssetRecord[] = [
// ... (Keep existing MOCK_BUILDING_ASSETS content)
    {
        id: 'ASSET-001',
        assetCode: 'AC-HO-001',
        assetType: 'AC',
        assetName: 'AC SPLIT MEC 1',
        brand: 'Panasonic',
        modelNumber: 'CS-PU9XKP',
        buildingName: 'Head Office Satrio',
        floor: 'Lantai 2',
        roomName: 'Ruang Meeting GA',
        maintenanceFrequency: 'Quarterly',
        status: 'Good',
        approvalStatus: 'Approved',
        ownership: 'Own'
    },
    {
        id: 'ASSET-002',
        assetCode: 'LIFT-HO-01',
        assetType: 'Lift',
        assetName: 'Passenger Lift A',
        brand: 'Schindler',
        buildingName: 'Head Office Satrio',
        floor: 'All Floors',
        roomName: 'Main Lobby',
        maintenanceFrequency: 'Monthly',
        status: 'Fair',
        approvalStatus: 'Pending Approval',
        ownership: 'Own'
    },
    {
        id: 'ASSET-003',
        assetCode: 'CCTV-CKG-12',
        assetType: 'CCTV',
        assetName: 'IP Camera Outdoor 4MP',
        brand: 'Hikvision',
        buildingName: 'Warehouse Cakung',
        floor: 'Ground',
        roomName: 'Loading Dock B',
        maintenanceFrequency: 'Yearly',
        status: 'Good',
        approvalStatus: 'Revised',
        ownership: 'Own'
    },
    {
        id: 'ASSET-004',
        assetCode: 'GEN-HO-01',
        assetType: 'Genset',
        assetName: 'Backup Generator 500KVA',
        brand: 'Cummins',
        buildingName: 'Head Office Satrio',
        floor: 'Basement',
        roomName: 'Power House',
        maintenanceFrequency: 'Monthly',
        status: 'Maintenance',
        approvalStatus: 'Rejected',
        ownership: 'Own'
    }
];

export const MOCK_BUILDING_MAINTENANCE_DATA: BuildingMaintenanceRecord[] = [
// ... (Keep existing data)
    {
        id: 'MNT-2024-001',
        requestDate: '2024-02-15',
        assetId: 'ASSET-001',
        assetName: 'AC SPLIT MEC 1',
        buildingLocation: 'Head Office Satrio - Lantai 2',
        maintenanceType: 'Preventive',
        description: 'Cuci AC Rutin 3 Bulanan',
        vendor: 'PT. Cool Technic',
        cost: '150000',
        status: 'Completed',
        approvalStatus: 'Approved'
    },
    {
        id: 'MNT-2024-002',
        requestDate: '2024-02-20',
        assetId: 'ASSET-004',
        assetName: 'Backup Generator 500KVA',
        buildingLocation: 'Head Office Satrio - Basement',
        maintenanceType: 'Corrective',
        description: 'Penggantian Filter Oli & Solar',
        vendor: 'PT. Power Gen',
        cost: '2500000',
        status: 'In Progress',
        approvalStatus: 'Approved'
    },
    {
        id: 'MNT-2024-003',
        requestDate: '2024-02-25',
        assetId: 'ASSET-002',
        assetName: 'Passenger Lift A',
        buildingLocation: 'Head Office Satrio',
        maintenanceType: 'Corrective',
        description: 'Bunyi kasar pada pintu lift, perlu pengecekan bearing',
        vendor: 'Schindler',
        cost: '5000000',
        status: 'Scheduled',
        approvalStatus: 'Pending Approval'
    }
];

export const MOCK_BRANCH_IMPROVEMENT_DATA: BuildingRecord[] = [
// ... (Keep existing data)
    {
        id: 'BI-2024-001',
        name: 'MODENA Home Center Bintaro',
        assetNo: 'REQ-BI-BTR-01',
        type: 'MHC',
        ownership: 'Rent',
        location: 'Tangerang Selatan',
        address: 'Jl. Bintaro Utama 3A, Sektor 5',
        status: 'Pending',
        channel: 'Direct',
        department: 'Sales',
        assetValue: '0',
        rentCost: '250000000',
        startDate: '2024-06-01',
        endDate: '2029-06-01',
        proposals: [
            {
                id: 'PROP-01',
                name: 'Kandidat 1 - Ruko Kebayoran Arcade',
                address: { jl: 'Jl. Boulevard Bintaro Jaya', kota: 'Tangsel', kabupaten: 'Tangerang', propinsi: 'Banten' },
                phoneLines: '2',
                electricity: '16500',
                water: 'PAM',
                landArea: '120',
                buildingArea: '240',
                frontYardArea: '20',
                fenceCondition: 'Good',
                fenceHeight: '2m',
                gateCondition: 'Good',
                gateHeight: '2m',
                parkingCapacity: '3',
                securityFeatures: ['Security Area Wilayah', 'CCTV'],
                floors: { ground: '60', f1: '60', f2: '60', f3: '60', f4: '0' },
                totalFloors: '3',
                structureChecklist: {
                    tiang: ['Beton'],
                    dinding: ['Bata'],
                    lantai: ['Keramik']
                },
                buildingAge: '<5 tahun',
                leaseNature: 'Baru',
                leasePurpose: 'Showroom',
                documents: ['SHM', 'IMB'],
                renovationNeeded: true,
                renovationCostEstimate: '50000000',
                renovationTimeEstimate: '30 Hari',
                renovationDetails: 'Pengecatan ulang dan sekat partisi',
                environmentConditions: ['Komplek Perkantoran', 'Terawat'],
                distanceToDealer: '5 KM',
                roadWidth: '8m',
                roadCondition: 'Aspal Baik',
                loadingDock: 'Truk Engkel',
                rentPrice: '250000000',
                leasePeriod: '5 Tahun',
                taxPPH: 'Pemilik',
                notaryFee: '50-50',
                owner: { name: 'Bpk. Hendra', phone: '0812345678', address: 'Jakarta' },
                surveySummary: { pros: 'Lokasi Strategis, Parkir Luas', cons: 'Harga sewa tinggi' }
            }
        ],
        workflow: [
            { role: 'BM', status: 'Pending' },
            { role: 'Regional Branches', status: 'Pending' },
            { role: 'AVP Dealership', status: 'Pending' },
            { role: 'Owner', status: 'Pending' }
        ],
        currentWorkflowStep: 0,
        isLeaseProposalFilled: false
    },
    {
        id: 'BI-2024-002',
        name: 'MODENA Logistics Hub Surabaya',
        assetNo: 'REQ-BI-SBY-09',
        type: 'Warehouse',
        ownership: 'Rent',
        location: 'Surabaya',
        address: 'Kawasan Industri Rungkut',
        status: 'On Progress',
        channel: 'Traditional',
        department: 'Logistics',
        assetValue: '0',
        rentCost: '450000000',
        startDate: '2024-05-01',
        endDate: '2027-05-01',
        proposals: [],
        workflow: [
            { role: 'BM', status: 'Approved', date: '2024-03-01', approver: 'Branch Manager SBY' },
            { role: 'Regional Branches', status: 'Pending' },
            { role: 'AVP Dealership', status: 'Pending' },
            { role: 'Owner', status: 'Pending' }
        ],
        currentWorkflowStep: 1,
        isLeaseProposalFilled: false
    },
];

// ... (Keep existing MOCK_DATA, MOCK_ARK_DATA, MOCK_USER_DATA, MOCK_MASTER_DATA, etc)
export const MOCK_DATA: AssetRecord[] = [
  {
    id: 1,
    transactionNumber: 'REQ-001234',
    employee: {
      name: 'Ibnu Faisal Abbas',
      role: 'Admin Facility',
      phone: '0812-3456-7890',
      avatar: 'https://picsum.photos/id/1005/100/100'
    },
    category: 'STATIONERY',
    itemName: 'Kertas A4 80gr',
    itemDescription: 'Permintaan rutin bulanan',
    qty: 10,
    date: '15/02/2024',
    remainingStock: 45,
    itemCode: 'PAP-A4-001',
    status: 'Approved'
  },
  {
    id: 2,
    transactionNumber: 'REQ-001235',
    employee: {
      name: 'Sarah Amelia',
      role: 'HR Specialist',
      phone: '0812-9876-5432',
      avatar: 'https://picsum.photos/id/1027/100/100'
    },
    category: 'STATIONERY',
    itemName: 'Pena Gel Hitam',
    itemDescription: 'Kebutuhan tim HR',
    qty: 24,
    date: '16/02/2024',
    remainingStock: 120,
    itemCode: 'PEN-GEL-002',
    status: 'Pending'
  }
]; 

export const MOCK_ARK_DATA: AssetRecord[] = [
  {
    id: 3,
    transactionNumber: 'REQ-ARK-001',
    employee: {
      name: 'Budi Santoso',
      role: 'Office Support',
      phone: '0811-1111-2222',
      avatar: 'https://picsum.photos/id/1012/100/100'
    },
    category: 'HOUSEHOLD',
    itemName: 'Tissue Roll',
    itemDescription: 'Restok toilet Lt. 3',
    qty: 50,
    date: '18/02/2024',
    remainingStock: 15,
    itemCode: 'TIS-ROL-001',
    status: 'On Progress'
  }
];

export const MOCK_USER_DATA: UserRecord[] = [
  {
    id: 'USR-001',
    name: 'Ibnu Faisal Abbas',
    email: 'ibnu.faisal@modena.com',
    role: 'Manager',
    department: 'GA & Facility',
    location: 'Jakarta Head Office',
    phone: '0812-3456-7890',
    status: 'Active',
    lastActive: '10 Min Ago',
    joinDate: '2022-01-15',
    employeeId: 'EMP-2022001',
    avatar: 'https://picsum.photos/id/1005/100/100'
  },
  {
    id: 'USR-002',
    name: 'Sarah Amelia',
    email: 'sarah.amelia@modena.com',
    role: 'Staff',
    department: 'Human Capital',
    location: 'Jakarta Head Office',
    phone: '0812-9876-5432',
    status: 'Active',
    lastActive: '1 Hour Ago',
    joinDate: '2023-05-10',
    employeeId: 'EMP-2023045',
    avatar: 'https://picsum.photos/id/1027/100/100'
  },
  {
    id: 'USR-003',
    name: 'Budi Santoso',
    email: 'budi.santoso@modena.com',
    role: 'Staff',
    department: 'GA & Facility',
    location: 'Warehouse Cakung',
    phone: '0811-1111-2222',
    status: 'Inactive',
    lastActive: '2 Days Ago',
    joinDate: '2021-11-20',
    employeeId: 'EMP-2021088',
    avatar: 'https://picsum.photos/id/1012/100/100'
  }
];

// ... (Rest of existing constants)
export const MOCK_MASTER_DATA: MasterItem[] = [
  { id: 1, category: 'STATIONERY', itemName: 'Kertas A4 80gr', itemCode: 'PAP-A4-001', uom: 'Rim', remainingStock: 45, minimumStock: 10, maximumStock: 100, requestedStock: 5, purchaseDate: '2024-01-10', lastPurchasePrice: 'Rp 45.000', averagePrice: 'Rp 44.500' },
  { id: 2, category: 'STATIONERY', itemName: 'Pena Gel Hitam', itemCode: 'PEN-GEL-002', uom: 'Box', remainingStock: 120, minimumStock: 20, maximumStock: 200, requestedStock: 0, purchaseDate: '2024-01-15', lastPurchasePrice: 'Rp 25.000', averagePrice: 'Rp 24.000' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
  { id: 101, category: 'HOUSEHOLD', itemName: 'Tissue Roll', itemCode: 'TIS-ROL-001', uom: 'Roll', remainingStock: 15, minimumStock: 20, maximumStock: 200, requestedStock: 50, purchaseDate: '2024-02-05', lastPurchasePrice: 'Rp 3.500', averagePrice: 'Rp 3.400' }
];

export const MOCK_UOM_DATA: GeneralMasterItem[] = [{id: 1, name: 'PCS'}, {id: 2, name: 'UNIT'}, {id: 3, name: 'RIM'}, {id: 4, name: 'ROLL'}];
export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [{id: 1, name: 'STATIONERY'}, {id: 2, name: 'INK & TONER'}];
export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [{id: 1, name: 'HOUSEHOLD'}, {id: 2, name: 'PANTRY'}];
export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [{ id: 1, name: 'MODENA Head Office', address: 'Jl. Prof Dr Satrio No 10', type: 'HO' }];

const today = new Date();
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
}

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
  {
    id: 'DOC-EXP-001',
    documentName: 'SHGB CERTIFICATE SATRIO',
    buildingName: 'HO SATRIO',
    assetNo: 'BDG-JKT-01',
    expiryDate: addDays(today, -5), // Expired
    daysRemaining: -5,
    status: 'Urgent'
  },
  {
    id: 'DOC-URG-002',
    documentName: 'FIRE SAFETY PERMIT',
    buildingName: 'WAREHOUSE CAKUNG',
    assetNo: 'BDG-CKG-05',
    expiryDate: addDays(today, 15), // < 1 Month
    daysRemaining: 15,
    status: 'Urgent'
  },
  {
    id: 'DOC-ATT-003',
    documentName: 'REKLAME BILLBOARD TAX',
    buildingName: 'MEC SURYO',
    assetNo: 'BDG-JKT-02',
    expiryDate: addDays(today, 45), // < 2 Months
    daysRemaining: 45,
    status: 'Warning'
  },
  {
    id: 'DOC-WARN-004',
    documentName: 'RENTAL AGREEMENT',
    buildingName: 'MHC BINTARO',
    assetNo: 'BDG-TNG-01',
    expiryDate: addDays(today, 80), // < 3 Months
    daysRemaining: 80,
    status: 'Warning'
  },
  {
    id: 'DOC-UPC-005',
    documentName: 'INSURANCE POLICY',
    buildingName: 'HO SATRIO',
    assetNo: 'BDG-JKT-01',
    expiryDate: addDays(today, 150), // < 6 Months
    daysRemaining: 150,
    status: 'Safe'
  },
  {
    id: 'DOC-SAFE-006',
    documentName: 'DOMISILI PERUSAHAAN',
    buildingName: 'WAREHOUSE MAKASSAR',
    assetNo: 'BDG-MKS-01',
    expiryDate: addDays(today, 300), // > 6 Months
    daysRemaining: 300,
    status: 'Safe'
  }
];

export const MOCK_MAINTENANCE_REMINDER: ReminderRecord[] = [
  {
    id: 'MAINT-2024-001',
    documentName: 'AC CHILLER SERVIS',
    buildingName: 'HO SATRIO - LT 1',
    assetNo: 'AC-CHL-001',
    expiryDate: addDays(today, 5), // Critical
    daysRemaining: 5,
    status: 'Urgent'
  },
  {
    id: 'MAINT-2024-002',
    documentName: 'GENSET 500KVA INSPEKSI',
    buildingName: 'WAREHOUSE CAKUNG',
    assetNo: 'GNS-CKG-01',
    expiryDate: addDays(today, 55), // Attention
    daysRemaining: 55,
    status: 'Safe'
  }
];

// Utility Mock Data
export const MOCK_UTILITY_DATA: UtilityRecord[] = [
    {
        id: 'UTIL-2024-001',
        period: 'Februari 2024',
        date: '2024-02-28',
        location: 'Head Office Satrio',
        type: 'Listrik (PLN)',
        meterStart: 124500,
        meterEnd: 125800,
        usage: 1300,
        unit: 'kWh',
        cost: '21500000',
        status: 'Paid',
        recordedBy: 'Agus Teknisi'
    },
    {
        id: 'UTIL-2024-002',
        period: 'Februari 2024',
        date: '2024-02-28',
        location: 'Warehouse Cakung',
        type: 'Listrik (PLN)',
        meterStart: 45000,
        meterEnd: 46200,
        usage: 1200,
        unit: 'kWh',
        cost: '19800000',
        status: 'Pending Review',
        recordedBy: 'Budi Santoso'
    },
    {
        id: 'UTIL-2024-003',
        period: 'Februari 2024',
        date: '2024-02-28',
        location: 'Head Office Satrio',
        type: 'Air (PDAM)',
        meterStart: 3400,
        meterEnd: 3450,
        usage: 50,
        unit: 'm3',
        cost: '750000',
        status: 'Paid',
        recordedBy: 'Agus Teknisi'
    }
];

// ... (Other existing mocks)
export const MOCK_VEHICLE_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'MPV' }, { id: 2, name: 'SUV' }, { id: 3, name: 'SEDAN' }, { id: 4, name: 'PICKUP' }, { id: 5, name: 'MOTORCYCLE' }];
export const MOCK_ASSET_CATEGORY_DATA: GeneralMasterItem[] = [{ id: 1, name: 'FURNITURE' }, { id: 2, name: 'ELECTRONICS' }, { id: 3, name: 'VEHICLE' }, { id: 4, name: 'MACHINERY' }, { id: 5, name: 'IT HARDWARE' }, { id: 6, name: 'BUILDING' }];
export const MOCK_LOCATION_DATA: GeneralMasterItem[] = [{ id: 1, name: 'JAKARTA HEAD OFFICE' }, { id: 2, name: 'SURABAYA BRANCH' }, { id: 3, name: 'MEDAN BRANCH' }, { id: 4, name: 'BANDUNG BRANCH' }, { id: 5, name: 'MAKASSAR BRANCH' }, { id: 6, name: 'WAREHOUSE CAKUNG' }];
export const MOCK_DEPARTMENT_DATA: GeneralMasterItem[] = [{ id: 1, name: 'HRGA' }, { id: 2, name: 'IT' }, { id: 3, name: 'FINANCE' }, { id: 4, name: 'OPERATION' }, { id: 5, name: 'SALES' }, { id: 6, name: 'MARKETING' }];
export const MOCK_UOM_MASTER_DATA: GeneralMasterItem[] = [{ id: 1, name: 'PCS' }, { id: 2, name: 'UNIT' }, { id: 3, name: 'SET' }, { id: 4, name: 'BOX' }, { id: 5, name: 'PACK' }, { id: 6, name: 'RIM' }];
export const MOCK_BRAND_DATA: GeneralMasterItem[] = [{ id: 1, name: 'TOYOTA' }, { id: 2, name: 'HONDA' }, { id: 3, name: 'DAIHATSU' }, { id: 4, name: 'SAMSUNG' }, { id: 5, name: 'DELL' }, { id: 6, name: 'DAIKIN' }, { id: 7, name: 'PANASONIC' }];
export const MOCK_COST_CENTER_DATA: GeneralMasterItem[] = [{ id: 1, name: 'CC-001 (HEAD OFFICE)' }, { id: 2, name: 'CC-002 (SALES DEPT)' }, { id: 3, name: 'CC-003 (MARKETING)' }, { id: 4, name: 'CC-004 (LOGISTICS)' }, { id: 5, name: 'CC-005 (IT)' }];
export const MOCK_COLOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'HITAM' }, { id: 2, name: 'PUTIH' }, { id: 3, name: 'SILVER' }, { id: 4, name: 'ABU-ABU' }, { id: 5, name: 'MERAH' }, { id: 6, name: 'BIRU' }];
export const MOCK_BUILDING_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'OFFICE' }, { id: 2, name: 'WAREHOUSE' }, { id: 3, name: 'SHOWROOM' }, { id: 4, name: 'MHC (MODENA HOME CENTER)' }, { id: 5, name: 'MEC (MODENA EXPERIENCE CENTER)' }];
export const MOCK_GENERAL_ASSET_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'LAPTOP' }, { id: 2, name: 'MONITOR' }, { id: 3, name: 'PRINTER' }, { id: 4, name: 'MEJA KERJA' }, { id: 5, name: 'KURSI KERJA' }, { id: 6, name: 'LEMARI ARSIP' }, { id: 7, name: 'AC SPLIT' }];
export const MOCK_PPN_DATA: GeneralMasterItem[] = [{ id: 1, name: '11%' }, { id: 2, name: '12%' }, { id: 3, name: '0%' }];
export const MOCK_BRAND_TYPE_DATA: GeneralMasterItem[] = [{ id: 1, name: 'LOCAL' }, { id: 2, name: 'IMPORT' }, { id: 3, name: 'OEM' }];
export const MOCK_OPERATOR_DATA: GeneralMasterItem[] = [{ id: 1, name: 'TELKOMSEL' }, { id: 2, name: 'XL' }, { id: 3, name: 'INDOSAT' }];
export const MOCK_GENERAL_MASTER_DATA = { jenisPajak: [{id: 1, name: 'STNK 1 TAHUN'}, {id: 2, name: 'STNK 5 TAHUN'}], jenisPembayaran: [{id: 1, name: 'KASBON'}, {id: 2, name: 'REIMBURSE'}], jenisServis: [{id: 1, name: 'SERVIS RUTIN'}, {id: 2, name: 'GANTI BAN'}], statusMutasi: [{id: 1, name: 'PENDING'}, {id: 2, name: 'APPROVED'}, {id: 3, name: 'REJECTED'}], statusPenjualan: [{id: 1, name: 'OPEN BIDDING'}, {id: 2, name: 'SOLD'}], statusRequest: [{id: 1, name: 'DRAFT'}, {id: 2, name: 'SUBMITTED'}], tipeMutasi: [{id: 1, name: 'PERMANENT'}, {id: 2, name: 'TEMPORARY'}], tipeVendor: [{id: 1, name: 'SUPPLIER'}, {id: 2, name: 'SERVICE PROVIDER'}], peran: [{id: 1, name: 'ADMIN'}, {id: 2, name: 'USER'}, {id: 3, name: 'MANAGER'}] };
export const MOCK_VEHICLE_DATA: VehicleRecord[] = [{ id: 1, noRegistrasi: 'AST-HO-001', nama: 'TOYOTA AVANZA 1.3 G', noPolisi: 'B 1234 ABC', channel: 'HCO', cabang: 'Jakarta', status: 'Aktif', ownership: 'Milik Modena', merek: 'TOYOTA', tahunPembuatan: '2022', approvalStatus: 'Approved'}, { id: 2, noRegistrasi: 'RNT-SBY-001', nama: 'HONDA HRV E CVT', noPolisi: 'B 5678 DEF', channel: 'Management', cabang: 'Surabaya', status: 'Aktif', ownership: 'Sewa', merek: 'HONDA', tahunPembuatan: '2023', approvalStatus: 'Pending'}];
export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [{ id: 'CTR-001', noKontrak: 'KTR/MDC/2024/001', noPolisi: 'B 1234 ABC', aset: 'TOYOTA AVANZA 1.3 G', vendor: 'PT. TRAC ASTRA', tglMulai: '2024-01-01', tglBerakhir: '2025-01-01', biayaSewa: '5500000', status: 'Aktif', keterangan: 'Rental tahunan unit operasional', approvalStatus: 'Approved' }, { id: 'CTR-002', noKontrak: 'KTR/MDC/2024/002', noPolisi: 'B 5678 DEF', aset: 'HONDA HRV', vendor: 'MPMRent', tglMulai: '2024-02-01', tglBerakhir: '2025-02-01', biayaSewa: '8500000', status: 'Aktif', approvalStatus: 'Pending' }];
export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [{ id: 'TAX-001', noPolisi: 'B 1234 ABC', tglRequest: '2024-03-01', jenis: 'Pajak STNK', channel: 'HCO', cabang: 'Jakarta', status: 'Proses', statusApproval: 'Pending', estimasiBiaya: '3500000' }];
export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [];
export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [];
export const MOCK_GENERAL_ASSET_DATA: GeneralAssetRecord[] = [{ id: 'GA-001', assetNumber: 'AST-GEN-001', assetCategory: 'Furniture', ownership: 'Own', type: 'Office Desk', assetLocation: 'Jakarta', channel: 'Direct', department: 'HRGA', subLocation: 'Lantai 2 - HR Room', address: 'Jl. Prof. DR. Satrio No. C4', approvalStatus: 'Approved' }, { id: 'GA-002', assetNumber: 'AST-GEN-002', assetCategory: 'Electronic', ownership: 'Rent', type: 'Coffee Machine', assetLocation: 'Surabaya', channel: 'Indirect', department: 'Operation', subLocation: 'Pantry', address: 'Jl. Mayjen Sungkono No. 10', approvalStatus: 'Pending' }];
export const MOCK_IT_ASSET_DATA: GeneralAssetRecord[] = [{ id: 'IT-001', assetNumber: 'AST-IT-001', assetCategory: 'Hardware', ownership: 'Own', type: 'Laptop', assetLocation: 'Jakarta', channel: 'Direct', department: 'IT', subLocation: 'IT Room', address: 'Jl. Prof. DR. Satrio No. C4', approvalStatus: 'Approved' }, { id: 'IT-002', assetNumber: 'AST-IT-002', assetCategory: 'Peripheral', ownership: 'Own', type: 'Monitor', assetLocation: 'Jakarta', channel: 'Direct', department: 'IT', subLocation: 'Server Room', address: 'Jl. Prof. DR. Satrio No. C4', approvalStatus: 'Pending' }];
export const MOCK_VENDOR_DATA: VendorRecord[] = [{ id: 1, vendorName: 'PT. ATK Jaya Abadi', vendorCode: 'VND-001', type: 'Goods', category: 'Office Supplies', email: 'sales@atkjaya.com', phone: '021-5551234', address: 'Jl. Fatmawati No. 10, Jakarta Selatan', status: 'Active', picName: 'Budi Santoso' }, { id: 2, vendorName: 'CV. Service Komputer Handal', vendorCode: 'VND-002', type: 'Service', category: 'IT Maintenance', email: 'support@servicehandal.com', phone: '0812-9988-7766', address: 'Ruko Mangga Dua Square Blok A', status: 'Active', picName: 'Andi Wijaya' }, { id: 3, vendorName: 'PT. Cleaning Service Prima', vendorCode: 'VND-003', type: 'Service', category: 'Facility Management', email: 'info@cleaningprima.com', phone: '021-7778889', address: 'Jl. Sudirman Kav 50, Jakarta Pusat', status: 'Inactive', picName: 'Siti Aminah' }];
