import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Building, MapPin, Phone, FileText, CheckCircle2, Clock, AlertCircle, Trash2, Plus, ChevronDown, User, Home, DollarSign, Ruler, Zap, Key, UploadCloud, MousePointer2, TrendingUp, PieChart, ShieldCheck, ChevronLeft, Edit3, ImageIcon, Paperclip, BarChart3, History, ChevronRight, Wrench, Download } from 'lucide-react';
import { BuildingRecord, GeneralMasterItem, BuildingProposal, WorkflowStep } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingRecord>) => void;
  initialData?: BuildingRecord;
  mode?: 'create' | 'edit' | 'view';
  buildingTypeList?: GeneralMasterItem[];
  existingBuildings?: BuildingRecord[];
}

export const BuildingModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    buildingTypeList = [],
    existingBuildings = []
}) => {
  const [activeTab, setActiveTab] = useState('INFORMASI UMUM');
  const [generalInfoTab, setGeneralInfoTab] = useState('INFO UTAMA'); 
  const [form, setForm] = useState<Partial<BuildingRecord>>({
    status: 'Active',
    ownership: 'Rent',
    assetNo: 'BDG-001',
    name: 'MODENA Head Office',
    type: 'Office',
    address: 'Jl. Satrio No. 1',
    city: '',
    district: '',
    province: '',
    distanceToDealer: '',
    roadCondition: '',
    rentCost: '0',
    purchasePrice: '0',
    proposals: [],
    workflow: [
        { role: 'Branch Manager', status: 'Approved', approver: 'Budi Santoso', date: '2024-03-01' },
        { role: 'Regional Manager', status: 'Approved', approver: 'Siti Aminah', date: '2024-03-02' },
        { role: 'AVP Dealership', status: 'Pending', approver: 'Pending Review', date: '-' }
    ]
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      }
      setActiveTab('INFORMASI UMUM');
      setGeneralInfoTab('INFO UTAMA');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const SectionHeader = ({ title, sub }: { title: string, sub?: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1.5 h-6 bg-black rounded-full"></div>
      <div className="flex flex-col">
        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.15em] leading-none">{title}</h3>
        {sub && <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{sub}</p>}
      </div>
    </div>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string, icon?: any }) => (
    <div className="mb-4">
      {props.label && <Label>{props.label}</Label>}
      <div className="relative">
        <input 
            {...props}
            className={`w-full bg-[#F2F4F7] border-none rounded-2xl px-5 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-inner focus:ring-2 focus:ring-black/5 disabled:text-gray-400 ${props.className} ${props.icon ? 'pl-12' : ''}`}
            disabled={isView || props.disabled}
        />
        {props.icon && <props.icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20 shrink-0">
                <Building size={24} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none truncate">
                    {form.name || 'NAMA PROPERTI'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">
                    {form.assetNo} • {form.type || 'OFFICE'}
                </p>
            </div>
          </div>
          <div className="flex items-center gap-6 shrink-0 ml-4">
              <span className="px-5 py-1.5 bg-white text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border-2 border-orange-500/20">
                  ACTIVE
              </span>
              <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-1">
                <X size={28} strokeWidth={2} />
              </button>
          </div>
        </div>

        {/* Main Tab Navigation */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-6 lg:gap-10 overflow-x-auto no-scrollbar">
            {[
                'INFORMASI UMUM', 
                'PROPOSAL & PERBANDINGAN', 
                'WORKFLOW', 
                'FLOOR PLAN', 
                'FINANCIAL SUMMARY', 
                'DOKUMEN'
            ].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-5 text-[10px] font-black uppercase tracking-[0.15em] transition-all relative whitespace-nowrap
                        ${activeTab === tab ? 'text-black' : 'text-gray-200 hover:text-gray-400'}`}
                >
                    {tab}
                    {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-black rounded-full"></div>
                    )}
                </button>
            ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 custom-scrollbar bg-white">
            
            {activeTab === 'INFORMASI UMUM' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={() => setForm({...form, ownership: 'Rent'})}
                            className={`h-40 lg:h-44 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 border-2
                                ${form.ownership === 'Rent' 
                                ? 'bg-black text-white border-black shadow-2xl shadow-black/30 scale-[1.02]' 
                                : 'bg-white text-gray-200 border-gray-50 hover:border-gray-100'}`}
                        >
                            <div className={`p-4 rounded-full ${form.ownership === 'Rent' ? 'bg-white/10' : 'bg-gray-50'}`}>
                                <Key size={28} />
                            </div>
                            <div className="text-center px-4">
                                <span className="text-[14px] font-black uppercase tracking-[0.2em] block">SEWA (LEASE)</span>
                                <span className={`text-[8px] font-bold uppercase tracking-widest mt-1 block ${form.ownership === 'Rent' ? 'text-white/60' : 'text-gray-300'}`}>
                                    SEWA TAHUNAN / KONTRAK
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={() => setForm({...form, ownership: 'Own'})}
                            className={`h-40 lg:h-44 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 border-2
                                ${form.ownership === 'Own' 
                                ? 'bg-black text-white border-black shadow-2xl shadow-black/30 scale-[1.02]' 
                                : 'bg-white text-gray-200 border-gray-50 hover:border-gray-100'}`}
                        >
                            <div className={`p-4 rounded-full ${form.ownership === 'Own' ? 'bg-white/10' : 'bg-gray-50'}`}>
                                <Home size={28} />
                            </div>
                            <div className="text-center px-4">
                                <span className="text-[14px] font-black uppercase tracking-[0.2em] block">MILIK SENDIRI (OWN)</span>
                                <span className={`text-[8px] font-bold uppercase tracking-widest mt-1 block ${form.ownership === 'Own' ? 'text-white/60' : 'text-gray-300'}`}>
                                    ASET PERUSAHAAN / BELI PUTUS
                                </span>
                            </div>
                        </button>
                    </div>

                    <div className="bg-[#FAFBFC]/50 p-6 lg:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                        <SectionHeader title="2. IDENTITAS ASET" sub="ASSET CLASSIFICATION & NUMBERING" />
                        <div className="space-y-8">
                            <div>
                                <div className="flex flex-wrap justify-between items-center gap-2 mb-2.5">
                                    <Label required>NAMA PROPERTI / GEDUNG</Label>
                                    <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest underline decoration-2 underline-offset-4">
                                        Pilih Dari Daftar Gedung
                                    </button>
                                </div>
                                <input 
                                    type="text" 
                                    className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 lg:px-8 py-5 text-[14px] font-black text-black outline-none shadow-inner"
                                    value={form.name}
                                    onChange={(e) => setForm({...form, name: e.target.value})}
                                    disabled={isView}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <Label>ASSET NUMBER</Label>
                                    <div className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 lg:px-8 py-5 text-[14px] font-black text-gray-400 shadow-inner">
                                        {form.assetNo}
                                    </div>
                                </div>
                                <div>
                                    <Label required>TIPE GEDUNG</Label>
                                    <div className="relative">
                                        <select 
                                            className="w-full bg-[#F2F4F7] border-none rounded-2xl px-6 lg:px-8 py-5 text-[14px] font-black text-black outline-none appearance-none cursor-pointer shadow-inner uppercase"
                                            value={form.type}
                                            onChange={(e) => setForm({...form, type: e.target.value})}
                                            disabled={isView}
                                        >
                                            <option value="Office">Office</option>
                                            <option value="Warehouse">Warehouse</option>
                                            <option value="Showroom">Showroom</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex bg-[#F2F4F7] p-1.5 rounded-2xl w-fit gap-2 overflow-x-auto no-scrollbar max-w-full">
                                {[
                                    'INFO UTAMA', 
                                    'SPESIFIKASI FISIK', 
                                    'RENOVASI & LINGKUNGAN', 
                                    'BIAYA & LEGAL'
                                ].map(subTab => (
                                    <button 
                                        key={subTab}
                                        onClick={() => setGeneralInfoTab(subTab)}
                                        className={`px-4 lg:px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                                            ${generalInfoTab === subTab 
                                            ? 'bg-black text-white shadow-lg' 
                                            : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        {subTab}
                                    </button>
                                ))}
                            </div>

                            {generalInfoTab === 'INFO UTAMA' && (
                                <div className="pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <SectionHeader title="ALAMAT LOKASI" />
                                    <div className="space-y-6">
                                        <Input label="JALAN / ALAMAT LENGKAP" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} placeholder="Jl. Nama Jalan No..." />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <Input label="KOTA" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} />
                                            <Input label="KABUPATEN" value={form.district} onChange={(e) => setForm({...form, district: e.target.value})} />
                                            <Input label="PROPINSI" value={form.province} onChange={(e) => setForm({...form, province: e.target.value})} />
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <Input label="JARAK KE DEALER (KM)" value={form.distanceToDealer} onChange={(e) => setForm({...form, distanceToDealer: e.target.value})} />
                                                <Input label="KONDISI JALAN / AKSES" value={form.roadCondition} onChange={(e) => setForm({...form, roadCondition: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Other tabs follow similar max-w-full and overflow-hidden rules */}
            {activeTab === 'PROPOSAL & PERBANDINGAN' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-full">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <SectionHeader title="DAFTAR PROPOSAL KANDIDAT" sub="PERBANDINGAN SEWA GEDUNG BARU" />
                        {!isView && (
                            <button className="bg-black text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/20">
                                <Plus size={14} strokeWidth={3} /> TAMBAH KANDIDAT
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2].map(i => (
                            <div key={i} className="bg-white p-6 lg:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black">
                                        <Building size={20} />
                                    </div>
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${i === 1 ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
                                        {i === 1 ? 'WINNING OPTION' : 'CANDIDATE'}
                                    </span>
                                </div>
                                <h4 className="text-[14px] font-black text-black uppercase tracking-tight truncate">KANDIDAT PROPERTI #{i}</h4>
                                <p className="text-[11px] text-gray-400 font-medium mt-1 truncate">Kawasan Industri MM2100, Bekasi</p>
                                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-end">
                                    <div>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">RENT PRICE</p>
                                        <p className="text-[16px] font-mono font-black text-black">Rp 250.0M <span className="text-[10px] text-gray-400">/ Thn</span></p>
                                    </div>
                                    <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-black hover:text-white transition-all">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'WORKFLOW' && (
                <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <SectionHeader title="APPROVAL FLOW STATUS" sub="REAL-TIME REQUEST TRACKING" />
                    <div className="relative pl-12 space-y-12 pb-4">
                        <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-gray-100 rounded-full"></div>
                        {form.workflow?.map((step, idx) => (
                            <div key={idx} className="relative group">
                                <div className={`absolute -left-12 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all
                                    ${step.status === 'Approved' ? 'bg-green-500 text-white' : 'bg-white text-gray-200 border-gray-100'}`}>
                                    {step.status === 'Approved' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                                    <div className="flex flex-wrap justify-between items-start gap-2">
                                        <div>
                                            <h4 className="text-[13px] font-black text-black uppercase tracking-tight">{step.role}</h4>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">{step.approver}</p>
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-gray-400">{step.date}</span>
                                    </div>
                                    <div className={`mt-4 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block
                                        ${step.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                        {step.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'FLOOR PLAN' && (
                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500 max-w-full">
                    <div className="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200 border-2 border-dashed border-gray-100 mb-6">
                        <ImageIcon size={48} />
                    </div>
                    <h3 className="text-[16px] font-black text-black uppercase tracking-tight">BELUM ADA FLOOR PLAN</h3>
                    <p className="text-[11px] text-gray-400 font-medium mt-2 max-w-xs text-center leading-relaxed px-4">
                        Unggah file denah atau tata letak gedung dalam format PDF atau Gambar (JPG/PNG).
                    </p>
                    <button className="mt-8 px-10 py-4 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 shadow-xl transition-all flex items-center gap-2">
                        <UploadCloud size={16} /> UNGGAH DENAH
                    </button>
                </div>
            )}

            {activeTab === 'FINANCIAL SUMMARY' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-full">
                    <SectionHeader title="ANALISA FINANSIAL & OPERASIONAL" sub="BIAYA PEMELIHARAAN & UTILITAS TAHUNAN" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-6"><DollarSign size={20} /></div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TOTAL SEWA / THN</p>
                            <h4 className="text-[20px] font-mono font-black text-black">Rp 250.0M</h4>
                        </div>
                        <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl w-fit mb-6"><Zap size={20} /></div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">BIAYA UTILITAS</p>
                            <h4 className="text-[20px] font-mono font-black text-black">Rp 12.5M</h4>
                        </div>
                        <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit mb-6"><Wrench size={20} /></div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">MAINTENANCE COST</p>
                            <h4 className="text-[20px] font-mono font-black text-black">Rp 45.8M</h4>
                        </div>
                    </div>
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm h-64 flex flex-col items-center justify-center opacity-30">
                        <BarChart3 size={48} className="text-gray-300 mb-4" />
                        <p className="text-[11px] font-black uppercase tracking-widest">Growth Analysis Coming Soon</p>
                    </div>
                </div>
            )}

            {activeTab === 'DOKUMEN' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500 max-w-full">
                    {[
                        { name: 'KONTRAK SEWA.PDF', size: '2.4 MB', type: 'FILE' },
                        { name: 'SERTIFIKAT_SHM.JPG', size: '1.1 MB', type: 'IMAGE' },
                        { name: 'IJIN_DOMISILI.PDF', size: '0.8 MB', type: 'FILE' }
                    ].map((doc, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-black transition-all overflow-hidden">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-black group-hover:text-white transition-all shrink-0">
                                    {doc.type === 'IMAGE' ? <ImageIcon size={20} /> : <FileText size={20} />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-black text-black uppercase truncate">{doc.name}</p>
                                    <p className="text-[9px] font-bold text-gray-400 mt-0.5">{doc.size}</p>
                                </div>
                            </div>
                            <button className="text-gray-300 hover:text-black transition-all shrink-0 ml-2"><Download size={16} /></button>
                        </div>
                    ))}
                    {!isView && (
                        <button className="h-[74px] border-2 border-dashed border-gray-100 rounded-3xl flex items-center justify-center gap-3 text-gray-300 hover:border-black hover:text-black transition-all group">
                            <Plus size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">TAMBAH FILE</span>
                        </button>
                    )}
                </div>
            )}
        </div>

        {/* Modal Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-8 lg:px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">BATAL</button>
          {!isView && (
            <button 
                onClick={handleSave} 
                className="px-10 lg:px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-800 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> SIMPAN DATA
            </button>
          )}
        </div>
      </div>
    </div>
  );
};