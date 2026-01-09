import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';

// Import All Page Components
import { DashboardPage } from './pages/DashboardPage';
import { RequestATKPage, ATKApprovalPage, MasterATKPage } from './pages/atk';
import { RequestARKPage, ARKApprovalPage, MasterARKPage } from './pages/ark';
import { StockOpnamePage, StockOpnameApprovalPage } from './pages/stockopname';
import { VehicleListPage, VehicleContractPage, ServicePage, TaxKirPage, VehicleReminderPage, VehicleMutationPage, VehicleSalesPage } from './pages/vehicle';
import { BuildingListPage, UtilityPage, BranchImprovementPage, CompliancePage, BuildingMaintenancePage } from './pages/building';
import { GeneralAssetPage, MaintenanceReminderPage, AssetMutationPage, AssetSalesPage } from './pages/asset';
import { InsuranceDashboardPage, InsurancePoliciesPage, InsuranceClaimsPage, InsuranceRemindersPage, InsuranceProvidersPage } from './pages/insurance';
import { PodRequestPage, PodApprovalPage, LockerListPage, LockerRequestPage, LockerApprovalPage, TenantPodPage, MasterPodPage, MasterLockerPage } from './pages/facility';
import { LogBookPage, TimesheetPage, VendorPage, UserManagementPage } from './pages/dailyops';
import { MasterApprovalPage, MasterVendorPage, GeneralMasterPage } from './pages/master';

// Import existing modals for global use
import { ImportDataModal } from './components/ImportDataModal';
import { WorkflowActionModal } from './components/WorkflowActionModal';

// Import types
import { 
    AssetRecord, MasterItem, VehicleRecord, VehicleContractRecord, ServiceRecord, TaxKirRecord, 
    VehicleReminderRecord, MutationRecord, SalesRecord, BuildingRecord, UtilityRecord, ReminderRecord, 
    GeneralAssetRecord, BuildingMaintenanceRecord, MaintenanceScheduleRecord, InsuranceRecord, 
    InsuranceProviderRecord, PodRequestRecord, LockerRecord, LockerRequestRecord, 
    LogBookRecord, TimesheetRecord, VendorRecord, UserRecord, MasterApprovalRecord, 
    GeneralMasterItem, DeliveryLocationRecord, StockOpnameRecord, MasterPodRecord, TenantPodRecord,
    RequestTypeRecord
} from './types';

// Import mock data
import { 
    MOCK_DATA, MOCK_MASTER_DATA, MOCK_ARK_DATA, MOCK_MASTER_ARK_DATA,
    MOCK_VEHICLE_DATA, MOCK_VEHICLE_CONTRACT_DATA, MOCK_SERVICE_DATA, MOCK_TAX_KIR_DATA, 
    MOCK_VEHICLE_REMINDER_DATA, MOCK_MUTATION_DATA, MOCK_SALES_DATA,
    MOCK_BUILDING_DATA, MOCK_UTILITY_DATA, MOCK_REMINDER_DATA, MOCK_BUILDING_MAINTENANCE_DATA,
    MOCK_GENERAL_ASSET_DATA, MOCK_ASSET_MAINTENANCE_DATA,
    MOCK_INSURANCE_DATA, MOCK_INSURANCE_PROVIDERS,
    MOCK_POD_REQUEST_DATA, MOCK_LOCKER_DATA, MOCK_LOCKER_REQUEST_DATA,
    MOCK_STOCK_OPNAME_DATA, MOCK_LOGBOOK_DATA, MOCK_TIMESHEET_DATA, MOCK_VENDOR_DATA, 
    MOCK_USER_DATA, MOCK_MASTER_APPROVAL_DATA,
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
    
    // ROLE STATE (Simulation)
    const [userRole, setUserRole] = useState<'Admin' | 'Staff' | 'Officer'>('Admin');

    // --- DATA STATES ---
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
    const [insuranceReminders, setInsuranceReminders] = useState<ReminderRecord[]>([]);

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

    const handleNavigate = (item: string) => {
        setActiveItem(item);
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
            'Branch Improvement': 'BRANCH_IMPROVEMENT_TEMPLATE.xlsx',
            'Compliance & Legal': 'LEGAL_DOCS_TEMPLATE.xlsx',
            'Asset HC': 'GENERAL_ASSET_HC_TEMPLATE.xlsx',
            'Asset IT': 'GENERAL_ASSET_IT_TEMPLATE.xlsx',
            'Customer Service': 'ASSET_CS_TEMPLATE.xlsx',
            'Vendor': 'MASTER_VENDOR_TEMPLATE.xlsx',
            'Master Vendor': 'MASTER_VENDOR_TEMPLATE.xlsx',
            'Insurance Providers': 'INSURANCE_PROVIDER_TEMPLATE.xlsx',
            'All Policies': 'INSURANCE_POLICY_TEMPLATE.xlsx',
            'Manajemen User': 'USER_DATA_TEMPLATE.xlsx',
            'Stock Opname': 'STOCK_OPNAME_TEMPLATE.xlsx',
            'Input Stock Opname': 'STOCK_OPNAME_TEMPLATE.xlsx',
            'Log Book': 'VISITOR_LOG_TEMPLATE.xlsx',
            'Utility Monitoring': 'UTILITY_USAGE_TEMPLATE.xlsx',
            'Daftar Loker': 'MASTER_LOCKER_TEMPLATE.xlsx',
            'Timesheet': 'TIMESHEET_LOG_TEMPLATE.xlsx',
            'Expiring Soon': 'INSURANCE_REMINDER_TEMPLATE.xlsx',
            'Reminder Pemeliharaan': 'MAINTENANCE_SCHEDULE_TEMPLATE.xlsx'
        };
        
        if (masterDataMap[module]) {
            return `${module.replace(/\s+/g, '_').toUpperCase()}_TEMPLATE.xlsx`;
        }

        return map[module] || 'DATA_IMPORT_TEMPLATE.xlsx';
    };

    // --- CALCULATE DASHBOARD STATS ---
    const getDashboardStats = () => {
        const pendingATK = atkRequests.filter(r => r.status === 'Pending' || r.status === 'Waiting Approval').length;
        const pendingARK = arkRequests.filter(r => r.status === 'Pending' || r.status === 'Waiting Approval').length;
        const pendingVehicle = vehicles.filter(v => (v.approvalStatus || '').toLowerCase().includes('pending')).length;
        const pendingService = vehicleServices.filter(s => (s.statusApproval || '').toLowerCase().includes('pending')).length;
        const pendingPod = podRequests.filter(r => r.status === 'Waiting Approval').length;
        const pendingLocker = lockerRequests.filter(r => r.status === 'Pending').length;
        
        const totalPendingRequests = pendingATK + pendingARK + pendingVehicle + pendingService + pendingPod + pendingLocker;
        const totalPods = masterPods.length;
        const occupiedPods = tenantPods.length; 
        const totalLockers = lockers.length;
        const occupiedLockers = lockers.filter(l => l.status === 'Terisi').length;
        const activeVehicles = vehicles.filter(v => v.status === 'Aktif' || v.status === 'Available').length;
        const serviceVehicles = vehicles.filter(v => v.status === 'Service').length;
        const maintenanceBuildings = buildingMaintenances.filter(m => m.status === 'In Progress').length;
        const lowStockATK = masterAtk.filter(i => i.remainingStock <= i.minimumStock).length;
        const lowStockARK = masterArk.filter(i => i.remainingStock <= i.minimumStock).length;
        const activeVisitors = logBooks.filter(l => !l.jamPulang).length;

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
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

        return {
            totalPendingRequests,
            activeIssues: serviceVehicles + maintenanceBuildings,
            inventoryAlert: lowStockATK + lowStockARK,
            liveVisitors: activeVisitors,
            totalPods,
            occupiedPods,
            totalLockers,
            occupiedLockers,
            activeVehicles,
            serviceVehicles,
            totalBuildings: buildings.length,
            maintenanceBuildings,
            recentActivities
        };
    };

    // --- RENDER PAGE BASED ON ACTIVE ITEM ---
    const renderContent = () => {
        switch (activeItem) {
            // Dashboard
            case 'Dashboard':
                return <DashboardPage stats={getDashboardStats()} />;

            // ATK Module
            case 'Request ATK':
                return <RequestATKPage data={atkRequests} masterItems={masterAtk} deliveryLocations={deliveryLocations} onSave={(d) => setAtkRequests(p => [...p, d as AssetRecord])} onImportClick={handleOpenImport} />;
            case 'Stationery Request Approval':
                return <ATKApprovalPage data={atkRequests} onApprove={(d) => setAtkRequests(p => p.map(r => r.id === d.id ? { ...r, ...d } : r))} />;
            case 'Master ATK':
                return <MasterATKPage masterItems={masterAtk} categories={MOCK_ATK_CATEGORY} uomList={MOCK_UOM_DATA} deliveryLocations={deliveryLocations} requestTypes={requestTypes} onSaveItem={(d) => setMasterAtk(p => [...p, d as MasterItem])} onSaveCategory={() => {}} onSaveDelivery={(d) => setDeliveryLocations(p => [...p, d as DeliveryLocationRecord])} onSaveRequestType={(d) => setRequestTypes(p => [...p, d as RequestTypeRecord])} onImportClick={handleOpenImport} />;

            // ARK Module
            case 'Daftar ARK':
                return <RequestARKPage data={arkRequests} masterItems={masterArk} deliveryLocations={deliveryLocations} onSave={(d) => setArkRequests(p => [...p, d as AssetRecord])} onImportClick={handleOpenImport} />;
            case 'Household Request Approval':
                return <ARKApprovalPage data={arkRequests} onApprove={(d) => setArkRequests(p => p.map(r => r.id === d.id ? { ...r, ...d } : r))} />;
            case 'Master ARK':
                return <MasterARKPage masterItems={masterArk} categories={MOCK_ARK_CATEGORY} uomList={MOCK_UOM_DATA} deliveryLocations={deliveryLocations} requestTypes={requestTypes} onSaveItem={(d) => setMasterArk(p => [...p, d as MasterItem])} onSaveCategory={() => {}} onSaveDelivery={(d) => setDeliveryLocations(p => [...p, d as DeliveryLocationRecord])} onSaveRequestType={(d) => setRequestTypes(p => [...p, d as RequestTypeRecord])} onImportClick={handleOpenImport} />;

            // Stock Opname
            case 'Input Stock Opname':
            case 'Stock Opname':
                return <StockOpnamePage data={stockOpnames} onSave={(d) => setStockOpnames(p => [...p, ...(Array.isArray(d) ? d : [d])])} onImportClick={handleOpenImport} />;
            case 'Stock Opname Approval':
                return <StockOpnameApprovalPage data={stockOpnames} onApprove={(id, status, note) => setStockOpnames(p => p.map(r => r.opnameId === id ? { ...r, statusApproval: status, approvalNote: note, approvalDate: new Date().toISOString().split('T')[0] } : r))} />;

            // Vehicle Module
            case 'Daftar Kendaraan':
                return <VehicleListPage data={vehicles} brandList={MOCK_BRAND_DATA} colorList={MOCK_COLOR_DATA} channelList={MOCK_GENERAL_MASTER_DATA} branchList={MOCK_LOCATION_DATA} onSave={(d) => setVehicles(p => [...p, d as VehicleRecord])} onImportClick={handleOpenImport} />;
            case 'Kontrak Kendaraan':
                return <VehicleContractPage data={vehicleContracts} vehicleList={vehicles} onSave={(d) => setVehicleContracts(p => [...p, d as VehicleContractRecord])} onImportClick={handleOpenImport} />;
            case 'Servis':
                return <ServicePage data={vehicleServices} vehicleList={vehicles} vendorList={vendors} onSave={(d) => setVehicleServices(p => [...p, d as ServiceRecord])} onImportClick={handleOpenImport} />;
            case 'Pajak & KIR':
                return <TaxKirPage data={vehicleTaxes} vehicleList={vehicles} branchList={MOCK_LOCATION_DATA} onSave={(d) => setVehicleTaxes(p => [...p, d as TaxKirRecord])} onImportClick={handleOpenImport} />;
            case 'Reminder Pajak & KIR':
                return <VehicleReminderPage data={vehicleReminders} vehicleList={vehicles} onSave={(d) => setVehicleReminders(p => [...p, d as VehicleReminderRecord])} />;
            case 'Mutasi':
                return <VehicleMutationPage data={vehicleMutations} vehicleList={vehicles} onSave={(d) => setVehicleMutations(p => [...p, d as MutationRecord])} />;
            case 'Penjualan':
                return <VehicleSalesPage data={vehicleSales} vehicleList={vehicles} onSave={(d) => setVehicleSales(p => [...p, d as SalesRecord])} />;

            // Building Module
            case 'Daftar Gedung':
                return <BuildingListPage data={buildings} buildingTypeList={MOCK_BUILDING_TYPE_DATA} onSave={(d) => setBuildings(p => [...p, d as BuildingRecord])} onImportClick={handleOpenImport} />;
            case 'Utility Monitoring':
                return <UtilityPage data={utilities} buildingList={buildings} onSave={(d) => setUtilities(p => [...p, d as UtilityRecord])} onImportClick={handleOpenImport} />;
            case 'Branch Improvement':
                return <BranchImprovementPage data={buildings} buildingTypeList={MOCK_BUILDING_TYPE_DATA} onSave={(d) => setBuildings(p => [...p, d as BuildingRecord])} onImportClick={handleOpenImport} />;
            case 'Compliance & Legal':
                return <CompliancePage data={complianceDocs} buildingList={buildings} onSave={(d) => setComplianceDocs(p => [...p, d as ReminderRecord])} onImportClick={handleOpenImport} />;
            case 'Pemeliharaan Asset':
                return <BuildingMaintenancePage data={buildingMaintenances} buildingList={buildings} assetList={MOCK_BUILDING_ASSETS} onSave={(d) => setBuildingMaintenances(p => [...p, d as BuildingMaintenanceRecord])} />;

            // General Asset Module
            case 'Asset HC':
            case 'Asset IT':
            case 'Customer Service':
                return <GeneralAssetPage data={generalAssets} assetTypeList={MOCK_ASSET_TYPE_DATA} categoryList={MOCK_ASSET_CATEGORY_DATA} locationList={MOCK_LOCATION_DATA} departmentList={MOCK_DEPARTMENT_DATA} categoryFilter={activeItem.split(' ')[1] || activeItem} onSave={(d) => setGeneralAssets(p => [...p, d as GeneralAssetRecord])} onImportClick={handleOpenImport} />;
            case 'Reminder Pemeliharaan':
                return <MaintenanceReminderPage data={assetMaintenances} assetList={MOCK_BUILDING_ASSETS} onSave={(d) => setAssetMaintenances(p => [...p, d as MaintenanceScheduleRecord])} onImportClick={handleOpenImport} />;
            case 'Mutasi Aset':
                return <AssetMutationPage data={assetMutations} vehicleList={vehicles} generalAssetList={generalAssets} onSave={(d) => setAssetMutations(p => [...p, d as MutationRecord])} />;
            case 'Penjualan Aset':
                return <AssetSalesPage data={assetSales} vehicleList={vehicles} generalAssetList={generalAssets} onSave={(d) => setAssetSales(p => [...p, d as SalesRecord])} />;

            // Insurance Module
            case 'Insurance Dashboard':
                return <InsuranceDashboardPage data={insurances} />;
            case 'All Policies':
                return <InsurancePoliciesPage data={insurances} assetList={[...vehicles, ...buildings]} onSave={(d) => setInsurances(p => [...p, d as InsuranceRecord])} onImportClick={handleOpenImport} />;
            case 'Insurance Claims':
                return <InsuranceClaimsPage insurances={insurances} onSave={(d) => setInsurances(p => p.map(ins => ins.id === d.policyId ? { ...ins, claims: [...(ins.claims || []), d] } : ins))} />;
            case 'Expiring Soon':
                return <InsuranceRemindersPage insurances={insurances} manualReminders={insuranceReminders} vehicleList={vehicles} buildingList={buildings} onSaveReminder={(d) => setInsuranceReminders(p => [...p, d as ReminderRecord])} onDeleteReminder={(id) => setInsuranceReminders(p => p.filter(r => r.id !== id))} onViewPolicy={() => {}} onImportClick={handleOpenImport} />;
            case 'Insurance Providers':
                return <InsuranceProvidersPage data={insuranceProviders} onSave={(d) => setInsuranceProviders(p => [...p, d as InsuranceProviderRecord])} onImportClick={handleOpenImport} />;

            // Facility Module
            case 'Permintaan Pod':
            case 'Request MODENA Pod':
                return <PodRequestPage data={podRequests} podList={masterPods as any} onSave={(d) => setPodRequests(p => [...p, d as PodRequestRecord])} />;
            case 'Persetujuan Pod':
                return <PodApprovalPage data={podRequests} podList={masterPods as any} onSave={(d) => setPodRequests(p => p.map(r => r.id === d.id ? { ...r, ...d } : r))} />;
            case 'Daftar Loker':
                return <LockerListPage data={lockers} onSave={(d) => setLockers(p => [...p, d as LockerRecord])} onImportClick={handleOpenImport} />;
            case 'Request Locker':
                return <LockerRequestPage data={lockerRequests} lockerList={lockers} onSave={(d) => setLockerRequests(p => [...p, d as any])} />;
            case 'Locker Approval':
                return <LockerApprovalPage data={lockerRequests} lockerList={lockers} onSave={(d) => setLockerRequests(p => p.map(r => r.id === d.id ? { ...r, ...d } : r))} />;
            case 'Tenant Pod':
                return <TenantPodPage data={tenantPods as any} podList={masterPods as any} onSave={(d) => setTenantPods(p => [...p, d as TenantPodRecord])} onImportClick={handleOpenImport} />;
            case 'Master Pod':
                return <MasterPodPage data={masterPods as any} onSave={(d) => setMasterPods(p => [...p, d as MasterPodRecord])} onImportClick={handleOpenImport} />;

            // Daily Ops Module
            case 'Log Book':
                return <LogBookPage data={logBooks} buildingList={buildings} onSave={(d) => setLogBooks(p => [...p, d as LogBookRecord])} onImportClick={handleOpenImport} />;
            case 'Timesheet':
                return <TimesheetPage data={timesheets} buildingList={buildings} onSave={(d) => setTimesheets(p => [...p, d as TimesheetRecord])} onImportClick={handleOpenImport} />;
            case 'Vendor':
                return <VendorPage data={vendors} onSave={(d) => setVendors(p => [...p, d as VendorRecord])} onImportClick={handleOpenImport} />;
            case 'Manajemen User':
                return <UserManagementPage data={users} onSave={(d) => setUsers(p => [...p, d as UserRecord])} onImportClick={handleOpenImport} />;

            // Master Data Module
            case 'Master Approval':
                return <MasterApprovalPage data={masterApprovals as any} onSave={(d) => setMasterApprovals(p => [...p, d as MasterApprovalRecord])} />;
            case 'Master Vendor':
                return <MasterVendorPage data={vendors} onSave={(d) => setVendors(p => [...p, d as VendorRecord])} onImportClick={handleOpenImport} />;

            // Sync Pages
            case 'Sync Branchs':
            case 'Sync Channels':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <p className="text-xl font-bold uppercase tracking-widest">{activeItem}</p>
                        <p className="text-sm mt-2">Sync process triggered in background...</p>
                    </div>
                );

            // General Master Pages
            default:
                if (masterDataMap[activeItem]) {
                    return <GeneralMasterPage data={masterDataMap[activeItem]} masterType={activeItem} onSave={() => {}} onImportClick={handleOpenImport} />;
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
                userRole={userRole}
            />
            
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'}`}>
                <TopBar 
                    breadcrumbs={['Home', activeItem]} 
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                    userRole={userRole}
                    onRoleChange={setUserRole}
                />
                
                <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {renderContent()}
                </main>
            </div>

            {/* Global Import Modal */}
            <ImportDataModal
                isOpen={importState.isOpen}
                onClose={() => setImportState({ ...importState, isOpen: false })}
                title={importState.title}
                templateName={getImportTemplateName(importState.module)}
                onImport={(file) => {
                    console.log(`Importing ${file.name} for ${importState.module}`);
                    alert(`File ${file.name} uploaded successfully for ${importState.module}`);
                    setImportState({ ...importState, isOpen: false });
                }}
            />
        </div>
    );
};

export default App;
