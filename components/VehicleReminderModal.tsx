
import React, { useState, useEffect } from 'react';
import { X, Save, Bell, Truck, Calendar, MapPin, FileText } from 'lucide-react';
import { VehicleReminderRecord, VehicleRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<VehicleReminderRecord>) => void;
  initialData?: VehicleReminderRecord | null;
  mode?: 'create' | 'edit';
  vehicleList: VehicleRecord[];
}

export const VehicleReminderModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create', vehicleList }) => {
  const [form, setForm] = useState<Partial<VehicleReminderRecord>>({
    type: 'STNK 1 Tahunan',
    status: 'Safe',
    expiryDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            noPolisi: '',
            vehicleName: '',
            type: 'STNK 1 Tahunan',
            status: 'Safe',
            expiryDate: new Date().toISOString().split('T')[0],
            branch: ''
        });
      }
    }
  }, [isOpen, initialData]);

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const vehicle = vehicleList.find(v => v.noPolisi === e.target.value);
      if (vehicle) {
          setForm(prev => ({
              ...prev,
              noPolisi: vehicle.noPolisi,
              vehicleName: vehicle.nama,
              branch: vehicle.cabang
          }));
      }
  };

  // Auto status update
  useEffect(() => {
      if (form.expiryDate) {
          const today = new Date();
          const expiry = new Date(form.expiryDate);
          const diffTime = expiry.getTime() - today.getTime();
          const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          let status: VehicleReminderRecord['status'] = 'Safe';
          if (days < 0) status = 'Expired';
          else if (days <= 14) status = 'Critical';
          else if (days <= 30) status = 'Warning';
          
          setForm(prev => ({ ...prev, status }));
      }
  }, [form.expiryDate]);

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
                    {mode === 'create' ? 'Set Reminder' : 'Edit Reminder'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Vehicle Documents</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar space-y-6">
            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Select Vehicle</label>
                <div className="relative">
                    <select 
                        disabled={mode === 'edit'}
                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none shadow-sm appearance-none cursor-pointer"
                        value={form.noPolisi || ''}
                        onChange={handleVehicleChange}
                    >
                        <option value="">-- Choose Vehicle --</option>
                        {vehicleList.map(v => (
                            <option key={v.id} value={v.noPolisi}>{v.noPolisi} - {v.nama}</option>
                        ))}
                    </select>
                    <Truck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Document Type</label>
                <div className="relative">
                    <select 
                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none shadow-sm appearance-none cursor-pointer"
                        value={form.type}
                        onChange={(e) => setForm({...form, type: e.target.value as any})}
                    >
                        <option value="STNK 1 Tahunan">STNK 1 Tahunan</option>
                        <option value="STNK 5 Tahunan">STNK 5 Tahunan</option>
                        <option value="KIR">KIR</option>
                        <option value="Izin Bongkar Muat">Izin Bongkar Muat</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                    <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Expiry Date</label>
                    <div className="relative">
                        <input type="date" className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-10 text-[13px] font-black text-black outline-none shadow-sm" value={form.expiryDate} onChange={(e) => setForm({...form, expiryDate: e.target.value})} />
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Branch</label>
                    <div className="relative">
                        <input type="text" disabled className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 pl-10 text-[13px] font-black text-gray-500" value={form.branch || ''} placeholder="Auto-filled" />
                        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">Cancel</button>
          <button 
              onClick={() => onSave(form)} 
              disabled={!form.noPolisi}
              className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              <Save size={18} strokeWidth={2.5} /> Save Reminder
          </button>
        </div>
      </div>
    </div>
  );
};
