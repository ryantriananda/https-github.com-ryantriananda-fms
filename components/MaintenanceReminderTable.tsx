
import React from 'react';
import { MaintenanceScheduleRecord } from '../types';
import { ChevronsUpDown, Eye, Trash2, Calendar, AlertTriangle, CheckCircle2, Clock, Wrench } from 'lucide-react';

interface Props {
  data: MaintenanceScheduleRecord[];
  onAction?: (item: MaintenanceScheduleRecord) => void;
}

export const MaintenanceReminderTable: React.FC<Props> = ({ data, onAction }) => {

  const getStatusDetail = (status: string, nextDate: string) => {
      const today = new Date();
      const next = new Date(nextDate);
      const diffTime = next.getTime() - today.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (status === 'Overdue' || days < 0) {
          return { 
              label: 'OVERDUE', 
              style: 'bg-red-50 text-red-600 border-red-200', 
              icon: <AlertTriangle size={14} />,
              days 
          };
      }
      if (status === 'Warning' || days <= 14) {
          return { 
              label: 'DUE SOON', 
              style: 'bg-orange-50 text-orange-600 border-orange-200', 
              icon: <Clock size={14} />,
              days 
          };
      }
      return { 
          label: 'ON SCHEDULE', 
          style: 'bg-green-50 text-green-600 border-green-200', 
          icon: <CheckCircle2 size={14} />,
          days 
      };
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 pl-8 w-1/4 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ASSET INFO</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-1/6 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">FREQUENCY</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-1/6 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">LAST SERVICE</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-1/6 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">NEXT DUE</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 w-40 text-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">STATUS</span>
              </th>
              <th className="p-5 w-32 text-center pr-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ACTION</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
                data.map((item) => {
                    const statusDetail = getStatusDetail(item.status, item.nextMaintenanceDate);
                    return (
                        <tr 
                            key={item.id} 
                            className="bg-white hover:bg-[#FDFDFD] transition-all group"
                        >
                            <td className="p-5 pl-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                                        <Wrench size={18} />
                                    </div>
                                    <div>
                                        <div className="font-black text-black text-[13px] uppercase tracking-tight">{item.assetName}</div>
                                        <div className="text-[9px] text-gray-400 font-mono font-bold tracking-tighter uppercase mt-0.5">{item.assetCode} • {item.location}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-5">
                                <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {item.frequency}
                                </span>
                            </td>
                            <td className="p-5">
                                <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                                    <Calendar size={12} />
                                    {item.lastMaintenanceDate}
                                </div>
                            </td>
                            <td className="p-5">
                                <div className={`flex items-center gap-2 text-[11px] font-black ${statusDetail.days < 0 ? 'text-red-600' : 'text-black'}`}>
                                    <Calendar size={12} />
                                    {item.nextMaintenanceDate}
                                    <span className="text-[9px] text-gray-400 font-normal">
                                        ({Math.abs(statusDetail.days)} days {statusDetail.days < 0 ? 'ago' : 'left'})
                                    </span>
                                </div>
                            </td>
                            <td className="p-5 text-center">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${statusDetail.style}`}>
                                    {statusDetail.icon}
                                    <span>{statusDetail.label}</span>
                                </div>
                            </td>
                            <td className="p-5 text-center pr-8">
                                <button 
                                    onClick={() => onAction?.(item)} 
                                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-black/10 transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
                                >
                                    <Wrench size={12} /> Create Ticket
                                </button>
                            </td>
                        </tr>
                    );
                })
            ) : (
                <tr>
                    <td colSpan={6} className="p-20 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Calendar size={40} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">No Maintenance Schedule Found</p>
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
