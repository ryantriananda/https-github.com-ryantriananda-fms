
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, FileText, Building, Calendar, AlertCircle, UploadCloud, Trash2, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
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

  // Auto-calculate status based on date
  useEffect(() => {
      if (form.expiryDate) {
          const today = new Date();
          const expiry = new Date(form.expiryDate);
          const diffTime = expiry.getTime() - today.getTime();
          const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          let status = 'Safe';
          if (days < 0) status = 'Urgent'; // Expired
          else if (days <= 30) status = 'Urgent';
          else if (days <= 90) status = 'Warning';
          
          setForm(prev => ({ ...prev, daysRemaining: days, status }));
      }
  }, [form.expiryDate]);

  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedName = e.target.value;
      const building = buildingList.find(b => b.name === selectedName);
      setForm(prev => ({
          ...prev,
          buildingName: selectedName,
          assetNo: building?.assetNo || ''
      }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => setPreview(ev.target?.result as string);
          reader.readAsDataURL(file);
      }
  };

  if (!isOpen) return null;
  const isView = mode === 'view';

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Tambah Dokumen Legal' : mode === 'edit' ? 'Edit Dokumen' : 'Detail Dokumen'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Compliance Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
            <div className="space-y-8">
                
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Dokumen</label>
                        <input 
                            type="text" 
                            disabled={isView}
                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:ring-2 focus:ring-black/5 outline-none placeholder:text-gray-300"
                            placeholder="Contoh: SHGB Certificate, Izin Usaha..."
                            value={form.documentName}
                            onChange={(e) => setForm({...form, documentName: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lokasi Aset</label>
                            <div className="relative">
                                <select 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none appearance-none cursor-pointer shadow-sm"
                                    value={form.buildingName}
                                    onChange={handleBuildingChange}
                                >
                                    <option value="">-- Pilih Gedung --</option>
                                    {buildingList.map(b => (
                                        <option key={b.id} value={b.name}>{b.name}</option>
                                    ))}
                                </select>
                                <Building size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Asset No</label>
                            <input 
                                type="text" 
                                disabled={true}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-[13px] font-black text-gray-500 outline-none"
                                value={form.assetNo}
                                placeholder="Auto-filled"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tanggal Kadaluarsa</label>
                            <div className="relative">
                                <input 
                                    type="date"
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none shadow-sm"
                                    value={form.expiryDate}
                                    onChange={(e) => setForm({...form, expiryDate: e.target.value})}
                                />
                                <Calendar size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Status Prediksi</label>
                            <div className={`w-full px-5 py-4 rounded-2xl text-[12px] font-black uppercase flex items-center gap-2 border ${
                                form.status === 'Safe' ? 'bg-green-50 text-green-600 border-green-100' :
                                form.status === 'Warning' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                'bg-red-50 text-red-600 border-red-100'
                            }`}>
                                {form.status === 'Safe' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                {form.status} ({form.daysRemaining} Hari)
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText size={18} className="text-black"/>
                        <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Digital Attachment</h3>
                    </div>
                    
                    <div 
                        onClick={() => !isView && fileInputRef.current?.click()}
                        className={`relative h-48 border-2 border-dashed rounded-[1.5rem] flex flex-col items-center justify-center overflow-hidden transition-all group
                            ${preview ? 'border-gray-200' : 'border-gray-200 hover:border-black hover:bg-gray-50'}
                            ${!isView ? 'cursor-pointer' : 'cursor-default'}
                        `}
                    >
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
                        {preview ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-gray-50">
                                <FileText size={48} className="text-black mb-2" />
                                <span className="absolute bottom-4 text-[10px] font-black uppercase">File Uploaded</span>
                                {!isView && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                                        className="absolute top-4 right-4 bg-white p-2 rounded-full text-red-500 shadow-md hover:bg-red-50 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-400">
                                <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                    <UploadCloud size={24} className="text-black" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest">Upload Scan Dokumen</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> Simpan Dokumen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
