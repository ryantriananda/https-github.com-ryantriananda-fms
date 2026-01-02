
import React from 'react';
import { AssetRecord } from '../types';
import { ChevronsUpDown, Eye } from 'lucide-react';
import { Pagination, usePagination } from './Pagination';

interface Props {
  data: AssetRecord[];
  onView?: (item: AssetRecord) => void;
}

export const AssetTable: React.FC<Props> = ({ data, onView }) => {
  const pagination = usePagination(data, 10);

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
            {pagination.paginatedData.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="p-4 text-left font-medium text-gray-500 pl-6">{(pagination.currentPage - 1) * pagination.itemsPerPage + index + 1}</td>
                
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
      
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={pagination.onPageChange}
        onItemsPerPageChange={pagination.onItemsPerPageChange}
      />
    </div>
  );
};
