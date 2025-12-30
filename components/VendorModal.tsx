
import React, { useState, useEffect } from 'react';
import { X, Save, Users, Mail, Phone, MapPin, Tag, User, Briefcase, FileText } from 'lucide-react';
import { VendorRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<VendorRecord>) => void;
  initialData?: VendorRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const VendorModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [activeTab, setActiveTab] = useState('GENERAL INFO');
  const [form, setForm] = useState<Partial<VendorRecord>>({
    status: 'Active',
    type: 'Goods',
    vendorCode: '[AUTO]'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({ status: 'Active', type: 'Goods', vendorCode: '[AUTO]', vendorName: '', email: '', phone: '', address: '', category: '', picName: '' });
      }
      setActiveTab('GENERAL INFO');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const tabs = ['GENERAL INFO', 'CONTACT DETAILS'];

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, field, type = "text", disabled = false, placeholder = "", icon: Icon }: any) => (
    <div className="relative">
      <Label required={!isView}>{label}</Label>
      <div className="relative">
        <input 
          type={type} 
          disabled={isView || disabled}
          className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-300 shadow-sm"
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
      <div className="bg-[#FBFBFB] w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Users size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Register Vendor' : mode === 'edit' ? 'Update Vendor' : 'Vendor Details'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Supplier Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[3px] 
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
            {activeTab === 'GENERAL INFO' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="md:col-span-2">
                        <InputField label="Vendor Name" value={form.vendorName} field="vendorName" placeholder="Enter company name..." icon={Briefcase} />
                    </div>
                    
                    <InputField label="Vendor Code" value={form.vendorCode} field="vendorCode" disabled={true} icon={FileText} />
                    
                    <div>
                        <Label required>Status</Label>
                        <div className="flex gap-2">
                            {['Active', 'Inactive', 'Blacklist'].map(status => (
                                <button
                                    key={status}
                                    disabled={isView}
                                    onClick={() => setForm({...form, status: status as any})}
                                    className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl border transition-all ${
                                        form.status === status
                                        ? 'bg-black text-white border-black shadow-lg'
                                        : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label required>Type</Label>
                        <div className="relative">
                            <select 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 appearance-none shadow-sm cursor-pointer"
                                value={form.type || ''}
                                onChange={(e) => setForm({...form, type: e.target.value})}
                            >
                                <option value="Goods">Goods</option>
                                <option value="Service">Service</option>
                                <option value="Both">Both</option>
                            </select>
                            <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                        </div>
                    </div>

                    <InputField label="Category" value={form.category} field="category" placeholder="e.g. IT, Office Supplies..." icon={Tag} />
                </div>
            )}

            {activeTab === 'CONTACT DETAILS' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputField label="Email Address" value={form.email} field="email" type="email" placeholder="contact@vendor.com" icon={Mail} />
                        <InputField label="Phone Number" value={form.phone} field="phone" placeholder="021-xxxx..." icon={Phone} />
                    </div>
                    
                    <div>
                        <Label>Full Address</Label>
                        <div className="relative">
                            <textarea 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-300 shadow-sm min-h-[120px]"
                                value={form.address || ''}
                                placeholder="Enter full address..."
                                onChange={(e) => setForm({...form, address: e.target.value})}
                            />
                            <MapPin size={18} className="absolute left-4 top-6 text-gray-300" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputField label="PIC Name" value={form.picName} field="picName" placeholder="Person in Charge" icon={User} />
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> Save Vendor
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
