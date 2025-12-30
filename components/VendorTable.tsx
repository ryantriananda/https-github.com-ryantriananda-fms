
import React from 'react';
import { VendorRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, Mail, Phone, MapPin, User, Tag } from 'lucide-react';

interface Props {
  data: VendorRecord[];
  onEdit?: (item: VendorRecord) => void;
  onView?: (item: VendorRecord) => void;
  onDelete?: (id: string | number) => void;
}

export const VendorTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  return (
    <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-6 pl-8 w-16 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">#</th>
              <th className="p-6 w-72 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Vendor Name</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-48 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Type & Category</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Contact Info</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-36 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Status</th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">PIC</th>
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
                    <div className="flex flex-col">
                        <span className="font-black text-black text-[13px] uppercase tracking-tight">{item.vendorName}</span>
                        <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 w-fit px-2 py-0.5 rounded mt-1">{item.vendorCode}</span>
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                            <span className="text-[11px] font-black text-gray-700 uppercase">{item.type}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-3">
                            <Tag size={10} />
                            {item.category}
                        </div>
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                            <Mail size={12} className="text-gray-400" />
                            {item.email}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                            <Phone size={12} className="text-gray-400" />
                            {item.phone}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 italic truncate max-w-[250px]">
                            <MapPin size={12} className="shrink-0" />
                            {item.address}
                        </div>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border shadow-sm
                        ${item.status === 'Active' 
                        ? 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20' 
                        : item.status === 'Inactive' 
                        ? 'bg-gray-50 text-gray-500 border-gray-200'
                        : 'bg-red-50 text-red-600 border-red-200'}`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-gray-600">
                        <User size={12} className="text-gray-400" />
                        {item.picName || '-'}
                    </div>
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
    </div>
  );
};
