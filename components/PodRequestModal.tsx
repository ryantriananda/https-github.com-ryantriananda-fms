import React, { useState, useEffect } from 'react';
import { X, Send, Calendar, MapPin, User, MessageSquare, Bed, Save, CheckCircle2, XCircle, Briefcase, Mail, Phone, Monitor, Wind, Zap, Box, Lock, Droplets, Utensils, Shirt, Waves, Home, Layers, Check } from 'lucide-react';
import { PodRequestRecord, UserRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<PodRequestRecord>) => void;
  initialData?: PodRequestRecord | null;
  mode?: 'create' | 'edit' | 'view' | 'approve';
  currentUser?: UserRecord;
}

// Custom Icons to match TenantPodModal
const BoxIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>);
const ExpandIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>);
const BikeIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>);
const CarIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h8"/></svg>);
const CoffeeIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Z"/><path d="M6 2v2"/></svg>);
const DumbbellIcon = ({ size, className }: any) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>);

const FACILITIES_CONFIG = [
    { key: 'meja', label: 'MEJA', icon: Monitor },
    { key: 'ac', label: 'AC', icon: Wind },
    { key: 'kursi', label: 'KURSI', icon: User },
    { key: 'colokan', label: 'COLOKAN', icon: Zap },
    { key: 'lemari', label: 'LEMARI', icon: BoxIcon },
    { key: 'cermin', label: 'CERMIN', icon: ExpandIcon },
    { key: 'parkirMotor', label: 'PARKIR MOTOR', icon: BikeIcon },
    { key: 'parkirMobil', label: 'PARKIR MOBIL', icon: CarIcon },
    { key: 'kmLuar', label: 'KM. LUAR', icon: Droplets },
    { key: 'kmDalam', label: 'KM. DALAM', icon: Droplets },
    { key: 'gym', label: 'GYM', icon: DumbbellIcon },
    { key: 'pantry', label: 'PANTRY', icon: CoffeeIcon },
    { key: 'lokerPantry', label: 'LOKER PANTRY', icon: BoxIcon },
    { key: 'lokerBarang', label: 'LOKER BARANG', icon: Lock },
    { key: 'kitchen', label: 'KITCHEN', icon: Utensils },
    { key: 'laundry', label: 'LAUNDRY', icon: Shirt },
    { key: 'kolamRenang', label: 'KOLAM RENANG', icon: Waves },
];

export const PodRequestModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    currentUser 
}) => {
  const [form, setForm] = useState<Partial<PodRequestRecord>>({
    requestDate: new Date().toISOString().split('T')[0],
    reason: '',
    floorPreference: 'LT 2 PRIA',
    roomType: 'SINGLE BED',
    status: 'Pending',
    gender: 'Pria',
    isExpat: false,
    facilities: {
        meja: true, ac: true, kursi: true, colokan: true, lemari: true, cermin: true,
        parkirMotor: false, parkirMobil: false, kmLuar: false, kmDalam: true,
        gym: false, pantry: false, lokerPantry: false, lokerBarang: false,
        kitchen: false, laundry: false, kolamRenang: false
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            requestDate: new Date().toISOString().split('T')[0],
            reason: '',
            floorPreference: 'LT 2 PRIA',
            roomType: 'SINGLE BED',
            status: 'Pending',
            requesterName: currentUser?.name || 'AAN JUNAIDI',
            departemen: currentUser?.department || 'AFTER SALES',
            requesterRole: currentUser?.role || 'TECHNICIAN',
            gender: 'Pria',
            isExpat: false,
            facilities: {
                meja: true, ac: true, kursi: true, colokan: true, lemari: true, cermin: true,
                parkirMotor: false, parkirMobil: false, kmLuar: false, kmDalam: true,
                gym: false, pantry: false, lokerPantry: false, lokerBarang: false,
                kitchen: false, laundry: false, kolamRenang: false
            }
        });
      }
    }
  }, [isOpen, initialData, currentUser]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isApprove = mode === 'approve';

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 ml-1">
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
            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner uppercase disabled:opacity-50"
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || isView || isApprove}
        />
    </div>
  );

  const toggleFacility = (key: keyof NonNullable<PodRequestRecord['facilities']>) => {
      if (isView || isApprove) return;
      setForm(prev => ({
          ...prev,
          facilities: {
              ...prev.facilities!,
              [key]: !prev.facilities![key]
          }
      }));
  };

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
                    {mode === 'create' ? 'AJUKAN PERMINTAAN POD' : mode === 'approve' ? 'PERSETUJUAN PERMINTAAN POD' : 'DETAIL PERMINTAAN POD'}
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">FORMULIR PENGAJUAN UNIT HUNIAN POD</p>
              </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-12 overflow-y-auto custom-scrollbar flex-1 bg-[#FBFBFB]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                
                {/* Section: Requester Info */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-full">
                    <SectionHeader icon={User} title="INFORMASI PEMOHON" />
                    <div className="space-y-6">
                        <InputField 
                            label="NAMA LENGKAP" 
                            value={form.requesterName} 
                            onChange={(val: string) => setForm({...form, requesterName: val})}
                            placeholder="MASUKKAN NAMA LENGKAP..."
                        />
                        <div className="grid grid-cols-2 gap-6">
                            <InputField label="POSISI" value={form.requesterRole} onChange={(val: string) => setForm({...form, requesterRole: val})} placeholder="JABATAN" />
                            <InputField label="DEPARTEMEN" value={form.departemen} onChange={(val: string) => setForm({...form, departemen: val})} placeholder="DEPARTEMEN" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                             <div>
                                <Label>JENIS KELAMIN</Label>
                                <div className="flex gap-2">
                                    {['Pria', 'Perempuan'].map(g => (
                                        <button
                                            key={g}
                                            onClick={() => !(isView || isApprove) && setForm({...form, gender: g as any})}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                form.gender === g ? 'bg-black text-white shadow-md' : 'bg-[#F8F9FA] text-gray-400'
                                            }`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                             </div>
                             <div>
                                <Label>TIPE PEKERJA</Label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => !(isView || isApprove) && setForm({...form, isExpat: true})}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            form.isExpat ? 'bg-black text-white shadow-md' : 'bg-[#F8F9FA] text-gray-400'
                                        }`}
                                    >
                                        EXPAT
                                    </button>
                                    <button
                                        onClick={() => !(isView || isApprove) && setForm({...form, isExpat: false})}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            !form.isExpat ? 'bg-black text-white shadow-md' : 'bg-[#F8F9FA] text-gray-400'
                                        }`}
                                    >
                                        NON-EXPAT
                                    </button>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Section: Preference Info */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-full">
                    <SectionHeader icon={Layers} title="PREFERENSI UNIT" />
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label>LANTAI PREFERENSI</Label>
                                <select 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none appearance-none uppercase shadow-inner"
                                    value={form.floorPreference}
                                    onChange={(e) => setForm({...form, floorPreference: e.target.value})}
                                    disabled={isView || isApprove}
                                >
                                    <option value="LT 2 PRIA">LT 2 PRIA</option>
                                    <option value="LT 2 PEREMPUAN">LT 2 PEREMPUAN</option>
                                    <option value="LT 3 PRIA">LT 3 PRIA</option>
                                    <option value="LT 3 PEREMPUAN">LT 3 PEREMPUAN</option>
                                </select>
                            </div>
                            <div>
                                <Label>TIPE KAMAR</Label>
                                <select 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none appearance-none uppercase shadow-inner"
                                    value={form.roomType}
                                    onChange={(e) => setForm({...form, roomType: e.target.value})}
                                    disabled={isView || isApprove}
                                >
                                    <option value="SINGLE BED">SINGLE BED</option>
                                    <option value="DOUBLE BED">DOUBLE BED</option>
                                    <option value="QUADRUPLE BED">QUADRUPLE BED</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <Label>ALASAN PENGAJUAN</Label>
                            <textarea 
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[12px] font-medium text-black outline-none resize-none min-h-[120px] shadow-inner"
                                placeholder="Jelaskan kebutuhan hunian anda..."
                                value={form.reason}
                                onChange={(e) => setForm({...form, reason: e.target.value})}
                                disabled={isView || isApprove}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Facilities Checklist Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-12">
                <SectionHeader icon={Zap} title="FASILITAS YANG DIBUTUHKAN" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {FACILITIES_CONFIG.map((fac) => {
                        const isActive = form.facilities?.[fac.key as keyof typeof form.facilities];
                        return (
                            <button
                                key={fac.key}
                                onClick={() => toggleFacility(fac.key as any)}
                                disabled={isView || isApprove}
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
        </div>

        {/* Footer */}
        <div className="px-12 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
          {isApprove ? (
            <>
                <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 bg-white border border-gray-200 rounded-[1.2rem] hover:bg-gray-50 transition-all">
                    CANCEL
                </button>
                <button 
                    onClick={() => onSave({...form, status: 'Rejected'})} 
                    className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white bg-red-600 rounded-[1.2rem] hover:bg-red-700 shadow-xl shadow-red-200 transition-all active:scale-95 flex items-center gap-3"
                >
                    <XCircle size={18} strokeWidth={2.5} /> REJECT
                </button>
                <button 
                    onClick={() => onSave({...form, status: 'Approved'})} 
                    className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white bg-[#10B981] rounded-[1.2rem] hover:bg-green-600 shadow-xl shadow-green-200 transition-all active:scale-95 flex items-center gap-3"
                >
                    <CheckCircle2 size={18} strokeWidth={2.5} /> APPROVE
                </button>
            </>
          ) : (
            <>
                <button onClick={onClose} className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 bg-white border border-gray-200 rounded-[1.2rem] hover:bg-gray-50 hover:text-black transition-all">
                    {isView ? 'CLOSE' : 'BATAL'}
                </button>
                {!isView && (
                    <button 
                        onClick={() => onSave(form)} 
                        className="px-20 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white bg-black rounded-[1.2rem] hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
                    >
                        <Save size={16} strokeWidth={2.5} /> {initialData ? 'SIMPAN PERUBAHAN' : 'KIRIM PENGAJUAN'}
                    </button>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};