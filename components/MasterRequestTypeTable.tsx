
import React from 'react';
import { RequestTypeRecord } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  data: RequestTypeRecord[];
  onEdit: (item: RequestTypeRecord) => void;
  onDelete: (id: number | string) => void;
}

export const MasterRequestTypeTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200 h-16 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="pl-8 w-24 text-center">#</th>
              <th className="px-6">NAMA REQUEST</th>
              <th className="px-6 w-40 text-center">STATUS</th>
              <th className="px-6 w-32 text-center pr-8">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-[#FDFDFD] bg-white transition-colors cursor-pointer group h-16"
              >
                <td className="pl-8 text-center text-[11px] font-bold text-gray-300">{index + 1}</td>
                
                <td className="px-6 text-[12px] font-black text-black uppercase tracking-tight">
                    {item.name}
                </td>
                
                <td className="px-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        item.status === 'Active' 
                        ? 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20' 
                        : 'bg-gray-50 text-gray-500 border-gray-200'
                    }`}>
                        {item.status}
                    </span>
                </td>
                
                <td className="px-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            className="p-2 text-gray-300 hover:text-black bg-white hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100"
                            onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                            title="Edit"
                        >
                            <Pencil size={16} />
                        </button>
                        <button 
                            className="p-2 text-gray-300 hover:text-red-600 bg-white hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                            onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                        No Request Types Found
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-6 flex items-center justify-between border-t border-gray-100 bg-[#FAFAFA]">
         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            DISPLAYING <span className="text-black font-black mx-1">{data.length}</span> ITEMS
         </div>
      </div>
    </div>
  );
};
