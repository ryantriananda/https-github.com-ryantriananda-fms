
import React from 'react';
import { TaxKirRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Props {
  data: TaxKirRecord[];
  onEdit?: (item: TaxKirRecord) => void;
  onView?: (item: TaxKirRecord) => void;
  onDelete?: (id: string) => void;
  onAction?: (item: TaxKirRecord, action: 'Approve' | 'Reject' | 'Revise') => void;
}

export const TaxKirTable: React.FC<Props> = ({ data, onEdit, onView, onDelete, onAction }) => {
  
  const renderWorkflowActions = (item: TaxKirRecord) => {
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
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic">
                  COMPLETED
              </span>
          </div>
      );
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <th className="p-6 pl-8 w-32">NO REQUEST</th>
              <th className="p-6 w-32">NO POLISI</th>
              <th className="p-6 w-40">TGL REQUEST</th>
              <th className="p-6 w-32">JENIS</th>
              <th className="p-6 w-48">CHANNEL & CABANG</th>
              <th className="p-6 w-32 text-center">STATUS</th>
              <th className="p-6 w-32 text-center">APPROVAL</th>
              <th className="p-6 w-48 text-center">WORKFLOW</th>
              <th className="p-6 w-32 text-center pr-8">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px]">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all cursor-pointer group" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8 font-mono font-bold text-black">{item.id}</td>
                <td className="p-6 font-black text-black uppercase">{item.noPolisi}</td>
                <td className="p-6 text-gray-500 font-medium font-mono">{item.tglRequest}</td>
                <td className="p-6">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                        item.jenis === 'Pajak STNK' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'
                    }`}>
                        {item.jenis}
                    </span>
                </td>
                <td className="p-6">
                    <div className="flex flex-col">
                        <span className="font-bold text-black uppercase">{item.cabang}</span>
                        <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{item.channel}</span>
                    </div>
                </td>
                <td className="p-6 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-gray-50 text-gray-600 border border-gray-200">
                    {item.status}
                  </span>
                </td>
                <td className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-black text-[9px] uppercase border ${
                      (item.statusApproval || '').toLowerCase().includes('pending') ? 'bg-orange-50 text-orange-600 border-orange-200' :
                      (item.statusApproval || '').toLowerCase().includes('reject') ? 'bg-red-50 text-red-600 border-red-200' :
                      'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20'
                  }`}>
                    {item.statusApproval}
                  </div>
                </td>
                <td className="p-6 text-center">
                  {renderWorkflowActions(item)}
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all bg-white hover:bg-gray-50 rounded-xl"><Eye size={16} /></button>
                        <button onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} className="p-2 text-gray-300 hover:text-blue-600 transition-all bg-white hover:bg-blue-50 rounded-xl"><Pencil size={16} /></button>
                        <button onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }} className="p-2 text-gray-300 hover:text-red-500 transition-all bg-white hover:bg-red-50 rounded-xl"><Trash2 size={16} /></button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={9} className="p-24 text-center">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 opacity-50">Tidak ada data request</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
