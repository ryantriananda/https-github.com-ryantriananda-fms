import React, { useState, useEffect } from 'react';
import { X, Save, MapPin, Building2, Home } from 'lucide-react';
import { DeliveryLocationRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<DeliveryLocationRecord>) => void;
  initialData?: DeliveryLocationRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

export const DeliveryLocationModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [form, setForm] = useState<Partial<DeliveryLocationRecord>>({
    name: '',
    address: '',
    type: 'HO'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({ name: '', address: '', type: 'HO' });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleSave = () => {
    if (form.name?.trim() && form.address?.trim()) {
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-black">
              <MapPin size={18} />
            </div>
            <h2 className="text-[13px] font-black tracking-widest text-black uppercase">
              {initialData ? 'Edit Lokasi Pengiriman' : 'Tambah Lokasi Pengiriman'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-2 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 bg-[#fbfbfb]">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">
                Nama Lokasi <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm"
                placeholder="Contoh: MODENA Head Office..."
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                disabled={isView}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">
                Tipe Lokasi <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['HO', 'Showroom', 'Warehouse'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm({...form, type: t})}
                    disabled={isView}
                    className={`py-2 text-[10px] font-black rounded-lg border transition-all uppercase tracking-widest
                      ${form.type === t 
                        ? 'bg-black text-white border-black shadow-md' 
                        : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm min-h-[100px]"
                placeholder="Input alamat pengiriman lengkap..."
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
                disabled={isView}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-black transition-all uppercase tracking-widest"
          >
            Batal
          </button>
          {!isView && (
            <button 
              onClick={handleSave}
              disabled={!form.name?.trim() || !form.address?.trim()}
              className="flex-[2] py-3 text-[11px] font-black text-white bg-black rounded-xl shadow-lg shadow-black/10 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} /> Simpan Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};