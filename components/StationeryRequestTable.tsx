
import React from 'react';
import { AssetRecord } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight, Eye, CheckCircle2, XCircle, Package, Clock } from 'lucide-react';

interface Props {
  data: AssetRecord[];
  onView?: (item: AssetRecord) => void;
  isApprovalMode?: boolean;
  onAction?: (item: AssetRecord, action: 'Approve' | 'Reject') => void;
}

export const StationeryRequestTable: React.FC<Props> = ({ data, onView, isApprovalMode = false, onAction }) => {
  
  const getStatusBadge = (status: string) => {
      const s = status.toLowerCase();
      if(s === 'approved' || s === 'disetujui') return <span className="bg-[#10B981] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-green-200">APPROVED</span>;
      if(s === 'waiting approval' || s === 'pending') return <span className="bg-[#F97316] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-orange-200">WAITING APPROVAL</span>;
      if(s === 'rejected' || s === 'ditolak') return <span className="bg-[#EF4444] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-red-200">REJECTED</span>;
      if(s === 'closed') return <span className="bg-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">CLOSED</span>;
      if(s === 'on progress') return <span className="bg-[#3B82F6] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-blue-200">ON PROGRESS</span>;
      return <span className="bg-gray-100 text-gray-400 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-200">DRAFT</span>;
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
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">TRANSACTION ID</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-64 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">ITEMS REQUESTED</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-64 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">REQUESTER</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-40 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">DEPARTMENT</span>
                    <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="px-6 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">DATE</th>
              <th className="px-6 w-48 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">STATUS</th>
              <th className="px-6 w-32 text-center pr-10 text-[10px] font-black text-black uppercase tracking-[0.15em]">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => {
              const isPending = item.status === 'Waiting Approval' || item.status === 'Pending';
              
              return (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer h-24" onClick={() => onView?.(item)}>
                <td className="pl-10 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                <td className="px-6">
                   <div className="font-mono font-black text-black text-[12px]">
                    {item.transactionNumber || `TRX/ATK/2026/000${index+1}`}
                   </div>
                </td>
                
                {/* Items Cell */}
                <td className="px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 shrink-0">
                            <Package size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px] font-black text-black line-clamp-1">{item.itemName}</span>
                            <span className="text-[10px] font-bold text-gray-400">Qty: <span className="text-black">{item.qty}</span> Units</span>
                        </div>
                    </div>
                </td>

                <td className="px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                        <img 
                          src={item.employee.avatar} 
                          alt={item.employee.name} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div>
                      <p className="font-black text-black text-[12px] leading-tight mb-0.5 uppercase">{item.employee.name}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{item.employee.role || 'STAFF'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6">
                    <span className="text-[10px] font-black text-gray-500 bg-gray-50 px-2 py-1 rounded uppercase tracking-wider border border-gray-100">
                        {item.employee.role?.includes('SALES') ? 'SALES' : 
                         item.employee.role?.includes('HR') ? 'HRGA' : 
                         'SCM'}
                    </span>
                </td>
                <td className="px-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                        <Clock size={12} />
                        <span className="text-[11px] font-bold">{item.date}</span>
                    </div>
                </td>
                <td className="px-6 text-center">
                    {getStatusBadge(item.status)}
                </td>
                
                <td className="px-6 text-center pr-10">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                        className="text-gray-300 hover:text-black transition-all p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 active:scale-90 border border-transparent hover:border-gray-200 group-hover:bg-black group-hover:text-white"
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-10 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Showing <span className="text-black ml-1">{data.length} records</span>
            </div>
            {/* Pagination buttons */}
            <div className="flex items-center gap-2">
                 <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronLeft size={16} />
                 </button>
                 <div className="bg-black text-white w-9 h-9 flex items-center justify-center rounded-xl font-black text-[11px] shadow-xl shadow-black/20">1</div>
                 <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
