import React, { useState, useMemo } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { VehicleTable } from '../../components/VehicleTable';
import { VehicleModal } from '../../components/VehicleModal';
import { useAppContext } from '../../contexts/AppContext';
import { useApprovalWorkflow, APPROVAL_MODULES } from '../../hooks/useApprovalWorkflow';

const DaftarAset: React.FC = () => {
  const { vehicleData, setVehicleData } = useAppContext();
  const { workflow, getApproverName, isLastTier, getTotalTiers } = useApprovalWorkflow(APPROVAL_MODULES.VEHICLE_REQUEST);
  
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
      setVehicleData([...vehicleData, { 
        ...data, 
        id: Date.now(), 
        approvalStatus: 'Pending',
        currentApprovalLevel: 1,
        approvalHistory: []
      }]);
    } else {
      setVehicleData(vehicleData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
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
      setVehicleData(vehicleData.map(d => d.id === item.id ? { 
        ...d, 
        approvalStatus: 'Rejected',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve' && isLast) {
      setVehicleData(vehicleData.map(d => d.id === item.id ? { 
        ...d, 
        approvalStatus: 'Approved',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve') {
      setVehicleData(vehicleData.map(d => d.id === item.id ? { 
        ...d, 
        currentApprovalLevel: currentLevel + 1,
        approvalHistory: newHistory
      } : d));
    }
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? vehicleData 
    : vehicleData.filter(item => (item.approvalStatus || 'Approved').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'APPROVED', 'PENDING', 'REJECTED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="Request Vehicle"
      />
      <VehicleTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setVehicleData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <VehicleModal
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

export default DaftarAset;
