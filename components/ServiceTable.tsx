
import React from 'react';
import { ServiceRecord } from '../types';
import { ChevronsUpDown, Eye, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';

interface Props {
  data: ServiceRecord[];
  onEdit?: (item: ServiceRecord) => void;
  onView?: (item: ServiceRecord) => void;
}

export const ServiceTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-6 pl-8 w-32 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">NO REQUEST</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">NO POLISI</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">TGL REQUEST</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">CHANNEL & CABANG</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">STATUS</th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">APPROVAL</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px]">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all cursor-pointer group">
                <td className="p-6 pl-8">
                    <span className="font-mono font-bold text-black text-[12px] bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        {item.id}
                    </span>
                </td>
                <td className="p-6">
                    <span className="font-black text-black uppercase bg-black text-white px-2 py-1 rounded text-[11px]">{item.noPolisi}</span>
                </td>
                <td className="p-6 text-gray-600 font-bold font-mono">
                    {item.tglRequest}
                </td>
                <td className="p-6">
                    <div className="flex flex-col">
                        <span className="text-[12px] font-black text-black uppercase">{item.cabang}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.channel}</span>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        item.status === 'Completed' ? 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20' : 
                        item.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                        'bg-gray-50 text-gray-500 border-gray-200'
                    }`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-6 text-center">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${item.statusApproval === 'Approved' ? 'text-green-600' : 'text-orange-500'}`}>
                        {item.statusApproval}
                    </span>
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         <button 
                          onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                          className="p-2 text-gray-300 hover:text-black bg-white hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-200"
                        >
                            <Eye size={16} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                          className="p-2 text-gray-300 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                        >
                            <Pencil size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={7} className="p-24 text-center">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 opacity-50">Belum ada history servis</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Showing <span className="text-black ml-1">{data.length} records</span>
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
