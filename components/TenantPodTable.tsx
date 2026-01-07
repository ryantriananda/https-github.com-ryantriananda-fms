
import React from 'react';
import { TenantPodRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Bed, User, Home, Lock, Briefcase, Calendar, Info } from 'lucide-react';

interface Props {
  data: TenantPodRecord[];
  onEdit: (item: TenantPodRecord) => void;
  onView: (item: TenantPodRecord) => void;
}

export const TenantPodTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const getLockerStatusBadge = (status: string) => {
    switch (status) {
      case 'Terpakai':
        return <span className="bg-[#10B981] text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest shadow-sm">TERPAKAI</span>;
      case 'Tidak Terpakai':
      case 'Tidak Ada':
        return <span className="bg-red-500 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest shadow-sm">TIDAK TERPAKAI</span>;
      case 'Extra Loker Terpakai':
        return <span className="bg-[#3B82F6] text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest shadow-sm">EXTRA LOKER TERPAKAI</span>;
      case 'Belum Dapat':
        return <span className="bg-orange-500 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest shadow-sm">BELUM DAPAT</span>;
      default:
        return <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest">-</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-6 w-32 group cursor-pointer hover:bg-gray-200/50 transition-colors">
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
              <th className="p-6 w-24 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">NO. KAMAR</th>
              <th className="p-6 w-56 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PENGHUNI</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">POSISI / DEPARTEMEN</th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">LOKER BARANG</th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">LOKER PANTRY</th>
              <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">JADWAL LAUNDRY</th>
              <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">KETERANGAN</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px] text-gray-700">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                <td className="p-6 text-center font-bold text-gray-300 pl-8">{index + 1}</td>
                <td className="p-6 font-black text-black uppercase text-[11px]">{item.lantai}</td>
                <td className="p-6">
                    <span className="font-medium text-gray-600 uppercase text-[11px]">{item.jenisKamar}</span>
                </td>
                <td className="p-6 text-center">
                   <div className="inline-flex items-center gap-2 bg-[#F8F9FA] px-3 py-1.5 rounded-lg border border-gray-100">
                        <Home size={12} className="text-gray-400" />
                        <span className="font-black text-black">{item.nomorKamar}</span>
                   </div>
                </td>
                <td className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${item.namaPenghuni}&background=random`} 
                                alt={item.namaPenghuni}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px] font-black text-black">{item.namaPenghuni}</span>
                            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider">
                                {item.isExpat && "(EXPAT) "} {item.gender}
                            </span>
                        </div>
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black text-black uppercase">{item.posisi}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.departemen}</span>
                    </div>
                </td>
                <td className="p-6 text-center">
                    {getLockerStatusBadge(item.statusLokerBarang)}
                </td>
                <td className="p-6 text-center">
                    {getLockerStatusBadge(item.statusLokerPantry)}
                </td>
                <td className="p-6">
                     <div className="flex items-center gap-2 text-gray-500 font-medium text-[11px] uppercase">
                        <Calendar size={12} />
                        {item.jadwalLaundry}
                     </div>
                </td>
                <td className="p-6 text-[11px] text-gray-400 italic">
                    {item.keterangan || '-'}
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            onClick={() => onView(item)}
                            className="p-2 text-gray-300 hover:text-black bg-white hover:bg-gray-50 rounded-lg transition-all"
                        >
                            <Eye size={16} />
                        </button>
                        <button 
                            onClick={() => onEdit(item)}
                            className="p-2 text-gray-300 hover:text-black bg-white hover:bg-gray-50 rounded-lg transition-all"
                        >
                            <Pencil size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={11} className="p-24 text-center text-gray-300 italic text-[11px] uppercase tracking-widest">Tidak ada data tenant</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
