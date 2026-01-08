import React, { useState, useEffect } from 'react';
import { X, Save, GitBranch, Plus, Trash2, ArrowRight, User, Shield, Layers, MapPin, Clock, ChevronDown, CheckCircle2, Info } from 'lucide-react';
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

  const systemModules = [
      {
          category: 'Consumables (ATK/ARK)',
          items: [
              'Stationery Request (Permintaan ATK)',
              'Household Request (Permintaan ARK)',
              'Stock Opname (Opname ATK/ARK)'
          ]
      },
      {
          category: 'Fleet Management',
          items: [
              'Vehicle Request',
              'Vehicle Service',
              'Vehicle Tax & KIR Renewal',
              'Vehicle Mutation',
              'Vehicle Disposal',
              'Vehicle Contract'
          ]
      },
      {
          category: 'Property & Facility',
          items: [
              'New Building Improvement',
              'Building Maintenance',
              'Building Asset Entry',
              'Utility Payment Approval',
              'Locker Request',
              'Pod Residency Request'
          ]
      },
      {
          category: 'General & Admin',
          items: [
              'IT Asset Request',
              'HC Asset Request',
              'Vendor Registration',
              'User Registration'
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
                { level: 1, type: 'Role', value: 'GA Administrator', sla: 1 }
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

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title, sub }: { icon: any, title: string, sub?: string }) => (
    <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 h-6 bg-black rounded-full shadow-sm"></div>
        <div>
            <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em] leading-none">{title}</h3>
            {sub && <p className="text-[9px] font-bold text-gray-400 uppercase mt-1.5 tracking-widest">{sub}</p>}
        </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-12 py-10 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20">
                <GitBranch size={28} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Config Approval Workflow' : mode === 'edit' ? 'Update Workflow Flow' : 'Workflow Definition'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Master Logic & Tiered Approval Registry</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-3 rounded-full hover:bg-gray-50">
            <X size={32} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-12 overflow-y-auto custom-scrollbar flex-1 bg-[#FBFBFB]">
            <div className="space-y-12">
                
                {/* 1. Module Info Card */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-black opacity-5"></div>
                    <SectionHeader icon={Layers} title="1. WORKFLOW TARGET" sub="Assign workflow to specific system components" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <Label required>System Module</Label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[13px] font-black text-black outline-none appearance-none cursor-pointer shadow-inner uppercase"
                                    value={form.module}
                                    onChange={(e) => setForm({...form, module: e.target.value})}
                                    disabled={isView}
                                >
                                    <option value="">-- PILIH MODUL SISTEM --</option>
                                    {systemModules.map((grp, idx) => (
                                        <optgroup key={idx} label={grp.category.toUpperCase()} className="font-bold text-gray-400">
                                            {grp.items.map(item => (
                                                <option key={item} value={item} className="text-black font-black">{item}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                                <Layers size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <Label required>Branch Coverage</Label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[13px] font-black text-black outline-none appearance-none cursor-pointer shadow-inner uppercase"
                                    value={form.branch}
                                    onChange={(e) => setForm({...form, branch: e.target.value})}
                                    disabled={isView}
                                >
                                    <option value="All Branches">ALL BRANCHES (GLOBAL)</option>
                                    {branchList.map(b => <option key={b.id} value={b.name}>{b.name.toUpperCase()}</option>)}
                                </select>
                                <MapPin size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Tier Visualizer Card */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <SectionHeader icon={GitBranch} title="2. APPROVAL TIER FLOW" sub="Sequence of necessary signatures" />
                        {!isView && (
                            <button 
                                onClick={addTier}
                                className="bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/20 active:scale-95"
                            >
                                <Plus size={16} strokeWidth={3} /> ADD NEW TIER
                            </button>
                        )}
                    </div>

                    <div className="relative pl-10 space-y-10">
                        {/* Timeline vertical connector */}
                        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

                        {form.tiers && form.tiers.length > 0 ? (
                            form.tiers.map((tier, index) => (
                                <div key={index} className="relative group animate-in slide-in-from-left-4 duration-300">
                                    {/* Level Indicator */}
                                    <div className="absolute -left-10 top-0 w-10 h-10 rounded-full bg-white border-4 border-[#FBFBFB] flex items-center justify-center shadow-xl z-10 group-hover:scale-110 transition-transform">
                                        <span className="text-[12px] font-black text-black">{tier.level}</span>
                                    </div>
                                    
                                    <div className="bg-[#F8F9FA] p-8 rounded-[2rem] border border-transparent hover:border-black/5 transition-all flex flex-col md:flex-row gap-8 items-start md:items-end">
                                        
                                        {/* Type Selector */}
                                        <div className="w-full md:w-44">
                                            <Label>TIER TYPE</Label>
                                            <div className="flex bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                                                {['Role', 'User'].map(t => (
                                                    <button
                                                        key={t}
                                                        onClick={() => updateTier(index, 'type', t)}
                                                        disabled={isView}
                                                        className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${
                                                            tier.type === t ? 'bg-black text-white' : 'text-gray-300 hover:text-gray-500'
                                                        }`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Dynamic Value Selector */}
                                        <div className="flex-1 w-full">
                                            <Label>{tier.type === 'User' ? 'SELECT SPECIFIC USER' : 'SELECT TARGET ROLE'}</Label>
                                            <div className="relative">
                                                <select 
                                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[12px] font-black text-black focus:border-black outline-none appearance-none cursor-pointer shadow-sm uppercase"
                                                    value={tier.value || ''}
                                                    onChange={(e) => updateTier(index, 'value', e.target.value)}
                                                    disabled={isView}
                                                >
                                                    <option value="">(PILIH {tier.type?.toUpperCase()})</option>
                                                    {tier.type === 'User' ? (
                                                        userList.map(u => <option key={u.id} value={u.name}>{u.name} [{u.role}]</option>)
                                                    ) : (
                                                        roleList.map(r => <option key={r.id} value={r.name}>{r.name}</option>)
                                                    )}
                                                    {!roleList.length && tier.type === 'Role' && (
                                                        <>
                                                            <option value="Admin GA">ADMIN GA</option>
                                                            <option value="Branch Manager">BRANCH MANAGER</option>
                                                            <option value="Department Head">DEPARTMENT HEAD</option>
                                                            <option value="Area Manager">AREA MANAGER</option>
                                                            <option value="Regional Manager">REGIONAL MANAGER</option>
                                                            <option value="Director">DIRECTOR</option>
                                                        </>
                                                    )}
                                                </select>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                                                    {tier.type === 'User' ? <User size={18} /> : <Shield size={18} />}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* SLA Field */}
                                        <div className="w-full md:w-32">
                                            <Label>SLA (DAYS)</Label>
                                            <div className="relative">
                                                <input 
                                                    type="number"
                                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-center text-black focus:border-black outline-none shadow-sm"
                                                    value={tier.sla}
                                                    onChange={(e) => updateTier(index, 'sla', parseInt(e.target.value) || 0)}
                                                    min="1"
                                                    disabled={isView}
                                                />
                                                <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                                            </div>
                                        </div>

                                        {/* Tier Actions */}
                                        {!isView && (
                                            <div className="pb-1.5 flex gap-2">
                                                <button 
                                                    onClick={() => removeTier(index)}
                                                    className="p-3.5 rounded-2xl bg-white text-gray-300 hover:text-red-500 border border-gray-100 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
                                                    title="Remove Tier"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/30">
                                <GitBranch size={40} className="text-gray-200 mb-4" />
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No tiers defined yet</p>
                                <button onClick={addTier} className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline underline-offset-4">Click to add first level</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Helper Info Box */}
                <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 flex gap-6 items-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-blue-100">
                        <Info size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-blue-700 uppercase leading-relaxed tracking-wider">
                            Urutan approval akan dijalankan secara berurutan sesuai level (Tier 1 -> Tier 2 -> ...). 
                            SLA yang ditentukan akan memicu notifikasi reminder kepada approver terkait jika melebihi batas waktu.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-12 py-10 bg-white border-t border-gray-100 flex justify-end gap-5 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
          <button 
            onClick={onClose} 
            className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all"
          >
            {isView ? 'CLOSE' : 'CANCEL'}
          </button>
          {!isView && (
            <button 
                onClick={handleSave} 
                disabled={!form.module || !form.tiers || form.tiers.length === 0}
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <Save size={18} strokeWidth={2.5} /> {initialData ? 'SAVE CHANGES' : 'CREATE WORKFLOW'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};