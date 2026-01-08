import React, { useState, useEffect } from 'react';
import { X, Save, Home, Lock, MessageSquare, User, Bed, Calendar } from 'lucide-react';
import { ModenaPodRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ModenaPodRecord>) => void;
  initialData?: ModenaPodRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

export const PodCensusModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [form, setForm] = useState<Partial<ModenaPodRecord>>({
    lantai: 'Lt 2 Pria',
    jenisKamar: 'Single Bed',
    nomorKamar: '',
    occupiedBy: '',
    statusLokerBarang: 'Tidak Terpakai',
    statusLokerPantry: 'Tidak Terpakai',
    jadwalLaundry: 'Tidak ada',
    keterangan: ''
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
            occupiedBy: '',
            statusLokerBarang: 'Tidak Terpakai',
            statusLokerPantry: 'Tidak Terpakai',
            jadwalLaundry: 'Tidak ada',
            keterangan: ''
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.1em] mb-1.5">
      {children}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className="bg-[#F8F9FA] w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
              <h2 className="text-[14px] font-black text-black uppercase tracking-[0.2em] leading-none">
                {mode === 'create' ? 'REGISTER NEW ROOM ASSIGNMENT' : 'ROOM ASSIGNMENT DETAILS'}
              </h2>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-1">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Section 1: Room Assignment */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
                    <div className="flex items-center gap-2 mb-6">
                        <Home size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">ROOM ASSIGNMENT</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>LANTAI</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm"
                                value={form.lantai}
                                onChange={(e) => setForm({...form, lantai: e.target.value})}
                            >
                                <option value="Lt 2 Pria">Lt 2 Pria</option>
                                <option value="Lt 2 Perempuan">Lt 2 Perempuan</option>
                                <option value="Lt 3 Pria">Lt 3 Pria</option>
                                <option value="Lt 3 Perempuan">Lt 3 Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <Label>JENIS KAMAR</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm"
                                value={form.jenisKamar}
                                onChange={(e) => setForm({...form, jenisKamar: e.target.value})}
                            >
                                <option value="Single Bed">Single Bed</option>
                                <option value="Double Bed">Double Bed</option>
                                <option value="Quadruple Bed">Quadruple Bed</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <Label>NOMOR KAMAR</Label>
                        <div className="relative">
                            <input 
                                type="text" 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black placeholder:text-gray-300 transition-all shadow-sm"
                                placeholder="e.g. 217 A"
                                value={form.nomorKamar}
                                onChange={(e) => setForm({...form, nomorKamar: e.target.value})}
                            />
                            <Bed size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <Label>NAMA PENGHUNI</Label>
                        <div className="relative">
                            <input 
                                type="text" 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black placeholder:text-gray-300 transition-all shadow-sm"
                                placeholder="Masukkan nama lengkap..."
                                value={form.occupiedBy}
                                onChange={(e) => setForm({...form, occupiedBy: e.target.value})}
                            />
                            <User size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Section 2: Facilities Status */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
                    <div className="flex items-center gap-2 mb-6">
                        <Lock size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">FACILITIES STATUS</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label>STATUS LOKER BARANG</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm"
                                value={form.statusLokerBarang}
                                onChange={(e) => setForm({...form, statusLokerBarang: e.target.value})}
                            >
                                <option value="Terpakai">Terpakai</option>
                                <option value="Tidak Terpakai">Tidak Terpakai</option>
                                <option value="Extra Loker Terpakai">Extra Loker Terpakai</option>
                                <option value="Rusak">Rusak</option>
                            </select>
                        </div>
                        <div>
                            <Label>STATUS LOKER PANTRY</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm"
                                value={form.statusLokerPantry}
                                onChange={(e) => setForm({...form, statusLokerPantry: e.target.value})}
                            >
                                <option value="Terpakai">Terpakai</option>
                                <option value="Tidak Terpakai">Tidak Terpakai</option>
                                <option value="Belum Dapat">Belum Dapat</option>
                                <option value="Extra Loker Terpakai">Extra Loker Terpakai</option>
                            </select>
                        </div>
                        <div>
                            <Label>JADWAL LAUNDRY</Label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black placeholder:text-gray-300 transition-all shadow-sm"
                                    placeholder="Senin, Kamis / Tidak ada"
                                    value={form.jadwalLaundry}
                                    onChange={(e) => setForm({...form, jadwalLaundry: e.target.value})}
                                />
                                <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Keterangan (Full Width) */}
                <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <MessageSquare size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">KETERANGAN</h3>
                    </div>
                    
                    <div>
                        <textarea 
                            disabled={isView}
                            rows={3}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-medium text-black outline-none focus:border-black placeholder:text-gray-300 shadow-sm resize-none"
                            placeholder="Catatan tambahan..."
                            value={form.keterangan || ''}
                            onChange={(e) => setForm({...form, keterangan: e.target.value})}
                        />
                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all">CANCEL</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-12 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95"
            >
                SAVE DATA
            </button>
          )}
        </div>
      </div>
    </div>
  );
};