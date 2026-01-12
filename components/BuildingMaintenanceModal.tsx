
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Save, Wrench, Calendar, DollarSign, FileText, Building, User, UploadCloud, Trash2, Clock, CheckCircle2, AlertCircle, PlayCircle, Star, Image as ImageIcon, MapPin, GitBranch, Users, Plus, Briefcase, Edit3 } from 'lucide-react';
import { BuildingMaintenanceRecord, BuildingAssetRecord, BuildingRecord, VendorRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingMaintenanceRecord>) => void;
  initialData?: BuildingMaintenanceRecord | null;
  assetList: BuildingAssetRecord[];
  buildingList?: BuildingRecord[];
  vendorList?: VendorRecord[];
  mode?: 'create' | 'edit' | 'view';
}

export const BuildingMaintenanceModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    assetList,
    buildingList = [],
    vendorList = [],
    mode = 'create'
}) => {
  const [activeTab, setActiveTab] = useState('ASSET SELECTION');
  const [form, setForm] = useState<Partial<BuildingMaintenanceRecord>>({
    requestDate: new Date().toISOString().split('T')[0],
    maintenanceType: 'Preventive',
    status: 'Scheduled',
    approvalStatus: 'Pending Approval',
    cost: '0',
    rating: 0,
    proposals: []
  });

  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  // Proposal States
  const [isEditingProposal, setIsEditingProposal] = useState(false);
  const [currentProposal, setCurrentProposal] = useState<Partial<any>>({
      vendorName: '',
      proposalName: '',
      estimatedCost: '',
      status: 'Pending',
      submissionDate: new Date().toISOString().split('T')[0]
  });

  // Refs for Proposal Uploads
  const propDocRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        // If editing/viewing, try to find the building from the asset ID
        if (initialData.assetId) {
            const asset = assetList.find(a => a.id === initialData.assetId);
            if (asset) {
                setSelectedBuilding(asset.buildingName);
            }
        }
      } else {
        setForm({
            requestDate: new Date().toISOString().split('T')[0],
            maintenanceType: 'Preventive',
            status: 'Scheduled',
            approvalStatus: 'Pending Approval',
            cost: '0',
            rating: 0,
            assetId: '',
            assetName: '',
            buildingLocation: '',
            proposals: []
        });
        setSelectedBuilding('');
      }
    }
  }, [isOpen, initialData, assetList]);

  const filteredAssets = useMemo(() => {
      if (!selectedBuilding) return [];
      return assetList.filter(asset => asset.buildingName === selectedBuilding);
  }, [selectedBuilding, assetList]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  // Feature 3: SLA Logic
  const getSLABadge = () => {
      if (!form.requestDate) return null;
      
      const start = new Date(form.requestDate);
      const end = form.completionDate ? new Date(form.completionDate) : new Date();
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      let status = 'On Track';
      let color = 'bg-green-100 text-green-700';

      if (diffDays > 7) {
          status = 'Overdue (>7 Days)';
          color = 'bg-red-100 text-red-700';
      } else if (diffDays > 3) {
          status = 'Warning (>3 Days)';
          color = 'bg-orange-100 text-orange-700';
      }

      return (
          <div className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${color} flex items-center gap-2`}>
              <Clock size={12} /> {status} ({diffDays} Days)
          </div>
      );
  };

  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const buildingName = e.target.value;
      setSelectedBuilding(buildingName);
      // Reset asset selection when building changes
      setForm(prev => ({
          ...prev,
          assetId: '',
          assetName: '',
          buildingLocation: ''
      }));
  };

  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedAssetId = e.target.value;
      const asset = assetList.find(a => a.id === selectedAssetId);
      if (asset) {
          setForm({
              ...form,
              assetId: asset.id,
              assetName: asset.assetName,
              buildingLocation: `${asset.buildingName} - ${asset.floor} (${asset.roomName})`
          });
      } else {
          setForm({
              ...form,
              assetId: '',
              assetName: '',
              buildingLocation: ''
          });
      }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              if (type === 'before') setForm(prev => ({...prev, evidenceBefore: ev.target?.result as string}));
              else setForm(prev => ({...prev, evidenceAfter: ev.target?.result as string}));
          };
          reader.readAsDataURL(file);
      }
  };

  // Proposal CRUD Functions
  const handleAddProposal = () => {
      if (!currentProposal.vendorName || !currentProposal.proposalName) return;
      
      const newProposal = {
          ...currentProposal,
          id: Date.now().toString(),
          status: currentProposal.status || 'Pending'
      };
      
      setForm(prev => ({
          ...prev,
          proposals: [...(prev.proposals || []), newProposal]
      }));
      
      setCurrentProposal({
          vendorName: '',
          proposalName: '',
          estimatedCost: '',
          status: 'Pending',
          submissionDate: new Date().toISOString().split('T')[0]
      });
      setIsEditingProposal(false);
  };

  const handleEditProposal = (proposal: any) => {
      setCurrentProposal(proposal);
      setIsEditingProposal(true);
  };

  const handleUpdateProposal = () => {
      if (!currentProposal.id) return;
      
      setForm(prev => ({
          ...prev,
          proposals: (prev.proposals || []).map(p => 
              p.id === currentProposal.id ? { ...currentProposal } : p
          )
      }));
      
      setCurrentProposal({
          vendorName: '',
          proposalName: '',
          estimatedCost: '',
          status: 'Pending',
          submissionDate: new Date().toISOString().split('T')[0]
      });
      setIsEditingProposal(false);
  };

  const handleDeleteProposal = (id: string) => {
      setForm(prev => ({
          ...prev,
          proposals: (prev.proposals || []).filter(p => p.id !== id)
      }));
  };

  const handleProposalDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setCurrentProposal(prev => ({
                  ...prev,
                  proposalDoc: ev.target?.result as string
              }));
          };
          reader.readAsDataURL(file);
      }
  };

  const getLogs = () => {
      const logs = [
          { id: 1, date: '24/12/2025 09:00', user: 'System', role: 'System', action: 'Request Created', status: 'Draft', icon: FileText, color: 'text-gray-400', bg: 'bg-gray-100' },
          { id: 2, date: '24/12/2025 09:15', user: 'Ibnu Faisal', role: 'Facility Manager', action: 'Submitted for Approval', status: 'Pending Approval', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100' },
      ];

      if (form.approvalStatus === 'Approved') {
          logs.push({ id: 3, date: '25/12/2025 10:30', user: 'Budi Santoso', role: 'Building Manager', action: 'Approved Request', status: 'Approved', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100' });
      } else if (form.approvalStatus === 'Rejected') {
          logs.push({ id: 3, date: '25/12/2025 10:30', user: 'Budi Santoso', role: 'Building Manager', action: 'Rejected Request', status: 'Rejected', icon: X, color: 'text-red-500', bg: 'bg-red-100' });
      } else if (form.approvalStatus === 'Revised') {
          logs.push({ id: 3, date: '25/12/2025 10:30', user: 'Budi Santoso', role: 'Building Manager', action: 'Requested Revision', status: 'Revised', icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-100' });
      }

      if (form.status === 'In Progress' && form.approvalStatus === 'Approved') {
           logs.push({ id: 4, date: '26/12/2025 08:00', user: form.vendor || 'Vendor', role: 'Technician', action: 'Work Started', status: 'In Progress', icon: PlayCircle, color: 'text-blue-600', bg: 'bg-blue-50' });
      }
      
      if (form.status === 'Completed' && form.approvalStatus === 'Approved') {
           if (!logs.find(l => l.status === 'In Progress')) {
                logs.push({ id: 4, date: '26/12/2025 08:00', user: form.vendor || 'Vendor', role: 'Technician', action: 'Work Started', status: 'In Progress', icon: PlayCircle, color: 'text-blue-600', bg: 'bg-blue-50' });
           }
           logs.push({ id: 5, date: '27/12/2025 16:00', user: form.vendor || 'Vendor', role: 'Technician', action: 'Work Completed', status: 'Completed', icon: CheckCircle2, color: 'text-green-700', bg: 'bg-green-100' });
      }

      return logs.reverse(); // Newest first
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, field, type = "text", disabled = false, placeholder = "", className = "" }: any) => (
    <div className={className}>
      <Label>{label}</Label>
      <input 
        type={type} 
        disabled={isView || disabled}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-300 shadow-sm"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setForm({...form, [field]: e.target.value})}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-12 py-8 bg-white flex items-center justify-between shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20">
                <Wrench size={28} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Input Pemeliharaan' : mode === 'edit' ? 'Update Pemeliharaan' : 'Detail Pemeliharaan'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Building Asset Maintenance</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
              {getSLABadge()}
              <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-3 rounded-full hover:bg-gray-50">
                <X size={32} />
              </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-[#FBFBFB]">
            
            {/* Left Column: Form */}
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                
                {/* Tab Navigation */}
                <div className="flex gap-1 mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                    {[
                        { id: 'ASSET SELECTION', label: 'Asset Selection', icon: Building },
                        { id: 'SERVICE DETAILS', label: 'Service Details', icon: FileText },
                        { id: 'PROPOSALS', label: 'Proposals', icon: Briefcase },
                        { id: 'EVIDENCE', label: 'Evidence', icon: ImageIcon }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                                activeTab === tab.id 
                                ? 'bg-black text-white shadow-lg' 
                                : 'text-gray-400 hover:text-black hover:bg-white'
                            }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'ASSET SELECTION' && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <Building size={16} className="text-black"/>
                            <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Informasi Aset</h3>
                        </div>
                        
                        {/* Building Selection */}
                        <div>
                            <Label required>Lokasi Gedung / Cabang</Label>
                            <div className="relative">
                                <select 
                                    disabled={isView || mode === 'edit'}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                    value={selectedBuilding}
                                    onChange={handleBuildingChange}
                                >
                                    <option value="">-- Pilih Lokasi --</option>
                                    {buildingList.map(b => (
                                        <option key={b.id} value={b.name}>{b.name}</option>
                                    ))}
                                </select>
                                <MapPin size={16} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <Label required>Pilih Aset Gedung</Label>
                            <select 
                                disabled={isView || mode === 'edit' || !selectedBuilding}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                value={form.assetId || ''}
                                onChange={handleAssetChange}
                            >
                                <option value="">{selectedBuilding ? '-- Pilih Aset --' : '-- Pilih Lokasi Terlebih Dahulu --'}</option>
                                {filteredAssets.length > 0 ? (
                                    filteredAssets.map(asset => (
                                        <option key={asset.id} value={asset.id}>
                                            {asset.assetName} ({asset.assetCode})
                                        </option>
                                    ))
                                ) : (
                                    selectedBuilding && <option value="" disabled>Tidak ada aset di lokasi ini</option>
                                )}
                            </select>
                        </div>

                        <InputField 
                            label="Lokasi Penempatan Detail" 
                            value={form.buildingLocation} 
                            field="buildingLocation" 
                            disabled={true} 
                            placeholder="Detail lantai/ruangan..." 
                        />

                        <div>
                            <Label>Kategori Maintenance</Label>
                            <div className="flex gap-3">
                                {['Preventive', 'Corrective', 'Emergency'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => !isView && setForm({...form, maintenanceType: type as any})}
                                        disabled={isView}
                                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all ${
                                            form.maintenanceType === type 
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
                )}

                {activeTab === 'SERVICE DETAILS' && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText size={16} className="text-black"/>
                            <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Detail Pengerjaan</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <InputField label="Tanggal Request" value={form.requestDate} field="requestDate" type="date" />
                            <InputField label="Tanggal Selesai" value={form.completionDate} field="completionDate" type="date" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <InputField label="Vendor Pelaksana" value={form.vendor} field="vendor" placeholder="Nama Vendor" />
                            <InputField label="Nama Teknisi" value={form.technician} field="technician" placeholder="Opsional" />
                        </div>

                        <div>
                            <Label>Deskripsi Pekerjaan</Label>
                            <textarea 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-bold text-black focus:border-black outline-none disabled:bg-gray-50 transition-all placeholder:text-gray-300 shadow-sm min-h-[100px]"
                                placeholder="Jelaskan detail perbaikan atau perawatan..."
                                value={form.description || ''}
                                onChange={(e) => setForm({...form, description: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative">
                                <Label>Biaya (IDR)</Label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                    <input 
                                        type="number"
                                        disabled={isView}
                                        className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 transition-all placeholder:text-gray-300 shadow-sm"
                                        value={form.cost}
                                        onChange={(e) => setForm({...form, cost: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Status Progress</Label>
                                <select 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                    value={form.status || ''}
                                    onChange={(e) => setForm({...form, status: e.target.value as any})}
                                >
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <Label>Approval Status</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                value={form.approvalStatus || 'Pending Approval'}
                                onChange={(e) => setForm({...form, approvalStatus: e.target.value as any})}
                            >
                                <option value="Draft">Draft</option>
                                <option value="Pending Approval">Pending Approval</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Revised">Revised</option>
                            </select>
                        </div>
                    </div>
                )}

                {activeTab === 'PROPOSALS' && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <Briefcase size={16} className="text-black"/>
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Vendor Proposals</h3>
                            </div>
                            {!isView && (
                                <button
                                    onClick={() => setIsEditingProposal(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-900 transition-all"
                                >
                                    <Plus size={14} />
                                    Add Proposal
                                </button>
                            )}
                        </div>

                        {/* Proposal Form */}
                        {isEditingProposal && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[12px] font-black text-black uppercase tracking-widest">
                                        {currentProposal.id ? 'Edit Proposal' : 'New Proposal'}
                                    </h4>
                                    <button
                                        onClick={() => {
                                            setIsEditingProposal(false);
                                            setCurrentProposal({
                                                vendorName: '',
                                                proposalName: '',
                                                estimatedCost: '',
                                                status: 'Pending',
                                                submissionDate: new Date().toISOString().split('T')[0]
                                            });
                                        }}
                                        className="text-gray-400 hover:text-black"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label>Vendor Name</Label>
                                        <select
                                            disabled={isView}
                                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                            value={currentProposal.vendorName || ''}
                                            onChange={(e) => setCurrentProposal({...currentProposal, vendorName: e.target.value})}
                                        >
                                            <option value="">-- Select Vendor --</option>
                                            {vendorList.map(vendor => (
                                                <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputField 
                                        label="Proposal Name" 
                                        value={currentProposal.proposalName} 
                                        field="proposalName" 
                                        placeholder="Proposal title"
                                        className="col-span-1"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <InputField 
                                        label="Estimated Cost (IDR)" 
                                        value={currentProposal.estimatedCost} 
                                        field="estimatedCost" 
                                        placeholder="0"
                                    />
                                    <InputField 
                                        label="Submission Date" 
                                        value={currentProposal.submissionDate} 
                                        field="submissionDate" 
                                        type="date"
                                    />
                                </div>

                                <div>
                                    <Label>Status</Label>
                                    <select
                                        disabled={isView}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm cursor-pointer appearance-none"
                                        value={currentProposal.status || 'Pending'}
                                        onChange={(e) => setCurrentProposal({...currentProposal, status: e.target.value})}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Submitted">Submitted</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                <div>
                                    <Label>Proposal Document</Label>
                                    <div 
                                        onClick={() => !isView && propDocRef.current?.click()}
                                        className="h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 hover:border-black hover:bg-gray-100 transition-all cursor-pointer"
                                    >
                                        {currentProposal.proposalDoc ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <CheckCircle2 size={20} />
                                                <span className="text-[12px] font-black">Document Uploaded</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-400">
                                                <UploadCloud size={24} className="mb-2" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Upload Proposal Doc</span>
                                            </div>
                                        )}
                                        <input type="file" ref={propDocRef} className="hidden" accept=".pdf,.doc,.docx" onChange={handleProposalDocUpload} />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setIsEditingProposal(false);
                                            setCurrentProposal({
                                                vendorName: '',
                                                proposalName: '',
                                                estimatedCost: '',
                                                status: 'Pending',
                                                submissionDate: new Date().toISOString().split('T')[0]
                                            });
                                        }}
                                        className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={currentProposal.id ? handleUpdateProposal : handleAddProposal}
                                        className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-900"
                                    >
                                        {currentProposal.id ? 'Update' : 'Add'} Proposal
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Proposals List */}
                        <div className="space-y-4">
                            {(form.proposals || []).length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-[12px] font-black uppercase tracking-widest">No Proposals Yet</p>
                                    <p className="text-[10px] text-gray-500 mt-2">Add vendor proposals for this maintenance request</p>
                                </div>
                            ) : (
                                (form.proposals || []).map((proposal: any) => (
                                    <div key={proposal.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-[14px] font-black text-black">{proposal.proposalName}</h4>
                                                <p className="text-[12px] text-gray-600 font-medium">{proposal.vendorName}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg ${
                                                    proposal.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                    proposal.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    proposal.status === 'Submitted' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {proposal.status}
                                                </span>
                                                {!isView && (
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => handleEditProposal(proposal)}
                                                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg"
                                                        >
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProposal(proposal.id)}
                                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 text-[11px]">
                                            <div>
                                                <span className="text-gray-500 font-bold">Estimated Cost:</span>
                                                <span className="ml-2 font-black text-black">Rp {proposal.estimatedCost?.toLocaleString()}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-bold">Submitted:</span>
                                                <span className="ml-2 font-black text-black">{proposal.submissionDate}</span>
                                            </div>
                                        </div>
                                        
                                        {proposal.proposalDoc && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <button className="flex items-center gap-2 text-[11px] font-black text-blue-600 hover:text-blue-800">
                                                    <FileText size={14} />
                                                    View Proposal Document
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'EVIDENCE' && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <ImageIcon size={16} className="text-black"/>
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Evidence Based Maintenance</h3>
                            </div>
                            {/* Vendor Rating (Only show if completed) */}
                            {form.status === 'Completed' && (
                                <div className="flex items-center gap-3 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
                                    <span className="text-[10px] font-black text-yellow-700 uppercase tracking-widest">Vendor Rating</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button 
                                                key={star}
                                                type="button"
                                                onClick={() => !isView && setForm({...form, rating: star})}
                                                disabled={isView}
                                                className={`${(form.rating || 0) >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} transition-colors`}
                                            >
                                                <Star size={16} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {/* Before Photo */}
                            <div>
                                <Label>Before Maintenance</Label>
                                <div 
                                    onClick={() => !isView && beforeInputRef.current?.click()}
                                    className={`relative h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden transition-all
                                        ${!isView ? 'cursor-pointer hover:border-black hover:bg-gray-100' : ''}
                                        ${form.evidenceBefore ? 'border-green-200' : 'border-gray-200'}
                                    `}
                                >
                                    {form.evidenceBefore ? (
                                        <img src={form.evidenceBefore} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-400">
                                            <UploadCloud size={24} className="mb-2" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Upload Photo</span>
                                        </div>
                                    )}
                                    <input type="file" ref={beforeInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'before')} />
                                </div>
                            </div>

                            {/* After Photo */}
                            <div>
                                <Label>After Maintenance</Label>
                                <div 
                                    onClick={() => !isView && afterInputRef.current?.click()}
                                    className={`relative h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden transition-all
                                        ${!isView ? 'cursor-pointer hover:border-black hover:bg-gray-100' : ''}
                                        ${form.evidenceAfter ? 'border-green-200' : 'border-gray-200'}
                                    `}
                                >
                                    {form.evidenceAfter ? (
                                        <img src={form.evidenceAfter} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-400">
                                            <UploadCloud size={24} className="mb-2" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Upload Photo</span>
                                        </div>
                                    )}
                                    <input type="file" ref={afterInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'after')} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column: Log History Sidebar */}
            <div className="w-full lg:w-[350px] bg-white border-l border-gray-100 p-8 overflow-y-auto custom-scrollbar shrink-0">
                <div className="flex items-center gap-3 mb-8">
                    <Clock size={18} className="text-black"/>
                    <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Log History</h3>
                </div>

                <div className="space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-100"></div>

                    {getLogs().map((log, index) => (
                        <div key={index} className="relative pl-12">
                            {/* Icon */}
                            <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 ${log.bg}`}>
                                <log.icon size={16} className={log.color} />
                            </div>
                            
                            {/* Content */}
                            <div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{log.date}</span>
                                <h4 className="text-[12px] font-black text-black leading-tight mb-0.5">{log.action}</h4>
                                <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1.5">
                                    <User size={10} /> 
                                    <span className="font-bold">{log.user}</span> 
                                    <span className="text-gray-300">•</span>
                                    <span>{log.role}</span>
                                </div>
                                <div className={`inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-black uppercase ${log.bg} ${log.color}`}>
                                    {log.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* Footer */}
        <div className="px-12 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-gray-100 hover:text-black transition-all">Cancel</button>
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
