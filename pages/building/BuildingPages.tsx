import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { BuildingTable } from '../../components/BuildingTable';
import { UtilityTable } from '../../components/UtilityTable';
import { ReminderTable } from '../../components/ReminderTable';
import { BuildingMaintenanceTable } from '../../components/BuildingMaintenanceTable';
import { BuildingModal } from '../../components/BuildingModal';
import { UtilityModal } from '../../components/UtilityModal';
import { ComplianceModal } from '../../components/ComplianceModal';
import { BuildingMaintenanceModal } from '../../components/BuildingMaintenanceModal';
import { BuildingRecord, UtilityRecord, ReminderRecord, BuildingMaintenanceRecord, GeneralMasterItem, BuildingAssetRecord } from '../../types';

// Building List Page
interface BuildingListPageProps {
    data: BuildingRecord[];
    buildingTypeList: GeneralMasterItem[];
    onSave: (data: Partial<BuildingRecord>) => void;
    onImportClick: () => void;
}

export const BuildingListPage: React.FC<BuildingListPageProps> = ({ data, buildingTypeList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: BuildingRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(b => b.ownership?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'OWNED', 'RENTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Branch Req" 
                onImportClick={onImportClick}
            />
            <BuildingTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <BuildingModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                existingBuildings={data}
                buildingTypeList={buildingTypeList}
            />
        </>
    );
};

// Utility Monitoring Page
interface UtilityPageProps {
    data: UtilityRecord[];
    buildingList: BuildingRecord[];
    onSave: (data: Partial<UtilityRecord>) => void;
    onImportClick: () => void;
}

export const UtilityPage: React.FC<UtilityPageProps> = ({ data, buildingList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: UtilityRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'OVERVIEW' ? data : data.filter(u => u.type?.toUpperCase().includes(activeTab));

    return (
        <>
            <FilterBar 
                tabs={['OVERVIEW', 'LISTRIK', 'AIR', 'INTERNET']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Input Utility" 
                onImportClick={onImportClick}
            />
            <UtilityTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <UtilityModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                buildingList={buildingList}
            />
        </>
    );
};

// Branch Improvement Page
interface BranchImprovementPageProps {
    data: BuildingRecord[];
    buildingTypeList: GeneralMasterItem[];
    onSave: (data: Partial<BuildingRecord>) => void;
    onImportClick: () => void;
}

export const BranchImprovementPage: React.FC<BranchImprovementPageProps> = ({ data, buildingTypeList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: BuildingRecord }>({ isOpen: false, mode: 'create' });

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'PENDING', 'ON PROGRESS', 'COMPLETED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Improvement" 
                onImportClick={onImportClick}
            />
            <BuildingTable 
                data={data} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <BuildingModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                existingBuildings={data}
                buildingTypeList={buildingTypeList}
            />
        </>
    );
};

// Compliance & Legal Page
interface CompliancePageProps {
    data: ReminderRecord[];
    buildingList: BuildingRecord[];
    onSave: (data: Partial<ReminderRecord>) => void;
    onImportClick: () => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = ({ data, buildingList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: ReminderRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(r => r.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Document" 
                onImportClick={onImportClick}
            />
            <ReminderTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
            />
            <ComplianceModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                buildingList={buildingList}
            />
        </>
    );
};

// Building Maintenance Page
interface BuildingMaintenancePageProps {
    data: BuildingMaintenanceRecord[];
    buildingList: BuildingRecord[];
    assetList: BuildingAssetRecord[];
    onSave: (data: Partial<BuildingMaintenanceRecord>) => void;
}

export const BuildingMaintenancePage: React.FC<BuildingMaintenancePageProps> = ({ data, buildingList, assetList, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: BuildingMaintenanceRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(m => m.status?.toUpperCase().includes(activeTab.replace(' ', '_')));

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'SCHEDULED', 'IN PROGRESS', 'COMPLETED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Maintenance"
            />
            <BuildingMaintenanceTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <BuildingMaintenanceModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                buildingList={buildingList}
                assetList={assetList}
            />
        </>
    );
};
