import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { BuildingTable } from '../../components/BuildingTable';
import { BuildingModal } from '../../components/BuildingModal';
import { useAppContext } from '../../contexts/AppContext';
import { useApprovalWorkflow, APPROVAL_MODULES } from '../../hooks/useApprovalWorkflow';

const BranchImprovement: React.FC = () => {
  const { buildingData, setBuildingData } = useAppContext();
  const { workflow, getApproverName, isLastTier } = useApprovalWorkflow(APPROVAL_MODULES.BRANCH_IMPROVEMENT);
  
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
      setBuildingData([...buildingData, { 
        ...data, 
        id: `BLD-${Date.now()}`, 
        type: 'Improvement',
        currentApprovalLevel: 1,
        approvalHistory: []
      }]);
    } else {
      setBuildingData(buildingData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
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
      setBuildingData(buildingData.map(d => d.id === item.id ? { 
        ...d, 
        status: 'Rejected',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve' && isLast) {
      setBuildingData(buildingData.map(d => d.id === item.id ? { 
        ...d, 
        status: 'Approved',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve') {
      setBuildingData(buildingData.map(d => d.id === item.id ? { 
        ...d, 
        currentApprovalLevel: currentLevel + 1,
        approvalHistory: newHistory
      } : d));
    }
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? buildingData 
    : buildingData.filter(item => (item.status || '').toUpperCase().includes(activeTab.replace(' ', '')));

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'PENDING', 'IN PROGRESS', 'COMPLETED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Improvement"
      />
      <BuildingTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setBuildingData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <BuildingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          existingBuildings={buildingData}
        />
      )}
    </>
  );
};

export default BranchImprovement;
