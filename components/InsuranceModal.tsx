
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Shield, FileText, Calendar, DollarSign, AlertCircle, Plus, Trash2, CheckCircle2, UploadCloud, Receipt, Box, Car, Building, Layers, Info } from 'lucide-react';
import { InsuranceRecord, InsuranceClaim, VehicleRecord, BuildingRecord, LinkedAsset } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<InsuranceRecord>) => void;
  initialData?: InsuranceRecord | null;
  mode?: 'create' | 'edit' | 'view';
  assetList: (VehicleRecord | BuildingRecord)[];
}

export const InsuranceModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    assetList
}) => {
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [form, setForm] = useState<Partial<InsuranceRecord>>({
    status: 'Active',
    category: 'Vehicle',
    premium: '0',
    sumInsured: '0',
    deductible: '0',
    claims: [],
    assets: []
  });

  // Asset Linking State
  const [selectedAssetType, setSelectedAssetType] = useState<'Vehicle' | 'Building'>('Vehicle');
  const [assetSelection, setAssetSelection] = useState<string>('');

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
        // Set initial category based on first asset if exists
        if(initialData.assets && initialData.assets.length > 0) {
             setSelectedAssetType(initialData.assets[0].type as any);
        }
      } else {
        setForm({
            policyNumber: '',
            category: 'Vehicle',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            status: 'Active',
            premium: '0',
            sumInsured: '0',
            deductible: '300000',
            claims: [],
            assets: [] // Empty initially
        });
      }
      setActiveTab('DETAILS');
      setIsAddingClaim(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;
  const isView = mode === 'view';
  
  // Detect Fleet Status
  const isFleet = (form.assets?.length || 0) > 1;

  // Filter assets based on selected type
  const filteredAssets = assetList.filter(a => {
      if (selectedAssetType === 'Vehicle') return (a as any).noPolisi !== undefined;
      return (a as any).noPolisi === undefined; // Buildings don't have noPolisi
  });

  const handleAddAsset = () => {
      if (!assetSelection) return;
      
      const asset = assetList.find((a: any) => (a.id.toString() === assetSelection) || (a.noPolisi === assetSelection));
      if (asset) {
          const isVehicle = (asset as any).noPolisi !== undefined;
          const newLinkedAsset: LinkedAsset = {
              id: asset.id.toString(),
              name: isVehicle ? (asset as VehicleRecord).nama : (asset as BuildingRecord).name,
              type: isVehicle ? 'Vehicle' : 'Building',
              identifier: isVehicle ? (asset as VehicleRecord).noPolisi : (asset as BuildingRecord).assetNo
          };

          // Prevent duplicates
          if (!form.assets?.find(a => a.id === newLinkedAsset.id)) {
               const updatedAssets = [...(form.assets || []), newLinkedAsset];
               setForm(prev => ({
                   ...prev,
                   assets: updatedAssets,
                   // Auto switch to "Fleet Policy" type if more than 1 asset and currently on Single Item type
                   type: (updatedAssets.length > 1 && (!prev.type || prev.type === 'All Risk' || prev.type === 'TLO')) ? 'Fleet Policy' : prev.type,
                   // Update category logic
                   category: updatedAssets.some(a => a.type === 'Building') && updatedAssets.some(a => a.type === 'Vehicle') ? 'Mixed' : newLinkedAsset.type as any
               }));
          }
          setAssetSelection(''); // Clear selection for next add
      }
  };

  const handleRemoveAsset = (id: string) => {
      setForm(prev => ({
          ...prev,
          assets: prev.assets?.filter(a => a.id !== id)
      }));
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
      <div className="bg-[#FBFBFB] w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-12 py-8 bg-white flex items-center justify-between shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20 ${isFleet ? 'bg-purple-600' : 'bg-black'}`}>
                {isFleet ? <Layers size={28} strokeWidth={2.5} /> : <Shield size={28} strokeWidth={2.5} />}
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? `Create New Policy` : 'Policy Details'}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Insurance Management</p>
                    {isFleet && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border border-purple-200">
                            Fleet Policy
                        </span>
                    )}
                </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-3 rounded-full hover:bg-gray-50">
            <X size={32} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-12 shrink-0 gap-8">
            {['DETAILS', 'COVERED ASSETS', 'CLAIMS', 'DOCUMENTS'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[4px] flex items-center gap-2
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                    {tab === 'COVERED ASSETS' && (form.assets?.length || 0) > 0 && (
                        <span className="bg-black text-white px-1.5 py-0.5 rounded text-[9px]">{form.assets?.length}</span>
                    )}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="p-12 overflow-y-auto custom-scrollbar flex-1">
            
            {activeTab === 'DETAILS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2">
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                            <h3 className="text-[12px] font-black text-black uppercase tracking-widest border-b border-gray-100 pb-4 mb-2">Policy Information</h3>
                            <InputField label="Policy Number" value={form.policyNumber} field="policyNumber" required placeholder="XXX-XXXX-XXXX" />
                            <InputField label="Insurance Provider" value={form.provider} field="provider" placeholder="Provider Name" />
                            
                            <div>
                                <Label>Coverage Type</Label>
                                <select 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                    value={form.type || ''}
                                    onChange={(e) => setForm({...form, type: e.target.value as any})}
                                >
                                    <option value="All Risk">All Risk</option>
                                    <option value="TLO">Total Loss Only (TLO)</option>
                                    <option value="Fleet Policy">Fleet Policy (Multiple Assets)</option>
                                    <option value="Property All Risk">Property All Risk (PAR)</option>
                                    <option value="Earthquake">Earthquake Only</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                            <h3 className="text-[12px] font-black text-black uppercase tracking-widest border-b border-gray-100 pb-4 mb-2">Cost & Duration</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Start Date" value={form.startDate} field="startDate" type="date" />
                                <InputField label="End Date" value={form.endDate} field="endDate" type="date" />
                            </div>

                            <div className="relative">
                                <Label>Total Sum Insured (Pertanggungan)</Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                    <input type="number" disabled={isView} className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-5 py-4 text-[13px] font-black text-black outline-none shadow-sm" value={form.sumInsured} onChange={(e) => setForm({...form, sumInsured: e.target.value})} placeholder="0" />
                                </div>
                            </div>

                            <div className="relative">
                                <Label>Total Premium (Yearly)</Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                    <input type="number" disabled={isView} className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-5 py-4 text-[13px] font-black text-black outline-none shadow-sm" value={form.premium} onChange={(e) => setForm({...form, premium: e.target.value})} placeholder="0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'COVERED ASSETS' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    {!isView && (
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Plus size={16} className="text-black"/>
                                <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Add Asset to Policy</h3>
                            </div>
                            <div className="flex items-end gap-4">
                                <div className="flex-1">
                                    <Label>Asset Type</Label>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setSelectedAssetType('Vehicle')}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedAssetType === 'Vehicle' ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}
                                        >
                                            Vehicle
                                        </button>
                                        <button 
                                            onClick={() => setSelectedAssetType('Building')}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedAssetType === 'Building' ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}
                                        >
                                            Building
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-[2]">
                                    <Label>Select Asset to Link</Label>
                                    <select 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold outline-none cursor-pointer"
                                        value={assetSelection}
                                        onChange={(e) => setAssetSelection(e.target.value)}
                                    >
                                        <option value="">-- Select {selectedAssetType} --</option>
                                        {filteredAssets.map((asset: any) => {
                                            const val = selectedAssetType === 'Vehicle' ? asset.noPolisi : asset.id;
                                            const label = selectedAssetType === 'Vehicle' ? `${asset.noPolisi} - ${asset.nama}` : `${asset.assetNo} - ${asset.name}`;
                                            // Filter out already selected
                                            if (form.assets?.find(a => a.id === asset.id.toString())) return null;
                                            return <option key={val} value={asset.id}>{label}</option>
                                        })}
                                    </select>
                                </div>
                                <button 
                                    onClick={handleAddAsset}
                                    disabled={!assetSelection}
                                    className="bg-black text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all disabled:opacity-50 h-full"
                                >
                                    Link Asset
                                </button>
                            </div>
                            {isFleet && (
                                <div className="mt-4 flex items-center gap-2 text-purple-600 bg-purple-50 p-3 rounded-xl border border-purple-100">
                                    <Layers size={14} />
                                    <span className="text-[10px] font-bold">Multi-Asset Mode Active. This policy will cover multiple items (Fleet).</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Label>Linked Assets ({form.assets?.length || 0})</Label>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2 space-y-2">
                            {form.assets && form.assets.length > 0 ? (
                                form.assets.map((asset, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center group hover:border-gray-300 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-black font-black text-[12px]">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-black text-black">{asset.name}</p>
                                                <p className="text-[10px] font-mono font-bold text-gray-400">{asset.identifier} • {asset.type}</p>
                                            </div>
                                        </div>
                                        {!isView && (
                                            <button 
                                                onClick={() => handleRemoveAsset(asset.id)}
                                                className="p-2 text-gray-300 hover:text-red-500 transition-all bg-gray-50 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                                    <Box size={32} className="text-gray-300 mx-auto mb-2" />
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No assets linked to this policy</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Claims Tab - Simplified */}
            {activeTab === 'CLAIMS' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                     <div className="flex justify-between items-center">
                        <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Claims History</h3>
                        {!isView && !isAddingClaim && (
                            <button onClick={() => setIsAddingClaim(true)} className="bg-black text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <Plus size={12} /> New Claim
                            </button>
                        )}
                    </div>

                    {isAddingClaim && (
                        <div className="bg-gray-50 p-6 rounded-2xl border border-blue-100 animate-in slide-in-from-top-2">
                             {/* ... Simple Claim Form ... */}
                             <div className="grid grid-cols-2 gap-4 mb-4">
                                <input type="date" className="p-3 rounded-xl border border-gray-200 text-xs" value={newClaim.incidentDate} onChange={e => setNewClaim({...newClaim, incidentDate: e.target.value})} />
                                <input type="number" className="p-3 rounded-xl border border-gray-200 text-xs" placeholder="Estimated Amount" value={newClaim.claimAmount} onChange={e => setNewClaim({...newClaim, claimAmount: e.target.value})} />
                                <textarea className="col-span-2 p-3 rounded-xl border border-gray-200 text-xs" placeholder="Description" value={newClaim.description} onChange={e => setNewClaim({...newClaim, description: e.target.value})} />
                             </div>
                             <div className="flex justify-end gap-2">
                                 <button onClick={() => setIsAddingClaim(false)} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold">Cancel</button>
                                 <button onClick={handleSaveClaim} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">Submit</button>
                             </div>
                        </div>
                    )}

                    {form.claims?.map((claim, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                            <div>
                                <p className="text-[12px] font-bold text-black">{claim.description || 'No description'}</p>
                                <p className="text-[10px] text-gray-400">{claim.incidentDate}</p>
                            </div>
                            <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase rounded-lg">{claim.status}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'DOCUMENTS' && (
                <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <UploadCloud size={24} className="text-gray-300" />
                    </div>
                    <h3 className="text-[12px] font-black text-black uppercase tracking-widest mb-1">Policy Documents</h3>
                    <button className="mt-4 px-6 py-2 bg-white border border-gray-200 hover:border-black hover:text-black text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                        Browse Files
                    </button>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-12 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> Save Policy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
