import React, { useState } from 'react';
import { FilterBar } from '../components/FilterBar';
import { VendorTable } from '../components/VendorTable';
import { VendorModal } from '../components/VendorModal';
import { useAppContext } from '../contexts/AppContext';
import { useApprovalWorkflow, APPROVAL_MODULES } from '../hooks/useApprovalWorkflow';

const Vendor: React.FC = () => {
  const { vendorData, setVendorData } = useAppContext();
  const { workflow, getApproverName, isLastTier } = useApprovalWorkflow(APPROVAL_MODULES.VENDOR_REGISTRATION);
  
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openModal = (mode: 'create' | 'edit' | 'view', item: any = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (modalMode === 'create') {
      setVendorData([...vendorData, { 
        ...data, 
        id: `VND-${Date.now()}`,
        currentApprovalLevel: 1,
        approvalHistory: []
      }]);
    } else {
      setVendorData(vendorData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'ACTIVE', 'INACTIVE']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Vendor"
      />
      <VendorTable
        data={vendorData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setVendorData(prev => prev.filter(i => i.id !== id))}
      />
      {isModalOpen && (
        <VendorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
        />
      )}
    </>
  );
};

export default Vendor;
