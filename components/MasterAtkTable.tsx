
import React from 'react';
import { MasterItem } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight, Eye, Trash2, Pencil } from 'lucide-react';

interface Props {
  data: MasterItem[];
  onEdit?: (item: MasterItem) => void;
  onDelete?: (id: string | number) => void;
}

export const MasterAtkTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const formatCurrency = (val?: string) => {
    if (!val) return '-';
    const num = parseInt(val.replace(/\D/g, '')) || 0;
    return `Rp ${num.toLocaleString('id-ID')}`;
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-gray-100 h-16 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="pl-8 w-16 text-center">#</th>
              <th className="px-6 w-32 group cursor-pointer hover:text-black transition-colors">
                <div className="flex items-center justify-between">
                    PART CODE <ChevronsUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-6 w-40 group cursor-pointer hover:text-black transition-colors">
                <div className="flex items-center justify-between">
                    CATEGORY <ChevronsUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-6 w-64 group cursor-pointer hover:text-black transition-colors">
                <div className="flex items-center justify-between">
                    ITEM NAME <ChevronsUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-6 w-20 text-center group cursor-pointer hover:text-black transition-colors">
                 UOM
              </th>
              {/* New IN STOCK Column */}
              <th className="px-6 w-24 text-center group cursor-pointer hover:text-black transition-colors bg-blue-50/20">
                 IN STOCK
              </th>
              <th className="px-6 w-24 text-center group cursor-pointer hover:text-black transition-colors">
                 REMAINING
              </th>
              <th className="px-6 w-20 text-center text-gray-300">
                 MIN
              </th>
              <th className="px-6 w-24 text-center text-gray-300">
                 REQUESTED
              </th>
              <th className="px-6 w-32 text-right text-gray-300">
                 UNIT PRICE
              </th>
              <th className="px-6 w-32 text-right text-gray-300">
                 AVG PRICE
              </th>
              <th className="px-6 text-center w-24 pr-8">
                 AKSI
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-[#FDFDFD] bg-white transition-colors cursor-pointer group h-16"
                onClick={() => onEdit?.(item)}
              >
                <td className="pl-8 text-center text-[11px] font-bold text-gray-300">{index + 1}</td>
                
                <td className="px-6 text-[11px] font-black text-black font-mono bg-gray-50 px-2 py-1 rounded w-fit border border-gray-100">
                    {item.itemCode || '-'}
                </td>
                
                <td className="px-6">
                    <span className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-lg text-[9px] font-bold text-gray-500 uppercase tracking-wide">
                        {item.category}
                    </span>
                </td>
                
                <td className="px-6 text-[12px] font-black text-black uppercase tracking-tight">
                    {item.itemName}
                </td>
                
                <td className="px-6 text-center text-[11px] font-bold text-gray-500 uppercase">
                    {item.uom}
                </td>

                {/* IN STOCK Value */}
                <td className="px-6 text-center text-[12px] font-black text-blue-600 bg-blue-50/10">
                    {item.inStock || 0}
                </td>
                
                {/* REMAINING Stock Logic: Red if <= min */}
                <td className={`px-6 text-center text-[12px] font-black ${item.remainingStock <= item.minimumStock ? 'text-red-500 bg-red-50 rounded-lg py-1' : 'text-green-600 bg-green-50 rounded-lg py-1'}`}>
                    {item.remainingStock}
                </td>
                
                <td className="px-6 text-center text-[11px] font-medium text-gray-400">
                    {item.minimumStock}
                </td>
                
                {/* Requested Logic: Orange if > 0 */}
                <td className={`px-6 text-center text-[11px] font-bold ${item.requestedStock > 0 ? 'text-orange-500' : 'text-gray-300'}`}>
                    {item.requestedStock}
                </td>
                
                <td className="px-6 text-right text-[11px] font-black text-black">
                    {formatCurrency(item.lastPurchasePrice)}
                </td>
                
                <td className="px-6 text-right text-[11px] font-bold text-gray-500">
                    {formatCurrency(item.averagePrice)}
                </td>
                
                <td className="px-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            className="p-2 text-gray-300 hover:text-black bg-white hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100"
                            onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                            title="Edit"
                        >
                            <Pencil size={16} />
                        </button>
                        <button 
                            className="p-2 text-gray-300 hover:text-red-600 bg-white hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                            onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={12} className="p-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                        No Items Found
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-6 flex items-center justify-between border-t border-gray-100 bg-[#FAFAFA]">
         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            DISPLAYING <span className="text-black font-black mx-1">{data.length}</span> ITEMS
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