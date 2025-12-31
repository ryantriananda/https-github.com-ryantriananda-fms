
import React from 'react';
import { InsuranceRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, Shield, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Props {
  data: InsuranceRecord[];
  onEdit?: (item: InsuranceRecord) => void;
  onView?: (item: InsuranceRecord) => void;
  onDelete?: (id: string) => void;
}

export const InsuranceTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  const getStatusStyle = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20';
          case 'Expiring': return 'bg-orange-50 text-orange-600 border-orange-200';
          case 'Expired': return 'bg-red-50 text-red-600 border-red-200';
          default: return 'bg-gray-50 text-gray-500';
      }
  };

  const getStatusIcon = (status: string) => {
      switch(status) {
          case 'Active': return <CheckCircle size={10} />;
          case 'Expiring': return <AlertCircle size={10} />;
          case 'Expired': return <Clock size={10} />;
          default: return null;
      }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">NO. POLIS</th>
              <th className="p-6 w-56 text-[10px] font-black text-gray-400 uppercase tracking-widest">ASET TERASURANSI</th>
              <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">PROVIDER / JENIS</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">PERIODE</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">PREMI (IDR)</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">STATUS</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">TOTAL KLAIM</th>
              <th className="p-6 w-24 text-center pr-8">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8">
                    <span className="font-mono font-bold text-black text-[12px]">{item.policyNumber}</span>
                </td>
                <td className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-black border border-gray-100">
                            <Shield size={14} />
                        </div>
                        <div>
                            <div className="font-black text-black text-[12px] uppercase tracking-tight">{item.assetName}</div>
                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{item.category}</div>
                        </div>
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-black">{item.provider}</span>
                        <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded w-fit">{item.type}</span>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <div className="text-[11px] font-mono font-medium text-gray-600">
                        {item.startDate} <span className="text-gray-300">➜</span> {item.endDate}
                    </div>
                </td>
                <td className="p-6 text-right">
                    <span className="text-[12px] font-black text-black font-mono">
                        {parseInt(item.premium).toLocaleString('id-ID')}
                    </span>
                </td>
                <td className="p-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                    </span>
                </td>
                <td className="p-6 text-center">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[11px] font-black">
                        {item.claims?.length || 0}
                    </span>
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all">
                            <Eye size={16} />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all">
                            <Pencil size={16} />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }} className="p-2 text-gray-300 hover:text-red-500 transition-all">
                            <Trash2 size={16} />
                         </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={8} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Shield size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">Belum ada data asuransi</p>
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
