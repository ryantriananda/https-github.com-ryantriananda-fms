
import React from 'react';
import { MasterVendorRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: MasterVendorRecord[];
  onEdit?: (item: MasterVendorRecord) => void;
  onView?: (item: MasterVendorRecord) => void;
}

export const MasterVendorTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Nama
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Merek
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-96 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Alamat
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  No Telp
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Tipe
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Cabang
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-24 text-center">
                 Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{item.nama}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${item.aktif ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                            {item.aktif ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </td>
                <td className="p-4 text-gray-600">{item.merek || '-'}</td>
                <td className="p-4 text-gray-600 truncate max-w-[300px]">{item.alamat}</td>
                <td className="p-4 text-gray-600">{item.noTelp}</td>
                <td className="p-4 text-gray-600">{item.tipe}</td>
                <td className="p-4 text-gray-600">{item.cabang}</td>
                <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                         <button 
                          onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                            <Eye size={18} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                            <Pencil size={18} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <div className="text-sm text-gray-900">
                Showing 1 - {data.length} of <span className="text-green-500 font-semibold">{data.length}</span> items
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
                     
                     <span className="text-sm text-gray-900 mx-3 font-medium">1 / 1</span>
                     
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
