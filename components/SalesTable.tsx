
import React from 'react';
import { SalesRecord } from '../types';
import { ChevronsUpDown, Eye, List, Pencil, Trash2, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Props {
  data: SalesRecord[];
  onEdit?: (item: SalesRecord) => void;
  onView?: (item: SalesRecord) => void;
  onDelete?: (id: string) => void;
  onAction?: (item: SalesRecord, action: 'Approve' | 'Reject' | 'Revise') => void;
}

export const SalesTable: React.FC<Props> = ({ data, onEdit, onView, onDelete, onAction }) => {
  const renderWorkflowActions = (item: SalesRecord) => {
      const s = (item.statusApproval || 'Approved').toLowerCase();
      if (s.includes('pending') && onAction) {
          return (
              <div className="flex items-center justify-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); onAction(item, 'Approve'); }} className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md transition-all active:scale-95" title="Approve"><CheckCircle size={16} strokeWidth={2.5} /></button>
                  <button onClick={(e) => { e.stopPropagation(); onAction(item, 'Revise'); }} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition-all active:scale-95" title="Revise"><RotateCcw size={16} strokeWidth={2.5} /></button>
                  <button onClick={(e) => { e.stopPropagation(); onAction(item, 'Reject'); }} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-all active:scale-95" title="Reject"><XCircle size={16} strokeWidth={2.5} /></button>
              </div>
          );
      }
      return (
          <div className="text-center">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
                  WORKFLOW COMPLETED
              </span>
          </div>
      );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px] text-left border-collapse">
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
                  Harga Tertinggi
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
              <th className="p-4 w-56 text-center">Workflow Actions</th>
              <th className="p-4 w-32 text-center">
                 Action
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
                <td className="p-4 font-medium text-gray-900">{item.hargaTertinggi}</td>
                <td className="p-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800">
                        {item.status}
                    </span>
                </td>
                <td className="p-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full font-bold text-[10px] uppercase ${
                        (item.statusApproval || '').toLowerCase().includes('pending') ? 'bg-orange-500 text-white' :
                        (item.statusApproval || '').toLowerCase().includes('reject') ? 'bg-red-500 text-white' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                        {item.statusApproval || 'PENDING'}
                    </div>
                </td>
                <td className="p-4 text-center">
                    {renderWorkflowActions(item)}
                </td>
                <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="text-black hover:text-gray-700 transition-colors"><Eye size={18} /></button>
                        <button onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} className="text-black hover:text-gray-700 transition-colors"><Pencil size={18} /></button>
                        <button onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }} className="text-black hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
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
      </div>
    </div>
  );
};
