
import React from 'react';
import { LockerRequestRecord } from '../types';
import { Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface Props {
  data: LockerRequestRecord[];
  onView?: (item: LockerRequestRecord) => void;
}

export const LockerRequestTable: React.FC<Props> = ({ data, onView }) => {
  const getStatusBadge = (status: string) => {
    const s = (status || '').toLowerCase();
    
    if (s === 'approved') {
        return <span className="bg-[#10B981] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-green-200">APPROVED</span>;
    }
    if (s === 'rejected') {
        return <span className="bg-[#EF4444] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-red-200">REJECTED</span>;
    }
    // Waiting Approval / Pending
    return <span className="bg-[#F97316] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-orange-200">WAITING APPROVAL</span>;
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100 h-20 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <th className="pl-10 w-20 text-center">#</th>
              <th className="px-6 w-48">TRANSACTION ID</th>
              <th className="px-6 w-64">REQUESTER</th>
              <th className="px-6 w-40 text-center">DATE</th>
              <th className="px-6 w-48 text-center">STATUS</th>
              <th className="px-6 w-32 text-center pr-10">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => {
                return (
                  <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer h-24" onClick={() => onView?.(item)}>
                    <td className="pl-10 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                    <td className="px-6">
                       <div className="font-mono font-black text-black text-[12px]">
                        {item.id}
                       </div>
                    </td>
                    
                    <td className="px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${
                                index % 3 === 0 ? 'bg-red-500' : index % 3 === 1 ? 'bg-green-500' : 'bg-orange-500'
                            }`}>
                                {item.requesterName.substring(0, 2).toUpperCase()}
                            </div>
                        </div>
                        <div>
                          <p className="font-black text-black text-[12px] leading-tight mb-0.5 uppercase">{item.requesterName}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{item.requesterRole || 'STAFF'}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 text-center">
                        <span className="text-[11px] font-bold text-gray-500">{item.requestDate}</span>
                    </td>
                    
                    <td className="px-6 text-center">
                        {getStatusBadge(item.status)}
                    </td>
                    
                    <td className="px-6 text-center pr-10">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                            className="text-gray-300 hover:text-black transition-all p-2 rounded-xl bg-white hover:bg-gray-50 active:scale-90 border border-transparent hover:border-gray-100"
                        >
                            <Eye size={18} />
                        </button>
                    </td>
                  </tr>
                );
            })}
            {data.length === 0 && (
                <tr>
                    <td colSpan={6} className="p-24 text-center text-gray-300 italic text-[11px] uppercase tracking-widest">No locker requests found</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-10 py-8 bg-white border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                TOTAL <span className="text-black ml-1">{data.length} REQUESTS</span> IDENTIFIED
            </div>
      </div>
    </div>
  );
};
