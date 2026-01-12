
import React, { useState, useEffect } from 'react';
import { X, Save, User, MapPin, Mail, Smartphone, CreditCard, ChevronDown, Users, CheckCircle2, Baby, MessageSquare, Shield, Clock, Calendar } from 'lucide-react';
import { LogBookRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<LogBookRecord>) => void;
  initialData?: LogBookRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const LogBookModal: React.FC<Props> = ({ 
    isOpen, 
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
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
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
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;
  const isView = mode === 'view';

  const handleSave = () => {
    onSave(form);
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon size={18} className="text-black" />
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
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
                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 shadow-sm uppercase transition-all"
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
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className="bg-[#F8F9FA] w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-[1rem] flex items-center justify-center text-white shadow-xl shadow-black/20">
                  <Users size={22} strokeWidth={2.5} />
              </div>
              <h2 className="text-[16px] font-black text-black uppercase tracking-[0.2em] leading-none">
                {mode === 'create' ? 'CREATE LOG BOOK ENTRY' : 'LOG BOOK ENTRY DETAILS'}
              </h2>
          </div>
          <button className="text-gray-300 hover:text-black transition-all p-1" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Left Column: Guest Details */}
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full flex flex-col">
                        <SectionHeader icon={User} title="GUEST DETAILS" />
                        
                        <div className="space-y-6">
                              <InputField 
                                  label="NAMA TAMU" 
                                  placeholder="Nama Lengkap..."
                                  value={form.namaTamu}
                                  onChange={(e: any) => setForm({...form, namaTamu: e.target.value})}
                                  icon={User}
                              />

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <InputField 
                                      label="EMAIL" 
                                      placeholder="email@example.com"
                                      value={form.email}
                                      onChange={(e: any) => setForm({...form, email: e.target.value})}
                                      icon={Mail}
                                  />
                                  <InputField 
                                      label="NOMOR HP" 
                                      placeholder="0812..."
                                      value={form.phone}
                                      onChange={(e: any) => setForm({...form, phone: e.target.value})}
                                      icon={Smartphone}
                                  />
                              </div>

                              <div>
                                  <Label>KATEGORI TAMU</Label>
                                  <div className="relative">
                                      <select 
                                          className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer uppercase shadow-sm"
                                          value={form.kategoriTamu}
                                          onChange={(e) => setForm({...form, kategoriTamu: e.target.value})}
                                          disabled={isView}
                                      >
                                          <option value="CUSTOMER">CUSTOMER</option>
                                          <option value="SUPPLIER">SUPPLIER</option>
                                          <option value="INTERNAL">INTERNAL</option>
                                          <option value="CONTRACTOR">CONTRACTOR</option>
                                          <option value="INTERVIEWEE">INTERVIEWEE</option>
                                          <option value="OTHERS">OTHERS</option>
                                          <option value="VENDOR">VENDOR</option>
                                      </select>
                                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                      <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                  </div>
                              </div>
                        </div>
                    </div>

                    {/* Right Column: Identity & Visit Details */}
                    <div className="flex flex-col gap-6">
                        
                        {/* Identity & Access */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                            <SectionHeader icon={Shield} title="IDENTITY & ACCESS" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField 
                                    label="NO. KTP/SIM/PASSPORT" 
                                    placeholder="3201..."
                                    value={form.identityCardNumber}
                                    onChange={(e: any) => setForm({...form, identityCardNumber: e.target.value})}
                                    icon={CreditCard}
                                />
                                <InputField 
                                    label="NO. VISITOR CARD" 
                                    placeholder="VC-001"
                                    value={form.visitorCardNumber}
                                    onChange={(e: any) => setForm({...form, visitorCardNumber: e.target.value})}
                                    icon={CreditCard}
                                />
                            </div>
                        </div>

                        {/* Visit Details */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex-1">
                            <SectionHeader icon={MapPin} title="VISIT DETAILS" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <Label>LOKASI MODENA</Label>
                                    <div className="relative">
                                      <select 
                                          className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer uppercase shadow-sm"
                                          value={form.lokasiModena}
                                          onChange={(e) => setForm({...form, lokasiModena: e.target.value})}
                                          disabled={isView}
                                      >
                                          <option value="SATRIO">SATRIO</option>
                                          <option value="SURYOPRANOTO">SURYOPRANOTO</option>
                                          <option value="WAREHOUSE">WAREHOUSE</option>
                                          <option value="KEMANG">KEMANG</option>
                                          <option value="SURYO">SURYO</option>
                                      </select>
                                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                      <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <InputField 
                                    label="TANGGAL" 
                                    type="date"
                                    value={form.tanggalKunjungan}
                                    onChange={(e: any) => setForm({...form, tanggalKunjungan: e.target.value})}
                                    icon={Calendar}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <InputField 
                                    label="TIME LOG IN" 
                                    type="time"
                                    value={form.jamDatang}
                                    onChange={(e: any) => setForm({...form, jamDatang: e.target.value})}
                                    icon={Clock}
                                />
                                <InputField 
                                    label="TIME LOG OUT" 
                                    type="time"
                                    value={form.jamPulang}
                                    onChange={(e: any) => setForm({...form, jamPulang: e.target.value})}
                                    icon={Clock}
                                    placeholder="--:--"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breakdown Visitor */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <SectionHeader icon={Users} title="BREAKDOWN VISITOR" />
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 mb-3 shadow-sm border border-pink-100">
                                <Users size={20} />
                            </div>
                            <Label>GROUP / ADULT</Label>
                            <input 
                                type="number" 
                                className="w-24 text-center bg-[#F8F9FA] border-none rounded-xl py-3 text-[16px] font-black text-black outline-none focus:ring-2 focus:ring-black/5"
                                value={form.countAdult}
                                onChange={(e) => setForm({...form, countAdult: parseInt(e.target.value) || 0})}
                                disabled={isView}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-3 shadow-sm border border-blue-100">
                                <CheckCircle2 size={20} />
                            </div>
                            <Label>INDIVIDUAL</Label>
                            <input 
                                type="number" 
                                className="w-24 text-center bg-[#F8F9FA] border-none rounded-xl py-3 text-[16px] font-black text-black outline-none focus:ring-2 focus:ring-black/5"
                                value={form.countIndividual}
                                onChange={(e) => setForm({...form, countIndividual: parseInt(e.target.value) || 0})}
                                disabled={isView}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-3 shadow-sm border border-orange-100">
                                <Baby size={20} />
                            </div>
                            <Label>CHILD / OTHER</Label>
                            <input 
                                type="number" 
                                className="w-24 text-center bg-[#F8F9FA] border-none rounded-xl py-3 text-[16px] font-black text-black outline-none focus:ring-2 focus:ring-black/5"
                                value={form.countChild}
                                onChange={(e) => setForm({...form, countChild: parseInt(e.target.value) || 0})}
                                disabled={isView}
                            />
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <SectionHeader icon={MessageSquare} title="CATATAN / NOTES" />
                    <textarea 
                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 resize-none transition-all shadow-inner italic"
                        rows={3}
                        placeholder="Tulis catatan kunjungan di sini..."
                        value={form.note}
                        onChange={(e: any) => setForm({...form, note: e.target.value})}
                        disabled={isView}
                    />
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            {isView ? (
                <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 transition-all shadow-xl shadow-black/20">
                    TUTUP
                </button>
            ) : (
                <>
                    <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">
                        BATAL
                    </button>
                    <button onClick={handleSave} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2">
                        <Save size={16} strokeWidth={2.5} /> SIMPAN DATA
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};
