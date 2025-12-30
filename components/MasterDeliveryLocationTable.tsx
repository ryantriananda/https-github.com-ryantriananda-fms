import React from 'react';
import { DeliveryLocationRecord } from '../types';
import { ChevronsUpDown, Pencil, Trash2, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: DeliveryLocationRecord[];
  onEdit: (item: DeliveryLocationRecord) => void;
  onDelete: (id: number) => void;
}

export const MasterDeliveryLocationTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 w-16 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-5 w-1/4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Name</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-1/3 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Address</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-1/4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Type</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-24 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px] text-gray-700">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                        <td className="p-5 text-center font-bold text-gray-300 text-[11px] pl-8">{index + 1}</td>
                        <td className="p-5 font-black text-black text-[13px] uppercase tracking-tight">{item.name}</td>
                        <td className="p-5 text-gray-500 font-medium truncate max-w-xs">{item.address}</td>
                        <td className="p-5">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
                            {item.type}
                          </span>
                        </td>
                        <td className="p-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <button 
                                    onClick={() => onEdit(item)}
                                    className="p-2 text-gray-300 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button 
                                    onClick={() => onDelete(item.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5} className="p-20 text-center">
                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-300">No delivery locations available</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Pagination Footer */}
       <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Showing {data.length > 0 ? 1 : 0} - {data.length} of <span className="text-black">{data.length}</span> items
            </div>
            
            <div className="flex items-center gap-1">
                 <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
                    <ChevronLeft size={16} />
                 </button>
                 <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};