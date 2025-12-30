
import React from 'react';
import { ContractRecord } from '../types';
import { ChevronsUpDown, Eye, FolderX, Pencil, Trash2 } from 'lucide-react';

interface Props {
  data: ContractRecord[];
  onEdit?: (item: ContractRecord) => void;
  onDelete?: (id: number) => void;
  onView?: (item: ContractRecord) => void;
}

export const ContractTable: React.FC<Props> = ({ data, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Asset Category
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Asset Number
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Address
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Type
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Location (Branch)
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Channel
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Sub - Location
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Status
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 text-center">
                 Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => onView?.(item)}
                      className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                        <td className="p-4 font-medium text-gray-900">{item.assetCategory}</td>
                        <td className="p-4 font-medium text-gray-900">{item.assetNumber}</td>
                        <td className="p-4 text-gray-600 truncate max-w-[200px]">{item.address}</td>
                        <td className="p-4 text-gray-600">{item.type}</td>
                        <td className="p-4 text-gray-600">{item.location}</td>
                        <td className="p-4 text-gray-600">{item.channel}</td>
                        <td className="p-4 text-gray-600">{item.subLocation}</td>
                        <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                {item.status}
                            </span>
                        </td>
                        <td className="p-4 text-center">
                             <div className="flex items-center justify-center gap-2">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <Eye size={18} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={9} className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center min-h-[400px]">
                             <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl mb-4 relative border border-gray-200">
                                <FolderX size={48} className="text-gray-500 z-10 relative" />
                                <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-gray-300 rounded-full opacity-50"></div>
                             </div>
                             <h3 className="text-lg font-bold text-gray-900">Tidak ada data...</h3>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      {data.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
                <div className="text-sm text-gray-900">
                    Showing 1 - {data.length} of <span className="text-green-500 font-semibold">{data.length}</span> Row(s)
                </div>
          </div>
      )}
    </div>
  );
};
