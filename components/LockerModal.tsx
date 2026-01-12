
import React, { useState, useEffect } from 'react';
import { X, Save, Lock, User, Key, MapPin, Briefcase, Building, Info, Unlock, AlertCircle } from 'lucide-react';
import { LockerRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<LockerRecord>) => void;
  initialData?: LockerRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

export const LockerModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [form, setForm] = useState<Partial<LockerRecord>>({
    lockerNumber: '',
    status: 'Kosong',
    spareKeyStatus: 'Ada',
    floor: '',
    area: '',
    assignedTo: '',
    occupantRole: '',
    occupantJobTitle: '',
    department: '',
    lastAuditDate: new Date().toISOString().split('T')[0],
    remarks: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            lockerNumber: '',
            status: 'Kosong',
            spareKeyStatus: 'Ada',
            floor: '',
            area: '',
            assignedTo: '',
            occupantRole: '',
            occupantJobTitle: '',
            department: '',
            lastAuditDate: new Date().toISOString().split('T')[0],
            remarks: ''
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
      {children}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon size={16} className="text-black" />
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const InputField = ({ label, value, onChange, placeholder, icon: Icon, disabled }: any) => (
    <div className="mb-4">
        <Label>{label}</Label>
        <div className="relative">
            <input 
                type="text"
                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner"
                placeholder={placeholder}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled || isView}
            />
            {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
        </div>
    </div>
  );

  const handleStatusChange = (status: 'Terisi' | 'Kosong' | 'Kunci Hilang') => {
      if (isView) return;
      setForm(prev => ({ 
          ...prev, 
          status
      }));
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                  <Lock size={20} strokeWidth={2.5} />
              </div>
              <div>
                  <h2 className="text-[16px] font-black text-black uppercase tracking-[0.2em] leading-none">
                    {mode === 'create' ? 'TAMBAH DATA LOKER' : 'EDIT DATA LOKER'}
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">MANAJEMEN INVENTORI LOKER</p>
              </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Left Column: INFORMASI DASAR */}
                <div className="p-2">
                    <SectionHeader icon={Info} title="INFORMASI DASAR" />
                    
                    <div className="space-y-6">
                        <InputField 
                            label="LOCKER NO" 
                            value={form.lockerNumber} 
                            onChange={(val: string) => setForm({...form, lockerNumber: val})}
                            placeholder="001"
                            icon={Lock}
                        />
                        
                        <InputField 
                            label="FLOOR / LOCATION" 
                            value={form.floor} // Assuming floor holds the location string like "Lantai 1"
                            onChange={(val: string) => setForm({...form, floor: val})}
                            placeholder="LANTAI 1"
                            icon={MapPin}
                        />

                        <div>
                            <Label>SPARE KEY</Label>
                            <div className="flex gap-4 mt-2">
                                <button
                                    onClick={() => setForm({...form, spareKeyStatus: 'Ada'})}
                                    disabled={isView}
                                    className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                                        form.spareKeyStatus === 'Ada' 
                                        ? 'bg-black text-white shadow-lg' 
                                        : 'bg-white text-gray-400 border border-gray-200 hover:border-black hover:text-black'
                                    }`}
                                >
                                    <Key size={14} /> ADA
                                </button>
                                <button
                                    onClick={() => setForm({...form, spareKeyStatus: 'Tidak Ada'})}
                                    disabled={isView}
                                    className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                                        form.spareKeyStatus === 'Tidak Ada' 
                                        ? 'bg-black text-white shadow-lg' 
                                        : 'bg-white text-gray-400 border border-gray-200 hover:border-black hover:text-black'
                                    }`}
                                >
                                    <X size={14} /> TIDAK ADA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: OCCUPANT DETAILS */}
                <div className="p-2 border-l border-dashed border-gray-100 pl-12">
                    <SectionHeader icon={User} title="OCCUPANT DETAILS" />
                    
                    <div className="space-y-6">
                        <InputField 
                            label="NAMA PENGHUNI" 
                            value={form.assignedTo} 
                            onChange={(val: string) => setForm({...form, assignedTo: val})}
                            placeholder="AAN JUNAIDI"
                            icon={User}
                        />
                        
                        <InputField 
                            label="ROLE / POSITION" 
                            value={form.occupantRole} 
                            onChange={(val: string) => setForm({...form, occupantRole: val})}
                            placeholder="TECHNICIAN"
                            icon={Briefcase}
                        />

                        <div className="grid grid-cols-2 gap-6">
                            <div className="mb-4">
                                <Label>JABATAN</Label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner"
                                        placeholder="TEAM LEADER"
                                        value={form.occupantJobTitle || ''}
                                        onChange={(e) => setForm({...form, occupantJobTitle: e.target.value})}
                                        disabled={isView}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <Label>DEPARTMENT</Label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner"
                                        placeholder="AFTER SALES"
                                        value={form.department || ''}
                                        onChange={(e) => setForm({...form, department: e.target.value})}
                                        disabled={isView}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATUS LOKER Section */}
            <div className="mt-12 pt-8 border-t border-gray-100">
                <SectionHeader icon={Lock} title="STATUS LOKER" />
                
                <div className="grid grid-cols-3 gap-6">
                    <button
                        onClick={() => handleStatusChange('Terisi')}
                        disabled={isView}
                        className={`h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all duration-300 border-2 ${
                            form.status === 'Terisi' 
                            ? 'bg-black text-white border-black shadow-xl scale-[1.02]' 
                            : 'bg-white text-gray-300 border-gray-100 hover:border-gray-200 hover:text-gray-400'
                        }`}
                    >
                        <Lock size={24} strokeWidth={2.5} />
                        <span className="text-[11px] font-black uppercase tracking-widest">TERISI</span>
                    </button>

                    <button
                        onClick={() => handleStatusChange('Kosong')}
                        disabled={isView}
                        className={`h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all duration-300 border-2 ${
                            form.status === 'Kosong' 
                            ? 'bg-[#10B981] text-white border-[#10B981] shadow-xl shadow-green-500/30 scale-[1.02]' 
                            : 'bg-white text-gray-300 border-gray-100 hover:border-gray-200 hover:text-gray-400'
                        }`}
                    >
                        <Unlock size={24} strokeWidth={2.5} />
                        <span className="text-[11px] font-black uppercase tracking-widest">KOSONG</span>
                    </button>

                    <button
                        onClick={() => handleStatusChange('Kunci Hilang')}
                        disabled={isView}
                        className={`h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all duration-300 border-2 ${
                            form.status === 'Kunci Hilang' 
                            ? 'bg-red-500 text-white border-red-500 shadow-xl shadow-red-500/30 scale-[1.02]' 
                            : 'bg-white text-gray-300 border-gray-100 hover:border-gray-200 hover:text-gray-400'
                        }`}
                    >
                        <AlertCircle size={24} strokeWidth={2.5} />
                        <span className="text-[11px] font-black uppercase tracking-widest">KUNCI HILANG</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button 
            onClick={onClose} 
            className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all"
          >
            BATAL
          </button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> SIMPAN DATA LOKER
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
