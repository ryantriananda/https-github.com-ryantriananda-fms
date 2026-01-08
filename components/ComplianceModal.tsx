import React, { useState, useEffect, useRef } from 'react';
/* Added missing ChevronDown import */
import { X, Save, FileText, Building, Calendar, AlertCircle, UploadCloud, Trash2, ShieldCheck, Clock, CheckCircle2, Flag, ChevronDown } from 'lucide-react';
import { ReminderRecord, BuildingRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ReminderRecord>) => void;
  initialData?: ReminderRecord | null;
  mode?: 'create' | 'edit' | 'view';
  buildingList?: BuildingRecord[];
}

export const ComplianceModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    buildingList = []
}) => {
  const [form, setForm] = useState<Partial<ReminderRecord>>({
    documentName: '',
    buildingName: '',
    assetNo: '',
    expiryDate: new Date().toISOString().split('T')[0],
    status: 'Safe'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            documentName: '',
            buildingName: '',
            assetNo: '',
            expiryDate: new Date().toISOString().split('T')[0],
            status: 'Safe',
            daysRemaining: 365
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;
  const isView = mode === 'view';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => setPreview(ev.target?.result as string);
          reader.readAsDataURL(file);
      }
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 ml-1">
      {children} {required && <span className="text-red-500 font-black">*</span>}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        <div className="px-10 py-8 bg-white flex items-center justify-between shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'REGISTER DOKUMEN LEGAL' : 'DETAIL DOKUMEN LEGAL'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Building Compliance Registry</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto custom-scrollbar flex-1 bg-[#FBFBFB]">
            <div className="space-y-8">
                
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-black rounded-full"></div>
                        <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Identitas Dokumen</h3>
                    </div>

                    <div>
                        <Label required>Nama Dokumen / Izin</Label>
                        <input 
                            type="text" 
                            disabled={isView}
                            className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner uppercase"
                            placeholder="Contoh: SHGB, IMB, IZIN DOMISILI..."
                            value={form.documentName}
                            onChange={(e) => setForm({...form, documentName: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label required>Lokasi Gedung</Label>
                            <div className="relative">
                                <select 
                                    disabled={isView}
                                    className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner appearance-none cursor-pointer uppercase"
                                    value={form.buildingName}
                                    onChange={(e) => setForm({...form, buildingName: e.target.value})}
                                >
                                    <option value="">-- PILIH GEDUNG --</option>
                                    {buildingList.map(b => (
                                        <option key={b.id} value={b.name}>{b.name}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <Label required>Asset Number</Label>
                            <input type="text" disabled className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-gray-400 shadow-inner" value={form.assetNo} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label required>Tanggal Kadaluarsa</Label>
                            <input type="date" disabled={isView} className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner" value={form.expiryDate} onChange={(e) => setForm({...form, expiryDate: e.target.value})} />
                        </div>
                        <div className="flex flex-col justify-end">
                            <div className={`px-6 py-5 rounded-2xl text-[12px] font-black uppercase flex items-center justify-center gap-2 border ${
                                form.status === 'Safe' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100 animate-pulse'
                            }`}>
                                <Flag size={16} /> {form.status} ({form.daysRemaining} HARI)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-6 bg-black rounded-full"></div>
                        <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Attachment Scan (PDF/IMG)</h3>
                    </div>
                    
                    <div 
                        onClick={() => !isView && fileInputRef.current?.click()}
                        className={`h-48 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center bg-[#F8F9FA] transition-all overflow-hidden
                            ${!isView ? 'cursor-pointer hover:border-black hover:bg-white' : ''}
                        `}
                    >
                        <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,image/*" onChange={handleFileChange} />
                        {preview ? (
                            <div className="flex flex-col items-center">
                                <FileText size={40} className="text-black mb-2" />
                                <span className="text-[10px] font-black uppercase">DOKUMEN TERUNGGAH</span>
                            </div>
                        ) : (
                            <div className="text-center">
                                <UploadCloud size={32} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PILIH FILE DOKUMEN</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">BATAL</button>
          {!isView && (
            <button onClick={() => onSave(form)} className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-800 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3">
                <Save size={18} strokeWidth={2.5} /> SIMPAN DOKUMEN
            </button>
          )}
        </div>
      </div>
    </div>
  );
};