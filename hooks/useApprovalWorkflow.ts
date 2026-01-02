import { useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { MasterApprovalRecord, ApprovalTier } from '../types';

export interface ApprovalHistoryItem {
  level: number;
  approver: string;
  status: 'Approved' | 'Rejected' | 'Pending';
  date: string;
  notes: string;
}

export interface ApprovalState {
  currentApprovalLevel: number;
  approvalHistory: ApprovalHistoryItem[];
}

export const useApprovalWorkflow = (moduleName: string) => {
  const { masterApprovalData } = useAppContext();

  const workflow = useMemo(() => {
    return masterApprovalData.find(a => a.module === moduleName);
  }, [masterApprovalData, moduleName]);

  const getTotalTiers = (): number => {
    return workflow?.tiers.length || 1;
  };

  const getCurrentTier = (level: number): ApprovalTier | undefined => {
    return workflow?.tiers.find(t => t.level === level);
  };

  const getApproverName = (level: number): string => {
    const tier = getCurrentTier(level);
    return tier?.value || 'Admin GA';
  };

  const isLastTier = (level: number): boolean => {
    return level >= getTotalTiers();
  };

  const processApproval = (
    currentState: ApprovalState,
    action: 'approve' | 'reject',
    notes: string = ''
  ): { newState: ApprovalState; finalStatus: 'Approved' | 'Rejected' | 'Pending' } => {
    const approverName = getApproverName(currentState.currentApprovalLevel);
    const today = new Date().toISOString().split('T')[0];

    const newHistoryItem: ApprovalHistoryItem = {
      level: currentState.currentApprovalLevel,
      approver: approverName,
      status: action === 'approve' ? 'Approved' : 'Rejected',
      date: today,
      notes
    };

    const newHistory = [...currentState.approvalHistory, newHistoryItem];

    if (action === 'reject') {
      return {
        newState: {
          currentApprovalLevel: 0,
          approvalHistory: newHistory
        },
        finalStatus: 'Rejected'
      };
    }

    if (isLastTier(currentState.currentApprovalLevel)) {
      return {
        newState: {
          currentApprovalLevel: 0,
          approvalHistory: newHistory
        },
        finalStatus: 'Approved'
      };
    }

    return {
      newState: {
        currentApprovalLevel: currentState.currentApprovalLevel + 1,
        approvalHistory: newHistory
      },
      finalStatus: 'Pending'
    };
  };

  return {
    workflow,
    getTotalTiers,
    getCurrentTier,
    getApproverName,
    isLastTier,
    processApproval
  };
};

// Module name constants for consistency
export const APPROVAL_MODULES = {
  // ATK/ARK
  ATK_REQUEST: 'Stationery Request (Permintaan ATK)',
  ARK_REQUEST: 'Household Request (Permintaan ARK)',
  
  // Vehicle
  VEHICLE_REQUEST: 'Vehicle Request (Pengajuan Baru)',
  VEHICLE_SERVICE: 'Vehicle Service Request (Servis)',
  VEHICLE_TAX_KIR: 'Vehicle Tax & KIR Renewal',
  VEHICLE_MUTATION: 'Vehicle Mutation (Mutasi)',
  VEHICLE_DISPOSAL: 'Vehicle Disposal (Penjualan)',
  VEHICLE_CONTRACT: 'Vehicle Contract (Sewa)',
  
  // Building
  BUILDING_REQUEST: 'New Building Request (Sewa/Beli)',
  BUILDING_MAINTENANCE: 'Building Maintenance Request',
  BUILDING_ASSET: 'Building Asset Request (AC/Genset/etc)',
  BRANCH_IMPROVEMENT: 'Branch Improvement Request',
  UTILITY_PAYMENT: 'Utility Payment Approval',
  
  // General Assets
  GENERAL_ASSET: 'General Asset Request (Furniture/etc)',
  IT_ASSET: 'IT Asset Request (Laptop/Devices)',
  
  // Employee Facilities
  POD_REQUEST: 'Permintaan POD (Sewa Kos)',
  LOKER_REQUEST: 'Permintaan Loker',
  
  // Administrative
  VENDOR_REGISTRATION: 'Vendor Registration Approval',
  USER_REGISTRATION: 'New User Registration'
};
