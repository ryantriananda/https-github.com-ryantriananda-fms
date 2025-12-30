
import React, { useState, useEffect } from 'react';
import { X, Save, Database, ShieldCheck } from 'lucide-react';
import { GeneralMasterItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialData?: GeneralMasterItem | null;
  title: string;
}

export const GeneralMasterModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, title }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialData ? initialData.name : '');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[150] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl text-white flex items-center justify-center shadow-xl shadow-black/20">
              <Database size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[18px] font-black tracking-tight text-black uppercase leading-none">
                {initialData ? `Edit ${title}` : `Tambah ${title}`}
              </h2>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Master Database Registry</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black p-3 transition-all rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Body */}
        <div className="p-10 space-y-8 bg-[#FDFDFD]">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-black rounded-full"></div>
                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Informasi Utama</h3>
            </div>
            
            <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
                  Nama / Deskripsi {title} <span className="text-red-500 font-black">*</span>
                </label>
                <div className="relative">
                    <input 
                      type="text" 
                      autoFocus
                      className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-inner focus:ring-2 focus:ring-black/5"
                      placeholder={`Masukkan nama ${title.toLowerCase()}...`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-200">
                        <ShieldCheck size={20} />
                    </div>
                </div>
            </div>
          </div>
          
          <div className="px-4 py-3 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4">
              <div className="text-blue-500 pt-1"><Database size={16} /></div>
              <p className="text-[10px] font-bold text-blue-700 uppercase leading-relaxed tracking-wide">
                  Perubahan pada data master akan berdampak pada seluruh modul yang menggunakan referensi {title} ini.
              </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-5 text-[11px] font-black text-gray-400 bg-[#F8F9FA] rounded-2xl hover:text-black transition-all uppercase tracking-widest active:scale-95"
          >
            Batal
          </button>
          <button 
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-[2] py-5 text-[11px] font-black text-white bg-black rounded-2xl shadow-2xl shadow-black/20 hover:bg-gray-800 transition-all flex items-center justify-center gap-3 uppercase tracking-widest active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Save size={18} strokeWidth={2.5} /> Simpan Master Data
          </button>
        </div>
      </div>
    </div>
  );
};
