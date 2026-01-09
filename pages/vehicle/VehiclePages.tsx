import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { VehicleTable } from '../../components/VehicleTable';
import { VehicleContractTable } from '../../components/VehicleContractTable';
import { ServiceTable } from '../../components/ServiceTable';
import { TaxKirTable } from '../../components/TaxKirTable';
import { VehicleReminderTable } from '../../components/VehicleReminderTable';
import { MutationTable } from '../../components/MutationTable';
import { SalesTable } from '../../components/SalesTable';
import { VehicleModal } from '../../components/VehicleModal';
import { VehicleContractModal } from '../../components/VehicleContractModal';
import { ServiceModal } from '../../components/ServiceModal';
import { TaxKirModal } from '../../components/TaxKirModal';
import { VehicleReminderModal } from '../../components/VehicleReminderModal';
import { MutationModal } from '../../components/MutationModal';
import { SalesModal } from '../../components/SalesModal';
import { 
    VehicleRecord, VehicleContractRecord, ServiceRecord, TaxKirRecord, 
    VehicleReminderRecord, MutationRecord, SalesRecord, GeneralMasterItem, VendorRecord, GeneralAssetRecord
} from '../../types';

// Vehicle List Page
interface VehicleListPageProps {
    data: VehicleRecord[];
    brandList: GeneralMasterItem[];
    colorList: GeneralMasterItem[];
    channelList: GeneralMasterItem[];
    branchList: GeneralMasterItem[];
    onSave: (data: Partial<VehicleRecord>) => void;
    onImportClick: () => void;
}

export const VehicleListPage: React.FC<VehicleListPageProps> = ({ 
    data, brandList, colorList, channelList, branchList, onSave, onImportClick 
}) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: VehicleRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(v => v.status?.toUpperCase() === activeTab || v.status?.toUpperCase().includes(activeTab));

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'AVAILABLE', 'IN USE', 'SERVICE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Request Vehicle" 
                onImportClick={onImportClick}
            />
            <VehicleTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <VehicleModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                brandList={brandList}
                colorList={colorList}
                channelList={channelList}
                branchList={branchList}
            />
        </>
    );
};

// Vehicle Contract Page
interface VehicleContractPageProps {
    data: VehicleContractRecord[];
    vehicleList: VehicleRecord[];
    onSave: (data: Partial<VehicleContractRecord>) => void;
    onImportClick: () => void;
}

export const VehicleContractPage: React.FC<VehicleContractPageProps> = ({ data, vehicleList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: VehicleContractRecord }>({ isOpen: false, mode: 'create' });

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'EXPIRING SOON', 'EXPIRED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Contract" 
                onImportClick={onImportClick}
            />
            <VehicleContractTable 
                data={data} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <VehicleContractModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                vehicleList={vehicleList}
            />
        </>
    );
};

// Service Page
interface ServicePageProps {
    data: ServiceRecord[];
    vehicleList: VehicleRecord[];
    vendorList: VendorRecord[];
    onSave: (data: Partial<ServiceRecord>) => void;
    onImportClick: () => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({ data, vehicleList, vendorList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: ServiceRecord }>({ isOpen: false, mode: 'create' });

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'SCHEDULED', 'IN PROGRESS', 'COMPLETED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Service" 
                moduleName="Servis"
                onImportClick={onImportClick}
            />
            <ServiceTable 
                data={data} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <ServiceModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                vehicleList={vehicleList}
                vendorList={vendorList}
            />
        </>
    );
};

// Tax & KIR Page
interface TaxKirPageProps {
    data: TaxKirRecord[];
    vehicleList: VehicleRecord[];
    branchList: GeneralMasterItem[];
    onSave: (data: Partial<TaxKirRecord>) => void;
    onImportClick: () => void;
}

export const TaxKirPage: React.FC<TaxKirPageProps> = ({ data, vehicleList, branchList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: TaxKirRecord }>({ isOpen: false, mode: 'create' });

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'PENDING', 'PROCESSED', 'COMPLETED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Request Pajak/KIR" 
                onImportClick={onImportClick}
            />
            <TaxKirTable 
                data={data} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <TaxKirModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                vehicleList={vehicleList}
                channelList={[]}
                branchList={branchList}
            />
        </>
    );
};

// Vehicle Reminder Page
interface VehicleReminderPageProps {
    data: VehicleReminderRecord[];
    vehicleList: VehicleRecord[];
}

export const VehicleReminderPage: React.FC<VehicleReminderPageProps> = ({ data, vehicleList }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: VehicleReminderRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(r => r.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'CRITICAL', 'WARNING', 'SAFE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {}} 
                hideAdd={true}
            />
            <VehicleReminderTable 
                data={filteredData} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <VehicleReminderModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={() => setModalState({ isOpen: false, mode: 'create' })}
                initialData={modalState.data}
                mode={modalState.mode}
                vehicleList={vehicleList}
            />
        </>
    );
};

// Vehicle Mutation Page
interface VehicleMutationPageProps {
    data: MutationRecord[];
    vehicleList: VehicleRecord[];
    generalAssetList: GeneralAssetRecord[];
    onSave: (data: Partial<MutationRecord>) => void;
}

export const VehicleMutationPage: React.FC<VehicleMutationPageProps> = ({ data, vehicleList, generalAssetList, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: MutationRecord }>({ isOpen: false, mode: 'create' });

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Mutation"
            />
            <MutationTable 
                data={data} 
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
                assetType="VEHICLE"
            />
        </>
    );
};

// Vehicle Sales Page
interface VehicleSalesPageProps {
    data: SalesRecord[];
    vehicleList: VehicleRecord[];
    generalAssetList: GeneralAssetRecord[];
    onSave: (data: Partial<SalesRecord>) => void;
}

export const VehicleSalesPage: React.FC<VehicleSalesPageProps> = ({ data, vehicleList, generalAssetList, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: SalesRecord }>({ isOpen: false, mode: 'create' });

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'OPEN BID', 'SOLD', 'SCRAP']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Auction"
            />
            <SalesTable 
                data={data} 
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
                assetType="VEHICLE"
            />
        </>
    );
};
