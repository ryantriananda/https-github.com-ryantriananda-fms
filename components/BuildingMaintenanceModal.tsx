import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Wrench, Calendar, DollarSign, FileText, Building, User, UploadCloud, Trash2, Clock, CheckCircle2, AlertCircle, PlayCircle, Star, Image as ImageIcon, MapPin, ChevronRight, Activity } from 'lucide-react';
import { BuildingMaintenanceRecord, BuildingAssetRecord, BuildingRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingMaintenanceRecord>) => void;
  initialData?: BuildingMaintenanceRecord | null;
  assetList: BuildingAssetRecord[];
  buildingList?: BuildingRecord[];
  mode?: 'create' | 'edit' | 'view';
}

export const BuildingMaintenanceModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    assetList,
    buildingList = [],
    mode = 'create'
}) => {
  const [form, setForm] = useState<Partial<BuildingMaintenanceRecord>>({
    requestDate: new Date().toISOString().split('T')[0],
    maintenanceType: 'Preventive',
    status: 'Scheduled',
    approvalStatus: 'Pending Approval',
    cost: '0',
    rating: 0
  });

  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        if (initialData.assetId) {
            const asset = assetList.find(a => a.id === initialData.assetId);
            if (asset) setSelectedBuilding(asset.buildingName);
        }
      } else {
        setForm({
            requestDate: new Date().toISOString().split('T')[0],
            maintenanceType: 'Preventive',
            status: 'Scheduled',
            approvalStatus: 'Pending Approval',
            cost: '0',
            rating: 0,
            assetId: '',
            assetName: '',
        });
        setSelectedBuilding('');
      }
    }
  }, [isOpen, initialData, assetList]);

  if (!isOpen) return null;
  const isView = mode === 'view';

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 ml-1">
      {children} {required && <span className="text-red-500 font-black">*</span>}
    </label>
  );

  const SectionHeader = ({ title, sub }: { title: string, sub?: string }) => (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-1.5 h-6 bg-black rounded-full"></div>
      <div className="flex flex-col">
        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.15em] leading-none">{title}</h3>
        {sub && <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{sub}</p>}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white flex items-center justify-between shrink-0 border-b border-gray-50">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Wrench size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'REQUEST PEMELIHARAAN' : 'DETAIL PEMELIHARAAN'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Preventive & Corrective Maintenance</p>
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
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <SectionHeader title="1. INFORMASI ASET" />
                        
                        <div>
                            <Label required>LOKASI GEDUNG</Label>
                            <div className="relative">
                                <select 
                                    disabled={isView}
                                    className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner appearance-none cursor-pointer"
                                    value={selectedBuilding}
                                    onChange={(e) => setSelectedBuilding(e.target.value)}
                                >
                                    <option value="">-- PILIH LOKASI --</option>
                                    {buildingList.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                                </select>
                                <MapPin size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <Label required>PILIH UNIT ASET</Label>
                            <div className="relative">
                                <select 
                                    disabled={isView || !selectedBuilding}
                                    className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner appearance-none cursor-pointer"
                                    value={form.assetId}
                                    onChange={(e) => {
                                        const asset = assetList.find(a => a.id === e.target.value);
                                        setForm({...form, assetId: e.target.value, assetName: asset?.assetName});
                                    }}
                                >
                                    <option value="">-- PILIH UNIT --</option>
                                    {assetList.filter(a => a.buildingName === selectedBuilding).map(a => (
                                        <option key={a.id} value={a.id}>{a.assetName} ({a.assetCode})</option>
                                    ))}
                                </select>
                                <Activity size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <Label>TIPE PEMELIHARAAN</Label>
                            <div className="flex gap-3">
                                {['Preventive', 'Corrective', 'Emergency'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => !isView && setForm({...form, maintenanceType: type as any})}
                                        className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                            form.maintenanceType === type ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <SectionHeader title="3. EVIDENCE BASED" sub="FOTO SEBELUM & SESUDAH" />
                        <div className="grid grid-cols-2 gap-6">
                            {['Before', 'After'].map(type => (
                                <div key={type} className="flex flex-col items-center">
                                    <Label>{type.toUpperCase()}</Label>
                                    <div className="w-full h-40 border-2 border-dashed border-gray-100 rounded-3xl bg-[#F8F9FA] flex flex-col items-center justify-center text-gray-300 hover:border-black transition-all cursor-pointer">
                                        <ImageIcon size={32} />
                                        <span className="text-[9px] font-black mt-2">UPLOAD</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <SectionHeader title="2. DETAIL PENGERJAAN" />
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label>TGL REQUEST</Label>
                                <input type="date" disabled={isView} className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner" value={form.requestDate} onChange={(e) => setForm({...form, requestDate: e.target.value})} />
                            </div>
                            <div>
                                <Label>ESTIMASI BIAYA</Label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[12px] font-black text-gray-400">Rp</span>
                                    <input type="number" disabled={isView} className="w-full bg-[#F2F4F7] border-none rounded-2xl pl-14 pr-6 py-5 text-[14px] font-black text-black outline-none shadow-inner" value={form.cost} onChange={(e) => setForm({...form, cost: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label>VENDOR PELAKSANA</Label>
                            <input type="text" disabled={isView} className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none shadow-inner uppercase" value={form.vendor} onChange={(e) => setForm({...form, vendor: e.target.value})} placeholder="NAMA VENDOR..." />
                        </div>

                        <div>
                            <Label>KETERANGAN KERJA</Label>
                            <textarea disabled={isView} className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 py-5 text-[14px] font-medium text-black outline-none shadow-inner resize-none min-h-[100px]" placeholder="DESKRIPSI PERBAIKAN..." value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
                        </div>

                        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">VENDOR RATING</p>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(s => (
                                        <Star key={s} size={20} className={s <= (form.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'} />
                                    ))}
                                </div>
                            </div>
                            <button className="px-5 py-2 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">BERI RATING</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">BATAL</button>
          {!isView && (
            <button onClick={() => onSave(form)} className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-800 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3">
                <Save size={18} strokeWidth={2.5} /> SIMPAN LAPORAN
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
