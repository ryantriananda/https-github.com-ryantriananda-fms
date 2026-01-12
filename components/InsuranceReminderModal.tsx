
import React, { useState, useEffect } from 'react';
import { X, Save, Bell, Calendar, Building, Car, AlertTriangle, FileText } from 'lucide-react';
import { ReminderRecord, VehicleRecord, BuildingRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ReminderRecord>) => void;
  initialData?: ReminderRecord | null;
  mode?: 'create' | 'edit';
  vehicleList: VehicleRecord[];
  buildingList: BuildingRecord[];
}

export const InsuranceReminderModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    vehicleList,
    buildingList
}) => {
  const [form, setForm] = useState<Partial<ReminderRecord>>({
    category: 'Insurance',
    status: 'Safe',
    expiryDate: new Date().toISOString().split('T')[0],
    source: 'Manual'
  });

  const [assetType, setAssetType] = useState<'Vehicle' | 'Building'>('Vehicle');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        // Try to guess asset type based on assetNo matching
        const isVehicle = vehicleList.some(v => v.noPolisi === initialData.assetNo);
        setAssetType(isVehicle ? 'Vehicle' : 'Building');
      } else {
        setForm({
            documentName: '',
            category: 'Insurance',
            status: 'Safe',
            expiryDate: new Date().toISOString().split('T')[0],
            source: 'Manual',
            daysRemaining: 365,
            buildingName: '', // used for location/branch
            assetNo: ''
        });
        setAssetType('Vehicle');
      }
    }
  }, [isOpen, initialData, vehicleList]);

  // Auto-calculate status
  useEffect(() => {
      if (form.expiryDate) {
          const today = new Date();
          const expiry = new Date(form.expiryDate);
          const diffTime = expiry.getTime() - today.getTime();
          const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          let status: ReminderRecord['status'] = 'Safe';
          if (days < 0) status = 'Expired';
          else if (days <= 30) status = 'Urgent';
          else if (days <= 90) status = 'Warning';
          
          setForm(prev => ({ ...prev, daysRemaining: days, status }));
      }
  }, [form.expiryDate]);

  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = e.target.value;
      if (assetType === 'Vehicle') {
          const v = vehicleList.find(x => x.id.toString() === id);
          if (v) {
              setForm(prev => ({
                  ...prev,
                  assetNo: v.noPolisi,
                  buildingName: v.cabang // Mapping branch to buildingName field for display consistency
              }));
          }
      } else {
          const b = buildingList.find(x => x.id === id);
          if (b) {
              setForm(prev => ({
                  ...prev,
                  assetNo: b.assetNo,
                  buildingName: b.name
              }));
          }
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
                <Bell size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Add Insurance Reminder' : 'Edit Reminder'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Expiry Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar space-y-6">
            
            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Reminder Title</label>
                <div className="relative">
                    <input 
                        type="text" 
                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none shadow-sm placeholder:text-gray-300"
                        placeholder="e.g. Perpanjangan Polis All Risk"
                        value={form.documentName}
                        onChange={(e) => setForm({...form, documentName: e.target.value})}
                    />
                    <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Type</label>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setAssetType('Vehicle')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${assetType === 'Vehicle' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}
                        >
                            Vehicle
                        </button>
                        <button 
                            onClick={() => setAssetType('Building')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${assetType === 'Building' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}
                        >
                            Building
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Select Asset</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-[#F8F9FA] border-none rounded-xl px-5 py-4 pl-12 text-[12px] font-bold text-black focus:ring-2 focus:ring-black/5 outline-none appearance-none cursor-pointer"
                            onChange={handleAssetChange}
                            value={
                                assetType === 'Vehicle' 
                                ? vehicleList.find(v => v.noPolisi === form.assetNo)?.id 
                                : buildingList.find(b => b.assetNo === form.assetNo)?.id
                            }
                        >
                            <option value="">-- Choose Asset --</option>
                            {assetType === 'Vehicle' 
                                ? vehicleList.map(v => <option key={v.id} value={v.id}>{v.noPolisi} - {v.nama}</option>)
                                : buildingList.map(b => <option key={b.id} value={b.id}>{b.name}</option>)
                            }
                        </select>
                        {assetType === 'Vehicle' 
                            ? <Car size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            : <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        }
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Asset No / Plat</label>
                        <input type="text" disabled className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-gray-500" value={form.assetNo || ''} placeholder="Auto" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Location / Branch</label>
                        <input type="text" disabled className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-gray-500" value={form.buildingName || ''} placeholder="Auto" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Expiry Date</label>
                    <div className="relative">
                        <input 
                            type="date" 
                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-10 text-[13px] font-black text-black focus:border-black outline-none shadow-sm"
                            value={form.expiryDate}
                            onChange={(e) => setForm({...form, expiryDate: e.target.value})}
                        />
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Prediction</label>
                    <div className={`w-full px-4 py-4 rounded-2xl text-[11px] font-black uppercase flex items-center justify-center gap-2 border ${
                        form.status === 'Expired' || form.status === 'Urgent' ? 'bg-red-50 text-red-600 border-red-100' :
                        form.status === 'Warning' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                        'bg-green-50 text-green-600 border-green-100'
                    }`}>
                        {form.status === 'Expired' || form.status === 'Urgent' ? <AlertTriangle size={14} /> : <Bell size={14} />}
                        {form.daysRemaining} Days
                    </div>
                </div>
            </div>

        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">Cancel</button>
          <button 
              onClick={() => onSave(form)} 
              disabled={!form.documentName || !form.assetNo}
              className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              <Save size={18} strokeWidth={2.5} /> Save Reminder
          </button>
        </div>
      </div>
    </div>
  );
};
