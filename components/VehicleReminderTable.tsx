
import React from 'react';
import { VehicleReminderRecord } from '../types';
import { ChevronsUpDown, Calendar, AlertTriangle, CheckCircle2, Clock, Truck, FileText, Repeat, Pencil, Trash2 } from 'lucide-react';

interface Props {
  data: VehicleReminderRecord[];
  onAction?: (item: VehicleReminderRecord) => void;
  onEdit?: (item: VehicleReminderRecord) => void;
  onDelete?: (id: string) => void;
}

export const VehicleReminderTable: React.FC<Props> = ({ data, onAction, onEdit, onDelete }) => {

  const getStatusDetail = (status: string, expiryDate: string) => {
      const today = new Date();
      const next = new Date(expiryDate);
      const diffTime = next.getTime() - today.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (status === 'Expired' || days < 0) {
          return { 
              label: 'EXPIRED', 
              style: 'bg-red-50 text-red-600 border-red-200', 
              icon: <AlertTriangle size={14} />,
              days 
          };
      }
      if (status === 'Critical' || days <= 14) {
          return { 
              label: 'CRITICAL', 
              style: 'bg-red-50 text-red-600 border-red-200', 
              icon: <AlertTriangle size={14} />,
              days 
          };
      }
      if (status === 'Warning' || days <= 30) {
          return { 
              label: 'WARNING', 
              style: 'bg-orange-50 text-orange-600 border-orange-200', 
              icon: <Clock size={14} />,
              days 
          };
      }
      return { 
          label: 'SAFE', 
          style: 'bg-green-50 text-green-600 border-green-200', 
          icon: <CheckCircle2 size={14} />,
          days 
      };
  };

  const getTypeIcon = (type: string) => {
      if (type === 'KIR') return <Truck size={14} />;
      return <FileText size={14} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 pl-8 w-1/4 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">VEHICLE INFO</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-1/6 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">DOCUMENT TYPE</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-1/6 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">EXPIRY DATE</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-1/6 group cursor-pointer hover:bg-gray-200/50 transition-colors text-center">
                <div className="flex items-center justify-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">REMAINING DAYS</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-40 text-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">STATUS</span>
              </th>
              <th className="p-5 w-48 text-center pr-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ACTION</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
                data.map((item) => {
                    const statusDetail = getStatusDetail(item.status, item.expiryDate);
                    return (
                        <tr 
                            key={item.id} 
                            className="bg-white hover:bg-[#FDFDFD] transition-all group"
                        >
                            <td className="p-5 pl-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-black border border-gray-100 shadow-sm">
                                        <Truck size={18} />
                                    </div>
                                    <div>
                                        <div className="font-black text-black text-[13px] uppercase tracking-tight">{item.vehicleName}</div>
                                        <div className="text-[9px] text-gray-400 font-mono font-bold tracking-tighter uppercase mt-0.5">{item.noPolisi} • {item.branch}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-5">
                                <span className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 uppercase tracking-tight">
                                    {getTypeIcon(item.type)} {item.type}
                                </span>
                            </td>
                            <td className="p-5">
                                <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                                    <Calendar size={12} />
                                    {item.expiryDate}
                                </div>
                            </td>
                            <td className="p-5 text-center">
                                <div className={`font-mono font-black text-[14px] ${statusDetail.days < 0 ? 'text-red-600' : 'text-black'}`}>
                                    {Math.abs(statusDetail.days)} <span className="text-[10px] text-gray-400 uppercase">Days</span>
                                </div>
                            </td>
                            <td className="p-5 text-center">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${statusDetail.style}`}>
                                    {statusDetail.icon}
                                    <span>{statusDetail.label}</span>
                                </div>
                            </td>
                            <td className="p-5 text-center pr-8">
                                <div className="flex items-center justify-center gap-2">
                                    <button 
                                        onClick={() => onAction?.(item)} 
                                        className="bg-black hover:bg-gray-800 text-white p-2 rounded-xl shadow-lg shadow-black/10 transition-all active:scale-95"
                                        title="Renew"
                                    >
                                        <Repeat size={14} />
                                    </button>
                                    <button 
                                        onClick={() => onEdit?.(item)}
                                        className="bg-white hover:bg-gray-50 text-gray-500 p-2 rounded-xl border border-gray-200 transition-all active:scale-95"
                                        title="Edit Reminder"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                    <button 
                                        onClick={() => onDelete?.(item.id)}
                                        className="bg-white hover:bg-red-50 text-red-500 p-2 rounded-xl border border-gray-200 hover:border-red-200 transition-all active:scale-95"
                                        title="Delete Reminder"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })
            ) : (
                <tr>
                    <td colSpan={6} className="p-20 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Calendar size={40} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">No Upcoming Tax/KIR Expirations</p>
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
