
import React from 'react';
import { AssetRecord } from '../types';
import { ChevronsUpDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Eye } from 'lucide-react';

interface Props {
  data: AssetRecord[];
  onView?: (item: AssetRecord) => void;
}

export const AssetTable: React.FC<Props> = ({ data, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 w-12 text-left pl-6">No</th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  No Transaksi
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-64 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Employee Name
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                    Kategori
                    <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-48 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                    Jenis Barang
                    <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-20 text-left">Jumlah</th>
              <th className="p-4 w-32 text-left">Tanggal</th>
              <th className="p-4 w-24 text-left">Sisa Stock</th>
              <th className="p-4 w-32 text-left">Kode Barang</th>
              <th className="p-4 w-28 text-left">Status</th>
              <th className="p-4 w-20 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="p-4 text-left font-medium text-gray-500 pl-6">{index + 1}</td>
                
                <td className="p-4 font-mono font-semibold text-gray-900">{item.transactionNumber}</td>

                {/* Employee Cell (Rich Content) */}
                <td className="p-4">
                  <div className="flex items-start gap-3">
                    <img 
                      src={item.employee.avatar} 
                      alt={item.employee.name} 
                      className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-gray-900 leading-tight">{item.employee.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 mb-0.5 font-mono">{item.employee.phone}</p>
                      <p className="text-xs text-gray-500 font-medium">{item.employee.role}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4 font-medium">{item.category}</td>
                
                <td className="p-4">
                    <p className="font-semibold text-gray-900">{item.itemName}</p>
                    <p className="text-xs text-gray-500">{item.itemDescription}</p>
                </td>
                
                <td className="p-4 text-left font-semibold">{item.qty}</td>
                <td className="p-4 text-left text-gray-500">{item.date}</td>
                <td className="p-4 text-left font-mono font-medium text-gray-900">{item.remainingStock}</td>
                <td className="p-4 text-left font-mono text-xs">{item.itemCode}</td>
                
                <td className="p-4 text-left">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${item.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          item.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                          item.status === 'Closed' ? 'bg-gray-200 text-gray-800' : 
                          'bg-gray-50 text-gray-600' // Draft
                        }`}>
                        {item.status}
                    </span>
                </td>

                <td className="p-4 text-center">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
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
      <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <div className="text-sm text-gray-900">
                Showing 1 - 10 of <span className="text-green-500 font-semibold">58</span> Row(s)
            </div>
            
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-sm text-gray-900">
                    Row per page
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:border-gray-400 text-gray-900 cursor-pointer">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>
                
                <div className="flex items-center gap-2">
                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                        <ChevronsLeft size={16} />
                     </button>
                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                        <ChevronLeft size={16} />
                     </button>
                     
                     <span className="text-sm text-gray-900 mx-3 font-medium">1 / 6</span>
                     
                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                        <ChevronRight size={16} />
                     </button>
                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                        <ChevronsRight size={16} />
                     </button>
                </div>
            </div>
      </div>
    </div>
  );
};
