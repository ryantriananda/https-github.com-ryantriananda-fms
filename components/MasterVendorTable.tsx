
import React from 'react';
import { MasterVendorRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Building, MapPin, Phone } from 'lucide-react';

interface Props {
  data: MasterVendorRecord[];
  onEdit?: (item: MasterVendorRecord) => void;
  onView?: (item: MasterVendorRecord) => void;
}

export const MasterVendorTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-6 pl-8 w-16 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">#</th>
              <th className="p-6 w-64 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Nama Vendor</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-48 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Merek / Brand</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Alamat & Kontak</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-32 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Tipe</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Cabang</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-24 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px]">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="bg-white hover:bg-[#FDFDFD] transition-all cursor-pointer group"
                onClick={() => onView?.(item)}
              >
                <td className="p-6 text-center font-bold text-gray-300 text-[11px] pl-8">{index + 1}</td>
                <td className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-black border border-gray-100 shadow-sm">
                            <Building size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-black text-[13px] uppercase tracking-tight">{item.nama}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[8px] font-black uppercase w-fit mt-1 border ${item.aktif ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                {item.aktif ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                </td>
                <td className="p-6">
                    <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">{item.merek || '-'}</span>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-gray-600 truncate max-w-[300px]">
                            <MapPin size={12} className="text-gray-300 shrink-0" />
                            {item.alamat}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                            <Phone size={12} className="text-gray-300 shrink-0" />
                            {item.noTelp}
                        </div>
                    </div>
                </td>
                <td className="p-6">
                    <span className="bg-gray-50 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase border border-gray-100 inline-block text-gray-600">
                        {item.tipe}
                    </span>
                </td>
                <td className="p-6 text-gray-600 font-bold uppercase text-[11px]">
                    {item.cabang}
                </td>
                <td className="p-6 text-center">
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
                    <td colSpan={7} className="p-20 text-center">
                        <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest italic">Belum ada data Master Vendor</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
