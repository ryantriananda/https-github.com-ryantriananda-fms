
import React, { useState, useEffect } from 'react';
import { X, Save, Send, MapPin, Calendar, Building, Info, AlertTriangle, FileText, CheckCircle2, Clock } from 'lucide-react';
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
    tipeMutasi: 'Permanent'
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
            lokasiTujuan: ''
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
              lokasiAsal: vehicle.cabang // Auto-set origin to current branch
          }));
      } else {
          setForm(prev => ({ ...prev, noPolisi: selectedNoPol, cabangAset: '', lokasiAsal: '' }));
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
        <div className="p-10 overflow-y-auto custom-scrollbar">
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
                            <Label>Cabang Saat Ini</Label>
                            <div className="flex items-center gap-3 bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100">
                                <Building size={16} className="text-gray-400" />
                                <span className="text-[12px] font-black text-gray-600 uppercase">{form.cabangAset || '-'}</span>
                            </div>
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
                    </div>
                </div>

                {/* Transfer Details */}
                <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin size={16} className="text-black"/>
                        <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Detail Perpindahan</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label required>Tipe Mutasi</Label>
                            <div className="flex gap-2">
                                {['Permanent', 'Temporary'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => !isView && setForm({...form, tipeMutasi: type})}
                                        disabled={isView}
                                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all ${
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
                        
                        <div>
                            <Label required>Lokasi Tujuan</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 appearance-none cursor-pointer"
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
                        <div className="absolute left-[51px] top-12 bottom-12 w-[2px] bg-gray-100"></div>
                        <div className="space-y-10 relative z-10">
                            <div className="flex gap-8">
                                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg shadow-black/20 shrink-0">
                                    <FileText size={20} strokeWidth={3} />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-black uppercase tracking-tight">Mutation Request Created</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">Submitted on {form.tglPermintaan}</p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-lg ${
                                    form.statusApproval === 'Approved' ? 'bg-green-500 text-white shadow-green-200' :
                                    form.statusApproval === 'Rejected' ? 'bg-red-500 text-white shadow-red-200' :
                                    'bg-orange-500 text-white shadow-orange-200'
                                }`}>
                                    {form.statusApproval === 'Approved' ? <CheckCircle2 size={20} /> : 
                                     form.statusApproval === 'Rejected' ? <X size={20} /> : <Clock size={20} />}
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[13px] font-black text-black uppercase tracking-tight">Status: {form.statusApproval}</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        {form.statusApproval === 'Approved' ? 'Transfer Approved' : 'Waiting for approval'}
                                    </p>
                                </div>
                            </div>
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
                <Save size={18} strokeWidth={2.5} /> Ajukan Mutasi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
