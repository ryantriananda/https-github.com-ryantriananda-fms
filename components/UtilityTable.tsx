
import React from 'react';
import { UtilityRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, Zap, Droplets, Wifi, CheckCircle2, Clock } from 'lucide-react';

interface Props {
  data: UtilityRecord[];
  onEdit?: (item: UtilityRecord) => void;
  onView?: (item: UtilityRecord) => void;
  onDelete?: (id: string) => void;
}

export const UtilityTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  
  const getTypeIcon = (type: string) => {
      const t = type.toLowerCase();
      if(t.includes('listrik') || t.includes('pln')) return <Zap size={16} className="text-yellow-600" />;
      if(t.includes('air') || t.includes('pdam')) return <Droplets size={16} className="text-blue-600" />;
      return <Wifi size={16} className="text-purple-600" />;
  };

  const getStatusBadge = (status: string) => {
      if(status === 'Paid') return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-green-200">Paid</span>;
      if(status === 'Unpaid') return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-red-200">Unpaid</span>;
      return <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-orange-200">Pending</span>;
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-32 text-[10px] font-black text-gray-400 uppercase tracking-widest">PERIODE</th>
              <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">LOKASI</th>
              <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">TIPE UTILITAS</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">METER READING</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">USAGE</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">BIAYA (IDR)</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">STATUS</th>
              <th className="p-6 w-24 text-center pr-8">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                <td className="p-6 pl-8">
                    <div className="font-bold text-black text-[12px]">{item.period}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{item.date}</div>
                </td>
                <td className="p-6 text-[12px] font-black text-gray-600 uppercase">
                    {item.location}
                </td>
                <td className="p-6">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                        {getTypeIcon(item.type)}
                        <span className="text-[11px] font-bold text-black">{item.type}</span>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-gray-500">
                        <span>{item.meterStart}</span>
                        <span className="text-gray-300">→</span>
                        <span className="font-bold text-black">{item.meterEnd}</span>
                    </div>
                </td>
                <td className="p-6 text-right">
                    <span className="text-[14px] font-black text-black">{item.usage}</span>
                    <span className="text-[10px] font-bold text-gray-400 ml-1">{item.unit}</span>
                </td>
                <td className="p-6 text-right font-mono font-bold text-black text-[12px]">
                    Rp {parseInt(item.cost).toLocaleString('id-ID')}
                </td>
                <td className="p-6 text-center">
                    {getStatusBadge(item.status)}
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         <button onClick={() => onView?.(item)} className="p-2 text-gray-300 hover:text-black transition-all">
                            <Eye size={16} />
                         </button>
                         <button onClick={() => onEdit?.(item)} className="p-2 text-gray-300 hover:text-black transition-all">
                            <Pencil size={16} />
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
