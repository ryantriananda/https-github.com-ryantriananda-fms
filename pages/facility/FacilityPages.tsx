import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { PodRequestTable } from '../../components/PodRequestTable';
import { PodApprovalTable } from '../../components/PodApprovalTable';
import { LockerTable } from '../../components/LockerTable';
import { LockerRequestTable } from '../../components/LockerRequestTable';
import { TenantPodTable } from '../../components/TenantPodTable';
import { MasterPodTable } from '../../components/MasterPodTable';
import { MasterLockerTable } from '../../components/MasterLockerTable';
import { ModenaPodTable } from '../../components/ModenaPodTable';
import { PodRequestModal } from '../../components/PodRequestModal';
import { PodCensusModal } from '../../components/PodCensusModal';
import { LockerModal } from '../../components/LockerModal';
import { LockerRequestModal } from '../../components/LockerRequestModal';
import { TenantPodModal } from '../../components/TenantPodModal';
import { MasterPodModal } from '../../components/MasterPodModal';
import { 
    PodRequestRecord, LockerRecord, GeneralMasterItem 
} from '../../types';

// Pod Request Page
interface PodRequestPageProps {
    data: PodRequestRecord[];
    podList: GeneralMasterItem[];
    onSave: (data: Partial<PodRequestRecord>) => void;
}

export const PodRequestPage: React.FC<PodRequestPageProps> = ({ data, podList, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: PodRequestRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(p => p.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Pod Request"
            />
            <PodRequestTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <PodRequestModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                podList={podList}
            />
        </>
    );
};

// Pod Approval Page
interface PodApprovalPageProps {
    data: PodRequestRecord[];
    podList: GeneralMasterItem[];
    onSave: (data: Partial<PodRequestRecord>) => void;
}

export const PodApprovalPage: React.FC<PodApprovalPageProps> = ({ data, podList, onSave }) => {
    const [activeTab, setActiveTab] = useState('PENDING');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'approve' | 'view'; data?: PodRequestRecord }>({ isOpen: false, mode: 'approve' });

    const pendingData = data.filter(p => p.status === 'Submitted' || p.status === 'Pending');
    const filteredData = activeTab === 'PENDING' ? pendingData : data.filter(p => p.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['PENDING', 'APPROVED', 'REJECTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {}} 
                hideAdd={true}
            />
            <PodApprovalTable 
                data={filteredData} 
                onApprove={(i) => setModalState({ isOpen: true, mode: 'approve', data: i })} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
            />
            <PodRequestModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'approve' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'approve' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                podList={podList}
            />
        </>
    );
};

// Locker List Page
interface LockerListPageProps {
    data: LockerRecord[];
    onSave: (data: Partial<LockerRecord>) => void;
    onImportClick: () => void;
}

export const LockerListPage: React.FC<LockerListPageProps> = ({ data, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: LockerRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(l => l.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'AVAILABLE', 'OCCUPIED', 'MAINTENANCE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Locker" 
                onImportClick={onImportClick}
            />
            <LockerTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <LockerModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
            />
        </>
    );
};

// Locker Request Page
interface LockerRequestPageProps {
    data: any[];
    lockerList: LockerRecord[];
    onSave: (data: any) => void;
}

export const LockerRequestPage: React.FC<LockerRequestPageProps> = ({ data, lockerList, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: any }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(r => r.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Locker Request"
            />
            <LockerRequestTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <LockerRequestModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                lockerList={lockerList}
            />
        </>
    );
};

// Locker Approval Page
interface LockerApprovalPageProps {
    data: any[];
    lockerList: LockerRecord[];
    onSave: (data: any) => void;
}

export const LockerApprovalPage: React.FC<LockerApprovalPageProps> = ({ data, lockerList, onSave }) => {
    const [activeTab, setActiveTab] = useState('PENDING');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'approve' | 'view'; data?: any }>({ isOpen: false, mode: 'approve' });

    const pendingData = data.filter(r => r.status === 'Pending');
    const filteredData = activeTab === 'PENDING' ? pendingData : data.filter(r => r.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['PENDING', 'APPROVED', 'REJECTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {}} 
                hideAdd={true}
            />
            <LockerRequestTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'approve', data: i })} 
            />
            <LockerRequestModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'approve' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'approve' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                lockerList={lockerList}
            />
        </>
    );
};

// Tenant Pod Page
interface TenantPodPageProps {
    data: any[];
    podList: GeneralMasterItem[];
    onSave: (data: any) => void;
    onImportClick: () => void;
}

export const TenantPodPage: React.FC<TenantPodPageProps> = ({ data, podList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: any }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(t => t.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'INACTIVE', 'EXPIRED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Tenant" 
                onImportClick={onImportClick}
            />
            <TenantPodTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <TenantPodModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                podList={podList}
            />
        </>
    );
};

// Census Pod Page
interface CensusPodPageProps {
    data: any[];
    podList: GeneralMasterItem[];
    onSave: (data: any) => void;
}

export const CensusPodPage: React.FC<CensusPodPageProps> = ({ data, podList, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: any }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(c => c.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'COMPLETED', 'IN PROGRESS', 'SCHEDULED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Census"
            />
            <ModenaPodTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <PodCensusModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                podList={podList}
            />
        </>
    );
};

// Master Pod Page
interface MasterPodPageProps {
    data: GeneralMasterItem[];
    onSave: (data: Partial<GeneralMasterItem>) => void;
    onImportClick: () => void;
}

export const MasterPodPage: React.FC<MasterPodPageProps> = ({ data, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit'; data?: GeneralMasterItem }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(p => p.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Pod" 
                onImportClick={onImportClick}
            />
            <MasterPodTable 
                data={filteredData} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <MasterPodModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
            />
        </>
    );
};

// Master Locker Page
interface MasterLockerPageProps {
    data: GeneralMasterItem[];
    onSave: (data: Partial<GeneralMasterItem>) => void;
    onImportClick: () => void;
}

export const MasterLockerPage: React.FC<MasterLockerPageProps> = ({ data, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit'; data?: GeneralMasterItem }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(l => l.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Locker Type" 
                onImportClick={onImportClick}
            />
            <MasterLockerTable 
                data={filteredData} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <MasterPodModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
            />
        </>
    );
};
