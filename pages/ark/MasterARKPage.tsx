import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { MasterAtkTable } from '../../components/MasterAtkTable';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';
import { MasterDeliveryLocationTable } from '../../components/MasterDeliveryLocationTable';
import { MasterRequestTypeTable } from '../../components/MasterRequestTypeTable';
import { MasterItemModal } from '../../components/MasterItemModal';
import { GeneralMasterModal } from '../../components/GeneralMasterModal';
import { DeliveryLocationModal } from '../../components/DeliveryLocationModal';
import { MasterRequestTypeModal } from '../../components/MasterRequestTypeModal';
import { MasterItem, GeneralMasterItem, DeliveryLocationRecord, RequestTypeRecord } from '../../types';

// Main Page Component
interface MasterARKPageProps {
    masterItems: MasterItem[];
    categories: GeneralMasterItem[];
    uomList: GeneralMasterItem[];
    deliveryLocations: DeliveryLocationRecord[];
    requestTypes: RequestTypeRecord[];
    onSaveMasterItem: (data: Partial<MasterItem>) => void;
    onDeleteMasterItem: (id: string | number) => void;
    onSaveCategory: (data: Partial<GeneralMasterItem>) => void;
    onSaveUom: (data: Partial<GeneralMasterItem>) => void;
    onSaveDeliveryLocation: (data: Partial<DeliveryLocationRecord>) => void;
    onDeleteDeliveryLocation: (id: string | number) => void;
    onSaveRequestType: (data: Partial<RequestTypeRecord>) => void;
    onDeleteRequestType: (id: string | number) => void;
    onImportClick: () => void;
}

export const MasterARKPage: React.FC<MasterARKPageProps> = ({
    masterItems,
    categories,
    uomList,
    deliveryLocations,
    requestTypes,
    onSaveMasterItem,
    onDeleteMasterItem,
    onSaveCategory,
    onSaveUom,
    onSaveDeliveryLocation,
    onDeleteDeliveryLocation,
    onSaveRequestType,
    onDeleteRequestType,
    onImportClick
}) => {
    const [activeTab, setActiveTab] = useState('ITEMS');
    
    // Modal States
    const [itemModal, setItemModal] = useState<{ isOpen: boolean; mode: 'create' | 'edit' | 'view'; data?: MasterItem }>({ isOpen: false, mode: 'create' });
    const [categoryModal, setCategoryModal] = useState<{ isOpen: boolean; mode: 'create' | 'edit'; data?: GeneralMasterItem }>({ isOpen: false, mode: 'create' });
    const [uomModal, setUomModal] = useState<{ isOpen: boolean; mode: 'create' | 'edit'; data?: GeneralMasterItem }>({ isOpen: false, mode: 'create' });
    const [deliveryModal, setDeliveryModal] = useState<{ isOpen: boolean; mode: 'create' | 'edit'; data?: DeliveryLocationRecord }>({ isOpen: false, mode: 'create' });
    const [requestTypeModal, setRequestTypeModal] = useState<{ isOpen: boolean; mode: 'create' | 'edit'; data?: RequestTypeRecord }>({ isOpen: false, mode: 'create' });

    const handleAddClick = () => {
        if (activeTab === 'CATEGORY') setCategoryModal({ isOpen: true, mode: 'create' });
        else if (activeTab === 'UOM') setUomModal({ isOpen: true, mode: 'create' });
        else if (activeTab === 'DELIVERY') setDeliveryModal({ isOpen: true, mode: 'create' });
        else if (activeTab === 'DETAIL REQUEST') setRequestTypeModal({ isOpen: true, mode: 'create' });
        else setItemModal({ isOpen: true, mode: 'create' });
    };

    return (
        <>
            <FilterBar 
                tabs={['ITEMS', 'CATEGORY', 'UOM', 'DELIVERY', 'DETAIL REQUEST']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={handleAddClick} 
                customAddLabel="TAMBAH DATA" 
                onImportClick={onImportClick}
            />

            {(activeTab === 'ITEMS' || activeTab === 'SEMUA') && (
                <MasterAtkTable 
                    data={masterItems} 
                    onEdit={(i) => setItemModal({ isOpen: true, mode: 'edit', data: i })}
                    onDelete={onDeleteMasterItem}
                />
            )}

            {activeTab === 'CATEGORY' && (
                <GeneralMasterTable 
                    data={categories} 
                    onEdit={(i) => setCategoryModal({ isOpen: true, mode: 'edit', data: i })} 
                    onDelete={() => {}} 
                />
            )}

            {activeTab === 'UOM' && (
                <GeneralMasterTable 
                    data={uomList} 
                    onEdit={(i) => setUomModal({ isOpen: true, mode: 'edit', data: i })} 
                    onDelete={() => {}} 
                />
            )}

            {activeTab === 'DELIVERY' && (
                <MasterDeliveryLocationTable 
                    data={deliveryLocations} 
                    onEdit={(i) => setDeliveryModal({ isOpen: true, mode: 'edit', data: i })} 
                    onDelete={onDeleteDeliveryLocation} 
                />
            )}

            {activeTab === 'DETAIL REQUEST' && (
                <MasterRequestTypeTable 
                    data={requestTypes} 
                    onEdit={(i) => setRequestTypeModal({ isOpen: true, mode: 'edit', data: i })}
                    onDelete={onDeleteRequestType}
                />
            )}

            {/* Modals */}
            <MasterItemModal
                isOpen={itemModal.isOpen}
                onClose={() => setItemModal({ isOpen: false, mode: 'create' })}
                onSave={(data) => { onSaveMasterItem(data); setItemModal({ isOpen: false, mode: 'create' }); }}
                initialData={itemModal.data}
                moduleName="ARK"
                mode={itemModal.mode}
            />

            <GeneralMasterModal
                isOpen={categoryModal.isOpen}
                onClose={() => setCategoryModal({ isOpen: false, mode: 'create' })}
                onSave={(data) => { onSaveCategory(data); setCategoryModal({ isOpen: false, mode: 'create' }); }}
                initialData={categoryModal.data}
                title="Kategori ARK"
                mode={categoryModal.mode}
            />

            <GeneralMasterModal
                isOpen={uomModal.isOpen}
                onClose={() => setUomModal({ isOpen: false, mode: 'create' })}
                onSave={(data) => { onSaveUom(data); setUomModal({ isOpen: false, mode: 'create' }); }}
                initialData={uomModal.data}
                title="Master Satuan"
                mode={uomModal.mode}
            />

            <DeliveryLocationModal
                isOpen={deliveryModal.isOpen}
                onClose={() => setDeliveryModal({ isOpen: false, mode: 'create' })}
                onSave={(data) => { onSaveDeliveryLocation(data); setDeliveryModal({ isOpen: false, mode: 'create' }); }}
                initialData={deliveryModal.data}
                mode={deliveryModal.mode}
            />

            <MasterRequestTypeModal
                isOpen={requestTypeModal.isOpen}
                onClose={() => setRequestTypeModal({ isOpen: false, mode: 'create' })}
                onSave={(data) => { onSaveRequestType(data); setRequestTypeModal({ isOpen: false, mode: 'create' }); }}
                initialData={requestTypeModal.data}
                mode={requestTypeModal.mode}
            />
        </>
    );
};

export default MasterARKPage;
