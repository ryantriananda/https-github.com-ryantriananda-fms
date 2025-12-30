
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Zap, Droplets, Wifi, UploadCloud, Trash2, Calendar, FileText, DollarSign, Building } from 'lucide-react';
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
        // Reset form for create mode
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

  // Auto calculate usage
  useEffect(() => {
      if (!initialData || mode === 'create' || mode === 'edit') {
          const start = Number(form.meterStart) || 0;
          const end = Number(form.meterEnd) || 0;
          if (end >= start) {
              setForm(prev => ({ ...prev, usage: end - start }));
          }
      }
  }, [form.meterStart, form.meterEnd]);

  // Update Unit based on Type
  useEffect(() => {
      let newUnit: any = 'kWh';
      if (form.type?.includes('Air')) newUnit = 'm3';
      else if (form.type?.includes('Internet')) newUnit = 'Mbps';
      else if (form.type?.includes('Gas')) newUnit = 'L';
      
      if (form.unit !== newUnit) {
          setForm(prev => ({ ...prev, unit: newUnit }));
      }
  }, [form.type]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setImagePreview(ev.target?.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, field, type = "text", disabled = false, placeholder = "", className = "", required = false }: any) => (
    <div className={className}>
      <Label>{label} {required && '*'}</Label>
      <input 
        type={type} 
        disabled={isView || disabled}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-300 shadow-sm"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setForm({...form, [field]: e.target.value})}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-12 py-8 bg-white flex items-center justify-between shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20 ${
                form.type?.includes('Listrik') ? 'bg-yellow-500' : 
                form.type?.includes('Air') ? 'bg-blue-500' : 'bg-purple-600'
            }`}>
                {form.type?.includes('Listrik') ? <Zap size={28} strokeWidth={2.5} /> : 
                 form.type?.includes('Air') ? <Droplets size={28} strokeWidth={2.5} /> : <Wifi size={28} strokeWidth={2.5} />}
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Input Data Utilitas' : mode === 'edit' ? 'Edit Data Utilitas' : 'Detail Utilitas'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Utility & Cost Monitoring</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-3 rounded-full hover:bg-gray-50">
            <X size={32} />
          </button>
        </div>

        {/* Content */}
        <div className="p-12 bg-[#FBFBFB] flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Left Column: Details */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 mb-2">
                        <FileText size={16} className="text-black"/>
                        <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Informasi Dasar</h3>
                    </div>

                    <div>
                        <Label required>Lokasi Gedung / Cabang</Label>
                        <div className="relative">
                            <select 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                value={form.location || ''}
                                onChange={(e) => setForm({...form, location: e.target.value})}
                            >
                                <option value="">-- Pilih Lokasi --</option>
                                {buildingList.map(b => (
                                    <option key={b.id} value={b.name}>{b.name}</option>
                                ))}
                            </select>
                            <Building size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <InputField label="Periode Tagihan" value={form.period} field="period" placeholder="Contoh: Maret 2024" />
                        <InputField label="Tanggal Catat" value={form.date} field="date" type="date" />
                    </div>

                    <div>
                        <Label required>Jenis Utilitas</Label>
                        <select 
                            disabled={isView}
                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                            value={form.type || ''}
                            onChange={(e) => setForm({...form, type: e.target.value as any})}
                        >
                            <option value="Listrik (PLN)">Listrik (PLN)</option>
                            <option value="Air (PDAM)">Air (PDAM)</option>
                            <option value="Internet">Internet (Wifi)</option>
                            <option value="Gas">Gas</option>
                        </select>
                    </div>

                    <div className="relative">
                        <Label>Total Biaya (IDR)</Label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                            <input 
                                type="number"
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 transition-all placeholder:text-gray-300 shadow-sm"
                                value={form.cost}
                                onChange={(e) => setForm({...form, cost: e.target.value})}
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Meter & Evidence */}
                <div className="space-y-8">
                    {form.type !== 'Internet' && (
                        <>
                            <div className="flex items-center gap-3 mb-2">
                                <Zap size={16} className="text-black"/>
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Meteran & Pemakaian</h3>
                            </div>

                            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <InputField label={`Meter Awal (${form.unit})`} value={form.meterStart} field="meterStart" type="number" />
                                    <InputField label={`Meter Akhir (${form.unit})`} value={form.meterEnd} field="meterEnd" type="number" />
                                </div>
                                
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex justify-between items-center">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Usage</span>
                                    <div className="text-right">
                                        <span className="text-[20px] font-black text-black">{form.usage}</span>
                                        <span className="text-[10px] font-bold text-gray-400 ml-1">{form.unit}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex items-center gap-3 mb-2 pt-2">
                        <UploadCloud size={16} className="text-black"/>
                        <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Bukti Tagihan / Foto Meteran</h3>
                    </div>

                    <div 
                        onClick={() => !isView && fileInputRef.current?.click()}
                        className={`relative h-48 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center bg-gray-50 overflow-hidden transition-all
                            ${!isView ? 'cursor-pointer hover:border-black hover:bg-gray-100' : ''}
                            ${imagePreview ? 'border-green-200' : 'border-gray-200'}
                        `}
                    >
                        {imagePreview ? (
                            <div className="relative w-full h-full group">
                                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                {!isView && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
                                        className="absolute top-4 right-4 bg-black text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-400">
                                <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                                    <UploadCloud size={20} className="text-black" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest">Upload Foto / PDF</span>
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>

                    <div>
                        <Label>Status Pembayaran</Label>
                        <div className="flex gap-3">
                            {['Paid', 'Unpaid', 'Pending Review'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => !isView && setForm({...form, status: s as any})}
                                    disabled={isView}
                                    className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl border transition-all ${
                                        form.status === s
                                        ? s === 'Paid' ? 'bg-green-500 text-white border-green-600' 
                                          : s === 'Unpaid' ? 'bg-red-500 text-white border-red-600'
                                          : 'bg-orange-500 text-white border-orange-600'
                                        : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-12 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={() => onSave({ ...form, attachmentUrl: imagePreview || undefined })} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> Simpan Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
