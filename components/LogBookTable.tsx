import React from 'react';
import { LogBookRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, User, CheckCircle2, Baby, MapPin, Calendar, MessageSquare, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: LogBookRecord[];
  onEdit?: (item: LogBookRecord) => void;
  onView?: (item: LogBookRecord) => void;
  onDelete?: (id: string) => void;
}

export const LogBookTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  const { t } = useLanguage();

  const getCategoryBadge = (category: string) => {
      const cat = category.toUpperCase();
      let styles = 'bg-gray-100 text-gray-600';
      
      if (cat === 'CUSTOMER') styles = 'bg-blue-50 text-blue-600 border-blue-200';
      else if (cat === 'VENDOR' || cat === 'SUPPLIER') styles = 'bg-purple-50 text-purple-600 border-purple-200';
      else if (cat === 'INTERVIEWEE') styles = 'bg-gray-50 text-gray-600 border-gray-300';
      else if (cat === 'OTHERS') styles = 'bg-orange-50 text-orange-600 border-orange-200';
      else if (cat === 'INTERNAL') styles = 'bg-green-50 text-green-600 border-green-200';

      return (
          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${styles}`}>
              {category}
          </span>
      );
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#FBFBFB] border-b border-gray-200 h-16">
              <th className="p-4 w-14 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-4 w-56 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('LOKASI MODENA')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-4 w-44 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('KATEGORI TAMU')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-4 w-64 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('NAMA TAMU')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('TANGGAL')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-4 w-56 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">TIME LOG</span>
              </th>
              <th className="p-4 w-56 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">BREAKDOWN</span>
              </th>
              <th className="p-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('CATATAN')}</span>
              </th>
              <th className="p-4 w-32 text-center pr-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
                data.map((item, index) => (
                <tr 
                    key={item.id} 
                    onClick={() => onView?.(item)}
                    className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer h-24"
                >
                    <td className="p-4 text-center font-bold text-gray-300 text-[11px] pl-8">
                        {index + 1}
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gray-300" />
                            <span className="font-black text-black text-[12px] uppercase tracking-tight">{item.lokasiModena}</span>
                        </div>
                    </td>
                    <td className="p-4">
                        {getCategoryBadge(item.kategoriTamu)}
                    </td>
                    <td className="p-4">
                        <div className="font-black text-black text-[13px] uppercase tracking-tight">{item.namaTamu}</div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-500 font-bold text-[11px]">
                            <Calendar size={12} className="text-gray-400" />
                            {item.tanggalKunjungan}
                        </div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-center justify-center gap-8">
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] font-black text-gray-300 uppercase mb-0.5">IN</span>
                                <span className="font-black text-black text-[13px]">{item.jamDatang}</span>
                            </div>
                            <div className="h-8 w-px bg-gray-100"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] font-black text-gray-300 uppercase mb-0.5">OUT</span>
                                <span className={`font-black text-[13px] ${item.jamPulang ? 'text-gray-500' : 'text-gray-200'}`}>
                                    {item.jamPulang || '--:--'}
                                </span>
                            </div>
                        </div>
                    </td>
                    <td className="p-4">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center justify-center gap-6">
                                <User size={14} className="text-pink-400" />
                                <CheckCircle2 size={14} className="text-blue-400" />
                                <Baby size={14} className="text-orange-400" />
                            </div>
                            <div className="flex items-center justify-center gap-8 text-[11px] font-black text-black">
                                <span className="w-4 text-center">{item.countAdult || 0}</span>
                                <span className="w-4 text-center">{item.countIndividual || 0}</span>
                                <span className="w-4 text-center">{item.countChild || 0}</span>
                            </div>
                        </div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-start gap-2 text-gray-400 text-[11px] italic truncate max-w-[200px]">
                            <MessageSquare size={12} className="shrink-0 text-gray-300 mt-0.5" />
                            {item.note || '-'}
                        </div>
                    </td>
                    <td className="p-4 text-center pr-10">
                        <div className="flex items-center justify-center gap-2">
                            <button 
                                onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                                className="text-gray-300 hover:text-black transition-all p-2 rounded-xl bg-gray-50/50 hover:bg-gray-100"
                            >
                                <Eye size={18} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                                className="text-gray-300 hover:text-black transition-all p-2 rounded-xl bg-gray-50/50 hover:bg-gray-100"
                            >
                                <Pencil size={18} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                                className="text-gray-300 hover:text-red-500 transition-all p-2 rounded-xl bg-gray-50/50 hover:bg-red-50"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={9} className="p-20 text-center">
                        <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest italic">{t('No data available')}</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-[#FDFDFD] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                DISPLAYING <span className="text-black ml-1 font-black">{data.length} GUEST RECORDS</span>
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    &lt;
                 </button>
                 <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-2xl font-black text-[12px] shadow-xl shadow-black/20">1</div>
                 <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    &gt;
                 </button>
            </div>
      </div>
    </div>
  );
};