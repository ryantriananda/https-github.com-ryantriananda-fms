import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { GeneralAssetTable } from '../../components/GeneralAssetTable';
import { MaintenanceReminderTable } from '../../components/MaintenanceReminderTable';
import { MutationTable } from '../../components/MutationTable';
import { SalesTable } from '../../components/SalesTable';
import { AssetGeneralModal } from '../../components/AssetGeneralModal';
import { MaintenanceScheduleModal } from '../../components/MaintenanceScheduleModal';
import { MutationModal } from '../../components/MutationModal';
import { SalesModal } from '../../components/SalesModal';
import { 
    GeneralAssetRecord, MaintenanceScheduleRecord, MutationRecord, SalesRecord, 
    GeneralMasterItem, VehicleRecord, BuildingAssetRecord
} from '../../types';

// General Asset Page (HC, IT, CS)
interface GeneralAssetPageProps {
    data: GeneralAssetRecord[];
    assetTypeList: GeneralMasterItem[];
    categoryList: GeneralMasterItem[];
    locationList: GeneralMasterItem[];
    departmentList: GeneralMasterItem[];
    categoryFilter: string;
    onSave: (data: Partial<GeneralAssetRecord>) => void;
    onImportClick: () => void;
}

export const GeneralAssetPage: React.FC<GeneralAssetPageProps> = ({ 
    data, assetTypeList, categoryList, locationList, departmentList, categoryFilter, onSave, onImportClick 
}) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: GeneralAssetRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = data.filter(g => g.assetCategory?.includes(categoryFilter));
    const tabFilteredData = activeTab === 'SEMUA' ? filteredData : filteredData.filter(a => a.ownership?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'OWN', 'RENT', 'DISPOSED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel={`Request Asset ${categoryFilter}`} 
                onImportClick={onImportClick}
            />
            <GeneralAssetTable 
                data={tabFilteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <AssetGeneralModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                assetTypeList={assetTypeList}
                categoryList={categoryList}
                locationList={locationList}
                departmentList={departmentList}
            />
        </>
    );
};

// Maintenance Reminder Page
interface MaintenanceReminderPageProps {
    data: MaintenanceScheduleRecord[];
    assetList: BuildingAssetRecord[];
    onSave: (data: Partial<MaintenanceScheduleRecord>) => void;
    onImportClick: () => void;
}

export const MaintenanceReminderPage: React.FC<MaintenanceReminderPageProps> = ({ data, assetList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: MaintenanceScheduleRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(m => m.status?.toUpperCase().includes(activeTab.replace(' ', '_')));

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'OVERDUE', 'DUE SOON', 'ON SCHEDULE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {}} 
                hideAdd={true}
                onImportClick={onImportClick}
            />
            <MaintenanceReminderTable 
                data={filteredData} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <MaintenanceScheduleModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                assetList={assetList}
            />
        </>
    );
};

// Asset Mutation Page
interface AssetMutationPageProps {
    data: MutationRecord[];
    vehicleList: VehicleRecord[];
    generalAssetList: GeneralAssetRecord[];
    onSave: (data: Partial<MutationRecord>) => void;
}

export const AssetMutationPage: React.FC<AssetMutationPageProps> = ({ data, vehicleList, generalAssetList, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: MutationRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(m => m.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Asset Mutation"
            />
            <MutationTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <MutationModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                vehicleList={vehicleList}
                generalAssetList={generalAssetList}
                assetType="GENERAL_ASSET"
            />
        </>
    );
};

// Asset Sales Page
interface AssetSalesPageProps {
    data: SalesRecord[];
    vehicleList: VehicleRecord[];
    generalAssetList: GeneralAssetRecord[];
    onSave: (data: Partial<SalesRecord>) => void;
}

export const AssetSalesPage: React.FC<AssetSalesPageProps> = ({ data, vehicleList, generalAssetList, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: SalesRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(s => s.status?.toUpperCase().includes(activeTab.replace(' ', '_')));

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'OPEN BID', 'SOLD', 'SCRAP']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Asset Sale"
            />
            <SalesTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <SalesModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                vehicleList={vehicleList}
                generalAssetList={generalAssetList}
                assetType="GENERAL_ASSET"
            />
        </>
    );
};
