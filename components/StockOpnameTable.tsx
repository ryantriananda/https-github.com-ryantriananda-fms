
import React from 'react';
import { StockOpnameRecord } from '../types';
import { ChevronsUpDown, Eye, Calendar, User, Package, Hash, AlertTriangle, CheckCircle2, Clock, XCircle, FileCheck } from 'lucide-react';

interface Props {
  data: StockOpnameRecord[];
  onView?: (item: StockOpnameRecord) => void;
  onEdit?: (item: StockOpnameRecord) => void;
}

export const StockOpnameTable: React.FC<Props> = ({ data, onView, onEdit }) => {
  
  const getStatusBadge = (status: string) => {
      if (status === 'MATCHED') {
          return (
              <span className="inline-flex items-center gap-1.5 bg-[#E8FDF5] text-[#059669] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#10B981]/20">
                  <CheckCircle2 size={10} strokeWidth={3} /> MATCHED
              </span>
          );
      }
      return (
          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-200">
              <AlertTriangle size={10} strokeWidth={3} /> DISCREPANCY
          </span>
      );
  };

  const getApprovalBadge = (status?: string) => {
      const s = (status || 'Pending').toLowerCase();
      if (s === 'approved') return <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 text-[9px] font-black uppercase tracking-wider">APPROVED</span>;
      if (s === 'rejected') return <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 text-[9px] font-black uppercase tracking-wider">REJECTED</span>;
      return <span className="text-orange-500 bg-orange-50 px-2 py-0.5 rounded border border-orange-100 text-[9px] font-black uppercase tracking-wider">PENDING</span>;
  };

  const getDiffStyle = (diff: number) => {
      if (diff === 0) return 'text-green-600';
      if (diff > 0) return 'text-blue-600'; // Surplus
      return 'text-red-600'; // Deficit
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1500px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-32 text-[10px] font-black text-gray-400 uppercase tracking-widest">OPNAME ID</th>
              <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">DATE PERFORMED</th>
              <th className="p-6 w-56 text-[10px] font-black text-gray-400 uppercase tracking-widest">ITEM DETAILS</th>
              <th className="p-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">SYSTEM QTY</th>
              <th className="p-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">PHYSICAL QTY</th>
              <th className="p-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">DIFFERENCE</th>
              <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">PERFORMED BY</th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">MATCH STATUS</th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">APPROVAL</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8">
                    <span className="font-mono font-bold text-black text-[12px] bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        {item.opnameId}
                    </span>
                </td>
                <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-500 font-medium text-[11px]">
                        <Calendar size={12} />
                        {item.date}
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[12px] font-black text-black uppercase tracking-tight">{item.itemName}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-gray-400">{item.itemCode}</span>
                            <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded uppercase">{item.category}</span>
                        </div>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <span className="text-[14px] font-bold text-gray-400">{item.systemQty}</span>
                    <span className="text-[10px] font-bold text-gray-300 ml-1">{item.uom}</span>
                </td>
                <td className="p-6 text-center">
                    <span className="text-[14px] font-black text-black border-2 border-gray-100 px-3 py-1 rounded-lg">
                        {item.physicalQty}
                    </span>
                </td>
                <td className="p-6 text-center">
                    <span className={`text-[14px] font-black font-mono ${getDiffStyle(item.diff)}`}>
                        {item.diff > 0 ? `+${item.diff}` : item.diff}
                    </span>
                </td>
                <td className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-black text-gray-500">
                            <User size={12} />
                        </div>
                        <span className="text-[11px] font-bold text-gray-600 uppercase">{item.performedBy}</span>
                    </div>
                </td>
                <td className="p-6 text-center">
                    {getStatusBadge(item.status)}
                </td>
                <td className="p-6 text-center">
                    {getApprovalBadge(item.statusApproval)}
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         {item.statusApproval === 'Pending' ? (
                             <button 
                                onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} 
                                className="p-2 text-white bg-black hover:bg-gray-800 transition-all rounded-xl shadow-lg active:scale-95"
                                title="Approve/Reject"
                             >
                                <FileCheck size={16} />
                             </button>
                         ) : (
                             <button 
                                onClick={(e) => { e.stopPropagation(); onView?.(item); }} 
                                className="p-2 text-gray-300 hover:text-black transition-all bg-white hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-200"
                                title="View Details"
                             >
                                <Eye size={16} />
                             </button>
                         )}
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={10} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Hash size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">No Opname Records Found</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
          {data.length > 0 && (
              <tfoot>
                  <tr className="bg-[#FAFAFA]">
                      <td colSpan={10} className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-t border-gray-100">
                          Total {data.length} Opname Records Tracked
                      </td>
                  </tr>
              </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};
