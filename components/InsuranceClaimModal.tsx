
import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle, FileText, Calendar, DollarSign, Shield, Receipt } from 'lucide-react';
import { InsuranceClaim, InsuranceRecord } from '../types';
import { DisplayClaim } from './InsuranceClaimTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (policyId: string, claim: InsuranceClaim) => void;
  initialData?: DisplayClaim | null;
  mode?: 'create' | 'edit';
  policies: InsuranceRecord[];
}

export const InsuranceClaimModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    policies = []
}) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  const [form, setForm] = useState<Partial<InsuranceClaim>>({
    incidentDate: new Date().toISOString().split('T')[0],
    description: '',
    claimAmount: '',
    coveredAmount: '0',
    status: 'Submitted',
    remarks: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Edit mode
        setForm({
            id: initialData.id,
            incidentDate: initialData.incidentDate,
            description: initialData.description,
            claimAmount: initialData.claimAmount,
            coveredAmount: initialData.coveredAmount,
            status: initialData.status,
            remarks: initialData.remarks
        });
        setSelectedPolicyId(initialData.policyId);
      } else {
        // Create mode
        setForm({
            incidentDate: new Date().toISOString().split('T')[0],
            description: '',
            claimAmount: '',
            coveredAmount: '0',
            status: 'Submitted',
            remarks: ''
        });
        setSelectedPolicyId('');
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
      if (!selectedPolicyId) return; // Validation
      
      const claimData: InsuranceClaim = {
          id: form.id || `CLM-${Date.now()}`,
          incidentDate: form.incidentDate || '',
          description: form.description || '',
          claimAmount: form.claimAmount || '0',
          coveredAmount: form.coveredAmount || '0',
          status: form.status as any,
          remarks: form.remarks
      };
      
      onSave(selectedPolicyId, claimData);
  };

  const selectedPolicy = policies.find(p => p.id === selectedPolicyId);

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <AlertTriangle size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Register New Claim' : 'Edit Claim Details'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Insurance Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
            <div className="space-y-8">
                
                {/* Policy Selection */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div>
                        <Label required>Select Policy / Asset</Label>
                        <div className="relative">
                            <select 
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none appearance-none cursor-pointer shadow-sm uppercase"
                                value={selectedPolicyId}
                                onChange={(e) => setSelectedPolicyId(e.target.value)}
                                disabled={mode === 'edit'}
                            >
                                <option value="">-- Choose Policy --</option>
                                {policies.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.policyNumber} - {p.assets?.[0]?.name || p.assetName || 'Unnamed Asset'} ({p.provider})
                                    </option>
                                ))}
                            </select>
                            <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                        </div>
                    </div>

                    {selectedPolicy && (
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h4 className="text-[11px] font-black text-blue-700 uppercase tracking-wide mb-2">Policy Summary</h4>
                            <div className="grid grid-cols-2 gap-4 text-[10px]">
                                <div><span className="font-bold text-gray-500">Provider:</span> <span className="font-bold">{selectedPolicy.provider}</span></div>
                                <div><span className="font-bold text-gray-500">Type:</span> <span className="font-bold">{selectedPolicy.type}</span></div>
                                <div><span className="font-bold text-gray-500">Period:</span> <span className="font-bold">{selectedPolicy.startDate} - {selectedPolicy.endDate}</span></div>
                                <div><span className="font-bold text-gray-500">Deductible:</span> <span className="font-bold text-red-500">Rp {parseInt(selectedPolicy.deductible || '0').toLocaleString()}</span></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Claim Details */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label required>Incident Date</Label>
                            <div className="relative">
                                <input 
                                    type="date" 
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none shadow-sm"
                                    value={form.incidentDate}
                                    onChange={(e) => setForm({...form, incidentDate: e.target.value})}
                                />
                                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <Label required>Status</Label>
                            <select 
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none appearance-none cursor-pointer shadow-sm"
                                value={form.status}
                                onChange={(e) => setForm({...form, status: e.target.value as any})}
                            >
                                <option value="Submitted">Submitted</option>
                                <option value="Survey">Survey / Inspection</option>
                                <option value="Approved">Approved</option>
                                <option value="Paid">Paid</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <Label required>Incident Description</Label>
                        <div className="relative">
                            <textarea 
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none shadow-sm min-h-[100px] resize-none"
                                value={form.description}
                                onChange={(e) => setForm({...form, description: e.target.value})}
                                placeholder="Describe what happened..."
                            />
                            <FileText size={18} className="absolute left-4 top-6 text-gray-300 pointer-events-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label required>Estimated Claim Amount</Label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none shadow-sm"
                                    value={form.claimAmount}
                                    onChange={(e) => setForm({...form, claimAmount: e.target.value})}
                                    placeholder="0"
                                />
                                <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <Label>Approved / Covered Amount</Label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-green-600 focus:border-black outline-none shadow-sm"
                                    value={form.coveredAmount}
                                    onChange={(e) => setForm({...form, coveredAmount: e.target.value})}
                                    placeholder="0"
                                />
                                <Receipt size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Cancel</button>
          <button 
              onClick={handleSave} 
              disabled={!selectedPolicyId}
              className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              <Save size={18} strokeWidth={2.5} /> Save Claim
          </button>
        </div>
      </div>
    </div>
  );
};
