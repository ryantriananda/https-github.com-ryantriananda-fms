
import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Wrench, Building, Activity, Clock } from 'lucide-react';
import { MaintenanceScheduleRecord, BuildingAssetRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MaintenanceScheduleRecord>) => void;
  initialData?: MaintenanceScheduleRecord | null;
  mode?: 'create' | 'edit';
  assetList: BuildingAssetRecord[];
}

export const MaintenanceScheduleModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create', assetList }) => {
  const [form, setForm] = useState<Partial<MaintenanceScheduleRecord>>({
    frequency: 'Monthly',
    status: 'Safe',
    lastMaintenanceDate: new Date().toISOString().split('T')[0],
    nextMaintenanceDate: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            assetId: '',
            frequency: 'Monthly',
            status: 'Safe',
            lastMaintenanceDate: new Date().toISOString().split('T')[0],
            nextMaintenanceDate: '',
            vendor: ''
        });
      }
    }
  }, [isOpen, initialData]);

  // Auto-calculate next date based on frequency
  useEffect(() => {
      if (form.lastMaintenanceDate && form.frequency) {
          const lastDate = new Date(form.lastMaintenanceDate);
          let nextDate = new Date(lastDate);
          
          switch(form.frequency) {
              case 'Monthly': nextDate.setMonth(nextDate.getMonth() + 1); break;
              case 'Quarterly': nextDate.setMonth(nextDate.getMonth() + 3); break;
              case 'Yearly': nextDate.setFullYear(nextDate.getFullYear() + 1); break;
          }
          setForm(prev => ({ ...prev, nextMaintenanceDate: nextDate.toISOString().split('T')[0] }));
      }
  }, [form.lastMaintenanceDate, form.frequency]);

  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const asset = assetList.find(a => a.id === e.target.value);
      if (asset) {
          setForm(prev => ({
              ...prev,
              assetId: asset.id,
              assetName: asset.assetName,
              assetCode: asset.assetCode,
              location: asset.buildingName,
              category: asset.assetType
          }));
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Calendar size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Set Schedule' : 'Edit Schedule'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Maintenance Planner</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar space-y-6">
            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Select Asset</label>
                <div className="relative">
                    <select 
                        disabled={mode === 'edit'}
                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none shadow-sm appearance-none cursor-pointer"
                        value={form.assetId || ''}
                        onChange={handleAssetChange}
                    >
                        <option value="">-- Choose Asset --</option>
                        {assetList.map(a => (
                            <option key={a.id} value={a.id}>{a.assetName} - {a.assetCode}</option>
                        ))}
                    </select>
                    <Wrench size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Location</label>
                    <div className="relative">
                        <input type="text" disabled className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-gray-500" value={form.location || ''} placeholder="Auto-filled" />
                        <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                    <div className="relative">
                        <input type="text" disabled className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-gray-500" value={form.category || ''} placeholder="Auto-filled" />
                        <Activity size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Maintenance Frequency</label>
                <div className="grid grid-cols-3 gap-3">
                    {['Monthly', 'Quarterly', 'Yearly'].map(freq => (
                        <button
                            key={freq}
                            onClick={() => setForm({...form, frequency: freq as any})}
                            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                form.frequency === freq ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            {freq}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Last Service</label>
                    <input type="date" className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black outline-none shadow-sm" value={form.lastMaintenanceDate} onChange={(e) => setForm({...form, lastMaintenanceDate: e.target.value})} />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Next Due Date</label>
                    <input type="date" className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black outline-none shadow-sm" value={form.nextMaintenanceDate} onChange={(e) => setForm({...form, nextMaintenanceDate: e.target.value})} />
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Assigned Vendor (Optional)</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-bold text-black outline-none shadow-sm placeholder:text-gray-300" value={form.vendor || ''} onChange={(e) => setForm({...form, vendor: e.target.value})} placeholder="Vendor Name" />
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">Cancel</button>
          <button 
              onClick={() => onSave(form)} 
              disabled={!form.assetId}
              className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              <Save size={18} strokeWidth={2.5} /> Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
