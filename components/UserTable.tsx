
import React from 'react';
import { UserRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Mail, Phone, Building } from 'lucide-react';

interface Props {
  data: UserRecord[];
  onEdit?: (item: UserRecord) => void;
  onView?: (item: UserRecord) => void;
  onDelete?: (id: string) => void;
}

export const UserTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  return (
    <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-6 pl-8 w-16 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">#</th>
              <th className="p-6 w-72 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Employee</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-48 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Role & Dept</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Contact</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-36 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Status</th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Last Active</th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer"
                onClick={() => onView?.(item)}
              >
                <td className="p-6 text-center font-bold text-gray-300 text-[11px] pl-8">{index + 1}</td>
                <td className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img 
                                src={item.avatar} 
                                alt={item.name} 
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${item.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        </div>
                        <div>
                            <p className="font-black text-black text-[13px] uppercase tracking-tight leading-tight">{item.name}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1">{item.id}</p>
                        </div>
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-black text-black uppercase">{item.role}</span>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            <Building size={10} />
                            {item.department}
                        </div>
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                            <Mail size={12} className="text-gray-400" />
                            {item.email}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                            <Phone size={10} />
                            {item.phone}
                        </div>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border shadow-sm
                        ${item.status === 'Active' 
                        ? 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20' 
                        : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-6 text-center">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{item.lastActive}</span>
                </td>
                <td className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                          className="p-2 text-gray-400 hover:text-black bg-white hover:bg-gray-100 rounded-xl transition-all border border-transparent hover:border-gray-200"
                        >
                            <Eye size={16} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                          className="p-2 text-gray-400 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                        >
                            <Pencil size={16} />
                        </button>
                         <button 
                          onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                          className="p-2 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Total <span className="text-black ml-1">{data.length} Users</span>
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronLeft size={16} />
                 </button>
                 <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-[11px] shadow-xl shadow-black/20">1</div>
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
