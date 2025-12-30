
import React from 'react';
import { LogBookRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, User, Users, Baby, MapPin, Clock, Calendar, MessageSquare, MoreHorizontal, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: LogBookRecord[];
  onEdit?: (item: LogBookRecord) => void;
  onView?: (item: LogBookRecord) => void;
}

export const LogBookTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 w-14 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-5 w-56 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">{t('Lokasi MODENA')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-44 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">{t('Kategori Tamu')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">{t('Nama Tamu')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-36 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">{t('Tanggal')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-44 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Time Log</th>
              <th className="p-5 w-56 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Breakdown</th>
              <th className="p-5 text-[10px] font-black text-black uppercase tracking-[0.15em]">{t('Note')}</th>
              <th className="p-5 w-24 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
                data.map((item, index) => {
                const isStillVisiting = !item.jamPulang;
                return (
                <tr 
                    key={item.id} 
                    onClick={() => onView?.(item)}
                    className="bg-white hover:bg-[#F8F9FA] transition-all group cursor-pointer"
                >
                    <td className="p-5 text-center font-bold text-gray-300 text-[11px] pl-8">
                        {isStillVisiting ? <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mx-auto" /> : (index + 1)}
                    </td>
                    <td className="p-5">
                        <div className="flex items-center gap-2">
                            <MapPin size={12} className="text-gray-400" />
                            <span className="font-black text-black text-[12px] uppercase tracking-tight">{item.lokasiModena}</span>
                        </div>
                    </td>
                    <td className="p-5">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                            item.kategoriTamu === 'Customer' ? 'bg-blue-50 text-blue-600' : 
                            item.kategoriTamu === 'Supplier' ? 'bg-orange-50 text-orange-600' :
                            'bg-gray-100 text-gray-500'
                        }`}>
                            {item.kategoriTamu}
                        </span>
                    </td>
                    <td className="p-5">
                        <div className="font-black text-black text-[14px] uppercase group-hover:text-black transition-colors">{item.namaTamu}</div>
                        {isStillVisiting && <span className="text-[9px] font-black text-green-600 uppercase tracking-tighter flex items-center gap-1 mt-0.5"><Activity size={8} /> Now Visiting</span>}
                    </td>
                    <td className="p-5">
                        <div className="flex items-center gap-2 text-gray-400 font-bold text-[11px]">
                            <Calendar size={12} />
                            {item.tanggalKunjungan}
                        </div>
                    </td>
                    <td className="p-5">
                        <div className="flex items-center justify-center gap-3">
                            <div className="text-center">
                                <div className="text-[9px] font-black text-gray-300 uppercase">In</div>
                                <div className="font-mono font-black text-black text-[13px]">{item.jamDatang}</div>
                            </div>
                            <div className="h-4 w-[1px] bg-gray-200"></div>
                            <div className="text-center">
                                <div className="text-[9px] font-black text-gray-300 uppercase">Out</div>
                                <div className="font-mono font-black text-gray-400 text-[13px]">{item.jamPulang || '--:--'}</div>
                            </div>
                        </div>
                    </td>
                    <td className="p-5">
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex flex-col items-center">
                                <Users size={14} className="text-pink-500/50 group-hover:text-pink-500 transition-colors mb-1" />
                                <span className="text-[11px] font-black text-black">{item.wanita}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <User size={14} className="text-blue-500/50 group-hover:text-blue-500 transition-colors mb-1" />
                                <span className="text-[11px] font-black text-black">{item.lakiLaki}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Baby size={14} className="text-orange-500/50 group-hover:text-orange-500 transition-colors mb-1" />
                                <span className="text-[11px] font-black text-black">{item.anakAnak}</span>
                            </div>
                        </div>
                    </td>
                    <td className="p-5">
                        <div className="flex items-center gap-2 text-gray-400 text-[11px] italic truncate max-w-[200px]">
                            <MessageSquare size={12} className="shrink-0" />
                            {item.note || '-'}
                        </div>
                    </td>
                    <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-1">
                            <button 
                                onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                                className="text-gray-400 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-100 active:scale-90"
                            >
                                <Eye size={18} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                                className="text-gray-400 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-100 active:scale-90"
                            >
                                <Pencil size={18} />
                            </button>
                        </div>
                    </td>
                </tr>
                )})
            ) : (
                <tr>
                    <td colSpan={9} className="p-20 text-center">
                        <div className="flex flex-col items-center justify-center opacity-30">
                            <Users size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-widest">{t('No data available')}</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Displaying <span className="text-black ml-1">{data.length} guest records</span>
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
