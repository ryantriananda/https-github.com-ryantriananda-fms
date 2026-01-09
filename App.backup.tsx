
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';
import { 
    LayoutDashboard, TrendingUp, Package, Building, Car, Clock, 
    ArrowRight, CheckCircle2, AlertCircle, Timer, FileText, 
    Bed, Lock, Users, AlertTriangle, Layers, Wrench, Activity
} from 'lucide-react';

// Consumables & Masters
import { StationeryRequestTable } from './components/StationeryRequestTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { AddStockModal } from './components/AddStockModal';
import { MasterItemModal } from './components/MasterItemModal';

// Vehicle
import { VehicleTable } from './components/VehicleTable';
import { VehicleModal } from './components/VehicleModal';
import { VehicleContractTable } from './components/VehicleContractTable';
import { VehicleContractModal } from './components/VehicleContractModal';
import { ServiceTable } from './components/ServiceTable';
import { ServiceModal } from './components/ServiceModal';
import { TaxKirTable } from './components/TaxKirTable';
import { TaxKirModal } from './components/TaxKirModal';
import { VehicleReminderTable } from './components/VehicleReminderTable';
import { VehicleReminderModal } from './components/VehicleReminderModal';
import { MutationTable } from './components/MutationTable';
import { MutationModal } from './components/MutationModal';
import { SalesTable } from './components/SalesTable';
import { SalesModal } from './components/SalesModal';

// Building
import { BuildingTable } from './components/BuildingTable';
import { BuildingModal } from './components/BuildingModal';
import { UtilityTable } from './components/UtilityTable';
import { UtilityModal } from './components/UtilityModal';
import { ReminderTable } from './components/ReminderTable'; // Compliance & General Reminder
import { ComplianceModal } from './components/ComplianceModal';
import { BuildingMaintenanceTable } from './components/BuildingMaintenanceTable';
import { BuildingMaintenanceModal } from './components/BuildingMaintenanceModal';

// General Asset
import { GeneralAssetTable } from './components/GeneralAssetTable';
import { AssetGeneralModal } from './components/AssetGeneralModal';
import { MaintenanceReminderTable } from './components/MaintenanceReminderTable';
import { MaintenanceScheduleModal } from './components/MaintenanceScheduleModal';

// Insurance
import { InsuranceDashboard } from './components/InsuranceDashboard';
import { InsurancePolicyTable } from './components/InsurancePolicyTable';
import { InsuranceModal } from './components/InsuranceModal';
import { InsuranceClaimTable } from './components/InsuranceClaimTable';
import { InsuranceClaimModal } from './components/InsuranceClaimModal';
import { InsuranceProviderTable } from './components/InsuranceProviderTable';
import { InsuranceProviderModal } from './components/InsuranceProviderModal';
import { InsuranceReminderModal } from './components/InsuranceReminderModal'; // NEW

// Facility
import { PodRequestTable } from './components/PodRequestTable';
import { PodRequestModal } from './components/PodRequestModal';
import { PodApprovalTable } from './components/PodApprovalTable'; // NEW
import { LockerTable } from './components/LockerTable';
import { LockerModal } from './components/LockerModal';
import { LockerRequestTable } from './components/LockerRequestTable';
import { LockerRequestModal } from './components/LockerRequestModal';

// Stock Opname (NEW)
import { StockOpnameTable } from './components/StockOpnameTable';
import { AddStockOpnameModal } from './components/AddStockOpnameModal';

// Import Generic
import { ImportDataModal } from './components/ImportDataModal';

// Daily Ops & Admin
import { LogBookTable } from './components/LogBookTable';
import { LogBookModal } from './components/LogBookModal'; // New dedicated modal
import { TimesheetTable } from './components/TimesheetTable';
import { TimesheetModal } from './components/TimesheetModal';
import { VendorTable } from './components/VendorTable';
import { VendorModal } from './components/VendorModal';
import { UserTable } from './components/UserTable';
import { UserModal } from './components/UserModal';
import { MasterApprovalTable } from './components/MasterApprovalTable';
import { MasterApprovalModal } from './components/MasterApprovalModal';
import { MasterVendorTable } from './components/MasterVendorTable';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { MasterDeliveryLocationTable } from './components/MasterDeliveryLocationTable';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { WorkflowActionModal } from './components/WorkflowActionModal'; 
import { MasterPodTable } from './components/MasterPodTable';
import { MasterPodModal } from './components/MasterPodModal';
import { TenantPodTable } from './components/TenantPodTable';
import { TenantPodModal } from './components/TenantPodModal';
import { MasterRequestTypeTable } from './components/MasterRequestTypeTable';
import { MasterRequestTypeModal } from './components/MasterRequestTypeModal';

import { 
    AssetRecord, MasterItem, VehicleRecord, VehicleContractRecord, ServiceRecord, TaxKirRecord, 
    VehicleReminderRecord, MutationRecord, SalesRecord, BuildingRecord, UtilityRecord, ReminderRecord, 
    GeneralAssetRecord, BuildingMaintenanceRecord, MaintenanceScheduleRecord, InsuranceRecord, 
    InsuranceProviderRecord, PodRequestRecord, LockerRecord, LockerRequestRecord, 
    LogBookRecord, TimesheetRecord, VendorRecord, UserRecord, MasterApprovalRecord, 
    GeneralMasterItem, DeliveryLocationRecord, StockOpnameRecord, MasterPodRecord, TenantPodRecord,
    RequestTypeRecord
} from './types';

import { 
    MOCK_DATA, MOCK_MASTER_DATA, MOCK_ARK_DATA, MOCK_MASTER_ARK_DATA,
    MOCK_VEHICLE_DATA, MOCK_VEHICLE_CONTRACT_DATA, MOCK_SERVICE_DATA, MOCK_TAX_KIR_DATA, 
    MOCK_VEHICLE_REMINDER_DATA, MOCK_MUTATION_DATA, MOCK_SALES_DATA,
    MOCK_BUILDING_DATA, MOCK_UTILITY_DATA, MOCK_REMINDER_DATA, MOCK_BUILDING_MAINTENANCE_DATA,
    MOCK_GENERAL_ASSET_DATA, MOCK_ASSET_MAINTENANCE_DATA, // Imported
    MOCK_INSURANCE_DATA, MOCK_INSURANCE_PROVIDERS,
    MOCK_POD_REQUEST_DATA, MOCK_LOCKER_DATA, MOCK_LOCKER_REQUEST_DATA,
    MOCK_STOCK_OPNAME_DATA, MOCK_LOGBOOK_DATA, MOCK_TIMESHEET_DATA, MOCK_VENDOR_DATA, 
    MOCK_USER_DATA, MOCK_MASTER_APPROVAL_DATA, // Imported
    MOCK_GENERAL_MASTER_DATA, MOCK_BRAND_DATA, MOCK_COLOR_DATA, MOCK_BUILDING_ASSETS,
    MOCK_PPN_DATA, MOCK_BRAND_TYPE_DATA, MOCK_VEHICLE_MODEL_DATA, MOCK_BUILDING_COMPONENT_DATA,
    MOCK_DOC_TYPE_DATA, MOCK_UTILITY_TYPE_DATA, MOCK_OPERATOR_DATA, MOCK_ASSET_TYPE_DATA,
    MOCK_DEPARTMENT_DATA, MOCK_LOCATION_DATA, MOCK_UOM_DATA, MOCK_BUILDING_TYPE_DATA,
    MOCK_COST_CENTER_DATA, MOCK_ASSET_CATEGORY_DATA, MOCK_TAX_TYPE_DATA, MOCK_PAYMENT_TYPE_DATA,
    MOCK_SERVICE_TYPE_DATA, MOCK_MUTATION_STATUS_DATA, MOCK_SALES_STATUS_DATA, MOCK_REQUEST_STATUS_DATA,
    MOCK_MUTATION_TYPE_DATA, MOCK_VENDOR_TYPE_DATA, MOCK_ROLE_DATA, MOCK_VEHICLE_TYPE_DATA,
    MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_DELIVERY_LOCATIONS, MOCK_MASTER_POD_DATA,
    MOCK_TENANT_POD_DATA, MOCK_REQUEST_TYPES
} from './constants';

export const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('SEMUA');
  
  // ROLE STATE (Simulation)
  const [userRole, setUserRole] = useState<'Admin' | 'Staff' | 'Officer'>('Admin');

  // --- DATA STATES (Initialized with MOCK data) ---
  // ATK/ARK
  const [atkRequests, setAtkRequests] = useState<AssetRecord[]>(MOCK_DATA);
  const [masterAtk, setMasterAtk] = useState<MasterItem[]>(MOCK_MASTER_DATA);
  const [arkRequests, setArkRequests] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [masterArk, setMasterArk] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocationRecord[]>(MOCK_DELIVERY_LOCATIONS);
  const [stockOpnames, setStockOpnames] = useState<StockOpnameRecord[]>(MOCK_STOCK_OPNAME_DATA);
  const [requestTypes, setRequestTypes] = useState<RequestTypeRecord[]>(MOCK_REQUEST_TYPES);
  
  // Vehicle
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [vehicleContracts, setVehicleContracts] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [vehicleServices, setVehicleServices] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [vehicleTaxes, setVehicleTaxes] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [vehicleReminders, setVehicleReminders] = useState<VehicleReminderRecord[]>(MOCK_VEHICLE_REMINDER_DATA);
  const [vehicleMutations, setVehicleMutations] = useState<MutationRecord[]>(MOCK_MUTATION_DATA.filter(m => m.assetType === 'VEHICLE'));
  const [vehicleSales, setVehicleSales] = useState<SalesRecord[]>(MOCK_SALES_DATA.filter(s => s.assetType === 'VEHICLE'));

  // Building
  const [buildings, setBuildings] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [utilities, setUtilities] = useState<UtilityRecord[]>(MOCK_UTILITY_DATA);
  const [complianceDocs, setComplianceDocs] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [buildingMaintenances, setBuildingMaintenances] = useState<BuildingMaintenanceRecord[]>(MOCK_BUILDING_MAINTENANCE_DATA);

  // General Asset
  const [generalAssets, setGeneralAssets] = useState<GeneralAssetRecord[]>(MOCK_GENERAL_ASSET_DATA);
  const [assetMaintenances, setAssetMaintenances] = useState<MaintenanceScheduleRecord[]>(MOCK_ASSET_MAINTENANCE_DATA);
  const [assetMutations, setAssetMutations] = useState<MutationRecord[]>(MOCK_MUTATION_DATA.filter(m => m.assetType === 'GENERAL_ASSET'));
  const [assetSales, setAssetSales] = useState<SalesRecord[]>(MOCK_SALES_DATA.filter(s => s.assetType === 'GENERAL_ASSET'));

  // Insurance
  const [insurances, setInsurances] = useState<InsuranceRecord[]>(MOCK_INSURANCE_DATA);
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProviderRecord[]>(MOCK_INSURANCE_PROVIDERS);
  const [insuranceReminders, setInsuranceReminders] = useState<ReminderRecord[]>([]); // New manual reminders state

  // Facility
  const [masterPods, setMasterPods] = useState<MasterPodRecord[]>(MOCK_MASTER_POD_DATA);
  const [tenantPods, setTenantPods] = useState<TenantPodRecord[]>(MOCK_TENANT_POD_DATA);
  const [podRequests, setPodRequests] = useState<PodRequestRecord[]>(MOCK_POD_REQUEST_DATA);
  const [lockers, setLockers] = useState<LockerRecord[]>(MOCK_LOCKER_DATA);
  const [lockerRequests, setLockerRequests] = useState<LockerRequestRecord[]>(MOCK_LOCKER_REQUEST_DATA);

  // Daily Ops & Admin
  const [logBooks, setLogBooks] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  const [timesheets, setTimesheets] = useState<TimesheetRecord[]>(MOCK_TIMESHEET_DATA);
  const [vendors, setVendors] = useState<VendorRecord[]>(MOCK_VENDOR_DATA);
  const [users, setUsers] = useState<UserRecord[]>(MOCK_USER_DATA);
  const [masterApprovals, setMasterApprovals] = useState<MasterApprovalRecord[]>(MOCK_MASTER_APPROVAL_DATA);
  
  // General Masters Data Map
  const masterDataMap: Record<string, GeneralMasterItem[]> = {
      'Master PPN': MOCK_PPN_DATA,
      'Master Brand Type': MOCK_BRAND_TYPE_DATA,
      'Master Brand': MOCK_BRAND_DATA,
      'Master Model Kendaraan': MOCK_VEHICLE_MODEL_DATA,
      'Master Komponen Bangunan': MOCK_BUILDING_COMPONENT_DATA,
      'Master Tipe Dokumen': MOCK_DOC_TYPE_DATA,
      'Master Tipe Utilitas': MOCK_UTILITY_TYPE_DATA,
      'Master Operator': MOCK_OPERATOR_DATA,
      'Master Asset Type': MOCK_ASSET_TYPE_DATA,
      'Master Department': MOCK_DEPARTMENT_DATA,
      'Master Lokasi': MOCK_LOCATION_DATA,
      'Master Satuan': MOCK_UOM_DATA,
      'Master Warna': MOCK_COLOR_DATA,
      'Master Tipe Gedung': MOCK_BUILDING_TYPE_DATA,
      'Master Cost Center': MOCK_COST_CENTER_DATA,
      'Asset Category': MOCK_ASSET_CATEGORY_DATA,
      'Jenis Pajak': MOCK_TAX_TYPE_DATA,
      'Jenis Pembayaran': MOCK_PAYMENT_TYPE_DATA,
      'Jenis Servis': MOCK_SERVICE_TYPE_DATA,
      'Status Mutasi': MOCK_MUTATION_STATUS_DATA,
      'Status Penjualan': MOCK_SALES_STATUS_DATA,
      'Status Request': MOCK_REQUEST_STATUS_DATA,
      'Tipe Mutasi': MOCK_MUTATION_TYPE_DATA,
      'Tipe Vendor': MOCK_VENDOR_TYPE_DATA,
      'Role': MOCK_ROLE_DATA,
      'Jenis Kendaraan': MOCK_VEHICLE_TYPE_DATA
  };

  // --- MODAL STATE ---
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: string;
    mode: 'create' | 'edit' | 'view' | 'approve';
    data?: any;
    extraData?: any;
  }>({
    isOpen: false,
    type: '',
    mode: 'create'
  });

  // --- IMPORT MODAL STATE ---
  const [importState, setImportState] = useState<{
      isOpen: boolean;
      module: string;
      title: string;
  }>({
      isOpen: false,
      module: '',
      title: ''
  });

  // --- WORKFLOW ACTION STATE (NEW) ---
  const [workflowAction, setWorkflowAction] = useState<{
      isOpen: boolean;
      action: 'Approve' | 'Reject' | 'Revise';
      item: any;
      module: 'ATK' | 'ARK' | 'LOCKER' | 'OPNAME';
  }>({
      isOpen: false,
      action: 'Approve',
      item: null,
      module: 'ATK'
  });

  const openModal = (type: string, mode: 'create' | 'edit' | 'view' | 'approve' = 'create', data?: any, extraData?: any) => {
    setModalState({ isOpen: true, type, mode, data, extraData });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false, data: undefined, extraData: undefined });
  };

  const handleNavigate = (item: string) => {
    setActiveItem(item);
    setActiveTab('SEMUA');
  };

  // --- IMPORT LOGIC ---
  const handleOpenImport = () => {
      setImportState({ isOpen: true, module: activeItem, title: activeItem });
  };

  const getImportTemplateName = (module: string) => {
      const map: Record<string, string> = {
          'Master ATK': 'MASTER_ATK_TEMPLATE.xlsx',
          'Master ARK': 'MASTER_ARK_TEMPLATE.xlsx',
          'Request ATK': 'REQUEST_ATK_TEMPLATE.xlsx',
          'Daftar Kendaraan': 'VEHICLE_DATA_TEMPLATE.xlsx',
          'Kontrak Kendaraan': 'VEHICLE_CONTRACT_TEMPLATE.xlsx',
          'Servis': 'SERVICE_HISTORY_TEMPLATE.xlsx',
          'Pajak & KIR': 'TAX_KIR_TEMPLATE.xlsx',
          'Daftar Gedung': 'BUILDING_DATA_TEMPLATE.xlsx',
          'Branch Improvement': 'BRANCH_IMPROVEMENT_TEMPLATE.xlsx', // Added
          'Compliance & Legal': 'LEGAL_DOCS_TEMPLATE.xlsx', // Added
          'Asset HC': 'GENERAL_ASSET_HC_TEMPLATE.xlsx',
          'Asset IT': 'GENERAL_ASSET_IT_TEMPLATE.xlsx',
          'Customer Service': 'ASSET_CS_TEMPLATE.xlsx', // Added
          'Vendor': 'MASTER_VENDOR_TEMPLATE.xlsx',
          'Master Vendor': 'MASTER_VENDOR_TEMPLATE.xlsx',
          'Insurance Providers': 'INSURANCE_PROVIDER_TEMPLATE.xlsx', // Added
          'All Policies': 'INSURANCE_POLICY_TEMPLATE.xlsx', // Added
          'Manajemen User': 'USER_DATA_TEMPLATE.xlsx',
          'Stock Opname': 'STOCK_OPNAME_TEMPLATE.xlsx',
          'Input Stock Opname': 'STOCK_OPNAME_TEMPLATE.xlsx',
          'Log Book': 'VISITOR_LOG_TEMPLATE.xlsx',
          'Utility Monitoring': 'UTILITY_USAGE_TEMPLATE.xlsx',
          'Daftar Loker': 'MASTER_LOCKER_TEMPLATE.xlsx',
          'Timesheet': 'TIMESHEET_LOG_TEMPLATE.xlsx',
          'Expiring Soon': 'INSURANCE_REMINDER_TEMPLATE.xlsx',
          'Reminder Pemeliharaan': 'MAINTENANCE_SCHEDULE_TEMPLATE.xlsx' // Added
      };
      
      // Dynamic for General Masters
      if (masterDataMap[module]) {
          return `${module.replace(/\s+/g, '_').toUpperCase()}_TEMPLATE.xlsx`;
      }

      return map[module] || 'DATA_IMPORT_TEMPLATE.xlsx';
  };

  // --- WORKFLOW HANDLERS ---
  const handleOpenWorkflow = (item: any, action: 'Approve' | 'Reject' | 'Revise', module: 'ATK' | 'ARK' | 'LOCKER' | 'OPNAME') => {
      setWorkflowAction({ isOpen: true, action, item, module });
  };

  const handleCloseWorkflow = () => {
      setWorkflowAction(prev => ({ ...prev, isOpen: false }));
  };

  const handleSubmitWorkflow = (comment: string) => {
      const { action, item, module } = workflowAction;
      const status = action === 'Approve' ? 'Approved' : action === 'Reject' ? 'Rejected' : 'Revised';
      
      // Update logic based on module
      if (module === 'ATK') {
          setAtkRequests(prev => prev.map(r => r.id === item.id ? { ...r, status } : r));
      } else if (module === 'ARK') {
          setArkRequests(prev => prev.map(r => r.id === item.id ? { ...r, status } : r));
      } else if (module === 'LOCKER') {
          setLockerRequests(prev => prev.map(r => r.id === item.id ? { ...r, status } : r));
      } else if (module === 'OPNAME') {
          // This path is via small workflow modal, but OPNAME has dedicated modal
          setStockOpnames(prev => prev.map(r => r.opnameId === item.opnameId ? { 
              ...r, 
              statusApproval: status as any, 
              approvalNote: comment, 
              approvalDate: new Date().toISOString().split('T')[0] 
          } : r));
      }

      handleCloseWorkflow();
  };
  
  // Specific handler for Stock Opname Modal actions
  const handleStockOpnameApproval = (opnameId: string, status: 'Approved' | 'Rejected', note?: string) => {
      setStockOpnames(prev => prev.map(r => r.opnameId === opnameId ? { 
          ...r, 
          statusApproval: status, 
          approvalNote: note, 
          approvalDate: new Date().toISOString().split('T')[0] 
      } : r));
      closeModal();
  };

  // --- CRUD HANDLERS FOR MASTER ITEMS (ATK & ARK) ---
  const handleSaveMasterItem = (data: Partial<MasterItem>) => {
    const isArk = activeItem === 'Master ARK';
    const currentList = isArk ? masterArk : masterAtk;
    const setList = isArk ? setMasterArk : setMasterAtk;

    if (modalState.mode === 'create') {
      const newItem: MasterItem = {
        ...data,
        id: Date.now(), // Generate simple ID
        remainingStock: data.remainingStock || 0,
        minimumStock: data.minimumStock || 0,
        maximumStock: data.maximumStock || 0,
        requestedStock: 0,
        lastPurchasePrice: data.lastPurchasePrice || '0',
        averagePrice: data.averagePrice || '0',
        category: data.category || (isArk ? 'Cleaning' : 'Kertas'),
        itemName: data.itemName || 'New Item',
        itemCode: data.itemCode || `ITEM-${Date.now()}`,
        uom: data.uom || 'Pcs',
        purchaseDate: data.purchaseDate || new Date().toISOString().split('T')[0]
      } as MasterItem;
      setList([newItem, ...currentList]);
    } else if (modalState.mode === 'edit' && data.id) {
      setList(currentList.map(item => (item.id === data.id ? { ...item, ...data } as MasterItem : item)));
    }
    closeModal();
  };

  const handleDeleteMasterItem = (id: string | number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
    
    const isArk = activeItem === 'Master ARK';
    const setList = isArk ? setMasterArk : setMasterAtk;
    
    setList(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveRequestType = (data: Partial<RequestTypeRecord>) => {
      if (modalState.mode === 'create') {
          setRequestTypes(prev => [...prev, { ...data, id: Date.now() } as RequestTypeRecord]);
      } else {
          setRequestTypes(prev => prev.map(item => item.id === modalState.data.id ? { ...item, ...data } as RequestTypeRecord : item));
      }
      closeModal();
  };

  const handleDeleteRequestType = (id: number | string) => {
      if(window.confirm("Delete this request type?")) {
          setRequestTypes(prev => prev.filter(i => i.id !== id));
      }
  };

  // --- HANDLER FOR LOGBOOK CRUD ---
  const handleSaveLogBook = (data: Partial<LogBookRecord>) => {
      if (modalState.mode === 'create') {
          // Add new record
          const newLog: LogBookRecord = {
              ...data,
              id: Date.now().toString(), // Simple ID gen
              // Default values if missing
              tanggalKunjungan: data.tanggalKunjungan || new Date().toISOString().split('T')[0],
              jamDatang: data.jamDatang || new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}),
              kategoriTamu: data.kategoriTamu || 'Visitor',
              wanita: data.wanita || 0,
              lakiLaki: data.lakiLaki || 0,
              anakAnak: data.anakAnak || 0
          } as LogBookRecord;
          setLogBooks([newLog, ...logBooks]);
      } else if (modalState.mode === 'edit' && data.id) {
          // Update existing record
          setLogBooks(logBooks.map(item => item.id === data.id ? { ...item, ...data } as LogBookRecord : item));
      }
      closeModal();
  };

  const handleDeleteLogBook = (id: string) => {
      if (window.confirm("Are you sure you want to delete this log book entry?")) {
          setLogBooks(prev => prev.filter(log => log.id !== id));
      }
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    switch (activeItem) {
      // ... (previous dashboard case remains same) ...
      case 'Dashboard':
        // 1. CALCULATE SUMMARY STATS
        const pendingATK = atkRequests.filter(r => r.status === 'Pending' || r.status === 'Waiting Approval').length;
        const pendingARK = arkRequests.filter(r => r.status === 'Pending' || r.status === 'Waiting Approval').length;
        const pendingVehicle = vehicles.filter(v => (v.approvalStatus || '').toLowerCase().includes('pending')).length;
        const pendingService = vehicleServices.filter(s => (s.statusApproval || '').toLowerCase().includes('pending')).length;
        const pendingPod = podRequests.filter(r => r.status === 'Waiting Approval').length;
        const pendingLocker = lockerRequests.filter(r => r.status === 'Pending').length;
        
        const totalPendingRequests = pendingATK + pendingARK + pendingVehicle + pendingService + pendingPod + pendingLocker;

        // Facility Status
        const totalPods = masterPods.length;
        const occupiedPods = tenantPods.length; 
        const totalLockers = lockers.length;
        const occupiedLockers = lockers.filter(l => l.status === 'Terisi').length;

        // Assets Status
        const activeVehicles = vehicles.filter(v => v.status === 'Aktif' || v.status === 'Available').length;
        const serviceVehicles = vehicles.filter(v => v.status === 'Service').length;
        const maintenanceBuildings = buildingMaintenances.filter(m => m.status === 'In Progress').length;

        // Consumables Alert
        const lowStockATK = masterAtk.filter(i => i.remainingStock <= i.minimumStock).length;
        const lowStockARK = masterArk.filter(i => i.remainingStock <= i.minimumStock).length;

        // Daily Ops
        const activeVisitors = logBooks.filter(l => !l.jamPulang).length;

        // 2. COMBINE RECENT ACTIVITIES
        const recentActivities = [
            ...atkRequests.map(r => ({ ...r, type: 'ATK Request', code: 'ATK' })),
            ...arkRequests.map(r => ({ ...r, type: 'ARK Request', code: 'ARK' })),
            ...vehicleServices.map(s => ({ 
                id: s.id, 
                itemName: `Servis ${s.noPolisi}`, 
                status: s.statusApproval, 
                date: s.tglRequest,
                transactionNumber: s.id,
                type: 'Vehicle Service',
                code: 'SRV'
            })),
            ...podRequests.map(p => ({
                id: p.id,
                itemName: `Pod Request ${p.roomType}`,
                status: p.status,
                date: p.requestDate,
                transactionNumber: p.id,
                type: 'Pod Request',
                code: 'POD'
            })),
             ...lockerRequests.map(l => ({
                id: l.id,
                itemName: `Locker Request`,
                status: l.status,
                date: l.requestDate,
                transactionNumber: l.id,
                type: 'Locker Request',
                code: 'LOC'
            }))
        ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

        return (
            <div className="p-8 space-y-8 animate-in fade-in duration-500">
                {/* 1. TOP STATS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Pending</p>
                            <h3 className="text-[28px] font-black text-black leading-none">{totalPendingRequests}</h3>
                            <p className="text-[10px] font-medium text-orange-500 mt-2">Requests awaiting approval</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-orange-50 text-orange-600 group-hover:scale-110 transition-transform">
                            <Clock size={24} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Issues</p>
                            <h3 className="text-[28px] font-black text-black leading-none">{serviceVehicles + maintenanceBuildings}</h3>
                            <p className="text-[10px] font-medium text-blue-500 mt-2">Maint. & Service In Progress</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                            <Wrench size={24} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Inventory Alert</p>
                            <h3 className="text-[28px] font-black text-black leading-none">{lowStockATK + lowStockARK}</h3>
                            <p className="text-[10px] font-medium text-red-500 mt-2">Items below min. stock</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-50 text-red-600 group-hover:scale-110 transition-transform">
                            <AlertTriangle size={24} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Live Visitors</p>
                            <h3 className="text-[28px] font-black text-black leading-none">{activeVisitors}</h3>
                            <p className="text-[10px] font-medium text-green-500 mt-2">Currently checked in</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-50 text-green-600 group-hover:scale-110 transition-transform">
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                {/* 2. MIDDLE ROW: ASSET & FACILITY STATUS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Facility Occupancy */}
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-6">
                            <Layers size={18} className="text-black"/>
                            <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">FACILITY STATUS</h3>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Pod Status */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <div className="flex items-center gap-2">
                                        <Bed size={14} className="text-gray-400" />
                                        <span className="text-[11px] font-bold text-gray-600 uppercase">POD OCCUPANCY</span>
                                    </div>
                                    <span className="text-[14px] font-black text-black">{occupiedPods} <span className="text-gray-400 text-[10px]">/ {totalPods}</span></span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-black rounded-full transition-all duration-1000" 
                                        style={{ width: `${(occupiedPods/totalPods)*100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Locker Status */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <div className="flex items-center gap-2">
                                        <Lock size={14} className="text-gray-400" />
                                        <span className="text-[11px] font-bold text-gray-600 uppercase">LOCKER USAGE</span>
                                    </div>
                                    <span className="text-[14px] font-black text-black">{occupiedLockers} <span className="text-gray-400 text-[10px]">/ {totalLockers}</span></span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
                                        style={{ width: `${(occupiedLockers/totalLockers)*100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Status (Vehicles & Buildings) */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                             <div className="flex items-center gap-3">
                                <Activity size={18} className="text-black"/>
                                <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">OPERATIONAL HEALTH</h3>
                            </div>
                            <button className="text-[10px] font-bold text-gray-400 hover:text-black uppercase">View Report</button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                             <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-3">
                                 <div className="flex justify-between items-start">
                                     <div className="p-2 bg-white rounded-lg shadow-sm text-black"><Car size={16} /></div>
                                     <span className="text-[10px] font-bold text-gray-400 uppercase">VEHICLES</span>
                                 </div>
                                 <div className="flex gap-4 mt-1">
                                     <div>
                                         <span className="text-[16px] font-black text-black">{activeVehicles}</span>
                                         <p className="text-[9px] text-green-600 font-bold uppercase">Active</p>
                                     </div>
                                     <div>
                                         <span className="text-[16px] font-black text-black">{serviceVehicles}</span>
                                         <p className="text-[9px] text-orange-500 font-bold uppercase">Service</p>
                                     </div>
                                 </div>
                             </div>

                             <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-3">
                                 <div className="flex justify-between items-start">
                                     <div className="p-2 bg-white rounded-lg shadow-sm text-black"><Building size={16} /></div>
                                     <span className="text-[10px] font-bold text-gray-400 uppercase">BUILDINGS</span>
                                 </div>
                                 <div className="flex gap-4 mt-1">
                                     <div>
                                         <span className="text-[16px] font-black text-black">{buildings.length}</span>
                                         <p className="text-[9px] text-green-600 font-bold uppercase">Total</p>
                                     </div>
                                     <div>
                                         <span className="text-[16px] font-black text-black">{maintenanceBuildings}</span>
                                         <p className="text-[9px] text-blue-500 font-bold uppercase">Maint.</p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 3. RECENT ACTIVITY FEED */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[14px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                            <Clock size={16} /> Recent Activity Feed
                        </h3>
                        <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider flex items-center gap-1">
                            View All History <ArrowRight size={12} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((act: any, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-[10px] shadow-sm
                                        ${['ATK', 'ARK'].includes(act.code) ? 'bg-blue-500' : 
                                          ['SRV'].includes(act.code) ? 'bg-orange-500' : 
                                          ['POD', 'LOC'].includes(act.code) ? 'bg-purple-600' : 'bg-black'}`}>
                                        {act.code}
                                    </div>
                                    <div>
                                        <h4 className="text-[12px] font-black text-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">{act.itemName}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{act.transactionNumber || act.id} • {act.date}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                                    ${(act.status || '').toLowerCase().includes('pending') || (act.status || '').toLowerCase().includes('waiting') ? 'bg-orange-100 text-orange-600 border-orange-200' : 
                                      (act.status || '').toLowerCase().includes('approved') || (act.status || '').toLowerCase().includes('completed') ? 'bg-green-100 text-green-600 border-green-200' : 
                                      'bg-gray-200 text-gray-500 border-gray-300'}`}>
                                    {act.status || 'Pending'}
                                </span>
                            </div>
                        ))}
                        {recentActivities.length === 0 && (
                            <div className="text-center py-8 text-gray-400 italic text-[11px] uppercase tracking-widest">No recent activities found</div>
                        )}
                    </div>
                </div>
            </div>
        );

      // --- ATK MODULE ---
      case 'Request ATK':
        return (
            <>
                <FilterBar 
                    tabs={['SEMUA', 'DRAFT', 'WAITING APPROVAL', 'APPROVED', 'REJECTED']} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    onAddClick={() => openModal('ATK_REQUEST', 'create')} 
                    customAddLabel="TAMBAH DATA" 
                    onImportClick={handleOpenImport}
                />
                <StationeryRequestTable data={atkRequests} onView={(i) => openModal('ATK_REQUEST', 'view', i)} />
            </>
        );
      case 'Stationery Request Approval':
        return (
          <>
            <FilterBar tabs={['SEMUA', 'WAITING APPROVAL', 'DISETUJUI', 'DITOLAK']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => {}} hideAdd={true} />
            <StationeryRequestTable 
                data={atkRequests} 
                onView={(i) => openModal('ATK_APPROVAL', 'approve', i)} 
                isApprovalMode={true} 
                onAction={(item, action) => handleOpenWorkflow(item, action, 'ATK')}
            />
          </>
        );
      case 'Master ATK': 
        return (
          <>
            <FilterBar 
                tabs={['ITEMS', 'CATEGORY', 'UOM', 'DELIVERY', 'DETAIL REQUEST']} 
                activeTab={activeTab === 'SEMUA' ? 'ITEMS' : activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {
                    if (activeTab === 'CATEGORY') openModal('GENERAL_MASTER', 'create', undefined, { title: 'Kategori ATK' });
                    else if (activeTab === 'UOM') openModal('GENERAL_MASTER', 'create', undefined, { title: 'Master Satuan' });
                    else if (activeTab === 'DELIVERY') openModal('DELIVERY_LOCATION', 'create');
                    else if (activeTab === 'DETAIL REQUEST') openModal('REQUEST_TYPE', 'create');
                    else openModal('MASTER_ITEM', 'create');
                }} 
                customAddLabel="TAMBAH DATA" 
                onImportClick={handleOpenImport}
            />
            {(activeTab === 'ITEMS' || activeTab === 'SEMUA') && (
                <MasterAtkTable 
                    data={masterAtk} 
                    onEdit={(i) => openModal('MASTER_ITEM', 'edit', i)}
                    onDelete={(id) => handleDeleteMasterItem(id)}
                />
            )}
            {activeTab === 'CATEGORY' && (
                <GeneralMasterTable 
                    data={MOCK_ATK_CATEGORY} 
                    onEdit={(i) => openModal('GENERAL_MASTER', 'edit', i, { title: 'Kategori ATK' })} 
                    onDelete={() => {}} 
                />
            )}
            {activeTab === 'UOM' && (
                <GeneralMasterTable 
                    data={MOCK_UOM_DATA} 
                    onEdit={(i) => openModal('GENERAL_MASTER', 'edit', i, { title: 'Master Satuan' })} 
                    onDelete={() => {}} 
                />
            )}
            {activeTab === 'DELIVERY' && (
                <MasterDeliveryLocationTable 
                    data={deliveryLocations} 
                    onEdit={(i) => openModal('DELIVERY_LOCATION', 'edit', i)} 
                    onDelete={(id) => setDeliveryLocations(prev => prev.filter(i => i.id !== id))} 
                />
            )}
            {activeTab === 'DETAIL REQUEST' && (
                <MasterRequestTypeTable 
                    data={requestTypes} 
                    onEdit={(i) => openModal('REQUEST_TYPE', 'edit', i)}
                    onDelete={handleDeleteRequestType}
                />
            )}
          </>
        );

      // --- ARK MODULE ---
      case 'Daftar ARK':
         return (
            <>
                <FilterBar 
                    tabs={['SEMUA', 'DRAFT', 'WAITING APPROVAL', 'APPROVED']} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    onAddClick={() => openModal('ARK_REQUEST', 'create')} 
                    customAddLabel="TAMBAH DATA" 
                    onImportClick={handleOpenImport}
                />
                <StationeryRequestTable data={arkRequests} onView={(i) => openModal('ARK_REQUEST', 'view', i)} />
            </>
         );
      case 'Household Request Approval':
         return (
            <>
                <FilterBar tabs={['SEMUA', 'WAITING APPROVAL', 'DISETUJUI', 'DITOLAK']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => {}} hideAdd={true} />
                <StationeryRequestTable 
                    data={arkRequests} 
                    onView={(i) => openModal('ARK_APPROVAL', 'approve', i)} 
                    isApprovalMode={true} 
                    onAction={(item, action) => handleOpenWorkflow(item, action, 'ARK')} 
                />
            </>
         );
      case 'Master ARK': 
        return (
          <>
            <FilterBar 
                tabs={['ITEMS', 'CATEGORY', 'UOM', 'DELIVERY', 'DETAIL REQUEST']} 
                activeTab={activeTab === 'SEMUA' ? 'ITEMS' : activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {
                    if (activeTab === 'CATEGORY') openModal('GENERAL_MASTER', 'create', undefined, { title: 'Kategori ARK' });
                    else if (activeTab === 'UOM') openModal('GENERAL_MASTER', 'create', undefined, { title: 'Master Satuan' });
                    else if (activeTab === 'DELIVERY') openModal('DELIVERY_LOCATION', 'create');
                    else if (activeTab === 'DETAIL REQUEST') openModal('REQUEST_TYPE', 'create');
                    else openModal('MASTER_ITEM', 'create');
                }} 
                customAddLabel="TAMBAH DATA" 
                onImportClick={handleOpenImport}
            />
            {(activeTab === 'ITEMS' || activeTab === 'SEMUA') && (
                <MasterAtkTable 
                    data={masterArk} 
                    onEdit={(i) => openModal('MASTER_ITEM', 'edit', i)} 
                    onDelete={(id) => handleDeleteMasterItem(id)}
                />
            )}
            {activeTab === 'CATEGORY' && (
                <GeneralMasterTable 
                    data={MOCK_ARK_CATEGORY} 
                    onEdit={(i) => openModal('GENERAL_MASTER', 'edit', i, { title: 'Kategori ARK' })} 
                    onDelete={() => {}} 
                />
            )}
            {activeTab === 'UOM' && (
                <GeneralMasterTable 
                    data={MOCK_UOM_DATA} 
                    onEdit={(i) => openModal('GENERAL_MASTER', 'edit', i, { title: 'Master Satuan' })} 
                    onDelete={() => {}} 
                />
            )}
            {activeTab === 'DELIVERY' && (
                <MasterDeliveryLocationTable 
                    data={deliveryLocations} 
                    onEdit={(i) => openModal('DELIVERY_LOCATION', 'edit', i)} 
                    onDelete={(id) => setDeliveryLocations(prev => prev.filter(i => i.id !== id))} 
                />
            )}
            {activeTab === 'DETAIL REQUEST' && (
                <MasterRequestTypeTable 
                    data={requestTypes} 
                    onEdit={(i) => openModal('REQUEST_TYPE', 'edit', i)}
                    onDelete={handleDeleteRequestType}
                />
            )}
          </>
        );

      // --- STOCK OPNAME MODULE ---
      case 'Input Stock Opname':
      case 'Stock Opname': // Handle generic route if still used
          const filteredSO = activeTab === 'SEMUA' 
              ? stockOpnames 
              : stockOpnames.filter(s => s.status === activeTab);
          return (
              <>
                  <FilterBar 
                      tabs={['SEMUA', 'MATCHED', 'DISCREPANCY']} 
                      activeTab={activeTab} 
                      onTabChange={setActiveTab} 
                      onAddClick={() => openModal('STOCK_OPNAME_INIT', 'create')} 
                      customAddLabel="TAMBAH DATA" 
                      onImportClick={handleOpenImport}
                  />
                  <StockOpnameTable 
                      data={filteredSO} 
                      onView={(i) => {
                          const opnameItems = stockOpnames.filter(so => so.opnameId === i.opnameId);
                          openModal('STOCK_OPNAME_INIT', 'view', opnameItems);
                      }} 
                  />
              </>
          );
      case 'Stock Opname Approval':
          const approvalSO = activeTab === 'SEMUA'
              ? stockOpnames.filter(s => s.statusApproval === 'Pending') // Default to pending if all, or adjust
              : stockOpnames.filter(s => s.statusApproval?.toUpperCase() === activeTab);

          return (
              <>
                  <FilterBar 
                      tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} 
                      activeTab={activeTab} 
                      onTabChange={setActiveTab} 
                      onAddClick={() => {}} 
                      hideAdd={true}
                  />
                  <StockOpnameTable 
                      data={approvalSO} 
                      onView={(i) => {
                          const opnameItems = stockOpnames.filter(so => so.opnameId === i.opnameId);
                          openModal('STOCK_OPNAME_INIT', 'view', opnameItems);
                      }} 
                      onAction={(i, action) => {
                           // This just triggers the modal in approve mode
                           const opnameItems = stockOpnames.filter(so => so.opnameId === i.opnameId);
                           openModal('STOCK_OPNAME_INIT', 'approve', opnameItems);
                      }}
                  />
              </>
          );

      // --- VEHICLE MODULE ---
      case 'Daftar Kendaraan':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'AVAILABLE', 'IN USE', 'SERVICE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE', 'create')} customAddLabel="Request Vehicle" onImportClick={handleOpenImport}/>
                  <VehicleTable data={vehicles} onView={(i) => openModal('VEHICLE', 'view', i)} onEdit={(i) => openModal('VEHICLE', 'edit', i)} />
              </>
          );
      case 'Kontrak Kendaraan':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'EXPIRING SOON', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE_CONTRACT', 'create')} customAddLabel="New Contract" onImportClick={handleOpenImport}/>
                  <VehicleContractTable data={vehicleContracts} onView={(i) => openModal('VEHICLE_CONTRACT', 'view', i)} onEdit={(i) => openModal('VEHICLE_CONTRACT', 'edit', i)} />
              </>
          );
      case 'Servis':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'SCHEDULED', 'IN PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SERVICE', 'create')} customAddLabel="Add Service" moduleName='Servis' onImportClick={handleOpenImport}/>
                  <ServiceTable data={vehicleServices} onView={(i) => openModal('SERVICE', 'view', i)} onEdit={(i) => openModal('SERVICE', 'edit', i)} />
              </>
          );
      case 'Pajak & KIR':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'PENDING', 'PROCESSED', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('TAX_KIR', 'create')} customAddLabel="Request Pajak/KIR" onImportClick={handleOpenImport}/>
                  <TaxKirTable data={vehicleTaxes} onView={(i) => openModal('TAX_KIR', 'view', i)} onEdit={(i) => openModal('TAX_KIR', 'edit', i)} />
              </>
          );
      case 'Reminder Pajak & KIR':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'CRITICAL', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE_REMINDER', 'create')} hideAdd={true} />
                  <VehicleReminderTable data={vehicleReminders} onEdit={(i) => openModal('VEHICLE_REMINDER', 'edit', i)} />
              </>
          );
      case 'Mutasi':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MUTATION', 'create', undefined, { type: 'VEHICLE' })} customAddLabel="New Mutation" />
                  <MutationTable data={vehicleMutations} onView={(i) => openModal('MUTATION', 'view', i, { type: 'VEHICLE' })} onEdit={(i) => openModal('MUTATION', 'edit', i, { type: 'VEHICLE' })} />
              </>
          );
      case 'Penjualan':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'OPEN BID', 'SOLD', 'SCRAP']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SALES', 'create', undefined, { type: 'VEHICLE' })} customAddLabel="New Auction" />
                  <SalesTable data={vehicleSales} onView={(i) => openModal('SALES', 'view', i, { type: 'VEHICLE' })} onEdit={(i) => openModal('SALES', 'edit', i, { type: 'VEHICLE' })} />
              </>
          );

      // --- BUILDING MODULE ---
      case 'Daftar Gedung':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'OWNED', 'RENTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING', 'create')} customAddLabel="New Branch Req" onImportClick={handleOpenImport}/>
                  <BuildingTable data={buildings} onView={(i) => openModal('BUILDING', 'view', i)} onEdit={(i) => openModal('BUILDING', 'edit', i)} />
              </>
          );
      case 'Utility Monitoring':
          return (
              <>
                  <FilterBar tabs={['OVERVIEW', 'LISTRIK', 'AIR', 'INTERNET']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('UTILITY', 'create')} customAddLabel="Input Utility" onImportClick={handleOpenImport}/>
                  <UtilityTable data={utilities} onView={(i) => openModal('UTILITY', 'view', i)} onEdit={(i) => openModal('UTILITY', 'edit', i)} />
              </>
          );
      case 'Branch Improvement':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'PENDING', 'ON PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING', 'create')} customAddLabel="New Improvement" onImportClick={handleOpenImport} />
                  <BuildingTable data={buildings} onView={(i) => openModal('BUILDING', 'view', i)} onEdit={(i) => openModal('BUILDING', 'edit', i)} />
              </>
          );
      case 'Compliance & Legal':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('COMPLIANCE', 'create')} customAddLabel="Add Document" onImportClick={handleOpenImport} />
                  <ReminderTable data={complianceDocs} onView={(i) => openModal('COMPLIANCE', 'view', i)} />
              </>
          );

      // --- GENERAL ASSET MODULE ---
      case 'Asset HC':
      case 'Asset IT':
      case 'Customer Service':
          const filteredGA = generalAssets.filter(g => g.assetCategory?.includes(activeItem.split(' ')[1]));
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'OWN', 'RENT', 'DISPOSED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GENERAL_ASSET', 'create')} customAddLabel={`Request ${activeItem}`} onImportClick={handleOpenImport}/>
                  <GeneralAssetTable data={filteredGA} onView={(i) => openModal('GENERAL_ASSET', 'view', i)} onEdit={(i) => openModal('GENERAL_ASSET', 'edit', i)} />
              </>
          );
      case 'Pemeliharaan Asset':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'SCHEDULED', 'IN PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING_MAINTENANCE', 'create')} customAddLabel="New Maintenance" />
                  <BuildingMaintenanceTable data={buildingMaintenances} onView={(i) => openModal('BUILDING_MAINTENANCE', 'view', i)} onEdit={(i) => openModal('BUILDING_MAINTENANCE', 'edit', i)} />
              </>
          );
      case 'Reminder Pemeliharaan':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'OVERDUE', 'DUE SOON', 'ON SCHEDULE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MAINTENANCE_SCHEDULE', 'create')} hideAdd={true} onImportClick={handleOpenImport} />
                  <MaintenanceReminderTable data={assetMaintenances} onEdit={(i) => openModal('MAINTENANCE_SCHEDULE', 'edit', i)} />
              </>
          );
      case 'Mutasi Aset':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MUTATION', 'create', undefined, { type: 'GENERAL_ASSET' })} customAddLabel="New Asset Mutation" />
                  <MutationTable data={assetMutations} onView={(i) => openModal('MUTATION', 'view', i, { type: 'GENERAL_ASSET' })} onEdit={(i) => openModal('MUTATION', 'edit', i, { type: 'GENERAL_ASSET' })} />
              </>
          );
      case 'Penjualan Aset':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'OPEN BID', 'SOLD', 'SCRAP']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SALES', 'create', undefined, { type: 'GENERAL_ASSET' })} customAddLabel="New Asset Sale" />
                  <SalesTable data={assetSales} onView={(i) => openModal('SALES', 'view', i, { type: 'GENERAL_ASSET' })} onEdit={(i) => openModal('SALES', 'edit', i, { type: 'GENERAL_ASSET' })} />
              </>
          );

      // --- INSURANCE MODULE ---
      case 'Insurance Dashboard': return <InsuranceDashboard data={insurances} />;
      case 'All Policies':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'EXPIRING', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE', 'create')} customAddLabel="New Policy" onImportClick={handleOpenImport} />
                  <InsurancePolicyTable data={insurances} onView={(i) => openModal('INSURANCE', 'view', i)} onEdit={(i) => openModal('INSURANCE', 'edit', i)} />
              </>
          );
      case 'Insurance Claims':
          const displayClaims = insurances.flatMap(pol => 
              (pol.claims || []).map(claim => ({
                  ...claim,
                  policyNumber: pol.policyNumber,
                  assetName: pol.assetName || pol.assets?.[0]?.name || 'Unknown',
                  provider: pol.provider,
                  policyId: pol.id
              }))
          );
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'SUBMITTED', 'APPROVED', 'PAID', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_CLAIM', 'create')} customAddLabel="New Claim" />
                  <InsuranceClaimTable data={displayClaims} onEdit={(item) => openModal('INSURANCE_CLAIM', 'edit', item)} />
              </>
          );
      case 'Expiring Soon':
          // Combine system-generated reminders (from policies) + manual reminders
          const systemReminders: ReminderRecord[] = insurances.filter(i => {
              const days = Math.ceil((new Date(i.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
              // Filter by Active Tab Logic if needed, but here we just convert all expiring
              return i.status === 'Expiring' || (days <= 60 && days > -30); 
          }).map(i => ({
              id: i.id,
              category: 'Insurance',
              documentName: `Policy Renewal: ${i.policyNumber}`,
              buildingName: i.assets?.[0]?.name || i.assetName || 'Unknown Asset',
              assetNo: i.assets?.[0]?.identifier || '-',
              expiryDate: i.endDate,
              status: i.status === 'Expired' ? 'Expired' : 'Warning',
              source: 'System'
          }));

          const allReminders = [...systemReminders, ...insuranceReminders];
          
          // Apply Tab Filtering
          const filteredReminders = activeTab === 'SEMUA' 
              ? allReminders 
              : allReminders.filter(r => r.category?.toUpperCase() === activeTab || (activeTab === 'VEHICLE' && r.assetNo.includes('B')) || (activeTab === 'BUILDING' && !r.assetNo.includes('B'))); // Simple heuristic

          return (
              <>
                  <FilterBar 
                      tabs={['SEMUA', 'VEHICLE', 'BUILDING']} 
                      activeTab={activeTab} 
                      onTabChange={setActiveTab} 
                      onAddClick={() => openModal('INSURANCE_REMINDER', 'create')} 
                      customAddLabel="Add Reminder"
                      onImportClick={handleOpenImport}
                  />
                  <ReminderTable 
                      data={filteredReminders} 
                      onView={(i) => {
                          if (i.source === 'System') {
                              // View original policy
                              const policy = insurances.find(p => p.id === i.id);
                              if(policy) openModal('INSURANCE', 'view', policy);
                          } else {
                              // View manual reminder
                              openModal('INSURANCE_REMINDER', 'edit', i);
                          }
                      }}
                      onDelete={(id) => setInsuranceReminders(prev => prev.filter(r => r.id !== id))} 
                  />
              </>
          );
      case 'Insurance Providers':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_PROVIDER', 'create')} customAddLabel="Add Provider" onImportClick={handleOpenImport} />
                  <InsuranceProviderTable data={insuranceProviders} onEdit={(i) => openModal('INSURANCE_PROVIDER', 'edit', i)} />
              </>
          );

      // --- FACILITY MODULE ---
      case 'Permintaan Pod':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'DRAFT', 'WAITING APPROVAL', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('POD_REQUEST', 'create')} customAddLabel="TAMBAH DATA" />
                  <PodRequestTable data={podRequests} onView={(i) => openModal('POD_REQUEST', 'view', i)} />
              </>
          );
      case 'Persetujuan Pod':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'WAITING APPROVAL', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => {}} hideAdd={true} />
                  <PodApprovalTable 
                      data={podRequests} 
                      onView={(i) => openModal('POD_REQUEST', 'approve', i)} 
                  />
              </>
          );
      case 'Request MODENA Pod':
          // Legacy redirect or alias
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('POD_REQUEST', 'create')} customAddLabel="Request Pod" />
                  <PodRequestTable data={podRequests} onView={(i) => openModal('POD_REQUEST', 'view', i)} />
              </>
          );
      case 'Daftar Loker':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'TERISI', 'KOSONG', 'RUSAK']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOCKER', 'create')} customAddLabel="Add Locker" onImportClick={handleOpenImport}/>
                  <LockerTable data={lockers} onView={(i) => openModal('LOCKER', 'view', i)} onEdit={(i) => openModal('LOCKER', 'edit', i)} />
              </>
          );
      case 'Request Locker':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'DRAFT', 'WAITING APPROVAL', 'APPROVED', 'REJECTED', 'CLOSED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOCKER_REQUEST', 'create')} customAddLabel="TAMBAH DATA" />
                  <LockerRequestTable 
                    data={lockerRequests} 
                    onView={(i) => openModal('LOCKER_REQUEST', 'view', i)} 
                    // removed onAction
                  />
              </>
          );
      case 'Locker Approval':
          return (
              <>
                  <FilterBar 
                    tabs={['SEMUA', 'WAITING APPROVAL', 'APPROVED', 'REJECTED']} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    hideAdd={true} 
                    onAddClick={() => {}}
                  />
                  <LockerRequestTable 
                    data={lockerRequests.filter(r => {
                        if (activeTab === 'SEMUA') return r.status === 'Pending';
                        if (activeTab === 'WAITING APPROVAL') return r.status === 'Pending';
                        if (activeTab === 'APPROVED') return r.status === 'Approved';
                        if (activeTab === 'REJECTED') return r.status === 'Rejected';
                        return true;
                    })} 
                    onView={(i) => openModal('LOCKER_REQUEST', 'approve', i)} 
                    // removed onAction, workflow action handled in detail view
                  />
              </>
          );
      case 'Tenant Pod':
          return (
              <>
                  <FilterBar 
                      tabs={['SEMUA', 'LT 2 PRIA', 'LT 2 PEREMPUAN', 'LT 3 PRIA', 'LT 3 PEREMPUAN']} 
                      activeTab={activeTab} 
                      onTabChange={setActiveTab} 
                      onAddClick={() => openModal('TENANT_POD', 'create')} 
                      customAddLabel="TAMBAH DATA" 
                      onImportClick={handleOpenImport}
                  />
                  <TenantPodTable 
                      data={tenantPods} 
                      onView={(i) => openModal('TENANT_POD', 'view', i)} 
                      onEdit={(i) => openModal('TENANT_POD', 'edit', i)} 
                  />
              </>
          );

      // --- DAILY OPS & ADMIN ---
      case 'Log Book':
          // Filter logic for Log Book based on Active Tab
          const filteredLogBooks = logBooks.filter(log => {
              if (activeTab === 'SEMUA') return true;
              // Map UI tabs to Data Category (Case Insensitive)
              return log.kategoriTamu?.toUpperCase() === activeTab;
          });

          return (
              <>
                  <FilterBar 
                      tabs={['SEMUA', 'VISITOR', 'SUPPLIER', 'INTERNAL', 'OTHERS']} 
                      activeTab={activeTab} 
                      onTabChange={setActiveTab} 
                      onAddClick={() => openModal('LOGBOOK', 'create')} 
                      customAddLabel="INPUT TAMU" 
                      onImportClick={handleOpenImport}
                  />
                  <LogBookTable 
                      data={filteredLogBooks} 
                      onView={(i) => openModal('LOGBOOK', 'view', i)} 
                      onEdit={(i) => openModal('LOGBOOK', 'edit', i)}
                      onDelete={(id) => handleDeleteLogBook(id)} 
                  />
              </>
          );
      case 'Timesheet':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'TEPAT WAKTU', 'TERLAMBAT']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('TIMESHEET', 'create')} customAddLabel="Add Log" onImportClick={handleOpenImport}/>
                  <TimesheetTable data={timesheets} onView={(i) => openModal('TIMESHEET', 'view', i)} onEdit={(i) => openModal('TIMESHEET', 'edit', i)} />
              </>
          );
      case 'Vendor':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'GOODS', 'SERVICE', 'BOTH']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VENDOR', 'create')} customAddLabel="Add Vendor" onImportClick={handleOpenImport}/>
                  <VendorTable data={vendors} onView={(i) => openModal('VENDOR', 'view', i)} onEdit={(i) => openModal('VENDOR', 'edit', i)} />
              </>
          );
      case 'Manajemen User':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('USER', 'create')} customAddLabel="Add User" onImportClick={handleOpenImport}/>
                  <UserTable data={users} onView={(i) => openModal('USER', 'view', i)} onEdit={(i) => openModal('USER', 'edit', i)} />
              </>
          );
      
      // --- MASTER DATA ---
      case 'Master Approval':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'MODULE', 'BRANCH']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MASTER_APPROVAL', 'create')} customAddLabel="Add Workflow" />
                  <MasterApprovalTable data={masterApprovals} onEdit={(i) => openModal('MASTER_APPROVAL', 'edit', i)} onDelete={() => {}} />
              </>
          );
      case 'Master Vendor':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VENDOR', 'create')} customAddLabel="Add Master Vendor" onImportClick={handleOpenImport}/>
                  <MasterVendorTable data={vendors as any} onView={(i) => openModal('VENDOR', 'view', i as any)} onEdit={(i) => openModal('VENDOR', 'edit', i as any)} />
              </>
          );
      case 'Master Pod':
          return (
              <>
                  <FilterBar 
                      tabs={['SEMUA', 'LT 2', 'LT 3']} 
                      activeTab={activeTab} 
                      onTabChange={setActiveTab} 
                      onAddClick={() => openModal('MASTER_POD', 'create')} 
                      customAddLabel="TAMBAH DATA" 
                      onImportClick={handleOpenImport}
                      podFilters={{ lantai: '', jenisKamar: '' }}
                      onPodFilterChange={() => {}} // Placeholder
                  />
                  <MasterPodTable 
                      data={masterPods} 
                      onView={(i) => openModal('MASTER_POD', 'view', i)} 
                      onEdit={(i) => openModal('MASTER_POD', 'edit', i)} 
                  />
              </>
          );
      case 'Sync Branchs':
      case 'Sync Channels':
          return (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p className="text-xl font-bold uppercase tracking-widest">{activeItem}</p>
                  <p className="text-sm mt-2">Sync process triggered in background...</p>
              </div>
          );
      
      // Handle all other General Master items
      default:
          // Check if active item is in our master data map
          if (masterDataMap[activeItem]) {
              return (
                  <>
                      <FilterBar tabs={['LIST']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GENERAL_MASTER', 'create', undefined, { title: activeItem })} customAddLabel="Add Item" onImportClick={handleOpenImport}/>
                      <GeneralMasterTable data={masterDataMap[activeItem]} onEdit={(i) => openModal('GENERAL_MASTER', 'edit', i, { title: activeItem })} onDelete={() => {}} title={activeItem} />
                  </>
              );
          }
          
          return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p className="text-xl font-bold">Welcome to {activeItem}</p>
              <p className="text-sm">Select a module from the sidebar</p>
            </div>
          );
    }
  };

  return (
    <div className="flex h-screen bg-[#FBFBFB] font-sans text-black">
      <Sidebar 
        activeItem={activeItem} 
        onNavigate={handleNavigate} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        userRole={userRole} // PASS ROLE
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'}`}>
        <TopBar 
            breadcrumbs={['Home', activeItem]} 
            onMenuClick={() => setIsMobileMenuOpen(true)}
            userRole={userRole}
            onRoleChange={setUserRole} // PASS ROLE HANDLER
        />
        
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </main>
      </div>

      {/* --- GLOBAL MODALS --- */}
      
      <MasterRequestTypeModal
        isOpen={modalState.isOpen && modalState.type === 'REQUEST_TYPE'}
        onClose={closeModal}
        onSave={handleSaveRequestType}
        initialData={modalState.data}
        mode={modalState.mode as any}
      />
      
      {/* Workflow Action Modal */}
      <WorkflowActionModal 
          isOpen={workflowAction.isOpen}
          onClose={handleCloseWorkflow}
          onSubmit={handleSubmitWorkflow}
          action={workflowAction.action}
          entityName={workflowAction.item?.id || workflowAction.item?.opnameId || 'Unknown ID'}
      />

      {/* NEW Generic Import Modal */}
      <ImportDataModal
          isOpen={importState.isOpen}
          onClose={() => setImportState({ ...importState, isOpen: false })}
          title={importState.title}
          templateName={getImportTemplateName(importState.module)}
          onImport={(file) => {
              console.log(`Importing ${file.name} for ${importState.module}`);
              // In a real app, this would trigger an API call based on module
              alert(`File ${file.name} uploaded successfully for ${importState.module}`);
              setImportState({ ...importState, isOpen: false });
          }}
      />
      
      {/* Log Book Modal (Dedicated) */}
      <LogBookModal
        isOpen={modalState.isOpen && modalState.type === 'LOGBOOK'}
        onClose={closeModal}
        onSave={handleSaveLogBook}
        initialData={modalState.data}
        mode={modalState.mode as any}
      />

      {/* Add Stock Modal (ATK/ARK only now) */}
      <AddStockModal 
        isOpen={modalState.isOpen && (['ATK_REQUEST', 'ARK_REQUEST', 'ATK_APPROVAL', 'ARK_APPROVAL'].includes(modalState.type))}
        onClose={closeModal}
        onSave={() => {}}
        moduleName={modalState.type.includes('ATK') ? 'ATK' : 'ARK'}
        mode={modalState.mode}
        initialAssetData={modalState.type.includes('APPROVAL') || modalState.type.includes('REQUEST') ? modalState.data : undefined}
        onSaveStationeryRequest={(data) => { 
            // Simple mock save
            const newReq: AssetRecord = { id: Date.now(), transactionNumber: `TRX/${Date.now()}`, employee: {name: 'User', role: 'Staff'}, category: 'ATK', itemName: 'New Item', qty: 1, date: '2024-01-01', status: 'Pending' };
            if(modalState.type.includes('ARK')) setArkRequests(prev => [newReq, ...prev]);
            else setAtkRequests(prev => [newReq, ...prev]);
            closeModal();
        }}
      />

      {/* ... Other Modals ... */}
      <MasterItemModal
        isOpen={modalState.isOpen && modalState.type === 'MASTER_ITEM'}
        onClose={closeModal}
        onSave={handleSaveMasterItem}
        initialData={modalState.data}
        moduleName={activeItem.includes('ARK') ? 'ARK' : 'ATK'}
        mode={modalState.mode as any}
      />

      <DeliveryLocationModal
        isOpen={modalState.isOpen && modalState.type === 'DELIVERY_LOCATION'}
        onClose={closeModal}
        onSave={(data) => {
            if (modalState.mode === 'create') {
                setDeliveryLocations(prev => [...prev, { ...data, id: Date.now() } as DeliveryLocationRecord]);
            } else {
                setDeliveryLocations(prev => prev.map(item => item.id === modalState.data.id ? { ...item, ...data } as DeliveryLocationRecord : item));
            }
            closeModal();
        }}
        initialData={modalState.data}
        mode={modalState.mode as any}
      />

      {/* Vehicle Modals */}
      <VehicleModal 
        isOpen={modalState.isOpen && modalState.type === 'VEHICLE'} 
        onClose={closeModal} 
        onSave={(d) => { if(modalState.mode==='create') setVehicles(p=>[...p, {...d, id: Date.now()} as VehicleRecord]); closeModal(); }} 
        initialData={modalState.data} 
        mode={modalState.mode as any}
        brandList={MOCK_BRAND_DATA} colorList={MOCK_COLOR_DATA}
        channelList={MOCK_GENERAL_MASTER_DATA} // Mock or correct list
        branchList={MOCK_LOCATION_DATA}
      />
      <VehicleContractModal isOpen={modalState.isOpen && modalState.type === 'VEHICLE_CONTRACT'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} vehicleList={vehicles} />
      <ServiceModal isOpen={modalState.isOpen && modalState.type === 'SERVICE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} vehicleList={vehicles} vendorList={vendors} />
      <TaxKirModal isOpen={modalState.isOpen && modalState.type === 'TAX_KIR'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} vehicleList={vehicles} channelList={[]} branchList={MOCK_LOCATION_DATA} />
      <VehicleReminderModal isOpen={modalState.isOpen && modalState.type === 'VEHICLE_REMINDER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} vehicleList={vehicles} />
      
      {/* Mutation & Sales (Shared for Vehicle & General Asset) */}
      <MutationModal 
        isOpen={modalState.isOpen && modalState.type === 'MUTATION'} 
        onClose={closeModal} 
        onSave={() => closeModal()} 
        initialData={modalState.data} 
        mode={modalState.mode as any} 
        vehicleList={vehicles}
        generalAssetList={[...generalAssets, ...MOCK_BUILDING_ASSETS]} // Combined list for selection
        assetType={modalState.extraData?.type || 'VEHICLE'}
      />
      <SalesModal 
        isOpen={modalState.isOpen && modalState.type === 'SALES'} 
        onClose={closeModal} 
        onSave={() => closeModal()} 
        initialData={modalState.data} 
        mode={modalState.mode as any} 
        vehicleList={vehicles}
        generalAssetList={[...generalAssets, ...MOCK_BUILDING_ASSETS]}
        assetType={modalState.extraData?.type || 'VEHICLE'}
      />

      {/* Building Modals */}
      <BuildingModal isOpen={modalState.isOpen && modalState.type === 'BUILDING'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} existingBuildings={buildings} buildingTypeList={MOCK_BUILDING_TYPE_DATA} />
      <UtilityModal isOpen={modalState.isOpen && modalState.type === 'UTILITY'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} buildingList={buildings} />
      <ComplianceModal isOpen={modalState.isOpen && modalState.type === 'COMPLIANCE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} buildingList={buildings} />
      <BuildingMaintenanceModal isOpen={modalState.isOpen && modalState.type === 'BUILDING_MAINTENANCE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} buildingList={buildings} assetList={MOCK_BUILDING_ASSETS} />

      {/* General Asset Modals */}
      <AssetGeneralModal isOpen={modalState.isOpen && modalState.type === 'GENERAL_ASSET'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} assetTypeList={MOCK_ASSET_TYPE_DATA} categoryList={MOCK_ASSET_CATEGORY_DATA} locationList={MOCK_LOCATION_DATA} departmentList={MOCK_DEPARTMENT_DATA} />
      <MaintenanceScheduleModal isOpen={modalState.isOpen && modalState.type === 'MAINTENANCE_SCHEDULE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} assetList={MOCK_BUILDING_ASSETS} />

      {/* Insurance Modals */}
      <InsuranceModal isOpen={modalState.isOpen && modalState.type === 'INSURANCE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} assetList={[...vehicles, ...buildings]} />
      <InsuranceClaimModal isOpen={modalState.isOpen && modalState.type === 'INSURANCE_CLAIM'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} policies={insurances} />
      <InsuranceProviderModal isOpen={modalState.isOpen && modalState.type === 'INSURANCE_PROVIDER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      
      {/* New Insurance Reminder Modal */}
      <InsuranceReminderModal 
        isOpen={modalState.isOpen && modalState.type === 'INSURANCE_REMINDER'} 
        onClose={closeModal} 
        onSave={(data) => {
            if (modalState.mode === 'create') {
                const newReminder = { ...data, id: `REM-${Date.now()}`, source: 'Manual' } as ReminderRecord;
                setInsuranceReminders(prev => [newReminder, ...prev]);
            } else {
                setInsuranceReminders(prev => prev.map(r => r.id === modalState.data.id ? { ...r, ...data } as ReminderRecord : r));
            }
            closeModal();
        }} 
        initialData={modalState.data}
        mode={modalState.mode as any} 
        vehicleList={vehicles}
        buildingList={buildings}
      />

      {/* Facility Modals */}
      <PodRequestModal 
          isOpen={modalState.isOpen && modalState.type === 'POD_REQUEST'} 
          onClose={closeModal} 
          onSave={() => closeModal()} 
          initialData={modalState.data} 
          mode={modalState.mode as any} 
      />
      
      <LockerModal isOpen={modalState.isOpen && modalState.type === 'LOCKER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      <LockerRequestModal 
        isOpen={modalState.isOpen && modalState.type === 'LOCKER_REQUEST'} 
        onClose={closeModal} 
        onSave={(data) => {
             if (modalState.mode === 'create') {
                setLockerRequests(prev => [...prev, { ...data, id: `REQ-LOC-${Date.now()}` } as LockerRequestRecord]);
             } else {
                setLockerRequests(prev => prev.map(item => item.id === modalState.data.id ? { ...item, ...data } as LockerRequestRecord : item));
             }
             closeModal();
        }} 
        initialData={modalState.data} 
        mode={modalState.mode as any} 
        currentUser={users[0]} // Mock user context
      />
      <MasterPodModal 
        isOpen={modalState.isOpen && modalState.type === 'MASTER_POD'}
        onClose={closeModal}
        onSave={() => closeModal()}
        initialData={modalState.data}
        mode={modalState.mode as any}
      />
      <TenantPodModal 
        isOpen={modalState.isOpen && modalState.type === 'TENANT_POD'}
        onClose={closeModal}
        onSave={() => closeModal()}
        initialData={modalState.data}
        mode={modalState.mode as any}
      />

      {/* Stock Opname Modals */}
      <AddStockOpnameModal 
        isOpen={modalState.isOpen && modalState.type === 'STOCK_OPNAME_INIT'} 
        onClose={closeModal} 
        onSave={(records) => { setStockOpnames(prev => [...prev, ...records]); closeModal(); }} 
        mode={modalState.mode as any}
        initialData={modalState.data} // Pass data for view/edit
        onApprove={handleStockOpnameApproval} // Pass handlers for approval
        onReject={handleStockOpnameApproval}
      />

      {/* Admin Modals */}
      <TimesheetModal 
        isOpen={modalState.isOpen && modalState.type === 'TIMESHEET'} 
        onClose={closeModal} 
        onSave={() => closeModal()} 
        initialData={modalState.data} 
        mode={modalState.mode as any} 
        buildingList={buildings} 
        userList={users} 
      />
      <VendorModal isOpen={modalState.isOpen && modalState.type === 'VENDOR'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      <UserModal isOpen={modalState.isOpen && modalState.type === 'USER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} departmentList={MOCK_DEPARTMENT_DATA} locationList={MOCK_LOCATION_DATA} roleList={MOCK_ROLE_DATA} />
      <MasterApprovalModal isOpen={modalState.isOpen && modalState.type === 'MASTER_APPROVAL'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} branchList={MOCK_LOCATION_DATA} roleList={MOCK_ROLE_DATA} userList={users} />
      <GeneralMasterModal isOpen={modalState.isOpen && modalState.type === 'GENERAL_MASTER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} title={modalState.extraData?.title || 'Master Data'} />

    </div>
  );
};

export default App;
