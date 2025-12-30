
import React from 'react';
import { AssetRecord } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight, Eye, User } from 'lucide-react';

interface Props {
  data: AssetRecord[];
  onView?: (item: AssetRecord) => void;
}

export const StationeryRequestTable: React.FC<Props> = ({ data, onView }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-5 w-14 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-5 w-48 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Transaction ID</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-72 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Requester</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-40 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Category</span>
                    <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Item Details</span>
                    <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-24 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Qty</th>
              <th className="p-5 w-36 text-[10px] font-black text-black uppercase tracking-[0.15em]">Date</th>
              <th className="p-5 w-36 text-[10px] font-black text-black uppercase tracking-[0.15em]">Status</th>
              <th className="p-5 w-24 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-5 text-center font-bold text-gray-300 text-[11px] pl-8">{index + 1}</td>
                <td className="p-5">
                   <div className="font-mono font-black text-black text-[12px] bg-gray-50 px-2 py-1 rounded inline-block">
                    {item.transactionNumber}
                   </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                        <img 
                          src={item.employee.avatar} 
                          alt={item.employee.name} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-black text-black text-[13px] leading-tight mb-0.5 uppercase">{item.employee.name}</p>
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider">{item.employee.role}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter bg-gray-100 px-2 py-0.5 rounded">
                        {item.category}
                    </span>
                </td>
                <td className="p-5">
                    <p className="font-black text-black text-[13px] uppercase tracking-tight">{item.itemName}</p>
                    <p className="text-[10px] font-mono text-gray-400 font-bold mt-1 uppercase">{item.itemCode}</p>
                </td>
                <td className="p-5 text-center">
                    <span className="text-[14px] font-black text-black">{item.qty}</span>
                </td>
                <td className="p-5">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-tight">{item.date}</span>
                </td>
                <td className="p-5">
                    <div className="flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border
                            ${item.status === 'Approved' ? 'bg-green-500 text-white border-green-600' : 
                              item.status === 'Pending' ? 'bg-orange-500 text-white border-orange-600' : 
                              item.status === 'Rejected' ? 'bg-red-500 text-white border-red-600' : 
                              'bg-gray-100 text-gray-500 border-gray-200'
                            }`}>
                            {item.status}
                        </span>
                    </div>
                </td>
                <td className="p-5 text-center">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                        className="text-gray-400 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-100 active:scale-90"
                    >
                        <Eye size={18} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Total <span className="text-black ml-1">{data.length} records</span>
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm">
                    <ChevronLeft size={16} />
                 </button>
                 <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-[11px] shadow-xl shadow-black/20">1</div>
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
