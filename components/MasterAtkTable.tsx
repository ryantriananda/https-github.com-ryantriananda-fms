import React from 'react';
import { MasterItem } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight, Edit3, Trash2 } from 'lucide-react';

interface Props {
  data: MasterItem[];
  onEdit?: (item: MasterItem) => void;
}

export const MasterAtkTable: React.FC<Props> = ({ data, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1600px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 w-14 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-5 w-44 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Category</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Item Name</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Part Code</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
               <th className="p-5 w-24 text-[10px] font-black text-black uppercase tracking-[0.15em]">UoM</th>
              <th className="p-5 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Stock</th>
              <th className="p-5 w-28 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Min</th>
              <th className="p-5 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Requested</th>
              <th className="p-5 w-40 text-[10px] font-black text-black uppercase tracking-[0.15em]">Last Buy</th>
              <th className="p-5 w-44 text-right text-[10px] font-black text-black uppercase tracking-[0.15em]">Unit Price</th>
              <th className="p-5 w-44 text-right pr-8 text-[10px] font-black text-black uppercase tracking-[0.15em]">Avg Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="bg-white hover:bg-[#FDFDFD] transition-all cursor-pointer group"
                onClick={() => onEdit?.(item)}
              >
                <td className="p-5 text-center font-bold text-gray-300 text-[11px] pl-8">{index + 1}</td>
                <td className="p-5">
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-tighter border border-gray-100 px-2 py-1 rounded">
                        {item.category}
                    </span>
                </td>
                <td className="p-5">
                    <span className="font-black text-black text-[13px] uppercase tracking-tight group-hover:text-blue-600 transition-colors">{item.itemName}</span>
                </td>
                <td className="p-5">
                    <span className="font-mono text-[11px] text-gray-400 font-black">{item.itemCode}</span>
                </td>
                <td className="p-5">
                    <span className="text-[11px] font-black text-black uppercase">{item.uom}</span>
                </td>
                <td className="p-5 text-center">
                    <div className={`font-mono text-[14px] font-black ${item.remainingStock <= item.minimumStock ? 'text-red-500' : 'text-black'}`}>
                        {item.remainingStock}
                    </div>
                </td>
                <td className="p-5 text-center text-gray-400 font-mono text-[11px] font-bold">{item.minimumStock}</td>
                <td className="p-5 text-center">
                    <div className={`font-mono text-[12px] font-black ${item.requestedStock > 0 ? 'text-orange-500' : 'text-gray-300'}`}>
                        {item.requestedStock}
                    </div>
                </td>
                <td className="p-5">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-tight">{item.purchaseDate}</span>
                </td>
                <td className="p-5 text-right font-mono font-black text-black text-[13px]">
                    {item.lastPurchasePrice}
                </td>
                <td className="p-5 text-right font-mono font-black text-black text-[13px] pr-8">
                    {item.averagePrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Displaying <span className="text-black ml-1">{data.length} master items</span>
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white">
                    <ChevronLeft size={16} />
                 </button>
                 <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-[11px] shadow-xl shadow-black/20">1</div>
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};