
import React from 'react';
import { GeneralAssetRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, Package, MapPin, Building, ChevronLeft, ChevronRight, ChevronsRight, ChevronsLeft } from 'lucide-react';

interface Props {
  data: GeneralAssetRecord[];
  onEdit?: (item: GeneralAssetRecord) => void;
  onView?: (item: GeneralAssetRecord) => void;
  onDelete?: (id: string) => void;
}

export const GeneralAssetTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  const getApprovalBadge = (status: string) => {
      const s = (status || 'Approved').toLowerCase();
      if(s === 'pending') return <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] bg-orange-50 text-orange-600 border border-orange-200">Pending</span>;
      if(s === 'rejected') return <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] bg-red-50 text-red-600 border border-red-200">Rejected</span>;
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] bg-[#E8FDF5] text-[#059669] border border-[#10B981]/20">Approved</span>;
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-24 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ASSET NO</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-48 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CATEGORY & TYPE</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OWNERSHIP</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-56 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">LOCATION</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-48 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DEPARTMENT</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-32 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">STATUS</span>
              </th>
              <th className="p-6 w-32 text-center pr-8">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ACTION</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8">
                    <span className="text-[11px] font-mono font-bold text-black bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        {item.assetNumber}
                    </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg shadow-black/10 shrink-0">
                        <Package size={18} />
                    </div>
                    <div>
                        <div className="font-black text-black text-[13px] uppercase tracking-tight">{item.assetCategory}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{item.type}</div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                   <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                        item.ownership === 'Own' 
                        ? 'bg-blue-50 text-blue-600 border-blue-100' 
                        : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                        {item.ownership === 'Own' ? 'OWN' : 'RENT'}
                    </span>
                </td>
                <td className="p-6">
                    <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-gray-300 mt-0.5" />
                        <div>
                            <div className="text-[11px] font-black text-black uppercase tracking-tight">{item.assetLocation}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.subLocation}</div>
                        </div>
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex items-center gap-2">
                        <Building size={14} className="text-gray-300" />
                        <div>
                            <div className="text-[11px] font-black text-black uppercase tracking-tight">{item.department}</div>
                            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.channel}</div>
                        </div>
                    </div>
                </td>
                <td className="p-6 text-center">
                    {getApprovalBadge(item.approvalStatus || 'Approved')}
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-end gap-1">
                         <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all rounded-lg hover:bg-gray-50">
                            <Eye size={18} />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} className="p-2 text-gray-300 hover:text-blue-600 transition-all rounded-lg hover:bg-blue-50">
                            <Pencil size={18} />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }} className="p-2 text-gray-300 hover:text-red-500 transition-all rounded-lg hover:bg-red-50">
                            <Trash2 size={18} />
                         </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={7} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Package size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">No General Assets Found</p>
                        </div>
                    </td>
                </tr>
            )}
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
