
import React, { useState, useEffect } from 'react';
import { X, Save, FileText, CheckCircle2 } from 'lucide-react';
import { RequestTypeRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<RequestTypeRecord>) => void;
  initialData?: RequestTypeRecord | null;
  mode?: 'create' | 'edit';
}

export const MasterRequestTypeModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create'
}) => {
  const [form, setForm] = useState<Partial<RequestTypeRecord>>({
    name: '',
    status: 'Active'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            name: '',
            status: 'Active'
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 ml-1">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <FileText size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'TAMBAH REQUEST TYPE' : 'EDIT REQUEST TYPE'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Master Data Configuration</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 bg-[#FBFBFB]">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                <div>
                    <Label required>NAMA REQUEST</Label>
                    <input 
                        type="text" 
                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm uppercase"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        placeholder="CONTOH: DAILY REQUEST"
                    />
                </div>
                
                <div>
                    <Label required>STATUS</Label>
                    <div className="flex gap-3">
                        {['Active', 'Inactive'].map(s => (
                            <button
                                key={s}
                                onClick={() => setForm({...form, status: s as any})}
                                className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                                    form.status === s 
                                    ? 'bg-black text-white border-black shadow-lg' 
                                    : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                {s === 'Active' && <CheckCircle2 size={14} />}
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">BATAL</button>
          <button 
              onClick={() => {
                  if(form.name) {
                      onSave(form);
                      onClose();
                  }
              }} 
              disabled={!form.name}
              className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              <Save size={18} strokeWidth={2.5} /> SIMPAN
          </button>
        </div>
      </div>
    </div>
  );
};
