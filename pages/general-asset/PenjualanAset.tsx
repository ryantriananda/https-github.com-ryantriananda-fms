import React, { useState, useMemo } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { SalesTable } from '../../components/SalesTable';
import { SalesModal } from '../../components/SalesModal';
import { useAppContext } from '../../contexts/AppContext';
import { useApprovalWorkflow, APPROVAL_MODULES } from '../../hooks/useApprovalWorkflow';

const PenjualanAset: React.FC = () => {
  const { gaSalesData, setGaSalesData, buildingAssetData, itBuildingData, csBuildingData } = useAppContext();
  const { workflow, getApproverName, isLastTier } = useApprovalWorkflow(APPROVAL_MODULES.GENERAL_ASSET);
  
  // Combine all general assets with source category for filtering
  const combinedAssetList = useMemo(() => {
    return [
      ...buildingAssetData.map(a => ({ ...a, sourceCategory: 'Asset HC' })),
      ...itBuildingData.map(a => ({ ...a, sourceCategory: 'Asset IT' })),
      ...csBuildingData.map(a => ({ ...a, sourceCategory: 'Customer Service' })),
    ];
  }, [buildingAssetData, itBuildingData, csBuildingData]);
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
      setGaSalesData([...gaSalesData, { 
        ...data, 
        id: `SALE-GA-${Date.now()}`, 
        assetType: 'GENERAL_ASSET',
        currentApprovalLevel: 1,
        approvalHistory: []
      }]);
    } else {
      setGaSalesData(gaSalesData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  const handleAction = (item: any, action: 'Approve' | 'Reject' | 'Revise') => {
    const currentLevel = item.currentApprovalLevel || 1;
    const approverName = getApproverName(currentLevel);
    const isLast = isLastTier(currentLevel);
    const today = new Date().toISOString().split('T')[0];

    const newHistory = [...(item.approvalHistory || []), {
      level: currentLevel,
      approver: approverName,
      status: action === 'Approve' ? 'Approved' : action === 'Reject' ? 'Rejected' : 'Revised',
      date: today,
      notes: ''
    }];

    if (action === 'Reject') {
      setGaSalesData(gaSalesData.map(d => d.id === item.id ? { 
        ...d, 
        statusApproval: 'Rejected',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve' && isLast) {
      setGaSalesData(gaSalesData.map(d => d.id === item.id ? { 
        ...d, 
        statusApproval: 'Approved',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve') {
      setGaSalesData(gaSalesData.map(d => d.id === item.id ? { 
        ...d, 
        currentApprovalLevel: currentLevel + 1,
        approvalHistory: newHistory
      } : d));
    }
  };

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'OPEN BIDDING', 'CLOSED', 'SOLD']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Sale"
      />
      <SalesTable
        data={gaSalesData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setGaSalesData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <SalesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          assetType="GENERAL_ASSET"
          generalAssetList={combinedAssetList}
        />
      )}
    </>
  );
};

export default PenjualanAset;
