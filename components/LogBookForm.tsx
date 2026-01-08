import React, { useState, useEffect } from 'react';
import { X, Save, User, MapPin, Mail, Smartphone, CreditCard, ChevronDown, Users, CheckCircle2, Baby, MessageSquare, Shield, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { LogBookRecord } from '../types';

interface Props {
  onClose: () => void;
  onSave: (data: Partial<LogBookRecord>) => void;
  initialData?: LogBookRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const LogBookForm: React.FC<Props> = ({ 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create'
}) => {
  const [form, setForm] = useState<Partial<LogBookRecord>>({
      tanggalKunjungan: new Date().toISOString().split('T')[0],
      jamDatang: '09:00',
      jamPulang: '',
      lokasiModena: 'SATRIO',
      kategoriTamu: 'CUSTOMER',
      countAdult: 0,
      countIndividual: 1,
      countChild: 0,
      namaTamu: '',
      email: '',
      phone: '',
      identityCardNumber: '',
      visitorCardNumber: '',
      note: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const isView = mode === 'view';

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon size={18} className="text-black" />
        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 ml-1">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, onChange, type = "text", placeholder, className, disabled, icon: Icon }: any) => (
      <div className={className}>
          <Label>{label}</Label>
          <div className="relative">
            <input 
                type={type} 
                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none focus:ring-4 focus:ring-black/5 focus:border-black placeholder:text-gray-300 shadow-sm uppercase transition-all"
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled || isView}
            />
            {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
          </div>
      </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
        {/* Local Header */}
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
                <button 
                    onClick={onClose}
                    className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-90"
                >
                    <ArrowLeft size={20} className="text-black" />
                </button>
                <div>
                    <h2 className="text-[20px] font-black text-black uppercase tracking-tight">
                        {mode === 'create' ? 'INPUT DATA TAMU BARU' : mode === 'edit' ? 'EDIT DATA TAMU' : 'DETAIL TAMU'}
                    </h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">LOG BOOK SYSTEM • GUEST REGISTRATION</p>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-white text-gray-400 rounded-xl text-[11px] font-black uppercase tracking-widest hover:text-black border border-gray-100 transition-all"
                >
                    BATAL
                </button>
                {!isView && (
                    <button 
                        onClick={() => onSave(form)}
                        className="px-10 py-3 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Save size={16} /> SIMPAN DATA
                    </button>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-8">
                {/* Guest Details */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <SectionHeader icon={User} title="GUEST INFORMATION" />
                    <div className="space-y-8">
                        <InputField 
                            label="NAMA TAMU / INSTANSI" 
                            placeholder="Contoh: PT. Maju Bersama / Budi Santoso"
                            value={form.namaTamu}
                            onChange={(e: any) => setForm({...form, namaTamu: e.target.value})}
                            icon={User}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField 
                                label="EMAIL" 
                                placeholder="email@example.com"
                                value={form.email}
                                onChange={(e: any) => setForm({...form, email: e.target.value})}
                                icon={Mail}
                            />
                            <InputField 
                                label="NOMOR HANDPHONE" 
                                placeholder="0812XXXX..."
                                value={form.phone}
                                onChange={(e: any) => setForm({...form, phone: e.target.value})}
                                icon={Smartphone}
                            />
                        </div>

                        <div>
                            <Label>KATEGORI TAMU</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['CUSTOMER', 'VENDOR', 'INTERNAL', 'OTHERS'].map((cat) => (
                                    <button
                                        key={cat}
                                        disabled={isView}
                                        onClick={() => setForm({...form, kategoriTamu: cat})}
                                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                            form.kategoriTamu === cat 
                                            ? 'bg-black text-white border-black shadow-lg scale-105' 
                                            : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <SectionHeader icon={MessageSquare} title="CATATAN KUNJUNGAN" />
                    <textarea 
                        className="w-full bg-[#FBFBFB] border-none rounded-3xl px-8 py-6 text-[14px] font-medium text-black outline-none focus:ring-4 focus:ring-black/5 placeholder:text-gray-300 resize-none transition-all shadow-inner h-40 italic"
                        placeholder="Tuliskan keperluan kunjungan atau catatan tambahan..."
                        value={form.note}
                        onChange={(e) => setForm({...form, note: e.target.value})}
                        disabled={isView}
                    />
                </div>
            </div>

            {/* Right Sidebar Content */}
            <div className="lg:col-span-4 space-y-8">
                {/* Visit Logic */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <SectionHeader icon={Calendar} title="VISIT LOG" />
                    <div className="space-y-6">
                        <div>
                            <Label>LOKASI MODENA</Label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none appearance-none cursor-pointer uppercase shadow-inner"
                                    value={form.lokasiModena}
                                    onChange={(e) => setForm({...form, lokasiModena: e.target.value})}
                                    disabled={isView}
                                >
                                    <option value="SATRIO">SATRIO</option>
                                    <option value="KEMANG">KEMANG</option>
                                    <option value="SURYO">SURYO</option>
                                    <option value="SURYOPRANOTO">SURYOPRANOTO</option>
                                    <option value="WAREHOUSE">WAREHOUSE</option>
                                </select>
                                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" />
                            </div>
                        </div>

                        <InputField 
                            label="TANGGAL" 
                            type="date"
                            value={form.tanggalKunjungan}
                            onChange={(e: any) => setForm({...form, tanggalKunjungan: e.target.value})}
                            icon={Calendar}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputField 
                                label="JAM DATANG" 
                                type="time"
                                value={form.jamDatang}
                                onChange={(e: any) => setForm({...form, jamDatang: e.target.value})}
                                icon={Clock}
                            />
                            <InputField 
                                label="JAM PULANG" 
                                type="time"
                                value={form.jamPulang}
                                onChange={(e: any) => setForm({...form, jamPulang: e.target.value})}
                                icon={Clock}
                            />
                        </div>
                    </div>
                </div>

                {/* Identity */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <SectionHeader icon={Shield} title="ACCESS & ID" />
                    <div className="space-y-6">
                        <InputField 
                            label="NO. IDENTITAS (KTP/SIM)" 
                            placeholder="3201..."
                            value={form.identityCardNumber}
                            onChange={(e: any) => setForm({...form, identityCardNumber: e.target.value})}
                            icon={CreditCard}
                        />
                        <InputField 
                            label="NO. KARTU TAMU" 
                            placeholder="VC-XXX"
                            value={form.visitorCardNumber}
                            onChange={(e: any) => setForm({...form, visitorCardNumber: e.target.value})}
                            icon={HashIcon}
                        />
                    </div>
                </div>

                {/* Breakdown */}
                <div className="bg-black p-8 rounded-[2.5rem] border border-gray-800 shadow-2xl shadow-black/30">
                    <div className="flex items-center gap-3 mb-8">
                        <Users size={18} className="text-white" />
                        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">VISITOR BREAKDOWN</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-pink-400">
                                    <User size={16} />
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">DEWASA / GRUP</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setForm({...form, countAdult: Math.max(0, (form.countAdult || 0) - 1)})} className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/20 transition-all">-</button>
                                <span className="text-[18px] font-black text-white w-8 text-center">{form.countAdult}</span>
                                <button onClick={() => setForm({...form, countAdult: (form.countAdult || 0) + 1})} className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/20 transition-all">+</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-400">
                                    <CheckCircle2 size={16} />
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">INDIVIDU</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setForm({...form, countIndividual: Math.max(0, (form.countIndividual || 0) - 1)})} className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/20 transition-all">-</button>
                                <span className="text-[18px] font-black text-white w-8 text-center">{form.countIndividual}</span>
                                <button onClick={() => setForm({...form, countIndividual: (form.countIndividual || 0) + 1})} className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/20 transition-all">+</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-orange-400">
                                    <Baby size={16} />
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">ANAK-ANAK</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setForm({...form, countChild: Math.max(0, (form.countChild || 0) - 1)})} className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/20 transition-all">-</button>
                                <span className="text-[18px] font-black text-white w-8 text-center">{form.countChild}</span>
                                <button onClick={() => setForm({...form, countChild: (form.countChild || 0) + 1})} className="w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/20 transition-all">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const HashIcon = ({ size, className }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>
    </svg>
);