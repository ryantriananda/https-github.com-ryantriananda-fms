
import React from 'react';
import { BuildingMaintenanceRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, Calendar, Wrench, CheckCircle, RotateCcw, XCircle } from 'lucide-react';

interface Props {
  data: BuildingMaintenanceRecord[];
  onEdit?: (item: BuildingMaintenanceRecord) => void;
  onView?: (item: BuildingMaintenanceRecord) => void;
  onDelete?: (id: string) => void;
  onAction?: (item: BuildingMaintenanceRecord, action: 'Approve' | 'Reject' | 'Revise') => void;
}

export const BuildingMaintenanceTable: React.FC<Props> = ({ data, onEdit, onView, onDelete, onAction }) => {
  const getProgressStyle = (status: string) => {
    switch(status) {
        case 'Completed': return 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20';
        case 'In Progress': return 'bg-blue-50 text-blue-600 border-blue-100';
        case 'Scheduled': return 'bg-orange-50 text-orange-600 border-orange-100';
        default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  const getApprovalBadge = (status: string) => {
    const s = (status || 'Draft').toUpperCase();
    let styles = 'bg-gray-50 text-gray-500 border-gray-200';
    let displayText = s;
    
    if (s === 'APPROVED') {
        styles = 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20';
    } else if (s === 'PENDING APPROVAL' || s === 'PENDING') {
        styles = 'bg-[#FFF7ED] text-[#EA580C] border-[#FDBA74]/50';
        displayText = 'PENDING';
    } else if (s === 'REVISED') {
        styles = 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]';
    } else if (s === 'REJECTED') {
        styles = 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]';
    }

    return (
      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${styles}`}>
        {displayText}
      </span>
    );
  };

  const renderWorkflowActions = (item: BuildingMaintenanceRecord) => {
      const s = (item.approvalStatus || 'Draft').toUpperCase();
      const isPending = s === 'PENDING APPROVAL' || s === 'PENDING';

      if (isPending && onAction) {
          return (
              <div className="flex items-center justify-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAction(item, 'Approve'); }}
                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                    title="Approve"
                  >
                      <CheckCircle size={16} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAction(item, 'Revise'); }}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                    title="Revise"
                  >
                      <RotateCcw size={16} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAction(item, 'Reject'); }}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                    title="Reject"
                  >
                      <XCircle size={16} strokeWidth={3} />
                  </button>
              </div>
          );
      }

      return (
          <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] italic text-center">
              WORKFLOW COMPLETED
          </div>
      );
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-32 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">REQUEST ID</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-56 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ASSET / LOCATION</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TYPE / VENDOR</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DESCRIPTION</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-32 group cursor-pointer hover:bg-gray-200/50 transition-colors text-right">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">COST</span>
              </th>
              <th className="p-6 w-36 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PROGRESS</span>
              </th>
              <th className="p-6 w-40 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">APPROVAL STATUS</span>
              </th>
              <th className="p-6 w-48 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WORKFLOW ACTIONS</span>
              </th>
              <th className="p-6 w-24 text-center pr-8">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ACTION</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8 text-[11px] font-mono font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                    {item.id}
                </td>
                <td className="p-6">
                  <div className="flex items-start gap-3">
                    <div>
                        <div className="font-black text-black text-[13px] uppercase tracking-tight">{item.assetName}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                            <Calendar size={10} /> {item.requestDate}
                        </div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                            <span className="text-[11px] font-black text-black uppercase">{item.maintenanceType}</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-3.5">{item.vendor}</span>
                    </div>
                </td>
                <td className="p-6">
                    <p className="text-[11px] font-medium text-gray-600 line-clamp-2 leading-relaxed">{item.description}</p>
                </td>
                <td className="p-6 text-right">
                    <span className="text-[12px] font-black text-black font-mono">
                        {parseInt(item.cost).toLocaleString('id-ID')}
                    </span>
                </td>
                <td className="p-6 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getProgressStyle(item.status)}`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-6 text-center">
                    {getApprovalBadge(item.approvalStatus || 'Draft')}
                </td>
                <td className="p-6 text-center">
                    {renderWorkflowActions(item)}
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         <button 
                            onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                            className="p-2 text-gray-300 hover:text-black transition-all bg-gray-50 rounded-lg hover:bg-gray-100"
                         >
                            <Eye size={16} />
                         </button>
                         <button 
                            onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                            className="p-2 text-gray-300 hover:text-blue-600 transition-all bg-gray-50 rounded-lg hover:bg-blue-50"
                         >
                            <Pencil size={16} />
                         </button>
                         <button 
                            onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                            className="p-2 text-gray-300 hover:text-red-500 transition-all bg-gray-50 rounded-lg hover:bg-red-50"
                         >
                            <Trash2 size={16} />
                         </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={9} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Wrench size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">Belum ada riwayat pemeliharaan</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
