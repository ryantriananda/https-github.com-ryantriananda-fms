
import React from 'react';
import { ContractRecord } from '../types';
import { ChevronsUpDown, Eye, FolderX, Pencil, Trash2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  data: ContractRecord[];
  onEdit?: (item: ContractRecord) => void;
  onDelete?: (id: string) => void;
  onView?: (item: ContractRecord) => void;
}

export const ContractTable: React.FC<Props> = ({ data, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-6 pl-8 w-56 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ASSET NUMBER</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-48 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">CATEGORY</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">LOCATION</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">CHANNEL</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">STATUS</th>
              <th className="p-6 w-32 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => onView?.(item)}
                      className="bg-white hover:bg-[#FDFDFD] transition-all cursor-pointer group"
                    >
                        <td className="p-6 pl-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                                    <FileText size={14} />
                                </div>
                                <span className="font-mono font-black text-black text-[12px]">{item.assetNumber}</span>
                            </div>
                        </td>
                        <td className="p-6">
                            <span className="text-[11px] font-black text-black uppercase">{item.assetCategory}</span>
                            <div className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{item.type}</div>
                        </td>
                        <td className="p-6">
                            <div className="text-[11px] font-bold text-black uppercase">{item.location}</div>
                            <div className="text-[9px] text-gray-400 font-medium truncate max-w-[200px]">{item.address}</div>
                        </td>
                        <td className="p-6 text-[11px] font-medium text-gray-600 uppercase">{item.channel}</td>
                        <td className="p-6 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                item.status === 'Active' ? 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20' : 'bg-gray-50 text-gray-500 border-gray-200'
                            }`}>
                                {item.status}
                            </span>
                        </td>
                        <td className="p-6 text-center pr-8">
                             <div className="flex items-center justify-center gap-2">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                                    className="p-2 text-gray-300 hover:text-black transition-all bg-white hover:bg-gray-50 rounded-xl"
                                >
                                    <Eye size={16} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                                    className="p-2 text-gray-300 hover:text-blue-600 transition-all bg-white hover:bg-blue-50 rounded-xl"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-all bg-white hover:bg-red-50 rounded-xl"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={6} className="p-24 text-center">
                         <div className="flex flex-col items-center justify-center opacity-30">
                            <FolderX size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">Tidak ada data kontrak</p>
                         </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Showing <span className="text-black ml-1">{data.length} contracts</span>
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronLeft size={16} />
                 </button>
                 <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
