
import React, { useState, useEffect } from 'react';
import { X, Save, Home, Bed, User, DollarSign, History, Zap, CheckCircle2, Plus, Monitor, Wind, Wifi, Droplets, Utensils, Shirt, Waves, Lock, Info, ChevronDown, Check, Trash2, Edit3, Tag, Layers, TrendingUp } from 'lucide-react';
import { MasterPodRecord, PodTransaction } from '../types';

// Simple icon components
const BoxIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>);
const ExpandIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>);
const BikeIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>);
const CarIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h8"/></svg>);
const CoffeeIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Z"/><path d="M6 2v2"/></svg>);
const DumbbellIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MasterPodRecord>) => void;
  initialData?: MasterPodRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

const FACILITIES_CONFIG = [
    { key: 'meja', label: 'MEJA', icon: Monitor },
    { key: 'ac', label: 'AC', icon: Wind },
    { key: 'kursi', label: 'KURSI', icon: User }, // Placeholder icon
    { key: 'colokan', label: 'COLOKAN', icon: Zap },
    { key: 'lemari', label: 'LEMARI', icon: BoxIcon }, // Custom icon below
    { key: 'cermin', label: 'CERMIN', icon: ExpandIcon }, // Custom icon below
    { key: 'parkirMotor', label: 'PARKIR MOTOR', icon: BikeIcon }, // Custom icon below
    { key: 'parkirMobil', label: 'PARKIR MOBIL', icon: CarIcon }, // Custom icon below
    { key: 'kmLuar', label: 'KM. LUAR', icon: Droplets },
    { key: 'kmDalam', label: 'KM. DALAM', icon: Droplets }, // Same icon, diff label
    { key: 'gym', label: 'GYM', icon: DumbbellIcon }, // Custom icon below
    { key: 'pantry', label: 'PANTRY', icon: CoffeeIcon }, // Custom icon below
    { key: 'lokerPantry', label: 'LOKER PANTRY', icon: BoxIcon },
    { key: 'lokerBarang', label: 'LOKER BARANG', icon: Lock },
    { key: 'kitchen', label: 'KITCHEN', icon: Utensils },
    { key: 'laundry', label: 'LAUNDRY', icon: Shirt }, // Assuming Shirt exists or use custom
    { key: 'kolamRenang', label: 'KOLAM RENANG', icon: Waves },
];

export const MasterPodModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create'
}) => {
  const [form, setForm] = useState<Partial<MasterPodRecord>>({
    lantai: 'LT 2',
    gender: 'PRIA',
    jenisKamar: 'SINGLE BED',
    nomorKamar: '',
    kapasitas: 1,
    status: 'ACTIVE',
    biayaAwal: '0',
    biayaTerbaru: '0',
    facilities: {
        meja: false, ac: false, kursi: false, colokan: false, lemari: false, cermin: false,
        parkirMotor: false, parkirMobil: false, kmLuar: false, kmDalam: false,
        gym: false, pantry: false, lokerPantry: false, lokerBarang: false,
        kitchen: false, laundry: false, kolamRenang: false
    },
    transactions: [],
    priceHistory: []
  });

  // State for adding new transaction (View/Edit Mode)
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [newTrans, setNewTrans] = useState<PodTransaction>({ period: '', rentCost: '', kwh: '', electricityCost: '' });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        // Reset for Create
        setForm({
            lantai: 'LT 2',
            gender: 'PRIA',
            jenisKamar: 'SINGLE BED',
            nomorKamar: '',
            kapasitas: 1,
            status: 'ACTIVE',
            biayaAwal: '0',
            biayaTerbaru: '0',
            facilities: {
                meja: false, ac: false, kursi: false, colokan: false, lemari: false, cermin: false,
                parkirMotor: false, parkirMobil: false, kmLuar: false, kmDalam: false,
                gym: false, pantry: false, lokerPantry: false, lokerBarang: false,
                kitchen: false, laundry: false, kolamRenang: false
            },
            transactions: [],
            priceHistory: []
        });
      }
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

  const handleAddTransaction = () => {
      if(newTrans.period && newTrans.rentCost) {
          setForm(prev => ({
              ...prev,
              transactions: [newTrans, ...(prev.transactions || [])]
          }));
          setNewTrans({ period: '', rentCost: '', kwh: '', electricityCost: '' });
          setIsAddingTransaction(false);
      }
  };

  const handleDeleteTransaction = (index: number) => {
      setForm(prev => ({
          ...prev,
          transactions: prev.transactions?.filter((_, i) => i !== index)
      }));
  };

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 ml-1">
      {children}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
    <div className="flex items-center gap-3 mb-6">
        {Icon && <div className="p-2 bg-gray-50 rounded-lg"><Icon size={16} className="text-black" /></div>}
        <div>
            <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em] leading-none">{title}</h3>
            {subtitle && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{subtitle}</p>}
        </div>
    </div>
  );

  const InputField = ({ label, value, onChange, placeholder, disabled, type="text", className }: any) => (
    <div className={className}>
        <Label>{label}</Label>
        <div className="relative">
            <input 
                type={type}
                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner disabled:text-gray-500"
                placeholder={placeholder}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled || isView}
            />
            {label.includes('NOMOR') && <Home size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />}
            {label.includes('KAPASITAS') && <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />}
            {label.includes('BIAYA') && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 pointer-events-none">RP</span>}
        </div>
    </div>
  );

  const SelectField = ({ label, value, onChange, options, disabled, className }: any) => (
    <div className={className}>
        <Label>{label}</Label>
        <div className="relative">
            <select 
                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer uppercase shadow-inner"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled || isView}
            >
                {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
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
                    {mode === 'create' ? 'TAMBAH MASTER POD' : mode === 'edit' ? 'EDIT MASTER POD' : 'DETAIL MASTER POD'}
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">MANAJEMEN UNIT HUNIAN & TARIF SEWA</p>
              </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-12 overflow-y-auto custom-scrollbar flex-1 bg-[#FBFBFB]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Card: Detail Unit */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <SectionHeader icon={Layers} title="DETAIL UNIT HUNIAN" />
                        
                        <div className="space-y-6">
                            <InputField 
                                label="NOMOR KAMAR" 
                                value={form.nomorKamar} 
                                onChange={(val: string) => setForm({...form, nomorKamar: val})}
                                placeholder="CONTOH: 201"
                            />
                            
                            <div className="grid grid-cols-2 gap-6">
                                <SelectField 
                                    label="LANTAI"
                                    value={form.lantai}
                                    onChange={(val: string) => setForm({...form, lantai: val})}
                                    options={['LT 1', 'LT 2', 'LT 3', 'LT 4']}
                                />
                                <SelectField 
                                    label="GENDER"
                                    value={form.gender}
                                    onChange={(val: string) => setForm({...form, gender: val as any})}
                                    options={['PRIA', 'PEREMPUAN', 'CAMPUR']}
                                />
                            </div>

                            <SelectField 
                                label="TIPE KAMAR"
                                value={form.jenisKamar}
                                onChange={(val: string) => setForm({...form, jenisKamar: val})}
                                options={['SINGLE BED', 'DOUBLE BED', 'QUADRUPLE BED']}
                            />

                            <div className="grid grid-cols-2 gap-6">
                                <InputField 
                                    label="KAPASITAS (PAX)" 
                                    value={form.kapasitas} 
                                    onChange={(val: string) => setForm({...form, kapasitas: parseInt(val) || 0})}
                                    type="number"
                                    placeholder="1"
                                />
                                <SelectField 
                                    label="STATUS"
                                    value={form.status}
                                    onChange={(val: string) => setForm({...form, status: val as any})}
                                    options={['ACTIVE', 'INACTIVE', 'MAINTENANCE']}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card: Fasilitas */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <SectionHeader icon={Zap} title="FASILITAS UNIT & GEDUNG" />
                        
                        <div className="grid grid-cols-3 gap-3">
                            {FACILITIES_CONFIG.map((fac) => {
                                const isActive = form.facilities?.[fac.key as keyof typeof form.facilities];
                                return (
                                    <button
                                        key={fac.key}
                                        onClick={() => toggleFacility(fac.key as any)}
                                        disabled={isView}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left group ${
                                            isActive 
                                            ? 'bg-black border-black text-white shadow-md' 
                                            : 'bg-[#F8F9FA] border-transparent text-gray-400 hover:border-gray-200'
                                        }`}
                                    >
                                        <fac.icon size={14} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'} />
                                        <span className={`text-[10px] font-black uppercase tracking-tight ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-black'}`}>
                                            {fac.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Card: Pricelist Terbaru */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <SectionHeader icon={DollarSign} title="PRICELIST TERBARU" />
                            <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                <TrendingUp size={12} /> Rate Increased
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label>BIAYA AWAL (RP)</Label>
                                <div className="bg-[#F8F9FA] rounded-2xl px-6 py-5 text-[14px] font-black text-black">
                                    {parseInt(form.biayaAwal || '0').toLocaleString('id-ID')}
                                </div>
                            </div>
                            <div>
                                <Label>BIAYA TERBARU (RP)</Label>
                                <div className={`relative rounded-2xl px-6 py-5 border ${isView ? 'bg-[#F8F9FA] border-transparent' : 'bg-blue-50 border-blue-200'}`}>
                                    {isView ? (
                                        <span className="text-[14px] font-black text-blue-600">
                                            {parseInt(form.biayaTerbaru || '0').toLocaleString('id-ID')}
                                        </span>
                                    ) : (
                                        <input 
                                            type="number"
                                            className="w-full bg-transparent border-none text-[14px] font-black text-blue-600 outline-none placeholder:text-blue-300"
                                            value={form.biayaTerbaru}
                                            onChange={(e) => setForm({...form, biayaTerbaru: e.target.value})}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card: Riwayat Pricelist */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
                                    <Tag size={16} />
                                </div>
                                <div>
                                    <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em] leading-none">RIWAYAT PRICELIST UNIT</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">EVOLUSI TARIF SEWA KAMAR</p>
                                </div>
                            </div>
                            {!isView && (
                                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center gap-2">
                                    <Plus size={12} /> Log Harga
                                </button>
                            )}
                        </div>

                        <div className="bg-[#F8F9FA] rounded-2xl p-4">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200">
                                        <th className="pb-3 pl-2">TANGGAL</th>
                                        <th className="pb-3 text-right">TARIF</th>
                                        <th className="pb-3 pl-6">CATATAN</th>
                                        {!isView && <th className="pb-3 text-right pr-2">AKSI</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {form.priceHistory && form.priceHistory.length > 0 ? (
                                        form.priceHistory.map((hist, idx) => (
                                            <tr key={idx} className="group">
                                                <td className="py-3 pl-2 text-[10px] font-bold text-black">{hist.date}</td>
                                                <td className="py-3 text-right text-[10px] font-black text-blue-600">Rp {hist.price}</td>
                                                <td className="py-3 pl-6 text-[10px] font-medium text-gray-500 italic">{hist.note}</td>
                                                {!isView && (
                                                    <td className="py-3 text-right pr-2">
                                                        <button className="text-gray-300 hover:text-red-500"><Trash2 size={12} /></button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={4} className="py-4 text-center text-[10px] text-gray-400 italic">Belum ada riwayat harga</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Card: Riwayat Transaksi */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-black rounded-full text-white shadow-lg">
                                    <History size={16} />
                                </div>
                                <div>
                                    <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em] leading-none">RIWAYAT TRANSAKSI BULANAN</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">DATA PEMBAYARAN SEWA & UTILITAS LISTRIK</p>
                                </div>
                            </div>
                            {!isView && !isAddingTransaction && (
                                <button onClick={() => setIsAddingTransaction(true)} className="bg-black text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-2 shadow-lg">
                                    <Plus size={12} /> Log Tagihan
                                </button>
                            )}
                        </div>

                        {/* Summary Widget */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm"><Zap size={16} /></div>
                                <div>
                                    <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest">AVG LISTRIK</p>
                                    <p className="text-[12px] font-black text-blue-700">150.3 kWh</p>
                                </div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg text-green-600 shadow-sm"><History size={16} /></div>
                                <div>
                                    <p className="text-[8px] font-black text-green-400 uppercase tracking-widest">AVG TAGIHAN</p>
                                    <p className="text-[12px] font-black text-green-700">Rp 225.375</p>
                                </div>
                            </div>
                        </div>

                        {/* Add Transaction Form */}
                        {isAddingTransaction && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 animate-in slide-in-from-top-2">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="col-span-2 md:col-span-1">
                                        <Label>BULAN/PERIODE</Label>
                                        <input type="text" className="w-full p-2 text-[10px] rounded-lg border border-gray-200" placeholder="CONTOH: MAR 2024" value={newTrans.period} onChange={e => setNewTrans({...newTrans, period: e.target.value})} />
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <Label>PEMBAYARAN SEWA</Label>
                                        <input type="number" className="w-full p-2 text-[10px] rounded-lg border border-gray-200" value={newTrans.rentCost} onChange={e => setNewTrans({...newTrans, rentCost: e.target.value})} />
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <Label>PEMAKAIAN (KWH)</Label>
                                        <input type="number" className="w-full p-2 text-[10px] rounded-lg border border-gray-200" value={newTrans.kwh} onChange={e => setNewTrans({...newTrans, kwh: e.target.value})} />
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <Label>TAGIHAN LISTRIK</Label>
                                        <input type="number" className="w-full p-2 text-[10px] rounded-lg border border-gray-200" value={newTrans.electricityCost} onChange={e => setNewTrans({...newTrans, electricityCost: e.target.value})} />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setIsAddingTransaction(false)} className="px-4 py-2 bg-white text-gray-500 rounded-lg text-[10px] font-bold uppercase hover:bg-gray-100">BATAL</button>
                                    <button onClick={handleAddTransaction} className="px-4 py-2 bg-black text-white rounded-lg text-[10px] font-bold uppercase hover:bg-gray-800">SIMPAN RECORD</button>
                                </div>
                            </div>
                        )}

                        <div className="overflow-hidden rounded-2xl border border-gray-100">
                            <table className="w-full text-left">
                                <thead className="bg-[#FAFAFA] border-b border-gray-100">
                                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="py-4 pl-6">PERIODE</th>
                                        <th className="py-4 text-right">SEWA</th>
                                        <th className="py-4 text-center text-blue-400">KWH</th>
                                        <th className="py-4 text-right text-blue-600">LISTRIK</th>
                                        {!isView && <th className="py-4 text-center pr-4">AKSI</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {form.transactions && form.transactions.length > 0 ? (
                                        form.transactions.map((t, idx) => (
                                            <tr key={idx} className="group hover:bg-gray-50/50">
                                                <td className="py-4 pl-6 text-[10px] font-black text-black uppercase">{t.period}</td>
                                                <td className="py-4 text-right text-[10px] font-medium text-gray-500">Rp {parseInt(t.rentCost || '0').toLocaleString('id-ID')}</td>
                                                <td className="py-4 text-center text-[11px] font-black text-blue-600">{t.kwh}</td>
                                                <td className="py-4 text-right text-[11px] font-black text-blue-600">Rp {parseInt(t.electricityCost || '0').toLocaleString('id-ID')}</td>
                                                {!isView && (
                                                    <td className="py-4 text-center pr-4">
                                                        <div className="flex justify-center gap-2">
                                                            <button className="text-gray-300 hover:text-black"><Edit3 size={12}/></button>
                                                            <button onClick={() => handleDeleteTransaction(idx)} className="text-gray-300 hover:text-red-500"><Trash2 size={12}/></button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={5} className="py-6 text-center text-[10px] text-gray-400 italic">Belum ada transaksi</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

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
                <Save size={16} strokeWidth={2.5} /> SIMPAN DATA
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
