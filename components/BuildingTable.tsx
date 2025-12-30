
import React from 'react';
import { BuildingRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, Building, MapPin, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Calendar, CheckCircle, RotateCcw, XCircle } from 'lucide-react';

interface Props {
  data: BuildingRecord[];
  onEdit?: (item: BuildingRecord) => void;
  onView?: (item: BuildingRecord) => void;
  onDelete?: (id: string) => void;
  onAction?: (item: BuildingRecord, action: 'Approve' | 'Reject' | 'Revise') => void;
}

export const BuildingTable: React.FC<Props> = ({ data, onEdit, onView, onDelete, onAction }) => {
  
  const renderStatusBadge = (status: string) => {
    const s = (status || 'Draft').toUpperCase();
    
    let styles = 'bg-gray-50 text-gray-500 border-gray-200';
    if (s === 'APPROVED' || s === 'COMPLETED') {
        styles = 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20';
    } else if (s === 'PENDING' || s === 'PENDING APPROVAL') {
        styles = 'bg-[#FFF7ED] text-[#EA580C] border-[#FDBA74]/50';
    } else if (s === 'REVISED') {
        styles = 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]';
    } else if (s === 'REJECTED') {
        styles = 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]';
    } else if (s === 'ON PROGRESS') {
        styles = 'bg-blue-50 text-blue-600 border-blue-100';
    }

    return (
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${styles}`}>
        {(s === 'PENDING' || s === 'PENDING APPROVAL') ? 'PENDING' : s}
      </span>
    );
  };

  const renderWorkflowActions = (item: BuildingRecord) => {
      const s = (item.status || '').toUpperCase();
      const isPending = s === 'PENDING' || s === 'PENDING APPROVAL' || s === 'ON PROGRESS';

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="p-5 pl-8 w-24 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  ID
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-56 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  PROPERTI / ASSET
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-32 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  TIPE
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-48 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  PERIODE
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-32 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  KEPEMILIKAN
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  LOKASI / ALAMAT
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-48 text-center group cursor-pointer hover:bg-gray-50/50 transition-colors">
                  APPROVAL STATUS
              </th>
              <th className="p-5 w-48 text-center group cursor-pointer hover:bg-gray-50/50 transition-colors">
                  WORKFLOW ACTIONS
              </th>
              <th className="p-5 w-24 pr-8 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px]">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="p-5 pl-8 text-[11px] font-mono font-bold text-gray-400">
                    {item.id}
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-black border border-gray-100 shrink-0">
                        <Building size={16} />
                    </div>
                    <div>
                        <div className="font-black text-black text-[13px] uppercase tracking-tight">{item.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-tighter mt-0.5">{item.assetNo}</div>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-gray-500 font-black uppercase">
                    {item.type}
                </td>
                <td className="p-5">
                    {item.startDate && item.endDate ? (
                        <div className="flex items-start gap-2">
                            <Calendar size={14} className="text-gray-400 mt-0.5" />
                            <div>
                                <div className="text-[11px] font-black text-black">{item.startDate}</div>
                                <div className="text-[10px] font-medium text-gray-400">s/d {item.endDate}</div>
                            </div>
                        </div>
                    ) : (
                        <span className="text-gray-300 font-bold text-[10px]">-</span>
                    )}
                </td>
                <td className="p-5">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                        item.ownership === 'Own' 
                        ? 'bg-blue-50 text-blue-600 border-blue-100' 
                        : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                        {item.ownership === 'Own' ? 'MILIK SENDIRI' : 'SEWA / RENTAL'}
                    </span>
                </td>
                <td className="p-5">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-600 font-bold uppercase">
                            <MapPin size={12} className="text-gray-300" />
                            {item.location}
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium truncate max-w-[200px] pl-5">
                            {item.address}
                        </div>
                    </div>
                </td>
                <td className="p-5 text-center">
                    {renderStatusBadge(item.status)}
                </td>
                <td className="p-5 text-center">
                    {renderWorkflowActions(item)}
                </td>
                <td className="p-5 pr-8 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                      className="p-1.5 text-gray-300 hover:text-black transition-all"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                      className="p-1.5 text-gray-300 hover:text-black transition-all"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                      className="p-1.5 text-gray-300 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Pagination */}
      <div className="px-8 py-5 bg-white border-t border-gray-100 flex items-center justify-between">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          SHOWING 1 - {data.length} OF <span className="text-black">{data.length}</span> ROW(S)
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            ROW PER PAGE
            <select className="bg-transparent border-0 text-[11px] font-black text-black focus:ring-0 cursor-pointer p-0">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-all">
              <ChevronsLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-all">
              <ChevronLeft size={16} />
            </button>
            
            <div className="px-4 py-1.5 bg-white border border-gray-100 rounded-lg text-[11px] font-black shadow-sm mx-2">
              1 / 1
            </div>

            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-all">
              <ChevronRight size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-all">
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
