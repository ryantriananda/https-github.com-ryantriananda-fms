import React, { useState, useMemo } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { SalesTable } from '../../components/SalesTable';
import { SalesModal } from '../../components/SalesModal';
import { useAppContext } from '../../contexts/AppContext';
import { useApprovalWorkflow, APPROVAL_MODULES } from '../../hooks/useApprovalWorkflow';

const Penjualan: React.FC = () => {
  const { salesData, setSalesData, vehicleData } = useAppContext();
  const { workflow, getApproverName, isLastTier, getTotalTiers } = useApprovalWorkflow(APPROVAL_MODULES.VEHICLE_DISPOSAL);
  
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
      setSalesData([...salesData, { 
        ...data, 
        id: `SALE-${Date.now()}`, 
        assetType: 'VEHICLE',
        currentApprovalLevel: 1,
        approvalHistory: []
      }]);
    } else {
      setSalesData(salesData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
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
      setSalesData(salesData.map(d => d.id === item.id ? { 
        ...d, 
        statusApproval: 'Rejected',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve' && isLast) {
      setSalesData(salesData.map(d => d.id === item.id ? { 
        ...d, 
        statusApproval: 'Approved',
        currentApprovalLevel: 0,
        approvalHistory: newHistory
      } : d));
    } else if (action === 'Approve') {
      setSalesData(salesData.map(d => d.id === item.id ? { 
        ...d, 
        currentApprovalLevel: currentLevel + 1,
        approvalHistory: newHistory
      } : d));
    }
  };

  // Filter vehicle sales only
  const vehicleSales = salesData.filter(s => s.assetType === 'VEHICLE' || !s.assetType);
  
  const filteredData = activeTab === 'SEMUA' 
    ? vehicleSales 
    : vehicleSales.filter(item => (item.status || '').toUpperCase().includes(activeTab.replace(' ', '')));

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
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setSalesData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <SalesModal
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

export default Penjualan;
