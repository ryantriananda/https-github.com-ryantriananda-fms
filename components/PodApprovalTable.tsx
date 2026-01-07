
import React from 'react';
import { PodRequestRecord } from '../types';
import { ChevronsUpDown, Eye, MapPin, Home, CheckCircle2 } from 'lucide-react';

interface Props {
  data: PodRequestRecord[];
  onView?: (item: PodRequestRecord) => void;
}

export const PodApprovalTable: React.FC<Props> = ({ data, onView }) => {
  const getStatusBadge = (status: string) => {
      const s = (status || '').toLowerCase();
      if(s.includes('approved')) return <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-500 text-white shadow-md shadow-green-200">APPROVED</span>;
      if(s.includes('rejected')) return <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-red-500 text-white shadow-md shadow-red-200">REJECTED</span>;
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-orange-500 text-white shadow-md shadow-orange-200">WAITING APPROVAL</span>;
  };

  const getActionIcon = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s.includes('waiting') || s.includes('pending')) {
        return (
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-200 shadow-sm group-hover:scale-110 transition-transform">
                <CheckCircle2 size={16} />
            </div>
        );
    }
    return <Eye size={18} className="text-gray-300 hover:text-black transition-colors" />;
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-gray-100 h-16">
              <th className="pl-10 w-20 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="px-6 w-48 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">TRANSACTION ID</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-64 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">REQUESTER</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-56 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">PREFERENCE</span>
                    <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">DATE</th>
              <th className="px-6 w-48 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">STATUS</th>
              <th className="px-6 w-32 text-center pr-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer h-24" onClick={() => onView?.(item)}>
                <td className="pl-10 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                <td className="px-6">
                   <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 w-fit font-mono font-black text-black text-[11px]">
                    {item.id}
                   </div>
                </td>
                <td className="px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${item.requesterName}&background=random`} 
                          alt={item.requesterName} 
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                    </div>
                    <div>
                      <p className="font-black text-black text-[12px] leading-tight mb-0.5 uppercase">{item.requesterName}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{item.requesterRole}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-black text-black uppercase flex items-center gap-1.5">
                            <MapPin size={12} className="text-gray-400" /> {item.floorPreference || '-'}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-4 flex items-center gap-1">
                            <Home size={10} /> {item.roomType || '-'}
                        </span>
                    </div>
                </td>
                <td className="px-6 text-[11px] font-mono font-bold text-gray-500">
                    {item.requestDate}
                </td>
                <td className="px-6 text-center">
                    {getStatusBadge(item.status)}
                </td>
                <td className="px-6 text-center pr-10">
                    <div className="flex justify-center items-center gap-2">
                         {/* Action Button - ensure onClick propagates to onView */}
                         <button 
                            className="p-2 rounded-xl hover:bg-gray-50 transition-all"
                            onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                         >
                             {getActionIcon(item.status)}
                         </button>
                         {(item.status === 'Waiting Approval' || item.status === 'Pending') && (
                             <button 
                                className="p-2 rounded-xl hover:bg-gray-50 transition-all text-gray-300 hover:text-black"
                                onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                             >
                                 <Eye size={18} />
                             </button>
                         )}
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={7} className="p-24 text-center text-gray-300 italic text-[11px] uppercase tracking-widest">Tidak ada data persetujuan</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                TOTAL <span className="text-black ml-1">{data.length} APPROVALS</span> LISTED
            </div>
      </div>
    </div>
  );
};
