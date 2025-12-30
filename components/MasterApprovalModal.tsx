
import React, { useState, useEffect } from 'react';
import { X, Save, GitBranch, Plus, Trash2, ArrowRight, User, Shield } from 'lucide-react';
import { MasterApprovalRecord, ApprovalTier, GeneralMasterItem, UserRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MasterApprovalRecord>) => void;
  initialData?: MasterApprovalRecord | null;
  mode?: 'create' | 'edit' | 'view';
  branchList?: GeneralMasterItem[];
  roleList?: GeneralMasterItem[];
  userList?: UserRecord[];
}

export const MasterApprovalModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    branchList = [],
    roleList = [],
    userList = []
}) => {
  const [form, setForm] = useState<Partial<MasterApprovalRecord>>({
    module: '',
    branch: 'All Branches',
    tiers: []
  });

  const isView = mode === 'view';

  // Generalized System Modules
  const systemModules = [
      {
          category: 'Office Supplies (ATK/ARK)',
          items: [
              'Stationery Request (Permintaan ATK)',
              'Household Request (Permintaan ARK)'
          ]
      },
      {
          category: 'Vehicle Management',
          items: [
              'Vehicle Request (Pengajuan Baru)',
              'Vehicle Service Request (Servis)',
              'Vehicle Tax & KIR Renewal',
              'Vehicle Mutation (Mutasi)',
              'Vehicle Disposal (Penjualan)',
              'Vehicle Contract (Sewa)'
          ]
      },
      {
          category: 'Building & Facility',
          items: [
              'New Building Request (Sewa/Beli)',
              'Building Maintenance Request',
              'Building Asset Request (AC/Genset/etc)',
              'Branch Improvement Request',
              'Utility Payment Approval'
          ]
      },
      {
          category: 'General Assets',
          items: [
              'General Asset Request (Furniture/etc)',
              'IT Asset Request (Laptop/Devices)'
          ]
      },
      {
          category: 'Administrative',
          items: [
              'Vendor Registration Approval',
              'New User Registration'
          ]
      }
  ];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            module: '',
            branch: 'All Branches',
            tiers: [
                { level: 1, type: 'Role', value: 'Admin GA', sla: 1 }
            ],
            updatedAt: new Date().toISOString().split('T')[0]
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const addTier = () => {
      if (isView) return;
      const currentTiers = form.tiers || [];
      const newLevel = currentTiers.length + 1;
      setForm({ ...form, tiers: [...currentTiers, { level: newLevel, type: 'Role', value: '', sla: 2 }] });
  };

  const removeTier = (index: number) => {
      if (isView) return;
      const currentTiers = form.tiers || [];
      const updatedTiers = currentTiers.filter((_, i) => i !== index).map((tier, idx) => ({ ...tier, level: idx + 1 }));
      setForm({ ...form, tiers: updatedTiers });
  };

  const updateTier = (index: number, field: keyof ApprovalTier, value: any) => {
      if (isView) return;
      const currentTiers = [...(form.tiers || [])];
      
      if (field === 'type') {
          // Reset value when type changes
          currentTiers[index] = { ...currentTiers[index], [field]: value, value: '' };
      } else {
          currentTiers[index] = { ...currentTiers[index], [field]: value };
      }
      
      setForm({ ...form, tiers: currentTiers });
  };

  const handleSave = () => {
      onSave({ 
          ...form, 
          updatedAt: new Date().toISOString().split('T')[0] 
      });
      onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[150] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-[#FBFBFB] w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <GitBranch size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Buat Workflow Approval' : mode === 'edit' ? 'Edit Workflow Approval' : 'View Workflow Approval'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">General System Approval Configuration</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
            <div className="space-y-8">
                {/* Configuration Header */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h3 className="text-[12px] font-black text-black uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">General Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Target Module</label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:ring-2 focus:ring-black/5 outline-none appearance-none cursor-pointer disabled:text-gray-500"
                                    value={form.module}
                                    onChange={(e) => setForm({...form, module: e.target.value})}
                                    disabled={isView}
                                >
                                    <option value="">-- Select Module --</option>
                                    {systemModules.map((grp, idx) => (
                                        <optgroup key={idx} label={grp.category}>
                                            {grp.items.map(item => (
                                                <option key={item} value={item}>{item}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Branch Scope</label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:ring-2 focus:ring-black/5 outline-none appearance-none cursor-pointer disabled:text-gray-500"
                                    value={form.branch}
                                    onChange={(e) => setForm({...form, branch: e.target.value})}
                                    disabled={isView}
                                >
                                    <option value="All Branches">All Branches (Default)</option>
                                    {branchList.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Workflow Designer */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Approval Layers</h3>
                        {!isView && (
                            <button 
                                onClick={addTier}
                                className="bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
                            >
                                <Plus size={14} strokeWidth={3} /> Add Layer
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {form.tiers && form.tiers.length > 0 ? (
                            form.tiers.map((tier, index) => (
                                <div key={index} className="flex items-center gap-4 animate-in slide-in-from-left-4 duration-300">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-black text-[12px] shadow-sm shrink-0">
                                        {tier.level}
                                    </div>
                                    
                                    <div className="flex-1 bg-[#F8F9FA] p-4 rounded-2xl flex items-center gap-4 border border-transparent hover:border-gray-200 transition-all">
                                        
                                        {/* Type Selector */}
                                        <div className="w-32">
                                            <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Type</label>
                                            <div className="relative">
                                                <select 
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 pl-8 text-[11px] font-bold text-black focus:border-black outline-none disabled:text-gray-500 appearance-none cursor-pointer"
                                                    value={tier.type || 'Role'}
                                                    onChange={(e) => updateTier(index, 'type', e.target.value)}
                                                    disabled={isView}
                                                >
                                                    <option value="Role">Role</option>
                                                    <option value="User">User</option>
                                                </select>
                                                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                    {tier.type === 'User' ? <User size={12} /> : <Shield size={12} />}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dynamic Value Selector (Role or User) */}
                                        <div className="flex-1">
                                            <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">
                                                {tier.type === 'User' ? 'Select User' : 'Select Role'}
                                            </label>
                                            <select 
                                                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[11px] font-bold text-black focus:border-black outline-none disabled:text-gray-500 appearance-none cursor-pointer"
                                                value={tier.value || ''}
                                                onChange={(e) => updateTier(index, 'value', e.target.value)}
                                                disabled={isView}
                                            >
                                                <option value="">-- Select {tier.type} --</option>
                                                {tier.type === 'User' ? (
                                                    // Map Users
                                                    userList.length > 0 ? (
                                                        userList.map(u => <option key={u.id} value={u.name}>{u.name} ({u.role})</option>)
                                                    ) : (
                                                        <option value="Budi Santoso">Budi Santoso (Admin)</option>
                                                    )
                                                ) : (
                                                    // Map Roles
                                                    roleList.length > 0 ? (
                                                        roleList.map(r => <option key={r.id} value={r.name}>{r.name}</option>
                                                    ) : (
                                                        <>
                                                            <option value="Admin GA">Admin GA</option>
                                                            <option value="Branch Manager">Branch Manager</option>
                                                            <option value="Regional Head">Regional Head</option>
                                                            <option value="Head of GA">Head of GA</option>
                                                            <option value="Director">Director</option>
                                                            <option value="Finance Manager">Finance Manager</option>
                                                            <option value="HR Manager">HR Manager</option>
                                                        </>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        
                                        <div className="w-24">
                                            <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">SLA (Days)</label>
                                            <input 
                                                type="number"
                                                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[11px] font-black text-center text-black focus:border-black outline-none disabled:text-gray-500"
                                                value={tier.sla}
                                                onChange={(e) => updateTier(index, 'sla', parseInt(e.target.value) || 0)}
                                                min="1"
                                                disabled={isView}
                                            />
                                        </div>
                                    </div>

                                    {index < (form.tiers?.length || 0) - 1 ? (
                                        <ArrowRight size={16} className="text-gray-300" />
                                    ) : (
                                        !isView && (
                                            <button 
                                                onClick={() => removeTier(index)}
                                                className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shrink-0"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-8 border-2 border-dashed border-gray-100 rounded-2xl">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">No approval layers defined</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={handleSave} 
                disabled={!form.module || !form.tiers || form.tiers.length === 0}
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Save size={18} strokeWidth={2.5} /> Save Workflow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
