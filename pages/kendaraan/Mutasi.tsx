import React, { useState, useMemo } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { MutationTable } from '../../components/MutationTable';
import { MutationModal } from '../../components/MutationModal';
import { useAppContext } from '../../contexts/AppContext';
import { useApprovalWorkflow, APPROVAL_MODULES } from '../../hooks/useApprovalWorkflow';

const Mutasi: React.FC = () => {
  const { mutationData, setMutationData, vehicleData, masterApprovalData } = useAppContext();
  const { workflow, getApproverName, isLastTier, getTotalTiers } = useApprovalWorkflow(APPROVAL_MODULES.VEHICLE_MUTATION);
  
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
      setMutationData([...mutationData, { 
        ...data, 
        id: `MUT-${Date.now()}`, 
        assetType: 'VEHICLE',
        currentApprovalLevel: 1,
        approvalHistory: []
      }]);
    } else {
      setMutationData(mutationData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  const handleAction = (item: any, action: 'Approve' | 'Reject' | 'Revise') => {
    const currentLevel = item.currentApprovalLevel || 1;
    const approverName = getApproverName(currentLevel);
    const totalTiers = getTotalTiers();
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
      setMutationData(mutationData.map(d => d.id === item.id ? { 
        ...d, 
        status: 'Rejected',
        statusApproval: 'Rejected',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve' && isLast) {
      setMutationData(mutationData.map(d => d.id === item.id ? { 
        ...d, 
        status: 'Approved',
        statusApproval: 'Approved',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve') {
      setMutationData(mutationData.map(d => d.id === item.id ? { 
        ...d, 
        currentApprovalLevel: currentLevel + 1,
        approvalHistory: newHistory
      } : d));
    }
  };

  // Filter vehicle mutations only
  const vehicleMutations = mutationData.filter(m => m.assetType === 'VEHICLE' || !m.assetType);
  
  const filteredData = activeTab === 'SEMUA' 
    ? vehicleMutations 
    : vehicleMutations.filter(item => (item.status || '').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'PENDING', 'APPROVED', 'COMPLETED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Mutation"
      />
      <MutationTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setMutationData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <MutationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          assetType="VEHICLE"
          vehicleList={vehicleData}
        />
      )}
    </>
  );
};

export default Mutasi;
