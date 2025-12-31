
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Shield, FileText, Calendar, DollarSign, AlertCircle, Plus, Trash2, CheckCircle2, UploadCloud, Receipt } from 'lucide-react';
import { InsuranceRecord, InsuranceClaim, VehicleRecord, BuildingRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<InsuranceRecord>) => void;
  initialData?: InsuranceRecord | null;
  mode?: 'create' | 'edit' | 'view';
  category: 'Vehicle' | 'Building';
  assetList: (VehicleRecord | BuildingRecord)[];
}

export const InsuranceModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    category,
    assetList
}) => {
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [form, setForm] = useState<Partial<InsuranceRecord>>({
    status: 'Active',
    category: category,
    premium: '0',
    sumInsured: '0',
    deductible: '0',
    claims: []
  });

  // Claim State
  const [newClaim, setNewClaim] = useState<Partial<InsuranceClaim>>({
      incidentDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      claimAmount: '0',
      coveredAmount: '0'
  });
  const [isAddingClaim, setIsAddingClaim] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            policyNumber: '',
            category: category,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            status: 'Active',
            premium: '0',
            sumInsured: '0',
            deductible: '300000', // Default OR
            claims: []
        });
      }
      setActiveTab('DETAILS');
      setIsAddingClaim(false);
    }
  }, [isOpen, initialData, category]);

  if (!isOpen) return null;
  const isView = mode === 'view';

  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = e.target.value;
      const asset = assetList.find((a: any) => (a.id.toString() === id) || (a.noPolisi === id)); // Handle different ID types
      
      if (asset) {
          const name = category === 'Vehicle' ? `${(asset as VehicleRecord).noPolisi} - ${(asset as VehicleRecord).nama}` : (asset as BuildingRecord).name;
          setForm({ ...form, assetId: id, assetName: name });
      } else {
          setForm({ ...form, assetId: id, assetName: '' });
      }
  };

  const handleSaveClaim = () => {
      const claimId = `CLM-${Date.now()}`;
      const claim: InsuranceClaim = {
          ...newClaim as InsuranceClaim,
          id: claimId
      };
      setForm(prev => ({
          ...prev,
          claims: [claim, ...(prev.claims || [])]
      }));
      setIsAddingClaim(false);
      setNewClaim({
          incidentDate: new Date().toISOString().split('T')[0],
          status: 'Submitted',
          claimAmount: '0',
          coveredAmount: '0'
      });
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, field, type = "text", disabled = false, placeholder = "", required = false }: any) => (
    <div>
      <Label required={required}>{label}</Label>
      <input 
        type={type} 
        disabled={isView || disabled}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 transition-all placeholder:text-gray-300 shadow-sm"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setForm({...form, [field]: e.target.value})}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-12 py-8 bg-white flex items-center justify-between shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20">
                <Shield size={28} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? `Input Asuransi ${category === 'Vehicle' ? 'Kendaraan' : 'Gedung'}` : 'Detail Asuransi'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Insurance Policy & Claims</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-3 rounded-full hover:bg-gray-50">
            <X size={32} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-12 shrink-0 gap-8">
            {['DETAILS', 'KLAIM ASURANSI', 'DOKUMEN'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[4px] 
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="p-12 overflow-y-auto custom-scrollbar flex-1">
            
            {activeTab === 'DETAILS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2">
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                            <h3 className="text-[12px] font-black text-black uppercase tracking-widest border-b border-gray-100 pb-4 mb-2">Informasi Polis</h3>
                            <InputField label="Nomor Polis" value={form.policyNumber} field="policyNumber" required placeholder="XXX-XXXX-XXXX" />
                            
                            <div>
                                <Label required>Aset Diasuransikan</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none uppercase"
                                        value={form.assetId || ''}
                                        onChange={handleAssetChange}
                                    >
                                        <option value="">-- Pilih Aset --</option>
                                        {assetList.map((asset: any) => {
                                            const val = category === 'Vehicle' ? asset.noPolisi : asset.id;
                                            const label = category === 'Vehicle' ? `${asset.noPolisi} - ${asset.nama}` : asset.name;
                                            return <option key={val} value={val}>{label}</option>
                                        })}
                                    </select>
                                </div>
                            </div>

                            <InputField label="Nama Provider / Broker" value={form.provider} field="provider" placeholder="Contoh: Asuransi Astra" />
                            
                            <div>
                                <Label>Jenis Pertanggungan</Label>
                                <select 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                    value={form.type || ''}
                                    onChange={(e) => setForm({...form, type: e.target.value as any})}
                                >
                                    <option value="All Risk">All Risk (Comprehensive)</option>
                                    <option value="TLO">Total Loss Only (TLO)</option>
                                    <option value="Property All Risk">Property All Risk (PAR)</option>
                                    <option value="Earthquake">Earthquake Only</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                            <h3 className="text-[12px] font-black text-black uppercase tracking-widest border-b border-gray-100 pb-4 mb-2">Biaya & Periode</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Tanggal Mulai" value={form.startDate} field="startDate" type="date" />
                                <InputField label="Tanggal Berakhir" value={form.endDate} field="endDate" type="date" />
                            </div>

                            <div className="relative">
                                <Label>Nilai Pertanggungan (Sum Insured)</Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                    <input type="number" disabled={isView} className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-5 py-4 text-[13px] font-black text-black outline-none shadow-sm" value={form.sumInsured} onChange={(e) => setForm({...form, sumInsured: e.target.value})} placeholder="0" />
                                </div>
                            </div>

                            <div className="relative">
                                <Label>Biaya Premi (Per Tahun)</Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                    <input type="number" disabled={isView} className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-5 py-4 text-[13px] font-black text-black outline-none shadow-sm" value={form.premium} onChange={(e) => setForm({...form, premium: e.target.value})} placeholder="0" />
                                </div>
                            </div>

                            <div className="relative">
                                <Label>Deductible / Resiko Sendiri (OR)</Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                    <input type="number" disabled={isView} className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-5 py-4 text-[13px] font-black text-black outline-none shadow-sm" value={form.deductible} onChange={(e) => setForm({...form, deductible: e.target.value})} placeholder="300000" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'KLAIM ASURANSI' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-[14px] font-black text-black uppercase tracking-tight">Histori Klaim</h3>
                            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">Catatan kejadian dan status klaim</p>
                        </div>
                        {!isView && !isAddingClaim && (
                            <button onClick={() => setIsAddingClaim(true)} className="bg-black text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg">
                                <Plus size={14} strokeWidth={3} /> Input Klaim Baru
                            </button>
                        )}
                    </div>

                    {isAddingClaim && (
                        <div className="bg-white p-8 rounded-[2rem] border border-blue-100 shadow-lg shadow-blue-500/5 mb-8 animate-in slide-in-from-top-4">
                            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
                                <AlertCircle size={18} className="text-blue-500" />
                                <h3 className="text-[12px] font-black text-blue-600 uppercase tracking-widest">Formulir Klaim Baru</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <Label>Tanggal Kejadian</Label>
                                    <input type="date" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[12px] font-bold outline-none" value={newClaim.incidentDate} onChange={e => setNewClaim({...newClaim, incidentDate: e.target.value})} />
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <select className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[12px] font-bold outline-none" value={newClaim.status} onChange={e => setNewClaim({...newClaim, status: e.target.value as any})}>
                                        <option value="Submitted">Submitted (Diajukan)</option>
                                        <option value="Survey">Survey (Pengecekan)</option>
                                        <option value="Approved">Approved (SPK Keluar)</option>
                                        <option value="Paid">Paid / Repair Done</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Deskripsi Kejadian / Kerusakan</Label>
                                    <textarea className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[12px] font-bold outline-none h-20 resize-none" placeholder="Kronologi singkat..." value={newClaim.description} onChange={e => setNewClaim({...newClaim, description: e.target.value})} />
                                </div>
                                <div>
                                    <Label>Estimasi Biaya (Rp)</Label>
                                    <input type="number" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[12px] font-bold outline-none" value={newClaim.claimAmount} onChange={e => setNewClaim({...newClaim, claimAmount: e.target.value})} placeholder="0" />
                                </div>
                                <div>
                                    <Label>Covered Amount (Rp)</Label>
                                    <input type="number" className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[12px] font-bold outline-none" value={newClaim.coveredAmount} onChange={e => setNewClaim({...newClaim, coveredAmount: e.target.value})} placeholder="0" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setIsAddingClaim(false)} className="px-6 py-2.5 rounded-xl border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50">Batal</button>
                                <button onClick={handleSaveClaim} className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-md">Simpan Klaim</button>
                            </div>
                        </div>
                    )}

                    {/* Claims List */}
                    <div className="space-y-4">
                        {form.claims && form.claims.length > 0 ? (
                            form.claims.map((claim, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-gray-200 transition-all group">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                                                <Receipt size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-[12px] font-black text-black uppercase tracking-tight">{claim.id}</h4>
                                                <p className="text-[10px] text-gray-500 font-medium mt-0.5">{claim.incidentDate} • {claim.description}</p>
                                                <div className="mt-2 flex gap-2">
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                                        claim.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                                                        claim.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                        {claim.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Nilai Klaim</p>
                                            <p className="text-[13px] font-mono font-black text-black">Rp {parseInt(claim.claimAmount).toLocaleString('id-ID')}</p>
                                            {claim.status === 'Paid' && (
                                                <p className="text-[10px] font-bold text-green-600 mt-1">Paid: Rp {parseInt(claim.coveredAmount).toLocaleString('id-ID')}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-[2rem]">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Belum ada klaim tercatat</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'DOKUMEN' && (
                <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <UploadCloud size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-[14px] font-black text-black uppercase tracking-widest mb-2">Upload Polis Digital</h3>
                    <p className="text-[10px] text-gray-400 font-medium max-w-xs mx-auto">Upload dokumen polis (PDF) atau foto fisik polis disini untuk arsip digital.</p>
                    <button className="mt-6 px-8 py-3 bg-white border border-gray-200 hover:border-black hover:text-black text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        Browse Files
                    </button>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-12 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Batal</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> Simpan Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
