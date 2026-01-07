
import React from 'react';
import { MasterPodRecord } from '../types';
import { ChevronsUpDown, Pencil, Eye } from 'lucide-react';

interface Props {
  data: MasterPodRecord[];
  onEdit: (item: MasterPodRecord) => void;
  onView: (item: MasterPodRecord) => void;
}

export const MasterPodTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'ACTIVE': return <span className="bg-[#E8FDF5] text-[#059669] border-[#10B981]/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm">ACTIVE</span>;
          case 'INACTIVE': return <span className="bg-gray-100 text-gray-500 border-gray-200 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm">INACTIVE</span>;
          case 'MAINTENANCE': return <span className="bg-red-50 text-red-600 border-red-100 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm">MAINTENANCE</span>;
          default: return <span className="bg-gray-50 text-gray-500 border-gray-200 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm">{status}</span>;
      }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-gray-100 h-16">
              <th className="pl-10 w-20 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="px-6 w-32 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ROOM NO</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-32 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">LANTAI</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-48 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">TIPE KAMAR</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">BIAYA (AWAL)</th>
              <th className="px-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">BIAYA (TERBARU)</th>
              <th className="px-6 w-40 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">STATUS</th>
              <th className="px-6 w-32 text-center pr-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer h-20" onClick={() => onView(item)}>
                <td className="pl-10 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                <td className="px-6">
                   <div className="font-mono font-black text-black text-[13px] flex items-center gap-2">
                    <span className="text-gray-300"><HomeIcon size={14} /></span>
                    {item.nomorKamar}
                   </div>
                </td>
                <td className="px-6 text-[11px] font-black text-black uppercase">{item.lantai}</td>
                <td className="px-6">
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black text-black uppercase tracking-tight">{item.jenisKamar}</span>
                        <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{item.gender} • {item.kapasitas} PAX</span>
                    </div>
                </td>
                <td className="px-6 text-[11px] font-bold text-gray-400 italic">
                    Rp {parseInt(item.biayaAwal).toLocaleString('id-ID')}
                </td>
                <td className="px-6 text-[11px] font-bold text-blue-600">
                    Rp {parseInt(item.biayaTerbaru).toLocaleString('id-ID')}
                </td>
                <td className="px-6 text-center">
                    {getStatusBadge(item.status)}
                </td>
                <td className="px-6 text-center pr-10">
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onView(item); }}
                            className="text-gray-300 hover:text-black transition-all p-2 rounded-xl bg-white hover:bg-gray-50 active:scale-90 border border-transparent hover:border-gray-100"
                        >
                            <Eye size={16} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                            className="text-gray-300 hover:text-black transition-all p-2 rounded-xl bg-white hover:bg-gray-50 active:scale-90 border border-transparent hover:border-gray-100"
                        >
                            <Pencil size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={8} className="p-24 text-center text-gray-300 italic text-[11px] uppercase tracking-widest">Tidak ada data master pod</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HomeIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);
