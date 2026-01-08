import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Zap, Droplets, Wifi, UploadCloud, Trash2, Calendar, FileText, DollarSign, Building, CheckCircle2, ChevronDown, Activity, Info } from 'lucide-react';
import { UtilityRecord, BuildingRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<UtilityRecord>) => void;
  initialData?: UtilityRecord | null;
  mode?: 'create' | 'edit' | 'view';
  buildingList?: BuildingRecord[];
}

export const UtilityModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    buildingList = []
}) => {
  const [form, setForm] = useState<Partial<UtilityRecord>>({
    period: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Listrik (PLN)',
    status: 'Pending Review',
    meterStart: 0,
    meterEnd: 0,
    usage: 0,
    cost: '',
    unit: 'kWh'
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        setImagePreview(initialData.attachmentUrl || null);
      } else {
        const today = new Date();
        const currentMonth = today.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
        setForm({
            period: currentMonth,
            date: today.toISOString().split('T')[0],
            type: 'Listrik (PLN)',
            status: 'Pending Review',
            meterStart: 0,
            meterEnd: 0,
            usage: 0,
            cost: '',
            unit: 'kWh',
            location: ''
        });
        setImagePreview(null);
      }
    }
  }, [isOpen, initialData]);

  useEffect(() => {
      const start = Number(form.meterStart) || 0;
      const end = Number(form.meterEnd) || 0;
      if (end >= start) {
          setForm(prev => ({ ...prev, usage: end - start }));
      }
  }, [form.meterStart, form.meterEnd]);

  if (!isOpen) return null;
  const isView = mode === 'view';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => setImagePreview(ev.target?.result as string);
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
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white flex items-center justify-between shrink-0 border-b border-gray-50">
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20 ${
                form.type?.includes('Listrik') ? 'bg-yellow-500' : 
                form.type?.includes('Air') ? 'bg-blue-500' : 'bg-purple-600'
            }`}>
                {form.type?.includes('Listrik') ? <Zap size={28} strokeWidth={2.5} /> : 
                 form.type?.includes('Air') ? <Droplets size={28} strokeWidth={2.5} /> : <Wifi size={28} strokeWidth={2.5} />}
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'INPUT DATA UTILITAS' : 'DETAIL UTILITAS'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Utility Cost Monitoring</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1 bg-[#FBFBFB]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Left Panel */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-black rounded-full"></div>
                            <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Informasi Dasar</h3>
                        </div>

                        <div>
                            <Label required>Lokasi Gedung / Cabang</Label>
                            <div className="relative">
                                <select 
                                    disabled={isView}
                                    className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner appearance-none cursor-pointer"
                                    value={form.location || ''}
                                    onChange={(e) => setForm({...form, location: e.target.value})}
                                >
                                    <option value="">-- Pilih Lokasi --</option>
                                    {buildingList.map(b => (
                                        <option key={b.id} value={b.name}>{b.name}</option>
                                    ))}
                                </select>
                                <Building size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label>Periode Tagihan</Label>
                                <input type="text" disabled={isView} className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner uppercase" value={form.period} onChange={(e) => setForm({...form, period: e.target.value})} />
                            </div>
                            <div>
                                <Label>Tanggal Catat</Label>
                                <input type="date" disabled={isView} className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />
                            </div>
                        </div>

                        <div>
                            <Label required>Jenis Utilitas</Label>
                            <div className="grid grid-cols-2 gap-3">
                                {['Listrik (PLN)', 'Air (PDAM)', 'Internet', 'Gas'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => !isView && setForm({...form, type})}
                                        className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                            form.type === type ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-black rounded-full"></div>
                            <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Financials</h3>
                        </div>
                        <div className="relative">
                            <Label>Total Biaya (IDR)</Label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] font-black text-gray-400">Rp</span>
                                <input 
                                    type="number"
                                    disabled={isView}
                                    className="w-full bg-[#F2F4F7] border-none rounded-2xl pl-14 pr-6 py-5 text-[16px] font-mono font-black text-black outline-none shadow-inner"
                                    value={form.cost}
                                    onChange={(e) => setForm({...form, cost: e.target.value})}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-black rounded-full"></div>
                            <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Meteran & Pemakaian</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label>Meter Awal</Label>
                                <input type="number" disabled={isView} className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner text-center" value={form.meterStart} onChange={(e) => setForm({...form, meterStart: Number(e.target.value)})} />
                            </div>
                            <div>
                                <Label>Meter Akhir</Label>
                                <input type="number" disabled={isView} className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner text-center" value={form.meterEnd} onChange={(e) => setForm({...form, meterEnd: Number(e.target.value)})} />
                            </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-[1.5rem] p-6 flex justify-between items-center text-white shadow-2xl shadow-black/20">
                            <div>
                                <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">TOTAL USAGE</p>
                                <h4 className="text-[24px] font-black leading-none">{form.usage} <span className="text-[14px] opacity-50 uppercase">{form.unit}</span></h4>
                            </div>
                            <Activity size={32} className="text-green-400" />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col h-full min-h-[250px]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-black rounded-full"></div>
                            <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Upload Bukti Tagihan</h3>
                        </div>

                        <div 
                            onClick={() => !isView && fileInputRef.current?.click()}
                            className={`flex-1 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all overflow-hidden bg-[#F8F9FA]
                                ${imagePreview ? 'border-gray-200' : 'border-gray-200 hover:border-black hover:bg-white'}
                                ${!isView ? 'cursor-pointer' : 'cursor-default'}
                            `}
                        >
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleImageUpload} />
                            {imagePreview ? (
                                <div className="relative w-full h-full group">
                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Bill" />
                                    {!isView && (
                                        <button onClick={(e) => { e.stopPropagation(); setImagePreview(null); }} className="absolute top-4 right-4 bg-black text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center p-6">
                                    <UploadCloud size={32} className="mx-auto text-gray-300 mb-2" />
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Klik untuk Upload Dokumen</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">BATAL</button>
          {!isView && (
            <button onClick={() => onSave(form)} className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-800 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3">
                <Save size={18} strokeWidth={2.5} /> SIMPAN UTILITAS
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
