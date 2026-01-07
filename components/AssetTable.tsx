
import React from 'react';
import { AssetRecord } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight, Eye, Package } from 'lucide-react';

interface Props {
  data: AssetRecord[];
  onView?: (item: AssetRecord) => void;
}

export const AssetTable: React.FC<Props> = ({ data, onView }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-6 pl-8 w-20 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-6 w-48 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">NO TRANSAKSI</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-64 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">EMPLOYEE</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-48 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ITEM DETAILS</span>
                    <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-24 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">QTY</th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">DATE</th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">STATUS</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                onClick={() => onView?.(item)}
                className="bg-white hover:bg-[#FDFDFD] transition-all cursor-pointer group"
              >
                <td className="p-6 pl-8 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                
                <td className="p-6">
                   <div className="font-mono font-black text-black text-[12px] bg-gray-50 px-2 py-1 rounded w-fit border border-gray-100">
                    {item.transactionNumber}
                   </div>
                </td>

                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.employee.avatar} 
                      alt={item.employee.name} 
                      className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-black text-black text-[12px] leading-tight mb-0.5 uppercase">{item.employee.name}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{item.employee.role}</p>
                    </div>
                  </div>
                </td>

                <td className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                            <Package size={16} />
                        </div>
                        <div>
                            <p className="font-black text-black text-[12px]">{item.itemName}</p>
                            <p className="text-[9px] text-gray-400 font-medium">{item.category}</p>
                        </div>
                    </div>
                </td>
                
                <td className="p-6 text-center">
                    <span className="text-[12px] font-black text-black">{item.qty}</span>
                    <span className="text-[9px] text-gray-400 ml-1">{item.uom}</span>
                </td>
                <td className="p-6 text-center text-[11px] font-bold text-gray-500">{item.date}</td>
                
                <td className="p-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        item.status === 'Approved' ? 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20' : 
                        item.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                        item.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' : 
                        'bg-gray-50 text-gray-500 border-gray-200'
                    }`}>
                        {item.status}
                    </span>
                </td>

                <td className="p-6 text-center pr-8">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                        className="text-gray-300 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100"
                    >
                        <Eye size={16} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Showing <span className="text-black ml-1">{data.length} Requests</span>
            </div>
            
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
