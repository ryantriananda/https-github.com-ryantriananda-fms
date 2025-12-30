
import React from 'react';
import { MasterApprovalRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, GitBranch, MapPin, Layers, User, Shield } from 'lucide-react';

interface Props {
  data: MasterApprovalRecord[];
  onEdit: (item: MasterApprovalRecord) => void;
  onDelete: (id: string) => void;
}

export const MasterApprovalTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-6 w-64 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Module</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-56 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Branch / Location</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Approval Tiers (Flow)</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Last Updated</th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px] text-gray-700">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                        <td className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-black border border-gray-100 shadow-sm">
                                    <GitBranch size={18} />
                                </div>
                                <span className="font-black text-black uppercase tracking-tight text-[13px]">{item.module}</span>
                            </div>
                        </td>
                        <td className="p-6">
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-gray-300" />
                                <span className="font-bold text-gray-600 uppercase">{item.branch}</span>
                            </div>
                        </td>
                        <td className="p-6">
                            <div className="flex items-center gap-2 flex-wrap">
                                {item.tiers.sort((a,b) => a.level - b.level).map((tier, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
                                            <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                                                {tier.level}
                                            </span>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1">
                                                    {tier.type === 'User' ? <User size={10} className="text-blue-400"/> : <Shield size={10} className="text-blue-400"/>}
                                                    <span className="text-[10px] font-black text-blue-700 uppercase">{tier.value}</span>
                                                </div>
                                                <span className="text-[8px] font-bold text-blue-400">{tier.sla} Days SLA</span>
                                            </div>
                                        </div>
                                        {idx < item.tiers.length - 1 && (
                                            <div className="h-0.5 w-4 bg-gray-200"></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </td>
                        <td className="p-6 text-center text-gray-400 font-mono text-[11px] font-bold">
                            {item.updatedAt}
                        </td>
                        <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <button 
                                    onClick={() => onEdit(item)}
                                    className="p-2 text-gray-300 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button 
                                    onClick={() => onDelete(item.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5} className="p-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                            <Layers size={48} className="text-gray-200 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">Belum ada workflow approval</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
