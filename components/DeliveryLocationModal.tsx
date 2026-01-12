
import React, { useState, useEffect } from 'react';
import { X, Save, Truck } from 'lucide-react';
import { DeliveryLocationRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<DeliveryLocationRecord>) => void;
  initialData?: DeliveryLocationRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

export const DeliveryLocationModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [form, setForm] = useState<Partial<DeliveryLocationRecord>>({
    name: '',
    type: 'Internal',
    status: 'Active'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({ name: '', type: 'Internal', status: 'Active' });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleSave = () => {
    if (form.name?.trim()) {
      onSave(form);
      onClose();
    }
  };

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
      {children}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white/50 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between shrink-0 absolute top-0 w-full z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Truck size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[14px] font-black text-black uppercase tracking-[0.2em] leading-none">
              {mode === 'create' ? 'ADD DELIVERY' : 'EDIT DELIVERY'}
            </h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-300 hover:text-black hover:bg-gray-50 transition-all shadow-sm">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 pt-32 pb-8 overflow-y-auto custom-scrollbar flex-1 bg-white m-2 rounded-[2rem] shadow-sm border border-gray-50/50">
            <div className="space-y-8">
                
                {/* Method Name */}
                <div>
                    <Label>METHOD NAME</Label>
                    <input 
                        type="text" 
                        disabled={isView}
                        className="w-full bg-[#FAFAFA] border border-gray-100 rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none focus:border-black/20 focus:bg-white transition-all placeholder:text-gray-300 shadow-sm"
                        placeholder="e.g. PICKUP HO"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                </div>

                {/* Delivery Type */}
                <div>
                    <Label>DELIVERY TYPE</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {['Internal', 'External'].map((type) => (
                            <button
                                key={type}
                                onClick={() => !isView && setForm({...form, type: type as any})}
                                className={`py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                    form.type === type 
                                    ? 'bg-black text-white shadow-lg shadow-black/20 scale-[1.02]' 
                                    : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-200'
                                }`}
                            >
                                {type === 'Internal' ? <Building2Icon size={14} /> : <GlobeIcon size={14} />}
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div>
                    <Label>STATUS</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => !isView && setForm({...form, status: 'Active'})}
                            className={`py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                form.status === 'Active' 
                                ? 'bg-[#E8FDF5] text-[#059669] border border-[#10B981]/20 shadow-md shadow-green-500/10' 
                                : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-200'
                            }`}
                        >
                            <CheckCircleIcon size={14} strokeWidth={3} /> ACTIVE
                        </button>
                        <button
                            onClick={() => !isView && setForm({...form, status: 'Inactive'})}
                            className={`py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                form.status === 'Inactive' 
                                ? 'bg-gray-100 text-gray-500 border border-gray-200 shadow-inner' 
                                : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-200'
                            }`}
                        >
                            <AlertCircleIcon size={14} strokeWidth={3} /> INACTIVE
                        </button>
                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-50 flex justify-center gap-4 shrink-0">
          <button onClick={onClose} className="w-32 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-gray-500 transition-all">
            BATAL
          </button>
          {!isView && (
            <button 
                onClick={handleSave} 
                disabled={!form.name}
                className="flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Save size={16} strokeWidth={2.5} /> SIMPAN DELIVERY
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple icon components for internal use
const Building2Icon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
    </svg>
);

const GlobeIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
);

const CheckCircleIcon = ({ size, strokeWidth, className }: { size: number, strokeWidth?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
    </svg>
);

const AlertCircleIcon = ({ size, strokeWidth, className }: { size: number, strokeWidth?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
);
