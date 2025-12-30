
import React, { useState, useEffect } from 'react';
import { X, Send, MapPin, Building, Info, AlertTriangle, User } from 'lucide-react';
import { MutationRecord, VehicleRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MutationRecord>) => void;
  initialData?: MutationRecord | null;
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
}

export const MutationModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    vehicleList = []
}) => {
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [form, setForm] = useState<Partial<MutationRecord>>({
    status: 'Draft',
    statusApproval: 'Pending',
    tglPermintaan: new Date().toISOString().split('T')[0],
    tipeMutasi: 'Permanent',
    picBefore: '',
    picAfter: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            status: 'Draft',
            statusApproval: 'Pending',
            tglPermintaan: new Date().toISOString().split('T')[0],
            tipeMutasi: 'Permanent',
            noPolisi: '',
            lokasiAsal: '',
            lokasiTujuan: '',
            picBefore: '',
            picAfter: ''
        });
      }
      setActiveTab('DETAILS');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedNoPol = e.target.value;
      const vehicle = vehicleList.find(v => v.noPolisi === selectedNoPol);
      
      if (vehicle) {
          setForm(prev => ({
              ...prev,
              noPolisi: vehicle.noPolisi,
              cabangAset: vehicle.cabang,
              lokasiAsal: vehicle.cabang, // Auto-set origin to current branch
              picBefore: vehicle.pengguna || '' // Auto-set previous PIC if available
          }));
      } else {
          setForm(prev => ({ ...prev, noPolisi: selectedNoPol, cabangAset: '', lokasiAsal: '', picBefore: '' }));
      }
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-[#FBFBFB] w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Send size={20} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Form Mutasi Kendaraan' : 'Detail Mutasi'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Asset Transfer Request</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8">
            <button onClick={() => setActiveTab('DETAILS')} className={`py-3 text-[10px] font-black uppercase tracking-widest border-b-2 ${activeTab === 'DETAILS' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}>Details</button>
            <button onClick={() => setActiveTab('WORKFLOW')} className={`py-3 text-[10px] font-black uppercase tracking-widest border-b-2 ${activeTab === 'WORKFLOW' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}>Workflow</button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar bg-[#FBFBFB]">
            {activeTab === 'DETAILS' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vehicle Selection */}
                <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Info size={16} className="text-black"/>
                        <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Identitas Aset</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Label required>Pilih Unit Kendaraan</Label>
                            <select 
                                disabled={isView || mode === 'edit'}
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 appearance-none cursor-pointer"
                                value={form.noPolisi || ''}
                                onChange={handleVehicleChange}
                            >
                                <option value="">-- Pilih Kendaraan --</option>
                                {vehicleList.map(v => (
                                    <option key={v.id} value={v.noPolisi}>{v.noPolisi} - {v.nama} ({v.cabang})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Label>Tanggal Permintaan</Label>
                            <input 
                                type="date"
                                disabled={isView}
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400"
                                value={form.tglPermintaan}
                                onChange={(e) => setForm({...form, tglPermintaan: e.target.value})}
                            />
                        </div>
                        <div>
                            <Label required>Tipe Mutasi</Label>
                            <div className="flex gap-2">
                                {['Permanent', 'Temporary'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => !isView && setForm({...form, tipeMutasi: type})}
                                        disabled={isView}
                                        className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl border transition-all ${
                                            form.tipeMutasi === type 
                                            ? 'bg-black text-white border-black shadow-lg' 
                                            : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transfer Details */}
                <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin size={16} className="text-black"/>
                        <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Detail Perpindahan</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Origin Group */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="md:col-span-2 border-b border-gray-200 pb-2 mb-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ASAL (ORIGIN)</span>
                            </div>
                            <div>
                                <Label>Cabang Asal</Label>
                                <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl border border-gray-200 shadow-sm">
                                    <Building size={16} className="text-gray-400" />
                                    <span className="text-[12px] font-black text-gray-600 uppercase">{form.cabangAset || '-'}</span>
                                </div>
                            </div>
                            <div>
                                <Label>PIC Asal / Sebelumnya</Label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        disabled={isView}
                                        className="w-full bg-white border-none rounded-2xl px-5 py-4 pl-12 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400"
                                        placeholder="Nama PIC Lama"
                                        value={form.picBefore || ''}
                                        onChange={(e) => setForm({...form, picBefore: e.target.value})}
                                    />
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Destination Group */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="md:col-span-2 border-b border-gray-200 pb-2 mb-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TUJUAN (DESTINATION)</span>
                            </div>
                            <div>
                                <Label required>Lokasi Tujuan</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView}
                                        className="w-full bg-white border-none rounded-2xl px-5 py-4 pl-12 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 appearance-none cursor-pointer"
                                        value={form.lokasiTujuan || ''}
                                        onChange={(e) => setForm({...form, lokasiTujuan: e.target.value})}
                                    >
                                        <option value="">-- Pilih Tujuan --</option>
                                        <option value="Jakarta">Jakarta Head Office</option>
                                        <option value="Surabaya">Surabaya Branch</option>
                                        <option value="Medan">Medan Branch</option>
                                        <option value="Makassar">Makassar Warehouse</option>
                                        <option value="Bandung">Bandung Branch</option>
                                    </select>
                                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <Label required>PIC Tujuan / Penerima</Label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        disabled={isView}
                                        className="w-full bg-white border-none rounded-2xl px-5 py-4 pl-12 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400"
                                        placeholder="Nama PIC Baru"
                                        value={form.picAfter || ''}
                                        onChange={(e) => setForm({...form, picAfter: e.target.value})}
                                    />
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                <p className="text-[10px] font-bold text-orange-700 uppercase leading-relaxed">
                                    Mutasi antar cabang memerlukan persetujuan dari Branch Manager kedua lokasi (Asal & Tujuan).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="text-center p-8">
                            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Workflow Visualization Placeholder</p>
                        </div>
                  </div>
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Batal</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Send size={18} strokeWidth={2.5} /> Ajukan Mutasi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
