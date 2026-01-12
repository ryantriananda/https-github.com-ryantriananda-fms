
// @google/genai Coding Guidelines: This file uses icons from lucide-react.

import React from 'react';
import { BuildingAssetRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, CheckCircle, XCircle, Clock, MapPin, Building, Activity, RotateCcw } from 'lucide-react';

interface Props {
  data: BuildingAssetRecord[];
  onEdit?: (item: BuildingAssetRecord) => void;
  onView?: (item: BuildingAssetRecord) => void;
  onAction?: (item: BuildingAssetRecord, action: 'Approve' | 'Reject' | 'Revise') => void;
}

export const BuildingAssetTable: React.FC<Props> = ({ data, onEdit, onView, onAction }) => {
  
  const getApprovalBadge = (status: BuildingAssetRecord['approvalStatus']) => {
    switch (status) {
      case 'Approved':
        return <span className="bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-1.5 justify-center"><CheckCircle size={12} strokeWidth={3} />APPROVED</span>;
      case 'Rejected':
        return <span className="bg-red-50 text-red-600 border-red-200 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-1.5 justify-center"><XCircle size={12} strokeWidth={3} />REJECTED</span>;
      case 'Revised':
        return <span className="bg-blue-50 text-blue-600 border-blue-200 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-1.5 justify-center"><RotateCcw size={12} strokeWidth={3} />REVISED</span>;
      case 'Pending Approval':
        return <span className="bg-orange-50 text-orange-600 border-orange-200 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-1.5 justify-center"><Clock size={12} strokeWidth={3} />PENDING</span>;
      default:
        return <span className="bg-gray-50 text-gray-500 border-gray-200 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm">DRAFT</span>;
    }
  };

  const getConditionStyle = (status: string) => {
    switch(status) {
        case 'Good': return 'bg-emerald-500';
        case 'Fair': return 'bg-amber-500';
        case 'Critical': return 'bg-red-600';
        case 'Maintenance': return 'bg-blue-500';
        default: return 'bg-gray-400';
    }
  };

  const getConditionLabel = (status: string) => {
    switch(status) {
        case 'Good': return 'Baik';
        case 'Fair': return 'Cukup';
        case 'Critical': return 'Rusak';
        case 'Maintenance': return 'Under Maintenance';
        default: return status;
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b-2 border-gray-200">
              <th className="p-6 pl-8 w-24 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">ID</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-72 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">ASSET NAME / CODE</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">TYPE</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-60 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">LOCATION</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-44 group cursor-pointer hover:bg-gray-200/50 transition-colors text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">CONDITION</span>
              </th>
              <th className="p-6 w-52 group cursor-pointer hover:bg-gray-200/50 transition-colors text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">STATUS</span>
              </th>
              <th className="p-6 w-72 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">ACTIONS</span>
              </th>
              <th className="p-6 w-20 text-center pr-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50/80 transition-all group border-b border-gray-50">
                <td className="p-6 pl-8 text-[11px] font-mono font-bold text-gray-400 group-hover:text-black transition-colors">
                    #{item.id}
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-black to-gray-700 text-white flex items-center justify-center shadow-xl shadow-black/20 group-hover:scale-105 transition-transform">
                        <Activity size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <div className="font-black text-black text-[14px] uppercase tracking-tight leading-tight">{item.assetName || 'Unnamed Asset'}</div>
                        <div className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider mt-1.5 flex items-center gap-2">
                            <div className="px-2 py-0.5 bg-gray-100 rounded-md">{item.assetCode || 'N/A'}</div>
                            {item.brand && <span className="text-gray-300">• {item.brand}</span>}
                        </div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                   <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                       <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                       <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{item.assetType || 'N/A'}</span>
                   </div>
                </td>
                <td className="p-6">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <MapPin size={14} className="text-gray-400" />
                        </div>
                        <div>
                            <div className="text-[12px] font-black text-black uppercase tracking-tight leading-tight">{item.buildingName || 'Not Set'}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                                {item.floor && item.roomName ? `${item.floor} • ${item.roomName}` : 'Location not specified'}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-xl border-2 border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                        <div className={`w-2.5 h-2.5 rounded-full ${getConditionStyle(item.status)} shadow-lg`}></div>
                        <span className="text-[11px] font-black text-black uppercase tracking-tight">{getConditionLabel(item.status)}</span>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <div className="flex justify-center">
                        {getApprovalBadge(item.approvalStatus)}
                    </div>
                </td>
                <td className="p-6">
                    {item.approvalStatus === 'Pending Approval' ? (
                        <div className="flex items-center justify-center gap-2">
                            <button 
                                onClick={() => onAction?.(item, 'Approve')}
                                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white p-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all active:scale-95 group/btn"
                                title="Approve"
                            >
                                <CheckCircle size={18} strokeWidth={2.5} className="group-hover/btn:scale-110 transition-transform" />
                            </button>
                            <button 
                                onClick={() => onAction?.(item, 'Revise')}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 group/btn"
                                title="Request Revision"
                            >
                                <RotateCcw size={18} strokeWidth={2.5} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                            </button>
                            <button 
                                onClick={() => onAction?.(item, 'Reject')}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-3 rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-95 group/btn"
                                title="Reject"
                            >
                                <XCircle size={18} strokeWidth={2.5} className="group-hover/btn:scale-110 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.15em] italic px-4 py-2 bg-gray-50 rounded-lg inline-block">Process Complete</span>
                        </div>
                    )}
                </td>
                <td className="p-6 text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                         <button 
                            onClick={() => onView?.(item)} 
                            className="p-2.5 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group/icon"
                            title="View Details"
                         >
                            <Eye size={18} className="group-hover/icon:scale-110 transition-transform" />
                         </button>
                         <button 
                            onClick={() => onEdit?.(item)} 
                            className="p-2.5 text-gray-300 hover:text-black hover:bg-gray-100 rounded-xl transition-all group/icon"
                            title="Edit Asset"
                         >
                            <Pencil size={18} className="group-hover/icon:scale-110 transition-transform" />
                         </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={8} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-40">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                <Clock size={40} className="text-gray-300" />
                            </div>
                            <p className="text-[13px] font-black uppercase tracking-[0.3em] text-gray-400">Belum ada aset gedung terdaftar</p>
                            <p className="text-[10px] text-gray-300 mt-2 font-medium">Klik tombol "Register Asset Baru" untuk menambahkan</p>
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
