
import React from 'react';
import { ModenaPodRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Home, User, Bed, Box } from 'lucide-react';

interface Props {
  data: ModenaPodRecord[];
  onEdit?: (item: ModenaPodRecord) => void;
  onView?: (item: ModenaPodRecord) => void;
}

export const ModenaPodTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-24 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">NO</th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">LANTAI</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">JENIS KAMAR</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">NOMOR</th>
              <th className="p-6 w-56 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PENGHUNI</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-48 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">STATUS LOKER</th>
              <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">JADWAL LAUNDRY</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8 text-center text-[11px] font-bold text-gray-400">{index + 1}</td>
                <td className="p-6">
                    <span className="text-[11px] font-black uppercase text-gray-600">{item.lantai}</span>
                </td>
                <td className="p-6">
                    <div className="flex items-center gap-2">
                        <Bed size={14} className="text-gray-400" />
                        <span className="text-[11px] font-bold text-black">{item.jenisKamar}</span>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <span className="bg-black text-white px-3 py-1 rounded-lg text-[11px] font-black font-mono">
                        {item.nomorKamar}
                    </span>
                </td>
                <td className="p-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${item.namaPenghuni === 'Kosong' || item.namaPenghuni === 'Unknown' ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'}`}>
                            <User size={14} />
                        </div>
                        <span className={`text-[12px] font-bold ${item.namaPenghuni === 'Kosong' ? 'text-gray-400 italic' : 'text-black'}`}>
                            {item.namaPenghuni}
                        </span>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <div className="flex flex-col gap-1 items-center">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${item.statusLokerBarang === 'Terpakai' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                            Barang: {item.statusLokerBarang}
                        </span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${item.statusLokerPantry === 'Terpakai' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                            Pantry: {item.statusLokerPantry}
                        </span>
                    </div>
                </td>
                <td className="p-6 text-[11px] font-medium text-gray-600">
                    {item.jadwalLaundry}
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all bg-gray-50 rounded-lg hover:bg-gray-100">
                            <Eye size={16} />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                            <Pencil size={16} />
                         </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={8} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Home size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">Data Pod tidak ditemukan</p>
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
