
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
import { MaintenanceReminderTable } from './components/MaintenanceReminderTable'; 
import { VehicleReminderTable } from './components/VehicleReminderTable'; // Added
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
import { InsuranceTable } from './components/InsuranceTable'; 

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
import { WorkflowActionModal } from './components/WorkflowActionModal';
import { ComplianceModal } from './components/ComplianceModal';
import { InsuranceModal } from './components/InsuranceModal';

import { Zap, Droplets, TrendingUp, Sun, LayoutDashboard } from 'lucide-react';
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
  MOCK_TIMESHEET_DATA,
  MOCK_SERVICE_DATA,
  MOCK_MUTATION_DATA,
  MOCK_SALES_DATA,
  MOCK_INSURANCE_DATA,
  MOCK_MAINTENANCE_SCHEDULE_DATA,
  MOCK_VEHICLE_REMINDER_DATA
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
  VendorRecord,
  MasterApprovalRecord,
  TimesheetRecord,
  InsuranceRecord,
  MaintenanceScheduleRecord,
  VehicleReminderRecord
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
        bids: []
    }
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
        statusApproval: 'Pending'
    }
];

// Mock Data for New Masters
const MOCK_VEHICLE_MODEL: GeneralMasterItem[] = [{ id: 1, name: 'AVANZA VELOZ' }, { id: 2, name: 'INNOVA ZENIX' }, { id: 3, name: 'HILUX SINGLE CAB' }];
const MOCK_BUILDING_COMPONENTS: GeneralMasterItem[] = [{ id: 1, name: 'ATAP GENTENG' }, { id: 2, name: 'LANTAI KERAMIK' }, { id: 3, name: 'DINDING BATAKO' }];
const MOCK_DOCUMENT_TYPES: GeneralMasterItem[] = [{ id: 1, name: 'SHM (SERTIFIKAT HAK MILIK)' }, { id: 2, name: 'HGB (HAK GUNA BANGUNAN)' }, { id: 3, name: 'IMB / PBG' }, { id: 4, name: 'POLIS ASURANSI' }];
const MOCK_UTILITY_TYPES: GeneralMasterItem[] = [{ id: 1, name: 'LISTRIK (PLN)' }, { id: 2, name: 'AIR (PDAM)' }, { id: 3, name: 'INTERNET (FIBER)' }, { id: 4, name: 'GAS (PGN)' }, { id: 5, name: 'SOLAR (GENSET)' }];

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Dashboard'); 
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // DATA STATES
  const [atkData, setAtkData] = useState<AssetRecord[]>(() => getInitialData('atkData', MOCK_ATK_DATA));
  const [arkData, setArkData] = useState<AssetRecord[]>(() => getInitialData('arkData', MOCK_ARK_DATA));
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(() => getInitialData('vehicleData', MOCK_VEHICLE_DATA));
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(() => getInitialData('buildingData', MOCK_BUILDING_DATA));
  const [buildingAssetData, setBuildingAssetData] = useState<BuildingAssetRecord[]>(() => getInitialData('buildingAssetData', MOCK_BUILDING_ASSETS));
  
  // NEW IT ASSET STATE (MIGRATED TO BUILDING ASSET STRUCTURE)
  const [itBuildingData, setItBuildingData] = useState<BuildingAssetRecord[]>(() => getInitialData('itBuildingData', MOCK_IT_BUILDING_ASSETS));
  // NEW CUSTOMER SERVICE ASSET STATE
  const [csBuildingData, setCsBuildingData] = useState<BuildingAssetRecord[]>(() => getInitialData('csBuildingData', MOCK_CS_BUILDING_ASSETS));

  const [buildingMaintenanceData, setBuildingMaintenanceData] = useState<BuildingMaintenanceRecord[]>(() => getInitialData('buildingMaintenanceData', MOCK_BUILDING_MAINTENANCE_DATA));
  const [utilityData, setUtilityData] = useState<UtilityRecord[]>(() => getInitialData('utilityData', MOCK_UTILITY_DATA));
  const [branchImprovementData, setBranchImprovementData] = useState<BuildingRecord[]>(() => getInitialData('branchImprovementData', MOCK_BRANCH_IMPROVEMENT_DATA));
  const [serviceData, setServiceData] = useState<ServiceRecord[]>(() => getInitialData('serviceData', MOCK_SERVICE_DATA));
  const [taxKirData, setTaxKirData] = useState<TaxKirRecord[]>(() => getInitialData('taxKirData', MOCK_TAX_KIR_DATA));
  const [vehicleContractData, setVehicleContractData] = useState<VehicleContractRecord[]>(() => getInitialData('vehicleContractData', MOCK_VEHICLE_CONTRACT_DATA));
  const [masterVendorData, setMasterVendorData] = useState<MasterVendorRecord[]>(() => getInitialData('masterVendorData', MOCK_MASTER_VENDOR_DATA));
  const [vendorData, setVendorData] = useState<VendorRecord[]>(() => getInitialData('vendorData', MOCK_VENDOR_DATA));
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(() => getInitialData('logBookData', MOCK_LOGBOOK_DATA));
  const [userData, setUserData] = useState<UserRecord[]>(() => getInitialData('userData', MOCK_USER_DATA));
  const [timesheetData, setTimesheetData] = useState<TimesheetRecord[]>(() => getInitialData('timesheetData', MOCK_TIMESHEET_DATA));
  const [generalAssetData, setGeneralAssetData] = useState<GeneralAssetRecord[]>(() => getInitialData('generalAssetData', MOCK_GENERAL_ASSET_DATA));
  const [mutationData, setMutationData] = useState<MutationRecord[]>(() => getInitialData('mutationData', MOCK_MUTATION_DATA));
  const [gaMutationData, setGaMutationData] = useState<MutationRecord[]>(() => getInitialData('gaMutationData', MOCK_GA_MUTATION_DATA)); // New state for GA Mutation
  const [salesData, setSalesData] = useState<SalesRecord[]>(() => getInitialData('salesData', MOCK_SALES_DATA));
  const [gaSalesData, setGaSalesData] = useState<SalesRecord[]>(() => getInitialData('gaSalesData', MOCK_GA_SALES_DATA)); // New state for GA Sales
  const [masterApprovalData, setMasterApprovalData] = useState<MasterApprovalRecord[]>(() => getInitialData('masterApprovalData', MOCK_MASTER_APPROVAL_DATA));
  const [complianceData, setComplianceData] = useState<ReminderRecord[]>(() => getInitialData('complianceData', MOCK_REMINDER_DATA));
  const [maintenanceScheduleData, setMaintenanceScheduleData] = useState<MaintenanceScheduleRecord[]>(() => getInitialData('maintenanceScheduleData', MOCK_MAINTENANCE_SCHEDULE_DATA));
  const [vehicleReminderData, setVehicleReminderData] = useState<VehicleReminderRecord[]>(() => getInitialData('vehicleReminderData', MOCK_VEHICLE_REMINDER_DATA));

  // INSURANCE STATES
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

  // MASTER DATA STATES (Generic & Complex)
  const [masterItems, setMasterItems] = useState<MasterItem[]>(() => getInitialData('masterItems', MOCK_ATK_MASTER));
  const [masterArkItems, setMasterArkItems] = useState<MasterItem[]>(() => getInitialData('masterArkItems', MOCK_MASTER_ARK_DATA));
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocationRecord[]>(() => getInitialData('deliveryLocations', MOCK_DELIVERY_LOCATIONS));

  // --- GENERAL MASTERS (From MOCK_GENERAL_MASTER_DATA and others) ---
  const [masterPPN, setMasterPPN] = useState<GeneralMasterItem[]>(() => getInitialData('masterPPN', MOCK_PPN_DATA));
  const [masterBrandType, setMasterBrandType] = useState<GeneralMasterItem[]>(() => getInitialData('masterBrandType', MOCK_BRAND_TYPE_DATA));
  const [masterBrand, setMasterBrand] = useState<GeneralMasterItem[]>(() => getInitialData('masterBrand', MOCK_BRAND_DATA));
  const [masterOperator, setMasterOperator] = useState<GeneralMasterItem[]>(() => getInitialData('masterOperator', MOCK_OPERATOR_DATA));
  const [masterAssetType, setMasterAssetType] = useState<GeneralMasterItem[]>(() => getInitialData('masterAssetType', MOCK_GENERAL_ASSET_TYPE_DATA));
  const [masterDepartment, setMasterDepartment] = useState<GeneralMasterItem[]>(() => getInitialData('masterDepartment', MOCK_DEPARTMENT_DATA));
  const [masterLocation, setMasterLocation] = useState<GeneralMasterItem[]>(() => getInitialData('masterLocation', MOCK_LOCATION_DATA));
  const [masterUOM, setMasterUOM] = useState<GeneralMasterItem[]>(() => getInitialData('masterUOM', MOCK_UOM_MASTER_DATA));
  const [masterColor, setMasterColor] = useState<GeneralMasterItem[]>(() => getInitialData('masterColor', MOCK_COLOR_DATA));
  const [masterBuildingType, setMasterBuildingType] = useState<GeneralMasterItem[]>(() => getInitialData('masterBuildingType', MOCK_BUILDING_TYPE_DATA));
  const [masterCostCenter, setMasterCostCenter] = useState<GeneralMasterItem[]>(() => getInitialData('masterCostCenter', MOCK_COST_CENTER_DATA));
  const [masterAssetCategory, setMasterAssetCategory] = useState<GeneralMasterItem[]>(() => getInitialData('masterAssetCategory', MOCK_ASSET_CATEGORY_DATA));
  const [masterVehicleType, setMasterVehicleType] = useState<GeneralMasterItem[]>(() => getInitialData('masterVehicleType', MOCK_VEHICLE_TYPE_DATA));
  
  // --- NEW MASTER DATA STATES ---
  const [masterVehicleModel, setMasterVehicleModel] = useState<GeneralMasterItem[]>(() => getInitialData('masterVehicleModel', MOCK_VEHICLE_MODEL));
  const [masterBuildingComponents, setMasterBuildingComponents] = useState<GeneralMasterItem[]>(() => getInitialData('masterBuildingComponents', MOCK_BUILDING_COMPONENTS));
  const [masterDocumentTypes, setMasterDocumentTypes] = useState<GeneralMasterItem[]>(() => getInitialData('masterDocumentTypes', MOCK_DOCUMENT_TYPES));
  const [masterUtilityTypes, setMasterUtilityTypes] = useState<GeneralMasterItem[]>(() => getInitialData('masterUtilityTypes', MOCK_UTILITY_TYPES));

  // From MOCK_GENERAL_MASTER_DATA Object
  const [masterJenisPajak, setMasterJenisPajak] = useState<GeneralMasterItem[]>(() => getInitialData('masterJenisPajak', MOCK_GENERAL_MASTER_DATA.jenisPajak));
  const [masterJenisPembayaran, setMasterJenisPembayaran] = useState<GeneralMasterItem[]>(() => getInitialData('masterJenisPembayaran', MOCK_GENERAL_MASTER_DATA.jenisPembayaran));
  const [masterJenisServis, setMasterJenisServis] = useState<GeneralMasterItem[]>(() => getInitialData('masterJenisServis', MOCK_GENERAL_MASTER_DATA.jenisServis));
  const [masterStatusMutasi, setMasterStatusMutasi] = useState<GeneralMasterItem[]>(() => getInitialData('masterStatusMutasi', MOCK_GENERAL_MASTER_DATA.statusMutasi));
  const [masterStatusPenjualan, setMasterStatusPenjualan] = useState<GeneralMasterItem[]>(() => getInitialData('masterStatusPenjualan', MOCK_GENERAL_MASTER_DATA.statusPenjualan));
  const [masterStatusRequest, setMasterStatusRequest] = useState<GeneralMasterItem[]>(() => getInitialData('masterStatusRequest', MOCK_GENERAL_MASTER_DATA.statusRequest));
  const [masterTipeMutasi, setMasterTipeMutasi] = useState<GeneralMasterItem[]>(() => getInitialData('masterTipeMutasi', MOCK_GENERAL_MASTER_DATA.tipeMutasi));
  const [masterTipeVendor, setMasterTipeVendor] = useState<GeneralMasterItem[]>(() => getInitialData('masterTipeVendor', MOCK_GENERAL_MASTER_DATA.tipeVendor));
  const [masterRole, setMasterRole] = useState<GeneralMasterItem[]>(() => getInitialData('masterRole', MOCK_GENERAL_MASTER_DATA.peran));
  const [masterSyncBranchs, setMasterSyncBranchs] = useState<GeneralMasterItem[]>([]);
  const [masterSyncChannels, setMasterSyncChannels] = useState<GeneralMasterItem[]>([]);

  // MODAL STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // WORKFLOW ACTION MODAL STATE
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [pendingWorkflow, setPendingWorkflow] = useState<{
      item: any;
      action: 'Approve' | 'Reject' | 'Revise';
      module: string;
  } | null>(null);

  // Combined Asset List for General Asset Mutation/Sales
  const combinedGeneralAssets = useMemo(() => {
      const hc = buildingAssetData.map(i => ({...i, sourceCategory: 'Asset HC'}));
      const it = itBuildingData.map(i => ({...i, sourceCategory: 'Asset IT'}));
      const cs = csBuildingData.map(i => ({...i, sourceCategory: 'Customer Service'}));
      return [...hc, ...it, ...cs];
  }, [buildingAssetData, itBuildingData, csBuildingData]);

  // Sync Data on Change (Persistence)
  useEffect(() => { localStorage.setItem('atkData', JSON.stringify(atkData)); }, [atkData]);
  useEffect(() => { localStorage.setItem('arkData', JSON.stringify(arkData)); }, [arkData]);
  useEffect(() => { localStorage.setItem('vehicleData', JSON.stringify(vehicleData)); }, [vehicleData]);
  useEffect(() => { localStorage.setItem('buildingData', JSON.stringify(buildingData)); }, [buildingData]);
  useEffect(() => { localStorage.setItem('insuranceData', JSON.stringify([...vehicleInsuranceData, ...buildingInsuranceData])); }, [vehicleInsuranceData, buildingInsuranceData]);
  
  // Handler Helpers
  const openModal = (type: string, mode: 'create' | 'edit' | 'view' = 'create', item: any = null) => {
    setModalType(type);
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedItem(null);
  };

  // General Save Handler (updates state based on modalType)
  const handleSaveData = (data: any) => {
    switch (modalType) {
      case 'VEHICLE':
        if (modalMode === 'create') setVehicleData([...vehicleData, { ...data, id: Date.now() }]);
        else setVehicleData(vehicleData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
        break;
      case 'BUILDING':
        if (modalMode === 'create') setBuildingData([...buildingData, { ...data, id: `BLD-${Date.now()}` }]);
        else setBuildingData(buildingData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
        break;
      case 'INSURANCE_VEHICLE':
        if (modalMode === 'create') setVehicleInsuranceData([...vehicleInsuranceData, { ...data, id: `INS-V-${Date.now()}` }]);
        else setVehicleInsuranceData(vehicleInsuranceData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
        break;
      case 'INSURANCE_BUILDING':
        if (modalMode === 'create') setBuildingInsuranceData([...buildingInsuranceData, { ...data, id: `INS-B-${Date.now()}` }]);
        else setBuildingInsuranceData(buildingInsuranceData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
        break;
      // ... Add other cases as needed ...
      case 'GEN_MASTER':
        // Generic Master Handling
        const newItem = { id: modalMode === 'create' ? Date.now() : selectedItem.id, name: data };
        const updateState = (setter: React.Dispatch<React.SetStateAction<GeneralMasterItem[]>>, currentList: GeneralMasterItem[]) => {
            if (modalMode === 'create') setter([...currentList, newItem]);
            else setter(currentList.map(i => i.id === newItem.id ? newItem : i));
        };

        if (activeModule === 'Master PPN') updateState(setMasterPPN, masterPPN);
        else if (activeModule === 'Master Brand') updateState(setMasterBrand, masterBrand);
        // ... (rest of master data logic)
        break;
      
      default:
        break;
    }
    closeModal();
  };

  // ... (Workflow Logic) ...
  const handleInitiateWorkflow = (item: any, action: 'Approve' | 'Reject' | 'Revise', module: string) => {
      setPendingWorkflow({ item, action, module });
      setWorkflowModalOpen(true);
  };

  const handleConfirmWorkflow = (comment: string) => {
      // ... (Workflow implementation - Update status based on module)
      if(pendingWorkflow) {
          const { module, action, item } = pendingWorkflow;
          const statusMap = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
          const newStatus = statusMap[action];

          if(module === 'VEHICLE') {
              setVehicleData(vehicleData.map(v => v.id === item.id ? { ...v, approvalStatus: newStatus } : v));
          } else if (module === 'BUILDING') {
              setBuildingData(buildingData.map(b => b.id === item.id ? { ...b, status: newStatus } : b));
          }
          // ... handle other modules ...
      }
      setWorkflowModalOpen(false);
      setPendingWorkflow(null);
  };

  // Helper to render General Master Page
  const renderGeneralMasterPage = (title: string, data: GeneralMasterItem[], stateSetter: React.Dispatch<React.SetStateAction<GeneralMasterItem[]>>) => (
    <>
        <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('GEN_MASTER', 'create', { title })} customAddLabel={`Add ${title}`} />
        <GeneralMasterTable 
            data={data} 
            title={title}
            onEdit={(item) => openModal('GEN_MASTER', 'edit', { ...item, title })} 
            onDelete={(id) => stateSetter(prev => prev.filter(i => i.id !== id))} 
        />
    </>
  );

  const renderModuleContent = () => {
    switch (activeModule) {
        case 'Dashboard': return (
            <div className="flex flex-col items-center justify-center h-full text-center p-10">
                <LayoutDashboard size={64} className="text-gray-200 mb-6" />
                <h2 className="text-xl font-black text-gray-300 uppercase tracking-widest">Dashboard Overview</h2>
                <p className="text-gray-400 mt-2">Statistics and charts will appear here.</p>
            </div>
        );
        
        // --- GROUP 1: HARD ASSETS ---
        // Building
        case 'Daftar Gedung':
        case 'Branch Improvement': // Fallback mapping if user clicked old menu
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING', 'create')} customAddLabel="New Building" />
                    <BuildingTable 
                        data={buildingData} 
                        onEdit={(item) => openModal('BUILDING', 'edit', item)}
                        onView={(item) => openModal('BUILDING', 'view', item)}
                        onDelete={(id) => setBuildingData(prev => prev.filter(i => i.id !== id))}
                        onAction={(item, action) => handleInitiateWorkflow(item, action, 'BUILDING')}
                    />
                </>
            );
        case 'Utility Monitoring': return (
            <>
                <FilterBar tabs={['OVERVIEW', 'LISTRIK', 'AIR', 'INTERNET']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('UTILITY', 'create')} customAddLabel="Input Utilitas" />
                <UtilityTable data={utilityData} onEdit={(item) => openModal('UTILITY', 'edit', item)} onDelete={() => {}} onView={(item) => openModal('UTILITY', 'view', item)} />
            </>
        );
        case 'Asuransi Gedung': return (
            <>
                <FilterBar tabs={['SEMUA', 'AKTIF', 'AKAN HABIS', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_BUILDING', 'create')} customAddLabel="Polis Baru" />
                <InsuranceTable data={buildingInsuranceData} onView={(item) => openModal('INSURANCE_BUILDING', 'view', item)} onEdit={(item) => openModal('INSURANCE_BUILDING', 'edit', item)} onDelete={() => {}} />
            </>
        );
        case 'Compliance & Legal': return (
            <>
                <FilterBar tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('COMPLIANCE', 'create')} customAddLabel="Add Document" />
                <ReminderTable data={complianceData} onView={(item) => openModal('COMPLIANCE', 'view', item)} onDelete={() => {}} />
            </>
        );

        // Vehicle
        case 'Daftar Aset': return (
            <>
                <FilterBar tabs={['SEMUA', 'APPROVED', 'PENDING', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE', 'create')} customAddLabel="Request Vehicle" />
                <VehicleTable 
                    data={vehicleData} 
                    onEdit={(item) => openModal('VEHICLE', 'edit', item)} 
                    onView={(item) => openModal('VEHICLE', 'view', item)} 
                    onDelete={(id) => setVehicleData(prev => prev.filter(i => i.id !== id))}
                    onAction={(item, action) => handleInitiateWorkflow(item, action, 'VEHICLE')}
                />
            </>
        );
        case 'Kontrak Kendaraan': return (
            <>
                <FilterBar tabs={['SEMUA', 'ACTIVE', 'EXPIRING', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE_CONTRACT', 'create')} customAddLabel="New Contract" />
                <VehicleContractTable data={vehicleContractData} onEdit={(item) => openModal('VEHICLE_CONTRACT', 'edit', item)} onView={(item) => openModal('VEHICLE_CONTRACT', 'view', item)} onDelete={() => {}} />
            </>
        );
        case 'Servis': return (
            <>
                <FilterBar tabs={['SEMUA', 'SCHEDULED', 'IN PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SERVICE', 'create')} customAddLabel="New Service" />
                <ServiceLogTable data={serviceData} onEdit={(item) => openModal('SERVICE', 'edit', item)} onView={(item) => openModal('SERVICE', 'view', item)} onDelete={() => {}} />
            </>
        );
        case 'Pajak & KIR': return (
            <>
                <FilterBar tabs={['SEMUA', 'PROSES', 'SELESAI']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('TAX_KIR', 'create')} customAddLabel="Request Pajak/KIR" />
                <TaxKirTable data={taxKirData} onEdit={(item) => openModal('TAX_KIR', 'edit', item)} onView={(item) => openModal('TAX_KIR', 'view', item)} onDelete={() => {}} />
            </>
        );
        case 'Reminder Pajak & KIR': return (
            <>
                <FilterBar tabs={['ALL', 'WARNING', 'EXPIRED', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => {}} hideAdd={true} customAddLabel="Add Reminder" />
                <VehicleReminderTable data={vehicleReminderData} onAction={(item) => openModal('TAX_KIR', 'create', { noPolisi: item.noPolisi, jenis: item.type === 'KIR' ? 'KIR' : 'Pajak STNK', tglRequest: new Date().toISOString().split('T')[0] })} />
            </>
        );
        case 'Asuransi Kendaraan': return (
            <>
                <FilterBar tabs={['SEMUA', 'AKTIF', 'AKAN HABIS', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_VEHICLE', 'create')} customAddLabel="Polis Baru" />
                <InsuranceTable data={vehicleInsuranceData} onView={(item) => openModal('INSURANCE_VEHICLE', 'view', item)} onEdit={(item) => openModal('INSURANCE_VEHICLE', 'edit', item)} onDelete={() => {}} />
            </>
        );
        case 'Mutasi': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MUTATION', 'create')} customAddLabel="New Mutation" />
                <MutationTable data={mutationData} onEdit={(item) => openModal('MUTATION', 'edit', item)} onView={(item) => openModal('MUTATION', 'view', item)} onDelete={() => {}} />
            </>
        );
        case 'Penjualan': return (
            <>
                <FilterBar tabs={['SEMUA', 'OPEN BIDDING', 'SOLD']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SALES', 'create')} customAddLabel="New Auction" />
                <SalesTable data={salesData} onEdit={(item) => openModal('SALES', 'edit', item)} onView={(item) => openModal('SALES', 'view', item)} onDelete={() => {}} />
            </>
        );

        // General Asset
        case 'Asset HC': 
        case 'Asset IT': 
        case 'Customer Service':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'AVAILABLE', 'IN USE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GENERAL_ASSET', 'create')} customAddLabel="Add Asset" />
                    {/* In real app, filter data based on activeModule */}
                    <GeneralAssetTable data={generalAssetData} onEdit={(item) => openModal('GENERAL_ASSET', 'edit', item)} onView={(item) => openModal('GENERAL_ASSET', 'view', item)} onDelete={() => {}} />
                </>
            );
        case 'Pemeliharaan Asset': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING', 'ON PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING_MAINTENANCE', 'create')} customAddLabel="New Request" />
                <BuildingMaintenanceTable data={buildingMaintenanceData} onEdit={(item) => openModal('BUILDING_MAINTENANCE', 'edit', item)} onDelete={() => {}} onView={(item) => openModal('BUILDING_MAINTENANCE', 'view', item)} />
            </>
        );
        case 'Reminder Pemeliharaan': return (
            <>
                <FilterBar tabs={['ALL', 'DUE SOON', 'OVERDUE', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => {}} hideAdd={true} customAddLabel="Add Schedule" />
                <MaintenanceReminderTable data={maintenanceScheduleData} onAction={(item) => openModal('BUILDING_MAINTENANCE', 'create', { assetId: item.assetId, assetName: item.assetName, buildingLocation: item.location })} />
            </>
        );
        case 'Mutasi Aset': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GA_MUTATION', 'create')} customAddLabel="Mutation Request" />
                <MutationTable data={gaMutationData} onEdit={(item) => openModal('GA_MUTATION', 'edit', item)} onView={(item) => openModal('GA_MUTATION', 'view', item)} onDelete={() => {}} />
            </>
        );
        case 'Penjualan Aset': return (
            <>
                <FilterBar tabs={['SEMUA', 'OPEN BID', 'SOLD']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GA_SALES', 'create')} customAddLabel="Disposal Request" />
                <SalesTable data={gaSalesData} onEdit={(item) => openModal('GA_SALES', 'edit', item)} onView={(item) => openModal('GA_SALES', 'view', item)} onDelete={() => {}} />
            </>
        );

        // ATK & ARK
        case 'Request ATK': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('ATK_REQ', 'create')} customAddLabel="Request ATK" />
                <StationeryRequestTable data={atkData} onView={(item) => openModal('ATK_REQ', 'view', item)} />
            </>
        );
        case 'Master ATK': return (
            <>
                <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('MASTER_ATK', 'create')} customAddLabel="Add Item" />
                <MasterAtkTable data={masterItems} onEdit={(item) => openModal('MASTER_ATK', 'edit', item)} />
            </>
        );
        case 'Daftar ARK': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('ARK_REQ', 'create')} customAddLabel="Request ARK" />
                <StationeryRequestTable data={arkData} onView={(item) => openModal('ARK_REQ', 'view', item)} />
            </>
        );
        case 'Master ARK': return (
            <>
                <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('MASTER_ARK', 'create')} customAddLabel="Add Item" />
                <MasterAtkTable data={masterArkItems} onEdit={(item) => openModal('MASTER_ARK', 'edit', item)} />
            </>
        );

        // Operations
        case 'Timesheet': return (
            <>
                <FilterBar tabs={['SEMUA', 'HARI INI', 'ABSEN', 'TERLAMBAT']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('TIMESHEET', 'create')} customAddLabel="Input Absen" />
                <TimesheetTable data={timesheetData} onEdit={(item) => openModal('TIMESHEET', 'edit', item)} onView={(item) => openModal('TIMESHEET', 'view', item)} onDelete={() => {}} />
            </>
        );
        case 'Log Book': return (
            <>
                <FilterBar tabs={['SEMUA', 'HARI INI', 'VISITOR', 'TAMU VIP']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOGBOOK', 'create')} customAddLabel="Input Tamu" />
                <LogBookTable data={logBookData} onEdit={(item) => openModal('LOGBOOK', 'edit', item)} onView={(item) => openModal('LOGBOOK', 'view', item)} />
            </>
        );
        
        // Admin
        case 'Vendor': return (
            <>
                <FilterBar tabs={['SEMUA', 'ACTIVE', 'INACTIVE', 'BLACKLIST']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VENDOR', 'create')} customAddLabel="Add Vendor" />
                <VendorTable data={vendorData} onEdit={(item) => openModal('VENDOR', 'edit', item)} onView={(item) => openModal('VENDOR', 'view', item)} onDelete={() => {}} />
            </>
        );
        case 'Manajemen User': return (
            <>
                <FilterBar tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('USER', 'create')} customAddLabel="Add User" />
                <UserTable data={userData} onEdit={(item) => openModal('USER', 'edit', item)} onView={(item) => openModal('USER', 'view', item)} onDelete={() => {}} />
            </>
        );

        // --- MASTER DATA ---
        case 'Master Approval':
            return (
                <>
                    <FilterBar tabs={['SEMUA']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MST_APPROVAL', 'create')} customAddLabel="Add Workflow" />
                    <MasterApprovalTable data={masterApprovalData} onEdit={(item) => openModal('MST_APPROVAL', 'edit', item)} onDelete={() => {}} />
                </>
            );
        case 'Master Vendor':
            return (
                <>
                    <FilterBar tabs={['LIST']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MST_VENDOR', 'create')} customAddLabel="Add Master Vendor" />
                    <MasterVendorTable data={masterVendorData} onEdit={(item) => openModal('MST_VENDOR', 'edit', item)} />
                </>
            );
        
        // --- GENERIC MASTER DATA ---
        case 'Master PPN': return renderGeneralMasterPage('Master PPN', masterPPN, setMasterPPN);
        case 'Master Brand Type': return renderGeneralMasterPage('Master Brand Type', masterBrandType, setMasterBrandType);
        case 'Master Brand': return renderGeneralMasterPage('Master Brand', masterBrand, setMasterBrand);
        case 'Master Model Kendaraan': return renderGeneralMasterPage('Master Model Kendaraan', masterVehicleModel, setMasterVehicleModel);
        case 'Master Komponen Bangunan': return renderGeneralMasterPage('Master Komponen Bangunan', masterBuildingComponents, setMasterBuildingComponents);
        case 'Master Tipe Dokumen': return renderGeneralMasterPage('Master Tipe Dokumen', masterDocumentTypes, setMasterDocumentTypes);
        case 'Master Tipe Utilitas': return renderGeneralMasterPage('Master Tipe Utilitas', masterUtilityTypes, setMasterUtilityTypes);
        case 'Master Operator': return renderGeneralMasterPage('Master Operator', masterOperator, setMasterOperator);
        case 'Master Asset Type': return renderGeneralMasterPage('Master Asset Type', masterAssetType, setMasterAssetType);
        case 'Master Department': return renderGeneralMasterPage('Master Department', masterDepartment, setMasterDepartment);
        case 'Master Lokasi': return renderGeneralMasterPage('Master Lokasi', masterLocation, setMasterLocation);
        case 'Master Satuan': return renderGeneralMasterPage('Master Satuan', masterUOM, setMasterUOM);
        case 'Master Warna': return renderGeneralMasterPage('Master Warna', masterColor, setMasterColor);
        case 'Master Tipe Gedung': return renderGeneralMasterPage('Master Tipe Gedung', masterBuildingType, setMasterBuildingType);
        case 'Master Cost Center': return renderGeneralMasterPage('Master Cost Center', masterCostCenter, setMasterCostCenter);
        case 'Asset Category': return renderGeneralMasterPage('Asset Category', masterAssetCategory, setMasterAssetCategory);
        case 'Jenis Pajak': return renderGeneralMasterPage('Jenis Pajak', masterJenisPajak, setMasterJenisPajak);
        case 'Jenis Pembayaran': return renderGeneralMasterPage('Jenis Pembayaran', masterJenisPembayaran, setMasterJenisPembayaran);
        case 'Jenis Servis': return renderGeneralMasterPage('Jenis Servis', masterJenisServis, setMasterJenisServis);
        case 'Status Mutasi': return renderGeneralMasterPage('Status Mutasi', masterStatusMutasi, setMasterStatusMutasi);
        case 'Status Penjualan': return renderGeneralMasterPage('Status Penjualan', masterStatusPenjualan, setMasterStatusPenjualan);
        case 'Status Request': return renderGeneralMasterPage('Status Request', masterStatusRequest, setMasterStatusRequest);
        case 'Tipe Mutasi': return renderGeneralMasterPage('Tipe Mutasi', masterTipeMutasi, setMasterTipeMutasi);
        case 'Tipe Vendor': return renderGeneralMasterPage('Tipe Vendor', masterTipeVendor, setMasterTipeVendor);
        case 'Role': return renderGeneralMasterPage('Role', masterRole, setMasterRole);
        case 'Sync Branchs': return renderGeneralMasterPage('Sync Branchs', masterSyncBranchs, setMasterSyncBranchs);
        case 'Sync Channels': return renderGeneralMasterPage('Sync Channels', masterSyncChannels, setMasterSyncChannels);
        case 'Jenis Kendaraan': return renderGeneralMasterPage('Jenis Kendaraan', masterVehicleType, setMasterVehicleType);

        default:
            return <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest">Select a module from sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#FBFBFB]">
      <Sidebar 
        activeItem={activeModule} 
        onNavigate={setActiveModule} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />
      
      <div className={`flex-1 flex flex-col h-screen overflow-hidden relative transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'}`}>
        <TopBar breadcrumbs={['Home', activeModule]} onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {renderModuleContent()}
        </main>
      </div>

      {/* Modals Layer */}
      {isModalOpen && (
        <>
            {modalType === 'VEHICLE' && <VehicleModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} branchList={masterLocation} channelList={masterDepartment} brandList={masterBrand} colorList={masterColor} />}
            {modalType === 'BUILDING' && <BuildingModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingTypeList={masterBuildingType} />}
            {modalType === 'INSURANCE_VEHICLE' && <InsuranceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} category="Vehicle" assetList={vehicleData} />}
            {modalType === 'INSURANCE_BUILDING' && <InsuranceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} category="Building" assetList={buildingData} />}
            {modalType === 'SERVICE' && <ServiceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} serviceTypeList={masterJenisServis} vendorList={vendorData} />}
            {modalType === 'TAX_KIR' && <TaxKirModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} branchList={masterLocation} channelList={masterDepartment} />}
            {modalType === 'VEHICLE_CONTRACT' && <VehicleContractModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} />}
            {modalType === 'MUTATION' && <MutationModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} assetType='VEHICLE' />}
            {modalType === 'SALES' && <SalesModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} assetType='VEHICLE' />}
            {modalType === 'BUILDING_MAINTENANCE' && <BuildingMaintenanceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} assetList={buildingAssetData} />}
            {modalType === 'UTILITY' && <UtilityModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingList={buildingData} />}
            {modalType === 'COMPLIANCE' && <ComplianceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingList={buildingData} />}
            
            {/* General Asset & Masters */}
            {modalType === 'GENERAL_ASSET' && <AssetGeneralModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} assetTypeList={masterAssetType} categoryList={masterAssetCategory} locationList={masterLocation} departmentList={masterDepartment} />}
            {modalType === 'GA_MUTATION' && <MutationModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} generalAssetList={combinedGeneralAssets} assetType='GENERAL_ASSET' />}
            {modalType === 'GA_SALES' && <SalesModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} generalAssetList={combinedGeneralAssets} assetType='GENERAL_ASSET' />}
            
            {/* ATK/ARK/Operations */}
            {modalType === 'ATK_REQ' && <AddStockModal isOpen={isModalOpen} onClose={closeModal} moduleName="ATK" onSaveStationeryRequest={(d) => { setAtkData([...atkData, { ...d, id: Date.now().toString() } as any]); closeModal(); }} />}
            {modalType === 'ARK_REQ' && <AddStockModal isOpen={isModalOpen} onClose={closeModal} moduleName="ARK" onSaveStationeryRequest={(d) => { setArkData([...arkData, { ...d, id: Date.now().toString() } as any]); closeModal(); }} />}
            {modalType === 'MASTER_ATK' && <MasterItemModal isOpen={isModalOpen} onClose={closeModal} onSave={(d) => { setMasterItems([...masterItems, { ...d, id: Date.now() } as any]); closeModal(); }} moduleName="ATK" />}
            {modalType === 'MASTER_ARK' && <MasterItemModal isOpen={isModalOpen} onClose={closeModal} onSave={(d) => { setMasterArkItems([...masterArkItems, { ...d, id: Date.now() } as any]); closeModal(); }} moduleName="ARK" />}
            
            {modalType === 'TIMESHEET' && <TimesheetModal isOpen={isModalOpen} onClose={closeModal} onSave={(d) => { setTimesheetData([...timesheetData, { ...d, id: Date.now().toString() } as any]); closeModal(); }} buildingList={buildingData} userList={userData} />}
            {modalType === 'LOGBOOK' && <AddStockModal isOpen={isModalOpen} onClose={closeModal} moduleName="Log Book" onSaveLogBook={(d) => { setLogBookData([...logBookData, { ...d, id: Date.now().toString() } as any]); closeModal(); }} />}
            
            {modalType === 'VENDOR' && <VendorModal isOpen={isModalOpen} onClose={closeModal} onSave={(d) => { setVendorData([...vendorData, { ...d, id: Date.now().toString() } as any]); closeModal(); }} />}
            {modalType === 'USER' && <UserModal isOpen={isModalOpen} onClose={closeModal} onSave={(d) => { setUserData([...userData, { ...d, id: Date.now().toString() } as any]); closeModal(); }} departmentList={masterDepartment} locationList={masterLocation} roleList={masterRole} />}
            {modalType === 'MST_APPROVAL' && <MasterApprovalModal isOpen={isModalOpen} onClose={closeModal} onSave={(d) => { setMasterApprovalData([...masterApprovalData, { ...d, id: Date.now().toString() } as any]); closeModal(); }} branchList={masterLocation} roleList={masterRole} userList={userData} />}
            {modalType === 'MST_VENDOR' && <VendorModal isOpen={isModalOpen} onClose={closeModal} onSave={(d) => { setMasterVendorData([...masterVendorData, { ...d, id: Date.now().toString() } as any]); closeModal(); }} />}

            {modalType === 'GEN_MASTER' && (
                <GeneralMasterModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} title={selectedItem?.title || activeModule} />
            )}
        </>
      )}

      {/* Workflow Action Modal */}
      {workflowModalOpen && pendingWorkflow && (
          <WorkflowActionModal 
              isOpen={workflowModalOpen} 
              action={pendingWorkflow.action}
              entityName={pendingWorkflow.item.assetName || pendingWorkflow.item.id}
              onClose={() => {
                  setWorkflowModalOpen(false);
                  setPendingWorkflow(null);
              }}
              onSubmit={handleConfirmWorkflow}
          />
      )}
    </div>
  );
};

export default App;
