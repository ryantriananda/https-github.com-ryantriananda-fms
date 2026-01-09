import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { InsuranceDashboard } from '../../components/InsuranceDashboard';
import { InsurancePolicyTable } from '../../components/InsurancePolicyTable';
import { InsuranceClaimTable } from '../../components/InsuranceClaimTable';
import { ReminderTable } from '../../components/ReminderTable';
import { InsuranceProviderTable } from '../../components/InsuranceProviderTable';
import { InsuranceModal } from '../../components/InsuranceModal';
import { InsuranceClaimModal } from '../../components/InsuranceClaimModal';
import { InsuranceProviderModal } from '../../components/InsuranceProviderModal';
import { InsuranceReminderModal } from '../../components/InsuranceReminderModal';
import { 
    InsuranceRecord, InsuranceProviderRecord, ReminderRecord, VehicleRecord, BuildingRecord
} from '../../types';

// Insurance Dashboard Page
interface InsuranceDashboardPageProps {
    data: InsuranceRecord[];
}

export const InsuranceDashboardPage: React.FC<InsuranceDashboardPageProps> = ({ data }) => {
    return <InsuranceDashboard data={data} />;
};

// All Policies Page
interface InsurancePoliciesPageProps {
    data: InsuranceRecord[];
    assetList: (VehicleRecord | BuildingRecord)[];
    onSave: (data: Partial<InsuranceRecord>) => void;
    onImportClick: () => void;
}

export const InsurancePoliciesPage: React.FC<InsurancePoliciesPageProps> = ({ data, assetList, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: InsuranceRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(i => i.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'EXPIRING', 'EXPIRED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Policy" 
                onImportClick={onImportClick}
            />
            <InsurancePolicyTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <InsuranceModal 
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

// Insurance Claims Page
interface InsuranceClaimsPageProps {
    insurances: InsuranceRecord[];
    onSave: (data: any) => void;
}

export const InsuranceClaimsPage: React.FC<InsuranceClaimsPageProps> = ({ insurances, onSave }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit'; data?: any }>({ isOpen: false, mode: 'create' });

    const displayClaims = insurances.flatMap(pol => 
        (pol.claims || []).map(claim => ({
            ...claim,
            policyNumber: pol.policyNumber,
            assetName: pol.assetName || pol.assets?.[0]?.name || 'Unknown',
            provider: pol.provider,
            policyId: pol.id
        }))
    );

    const filteredData = activeTab === 'SEMUA' ? displayClaims : displayClaims.filter(c => c.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'SUBMITTED', 'APPROVED', 'PAID', 'REJECTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="New Claim"
            />
            <InsuranceClaimTable 
                data={filteredData} 
                onEdit={(item) => setModalState({ isOpen: true, mode: 'edit', data: item })} 
            />
            <InsuranceClaimModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                policies={insurances}
            />
        </>
    );
};

// Expiring Soon / Reminders Page
interface InsuranceRemindersPageProps {
    insurances: InsuranceRecord[];
    manualReminders: ReminderRecord[];
    vehicleList: VehicleRecord[];
    buildingList: BuildingRecord[];
    onSaveReminder: (data: Partial<ReminderRecord>) => void;
    onDeleteReminder: (id: string | number) => void;
    onViewPolicy: (policy: InsuranceRecord) => void;
    onImportClick: () => void;
}

export const InsuranceRemindersPage: React.FC<InsuranceRemindersPageProps> = ({ 
    insurances, manualReminders, vehicleList, buildingList, 
    onSaveReminder, onDeleteReminder, onViewPolicy, onImportClick 
}) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit'; data?: ReminderRecord }>({ isOpen: false, mode: 'create' });

    // System generated reminders
    const systemReminders: ReminderRecord[] = insurances.filter(i => {
        const days = Math.ceil((new Date(i.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
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

    const allReminders = [...systemReminders, ...manualReminders];
    
    const filteredReminders = activeTab === 'SEMUA' 
        ? allReminders 
        : allReminders.filter(r => 
            r.category?.toUpperCase() === activeTab || 
            (activeTab === 'VEHICLE' && r.assetNo?.includes('B')) || 
            (activeTab === 'BUILDING' && !r.assetNo?.includes('B'))
        );

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'VEHICLE', 'BUILDING']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Reminder"
                onImportClick={onImportClick}
            />
            <ReminderTable 
                data={filteredReminders} 
                onView={(i) => {
                    if (i.source === 'System') {
                        const policy = insurances.find(p => p.id === i.id);
                        if (policy) onViewPolicy(policy);
                    } else {
                        setModalState({ isOpen: true, mode: 'edit', data: i });
                    }
                }}
                onDelete={onDeleteReminder} 
            />
            <InsuranceReminderModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSaveReminder(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                vehicleList={vehicleList}
                buildingList={buildingList}
            />
        </>
    );
};

// Insurance Providers Page
interface InsuranceProvidersPageProps {
    data: InsuranceProviderRecord[];
    onSave: (data: Partial<InsuranceProviderRecord>) => void;
    onImportClick: () => void;
}

export const InsuranceProvidersPage: React.FC<InsuranceProvidersPageProps> = ({ data, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{ isOpen: boolean; mode: 'create' | 'edit'; data?: InsuranceProviderRecord }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(p => p.status?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="Add Provider" 
                onImportClick={onImportClick}
            />
            <InsuranceProviderTable 
                data={filteredData} 
                onEdit={(i) => setModalState({ isOpen: true, mode: 'edit', data: i })} 
            />
            <InsuranceProviderModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(d) => { onSave(d); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
            />
        </>
    );
};
