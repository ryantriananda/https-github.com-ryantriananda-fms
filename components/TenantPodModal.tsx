
import React, { useState, useEffect } from 'react';
import { X, Save, Home, User, Briefcase, Calendar, Info, Lock, Zap, History, Plus, Edit3, Trash2, Monitor, Wind, Smartphone, Box, Grid, Layers, Check } from 'lucide-react';
import { TenantPodRecord, TenantHistory } from '../types';

// Icons for facilities (reused for consistency)
const BoxIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>);
const ExpandIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>);
const BikeIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>);
const CarIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h8"/></svg>);
const CoffeeIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Z"/><path d="M6 2v2"/></svg>);
const DumbbellIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>);
const ShirtIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>);
const DropletIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2.69l5.74 5.88a9.81 9.81 0 1 1-11.48 0L12 2.69z"/><path d="M12 2.69l5.74 5.88a9.81 9.81 0 1 1-11.48 0L12 2.69z"/></svg>);
const UtensilsIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>);
const WavesIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<TenantPodRecord>) => void;
  initialData?: TenantPodRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

const FACILITIES_CONFIG = [
    { key: 'meja', label: 'MEJA', icon: Monitor },
    { key: 'ac', label: 'AC', icon: Wind },
    { key: 'kursi', label: 'KURSI', icon: User },
    { key: 'colokan', label: 'COLOKAN', icon: Zap },
    { key: 'lemari', label: 'LEMARI', icon: BoxIcon },
    { key: 'cermin', label: 'CERMIN', icon: ExpandIcon },
    { key: 'parkirMotor', label: 'PARKIR MOTOR', icon: BikeIcon },
    { key: 'parkirMobil', label: 'PARKIR MOBIL', icon: CarIcon },
    { key: 'kmLuar', label: 'KM. LUAR', icon: DropletIcon },
    { key: 'kmDalam', label: 'KM. DALAM', icon: DropletIcon },
    { key: 'gym', label: 'GYM', icon: DumbbellIcon },
    { key: 'pantry', label: 'PANTRY', icon: CoffeeIcon },
    { key: 'lokerPantry', label: 'LOKER PANTRY', icon: BoxIcon },
    { key: 'lokerBarang', label: 'LOKER BARANG', icon: Lock },
    { key: 'kitchen', label: 'KITCHEN', icon: UtensilsIcon },
    { key: 'laundry', label: 'LAUNDRY', icon: ShirtIcon },
    { key: 'kolamRenang', label: 'KOLAM RENANG', icon: WavesIcon },
];

export const TenantPodModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create'
}) => {
  const [form, setForm] = useState<Partial<TenantPodRecord>>({
    lantai: 'Lt 2 Pria',
    jenisKamar: 'Single Bed',
    nomorKamar: '',
    namaPenghuni: '',
    gender: 'Pria',
    isExpat: false,
    posisi: '',
    departemen: '',
    jadwalLaundry: 'Tidak Ada',
    statusLokerBarang: 'Tidak Terpakai',
    statusLokerPantry: 'Tidak Terpakai',
    keterangan: '',
    facilities: {
        meja: false, ac: false, kursi: false, colokan: false, lemari: false, cermin: false,
        parkirMotor: false, parkirMobil: false, kmLuar: false, kmDalam: false,
        gym: false, pantry: false, lokerPantry: false, lokerBarang: false,
        kitchen: false, laundry: false, kolamRenang: false
    },
    history: []
  });

  const [isAddingHistory, setIsAddingHistory] = useState(false);
  const [newHistory, setNewHistory] = useState<Partial<TenantHistory>>({
      period: 'Jan 2024',
      rentCost: '0',
      kwh: '0',
      electricityCost: '0',
      lockerBarangStatus: true,
      lockerPantryStatus: true
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            lantai: 'Lt 2 Pria',
            jenisKamar: 'Single Bed',
            nomorKamar: '',
            namaPenghuni: '',
            gender: 'Pria',
            isExpat: false,
            posisi: '',
            departemen: '',
            jadwalLaundry: 'Tidak Ada',
            statusLokerBarang: 'Tidak Terpakai',
            statusLokerPantry: 'Tidak Terpakai',
            keterangan: '',
            facilities: {
                meja: false, ac: false, kursi: false, colokan: false, lemari: false, cermin: false,
                parkirMotor: false, parkirMobil: false, kmLuar: false, kmDalam: false,
                gym: false, pantry: false, lokerPantry: false, lokerBarang: false,
                kitchen: false, laundry: false, kolamRenang: false
            },
            history: []
        });
      }
      setIsAddingHistory(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const toggleFacility = (key: keyof typeof form.facilities) => {
      if (isView) return;
      setForm(prev => ({
          ...prev,
          facilities: {
              ...prev.facilities!,
              [key]: !prev.facilities![key]
          }
      }));
  };

  const handleAddHistory = () => {
      const historyItem: TenantHistory = {
          id: `HIST-${Date.now()}`,
          dateAdded: new Date().toISOString().split('T')[0],
          period: newHistory.period || '',
          rentCost: newHistory.rentCost || '0',
          kwh: newHistory.kwh || '0',
          electricityCost: newHistory.electricityCost || '0',
          lockerBarangStatus: newHistory.lockerBarangStatus || false,
          lockerPantryStatus: newHistory.lockerPantryStatus || false
      };
      setForm(prev => ({
          ...prev,
          history: [historyItem, ...(prev.history || [])]
      }));
      setIsAddingHistory(false);
      setNewHistory({ period: '', rentCost: '0', kwh: '0', electricityCost: '0', lockerBarangStatus: true, lockerPantryStatus: true });
  };

  const handleDeleteHistory = (id: string) => {
      setForm(prev => ({
          ...prev,
          history: prev.history?.filter(h => h.id !== id)
      }));
  };

  // UI Components
  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
      {children}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon size={16} className="text-black" />
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const InputField = ({ label, value, onChange, placeholder, disabled, className }: any) => (
    <div className={className}>
        <Label>{label}</Label>
        <input 
            type="text"
            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner uppercase"
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || isView}
        />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-12 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-black rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shadow-black/20">
                  <Home size={24} strokeWidth={2.5} />
              </div>
              <div>
                  <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'TAMBAH DATA TENANT POD' : 'DETAIL DATA TENANT POD'}
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">MANAJEMEN HUNIAN & FASILITAS TENANT</p>
              </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-12 overflow-y-auto custom-scrollbar flex-1 bg-[#FBFBFB]">
            {/* Split View for Creation/Editing, but Stacked for History in View Mode as per Image 1 style */}
            
            {/* Top Section: Room & Occupant Info (Matches Image 2/5) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-full">
                    <SectionHeader icon={Layers} title="INFORMASI KAMAR" />
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label>LANTAI</Label>
                                <select 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none appearance-none uppercase"
                                    value={form.lantai}
                                    onChange={(e) => setForm({...form, lantai: e.target.value})}
                                    disabled={isView}
                                >
                                    <option value="LT 2 PRIA">LT 2 PRIA</option>
                                    <option value="LT 2 PEREMPUAN">LT 2 PEREMPUAN</option>
                                    <option value="LT 3 PRIA">LT 3 PRIA</option>
                                    <option value="LT 3 PEREMPUAN">LT 3 PEREMPUAN</option>
                                </select>
                            </div>
                            <div>
                                <Label>JENIS KAMAR</Label>
                                <select 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none appearance-none uppercase"
                                    value={form.jenisKamar}
                                    onChange={(e) => setForm({...form, jenisKamar: e.target.value})}
                                    disabled={isView}
                                >
                                    <option value="SINGLE BED">SINGLE BED</option>
                                    <option value="DOUBLE BED">DOUBLE BED</option>
                                    <option value="QUADRUPLE BED">QUADRUPLE BED</option>
                                </select>
                            </div>
                        </div>
                        <InputField 
                            label="NOMOR KAMAR" 
                            value={form.nomorKamar} 
                            onChange={(val: string) => setForm({...form, nomorKamar: val})}
                            placeholder="CONTOH: 211"
                        />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-full">
                    <SectionHeader icon={User} title="DETAIL PENGHUNI" />
                    <div className="space-y-6">
                        <InputField 
                            label="NAMA PENGHUNI" 
                            value={form.namaPenghuni} 
                            onChange={(val: string) => setForm({...form, namaPenghuni: val})}
                            placeholder="MASUKKAN NAMA LENGKAP..."
                        />
                        
                        <div className="grid grid-cols-2 gap-6">
                             <div>
                                <Label>JENIS KELAMIN</Label>
                                <div className="flex gap-2">
                                    {['Pria', 'Perempuan'].map(g => (
                                        <button
                                            key={g}
                                            onClick={() => !isView && setForm({...form, gender: g as any})}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                form.gender === g ? 'bg-black text-white shadow-md' : 'bg-[#F8F9FA] text-gray-400 hover:bg-gray-100'
                                            }`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                             </div>
                             <div>
                                <Label>TIPE HUNIAN</Label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => !isView && setForm({...form, isExpat: true})}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            form.isExpat ? 'bg-black text-white shadow-md' : 'bg-[#F8F9FA] text-gray-400 hover:bg-gray-100'
                                        }`}
                                    >
                                        EXPAT
                                    </button>
                                    <button
                                        onClick={() => !isView && setForm({...form, isExpat: false})}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            !form.isExpat ? 'bg-black text-white shadow-md' : 'bg-[#F8F9FA] text-gray-400 hover:bg-gray-100'
                                        }`}
                                    >
                                        NON-EXPAT
                                    </button>
                                </div>
                             </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <InputField label="POSISI" value={form.posisi} onChange={(val: string) => setForm({...form, posisi: val})} placeholder="CONTOH: TEAM LEADER" />
                            <InputField label="DEPARTEMEN" value={form.departemen} onChange={(val: string) => setForm({...form, departemen: val})} placeholder="CONTOH: AFTER SALES" />
                        </div>
                        
                        <InputField label="JADWAL LAUNDRY" value={form.jadwalLaundry} onChange={(val: string) => setForm({...form, jadwalLaundry: val})} placeholder="CONTOH: SELASA & JUMAT" />
                    </div>
                </div>
            </div>

            {/* Facilities Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-12">
                <SectionHeader icon={Zap} title="FASILITAS KAMAR & GEDUNG" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {FACILITIES_CONFIG.map((fac) => {
                        const isActive = form.facilities?.[fac.key as keyof typeof form.facilities];
                        return (
                            <button
                                key={fac.key}
                                onClick={() => toggleFacility(fac.key as any)}
                                disabled={isView}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left group ${
                                    isActive 
                                    ? 'bg-black border-black text-white shadow-md' 
                                    : 'bg-[#F8F9FA] border-transparent text-gray-400 hover:border-gray-200'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <fac.icon size={14} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'} />
                                    <span className={`text-[9px] font-black uppercase tracking-tight ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-black'}`}>
                                        {fac.label}
                                    </span>
                                </div>
                                {isActive && <Check size={12} />}
                            </button>
                        );
                    })}
                </div>
            </div>
            
            {/* Locker Status Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-12">
                <SectionHeader icon={Lock} title="STATUS LOKER" />
                <div className="grid grid-cols-2 gap-8">
                    <div>
                         <Label>LOKER BARANG</Label>
                         <select 
                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none appearance-none uppercase cursor-pointer"
                            value={form.statusLokerBarang}
                            onChange={(e) => setForm({...form, statusLokerBarang: e.target.value as any})}
                            disabled={isView}
                        >
                            <option value="Terpakai">Terpakai</option>
                            <option value="Tidak Terpakai">Tidak Terpakai</option>
                            <option value="Extra Loker Terpakai">Extra Loker Terpakai</option>
                            <option value="Belum Dapat">Belum Dapat</option>
                        </select>
                    </div>
                    <div>
                         <Label>LOKER PANTRY</Label>
                         <select 
                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none appearance-none uppercase cursor-pointer"
                            value={form.statusLokerPantry}
                            onChange={(e) => setForm({...form, statusLokerPantry: e.target.value as any})}
                            disabled={isView}
                        >
                            <option value="Terpakai">Terpakai</option>
                            <option value="Tidak Terpakai">Tidak Terpakai</option>
                            <option value="Extra Loker Terpakai">Extra Loker Terpakai</option>
                            <option value="Belum Dapat">Belum Dapat</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* History Section (Matches Image 1) */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg">
                            <History size={18} />
                        </div>
                        <div>
                            <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em] leading-none">RIWAYAT PENGHUNI & UTILITAS</h3>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">DATA TRANSAKSI BERDASARKAN KAMAR {form.nomorKamar}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                         <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                             TOTAL: {form.history?.length || 0} RECORD
                         </span>
                         {!isView && !isAddingHistory && (
                             <button 
                                onClick={() => setIsAddingHistory(true)}
                                className="bg-black text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-900 transition-all shadow-lg"
                             >
                                 <Plus size={12} /> TAMBAH RIWAYAT
                             </button>
                         )}
                    </div>
                </div>

                {/* Avg Cards */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                            <Zap size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">AVG PEMAKAIAN LISTRIK</p>
                            <p className="text-[20px] font-black text-blue-600 leading-none">152.5 <span className="text-[12px] font-bold">kWh/Bln</span></p>
                        </div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-3xl border border-green-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm">
                            <History size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-green-400 uppercase tracking-widest mb-1">AVG TAGIHAN LISTRIK</p>
                            <p className="text-[20px] font-black text-green-600 leading-none">Rp 228.750 <span className="text-[12px] font-bold">/Bln</span></p>
                        </div>
                    </div>
                </div>

                {/* Add History Form */}
                {isAddingHistory && (
                    <div className="mb-8 p-8 bg-[#FBFBFB] rounded-3xl border border-dashed border-gray-300 animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Plus size={16} className="text-black" />
                            <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">MASUKKAN DATA RIWAYAT BARU</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mb-4">
                             {/* Auto filled info for context */}
                             <div>
                                 <Label>NAMA PENGHUNI</Label>
                                 <div className="bg-white px-5 py-4 rounded-2xl border border-gray-100 text-[12px] font-bold text-gray-500 uppercase">{form.namaPenghuni || '-'}</div>
                             </div>
                             <div>
                                 <Label>DEPARTEMEN</Label>
                                 <div className="bg-white px-5 py-4 rounded-2xl border border-gray-100 text-[12px] font-bold text-gray-500 uppercase">{form.departemen || '-'}</div>
                             </div>
                             
                             <div>
                                <Label>HARGA KAMAR (RP)</Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                    <input 
                                        type="number" 
                                        className="w-full bg-white border-none rounded-2xl pl-12 pr-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5"
                                        value={newHistory.rentCost}
                                        onChange={(e) => setNewHistory({...newHistory, rentCost: e.target.value})}
                                    />
                                </div>
                             </div>
                             
                             <div>
                                <Label>BULAN/PERIODE</Label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className="w-full bg-white border-none rounded-2xl pl-12 pr-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 uppercase"
                                        placeholder="CONTOH: MEI 2024"
                                        value={newHistory.period}
                                        onChange={(e) => setNewHistory({...newHistory, period: e.target.value})}
                                    />
                                    <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                             </div>

                             <div>
                                <Label>PEMAKAIAN LISTRIK (KWH)</Label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        className="w-full bg-white border-none rounded-2xl pl-12 pr-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5"
                                        value={newHistory.kwh}
                                        onChange={(e) => setNewHistory({...newHistory, kwh: e.target.value})}
                                    />
                                    <Zap size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                             </div>

                             <div>
                                <Label>TOTAL BIAYA LISTRIK (RP)</Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                    <input 
                                        type="number" 
                                        className="w-full bg-white border-none rounded-2xl pl-12 pr-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5"
                                        value={newHistory.electricityCost}
                                        onChange={(e) => setNewHistory({...newHistory, electricityCost: e.target.value})}
                                    />
                                </div>
                             </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <Label>LOKER BARANG</Label>
                                <select 
                                    className="w-full bg-white border-none rounded-2xl px-5 py-4 text-[12px] font-bold text-black outline-none appearance-none cursor-pointer uppercase"
                                    value={newHistory.lockerBarangStatus ? 'TERPAKAI' : 'TIDAK TERPAKAI'}
                                    onChange={(e) => setNewHistory({...newHistory, lockerBarangStatus: e.target.value === 'TERPAKAI'})}
                                >
                                    <option value="TERPAKAI">TERPAKAI</option>
                                    <option value="TIDAK TERPAKAI">TIDAK TERPAKAI</option>
                                </select>
                            </div>
                            <div>
                                <Label>LOKER PANTRY</Label>
                                <select 
                                    className="w-full bg-white border-none rounded-2xl px-5 py-4 text-[12px] font-bold text-black outline-none appearance-none cursor-pointer uppercase"
                                    value={newHistory.lockerPantryStatus ? 'TERPAKAI' : 'TIDAK TERPAKAI'}
                                    onChange={(e) => setNewHistory({...newHistory, lockerPantryStatus: e.target.value === 'TERPAKAI'})}
                                >
                                    <option value="TERPAKAI">TERPAKAI</option>
                                    <option value="TIDAK TERPAKAI">TIDAK TERPAKAI</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200/50">
                            <button onClick={() => setIsAddingHistory(false)} className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black hover:bg-gray-50 transition-all">BATAL</button>
                            <button onClick={handleAddHistory} className="px-10 py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700 transition-all shadow-lg">SIMPAN RIWAYAT</button>
                        </div>
                    </div>
                )}

                {/* History Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#FAFAFA] border-b border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                <th className="py-4 pl-6">#</th>
                                <th className="py-4">PENGHUNI</th>
                                <th className="py-4">PERIODE</th>
                                <th className="py-4 text-center">LOKER B / P</th>
                                <th className="py-4 text-right">HARGA KAMAR</th>
                                <th className="py-4 text-center text-blue-500">KWH</th>
                                <th className="py-4 text-right text-blue-600">LISTRIK</th>
                                <th className="py-4 text-center pr-6">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {form.history && form.history.length > 0 ? (
                                form.history.map((hist, idx) => (
                                    <tr key={hist.id} className="group hover:bg-gray-50/50">
                                        <td className="py-5 pl-6 text-[10px] font-bold text-gray-300">{idx + 1}</td>
                                        <td className="py-5">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-black uppercase">{form.namaPenghuni}</span>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{form.departemen}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 text-[10px] font-black text-black uppercase">{hist.period}</td>
                                        <td className="py-5 text-center">
                                            <div className="flex justify-center gap-2">
                                                <div className={`w-2.5 h-2.5 rounded-full ${hist.lockerBarangStatus ? 'bg-green-400' : 'bg-gray-200'}`} title="Barang"></div>
                                                <div className={`w-2.5 h-2.5 rounded-full ${hist.lockerPantryStatus ? 'bg-green-400' : 'bg-gray-200'}`} title="Pantry"></div>
                                            </div>
                                        </td>
                                        <td className="py-5 text-right text-[11px] font-bold text-black">Rp {parseInt(hist.rentCost).toLocaleString('id-ID')}</td>
                                        <td className="py-5 text-center text-[11px] font-black text-blue-600">{hist.kwh}</td>
                                        <td className="py-5 text-right text-[11px] font-black text-blue-600">Rp {parseInt(hist.electricityCost).toLocaleString('id-ID')}</td>
                                        <td className="py-5 text-center pr-6">
                                            {!isView && (
                                                <div className="flex justify-center gap-2">
                                                    <button className="text-gray-300 hover:text-black transition-all"><Edit3 size={14}/></button>
                                                    <button onClick={() => handleDeleteHistory(hist.id)} className="text-gray-300 hover:text-red-500 transition-all"><Trash2 size={14}/></button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={8} className="py-8 text-center text-[10px] text-gray-400 italic">BELUM ADA RIWAYAT TRANSAKSI</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mt-8">
                <SectionHeader icon={Info} title="KETERANGAN TAMBAHAN" />
                <textarea 
                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[12px] font-medium text-black outline-none resize-none placeholder:text-gray-300 focus:ring-2 focus:ring-black/5"
                    placeholder="Isi catatan tambahan..."
                    rows={2}
                    value={form.keterangan}
                    onChange={(e) => setForm({...form, keterangan: e.target.value})}
                    disabled={isView}
                />
            </div>
        </div>

        {/* Footer */}
        <div className="px-12 py-8 bg-white border-t border-gray-100 flex justify-center gap-4 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
          <button onClick={onClose} className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 bg-white border border-gray-200 rounded-[1.2rem] hover:bg-gray-50 hover:text-black transition-all">
            {isView ? 'TUTUP' : 'BATAL'}
          </button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-20 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white bg-black rounded-[1.2rem] hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={16} strokeWidth={2.5} /> SIMPAN DATA TENANT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
