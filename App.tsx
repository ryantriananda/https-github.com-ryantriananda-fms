
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';

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
import { ReminderTable } from './components/ReminderTable'; // Compliance
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

// Facility
import { ModenaPodTable } from './components/ModenaPodTable';
import { PodCensusModal } from './components/PodCensusModal';
import { PodRequestTable } from './components/PodRequestTable';
import { PodRequestModal } from './components/PodRequestModal';
import { LockerTable } from './components/LockerTable';
import { LockerModal } from './components/LockerModal';
import { LockerRequestTable } from './components/LockerRequestTable';
import { LockerRequestModal } from './components/LockerRequestModal';

// Stock Opname (NEW)
import { StockOpnameTable } from './components/StockOpnameTable';
import { AddStockOpnameModal } from './components/AddStockOpnameModal';
import { ImportStockOpnameModal } from './components/ImportStockOpnameModal';

// Daily Ops & Admin
import { LogBookTable } from './components/LogBookTable';
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

import { 
    AssetRecord, MasterItem, VehicleRecord, VehicleContractRecord, ServiceRecord, TaxKirRecord, 
    VehicleReminderRecord, MutationRecord, SalesRecord, BuildingRecord, UtilityRecord, ReminderRecord, 
    GeneralAssetRecord, BuildingMaintenanceRecord, MaintenanceScheduleRecord, InsuranceRecord, 
    InsuranceProviderRecord, ModenaPodRecord, PodRequestRecord, LockerRecord, LockerRequestRecord, 
    LogBookRecord, TimesheetRecord, VendorRecord, UserRecord, MasterApprovalRecord, 
    GeneralMasterItem, DeliveryLocationRecord, StockOpnameRecord
} from './types';

import { 
    MOCK_DATA, MOCK_MASTER_DATA, MOCK_ARK_DATA, MOCK_MASTER_ARK_DATA,
    MOCK_VEHICLE_DATA, MOCK_VEHICLE_CONTRACT_DATA, MOCK_SERVICE_DATA, MOCK_TAX_KIR_DATA, 
    MOCK_VEHICLE_REMINDER_DATA, MOCK_MUTATION_DATA, MOCK_SALES_DATA,
    MOCK_BUILDING_DATA, MOCK_UTILITY_DATA, MOCK_REMINDER_DATA, MOCK_BUILDING_MAINTENANCE_DATA,
    MOCK_GENERAL_ASSET_DATA, MOCK_INSURANCE_DATA, MOCK_INSURANCE_PROVIDERS,
    MOCK_POD_DATA, MOCK_POD_REQUEST_DATA, MOCK_LOCKER_DATA, MOCK_LOCKER_REQUEST_DATA,
    MOCK_STOCK_OPNAME_DATA, MOCK_LOGBOOK_DATA, MOCK_TIMESHEET_DATA, MOCK_VENDOR_DATA, 
    MOCK_USER_DATA, MOCK_GENERAL_MASTER_DATA, MOCK_BRAND_DATA, MOCK_COLOR_DATA, MOCK_BUILDING_ASSETS,
    MOCK_PPN_DATA, MOCK_BRAND_TYPE_DATA, MOCK_VEHICLE_MODEL_DATA, MOCK_BUILDING_COMPONENT_DATA,
    MOCK_DOC_TYPE_DATA, MOCK_UTILITY_TYPE_DATA, MOCK_OPERATOR_DATA, MOCK_ASSET_TYPE_DATA,
    MOCK_DEPARTMENT_DATA, MOCK_LOCATION_DATA, MOCK_UOM_DATA, MOCK_BUILDING_TYPE_DATA,
    MOCK_COST_CENTER_DATA, MOCK_ASSET_CATEGORY_DATA, MOCK_TAX_TYPE_DATA, MOCK_PAYMENT_TYPE_DATA,
    MOCK_SERVICE_TYPE_DATA, MOCK_MUTATION_STATUS_DATA, MOCK_SALES_STATUS_DATA, MOCK_REQUEST_STATUS_DATA,
    MOCK_MUTATION_TYPE_DATA, MOCK_VENDOR_TYPE_DATA, MOCK_ROLE_DATA, MOCK_VEHICLE_TYPE_DATA,
    MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_DELIVERY_LOCATIONS
} from './constants';

export const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('SEMUA');

  // --- DATA STATES ---
  // ATK/ARK
  const [atkRequests, setAtkRequests] = useState<AssetRecord[]>(MOCK_DATA);
  const [masterAtk, setMasterAtk] = useState<MasterItem[]>(MOCK_MASTER_DATA);
  const [arkRequests, setArkRequests] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [masterArk, setMasterArk] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocationRecord[]>(MOCK_DELIVERY_LOCATIONS);
  const [stockOpnames, setStockOpnames] = useState<StockOpnameRecord[]>(MOCK_STOCK_OPNAME_DATA);
  
  // Vehicle
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [vehicleContracts, setVehicleContracts] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [vehicleServices, setVehicleServices] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [vehicleTaxes, setVehicleTaxes] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [vehicleReminders, setVehicleReminders] = useState<VehicleReminderRecord[]>(MOCK_VEHICLE_REMINDER_DATA);
  const [vehicleMutations, setVehicleMutations] = useState<MutationRecord[]>(MOCK_MUTATION_DATA);
  const [vehicleSales, setVehicleSales] = useState<SalesRecord[]>(MOCK_SALES_DATA);

  // Building
  const [buildings, setBuildings] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [utilities, setUtilities] = useState<UtilityRecord[]>(MOCK_UTILITY_DATA);
  const [complianceDocs, setComplianceDocs] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [buildingMaintenances, setBuildingMaintenances] = useState<BuildingMaintenanceRecord[]>(MOCK_BUILDING_MAINTENANCE_DATA);

  // General Asset
  const [generalAssets, setGeneralAssets] = useState<GeneralAssetRecord[]>(MOCK_GENERAL_ASSET_DATA);
  const [assetMaintenances, setAssetMaintenances] = useState<MaintenanceScheduleRecord[]>([]); // Mock empty for now
  const [assetMutations, setAssetMutations] = useState<MutationRecord[]>([]);
  const [assetSales, setAssetSales] = useState<SalesRecord[]>([]);

  // Insurance
  const [insurances, setInsurances] = useState<InsuranceRecord[]>(MOCK_INSURANCE_DATA);
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProviderRecord[]>(MOCK_INSURANCE_PROVIDERS);

  // Facility
  const [pods, setPods] = useState<ModenaPodRecord[]>(MOCK_POD_DATA);
  const [podRequests, setPodRequests] = useState<PodRequestRecord[]>(MOCK_POD_REQUEST_DATA);
  const [lockers, setLockers] = useState<LockerRecord[]>(MOCK_LOCKER_DATA);
  const [lockerRequests, setLockerRequests] = useState<LockerRequestRecord[]>(MOCK_LOCKER_REQUEST_DATA);

  // Daily Ops & Admin
  const [logBooks, setLogBooks] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  const [timesheets, setTimesheets] = useState<TimesheetRecord[]>(MOCK_TIMESHEET_DATA);
  const [vendors, setVendors] = useState<VendorRecord[]>(MOCK_VENDOR_DATA);
  const [users, setUsers] = useState<UserRecord[]>(MOCK_USER_DATA);
  const [masterApprovals, setMasterApprovals] = useState<MasterApprovalRecord[]>([]);
  
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

  // --- HANDLER FOR STOCK OPNAME APPROVAL ---
  const handleStockOpnameApproval = (opnameId: string, status: 'Approved' | 'Rejected', note?: string) => {
      setStockOpnames(prev => prev.map(record => {
          if (record.opnameId === opnameId) {
              return {
                  ...record,
                  statusApproval: status,
                  approvedBy: 'Current User', // Replace with actual logged-in user
                  approvalDate: new Date().toISOString().split('T')[0],
                  approvalNote: note
              };
          }
          return record;
      }));
      closeModal();
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    switch (activeItem) {
      // --- DASHBOARD ---
      case 'Dashboard':
        return (
            <div className="p-8">
                <InsuranceDashboard data={insurances} />
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Placeholder for other dashboards */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center h-64 text-gray-400 font-bold uppercase tracking-widest text-xs">
                        Asset Overview Chart
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center h-64 text-gray-400 font-bold uppercase tracking-widest text-xs">
                        Maintenance Schedule
                    </div>
                </div>
            </div>
        );

      // --- ATK MODULE ---
      case 'Request ATK':
        return (
            <>
                <FilterBar tabs={['SEMUA', 'DRAFT', 'WAITING APPROVAL', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('ATK_REQUEST', 'create')} customAddLabel="TAMBAH DATA" />
                <StationeryRequestTable data={atkRequests} onView={(i) => openModal('ATK_REQUEST', 'view', i)} />
            </>
        );
      case 'Stationery Request Approval':
        return (
          <>
            <FilterBar tabs={['SEMUA', 'WAITING APPROVAL', 'DISETUJUI', 'DITOLAK']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => {}} hideAdd={true} />
            <StationeryRequestTable data={atkRequests} onView={(i) => openModal('ATK_APPROVAL', 'approve', i)} isApprovalMode={true} onApprove={(i) => openModal('ATK_APPROVAL', 'approve', i)} onReject={(i) => openModal('ATK_APPROVAL', 'approve', i)} />
          </>
        );
      case 'Master ATK': 
        return (
          <>
            <FilterBar 
                tabs={['ITEMS', 'CATEGORY', 'UOM', 'DELIVERY']} 
                activeTab={activeTab === 'SEMUA' ? 'ITEMS' : activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {
                    if (activeTab === 'CATEGORY') openModal('GENERAL_MASTER', 'create', undefined, { title: 'Kategori ATK' });
                    else if (activeTab === 'UOM') openModal('GENERAL_MASTER', 'create', undefined, { title: 'Master Satuan' });
                    else if (activeTab === 'DELIVERY') openModal('DELIVERY_LOCATION', 'create');
                    else openModal('MASTER_ITEM', 'create');
                }} 
                customAddLabel="TAMBAH DATA" 
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
          </>
        );

      // --- ARK MODULE ---
      case 'Daftar ARK':
         return (
            <>
                <FilterBar tabs={['SEMUA', 'DRAFT', 'WAITING APPROVAL', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('ARK_REQUEST', 'create')} customAddLabel="TAMBAH DATA" />
                <StationeryRequestTable data={arkRequests} onView={(i) => openModal('ARK_REQUEST', 'view', i)} />
            </>
         );
      case 'Household Request Approval':
         return (
            <>
                <FilterBar tabs={['SEMUA', 'WAITING APPROVAL', 'DISETUJUI', 'DITOLAK']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => {}} hideAdd={true} />
                <StationeryRequestTable data={arkRequests} onView={(i) => openModal('ARK_APPROVAL', 'approve', i)} isApprovalMode={true} onApprove={(i) => openModal('ARK_APPROVAL', 'approve', i)} onReject={(i) => openModal('ARK_APPROVAL', 'approve', i)} />
            </>
         );
      case 'Master ARK': 
        return (
          <>
            <FilterBar 
                tabs={['ITEMS', 'CATEGORY', 'UOM', 'DELIVERY']} 
                activeTab={activeTab === 'SEMUA' ? 'ITEMS' : activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {
                    if (activeTab === 'CATEGORY') openModal('GENERAL_MASTER', 'create', undefined, { title: 'Kategori ARK' });
                    else if (activeTab === 'UOM') openModal('GENERAL_MASTER', 'create', undefined, { title: 'Master Satuan' });
                    else if (activeTab === 'DELIVERY') openModal('DELIVERY_LOCATION', 'create');
                    else openModal('MASTER_ITEM', 'create');
                }} 
                customAddLabel="TAMBAH DATA" 
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
          </>
        );

      // --- STOCK OPNAME MODULE ---
      case 'Stock Opname':
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
                      onExportClick={() => openModal('STOCK_OPNAME_IMPORT', 'create')}
                  />
                  <StockOpnameTable 
                      data={filteredSO} 
                      onView={(i) => {
                          const opnameItems = stockOpnames.filter(so => so.opnameId === i.opnameId);
                          openModal('STOCK_OPNAME_INIT', 'view', opnameItems);
                      }} 
                      onEdit={(i) => {
                          const opnameItems = stockOpnames.filter(so => so.opnameId === i.opnameId);
                          // Only allow approve mode if pending
                          if (i.statusApproval === 'Pending') {
                              openModal('STOCK_OPNAME_INIT', 'approve', opnameItems);
                          } else {
                              openModal('STOCK_OPNAME_INIT', 'view', opnameItems);
                          }
                      }}
                  />
              </>
          );

      // --- VEHICLE MODULE ---
      case 'Daftar Kendaraan':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'AVAILABLE', 'IN USE', 'SERVICE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE', 'create')} customAddLabel="Request Vehicle" />
                  <VehicleTable data={vehicles} onView={(i) => openModal('VEHICLE', 'view', i)} onEdit={(i) => openModal('VEHICLE', 'edit', i)} />
              </>
          );
      case 'Kontrak Kendaraan':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'EXPIRING SOON', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE_CONTRACT', 'create')} customAddLabel="New Contract" />
                  <VehicleContractTable data={vehicleContracts} onView={(i) => openModal('VEHICLE_CONTRACT', 'view', i)} onEdit={(i) => openModal('VEHICLE_CONTRACT', 'edit', i)} />
              </>
          );
      case 'Servis':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'SCHEDULED', 'IN PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SERVICE', 'create')} customAddLabel="Add Service" moduleName='Servis'/>
                  <ServiceTable data={vehicleServices} onView={(i) => openModal('SERVICE', 'view', i)} onEdit={(i) => openModal('SERVICE', 'edit', i)} />
              </>
          );
      case 'Pajak & KIR':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'PENDING', 'PROCESSED', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('TAX_KIR', 'create')} customAddLabel="Request Pajak/KIR" />
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
                  <FilterBar tabs={['SEMUA', 'OWNED', 'RENTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING', 'create')} customAddLabel="New Branch Req" />
                  <BuildingTable data={buildings} onView={(i) => openModal('BUILDING', 'view', i)} onEdit={(i) => openModal('BUILDING', 'edit', i)} />
              </>
          );
      case 'Utility Monitoring':
          return (
              <>
                  <FilterBar tabs={['OVERVIEW', 'LISTRIK', 'AIR', 'INTERNET']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('UTILITY', 'create')} customAddLabel="Input Utility" />
                  <UtilityTable data={utilities} onView={(i) => openModal('UTILITY', 'view', i)} onEdit={(i) => openModal('UTILITY', 'edit', i)} />
              </>
          );
      case 'Branch Improvement':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'PENDING', 'ON PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING', 'create')} customAddLabel="New Improvement" />
                  <BuildingTable data={buildings} onView={(i) => openModal('BUILDING', 'view', i)} onEdit={(i) => openModal('BUILDING', 'edit', i)} />
              </>
          );
      case 'Compliance & Legal':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('COMPLIANCE', 'create')} customAddLabel="Add Document" />
                  <ReminderTable data={complianceDocs} onView={(i) => openModal('COMPLIANCE', 'view', i)} />
              </>
          );

      // --- GENERAL ASSET MODULE ---
      case 'Asset HC':
      case 'Asset IT':
      case 'Customer Service':
          const filteredGA = generalAssets.filter(g => activeItem === 'General Asset' ? true : g.assetCategory?.includes(activeItem.split(' ')[1]));
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'OWN', 'RENT', 'DISPOSED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GENERAL_ASSET', 'create')} customAddLabel={`Request ${activeItem}`} />
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
                  <FilterBar tabs={['SEMUA', 'OVERDUE', 'DUE SOON', 'ON SCHEDULE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MAINTENANCE_SCHEDULE', 'create')} hideAdd={true} />
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
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'EXPIRING', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE', 'create')} customAddLabel="New Policy" />
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
          const expiringPolicies = insurances.filter(i => {
              const days = Math.ceil((new Date(i.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
              return i.status === 'Expiring' || (days <= 60 && days > -30); 
          });
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'VEHICLE', 'BUILDING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => {}} hideAdd={true} />
                  <InsurancePolicyTable 
                      data={activeTab === 'SEMUA' ? expiringPolicies : expiringPolicies.filter(i => i.category.toUpperCase() === activeTab)} 
                      onView={(i) => openModal('INSURANCE', 'view', i)} 
                      onRenew={(i) => openModal('INSURANCE', 'edit', i)}
                  />
              </>
          );
      case 'Insurance Providers':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_PROVIDER', 'create')} customAddLabel="Add Provider" />
                  <InsuranceProviderTable data={insuranceProviders} onEdit={(i) => openModal('INSURANCE_PROVIDER', 'edit', i)} />
              </>
          );

      // --- FACILITY MODULE ---
      case 'Pod Census':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'AVAILABLE', 'OCCUPIED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('POD_CENSUS', 'create')} customAddLabel="Update Census" />
                  <ModenaPodTable data={pods} onView={(i) => openModal('POD_CENSUS', 'view', i)} onEdit={(i) => openModal('POD_CENSUS', 'edit', i)} />
              </>
          );
      case 'Request MODENA Pod':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('POD_REQUEST', 'create')} customAddLabel="Request Pod" />
                  <PodRequestTable data={podRequests} onView={(i) => openModal('POD_REQUEST', 'view', i)} />
              </>
          );
      case 'Daftar Loker':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'TERISI', 'KOSONG', 'RUSAK']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOCKER', 'create')} customAddLabel="Add Locker" />
                  <LockerTable data={lockers} onView={(i) => openModal('LOCKER', 'view', i)} onEdit={(i) => openModal('LOCKER', 'edit', i)} />
              </>
          );
      case 'Request Locker':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOCKER_REQUEST', 'create')} customAddLabel="Request Locker" />
                  <LockerRequestTable data={lockerRequests} onView={(i) => openModal('LOCKER_REQUEST', 'view', i)} />
              </>
          );

      // --- DAILY OPS & ADMIN ---
      case 'Log Book':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'VISITOR', 'SUPPLIER', 'INTERNAL']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOGBOOK', 'create')} customAddLabel="Input Tamu" />
                  <LogBookTable data={logBooks} onView={(i) => openModal('LOGBOOK', 'view', i)} onEdit={(i) => openModal('LOGBOOK', 'edit', i)} />
              </>
          );
      case 'Timesheet':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'TEPAT WAKTU', 'TERLAMBAT']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('TIMESHEET', 'create')} customAddLabel="Add Log" />
                  <TimesheetTable data={timesheets} onView={(i) => openModal('TIMESHEET', 'view', i)} onEdit={(i) => openModal('TIMESHEET', 'edit', i)} />
              </>
          );
      case 'Vendor':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'GOODS', 'SERVICE', 'BOTH']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VENDOR', 'create')} customAddLabel="Add Vendor" />
                  <VendorTable data={vendors} onView={(i) => openModal('VENDOR', 'view', i)} onEdit={(i) => openModal('VENDOR', 'edit', i)} />
              </>
          );
      case 'Manajemen User':
          return (
              <>
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('USER', 'create')} customAddLabel="Add User" />
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
                  <FilterBar tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VENDOR', 'create')} customAddLabel="Add Master Vendor" />
                  <MasterVendorTable data={vendors as any} onView={(i) => openModal('VENDOR', 'view', i as any)} onEdit={(i) => openModal('VENDOR', 'edit', i as any)} />
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
                      <FilterBar tabs={['LIST']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GENERAL_MASTER', 'create', undefined, { title: activeItem })} customAddLabel="Add Item" />
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
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'}`}>
        <TopBar breadcrumbs={['Home', activeItem]} onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </main>
      </div>

      {/* --- GLOBAL MODALS --- */}
      
      {/* ATK/ARK/Logbook */}
      <AddStockModal 
        isOpen={modalState.isOpen && (['ATK_REQUEST', 'ARK_REQUEST', 'ATK_APPROVAL', 'ARK_APPROVAL', 'LOGBOOK'].includes(modalState.type))}
        onClose={closeModal}
        moduleName={modalState.type.includes('ATK') ? 'ATK' : modalState.type.includes('ARK') ? 'ARK' : 'Log Book'}
        mode={modalState.mode}
        initialAssetData={modalState.type.includes('APPROVAL') || modalState.type.includes('REQUEST') ? modalState.data : undefined}
        initialLogBookData={modalState.type === 'LOGBOOK' ? modalState.data : undefined}
        onSaveLogBook={(data) => { setLogBooks(prev => [ { ...data, id: Date.now() } as LogBookRecord, ...prev]); closeModal(); }}
        onSaveStationeryRequest={(data) => { 
            // Simple mock save
            const newReq: AssetRecord = { id: Date.now(), transactionNumber: `TRX/${Date.now()}`, employee: {name: 'User', role: 'Staff'}, category: 'ATK', itemName: 'New Item', qty: 1, date: '2024-01-01', status: 'Pending' };
            if(modalState.type.includes('ARK')) setArkRequests(prev => [newReq, ...prev]);
            else setAtkRequests(prev => [newReq, ...prev]);
            closeModal();
        }}
      />

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
      />
      <VehicleContractModal isOpen={modalState.isOpen && modalState.type === 'VEHICLE_CONTRACT'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} vehicleList={vehicles} />
      <ServiceModal isOpen={modalState.isOpen && modalState.type === 'SERVICE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} vehicleList={vehicles} vendorList={vendors} />
      <TaxKirModal isOpen={modalState.isOpen && modalState.type === 'TAX_KIR'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} vehicleList={vehicles} />
      <VehicleReminderModal isOpen={modalState.isOpen && modalState.type === 'VEHICLE_REMINDER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} vehicleList={vehicles} />
      
      {/* Mutation & Sales (Shared for Vehicle & General Asset) */}
      <MutationModal 
        isOpen={modalState.isOpen && modalState.type === 'MUTATION'} 
        onClose={closeModal} 
        onSave={() => closeModal()} 
        initialData={modalState.data} 
        mode={modalState.mode as any} 
        vehicleList={vehicles}
        generalAssetList={generalAssets}
        assetType={modalState.extraData?.type || 'VEHICLE'}
      />
      <SalesModal 
        isOpen={modalState.isOpen && modalState.type === 'SALES'} 
        onClose={closeModal} 
        onSave={() => closeModal()} 
        initialData={modalState.data} 
        mode={modalState.mode as any} 
        vehicleList={vehicles}
        generalAssetList={generalAssets}
        assetType={modalState.extraData?.type || 'VEHICLE'}
      />

      {/* Building Modals */}
      <BuildingModal isOpen={modalState.isOpen && modalState.type === 'BUILDING'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} existingBuildings={buildings} />
      <UtilityModal isOpen={modalState.isOpen && modalState.type === 'UTILITY'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} buildingList={buildings} />
      <ComplianceModal isOpen={modalState.isOpen && modalState.type === 'COMPLIANCE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} buildingList={buildings} />
      <BuildingMaintenanceModal isOpen={modalState.isOpen && modalState.type === 'BUILDING_MAINTENANCE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} buildingList={buildings} assetList={MOCK_BUILDING_ASSETS} />

      {/* General Asset Modals */}
      <AssetGeneralModal isOpen={modalState.isOpen && modalState.type === 'GENERAL_ASSET'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      <MaintenanceScheduleModal isOpen={modalState.isOpen && modalState.type === 'MAINTENANCE_SCHEDULE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} assetList={MOCK_BUILDING_ASSETS} />

      {/* Insurance Modals */}
      <InsuranceModal isOpen={modalState.isOpen && modalState.type === 'INSURANCE'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} assetList={[...vehicles, ...buildings]} />
      <InsuranceClaimModal isOpen={modalState.isOpen && modalState.type === 'INSURANCE_CLAIM'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} policies={insurances} />
      <InsuranceProviderModal isOpen={modalState.isOpen && modalState.type === 'INSURANCE_PROVIDER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />

      {/* Facility Modals */}
      <PodCensusModal isOpen={modalState.isOpen && modalState.type === 'POD_CENSUS'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      <PodRequestModal isOpen={modalState.isOpen && modalState.type === 'POD_REQUEST'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      <LockerModal isOpen={modalState.isOpen && modalState.type === 'LOCKER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      <LockerRequestModal isOpen={modalState.isOpen && modalState.type === 'LOCKER_REQUEST'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />

      {/* Stock Opname Modals */}
      <AddStockOpnameModal 
        isOpen={modalState.isOpen && modalState.type === 'STOCK_OPNAME_INIT'} 
        onClose={closeModal} 
        onSave={(records) => { setStockOpnames(prev => [...prev, ...records]); closeModal(); }} 
        mode={modalState.mode as any}
        initialData={modalState.data} // Pass data for view/edit
        onApprove={(opnameId, note) => handleStockOpnameApproval(opnameId, 'Approved', note)}
        onReject={(opnameId, note) => handleStockOpnameApproval(opnameId, 'Rejected', note)}
      />
      <ImportStockOpnameModal
        isOpen={modalState.isOpen && modalState.type === 'STOCK_OPNAME_IMPORT'}
        onClose={closeModal}
        onImport={(file) => { console.log('Importing...', file); closeModal(); }}
      />

      {/* Admin Modals */}
      <TimesheetModal isOpen={modalState.isOpen && modalState.type === 'TIMESHEET'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} buildingList={buildings} userList={users} />
      <VendorModal isOpen={modalState.isOpen && modalState.type === 'VENDOR'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      <UserModal isOpen={modalState.isOpen && modalState.type === 'USER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      <MasterApprovalModal isOpen={modalState.isOpen && modalState.type === 'MASTER_APPROVAL'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} mode={modalState.mode as any} />
      <GeneralMasterModal isOpen={modalState.isOpen && modalState.type === 'GENERAL_MASTER'} onClose={closeModal} onSave={() => closeModal()} initialData={modalState.data} title={modalState.extraData?.title || 'Master Data'} />

    </div>
  );
};

export default App;
