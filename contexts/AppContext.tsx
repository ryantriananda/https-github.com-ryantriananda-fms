import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  MOCK_VEHICLE_DATA,
  MOCK_TAX_KIR_DATA,
  MOCK_MASTER_VENDOR_DATA,
  MOCK_VEHICLE_CONTRACT_DATA,
  MOCK_BUILDING_DATA,
  MOCK_BUILDING_ASSETS,
  MOCK_IT_BUILDING_ASSETS,
  MOCK_CS_BUILDING_ASSETS,
  MOCK_BUILDING_MAINTENANCE_DATA,
  MOCK_BRANCH_IMPROVEMENT_DATA,
  MOCK_UTILITY_DATA,
  MOCK_REMINDER_DATA,
  MOCK_MAINTENANCE_REMINDER,
  MOCK_GENERAL_MASTER_DATA,
  MOCK_DATA as MOCK_ATK_DATA,
  MOCK_ARK_DATA,
  MOCK_MASTER_DATA as MOCK_ATK_MASTER,
  MOCK_MASTER_ARK_DATA,
  MOCK_LOGBOOK_DATA,
  MOCK_DELIVERY_LOCATIONS,
  MOCK_USER_DATA,
  MOCK_VEHICLE_TYPE_DATA,
  MOCK_ASSET_CATEGORY_DATA,
  MOCK_LOCATION_DATA,
  MOCK_DEPARTMENT_DATA,
  MOCK_UOM_MASTER_DATA,
  MOCK_BRAND_DATA,
  MOCK_COST_CENTER_DATA,
  MOCK_GENERAL_ASSET_DATA,
  MOCK_COLOR_DATA,
  MOCK_BUILDING_TYPE_DATA,
  MOCK_GENERAL_ASSET_TYPE_DATA,
  MOCK_PPN_DATA,
  MOCK_BRAND_TYPE_DATA,
  MOCK_OPERATOR_DATA,
  MOCK_VENDOR_DATA,
  MOCK_TIMESHEET_DATA,
  MOCK_SERVICE_DATA,
  MOCK_MUTATION_DATA,
  MOCK_SALES_DATA,
  MOCK_INSURANCE_DATA,
  MOCK_MAINTENANCE_SCHEDULE_DATA,
  MOCK_VEHICLE_REMINDER_DATA,
} from '../constants';
import {
  VehicleRecord,
  ServiceRecord,
  TaxKirRecord,
  VehicleContractRecord,
  BuildingRecord,
  BuildingAssetRecord,
  BuildingMaintenanceRecord,
  UtilityRecord,
  ReminderRecord,
  GeneralMasterItem,
  AssetRecord,
  LogBookRecord,
  MasterItem,
  DeliveryLocationRecord,
  UserRecord,
  MutationRecord,
  SalesRecord,
  GeneralAssetRecord,
  MasterVendorRecord,
  VendorRecord,
  MasterApprovalRecord,
  TimesheetRecord,
  InsuranceRecord,
  MaintenanceScheduleRecord,
  VehicleReminderRecord,
} from '../types';

// Helper for LocalStorage Persistence
const getInitialData = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const MOCK_MASTER_APPROVAL_DATA: MasterApprovalRecord[] = [
  // Vehicle Management
  {
    id: '1',
    module: 'Vehicle Request (Pengajuan Baru)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Branch Manager', sla: 2 },
      { level: 2, type: 'Role', value: 'Regional Head', sla: 3 },
      { level: 3, type: 'Role', value: 'Head of GA', sla: 5 },
    ],
    updatedAt: '2024-03-01',
  },
  {
    id: '2',
    module: 'Vehicle Service Request (Servis)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Branch Manager', sla: 2 },
    ],
    updatedAt: '2024-03-01',
  },
  {
    id: '3',
    module: 'Vehicle Mutation (Mutasi)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Head of GA', sla: 3 },
    ],
    updatedAt: '2024-03-01',
  },
  {
    id: '4',
    module: 'Vehicle Disposal (Penjualan)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Head of GA', sla: 2 },
      { level: 3, type: 'Role', value: 'Director', sla: 5 },
    ],
    updatedAt: '2024-03-01',
  },
  {
    id: '5',
    module: 'Vehicle Contract (Sewa)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Finance Manager', sla: 2 },
    ],
    updatedAt: '2024-03-01',
  },
  // ATK/ARK
  {
    id: '6',
    module: 'Stationery Request (Permintaan ATK)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Head of GA', sla: 2 },
    ],
    updatedAt: '2024-03-05',
  },
  {
    id: '7',
    module: 'Household Request (Permintaan ARK)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Head of GA', sla: 2 },
    ],
    updatedAt: '2024-03-05',
  },
  // Building & Facility
  {
    id: '8',
    module: 'New Building Request (Sewa/Beli)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Head of GA', sla: 3 },
      { level: 3, type: 'Role', value: 'Director', sla: 5 },
    ],
    updatedAt: '2024-03-10',
  },
  {
    id: '9',
    module: 'Building Maintenance Request',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Branch Manager', sla: 2 },
    ],
    updatedAt: '2024-03-10',
  },
  {
    id: '10',
    module: 'Branch Improvement Request',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Head of GA', sla: 3 },
      { level: 3, type: 'Role', value: 'Director', sla: 5 },
    ],
    updatedAt: '2024-03-10',
  },
  {
    id: '11',
    module: 'Utility Payment Approval',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Finance Manager', sla: 2 },
    ],
    updatedAt: '2024-03-10',
  },
  // General Assets
  {
    id: '12',
    module: 'General Asset Request (Furniture/etc)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Head of GA', sla: 2 },
    ],
    updatedAt: '2024-03-10',
  },
  {
    id: '13',
    module: 'IT Asset Request (Laptop/Devices)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin IT', sla: 1 },
      { level: 2, type: 'Role', value: 'IT Manager', sla: 2 },
    ],
    updatedAt: '2024-03-10',
  },
  // Employee Facilities
  {
    id: '14',
    module: 'Permintaan POD (Sewa Kos)',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'HR Manager', sla: 2 },
    ],
    updatedAt: '2024-03-10',
  },
  {
    id: '15',
    module: 'Permintaan Loker',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
    ],
    updatedAt: '2024-03-10',
  },
  // Administrative
  {
    id: '16',
    module: 'Vendor Registration Approval',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
      { level: 2, type: 'Role', value: 'Finance Manager', sla: 2 },
    ],
    updatedAt: '2024-03-10',
  },
  {
    id: '17',
    module: 'New User Registration',
    branch: 'All Branches',
    tiers: [
      { level: 1, type: 'Role', value: 'HR Manager', sla: 1 },
      { level: 2, type: 'Role', value: 'IT Manager', sla: 2 },
    ],
    updatedAt: '2024-03-10',
  },
];

const MOCK_GA_SALES_DATA: SalesRecord[] = [
  {
    id: 'SALE-GA-001',
    assetType: 'GENERAL_ASSET',
    assetNumber: 'AST-GEN-001',
    assetName: 'Office Desk - HR Room',
    tglRequest: '2024-03-15',
    channel: 'Direct',
    cabang: 'Jakarta',
    hargaTertinggi: '1.200.000',
    hargaPembuka: '1.000.000',
    status: 'Open Bidding',
    statusApproval: 'Approved',
    bids: [],
  },
];

const MOCK_GA_MUTATION_DATA: MutationRecord[] = [
  {
    id: 'MUT-GA-001',
    assetType: 'GENERAL_ASSET',
    assetNumber: 'AST-GEN-002',
    assetName: 'Coffee Machine',
    cabangAset: 'Surabaya',
    tipeMutasi: 'Permanent',
    tglPermintaan: '2024-03-20',
    lokasiAsal: 'Surabaya Branch - Pantry',
    lokasiTujuan: 'MEC Surabaya - Lounge',
    picBefore: 'Siti Aminah',
    picAfter: 'Andi Staff',
    status: 'Pending',
    statusApproval: 'Pending',
  },
];

interface AppContextType {
  // Data States
  vehicleData: VehicleRecord[];
  setVehicleData: React.Dispatch<React.SetStateAction<VehicleRecord[]>>;
  buildingData: BuildingRecord[];
  setBuildingData: React.Dispatch<React.SetStateAction<BuildingRecord[]>>;
  buildingAssetData: BuildingAssetRecord[];
  setBuildingAssetData: React.Dispatch<React.SetStateAction<BuildingAssetRecord[]>>;
  itBuildingData: BuildingAssetRecord[];
  setItBuildingData: React.Dispatch<React.SetStateAction<BuildingAssetRecord[]>>;
  csBuildingData: BuildingAssetRecord[];
  setCsBuildingData: React.Dispatch<React.SetStateAction<BuildingAssetRecord[]>>;
  buildingMaintenanceData: BuildingMaintenanceRecord[];
  setBuildingMaintenanceData: React.Dispatch<React.SetStateAction<BuildingMaintenanceRecord[]>>;
  utilityData: UtilityRecord[];
  setUtilityData: React.Dispatch<React.SetStateAction<UtilityRecord[]>>;
  serviceData: ServiceRecord[];
  setServiceData: React.Dispatch<React.SetStateAction<ServiceRecord[]>>;
  taxKirData: TaxKirRecord[];
  setTaxKirData: React.Dispatch<React.SetStateAction<TaxKirRecord[]>>;
  vehicleContractData: VehicleContractRecord[];
  setVehicleContractData: React.Dispatch<React.SetStateAction<VehicleContractRecord[]>>;
  masterVendorData: MasterVendorRecord[];
  setMasterVendorData: React.Dispatch<React.SetStateAction<MasterVendorRecord[]>>;
  vendorData: VendorRecord[];
  setVendorData: React.Dispatch<React.SetStateAction<VendorRecord[]>>;
  logBookData: LogBookRecord[];
  setLogBookData: React.Dispatch<React.SetStateAction<LogBookRecord[]>>;
  userData: UserRecord[];
  setUserData: React.Dispatch<React.SetStateAction<UserRecord[]>>;
  timesheetData: TimesheetRecord[];
  setTimesheetData: React.Dispatch<React.SetStateAction<TimesheetRecord[]>>;
  mutationData: MutationRecord[];
  setMutationData: React.Dispatch<React.SetStateAction<MutationRecord[]>>;
  gaMutationData: MutationRecord[];
  setGaMutationData: React.Dispatch<React.SetStateAction<MutationRecord[]>>;
  salesData: SalesRecord[];
  setSalesData: React.Dispatch<React.SetStateAction<SalesRecord[]>>;
  gaSalesData: SalesRecord[];
  setGaSalesData: React.Dispatch<React.SetStateAction<SalesRecord[]>>;
  masterApprovalData: MasterApprovalRecord[];
  setMasterApprovalData: React.Dispatch<React.SetStateAction<MasterApprovalRecord[]>>;
  complianceData: ReminderRecord[];
  setComplianceData: React.Dispatch<React.SetStateAction<ReminderRecord[]>>;
  vehicleInsuranceData: InsuranceRecord[];
  setVehicleInsuranceData: React.Dispatch<React.SetStateAction<InsuranceRecord[]>>;
  buildingInsuranceData: InsuranceRecord[];
  setBuildingInsuranceData: React.Dispatch<React.SetStateAction<InsuranceRecord[]>>;
  maintenanceScheduleData: MaintenanceScheduleRecord[];
  setMaintenanceScheduleData: React.Dispatch<React.SetStateAction<MaintenanceScheduleRecord[]>>;
  vehicleReminderData: VehicleReminderRecord[];
  setVehicleReminderData: React.Dispatch<React.SetStateAction<VehicleReminderRecord[]>>;
  atkData: AssetRecord[];
  setAtkData: React.Dispatch<React.SetStateAction<AssetRecord[]>>;
  arkData: AssetRecord[];
  setArkData: React.Dispatch<React.SetStateAction<AssetRecord[]>>;
  masterItems: MasterItem[];
  setMasterItems: React.Dispatch<React.SetStateAction<MasterItem[]>>;
  masterArkItems: MasterItem[];
  setMasterArkItems: React.Dispatch<React.SetStateAction<MasterItem[]>>;
  deliveryLocations: DeliveryLocationRecord[];
  setDeliveryLocations: React.Dispatch<React.SetStateAction<DeliveryLocationRecord[]>>;
  
  // Master Data
  masterPPN: GeneralMasterItem[];
  masterBrand: GeneralMasterItem[];
  masterLocation: GeneralMasterItem[];
  masterDepartment: GeneralMasterItem[];
  masterVehicleType: GeneralMasterItem[];
  masterRole: GeneralMasterItem[];
  
  // Computed
  aggregatedComplianceData: ReminderRecord[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data States
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(() => getInitialData('vehicleData', MOCK_VEHICLE_DATA));
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(() => getInitialData('buildingData', MOCK_BUILDING_DATA));
  const [buildingAssetData, setBuildingAssetData] = useState<BuildingAssetRecord[]>(() => getInitialData('buildingAssetData', MOCK_BUILDING_ASSETS));
  const [itBuildingData, setItBuildingData] = useState<BuildingAssetRecord[]>(() => getInitialData('itBuildingData', MOCK_IT_BUILDING_ASSETS));
  const [csBuildingData, setCsBuildingData] = useState<BuildingAssetRecord[]>(() => getInitialData('csBuildingData', MOCK_CS_BUILDING_ASSETS));
  const [buildingMaintenanceData, setBuildingMaintenanceData] = useState<BuildingMaintenanceRecord[]>(() => getInitialData('buildingMaintenanceData', MOCK_BUILDING_MAINTENANCE_DATA));
  const [utilityData, setUtilityData] = useState<UtilityRecord[]>(() => getInitialData('utilityData', MOCK_UTILITY_DATA));
  const [serviceData, setServiceData] = useState<ServiceRecord[]>(() => getInitialData('serviceData', MOCK_SERVICE_DATA));
  const [taxKirData, setTaxKirData] = useState<TaxKirRecord[]>(() => getInitialData('taxKirData', MOCK_TAX_KIR_DATA));
  const [vehicleContractData, setVehicleContractData] = useState<VehicleContractRecord[]>(() => getInitialData('vehicleContractData', MOCK_VEHICLE_CONTRACT_DATA));
  const [masterVendorData, setMasterVendorData] = useState<MasterVendorRecord[]>(() => getInitialData('masterVendorData', MOCK_MASTER_VENDOR_DATA));
  const [vendorData, setVendorData] = useState<VendorRecord[]>(() => getInitialData('vendorData', MOCK_VENDOR_DATA));
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(() => getInitialData('logBookData', MOCK_LOGBOOK_DATA));
  const [userData, setUserData] = useState<UserRecord[]>(() => getInitialData('userData', MOCK_USER_DATA));
  const [timesheetData, setTimesheetData] = useState<TimesheetRecord[]>(() => getInitialData('timesheetData', MOCK_TIMESHEET_DATA));
  const [mutationData, setMutationData] = useState<MutationRecord[]>(() => getInitialData('mutationData', MOCK_MUTATION_DATA));
  const [gaMutationData, setGaMutationData] = useState<MutationRecord[]>(() => getInitialData('gaMutationData', MOCK_GA_MUTATION_DATA));
  const [salesData, setSalesData] = useState<SalesRecord[]>(() => getInitialData('salesData', MOCK_SALES_DATA));
  const [gaSalesData, setGaSalesData] = useState<SalesRecord[]>(() => getInitialData('gaSalesData', MOCK_GA_SALES_DATA));
  const [masterApprovalData, setMasterApprovalData] = useState<MasterApprovalRecord[]>(() => getInitialData('masterApprovalData', MOCK_MASTER_APPROVAL_DATA));
  const [complianceData, setComplianceData] = useState<ReminderRecord[]>(() => getInitialData('complianceData', MOCK_REMINDER_DATA));
  const [maintenanceScheduleData, setMaintenanceScheduleData] = useState<MaintenanceScheduleRecord[]>(() => getInitialData('maintenanceScheduleData', MOCK_MAINTENANCE_SCHEDULE_DATA));
  const [vehicleReminderData, setVehicleReminderData] = useState<VehicleReminderRecord[]>(() => getInitialData('vehicleReminderData', MOCK_VEHICLE_REMINDER_DATA));
  const [atkData, setAtkData] = useState<AssetRecord[]>(() => getInitialData('atkData', MOCK_ATK_DATA));
  const [arkData, setArkData] = useState<AssetRecord[]>(() => getInitialData('arkData', MOCK_ARK_DATA));
  const [masterItems, setMasterItems] = useState<MasterItem[]>(() => getInitialData('masterItems', MOCK_ATK_MASTER));
  const [masterArkItems, setMasterArkItems] = useState<MasterItem[]>(() => getInitialData('masterArkItems', MOCK_MASTER_ARK_DATA));
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocationRecord[]>(() => getInitialData('deliveryLocations', MOCK_DELIVERY_LOCATIONS));

  // Insurance States
  const [vehicleInsuranceData, setVehicleInsuranceData] = useState<InsuranceRecord[]>(() => {
    const stored = localStorage.getItem('insuranceData');
    const all = stored ? JSON.parse(stored) : MOCK_INSURANCE_DATA;
    return all.filter((i: InsuranceRecord) => i.category === 'Vehicle');
  });
  const [buildingInsuranceData, setBuildingInsuranceData] = useState<InsuranceRecord[]>(() => {
    const stored = localStorage.getItem('insuranceData');
    const all = stored ? JSON.parse(stored) : MOCK_INSURANCE_DATA;
    return all.filter((i: InsuranceRecord) => i.category === 'Building');
  });

  // Master Data (read-only for now)
  const [masterPPN] = useState<GeneralMasterItem[]>(MOCK_PPN_DATA);
  const [masterBrand] = useState<GeneralMasterItem[]>(MOCK_BRAND_DATA);
  const [masterLocation] = useState<GeneralMasterItem[]>(MOCK_LOCATION_DATA);
  const [masterDepartment] = useState<GeneralMasterItem[]>(MOCK_DEPARTMENT_DATA);
  const [masterVehicleType] = useState<GeneralMasterItem[]>(MOCK_VEHICLE_TYPE_DATA);
  const [masterRole] = useState<GeneralMasterItem[]>(MOCK_GENERAL_MASTER_DATA.peran);

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('vehicleData', JSON.stringify(vehicleData)); }, [vehicleData]);
  useEffect(() => { localStorage.setItem('buildingData', JSON.stringify(buildingData)); }, [buildingData]);
  useEffect(() => { localStorage.setItem('insuranceData', JSON.stringify([...vehicleInsuranceData, ...buildingInsuranceData])); }, [vehicleInsuranceData, buildingInsuranceData]);

  // Aggregated Compliance Data
  const aggregatedComplianceData = useMemo(() => {
    const reminders: ReminderRecord[] = [];
    reminders.push(...complianceData.map(c => ({ ...c, category: 'Legal' as const, source: 'Manual' as const })));
    buildingInsuranceData.forEach(ins => {
      if (ins.endDate) {
        reminders.push({
          id: `INS-${ins.id}`,
          documentName: `ASURANSI: ${ins.type} (${ins.provider})`,
          buildingName: ins.assetName,
          assetNo: ins.policyNumber,
          expiryDate: ins.endDate,
          status: 'Safe',
          category: 'Insurance',
          source: 'System',
        });
      }
    });
    return reminders;
  }, [complianceData, buildingInsuranceData]);

  const value: AppContextType = {
    vehicleData, setVehicleData,
    buildingData, setBuildingData,
    buildingAssetData, setBuildingAssetData,
    itBuildingData, setItBuildingData,
    csBuildingData, setCsBuildingData,
    buildingMaintenanceData, setBuildingMaintenanceData,
    utilityData, setUtilityData,
    serviceData, setServiceData,
    taxKirData, setTaxKirData,
    vehicleContractData, setVehicleContractData,
    masterVendorData, setMasterVendorData,
    vendorData, setVendorData,
    logBookData, setLogBookData,
    userData, setUserData,
    timesheetData, setTimesheetData,
    mutationData, setMutationData,
    gaMutationData, setGaMutationData,
    salesData, setSalesData,
    gaSalesData, setGaSalesData,
    masterApprovalData, setMasterApprovalData,
    complianceData, setComplianceData,
    vehicleInsuranceData, setVehicleInsuranceData,
    buildingInsuranceData, setBuildingInsuranceData,
    maintenanceScheduleData, setMaintenanceScheduleData,
    vehicleReminderData, setVehicleReminderData,
    atkData, setAtkData,
    arkData, setArkData,
    masterItems, setMasterItems,
    masterArkItems, setMasterArkItems,
    deliveryLocations, setDeliveryLocations,
    masterPPN, masterBrand, masterLocation, masterDepartment, masterVehicleType, masterRole,
    aggregatedComplianceData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
