
// @google/genai Coding Guidelines: This file uses standard React components and hooks.
// Type mismatches between BuildingRecord and BuildingAssetRecord are resolved using 'any' casts to satisfy TypeScript 
// while keeping the existing UI logic.

import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';
import { VehicleTable } from './components/VehicleTable';
import { ServiceLogTable } from './components/ServiceLogTable'; 
import { TaxKirTable } from './components/TaxKirTable';
import { MasterVendorTable } from './components/MasterVendorTable';
import { VendorTable } from './components/VendorTable';
import { VehicleContractTable } from './components/VehicleContractTable';
import { BuildingTable } from './components/BuildingTable';
import { BuildingAssetTable } from './components/BuildingAssetTable';
import { BuildingMaintenanceTable } from './components/BuildingMaintenanceTable';
import { UtilityTable } from './components/UtilityTable'; 
import { ReminderTable } from './components/ReminderTable';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { StationeryRequestTable } from './components/StationeryRequestTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { MasterDeliveryLocationTable } from './components/MasterDeliveryLocationTable';
import { LogBookTable } from './components/LogBookTable';
import { UserTable } from './components/UserTable';
import { MutationTable } from './components/MutationTable'; 
import { SalesTable } from './components/SalesTable'; 
import { GeneralAssetTable } from './components/GeneralAssetTable';
import { MasterApprovalTable } from './components/MasterApprovalTable';
import { TimesheetTable } from './components/TimesheetTable'; 

import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { BuildingAssetItemModal } from './components/BuildingAssetItemModal';
import { BuildingMaintenanceModal } from './components/BuildingMaintenanceModal'; 
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { AddStockModal } from './components/AddStockModal';
import { MasterItemModal } from './components/MasterItemModal';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { AssetGeneralModal } from './components/AssetGeneralModal';
import { ServiceModal } from './components/ServiceModal';
import { TaxKirModal } from './components/TaxKirModal';
import { VehicleContractModal } from './components/VehicleContractModal';
import { UserModal } from './components/UserModal';
import { UtilityModal } from './components/UtilityModal';
import { MutationModal } from './components/MutationModal'; 
import { SalesModal } from './components/SalesModal'; 
import { VendorModal } from './components/VendorModal';
import { MasterApprovalModal } from './components/MasterApprovalModal'; 
import { TimesheetModal } from './components/TimesheetModal'; 

import { Zap, Droplets, TrendingUp } from 'lucide-react';
import { 
  MOCK_VEHICLE_DATA, 
  MOCK_TAX_KIR_DATA, 
  MOCK_MASTER_VENDOR_DATA, 
  MOCK_VEHICLE_CONTRACT_DATA, 
  MOCK_BUILDING_DATA, 
  MOCK_BUILDING_ASSETS,
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
  MOCK_UOM_DATA,
  MOCK_ATK_CATEGORY,
  MOCK_ARK_CATEGORY,
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
  MOCK_IT_ASSET_DATA,
  MOCK_COLOR_DATA,
  MOCK_BUILDING_TYPE_DATA,
  MOCK_GENERAL_ASSET_TYPE_DATA,
  MOCK_PPN_DATA,
  MOCK_BRAND_TYPE_DATA,
  MOCK_OPERATOR_DATA,
  MOCK_VENDOR_DATA,
  MOCK_TIMESHEET_DATA
} from './constants';
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
  StationeryRequestRecord,
  UserRecord,
  MutationRecord,
  SalesRecord,
  GeneralAssetRecord,
  MasterVendorRecord,
  WorkflowLog,
  VendorRecord,
  MasterApprovalRecord,
  TimesheetRecord 
} from './types';
import { useLanguage } from './contexts/LanguageContext';

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
    {
        id: '1',
        module: 'Vehicle Request (Pengajuan Baru)',
        branch: 'All Branches',
        tiers: [
            { level: 1, type: 'Role', value: 'Branch Manager', sla: 2 },
            { level: 2, type: 'Role', value: 'Regional Head', sla: 3 },
            { level: 3, type: 'User', value: 'Budi Santoso', sla: 5 } // Example of specific user
        ],
        updatedAt: '2024-03-01'
    },
    {
        id: '2',
        module: 'Stationery Request (Permintaan ATK)',
        branch: 'Jakarta Head Office',
        tiers: [
            { level: 1, type: 'Role', value: 'Admin GA', sla: 1 },
            { level: 2, type: 'Role', value: 'Head of GA', sla: 2 }
        ],
        updatedAt: '2024-03-05'
    },
    {
        id: '3',
        module: 'Building Maintenance Request',
        branch: 'Surabaya Branch',
        tiers: [
            { level: 1, type: 'Role', value: 'Branch Manager', sla: 2 },
            { level: 2, type: 'User', value: 'Ibnu Faisal Abbas', sla: 3 }
        ],
        updatedAt: '2024-03-10'
    }
];

const App: React.FC = () => {
  // ... (No changes to state or effects logic before Modal Props) ...
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Manajemen User'); 
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // DATA STATES
  const [atkData, setAtkData] = useState<AssetRecord[]>(() => getInitialData('atkData', MOCK_ATK_DATA));
  const [arkData, setArkData] = useState<AssetRecord[]>(() => getInitialData('arkData', MOCK_ARK_DATA));
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(() => getInitialData('vehicleData', MOCK_VEHICLE_DATA));
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(() => getInitialData('buildingData', MOCK_BUILDING_DATA));
  const [buildingAssetData, setBuildingAssetData] = useState<BuildingAssetRecord[]>(() => getInitialData('buildingAssetData', MOCK_BUILDING_ASSETS));
  const [buildingMaintenanceData, setBuildingMaintenanceData] = useState<BuildingMaintenanceRecord[]>(() => getInitialData('buildingMaintenanceData', MOCK_BUILDING_MAINTENANCE_DATA));
  const [utilityData, setUtilityData] = useState<UtilityRecord[]>(() => getInitialData('utilityData', MOCK_UTILITY_DATA));
  const [branchImprovementData, setBranchImprovementData] = useState<BuildingRecord[]>(() => getInitialData('branchImprovementData', MOCK_BRANCH_IMPROVEMENT_DATA));
  const [serviceData, setServiceData] = useState<ServiceRecord[]>(() => getInitialData('serviceData', []));
  const [taxKirData, setTaxKirData] = useState<TaxKirRecord[]>(() => getInitialData('taxKirData', MOCK_TAX_KIR_DATA));
  const [vehicleContractData, setVehicleContractData] = useState<VehicleContractRecord[]>(() => getInitialData('vehicleContractData', MOCK_VEHICLE_CONTRACT_DATA));
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(() => getInitialData('logBookData', MOCK_LOGBOOK_DATA));
  const [userData, setUserData] = useState<UserRecord[]>(() => getInitialData('userData', MOCK_USER_DATA));
  
  // Master Data States
  const [vehicleTypeData, setVehicleTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('vehicleTypeData', MOCK_VEHICLE_TYPE_DATA));
  const [assetCategoryData, setAssetCategoryData] = useState<GeneralMasterItem[]>(() => getInitialData('assetCategoryData', MOCK_ASSET_CATEGORY_DATA));
  const [locationData, setLocationData] = useState<GeneralMasterItem[]>(() => getInitialData('locationData', MOCK_LOCATION_DATA));
  const [departmentData, setDepartmentData] = useState<GeneralMasterItem[]>(() => getInitialData('departmentData', MOCK_DEPARTMENT_DATA));
  const [uomMasterData, setUomMasterData] = useState<GeneralMasterItem[]>(() => getInitialData('uomMasterData', MOCK_UOM_MASTER_DATA));
  const [brandData, setBrandData] = useState<GeneralMasterItem[]>(() => getInitialData('brandData', MOCK_BRAND_DATA));
  const [costCenterData, setCostCenterData] = useState<GeneralMasterItem[]>(() => getInitialData('costCenterData', MOCK_COST_CENTER_DATA));
  const [colorData, setColorData] = useState<GeneralMasterItem[]>(() => getInitialData('colorData', MOCK_COLOR_DATA));
  const [buildingTypeData, setBuildingTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('buildingTypeData', MOCK_BUILDING_TYPE_DATA));
  const [genAssetTypeData, setGenAssetTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('genAssetTypeData', MOCK_GENERAL_ASSET_TYPE_DATA));
  const [ppnData, setPpnData] = useState<GeneralMasterItem[]>(() => getInitialData('ppnData', MOCK_PPN_DATA));
  const [brandTypeData, setBrandTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('brandTypeData', MOCK_BRAND_TYPE_DATA));
  const [operatorData, setOperatorData] = useState<GeneralMasterItem[]>(() => getInitialData('operatorData', MOCK_OPERATOR_DATA));
  const [masterVendorData, setMasterVendorData] = useState<MasterVendorRecord[]>(() => getInitialData('masterVendorData', MOCK_MASTER_VENDOR_DATA));

  // Extended Master Persistence
  const [taxTypeData, setTaxTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('taxTypeData', MOCK_GENERAL_MASTER_DATA.jenisPajak));
  const [paymentTypeData, setPaymentTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('paymentTypeData', MOCK_GENERAL_MASTER_DATA.jenisPembayaran));
  const [serviceTypeData, setServiceTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('serviceTypeData', MOCK_GENERAL_MASTER_DATA.jenisServis));
  const [mutationStatusData, setMutationStatusData] = useState<GeneralMasterItem[]>(() => getInitialData('mutationStatusData', MOCK_GENERAL_MASTER_DATA.statusMutasi));
  const [salesStatusData, setSalesStatusData] = useState<GeneralMasterItem[]>(() => getInitialData('salesStatusData', MOCK_GENERAL_MASTER_DATA.statusPenjualan));
  const [requestStatusData, setRequestStatusData] = useState<GeneralMasterItem[]>(() => getInitialData('requestStatusData', MOCK_GENERAL_MASTER_DATA.statusRequest));
  const [mutationTypeData, setMutationTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('mutationTypeData', MOCK_GENERAL_MASTER_DATA.tipeMutasi));
  const [vendorTypeData, setVendorTypeData] = useState<GeneralMasterItem[]>(() => getInitialData('vendorTypeData', MOCK_GENERAL_MASTER_DATA.tipeVendor));
  const [roleData, setRoleData] = useState<GeneralMasterItem[]>(() => getInitialData('roleData', MOCK_GENERAL_MASTER_DATA.peran));
  const [syncBranchData, setSyncBranchData] = useState<GeneralMasterItem[]>(() => getInitialData('syncBranchData', []));
  const [syncChannelData, setSyncChannelData] = useState<GeneralMasterItem[]>(() => getInitialData('syncChannelData', []));

  const [mutationData, setMutationData] = useState<MutationRecord[]>(() => getInitialData('mutationData', []));
  const [salesData, setSalesData] = useState<SalesRecord[]>(() => getInitialData('salesData', []));
  const [reminderData, setReminderData] = useState<ReminderRecord[]>(() => getInitialData('reminderData', MOCK_REMINDER_DATA));
  const [maintenanceReminderData, setMaintenanceReminderData] = useState<ReminderRecord[]>(() => getInitialData('maintenanceReminderData', MOCK_MAINTENANCE_REMINDER));
  const [generalAssetData, setGeneralAssetData] = useState<GeneralAssetRecord[]>(() => getInitialData('generalAssetData', MOCK_GENERAL_ASSET_DATA));
  const [itAssetData, setItAssetData] = useState<GeneralAssetRecord[]>(() => getInitialData('itAssetData', MOCK_IT_ASSET_DATA));
  const [vendorData, setVendorData] = useState<VendorRecord[]>(() => getInitialData('vendorData', MOCK_VENDOR_DATA));
  const [timesheetData, setTimesheetData] = useState<TimesheetRecord[]>(() => getInitialData('timesheetData', MOCK_TIMESHEET_DATA));
  
  // Master Approval
  const [masterApprovalData, setMasterApprovalData] = useState<MasterApprovalRecord[]>(() => getInitialData('masterApprovalData', MOCK_MASTER_APPROVAL_DATA));

  // ... (Persistence Effects skipped for brevity) ...
  useEffect(() => localStorage.setItem('atkData', JSON.stringify(atkData)), [atkData]);
  useEffect(() => localStorage.setItem('arkData', JSON.stringify(arkData)), [arkData]);
  useEffect(() => localStorage.setItem('vehicleData', JSON.stringify(vehicleData)), [vehicleData]);
  useEffect(() => localStorage.setItem('buildingData', JSON.stringify(buildingData)), [buildingData]);
  useEffect(() => localStorage.setItem('buildingAssetData', JSON.stringify(buildingAssetData)), [buildingAssetData]);
  useEffect(() => localStorage.setItem('buildingMaintenanceData', JSON.stringify(buildingMaintenanceData)), [buildingMaintenanceData]);
  useEffect(() => localStorage.setItem('utilityData', JSON.stringify(utilityData)), [utilityData]);
  useEffect(() => localStorage.setItem('branchImprovementData', JSON.stringify(branchImprovementData)), [branchImprovementData]);
  useEffect(() => localStorage.setItem('serviceData', JSON.stringify(serviceData)), [serviceData]);
  useEffect(() => localStorage.setItem('taxKirData', JSON.stringify(taxKirData)), [taxKirData]);
  useEffect(() => localStorage.setItem('vehicleContractData', JSON.stringify(vehicleContractData)), [vehicleContractData]);
  useEffect(() => localStorage.setItem('logBookData', JSON.stringify(logBookData)), [logBookData]);
  useEffect(() => localStorage.setItem('userData', JSON.stringify(userData)), [userData]);
  
  // Master Persistence
  useEffect(() => localStorage.setItem('vehicleTypeData', JSON.stringify(vehicleTypeData)), [vehicleTypeData]);
  useEffect(() => localStorage.setItem('assetCategoryData', JSON.stringify(assetCategoryData)), [assetCategoryData]);
  useEffect(() => localStorage.setItem('locationData', JSON.stringify(locationData)), [locationData]);
  useEffect(() => localStorage.setItem('departmentData', JSON.stringify(departmentData)), [departmentData]);
  useEffect(() => localStorage.setItem('uomMasterData', JSON.stringify(uomMasterData)), [uomMasterData]);
  useEffect(() => localStorage.setItem('brandData', JSON.stringify(brandData)), [brandData]);
  useEffect(() => localStorage.setItem('costCenterData', JSON.stringify(costCenterData)), [costCenterData]);
  useEffect(() => localStorage.setItem('colorData', JSON.stringify(colorData)), [colorData]);
  useEffect(() => localStorage.setItem('buildingTypeData', JSON.stringify(buildingTypeData)), [buildingTypeData]);
  useEffect(() => localStorage.setItem('genAssetTypeData', JSON.stringify(genAssetTypeData)), [genAssetTypeData]);
  useEffect(() => localStorage.setItem('ppnData', JSON.stringify(ppnData)), [ppnData]);
  useEffect(() => localStorage.setItem('brandTypeData', JSON.stringify(brandTypeData)), [brandTypeData]);
  useEffect(() => localStorage.setItem('operatorData', JSON.stringify(operatorData)), [operatorData]);
  useEffect(() => localStorage.setItem('masterVendorData', JSON.stringify(masterVendorData)), [masterVendorData]);
  
  // Extended Master Persistence
  useEffect(() => localStorage.setItem('taxTypeData', JSON.stringify(taxTypeData)), [taxTypeData]);
  useEffect(() => localStorage.setItem('paymentTypeData', JSON.stringify(paymentTypeData)), [paymentTypeData]);
  useEffect(() => localStorage.setItem('serviceTypeData', JSON.stringify(serviceTypeData)), [serviceTypeData]);
  useEffect(() => localStorage.setItem('mutationStatusData', JSON.stringify(mutationStatusData)), [mutationStatusData]);
  useEffect(() => localStorage.setItem('salesStatusData', JSON.stringify(salesStatusData)), [salesStatusData]);
  useEffect(() => localStorage.setItem('requestStatusData', JSON.stringify(requestStatusData)), [requestStatusData]);
  useEffect(() => localStorage.setItem('mutationTypeData', JSON.stringify(mutationTypeData)), [mutationTypeData]);
  useEffect(() => localStorage.setItem('vendorTypeData', JSON.stringify(vendorTypeData)), [vendorTypeData]);
  useEffect(() => localStorage.setItem('roleData', JSON.stringify(roleData)), [roleData]);
  useEffect(() => localStorage.setItem('syncBranchData', JSON.stringify(syncBranchData)), [syncBranchData]);
  useEffect(() => localStorage.setItem('syncChannelData', JSON.stringify(syncChannelData)), [syncChannelData]);

  useEffect(() => localStorage.setItem('mutationData', JSON.stringify(mutationData)), [mutationData]);
  useEffect(() => localStorage.setItem('salesData', JSON.stringify(salesData)), [salesData]);
  useEffect(() => localStorage.setItem('reminderData', JSON.stringify(reminderData)), [reminderData]);
  useEffect(() => localStorage.setItem('maintenanceReminderData', JSON.stringify(maintenanceReminderData)), [maintenanceReminderData]);
  useEffect(() => localStorage.setItem('generalAssetData', JSON.stringify(generalAssetData)), [generalAssetData]);
  useEffect(() => localStorage.setItem('itAssetData', JSON.stringify(itAssetData)), [itAssetData]);
  useEffect(() => localStorage.setItem('vendorData', JSON.stringify(vendorData)), [vendorData]);
  useEffect(() => localStorage.setItem('timesheetData', JSON.stringify(timesheetData)), [timesheetData]);
  useEffect(() => localStorage.setItem('masterApprovalData', JSON.stringify(masterApprovalData)), [masterApprovalData]);

  // MODAL STATES
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isBuildingAssetItemModalOpen, setIsBuildingAssetItemModalOpen] = useState(false);
  const [isBuildingMaintenanceModalOpen, setIsBuildingMaintenanceModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isTaxKirModalOpen, setIsTaxKirModalOpen] = useState(false);
  const [isVehicleContractModalOpen, setIsVehicleContractModalOpen] = useState(false);
  
  // Set default open for Ibnu
  const [isUserModalOpen, setIsUserModalOpen] = useState(true);
  
  const [isGeneralMasterModalOpen, setIsGeneralMasterModalOpen] = useState(false);
  const [isUtilityModalOpen, setIsUtilityModalOpen] = useState(false);
  const [isMutationModalOpen, setIsMutationModalOpen] = useState(false); 
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false); 
  const [isGeneralAssetModalOpen, setIsGeneralAssetModalOpen] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [isMasterApprovalModalOpen, setIsMasterApprovalModalOpen] = useState(false);
  const [isTimesheetModalOpen, setIsTimesheetModalOpen] = useState(false);
  
  // Set default view mode
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('view');
  
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);
  
  // Find Ibnu for default selection
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(() => {
      const users = getInitialData('userData', MOCK_USER_DATA);
      return users.find(u => u.name.includes('Ibnu')) || null;
  });
  
  const [selectedContract, setSelectedContract] = useState<VehicleContractRecord | null>(null);
  const [selectedGeneralItem, setSelectedGeneralItem] = useState<GeneralMasterItem | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingRecord | null>(null);
  const [selectedBuildingAsset, setSelectedBuildingAsset] = useState<BuildingAssetRecord | null>(null);
  const [selectedBuildingMaintenance, setSelectedBuildingMaintenance] = useState<BuildingMaintenanceRecord | null>(null);
  const [selectedUtility, setSelectedUtility] = useState<UtilityRecord | null>(null);
  const [selectedMutation, setSelectedMutation] = useState<MutationRecord | null>(null); 
  const [selectedSales, setSelectedSales] = useState<SalesRecord | null>(null); 
  const [selectedGeneralAsset, setSelectedGeneralAsset] = useState<GeneralAssetRecord | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<VendorRecord | null>(null);
  const [selectedApproval, setSelectedApproval] = useState<MasterApprovalRecord | null>(null);
  const [selectedTimesheet, setSelectedTimesheet] = useState<TimesheetRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Helper flags for conditional rendering
  const isReminderModule = ['Compliance & Legal', 'List Reminder Dokumen', 'List Reminder Pemeliharaan'].includes(activeModule);
  const isBuildingAssetModule = ['Asset HC'].includes(activeModule);
  const isMaintenanceModule = ['Pemeliharaan Asset'].includes(activeModule);
  const isRequestModule = ['Request ATK', 'Daftar ARK', 'Stationery Request Approval', 'Household Request Approval'].includes(activeModule);

  // ... (Navigation and Handlers remain same) ...
  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'Compliance & Legal') {
      setActiveTab('DOKUMEN');
    } else if (module === 'Utility Monitoring') {
      setActiveTab('OVERVIEW');
    } else {
      setActiveTab('SEMUA'); 
    }
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    // ... existing logic
    if (activeModule === 'Request ATK' || activeModule === 'Daftar ARK') {
      setIsStockModalOpen(true);
    } else if (activeModule === 'Daftar Aset') {
      setIsVehicleModalOpen(true);
    } else if (activeModule === 'Asset HC') { 
      setSelectedBuildingAsset(null);
      setIsBuildingAssetItemModalOpen(true);
    } else if (activeModule === 'Asset IT') { 
      setSelectedGeneralAsset(null);
      setIsGeneralAssetModalOpen(true);
    } else if (activeModule === 'Pemeliharaan Asset') {
      setSelectedBuildingMaintenance(null);
      setIsBuildingMaintenanceModalOpen(true);
    } else if (activeModule === 'Branch Improvement' || activeModule === 'Master Gedung') {
      setSelectedBuilding(null);
      setIsBuildingModalOpen(true);
    } else if (activeModule === 'Servis') {
      setIsServiceModalOpen(true);
    } else if (activeModule === 'Pajak & KIR') {
      setIsTaxKirModalOpen(true);
    } else if (activeModule === 'Kontrak Kendaraan') {
      setSelectedContract(null);
      setIsVehicleContractModalOpen(true);
    } else if (activeModule === 'Manajemen User') {
      setSelectedUser(null);
      setIsUserModalOpen(true);
    } else if ([
        'Jenis Kendaraan', 
        'Asset Category',
        'Master Lokasi',
        'Master Departemen',
        'Master Department',
        'Master Satuan',
        'Master Brand',
        'Master Cost Center',
        'Master Warna',
        'Master Tipe Gedung',
        'Master Tipe Aset',
        'Master Asset Type',
        'Master PPN',
        'Master Brand Type',
        'Master Operator',
        'Jenis Pajak',
        'Jenis Pembayaran',
        'Jenis Servis',
        'Status Mutasi',
        'Status Penjualan',
        'Status Request',
        'Tipe Mutasi',
        'Tipe Vendor',
        'Role',
        'Sync Branchs',
        'Sync Channels'
    ].includes(activeModule)) {
      setSelectedGeneralItem(null);
      setIsGeneralMasterModalOpen(true);
    } else if (activeModule === 'Utility Monitoring') {
      setSelectedUtility(null);
      setIsUtilityModalOpen(true);
    } else if (activeModule === 'Mutasi') {
      setSelectedMutation(null);
      setIsMutationModalOpen(true);
    } else if (activeModule === 'Penjualan') {
      setSelectedSales(null);
      setIsSalesModalOpen(true);
    } else if (activeModule === 'General Asset List') {
      setSelectedGeneralAsset(null);
      setIsGeneralAssetModalOpen(true);
    } else if (activeModule === 'Vendor') {
      setSelectedVendor(null);
      setIsVendorModalOpen(true);
    } else if (activeModule === 'Master Approval') {
      setSelectedApproval(null);
      setIsMasterApprovalModalOpen(true);
    } else if (activeModule === 'Timesheet') {
      setSelectedTimesheet(null);
      setIsTimesheetModalOpen(true);
    }
  };

  const handleExport = () => {
      // Simulate Export Logic
      const exportTime = new Date().toLocaleString('id-ID');
      alert(`Exporting data for ${activeModule}...\nTime: ${exportTime}\nFormat: CSV (Simulated)`);
  };

  const handleSync = () => {
      const timestamp = new Date().toLocaleTimeString('id-ID');
      alert(`Synchronizing data for ${activeModule}...\nLast Sync: ${timestamp}`);
  };

  const shouldShowExport = [
      // ... same list
      'Daftar Aset', 'Kontrak Kendaraan', 'Servis', 'Pajak & KIR', 'Mutasi', 'Penjualan',
      'Asset HC', 'Asset IT', 'General Asset List',
      'Master Gedung', 'Pemeliharaan Asset', 'Utility Monitoring', 'Branch Improvement', 'Compliance & Legal',
      'Vendor', 'Master Approval', 'Timesheet'
  ].includes(activeModule) || 
  activeModule.includes('Master') || 
  activeModule.includes('Jenis') || 
  activeModule.includes('Status') || 
  activeModule.includes('Tipe') || 
  activeModule === 'Role' || 
  activeModule.includes('Sync') ||
  activeModule === 'Asset Category';

  const shouldShowSync = ['Asset HC', 'Asset IT', 'General Asset List'].includes(activeModule);

  // Workflow Handlers (Vehicle)
  const handleVehicleWorkflowAction = (item: VehicleRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, 'Approved' | 'Rejected' | 'Revised'> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
      setVehicleData(prev => prev.map(v => v.id === item.id ? { ...v, approvalStatus: statusMap[action] } : v));
  };
  const handleContractWorkflowAction = (item: VehicleContractRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, 'Approved' | 'Rejected' | 'Revised'> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
      setVehicleContractData(prev => prev.map(c => c.id === item.id ? { ...c, approvalStatus: statusMap[action] } : c));
  };
  const handleServiceWorkflowAction = (item: ServiceRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, string> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
      setServiceData(prev => prev.map(s => s.id === item.id ? { ...s, statusApproval: statusMap[action] } : s));
  };
  const handleTaxKirWorkflowAction = (item: TaxKirRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, string> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
      setTaxKirData(prev => prev.map(t => t.id === item.id ? { ...t, statusApproval: statusMap[action] } : t));
  };
  const handleMutationWorkflowAction = (item: MutationRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, string> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
      setMutationData(prev => prev.map(m => m.id === item.id ? { ...m, statusApproval: statusMap[action] } : m));
  };
  const handleSalesWorkflowAction = (item: SalesRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, string> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
      setSalesData(prev => prev.map(s => s.id === item.id ? { ...s, statusApproval: statusMap[action] } : s));
  };

  // Workflow Handlers (Building)
  const handleWorkflowAction = (item: BuildingAssetRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, BuildingAssetRecord['approvalStatus']> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
      setBuildingAssetData(prev => prev.map(a => a.id === item.id ? { ...a, approvalStatus: statusMap[action] } : a));
  };
  const handleMaintenanceWorkflowAction = (item: BuildingMaintenanceRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, BuildingMaintenanceRecord['approvalStatus']> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
      setBuildingMaintenanceData(prev => prev.map(m => m.id === item.id ? { ...m, approvalStatus: statusMap[action] } : m));
  };
  const handleBuildingWorkflowAction = (item: BuildingRecord, action: 'Approve' | 'Reject' | 'Revise') => {
      const statusMap: Record<string, string> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
      setBranchImprovementData(prev => prev.map(b => b.id === item.id ? { ...b, status: statusMap[action] } : b));
  };

  // Save Handlers
  const handleSaveBuilding = (data: Partial<BuildingRecord>) => {
      const isBranchImprovement = activeModule === 'Branch Improvement';
      const updateFunction = isBranchImprovement ? setBranchImprovementData : setBuildingData;
      if (modalMode === 'create') {
          const newBuilding: BuildingRecord = { id: `BDG-${Date.now()}`, assetNo: `BDG-NEW-${Math.floor(Math.random() * 1000)}`, status: 'Pending', ...data } as BuildingRecord;
          updateFunction(prev => [newBuilding, ...prev]);
          alert("Request Gedung/Bangunan Berhasil Diajukan!");
      } else if (selectedBuilding) {
          updateFunction(prev => prev.map(b => b.id === selectedBuilding.id ? { ...b, ...data } as BuildingRecord : b));
      }
      setIsBuildingModalOpen(false);
  };
  const handleSaveBuildingAssetItem = (data: Partial<BuildingAssetRecord>) => {
      if (modalMode === 'create') {
          const newAsset: BuildingAssetRecord = { id: `ASSET-${Date.now()}`, assetCode: `ASSET-${Math.floor(Math.random() * 1000)}`, approvalStatus: 'Pending Approval', ...data } as BuildingAssetRecord;
          setBuildingAssetData(prev => [newAsset, ...prev]);
      } else if (selectedBuildingAsset) {
          setBuildingAssetData(prev => prev.map(a => a.id === selectedBuildingAsset.id ? { ...a, ...data } as BuildingAssetRecord : a));
      }
      setIsBuildingAssetItemModalOpen(false);
  };
  const handleSaveBuildingMaintenance = (data: Partial<BuildingMaintenanceRecord>) => {
      if (modalMode === 'create') {
          const newMaintenance: BuildingMaintenanceRecord = { id: `MNT-${Date.now()}`, ...data } as BuildingMaintenanceRecord;
          setBuildingMaintenanceData(prev => [newMaintenance, ...prev]);
      } else if (selectedBuildingMaintenance) {
          setBuildingMaintenanceData(prev => prev.map(m => m.id === selectedBuildingMaintenance.id ? { ...m, ...data } as BuildingMaintenanceRecord : m));
      }
      setIsBuildingMaintenanceModalOpen(false);
  };
  const handleSaveUtility = (data: Partial<UtilityRecord>) => {
      if (modalMode === 'create') {
          const newUtility: UtilityRecord = { id: `UTIL-${Date.now()}`, ...data } as UtilityRecord;
          setUtilityData(prev => [newUtility, ...prev]);
      } else if (selectedUtility) {
          setUtilityData(prev => prev.map(u => u.id === selectedUtility.id ? { ...u, ...data } as UtilityRecord : u));
      }
      setIsUtilityModalOpen(false);
  };
  const handleSaveMutation = (data: Partial<MutationRecord>) => {
      if (modalMode === 'create') {
          const newMutation: MutationRecord = { id: `MUT-${Date.now()}`, ...data } as MutationRecord;
          setMutationData(prev => [newMutation, ...prev]);
      } else if (selectedMutation) {
          setMutationData(prev => prev.map(m => m.id === selectedMutation.id ? { ...m, ...data } as MutationRecord : m));
      }
      setIsMutationModalOpen(false);
  };
  const handleSaveSales = (data: Partial<SalesRecord>) => {
      if (modalMode === 'create') {
          const newSales: SalesRecord = { id: `SALE-${Date.now()}`, ...data } as SalesRecord;
          setSalesData(prev => [newSales, ...prev]);
      } else if (selectedSales) {
          setSalesData(prev => prev.map(s => s.id === selectedSales.id ? { ...s, ...data } as SalesRecord : s));
      }
      setIsSalesModalOpen(false);
  };
  const handleSaveGeneralMaster = (name: string) => {
      const updateMasterData = (setter: React.Dispatch<React.SetStateAction<GeneralMasterItem[]>>, currentList: GeneralMasterItem[]) => {
          if (modalMode === 'create') setter(prev => [...prev, { id: Date.now(), name: name.toUpperCase() }]);
          else if (selectedGeneralItem) setter(prev => prev.map(item => item.id === selectedGeneralItem.id ? { ...item, name: name.toUpperCase() } : item));
      };
      if (activeModule === 'Jenis Kendaraan') updateMasterData(setVehicleTypeData, vehicleTypeData);
      else if (activeModule === 'Asset Category') updateMasterData(setAssetCategoryData, assetCategoryData);
      else if (activeModule === 'Master Lokasi') updateMasterData(setLocationData, locationData);
      else if (activeModule === 'Master Departemen' || activeModule === 'Master Department') updateMasterData(setDepartmentData, departmentData);
      else if (activeModule === 'Master Satuan') updateMasterData(setUomMasterData, uomMasterData);
      else if (activeModule === 'Master Brand') updateMasterData(setBrandData, brandData);
      else if (activeModule === 'Master Cost Center') updateMasterData(setCostCenterData, costCenterData);
      else if (activeModule === 'Master Warna') updateMasterData(setColorData, colorData);
      else if (activeModule === 'Master Tipe Gedung') updateMasterData(setBuildingTypeData, buildingTypeData);
      else if (activeModule === 'Master Tipe Aset' || activeModule === 'Master Asset Type') updateMasterData(setGenAssetTypeData, genAssetTypeData);
      else if (activeModule === 'Master PPN') updateMasterData(setPpnData, ppnData);
      else if (activeModule === 'Master Brand Type') updateMasterData(setBrandTypeData, brandTypeData);
      else if (activeModule === 'Master Operator') updateMasterData(setOperatorData, operatorData);
      else if (activeModule === 'Jenis Pajak') updateMasterData(setTaxTypeData, taxTypeData);
      else if (activeModule === 'Jenis Pembayaran') updateMasterData(setPaymentTypeData, paymentTypeData);
      else if (activeModule === 'Jenis Servis') updateMasterData(setServiceTypeData, serviceTypeData);
      else if (activeModule === 'Status Mutasi') updateMasterData(setMutationStatusData, mutationStatusData);
      else if (activeModule === 'Status Penjualan') updateMasterData(setSalesStatusData, salesStatusData);
      else if (activeModule === 'Status Request') updateMasterData(setRequestStatusData, requestStatusData);
      else if (activeModule === 'Tipe Mutasi') updateMasterData(setMutationTypeData, mutationTypeData);
      else if (activeModule === 'Tipe Vendor') updateMasterData(setVendorTypeData, vendorTypeData);
      else if (activeModule === 'Role') updateMasterData(setRoleData, roleData);
      else if (activeModule === 'Sync Branchs') updateMasterData(setSyncBranchData, syncBranchData);
      else if (activeModule === 'Sync Channels') updateMasterData(setSyncChannelData, syncChannelData);
      setIsGeneralMasterModalOpen(false);
  };
  const handleSaveStationeryRequest = (request: Partial<StationeryRequestRecord>) => {
    const isArk = activeModule === 'Daftar ARK';
    const newRecords: AssetRecord[] = (request.items || []).map((item, idx) => ({
      id: Date.now() + idx,
      transactionNumber: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      employee: { name: 'Ibnu Faisal Abbas', role: 'GA Administrator', phone: '0812-XXXX-XXXX', avatar: 'https://picsum.photos/id/1005/100/100' },
      category: isArk ? 'HOUSEHOLD' : 'STATIONERY',
      itemName: 'Item Baru',
      itemDescription: request.remarks || '',
      qty: parseInt(item.qty) || 1,
      date: new Date().toLocaleDateString('id-ID'),
      remainingStock: 100,
      itemCode: 'NEW-ITEM',
      status: 'Pending'
    }));
    if (isArk) setArkData(prev => [...newRecords, ...prev]);
    else setAtkData(prev => [...newRecords, ...prev]);
    setIsStockModalOpen(false);
  };
  const handleSaveUser = (data: Partial<UserRecord>) => {
      if (modalMode === 'create') {
          const newUser: UserRecord = { id: `USR-${Date.now()}`, ...data } as UserRecord;
          setUserData(prev => [newUser, ...prev]);
      } else if (selectedUser) {
          setUserData(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...data } as UserRecord : u));
      }
      setIsUserModalOpen(false);
  };
  const handleSaveVehicleContract = (data: Partial<VehicleContractRecord>) => {
      if (modalMode === 'create') {
          const newRecord: VehicleContractRecord = { id: `CTR-${Date.now()}`, ...data } as VehicleContractRecord;
          setVehicleContractData(prev => [newRecord, ...prev]);
      } else if (selectedContract) {
          setVehicleContractData(prev => prev.map(item => item.id === selectedContract.id ? { ...item, ...data } as VehicleContractRecord : item));
      }
      setIsVehicleContractModalOpen(false);
  };
  const handleSaveGeneralAsset = (data: Partial<GeneralAssetRecord>) => {
      const isIT = activeModule === 'Asset IT';
      const updateFunction = isIT ? setItAssetData : setGeneralAssetData;
      const idPrefix = isIT ? 'IT' : 'GA';
      const assetPrefix = isIT ? 'AST-IT' : 'AST-GEN';
      if (modalMode === 'create') {
          const newRecord: GeneralAssetRecord = { id: `${idPrefix}-${Date.now()}`, assetNumber: `${assetPrefix}-${Math.floor(1000 + Math.random() * 9000)}`, approvalStatus: 'Pending', ...data } as GeneralAssetRecord;
          updateFunction(prev => [newRecord, ...prev]);
          alert("Request General Asset Berhasil Diajukan!");
      } else if (selectedGeneralAsset) {
          updateFunction(prev => prev.map(item => item.id === selectedGeneralAsset.id ? { ...item, ...data } as GeneralAssetRecord : item));
      }
      setIsGeneralAssetModalOpen(false);
  };
  const handleSaveVendor = (data: Partial<VendorRecord>) => {
      if (modalMode === 'create') {
          const newVendor: VendorRecord = { id: Date.now(), vendorCode: `VND-${Math.floor(Math.random() * 1000)}`, ...data } as VendorRecord;
          setVendorData(prev => [newVendor, ...prev]);
      } else if (selectedVendor) {
          setVendorData(prev => prev.map(v => v.id === selectedVendor.id ? { ...v, ...data } as VendorRecord : v));
      }
      setIsVendorModalOpen(false);
  };
  const handleSaveMasterApproval = (data: Partial<MasterApprovalRecord>) => {
      if (modalMode === 'create') {
          const newRecord: MasterApprovalRecord = { id: `APV-${Date.now()}`, ...data } as MasterApprovalRecord;
          setMasterApprovalData(prev => [newRecord, ...prev]);
      } else if (selectedApproval) {
          setMasterApprovalData(prev => prev.map(a => a.id === selectedApproval.id ? { ...a, ...data } as MasterApprovalRecord : a));
      }
      setIsMasterApprovalModalOpen(false);
  };
  const handleSaveTimesheet = (data: Partial<TimesheetRecord>) => {
      if (modalMode === 'create') {
          const newRecord: TimesheetRecord = { id: Date.now(), ...data } as TimesheetRecord;
          setTimesheetData(prev => [newRecord, ...prev]);
      } else if (selectedTimesheet) {
          setTimesheetData(prev => prev.map(t => t.id === selectedTimesheet.id ? { ...t, ...data } as TimesheetRecord : t));
      }
      setIsTimesheetModalOpen(false);
  };

  // ... (Custom Add Label, Render Content, Tabs logic same as before) ...
  const getCustomAddLabel = () => {
      if (activeModule.includes('Master') || activeModule === 'Jenis Kendaraan' || activeModule === 'Asset Category') {
          if (activeModule === 'Master Approval') return t('Add Workflow');
          const label = activeModule.replace('Master ', '');
          return `${t('Add')} ${label}`;
      }
      if (['Jenis Pajak', 'Jenis Pembayaran', 'Jenis Servis', 'Status Mutasi', 'Status Penjualan', 'Status Request', 'Tipe Mutasi', 'Tipe Vendor', 'Role', 'Sync Branchs', 'Sync Channels'].includes(activeModule)) {
          return `${t('Add')} ${t(activeModule)}`;
      }
      if (activeModule === 'Daftar Aset') return t('Request Vehicle');
      if (activeModule === 'Asset HC') return t('Request Asset HC');
      if (activeModule === 'Asset IT') return t('Request Asset IT');
      if (activeModule === 'Branch Improvement') return t('New Branch Req');
      if (activeModule === 'Kontrak Kendaraan') return t('New Contract');
      if (activeModule === 'Pajak & KIR') return t('Request Tax/KIR');
      if (activeModule === 'Manajemen User') return t('Add User');
      if (activeModule === 'Utility Monitoring') return t('Input Utility');
      if (activeModule === 'Vendor') return t('Add Vendor');
      if (activeModule === 'Timesheet') return t('Add Log');
      
      return undefined;
  };

  const renderContent = () => {
     // ... (Existing Filters logic skipped for brevity) ...
     const filteredBuildingAssets = useMemo(() => {
        if (activeTab === 'SEMUA') return buildingAssetData;
        const target = activeTab.toLowerCase();
        return buildingAssetData.filter(a => (a.approvalStatus || 'Draft').toLowerCase().includes(target));
     }, [buildingAssetData, activeTab]);

     const filteredMaintenance = useMemo(() => {
        if (activeTab === 'SEMUA') return buildingMaintenanceData;
        return buildingMaintenanceData.filter(m => {
            const status = (m.approvalStatus || 'Draft').toUpperCase();
            if (activeTab === 'PENDING') return status.includes('PENDING');
            return status === activeTab;
        });
     }, [buildingMaintenanceData, activeTab]);

     const filteredBranchImprovement = useMemo(() => {
        if (activeTab === 'SEMUA') return branchImprovementData;
        return branchImprovementData.filter(b => {
            const status = (b.status || '').toUpperCase();
            if (activeTab === 'PENDING') return status.includes('PENDING');
            return status === activeTab;
        });
     }, [branchImprovementData, activeTab]);

     const filteredBuildingMaster = useMemo(() => {
        if (activeTab === 'SEMUA') return buildingData;
        return buildingData.filter(b => {
            const status = (b.status || '').toUpperCase();
            if (activeTab === 'PENDING') return status.includes('PENDING');
            return status === activeTab;
        });
     }, [buildingData, activeTab]);

     const filteredVehicleData = useMemo(() => {
        if (activeTab === 'SEMUA') return vehicleData;
        return vehicleData.filter(v => {
            const status = (v.approvalStatus || 'Approved').toUpperCase();
            if (activeTab === 'PENDING') return status === 'PENDING';
            if (activeTab === 'APPROVED') return status === 'APPROVED' || !v.approvalStatus;
            return status === activeTab;
        });
     }, [vehicleData, activeTab]);

     const filteredGeneralAssetData = useMemo(() => {
        const sourceData = activeModule === 'Asset IT' ? itAssetData : generalAssetData;
        if (activeTab === 'SEMUA') return sourceData;
        return sourceData.filter(g => {
            const status = (g.approvalStatus || 'Approved').toUpperCase();
            if (activeTab === 'PENDING') return status === 'PENDING';
            if (activeTab === 'APPROVED') return status === 'APPROVED' || !g.approvalStatus;
            return status === activeTab;
        });
     }, [activeModule, generalAssetData, itAssetData, activeTab]);

     const filteredUtility = useMemo(() => {
         if (activeTab === 'OVERVIEW' || activeTab === 'SEMUA') return utilityData;
         const target = activeTab.toLowerCase();
         if (target === 'listrik') return utilityData.filter(u => u.type.toLowerCase().includes('listrik'));
         if (target === 'air') return utilityData.filter(u => u.type.toLowerCase().includes('air'));
         if (target === 'internet') return utilityData.filter(u => u.type.toLowerCase().includes('internet'));
         return utilityData;
     }, [utilityData, activeTab]);

     const filteredVendorData = useMemo(() => {
        if (activeTab === 'SEMUA') return vendorData;
        return vendorData.filter(v => v.status.toUpperCase() === activeTab);
     }, [vendorData, activeTab]);

     const filteredUserData = useMemo(() => {
        if (activeTab === 'SEMUA') return userData;
        return userData.filter(u => u.status.toUpperCase() === activeTab);
     }, [userData, activeTab]);

     switch(activeModule) {
         // ... (All cases remain same, only Master Approval gets new prop)
         case 'Request ATK':
         case 'Stationery Request Approval':
            return <StationeryRequestTable data={atkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar ARK':
         case 'Household Request Approval':
            return <StationeryRequestTable data={arkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar Aset':
            return <VehicleTable 
                data={filteredVehicleData} 
                onEdit={(item) => { setSelectedAsset(item as any); setModalMode('edit'); setIsVehicleModalOpen(true); }}
                onView={(item) => { setSelectedAsset(item as any); setModalMode('view'); setIsVehicleModalOpen(true); }}
                onDelete={(id) => setVehicleData(prev => prev.filter(v => v.id !== id))}
                onAction={handleVehicleWorkflowAction}
            />;
         case 'Asset HC': 
            return <BuildingAssetTable 
                data={filteredBuildingAssets} 
                onEdit={(item) => { setSelectedBuildingAsset(item); setModalMode('edit'); setIsBuildingAssetItemModalOpen(true); }} 
                onView={(item) => { setSelectedBuildingAsset(item); setModalMode('view'); setIsBuildingAssetItemModalOpen(true); }} 
                onAction={handleWorkflowAction}
            />;
         case 'Asset IT': 
            return <GeneralAssetTable 
                data={filteredGeneralAssetData} 
                onEdit={(item) => { setSelectedGeneralAsset(item); setModalMode('edit'); setIsGeneralAssetModalOpen(true); }}
                onView={(item) => { setSelectedGeneralAsset(item); setModalMode('view'); setIsGeneralAssetModalOpen(true); }}
                onDelete={(id) => setItAssetData(prev => prev.filter(g => g.id !== id))}
            />;
         case 'General Asset List': 
            return <GeneralAssetTable 
                data={filteredGeneralAssetData} 
                onEdit={(item) => { setSelectedGeneralAsset(item); setModalMode('edit'); setIsGeneralAssetModalOpen(true); }}
                onView={(item) => { setSelectedGeneralAsset(item); setModalMode('view'); setIsGeneralAssetModalOpen(true); }}
                onDelete={(id) => setGeneralAssetData(prev => prev.filter(g => g.id !== id))}
            />;
         case 'Pemeliharaan Asset':
            return <BuildingMaintenanceTable
                data={filteredMaintenance}
                onEdit={(item) => { setSelectedBuildingMaintenance(item); setModalMode('edit'); setIsBuildingMaintenanceModalOpen(true); }}
                onView={(item) => { setSelectedBuildingMaintenance(item); setModalMode('view'); setIsBuildingMaintenanceModalOpen(true); }}
                onDelete={(id) => setBuildingMaintenanceData(prev => prev.filter(m => m.id !== id))}
                onAction={handleMaintenanceWorkflowAction}
            />;
         case 'Branch Improvement':
            return <BuildingTable 
                data={filteredBranchImprovement} 
                onEdit={(item) => { setSelectedBuilding(item); setModalMode('edit'); setIsBuildingModalOpen(true); }} 
                onView={(item) => { setSelectedBuilding(item); setModalMode('view'); setIsBuildingModalOpen(true); }} 
                onDelete={(id) => setBranchImprovementData(prev => prev.filter(b => b.id !== id))}
                onAction={handleBuildingWorkflowAction}
            />;
         case 'Utility Monitoring':
            return (
                <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Electricity (Feb)</p>
                                <h3 className="text-[24px] font-black text-black">2,500 <span className="text-[12px] font-bold text-gray-400">kWh</span></h3>
                            </div>
                            <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600">
                                <Zap size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Water (Feb)</p>
                                <h3 className="text-[24px] font-black text-black">150 <span className="text-[12px] font-bold text-gray-400">m3</span></h3>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <Droplets size={24} />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Cost (Feb)</p>
                                <h3 className="text-[24px] font-black text-black">Rp 42.050.000</h3>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                    </div>

                    <UtilityTable 
                        data={filteredUtility} 
                        onEdit={(item) => { setSelectedUtility(item); setModalMode('edit'); setIsUtilityModalOpen(true); }} 
                        onView={(item) => { setSelectedUtility(item); setModalMode('view'); setIsUtilityModalOpen(true); }} 
                        onDelete={(id) => setUtilityData(prev => prev.filter(u => u.id !== id))} 
                    />
                </div>
            );
         case 'Compliance & Legal':
            const dataToShow = activeTab === 'PEMELIHARAAN' ? maintenanceReminderData : reminderData;
            return <ReminderTable 
                data={dataToShow} 
                onView={()=>{}} 
                onDelete={(id) => {
                    if (activeTab === 'PEMELIHARAAN') setMaintenanceReminderData(prev => prev.filter(r => r.id !== id));
                    else setReminderData(prev => prev.filter(r => r.id !== id));
                }}
            />;
         case 'Master Gedung':
            return <BuildingTable 
                data={filteredBuildingMaster} 
                onEdit={(item) => { setSelectedBuilding(item); setModalMode('edit'); setIsBuildingModalOpen(true); }} 
                onView={(item) => { setSelectedBuilding(item); setModalMode('view'); setIsBuildingModalOpen(true); }} 
                onDelete={(id) => setBuildingData(prev => prev.filter(b => b.id !== id))}
            />;
         case 'List Reminder Dokumen': 
            return <ReminderTable 
                data={reminderData} 
                onView={()=>{}} 
                onDelete={(id) => setReminderData(prev => prev.filter(r => r.id !== id))}
            />;
         case 'List Reminder Pemeliharaan': 
            return <ReminderTable 
                data={maintenanceReminderData} 
                onView={()=>{}} 
                onDelete={(id) => setMaintenanceReminderData(prev => prev.filter(r => r.id !== id))}
            />;
         case 'Servis':
            return <ServiceLogTable 
                data={serviceData} 
                onEdit={()=>{}} 
                onView={(item) => { setSelectedAsset(item as any); setModalMode('view'); setIsServiceModalOpen(true); }} 
                onDelete={(id) => setServiceData(prev => prev.filter(s => s.id !== id))}
                onAction={handleServiceWorkflowAction}
            />;
         case 'Pajak & KIR':
            return <TaxKirTable 
                data={taxKirData} 
                onEdit={(item) => { }} 
                onView={(item) => { }} 
                onDelete={(id) => setTaxKirData(prev => prev.filter(t => t.id !== id))}
                onAction={handleTaxKirWorkflowAction}
            />;
         case 'Kontrak Kendaraan':
            return <VehicleContractTable 
                data={vehicleContractData} 
                onEdit={(item) => { setSelectedContract(item); setModalMode('edit'); setIsVehicleContractModalOpen(true); }} 
                onView={(item) => { setSelectedContract(item); setModalMode('view'); setIsVehicleContractModalOpen(true); }} 
                onDelete={(id) => setVehicleContractData(prev => prev.filter(i => i.id !== id))}
                onAction={handleContractWorkflowAction}
            />;
         case 'Log Book':
            return <LogBookTable data={logBookData} onEdit={()=>{}} onView={()=>{}} />;
         case 'Manajemen User':
            return <UserTable 
                data={filteredUserData} 
                onEdit={(user) => { setSelectedUser(user); setModalMode('edit'); setIsUserModalOpen(true); }}
                onView={(user) => { setSelectedUser(user); setModalMode('view'); setIsUserModalOpen(true); }}
                onDelete={(id) => setUserData(prev => prev.filter(u => u.id !== id))}
            />;
         case 'Vendor':
            return <VendorTable 
                data={filteredVendorData} 
                onEdit={(item) => { setSelectedVendor(item); setModalMode('edit'); setIsVendorModalOpen(true); }}
                onView={(item) => { setSelectedVendor(item); setModalMode('view'); setIsVendorModalOpen(true); }}
                onDelete={(id) => setVendorData(prev => prev.filter(v => v.id !== id))}
            />;
         
         case 'Timesheet':
            return <TimesheetTable
                data={timesheetData}
                onEdit={(item) => { setSelectedTimesheet(item); setModalMode('edit'); setIsTimesheetModalOpen(true); }}
                onView={(item) => { setSelectedTimesheet(item); setModalMode('view'); setIsTimesheetModalOpen(true); }}
                onDelete={(id) => setTimesheetData(prev => prev.filter(t => t.id !== id))}
            />;

         // --- Master Data Renders ---
         case 'Master Vendor': return <MasterVendorTable data={masterVendorData} onEdit={()=>{}} onView={()=>{}} />;
         case 'Jenis Kendaraan': return <GeneralMasterTable data={vehicleTypeData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setVehicleTypeData(prev => prev.filter(i => i.id !== id))} />;
         case 'Asset Category': return <GeneralMasterTable data={assetCategoryData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setAssetCategoryData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Lokasi': return <GeneralMasterTable data={locationData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setLocationData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Department': case 'Master Departemen': return <GeneralMasterTable data={departmentData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setDepartmentData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Satuan': return <GeneralMasterTable data={uomMasterData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setUomMasterData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Brand': return <GeneralMasterTable data={brandData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setBrandData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Cost Center': return <GeneralMasterTable data={costCenterData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setCostCenterData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Warna': return <GeneralMasterTable data={colorData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setColorData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Tipe Gedung': return <GeneralMasterTable data={buildingTypeData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setBuildingTypeData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Tipe Aset': case 'Master Asset Type': return <GeneralMasterTable data={genAssetTypeData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setGenAssetTypeData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master PPN': return <GeneralMasterTable data={ppnData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setPpnData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Brand Type': return <GeneralMasterTable data={brandTypeData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setBrandTypeData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Operator': return <GeneralMasterTable data={operatorData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setOperatorData(prev => prev.filter(i => i.id !== id))} />;
         case 'Jenis Pajak': return <GeneralMasterTable data={taxTypeData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setTaxTypeData(prev => prev.filter(i => i.id !== id))} />;
         case 'Jenis Pembayaran': return <GeneralMasterTable data={paymentTypeData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setPaymentTypeData(prev => prev.filter(i => i.id !== id))} />;
         case 'Jenis Servis': return <GeneralMasterTable data={serviceTypeData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setServiceTypeData(prev => prev.filter(i => i.id !== id))} />;
         case 'Status Mutasi': return <GeneralMasterTable data={mutationStatusData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setMutationStatusData(prev => prev.filter(i => i.id !== id))} />;
         case 'Status Penjualan': return <GeneralMasterTable data={salesStatusData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setSalesStatusData(prev => prev.filter(i => i.id !== id))} />;
         case 'Status Request': return <GeneralMasterTable data={requestStatusData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setRequestStatusData(prev => prev.filter(i => i.id !== id))} />;
         case 'Tipe Mutasi': return <GeneralMasterTable data={mutationTypeData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setMutationTypeData(prev => prev.filter(i => i.id !== id))} />;
         case 'Tipe Vendor': return <GeneralMasterTable data={vendorTypeData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setVendorTypeData(prev => prev.filter(i => i.id !== id))} />;
         case 'Role': return <GeneralMasterTable data={roleData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setRoleData(prev => prev.filter(i => i.id !== id))} />;
         case 'Sync Branchs': return <GeneralMasterTable data={syncBranchData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setSyncBranchData(prev => prev.filter(i => i.id !== id))} />;
         case 'Sync Channels': return <GeneralMasterTable data={syncChannelData} title={activeModule} onEdit={(item) => { setSelectedGeneralItem(item); setModalMode('edit'); setIsGeneralMasterModalOpen(true); }} onDelete={(id) => setSyncChannelData(prev => prev.filter(i => i.id !== id))} />;
         case 'Master Approval':
            return <MasterApprovalTable 
                data={masterApprovalData}
                onEdit={(item) => { setSelectedApproval(item); setModalMode('edit'); setIsMasterApprovalModalOpen(true); }}
                onDelete={(id) => setMasterApprovalData(prev => prev.filter(a => a.id !== id))}
            />;

         case 'Mutasi':
            return <MutationTable 
                data={mutationData} 
                onEdit={(item) => { setSelectedMutation(item); setModalMode('edit'); setIsMutationModalOpen(true); }}
                onView={(item) => { setSelectedMutation(item); setModalMode('view'); setIsMutationModalOpen(true); }}
                onDelete={(id) => setMutationData(prev => prev.filter(m => m.id !== id))}
                onAction={handleMutationWorkflowAction}
            />;
         case 'Penjualan':
            return <SalesTable 
                data={salesData} 
                onEdit={(item) => { setSelectedSales(item); setModalMode('edit'); setIsSalesModalOpen(true); }}
                onView={(item) => { setSelectedSales(item); setModalMode('view'); setIsSalesModalOpen(true); }}
                onDelete={(id) => setSalesData(prev => prev.filter(s => s.id !== id))}
                onAction={handleSalesWorkflowAction}
            />;
         default:
            return <div className="p-8 text-center text-gray-500">Modul {activeModule} sedang dalam pengembangan.</div>;
     }
  };

  const getModuleTabs = () => {
    // ... existing tabs logic
    if (activeModule === 'Compliance & Legal') return ['DOKUMEN', 'PEMELIHARAAN'];
    if (activeModule === 'Utility Monitoring') return ['OVERVIEW', 'LISTRIK', 'AIR', 'INTERNET'];
    if (isReminderModule) return ['SEMUA', 'URGENT', 'WARNING', 'SAFE'];
    if (isBuildingAssetModule) return ['SEMUA', 'PENDING', 'REVISED', 'APPROVED', 'REJECTED'];
    if (isMaintenanceModule) return ['SEMUA', 'PENDING', 'APPROVED', 'REJECTED', 'REVISED'];
    if (activeModule === 'Branch Improvement') return ['SEMUA', 'PENDING', 'REVISED', 'APPROVED', 'REJECTED'];
    if (isRequestModule) return ['SEMUA', 'PENDING', 'APPROVED', 'REJECTED'];
    if (activeModule === 'Timesheet') return ['SEMUA', 'TEPAT WAKTU', 'TERLAMBAT', 'ABSEN'];
    
    if (['Daftar Aset', 'Kontrak Kendaraan', 'Servis', 'Pajak & KIR', 'Mutasi', 'Penjualan'].includes(activeModule)) {
        return ['SEMUA', 'PENDING', 'APPROVED', 'REJECTED'];
    }

    if (activeModule === 'Vendor') return ['SEMUA', 'ACTIVE', 'INACTIVE', 'BLACKLIST'];
    if (activeModule === 'Manajemen User') return ['SEMUA', 'ACTIVE', 'INACTIVE'];

    if (activeModule.includes('Master') || activeModule === 'Jenis Kendaraan' || activeModule === 'Asset Category' || activeModule.includes('Jenis') || activeModule.includes('Status') || activeModule.includes('Tipe') || activeModule === 'Role' || activeModule.includes('Sync')) return ['SEMUA'];
    return ['SEMUA', 'PENDING', 'APPROVED', 'REJECTED'];
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen font-sans relative text-black selection:bg-black/10">
      {/* ... Sidebar, TopBar, FilterBar, Main Content ... */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity" 
            onClick={toggleMobileMenu} 
        />
      )}

      <Sidebar 
        activeItem={activeModule} 
        onNavigate={handleModuleNavigate} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={toggleMobileMenu}
      />
      
      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'}`}
      >
        <TopBar breadcrumbs={[t('Home'), t(activeModule)]} onMenuClick={toggleMobileMenu} />
        
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-[20px] font-bold text-black tracking-tight">{t(activeModule)}</h1>
            </div>
            
            <FilterBar 
                tabs={getModuleTabs()} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={handleAddClick}
                onExportClick={handleExport}
                onSyncClick={shouldShowSync ? handleSync : undefined}
                moduleName={activeModule}
                hideAdd={isReminderModule}
                hideImport={isReminderModule || activeModule === 'Utility Monitoring'}
                hideExport={!shouldShowExport}
                customAddLabel={getCustomAddLabel()} 
            />
            
            {renderContent()}
          </div>
        </main>
      </div>

      {/* MODALS */}
      {/* ... (Existing modals) ... */}
      <AddStockModal 
        isOpen={isStockModalOpen} 
        onClose={() => setIsStockModalOpen(false)} 
        moduleName={activeModule}
        mode={modalMode}
        initialAssetData={selectedAsset || undefined}
        onSaveStationeryRequest={handleSaveStationeryRequest}
      />

      <VehicleModal 
        isOpen={isVehicleModalOpen} 
        onClose={() => setIsVehicleModalOpen(false)} 
        onSave={(data) => { 
            if (modalMode === 'create') {
                setVehicleData(prev => [{id: Date.now(), approvalStatus: 'Pending', ...data} as VehicleRecord, ...prev]); 
                alert("Request Aset Kendaraan Berhasil Diajukan!");
            } else if (selectedAsset) {
                setVehicleData(prev => prev.map(v => v.id === (selectedAsset as any).id ? { ...v, ...data } as VehicleRecord : v));
            }
            setIsVehicleModalOpen(false); 
        }}
        initialData={selectedAsset as any} 
        mode={modalMode}
        brandList={brandData}
        colorList={colorData}
        // New Props
        channelList={syncChannelData}
        branchList={locationData}
      />

      <BuildingModal 
        isOpen={isBuildingModalOpen} 
        onClose={() => setIsBuildingModalOpen(false)} 
        onSave={handleSaveBuilding}
        initialData={selectedBuilding || undefined}
        mode={modalMode}
        buildingTypeList={buildingTypeData}
      />

      <BuildingAssetItemModal 
        isOpen={isBuildingAssetItemModalOpen} 
        onClose={() => setIsBuildingAssetItemModalOpen(false)} 
        onSave={handleSaveBuildingAssetItem}
        initialData={selectedBuildingAsset}
        mode={modalMode}
        buildingList={[...buildingData, ...branchImprovementData]}
        // New Props
        assetTypeList={genAssetTypeData}
        vendorList={vendorData}
      />

      <BuildingMaintenanceModal
        isOpen={isBuildingMaintenanceModalOpen}
        onClose={() => setIsBuildingMaintenanceModalOpen(false)}
        onSave={handleSaveBuildingMaintenance}
        initialData={selectedBuildingMaintenance}
        assetList={buildingAssetData}
        mode={modalMode}
      />

      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)} 
        onSave={(data) => { setServiceData(prev => [{id: `SRV-${Date.now()}`, ...data} as ServiceRecord, ...prev]); setIsServiceModalOpen(false); }} 
        vehicleList={vehicleData}
        // New Props
        serviceTypeList={serviceTypeData}
        vendorList={vendorData}
      />

      <TaxKirModal 
        isOpen={isTaxKirModalOpen} 
        onClose={() => setIsTaxKirModalOpen(false)} 
        onSave={(data) => { setTaxKirData(prev => [{id: `TAX-${Date.now()}`, ...data} as TaxKirRecord, ...prev]); setIsTaxKirModalOpen(false); }} 
        vehicleList={vehicleData}
        channelList={syncChannelData} 
        branchList={locationData} 
      />

      <VehicleContractModal 
         isOpen={isVehicleContractModalOpen}
         onClose={() => setIsVehicleContractModalOpen(false)}
         onSave={handleSaveVehicleContract}
         initialData={selectedContract || undefined}
         mode={modalMode}
         vehicleList={vehicleData} 
      />

      <UserModal 
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
        initialData={selectedUser || undefined}
        mode={modalMode}
        // New Props
        departmentList={departmentData}
        locationList={locationData}
        roleList={roleData}
      />

      <GeneralMasterModal 
        isOpen={isGeneralMasterModalOpen}
        onClose={() => setIsGeneralMasterModalOpen(false)}
        onSave={handleSaveGeneralMaster}
        initialData={selectedGeneralItem}
        title={activeModule}
      />

      <UtilityModal 
        isOpen={isUtilityModalOpen}
        onClose={() => setIsUtilityModalOpen(false)}
        onSave={handleSaveUtility}
        initialData={selectedUtility}
        mode={modalMode}
        buildingList={[...buildingData, ...branchImprovementData]}
      />

      <MutationModal 
        isOpen={isMutationModalOpen}
        onClose={() => setIsMutationModalOpen(false)}
        onSave={handleSaveMutation}
        initialData={selectedMutation}
        mode={modalMode}
        vehicleList={vehicleData}
      />

      <SalesModal 
        isOpen={isSalesModalOpen}
        onClose={() => setIsSalesModalOpen(false)}
        onSave={handleSaveSales}
        initialData={selectedSales}
        mode={modalMode}
        vehicleList={vehicleData}
      />

      <AssetGeneralModal 
        isOpen={isGeneralAssetModalOpen}
        onClose={() => setIsGeneralAssetModalOpen(false)}
        onSave={handleSaveGeneralAsset}
        initialData={selectedGeneralAsset || undefined}
        mode={modalMode}
        assetTypeList={genAssetTypeData}
        categoryList={assetCategoryData}
        locationList={locationData}
        departmentList={departmentData}
      />

      <VendorModal 
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        onSave={handleSaveVendor}
        initialData={selectedVendor || undefined}
        mode={modalMode}
      />

      <MasterApprovalModal 
        isOpen={isMasterApprovalModalOpen}
        onClose={() => setIsMasterApprovalModalOpen(false)}
        onSave={handleSaveMasterApproval}
        initialData={selectedApproval}
        mode={modalMode}
        branchList={locationData}
        roleList={roleData}
        userList={userData} 
      />

      <TimesheetModal 
        isOpen={isTimesheetModalOpen}
        onClose={() => setIsTimesheetModalOpen(false)}
        onSave={handleSaveTimesheet}
        initialData={selectedTimesheet}
        mode={modalMode}
        buildingList={[...buildingData, ...branchImprovementData]}
        userList={userData}
      />
    </div>
  );
};

export default App;
