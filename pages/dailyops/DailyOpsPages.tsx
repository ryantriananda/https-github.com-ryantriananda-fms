import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { LogBookTable } from '../../components/LogBookTable';
import { TimesheetTable } from '../../components/TimesheetTable';
import { VendorTable } from '../../components/VendorTable';
import { UserTable } from '../../components/UserTable';
import { LogBookModal } from '../../components/LogBookModal';
import { TimesheetModal } from '../../components/TimesheetModal';
import { VendorModal } from '../../components/VendorModal';
import { UserModal } from '../../components/UserModal';
import { 
    LogBookRecord, TimesheetRecord, VendorRecord, UserRecord, BuildingRecord 
} from '../../types';

// Log Book Page
interface LogBookPageProps {
    data: LogBookRecord[];
    buildingList: BuildingRecord[];
    onSave: (data: Partial<LogBookRecord>) => void;
    onImportClick: () => void;
}

export const LogBookPage: React.FC<LogBookPageProps> = ({ data, buildingList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: LogBookRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(l => l.category?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'VISITOR', 'DELIVERY', 'INCIDENT', 'MAINTENANCE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Log Entry" 
                onImportClick={onImportClick}
            />
            <LogBookTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <LogBookModal 
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

// Timesheet Page
interface TimesheetPageProps {
    data: TimesheetRecord[];
    buildingList: BuildingRecord[];
    onSave: (data: Partial<TimesheetRecord>) => void;
    onImportClick: () => void;
}

export const TimesheetPage: React.FC<TimesheetPageProps> = ({ data, buildingList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: TimesheetRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(t => t.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'PRESENT', 'ABSENT', 'LATE', 'ON LEAVE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Timesheet" 
                onImportClick={onImportClick}
            />
            <TimesheetTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <TimesheetModal 
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

// Vendor Management Page
interface VendorPageProps {
    data: VendorRecord[];
    onSave: (data: Partial<VendorRecord>) => void;
    onImportClick: () => void;
}

export const VendorPage: React.FC<VendorPageProps> = ({ data, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: VendorRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(v => v.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'INACTIVE', 'BLACKLISTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Vendor" 
                onImportClick={onImportClick}
            />
            <VendorTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <VendorModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
            />
        </>
    );
};

// User Management Page
interface UserManagementPageProps {
    data: UserRecord[];
    onSave: (data: Partial<UserRecord>) => void;
    onImportClick: () => void;
}

export const UserManagementPage: React.FC<UserManagementPageProps> = ({ data, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: UserRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(u => u.role?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ADMIN', 'MANAGER', 'STAFF', 'VIEWER']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add User" 
                onImportClick={onImportClick}
            />
            <UserTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <UserModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
            />
        </>
    );
};
