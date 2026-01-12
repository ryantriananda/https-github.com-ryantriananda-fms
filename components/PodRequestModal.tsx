
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
            department: currentUser?.department || 'AFTER SALES',
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

  const toggleFacility = (key: keyof typeof form.facilities) => {
    if (isView || isApprove) return;
    setForm(prev => ({
        ...prev,
        facilities: {
            ...prev.facilities!,
            [key]: !prev.facilities![key]
        }
    }));
  };

  const Label = ({ children, icon: Icon }: { children?: React.ReactNode, icon?: any }) => (
    <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon size={12} className="text-black" />}
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            {children}
        </label>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className="bg-[#F8F9FA] w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-black rounded-[1rem] flex items-center justify-center text-white shadow-xl shadow-black/20">
                  <Home size={22} strokeWidth={2.5} />
              </div>
              <div>
                  <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'TAMBAH DATA PERMINTAAN POD' : mode === 'approve' ? 'PERSETUJUAN PERMINTAAN POD' : 'DETAIL DATA PERMINTAAN POD'}
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">
                      {mode === 'create' ? 'FORMULIR PENGAJUAN HUNIAN POD BARU' : mode === 'approve' ? 'TINJAU DAN BERIKAN KEPUTUSAN' : 'INFORMASI PENGAJUAN HUNIAN POD'}
                  </p>
              </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1 bg-[#FBFBFB]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column: Preferences */}
                <div className="space-y-8">
                     <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Layers size={16} className="text-black" />
                            <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">PREFERENSI KAMAR</h3>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <Label>JENIS KAMAR</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView || isApprove}
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer uppercase"
                                        value={form.roomType}
                                        onChange={(e) => setForm({...form, roomType: e.target.value})}
                                    >
                                        <option value="SINGLE BED">SINGLE BED</option>
                                        <option value="DOUBLE BED">DOUBLE BED</option>
                                        <option value="QUADRUPLE BED">QUADRUPLE BED</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Label>LANTAI (OPSIONAL)</Label>
                                    {isApprove && <span className="text-[8px] font-bold text-blue-500 italic uppercase">- EDITABLE DURING APPROVAL</span>}
                                </div>
                                <div className="relative">
                                    <select 
                                        disabled={isView} // Allow editing in Approve mode for allocation
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer uppercase"
                                        value={form.floorPreference}
                                        onChange={(e) => setForm({...form, floorPreference: e.target.value})}
                                    >
                                        <option value="LT 2 PRIA">LT 2 PRIA</option>
                                        <option value="LT 2 PEREMPUAN">LT 2 PEREMPUAN</option>
                                        <option value="LT 3 PRIA">LT 3 PRIA</option>
                                        <option value="LT 3 PEREMPUAN">LT 3 PEREMPUAN</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <Label>JENIS KELAMIN</Label>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => !isView && !isApprove && setForm({...form, gender: 'Pria'})}
                                        disabled={isView || isApprove}
                                        className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            form.gender === 'Pria' 
                                            ? 'bg-black text-white shadow-lg' 
                                            : 'bg-[#F8F9FA] text-gray-400 hover:bg-gray-100'
                                        }`}
                                    >
                                        PRIA
                                    </button>
                                    <button
                                        onClick={() => !isView && !isApprove && setForm({...form, gender: 'Perempuan'})}
                                        disabled={isView || isApprove}
                                        className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            form.gender === 'Perempuan' 
                                            ? 'bg-black text-white shadow-lg' 
                                            : 'bg-[#F8F9FA] text-gray-400 hover:bg-gray-100'
                                        }`}
                                    >
                                        PEREMPUAN
                                    </button>
                                </div>
                            </div>
                        </div>
                     </div>

                     {/* Facilities Grid */}
                     <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap size={16} className="text-black" />
                            <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">FASILITAS KAMAR ({form.roomType})</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            {FACILITIES_CONFIG.slice(0, 8).map((fac) => {
                                const isActive = form.facilities?.[fac.key as keyof typeof form.facilities];
                                return (
                                    <button
                                        key={fac.key}
                                        onClick={() => toggleFacility(fac.key as any)}
                                        disabled={isView || isApprove}
                                        className={`flex items-center gap-3 p-4 rounded-2xl transition-all text-left group ${
                                            isActive 
                                            ? 'bg-[#F8F9FA] text-black border border-gray-100 shadow-sm' 
                                            : 'bg-white text-gray-300 border border-transparent opacity-50'
                                        }`}
                                    >
                                        <fac.icon size={16} className={isActive ? 'text-black' : 'text-gray-300'} />
                                        <span className="text-[10px] font-black uppercase tracking-tight">
                                            {fac.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                     </div>
                </div>

                {/* Right Column: Requester Details */}
                <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm h-full">
                    <div className="flex items-center gap-3 mb-8">
                        <User size={16} className="text-black" />
                        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">DETAIL PEMOHON</h3>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <Label>NAMA LENGKAP</Label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    disabled={isView || isApprove}
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 pl-14 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all uppercase"
                                    placeholder="MASUKKAN NAMA LENGKAP..."
                                    value={form.requesterName}
                                    onChange={(e) => setForm({...form, requesterName: e.target.value})}
                                />
                                <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label>POSISI</Label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        disabled={isView || isApprove}
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 pl-14 text-[11px] font-black text-black outline-none uppercase"
                                        placeholder="CONTOH: TECHNICIAN"
                                        value={form.requesterRole}
                                        onChange={(e) => setForm({...form, requesterRole: e.target.value})}
                                    />
                                    <Briefcase size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                </div>
                            </div>
                            <div>
                                <Label>DEPARTEMEN</Label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        disabled={isView || isApprove}
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 pl-14 text-[11px] font-black text-black outline-none uppercase"
                                        placeholder="CONTOH: AFTER SALES"
                                        value={form.department}
                                        onChange={(e) => setForm({...form, department: e.target.value})}
                                    />
                                    <MapPin size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label>EMAIL</Label>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    disabled={isView || isApprove}
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 pl-14 text-[13px] font-black text-black outline-none uppercase"
                                    placeholder="CONTOH@EMAIL.COM"
                                    value={form.email || 'AAN.JUNAIDI@MODENA.COM'} 
                                    readOnly={true} // Mock read only
                                />
                                <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                            </div>
                        </div>

                        <div>
                            <Label>NOMOR HP</Label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    disabled={isView || isApprove}
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 pl-14 text-[13px] font-black text-black outline-none uppercase"
                                    placeholder="0812XXXX..."
                                    value={form.phone || '081234567890'}
                                    readOnly={true} // Mock read only
                                />
                                <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          
          {isApprove ? (
            // Approval Mode Footer
            <>
                <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                    BATAL
                </button>
                <button 
                    onClick={() => { onSave({...form, status: 'Rejected'}); onClose(); }} 
                    className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#EF4444] bg-white border border-[#EF4444] rounded-2xl hover:bg-[#FEF2F2] transition-all flex items-center gap-2"
                >
                    <XCircle size={16} strokeWidth={2.5} /> TOLAK PERMINTAAN
                </button>
                <button 
                    onClick={() => { onSave({...form, status: 'Approved'}); onClose(); }} 
                    className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all flex items-center gap-2"
                >
                    <CheckCircle2 size={16} strokeWidth={2.5} /> SETUJUI PERMINTAAN
                </button>
            </>
          ) : (
            // Create/View Mode Footer
            <>
                <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                    BATAL
                </button>
                {!isView && (
                    <button 
                        onClick={() => onSave(form)} 
                        className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
                    >
                        <Save size={18} strokeWidth={2.5} /> SIMPAN PERMINTAAN
                    </button>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
