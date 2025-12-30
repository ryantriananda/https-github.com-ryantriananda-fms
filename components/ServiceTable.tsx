import React from 'react';
import { ServiceRecord } from '../types';
import { ChevronsUpDown, Eye, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Pencil } from 'lucide-react';

interface Props {
  data: ServiceRecord[];
  onEdit?: (item: ServiceRecord) => void;
  onView?: (item: ServiceRecord) => void;
}

export const ServiceTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  No Request
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  No Polisi
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Tgl Request
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
                  Cabang
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Status
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Status Approval
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-24 text-center">
                 {/* Action Column */}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="p-4 font-medium text-gray-900">{item.id}</td>
                <td className="p-4 font-medium text-gray-900">{item.noPolisi}</td>
                <td className="p-4 text-gray-600">{item.tglRequest}</td>
                <td className="p-4 text-gray-600">{item.channel}</td>
                <td className="p-4 text-gray-600">{item.cabang}</td>
                <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                        {item.status}
                    </span>
                </td>
                <td className="p-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 font-bold text-xs">
                        {item.statusApproval}
                    </div>
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
                Showing 1 - {data.length} of <span className="text-green-500 font-semibold">{data.length}</span> Row(s)
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
