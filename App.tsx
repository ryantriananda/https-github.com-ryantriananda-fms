
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';

// --- COMPONENT IMPORTS ---
// General & Dashboard
import { InsuranceDashboard } from './components/InsuranceDashboard';

// Asset: Vehicles
import { VehicleTable } from './components/VehicleTable';
import { VehicleModal } from './components/VehicleModal';
import { VehicleContractTable } from './components/VehicleContractTable';
import { VehicleContractModal } from './components/VehicleContractModal';
import { ServiceTable } from './components/ServiceTable';
import { ServiceModal } from './components/ServiceModal'; // Note: ServiceTable usually shares this
import { ServiceLogTable } from './components/ServiceLogTable'; // Specific for logs
import { TaxKirTable } from './components/TaxKirTable';
import { TaxKirModal } from './components/TaxKirModal';
import { VehicleReminderTable } from './components/VehicleReminderTable';
import { VehicleReminderModal } from './components/VehicleReminderModal';
import { MutationTable } from './components/MutationTable';
import { MutationModal } from './components/MutationModal';
import { SalesTable } from './components/SalesTable';
import { SalesModal } from './components/SalesModal';

// Asset: Buildings
import { BuildingTable } from './components/BuildingTable';
import { BuildingModal } from './components/BuildingModal';
import { UtilityTable } from './components/UtilityTable';
import { UtilityModal } from './components/UtilityModal';
import { ReminderTable } from './components/ReminderTable'; // Compliance/Legal
import { ComplianceModal } from './components/ComplianceModal';
import { BuildingAssetTable } from './components/BuildingAssetTable';
import { BuildingAssetItemModal } from './components/BuildingAssetItemModal';
import { BuildingMaintenanceTable } from './components/BuildingMaintenanceTable';
import { BuildingMaintenanceModal } from './components/BuildingMaintenanceModal';

// Asset: General
import { GeneralAssetTable } from './components/GeneralAssetTable';
import { AssetGeneralModal } from './components/AssetGeneralModal';

// Insurance (New Module)
import { InsurancePolicyTable } from './components/InsurancePolicyTable';
import { InsuranceModal } from './components/InsuranceModal';
import { InsuranceClaimTable, DisplayClaim } from './components/InsuranceClaimTable';
import { InsuranceClaimModal } from './components/InsuranceClaimModal';
import { InsuranceProviderTable } from './components/InsuranceProviderTable';
import { InsuranceProviderModal } from './components/InsuranceProviderModal';
import { InsuranceReminderModal } from './components/InsuranceReminderModal';

// Facility Services
import { ModenaPodTable } from './components/ModenaPodTable';
import { PodCensusModal } from './components/PodCensusModal';
import { PodRequestTable } from './components/PodRequestTable';
import { PodRequestModal } from './components/PodRequestModal';
import { LockerTable } from './components/LockerTable';
import { LockerModal } from './components/LockerModal';
import { LockerRequestTable } from './components/LockerRequestTable';
import { LockerRequestModal } from './components/LockerRequestModal';
import { StockOpnameTable } from './components/StockOpnameTable';
// import { StockOpnameModal } from './components/StockOpnameModal'; // Assuming generic or placeholder

// Consumables (ATK/ARK)
import { AssetTable } from './components/AssetTable'; // Used for requests
import { AddStockModal } from './components/AddStockModal'; // Used for ATK/ARK/Logbook
import { MasterAtkTable } from './components/MasterAtkTable';
import { MasterItemModal } from './components/MasterItemModal';

// Operations
import { LogBookTable } from './components/LogBookTable';
// LogBookModal uses AddStockModal in this codebase structure
import { TimesheetTable } from './components/TimesheetTable';
import { TimesheetModal } from './components/TimesheetModal';

// Administration & Master
import { VendorTable } from './components/VendorTable';
import { VendorModal } from './components/VendorModal';
import { UserTable } from './components/UserTable';
import { UserModal } from './components/UserModal';
import { MasterApprovalTable } from './components/MasterApprovalTable';
import { MasterApprovalModal } from './components/MasterApprovalModal';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { MaintenanceScheduleModal } from './components/MaintenanceScheduleModal'; // For scheduling

import { 
  MOCK_VEHICLE_DATA, MOCK_VEHICLE_CONTRACT_DATA, MOCK_SERVICE_DATA, MOCK_TAX_KIR_DATA, 
  MOCK_VEHICLE_REMINDER_DATA, MOCK_MUTATION_DATA, MOCK_SALES_DATA,
  MOCK_BUILDING_DATA, MOCK_UTILITY_DATA, MOCK_REMINDER_DATA, MOCK_BUILDING_ASSETS, MOCK_BUILDING_MAINTENANCE_DATA,
  MOCK_GENERAL_ASSET_DATA,
  MOCK_INSURANCE_DATA, MOCK_INSURANCE_PROVIDERS,
  MOCK_POD_DATA, MOCK_POD_REQUEST_DATA, MOCK_LOCKER_DATA, MOCK_LOCKER_REQUEST_DATA, MOCK_STOCK_OPNAME_DATA,
  MOCK_DATA, MOCK_ARK_DATA, MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA,
  MOCK_LOGBOOK_DATA, MOCK_TIMESHEET_DATA,
  MOCK_VENDOR_DATA, MOCK_USER_DATA,
  MOCK_BRAND_DATA, MOCK_COLOR_DATA, MOCK_DEPARTMENT_DATA, MOCK_LOCATION_DATA,
  MOCK_UOM_DATA, MOCK_GENERAL_MASTER_DATA
} from './constants';

import { 
    VehicleRecord, VehicleContractRecord, ServiceRecord, TaxKirRecord, VehicleReminderRecord, MutationRecord, SalesRecord,
    BuildingRecord, UtilityRecord, ReminderRecord, BuildingAssetRecord, BuildingMaintenanceRecord,
    GeneralAssetRecord,
    InsuranceRecord, InsuranceClaim, InsuranceProviderRecord,
    ModenaPodRecord, PodRequestRecord, LockerRecord, LockerRequestRecord, StockOpnameRecord,
    AssetRecord, MasterItem,
    LogBookRecord, TimesheetRecord,
    VendorRecord, UserRecord, MasterApprovalRecord, GeneralMasterItem
} from './types';

// Modal Type Definition to handle ALL app modals
type ModalType = 
    | 'VEHICLE' | 'VEHICLE_CONTRACT' | 'SERVICE' | 'TAX_KIR' | 'VEHICLE_REMINDER' | 'MUTATION' | 'SALES'
    | 'BUILDING' | 'UTILITY' | 'COMPLIANCE' | 'BUILDING_ASSET' | 'BUILDING_MAINTENANCE'
    | 'GENERAL_ASSET'
    | 'INSURANCE_POLICY' | 'INSURANCE_CLAIM' | 'INSURANCE_PROVIDER' | 'INSURANCE_REMINDER'
    | 'POD' | 'POD_REQUEST' | 'LOCKER' | 'LOCKER_REQUEST' | 'STOCK_OPNAME'
    | 'ATK_REQUEST' | 'ARK_REQUEST' | 'MASTER_ITEM'
    | 'LOGBOOK' | 'TIMESHEET'
    | 'VENDOR' | 'USER' | 'MASTER_APPROVAL' | 'GENERAL_MASTER' | 'MAINTENANCE_SCHEDULE'
    | null;

type ModalMode = 'create' | 'edit' | 'view';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('SEMUA');

  // --- DATA STATES ---
  // Vehicle
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [contracts, setContracts] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [services, setServices] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [taxKirs, setTaxKirs] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [vehReminders, setVehReminders] = useState<VehicleReminderRecord[]>(MOCK_VEHICLE_REMINDER_DATA);
  const [mutations, setMutations] = useState<MutationRecord[]>(MOCK_MUTATION_DATA);
  const [sales, setSales] = useState<SalesRecord[]>(MOCK_SALES_DATA);

  // Building
  const [buildings, setBuildings] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [utilities, setUtilities] = useState<UtilityRecord[]>(MOCK_UTILITY_DATA);
  const [compliances, setCompliances] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA.filter(r => r.category === 'Legal' || r.category === 'Permit'));
  const [buildingAssets, setBuildingAssets] = useState<BuildingAssetRecord[]>(MOCK_BUILDING_ASSETS);
  const [buildingMaintenances, setBuildingMaintenances] = useState<BuildingMaintenanceRecord[]>(MOCK_BUILDING_MAINTENANCE_DATA);

  // General Asset
  const [generalAssets, setGeneralAssets] = useState<GeneralAssetRecord[]>(MOCK_GENERAL_ASSET_DATA);

  // Insurance
  const [insurancePolicies, setInsurancePolicies] = useState<InsuranceRecord[]>(MOCK_INSURANCE_DATA);
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProviderRecord[]>(MOCK_INSURANCE_PROVIDERS);
  const [insuranceReminders, setInsuranceReminders] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA.filter(r => r.category === 'Insurance'));

  // Facility
  const [pods, setPods] = useState<ModenaPodRecord[]>(MOCK_POD_DATA);
  const [podRequests, setPodRequests] = useState<PodRequestRecord[]>(MOCK_POD_REQUEST_DATA);
  const [lockers, setLockers] = useState<LockerRecord[]>(MOCK_LOCKER_DATA);
  const [lockerRequests, setLockerRequests] = useState<LockerRequestRecord[]>(MOCK_LOCKER_REQUEST_DATA);
  const [stockOpnames, setStockOpnames] = useState<StockOpnameRecord[]>(MOCK_STOCK_OPNAME_DATA);

  // Consumables
  const [atkRequests, setAtkRequests] = useState<AssetRecord[]>(MOCK_DATA);
  const [arkRequests, setArkRequests] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [masterAtk, setMasterAtk] = useState<MasterItem[]>(MOCK_MASTER_DATA);
  const [masterArk, setMasterArk] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);

  // Operations
  const [logbooks, setLogbooks] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  const [timesheets, setTimesheets] = useState<TimesheetRecord[]>(MOCK_TIMESHEET_DATA);

  // Admin
  const [vendors, setVendors] = useState<VendorRecord[]>(MOCK_VENDOR_DATA);
  const [users, setUsers] = useState<UserRecord[]>(MOCK_USER_DATA);
  const [masterApprovals, setMasterApprovals] = useState<MasterApprovalRecord[]>([]);
  // Mock simple state for general masters for demo
  const [generalMasters, setGeneralMasters] = useState<GeneralMasterItem[]>([]);

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // --- HELPERS ---
  const openModal = (type: ModalType, mode: ModalMode = 'create', item: any = null) => {
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

  // --- DERIVED DATA ---
  // Combine all assets for insurance selection
  const allAssetsForInsurance = [...vehicles, ...buildings];
  
  // Flatten insurance claims for table view
  const allInsuranceClaims: DisplayClaim[] = useMemo(() => {
      return insurancePolicies.flatMap(policy => 
          (policy.claims || []).map(claim => ({
              ...claim,
              policyNumber: policy.policyNumber,
              assetName: policy.assets?.[0]?.name || policy.assetName || '-',
              provider: policy.provider,
              policyId: policy.id
          }))
      );
  }, [insurancePolicies]);

  // --- GENERIC HANDLERS (Mock implementation) ---
  const handleSaveData = (data: any) => {
      // In a real app, this would use API calls based on modalType
      // Here we just update the local state for demo purposes
      console.log(`Saving ${modalType}:`, data);
      
      if (modalType === 'VEHICLE') {
          updateState(vehicles, setVehicles, data);
      } else if (modalType === 'INSURANCE_POLICY') {
          updateState(insurancePolicies, setInsurancePolicies, data, 'INS-');
      } else if (modalType === 'INSURANCE_PROVIDER') {
          updateState(insuranceProviders, setInsuranceProviders, data);
      }
      
      closeModal();
  };

  // Helper to update state arrays
  const updateState = (currentState: any[], setState: any, newData: any, idPrefix = 'ID-') => {
      if (modalMode === 'create') {
          setState([...currentState, { ...newData, id: newData.id || `${idPrefix}${Date.now()}` }]);
      } else {
          setState(currentState.map(item => item.id === selectedItem.id ? { ...item, ...newData } : item));
      }
  };

  // Specific Handlers
  const handleSaveClaim = (policyId: string, claim: InsuranceClaim) => {
      const updatedPolicies = insurancePolicies.map(policy => {
          if (policy.id === policyId) {
              const existingClaims = policy.claims || [];
              const updatedClaims = modalMode === 'create' 
                  ? [claim, ...existingClaims] 
                  : existingClaims.map(c => c.id === claim.id ? claim : c);
              return { ...policy, claims: updatedClaims };
          }
          return policy;
      });
      setInsurancePolicies(updatedPolicies);
      closeModal();
  };

  const handleDeleteClaim = (policyId: string, claimId: string) => {
      if (window.confirm('Delete this claim?')) {
          setInsurancePolicies(prev => prev.map(p => {
              if (p.id === policyId) {
                  return { ...p, claims: p.claims?.filter(c => c.id !== claimId) };
              }
              return p;
          }));
      }
  };

  const handleSaveInsuranceReminder = (data: Partial<ReminderRecord>) => {
      // Logic for insurance reminders
      updateState(insuranceReminders, setInsuranceReminders, data, 'REM-');
      closeModal();
  };

  // --- RENDER MODULE CONTENT ---
  const renderModuleContent = () => {
    switch (activeModule) {
        case 'Dashboard':
            return <div className="p-8 text-center text-gray-500">Main Dashboard (Overview) Placeholder</div>;

        // --- KENDARAAN ---
        case 'Daftar Kendaraan':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'MILIK SENDIRI', 'SEWA', 'NON-AKTIF']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE', 'create')} />
                    <VehicleTable data={vehicles} onView={(i) => openModal('VEHICLE', 'view', i)} onEdit={(i) => openModal('VEHICLE', 'edit', i)} onDelete={() => {}} />
                </>
            );
        case 'Kontrak Kendaraan':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'AKTIF', 'AKAN BERAKHIR', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE_CONTRACT', 'create')} />
                    <VehicleContractTable data={contracts} onView={(i) => openModal('VEHICLE_CONTRACT', 'view', i)} onEdit={(i) => openModal('VEHICLE_CONTRACT', 'edit', i)} />
                </>
            );
        case 'Servis':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'SCHEDULED', 'IN PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SERVICE', 'create')} customAddLabel="Input Service" />
                    <ServiceLogTable data={services} onView={(i) => openModal('SERVICE', 'view', i)} onEdit={(i) => openModal('SERVICE', 'edit', i)} />
                </>
            );
        case 'Pajak & KIR':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'PROSES', 'SELESAI']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('TAX_KIR', 'create')} customAddLabel="Req Pajak/KIR" />
                    <TaxKirTable data={taxKirs} onView={(i) => openModal('TAX_KIR', 'view', i)} onEdit={(i) => openModal('TAX_KIR', 'edit', i)} />
                </>
            );
        case 'Reminder Pajak & KIR':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE_REMINDER', 'create')} customAddLabel="Add Reminder" />
                    <VehicleReminderTable data={vehReminders} onEdit={(i) => openModal('VEHICLE_REMINDER', 'edit', i)} />
                </>
            );
        case 'Mutasi':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MUTATION', 'create')} />
                    <MutationTable data={mutations} onView={(i) => openModal('MUTATION', 'view', i)} onEdit={(i) => openModal('MUTATION', 'edit', i)} />
                </>
            );
        case 'Penjualan':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'OPEN BID', 'SOLD']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SALES', 'create')} customAddLabel="New Sale" />
                    <SalesTable data={sales} onView={(i) => openModal('SALES', 'view', i)} onEdit={(i) => openModal('SALES', 'edit', i)} />
                </>
            );

        // --- GEDUNG ---
        case 'Daftar Gedung':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'OWN', 'RENT', 'ACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING', 'create')} />
                    <BuildingTable data={buildings} onView={(i) => openModal('BUILDING', 'view', i)} onEdit={(i) => openModal('BUILDING', 'edit', i)} />
                </>
            );
        case 'Utility Monitoring':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'LISTRIK', 'AIR', 'INTERNET']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('UTILITY', 'create')} customAddLabel="Input Utility" />
                    <UtilityTable data={utilities} onView={(i) => openModal('UTILITY', 'view', i)} onEdit={(i) => openModal('UTILITY', 'edit', i)} />
                </>
            );
        case 'Compliance & Legal':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('COMPLIANCE', 'create')} customAddLabel="Add Document" />
                    <ReminderTable data={compliances} onView={(i) => openModal('COMPLIANCE', 'edit', i)} />
                </>
            );
        case 'Pemeliharaan Asset': // Mapped from sidebar 'Pemeliharaan Asset' under Building/GA? 
        case 'Branch Improvement': // Reuse maintenance for now or building modal logic
             return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING', 'IN PROGRESS']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING_MAINTENANCE', 'create')} customAddLabel="New Request" />
                    <BuildingMaintenanceTable data={buildingMaintenances} onView={(i) => openModal('BUILDING_MAINTENANCE', 'view', i)} onEdit={(i) => openModal('BUILDING_MAINTENANCE', 'edit', i)} />
                </>
             );

        // --- GENERAL ASSET ---
        case 'Asset HC':
        case 'Asset IT':
        case 'Customer Service':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'GOOD', 'BROKEN']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GENERAL_ASSET', 'create')} />
                    <GeneralAssetTable data={generalAssets} onView={(i) => openModal('GENERAL_ASSET', 'view', i)} onEdit={(i) => openModal('GENERAL_ASSET', 'edit', i)} />
                </>
            );

        // --- INSURANCE ---
        case 'Insurance Dashboard': return <InsuranceDashboard data={insurancePolicies} />;
        case 'All Policies':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'ACTIVE', 'EXPIRING', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_POLICY', 'create')} customAddLabel="New Policy" />
                    <InsurancePolicyTable data={insurancePolicies} onView={(i) => openModal('INSURANCE_POLICY', 'view', i)} onEdit={(i) => openModal('INSURANCE_POLICY', 'edit', i)} />
                </>
            );
        case 'Insurance Claims':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'SUBMITTED', 'APPROVED', 'PAID']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_CLAIM', 'create')} customAddLabel="New Claim" />
                    <InsuranceClaimTable data={allInsuranceClaims} onEdit={(i) => openModal('INSURANCE_CLAIM', 'edit', i)} onDelete={handleDeleteClaim} />
                </>
            );
        case 'Expiring Soon':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'URGENT', 'WARNING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_REMINDER', 'create')} customAddLabel="Add Reminder" />
                    <ReminderTable data={insuranceReminders} onView={(i) => openModal('INSURANCE_REMINDER', 'edit', i)} onDelete={(id) => setInsuranceReminders(prev => prev.filter(r => r.id !== id))} />
                </>
            );
        case 'Insurance Providers':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'ACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_PROVIDER', 'create')} customAddLabel="Add Provider" />
                    <InsuranceProviderTable data={insuranceProviders} onEdit={(i) => openModal('INSURANCE_PROVIDER', 'edit', i)} onDelete={() => {}} />
                </>
            );

        // --- FACILITY ---
        case 'Pod Census':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'LT 2', 'LT 3']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('POD', 'create')} customAddLabel="Add Pod" />
                    <ModenaPodTable data={pods} onEdit={(i) => openModal('POD', 'edit', i)} />
                </>
            );
        case 'Request MODENA Pod':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('POD_REQUEST', 'create')} customAddLabel="New Request" />
                    <PodRequestTable data={podRequests} onView={(i) => openModal('POD_REQUEST', 'view', i)} />
                </>
            );
        case 'Daftar Loker':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'TERISI', 'KOSONG']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOCKER', 'create')} customAddLabel="Add Locker" />
                    <LockerTable data={lockers} onEdit={(i) => openModal('LOCKER', 'edit', i)} />
                </>
            );
        case 'Request Locker':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOCKER_REQUEST', 'create')} customAddLabel="New Request" />
                    <LockerRequestTable data={lockerRequests} onView={(i) => openModal('LOCKER_REQUEST', 'view', i)} />
                </>
            );
        case 'Stock Opname':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('STOCK_OPNAME', 'create')} customAddLabel="Start SO" />
                    <StockOpnameTable data={stockOpnames} onEdit={(i) => openModal('STOCK_OPNAME', 'edit', i)} />
                </>
            );

        // --- CONSUMABLES (ATK/ARK) ---
        case 'Request ATK':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('ATK_REQUEST', 'create')} customAddLabel="New Request" />
                    <AssetTable data={atkRequests} onView={(i) => openModal('ATK_REQUEST', 'view', i)} />
                </>
            );
        case 'Master ATK':
            return (
                <>
                    <FilterBar tabs={['SEMUA']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MASTER_ITEM', 'create')} customAddLabel="Add Item" />
                    <MasterAtkTable data={masterAtk} onEdit={(i) => openModal('MASTER_ITEM', 'edit', i)} />
                </>
            );
        case 'Daftar ARK': // Reusing ATK components but with ARK data
             return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('ARK_REQUEST', 'create')} customAddLabel="New Request" />
                    <AssetTable data={arkRequests} onView={(i) => openModal('ARK_REQUEST', 'view', i)} />
                </>
            );
        case 'Master ARK':
             return (
                <>
                    <FilterBar tabs={['SEMUA']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MASTER_ITEM', 'create')} customAddLabel="Add Item" />
                    <MasterAtkTable data={masterArk} onEdit={(i) => openModal('MASTER_ITEM', 'edit', i)} />
                </>
            );

        // --- OPS ---
        case 'Log Book':
            return (
                <>
                    <FilterBar tabs={['SEMUA']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOGBOOK', 'create')} customAddLabel="Input Tamu" />
                    <LogBookTable data={logbooks} onView={(i) => openModal('LOGBOOK', 'view', i)} onEdit={(i) => openModal('LOGBOOK', 'edit', i)} />
                </>
            );
        case 'Timesheet':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'TEPAT WAKTU']} activeTab={activeTab} onTabChange={setActiveTab} hideAdd={true} />
                    <TimesheetTable data={timesheets} onView={(i) => openModal('TIMESHEET', 'view', i)} onEdit={(i) => openModal('TIMESHEET', 'edit', i)} />
                </>
            );

        // --- ADMIN ---
        case 'Vendor':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'ACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VENDOR', 'create')} customAddLabel="Add Vendor" />
                    <VendorTable data={vendors} onView={(i) => openModal('VENDOR', 'view', i)} onEdit={(i) => openModal('VENDOR', 'edit', i)} />
                </>
            );
        case 'Manajemen User':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'ACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('USER', 'create')} customAddLabel="Add User" />
                    <UserTable data={users} onView={(i) => openModal('USER', 'view', i)} onEdit={(i) => openModal('USER', 'edit', i)} />
                </>
            );
        case 'Master Approval':
            return (
                <>
                    <FilterBar tabs={['SEMUA']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MASTER_APPROVAL', 'create')} customAddLabel="Add Workflow" />
                    <MasterApprovalTable data={masterApprovals} onEdit={(i) => openModal('MASTER_APPROVAL', 'edit', i)} onDelete={() => {}} />
                </>
            );
        
        // --- MASTER DATA (Generic) ---
        default:
            // Fallback for Master Data submenus
            if (activeModule.startsWith('Master ')) {
                return (
                    <>
                        <FilterBar tabs={['SEMUA']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GENERAL_MASTER', 'create')} customAddLabel={`Add ${activeModule.replace('Master ', '')}`} />
                        <GeneralMasterTable data={generalMasters} onEdit={(i) => openModal('GENERAL_MASTER', 'edit', i)} onDelete={() => {}} title={activeModule} />
                    </>
                );
            }
            return <div className="p-8 text-center text-gray-500">Module "{activeModule}" is under construction or not linked.</div>;
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

      {/* GLOBAL MODALS */}
      {isModalOpen && (
        <>
            {/* Vehicle Modals */}
            {modalType === 'VEHICLE' && <VehicleModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} brandList={MOCK_BRAND_DATA} colorList={MOCK_COLOR_DATA} />}
            {modalType === 'VEHICLE_CONTRACT' && <VehicleContractModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicles} />}
            {modalType === 'SERVICE' && <ServiceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicles} vendorList={vendors} />}
            {modalType === 'TAX_KIR' && <TaxKirModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicles} />}
            {modalType === 'VEHICLE_REMINDER' && <VehicleReminderModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicles} />}
            {modalType === 'MUTATION' && <MutationModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicles} generalAssetList={generalAssets} assetType={activeModule === 'Mutasi Aset' ? 'GENERAL_ASSET' : 'VEHICLE'} />}
            {modalType === 'SALES' && <SalesModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicles} generalAssetList={generalAssets} assetType={activeModule === 'Penjualan Aset' ? 'GENERAL_ASSET' : 'VEHICLE'} />}

            {/* Building Modals */}
            {modalType === 'BUILDING' && <BuildingModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'UTILITY' && <UtilityModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingList={buildings} />}
            {modalType === 'COMPLIANCE' && <ComplianceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingList={buildings} />}
            {modalType === 'BUILDING_MAINTENANCE' && <BuildingMaintenanceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} assetList={buildingAssets} buildingList={buildings} />}

            {/* General Asset */}
            {modalType === 'GENERAL_ASSET' && <AssetGeneralModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}

            {/* Insurance Modals */}
            {modalType === 'INSURANCE_POLICY' && <InsuranceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} assetList={allAssetsForInsurance} />}
            {modalType === 'INSURANCE_CLAIM' && <InsuranceClaimModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveClaim} initialData={selectedItem} mode={modalMode} policies={insurancePolicies} />}
            {modalType === 'INSURANCE_PROVIDER' && <InsuranceProviderModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'INSURANCE_REMINDER' && <InsuranceReminderModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveInsuranceReminder} initialData={selectedItem} mode={modalMode} vehicleList={vehicles} buildingList={buildings} />}

            {/* Facility */}
            {modalType === 'POD' && <PodCensusModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'POD_REQUEST' && <PodRequestModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'LOCKER' && <LockerModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'LOCKER_REQUEST' && <LockerRequestModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {/* {modalType === 'STOCK_OPNAME' && <StockOpnameModal ... />} */}

            {/* ATK / ARK / Logbook (Sharing AddStockModal logic or specific modals) */}
            {(modalType === 'ATK_REQUEST' || modalType === 'ARK_REQUEST' || modalType === 'LOGBOOK') && (
                <AddStockModal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    moduleName={modalType === 'ARK_REQUEST' ? 'ARK' : modalType === 'LOGBOOK' ? 'Log Book' : 'ATK'}
                    mode={modalMode}
                    initialAssetData={modalType !== 'LOGBOOK' ? selectedItem : undefined}
                    initialLogBookData={modalType === 'LOGBOOK' ? selectedItem : undefined}
                />
            )}
            {modalType === 'MASTER_ITEM' && (
                <MasterItemModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} moduleName={activeModule} />
            )}

            {/* Admin */}
            {modalType === 'VENDOR' && <VendorModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'USER' && <UserModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'MASTER_APPROVAL' && <MasterApprovalModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'GENERAL_MASTER' && <GeneralMasterModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} title={activeModule} />}
            
            {/* Ops */}
            {modalType === 'TIMESHEET' && <TimesheetModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingList={buildings} />}
        </>
      )}
    </div>
  );
};

export default App;
