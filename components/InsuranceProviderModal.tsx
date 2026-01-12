
import React, { useState, useEffect } from 'react';
import { X, Save, Building, User, Phone, Mail, MapPin, Star } from 'lucide-react';
import { InsuranceProviderRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<InsuranceProviderRecord>) => void;
  initialData?: InsuranceProviderRecord | null;
  mode?: 'create' | 'edit';
}

export const InsuranceProviderModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create'
}) => {
  const [form, setForm] = useState<Partial<InsuranceProviderRecord>>({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    rating: 5
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            name: '',
            contactPerson: '',
            phone: '',
            email: '',
            address: '',
            rating: 5
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, field, type = "text", placeholder = "", icon: Icon }: any) => (
    <div className="relative">
      <Label required>{label}</Label>
      <div className="relative">
        <input 
            type={type} 
            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm"
            value={value || ''}
            placeholder={placeholder}
            onChange={(e) => setForm({...form, [field]: e.target.value})}
        />
        {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Building size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Add Insurance Provider' : 'Edit Provider'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Vendor Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar">
            <div className="space-y-8">
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <InputField label="Provider Name" value={form.name} field="name" placeholder="e.g. AXA Mandiri" icon={Building} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Contact Person" value={form.contactPerson} field="contactPerson" placeholder="PIC Name" icon={User} />
                        <InputField label="Phone Number" value={form.phone} field="phone" placeholder="021-xxxx" icon={Phone} />
                    </div>

                    <InputField label="Email Address" value={form.email} field="email" type="email" placeholder="claim@provider.com" icon={Mail} />
                    
                    <div>
                        <Label required>Address</Label>
                        <div className="relative">
                            <textarea 
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm min-h-[100px] resize-none"
                                value={form.address}
                                onChange={(e) => setForm({...form, address: e.target.value})}
                                placeholder="Full Address..."
                            />
                            <MapPin size={18} className="absolute left-4 top-6 text-gray-300" />
                        </div>
                    </div>

                    <div>
                        <Label>Rating (1-5)</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    onClick={() => setForm({...form, rating: star})}
                                    className={`p-2 rounded-lg transition-all ${
                                        (form.rating || 0) >= star ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 bg-gray-50'
                                    }`}
                                >
                                    <Star size={24} fill={(form.rating || 0) >= star ? "currentColor" : "none"} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Cancel</button>
          <button 
              onClick={() => onSave(form)} 
              className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
          >
              <Save size={18} strokeWidth={2.5} /> Save Provider
          </button>
        </div>
      </div>
    </div>
  );
};
