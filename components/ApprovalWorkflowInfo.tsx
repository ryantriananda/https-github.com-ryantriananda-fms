import React from 'react';
import { Shield, User } from 'lucide-react';
import { MasterApprovalRecord } from '../types';
import { ApprovalHistoryItem } from '../hooks/useApprovalWorkflow';

interface ApprovalWorkflowInfoProps {
  workflow: MasterApprovalRecord | undefined;
  currentLevel: number;
  approvalHistory?: ApprovalHistoryItem[];
  compact?: boolean;
}

export const ApprovalWorkflowInfo: React.FC<ApprovalWorkflowInfoProps> = ({
  workflow,
  currentLevel,
  approvalHistory = [],
  compact = false
}) => {
  if (!workflow) {
    return (
      <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
        <p className="text-[10px] font-bold text-amber-600">
          Workflow approval belum dikonfigurasi untuk modul ini. Silakan atur di Master Approval.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Workflow Tiers */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider mb-2">
          Workflow Approval
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {workflow.tiers.sort((a, b) => a.level - b.level).map((tier, idx) => {
            const isCompleted = approvalHistory.some(h => h.level === tier.level && h.status === 'Approved');
            const isRejected = approvalHistory.some(h => h.level === tier.level && h.status === 'Rejected');
            const isCurrent = tier.level === currentLevel;

            return (
              <div key={idx} className="flex items-center gap-1">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    isRejected
                      ? 'bg-red-100 text-red-700'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-700'
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {tier.type === 'User' ? <User size={10} /> : <Shield size={10} />}
                  <span>{tier.value}</span>
                </div>
                {idx < workflow.tiers.length - 1 && (
                  <span className="text-gray-300">→</span>
                )}
              </div>
            );
          })}
        </div>
        {currentLevel > 0 && (
          <p className="text-[10px] text-blue-500 mt-2">
            Level {currentLevel} dari {workflow.tiers.length}
          </p>
        )}
      </div>

      {/* Approval History */}
      {!compact && approvalHistory.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">
            Riwayat Approval
          </p>
          <div className="space-y-1">
            {approvalHistory.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs py-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    h.status === 'Approved' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
                <span className="font-medium">{h.approver}</span>
                <span className="text-gray-400">-</span>
                <span
                  className={
                    h.status === 'Approved' ? 'text-emerald-600' : 'text-red-600'
                  }
                >
                  {h.status}
                </span>
                <span className="text-gray-400 text-[10px]">({h.date})</span>
                {h.notes && (
                  <span className="text-gray-400 text-[10px] italic">
                    - {h.notes}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
