import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { StationeryRequestTable } from '../../components/StationeryRequestTable';
import { AddStockModal } from '../../components/AddStockModal';
import { AssetRecord } from '../../types';

interface ATKApprovalPageProps {
    data: AssetRecord[];
    onApprove: (id: string | number, comment: string) => void;
    onReject: (id: string | number, comment: string) => void;
    currentUser?: any;
}

export const ATKApprovalPage: React.FC<ATKApprovalPageProps> = ({ data, onApprove, onReject, currentUser }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        data?: AssetRecord;
    }>({ isOpen: false });

    const filteredData = activeTab === 'SEMUA' 
        ? data 
        : data.filter(r => r.status?.toUpperCase() === activeTab || r.status?.toUpperCase().includes(activeTab.replace(' ', '_')));

    const handleOpenApprovalModal = (item: AssetRecord) => {
        setModalState({ isOpen: true, data: item });
    };

    const handleApproveFromModal = () => {
        if (modalState.data) {
            onApprove(modalState.data.id, '');
        }
        setModalState({ isOpen: false });
    };

    const handleRejectFromModal = () => {
        if (modalState.data) {
            onReject(modalState.data.id, '');
        }
        setModalState({ isOpen: false });
    };

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'WAITING APPROVAL', 'DISETUJUI', 'DITOLAK']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {}} 
                hideAdd={true} 
            />
            <StationeryRequestTable 
                data={filteredData} 
                onView={(item) => handleOpenApprovalModal(item)} 
                isApprovalMode={true}
                onAction={(item, action) => {
                    if (action === 'Approve') {
                        onApprove(item.id, '');
                    } else {
                        onReject(item.id, '');
                    }
                }}
            />

            <AddStockModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false })}
                onSave={() => {}}
                moduleName="ATK"
                initialAssetData={modalState.data}
                mode="approve"
                currentUser={currentUser}
                onApprove={handleApproveFromModal}
                onReject={handleRejectFromModal}
            />
        </>
    );
};

export default ATKApprovalPage;
