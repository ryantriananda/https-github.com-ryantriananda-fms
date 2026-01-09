import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { StationeryRequestTable } from '../../components/StationeryRequestTable';
import { AddStockModal } from '../../components/AddStockModal';
import { AssetRecord } from '../../types';

interface RequestATKPageProps {
    data: AssetRecord[];
    onSave: (data: AssetRecord) => void;
    onImportClick: () => void;
}

export const RequestATKPage: React.FC<RequestATKPageProps> = ({ data, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        mode: 'create' | 'edit' | 'view';
        data?: AssetRecord;
    }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' 
        ? data 
        : data.filter(r => r.status?.toUpperCase() === activeTab || r.status?.toUpperCase().includes(activeTab));

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'DRAFT', 'WAITING APPROVAL', 'APPROVED', 'REJECTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="TAMBAH DATA" 
                onImportClick={onImportClick}
            />
            <StationeryRequestTable 
                data={filteredData} 
                onView={(i) => setModalState({ isOpen: true, mode: 'view', data: i })} 
            />

            <AddStockModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={() => {}}
                moduleName="ATK"
                mode={modalState.mode}
                initialAssetData={modalState.data}
                onSaveStationeryRequest={(data) => {
                    const newReq: AssetRecord = {
                        id: Date.now(),
                        transactionNumber: `TRX/ATK/${Date.now()}`,
                        employee: { name: 'User', role: 'Staff' },
                        category: 'ATK',
                        itemName: 'New Item',
                        qty: 1,
                        date: new Date().toISOString().split('T')[0],
                        status: 'Pending',
                        ...data
                    } as AssetRecord;
                    onSave(newReq);
                    setModalState({ isOpen: false, mode: 'create' });
                }}
            />
        </>
    );
};

export default RequestATKPage;
