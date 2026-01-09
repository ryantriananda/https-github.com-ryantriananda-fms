
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Building, MapPin, Phone, FileText, CheckCircle2, Clock, AlertCircle, Trash2, Plus, ChevronDown, User, Home, DollarSign, Ruler, Zap, Key, UploadCloud, MousePointer2, TrendingUp, PieChart, ShieldCheck, ChevronLeft, Edit3, Flag } from 'lucide-react';
import { BuildingRecord, GeneralMasterItem, BuildingProposal, WorkflowStep } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingRecord>) => void;
  initialData?: BuildingRecord;
  mode?: 'create' | 'edit' | 'view';
  buildingTypeList?: GeneralMasterItem[];
  existingBuildings?: BuildingRecord[];
}

export const BuildingModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    buildingTypeList = [],
    existingBuildings = []
}) => {
  const [activeTab, setActiveTab] = useState('INFORMASI UMUM');
  const [proposalTab, setProposalTab] = useState('INFO UTAMA'); // For Proposal Tab
  const [generalInfoTab, setGeneralInfoTab] = useState('INFO UTAMA'); // For General Info Tab
  const [form, setForm] = useState<Partial<BuildingRecord>>({
    status: 'Pending',
    ownership: 'Rent',
    workflow: [],
    rentCost: '0',
    totalMaintenanceCost: '0',
    utilityCost: '0',
    documentsAvailable: [],
    proposals: [],
    structureChecklist: { tiang: [], atap: [], dinding: [], lantai: [], pintu: [], jendela: [], others: [] },
    renovationDetailsObj: { costSharing: '', gracePeriod: '', items: { partition: false, paint: false, roof: '', lights: false, other: '' } },
    locationContext: { right: '', left: '', front: '', back: '', nearIndustry: false, operationalHours: '' },
    businessNotes: { deliveryTime: '', dealersCount: '', staffComposition: '', margin: '', competitorPareto: '' },
  });

  const [isManualInput, setIsManualInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Proposal Management State
  const [isEditingProposal, setIsEditingProposal] = useState(false);
  const [currentProposal, setCurrentProposal] = useState<Partial<BuildingProposal>>({
      name: '',
      address: { jl: '', kota: '', kabupaten: '', propinsi: '' },
      floors: { ground: '', f1: '', f2: '', f3: '', f4: '' },
      owner: { name: '', address: '', phone: '' },
      surveySummary: { pros: '', cons: '' },
      securityFeatures: [],
      structureChecklist: { tiang: [], atap: [], dinding: [], lantai: [], pintu: [], jendela: [], others: [] },
      renovationDetailsObj: { costSharing: '', gracePeriod: '', items: { partition: false, paint: false, roof: '', lights: false, other: '' } },
      locationContext: { right: '', left: '', front: '', back: '', nearIndustry: false, operationalHours: '' },
      businessNotes: { deliveryTime: '', dealersCount: '', staffComposition: '', margin: '', competitorPareto: '' },
      documents: [],
      environmentConditions: []
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        setIsManualInput(true); // Edit mode defaults to manual input view (readonly if needed)
      } else {
        setForm({
            status: 'Pending',
            ownership: 'Rent',
            assetNo: 'REQ-BI-NEW-01',
            name: '',
            type: 'MHC',
            location: '',
            address: '',
            rentCost: '250000000',
            totalMaintenanceCost: '45000000',
            utilityCost: '12000000',
            documentsAvailable: [],
            proposals: [],
            workflow: [
                { role: 'BM', status: 'Pending' },
                { role: 'Regional Branches', status: 'Pending' },
                { role: 'AVP Dealership', status: 'Pending' },
                { role: 'Owner', status: 'Pending' }
            ],
            structureChecklist: { tiang: [], atap: [], dinding: [], lantai: [], pintu: [], jendela: [], others: [] },
            renovationDetailsObj: { costSharing: '', gracePeriod: '', items: { partition: false, paint: false, roof: '', lights: false, other: '' } },
            locationContext: { right: '', left: '', front: '', back: '', nearIndustry: false, operationalHours: '' },
            businessNotes: { deliveryTime: '', dealersCount: '', staffComposition: '', margin: '', competitorPareto: '' },
        });
        // If there are existing buildings, default to select mode for convenience
        setIsManualInput(existingBuildings.length === 0);
      }
      setActiveTab('INFORMASI UMUM');
      setIsEditingProposal(false);
    }
  }, [isOpen, initialData, existingBuildings]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleSave = () => {
      onSave(form);
  };

  const handleBuildingSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedName = e.target.value;
      if (selectedName === 'NEW_ENTRY') {
          setIsManualInput(true);
          setForm(prev => ({...prev, name: ''}));
      } else {
          const selectedBuilding = existingBuildings.find(b => b.name === selectedName);
          if (selectedBuilding) {
              setForm(prev => ({
                  ...prev,
                  name: selectedBuilding.name,
                  assetNo: selectedBuilding.assetNo,
                  type: selectedBuilding.type,
                  location: selectedBuilding.location,
                  address: selectedBuilding.address,
                  city: selectedBuilding.city,
                  district: selectedBuilding.district,
                  province: selectedBuilding.province,
                  // Keep workflow/proposals specific to this new request, don't overwrite if not needed
                  // or if this is an "Improvement" request on existing asset, we might want some data.
                  // For now, we copy basic info.
              }));
          }
      }
  };

  const handleSaveProposal = () => {
      const newProposal = { 
          ...currentProposal, 
          id: currentProposal.id || `PROP-${Date.now()}` 
      } as BuildingProposal;

      const existingProposals = form.proposals || [];
      const index = existingProposals.findIndex(p => p.id === newProposal.id);
      
      let updatedProposals;
      if (index >= 0) {
          updatedProposals = [...existingProposals];
          updatedProposals[index] = newProposal;
      } else {
          updatedProposals = [...existingProposals, newProposal];
      }

      setForm({ ...form, proposals: updatedProposals });
      setIsEditingProposal(false);
  };

  const handleEditProposal = (proposal: BuildingProposal) => {
      setCurrentProposal({
          ...proposal,
          telephoneDetails: proposal.telephoneDetails || { canAdd: false, costPerLine: '', borneBy: '' },
          structureChecklist: proposal.structureChecklist || { tiang: [], atap: [], dinding: [], lantai: [], pintu: [], jendela: [], others: [] },
          renovationDetailsObj: proposal.renovationDetailsObj || { costSharing: '', gracePeriod: '', items: { partition: false, paint: false, roof: '', lights: false, other: '' } },
          locationContext: proposal.locationContext || { right: '', left: '', front: '', back: '', nearIndustry: false, operationalHours: '' },
          businessNotes: proposal.businessNotes || { deliveryTime: '', dealersCount: '', staffComposition: '', margin: '', competitorPareto: '' }
      });
      setIsEditingProposal(true);
      setProposalTab('INFO UTAMA');
  };

  const handleAddProposal = () => {
      setCurrentProposal({
          name: `Kandidat ${ (form.proposals?.length || 0) + 1}`,
          address: { jl: '', kota: '', kabupaten: '', propinsi: '' },
          floors: { ground: '', f1: '', f2: '', f3: '', f4: '' },
          owner: { name: '', address: '', phone: '' },
          surveySummary: { pros: '', cons: '' },
          securityFeatures: [],
          structureChecklist: { tiang: [], atap: [], dinding: [], lantai: [], pintu: [], jendela: [], others: [] },
          renovationDetailsObj: { costSharing: '', gracePeriod: '', items: { partition: false, paint: false, roof: '', lights: false, other: '' } },
          locationContext: { right: '', left: '', front: '', back: '', nearIndustry: false, operationalHours: '' },
          businessNotes: { deliveryTime: '', dealersCount: '', staffComposition: '', margin: '', competitorPareto: '' },
          documents: [],
          environmentConditions: []
      });
      setIsEditingProposal(true);
      setProposalTab('INFO UTAMA');
  };

  const handleDeleteProposal = (id: string) => {
      setForm({ ...form, proposals: form.proposals?.filter(p => p.id !== id) });
  };

  const handleFloorPlanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setForm(prev => ({ ...prev, floorPlanImage: ev.target?.result as string }));
          };
          reader.readAsDataURL(file);
      }
  };

  // Toggle helpers for MAIN FORM
  const toggleCheckbox = (listName: 'documentsAvailable' | 'environmentConditions', value: string) => {
      if (isView) return;
      const list = form[listName] || [];
      if (list.includes(value)) {
          setForm({ ...form, [listName]: list.filter(item => item !== value) });
      } else {
          setForm({ ...form, [listName]: [...list, value] });
      }
  };

  const toggleStructureCheckboxForm = (category: string, value: string) => {
      if(isView) return;
      const list = form.structureChecklist?.[category] || [];
      const updatedList = list.includes(value) ? list.filter(i => i !== value) : [...list, value];
      setForm({ 
          ...form, 
          structureChecklist: { ...form.structureChecklist!, [category]: updatedList } 
      });
  };

  const toggleProposalCheckbox = (field: 'securityFeatures' | 'documents' | 'environmentConditions', value: string) => {
      const list = currentProposal[field] || [];
      const updatedList = list.includes(value) ? list.filter(i => i !== value) : [...list, value];
      setCurrentProposal({ ...currentProposal, [field]: updatedList });
  };

  const toggleStructureCheckboxProposal = (category: keyof typeof currentProposal.structureChecklist, value: string) => {
      const list = currentProposal.structureChecklist?.[category] || [];
      const updatedList = list.includes(value) ? list.filter(i => i !== value) : [...list, value];
      setCurrentProposal({ 
          ...currentProposal, 
          structureChecklist: { ...currentProposal.structureChecklist!, [category]: updatedList } 
      });
  };

  const SectionHeader = ({ num, title, sub }: { num?: string, title: string, sub?: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      {num && <div className="w-1.5 h-6 bg-black rounded-full"></div>}
      <div>
        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
        {sub && <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{sub}</p>}
      </div>
    </div>
  );

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
      {children}
    </label>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string, icon?: any }) => (
    <div className="mb-4">
      {props.label && <Label>{props.label}</Label>}
      <div className="relative">
        <input 
            {...props}
            className={`w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[13px] font-black text-black outline-none transition-all placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 ${props.className} ${props.icon ? 'pl-12' : ''}`}
            disabled={isView || props.disabled}
        />
        {props.icon && <props.icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />}
      </div>
    </div>
  );

  const CheckboxGroup = ({ title, items, selected, onChange }: { title: string, items: string[], selected: string[], onChange: (val: string) => void }) => (
      <div className="mb-4">
          <Label>{title}</Label>
          <div className="grid grid-cols-2 gap-2">
              {items.map(item => (
                  <label key={item} className="flex items-center gap-2 p-2 bg-[#F8F9FA] rounded-lg cursor-pointer hover:bg-gray-100 transition-all">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${selected.includes(item) ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                          {selected.includes(item) && <CheckCircle2 size={10} className="text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={selected.includes(item)} onChange={() => onChange(item)} disabled={isView} />
                      <span className="text-[10px] font-bold text-gray-600">{item}</span>
                  </label>
              ))}
          </div>
      </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Building size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                    {form.name || 'NEW BRANCH REQUEST'}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">
                    {form.assetNo} • {form.type || 'BRANCH'}
                </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-[#FFF7ED] text-[#EA580C] text-[10px] font-black uppercase tracking-widest rounded-xl border border-[#FDBA74]/50">
                  {form.status || 'PENDING'}
              </span>
              <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
                <X size={28} strokeWidth={2} />
              </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8 overflow-x-auto no-scrollbar">
            {['INFORMASI UMUM', 'PROPOSAL & PERBANDINGAN', 'WORKFLOW', 'FLOOR PLAN', 'FINANCIAL SUMMARY', 'DOKUMEN'].map(tab => {
                // Hide Proposal Tab if Ownership is Own
                if (tab === 'PROPOSAL & PERBANDINGAN' && form.ownership === 'Own') return null;
                return (
                    <button 
                        key={tab}
                        onClick={() => { setActiveTab(tab); setIsEditingProposal(false); }}
                        className={`py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[4px] whitespace-nowrap
                            ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                    >
                        {tab}
                    </button>
                )
            })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#FBFBFB]">
            <>
            {activeTab === 'INFORMASI UMUM' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['Rent', 'Own'].map(type => (
                            <button
                                key={type}
                                onClick={() => !isView && setForm({...form, ownership: type as any})}
                                disabled={isView}
                                className={`h-40 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-300 group border-2
                                    ${form.ownership === type 
                                    ? 'bg-black text-white border-black shadow-2xl shadow-black/20 scale-[1.02]' 
                                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                            >
                                <div className={`p-4 rounded-full ${form.ownership === type ? 'bg-white/20' : 'bg-gray-50'}`}>
                                    {type === 'Rent' ? <Key size={24} /> : <Home size={24} />}
                                </div>
                                <div className="text-center">
                                    <span className="text-[14px] font-black uppercase tracking-widest block">{type === 'Rent' ? 'SEWA (LEASE)' : 'MILIK SENDIRI (OWN)'}</span>
                                    <span className={`text-[9px] font-bold uppercase tracking-wider mt-1 block ${form.ownership === type ? 'text-white/60' : 'text-gray-300'}`}>
                                        {type === 'Rent' ? 'SEWA TAHUNAN / KONTRAK' : 'ASET PERUSAHAAN / BELI PUTUS'}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <SectionHeader num="2" title="2. IDENTITAS ASET" sub="ASSET CLASSIFICATION & NUMBERING" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="md:col-span-2">
                                <div className="flex justify-between items-center mb-2">
                                    <Label>NAMA PROPERTI / GEDUNG <span className="text-red-500">*</span></Label>
                                    {!isView && (
                                        <button 
                                            onClick={() => setIsManualInput(!isManualInput)} 
                                            className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline uppercase tracking-wider"
                                        >
                                            {isManualInput ? "Pilih dari Daftar Gedung" : "Input Nama Gedung Baru"}
                                        </button>
                                    )}
                                </div>
                                
                                {isManualInput ? (
                                    <input 
                                        type="text"
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-black/5"
                                        value={form.name || ''} 
                                        onChange={e => setForm({...form, name: e.target.value})} 
                                        placeholder="Contoh: MODENA Home Center Bintaro"
                                        disabled={isView}
                                    />
                                ) : (
                                    <div className="relative">
                                        <select 
                                            disabled={isView}
                                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none appearance-none shadow-sm cursor-pointer"
                                            value={existingBuildings.find(b => b.name === form.name) ? form.name : ''}
                                            onChange={handleBuildingSelect}
                                        >
                                            <option value="">-- Pilih Gedung untuk Perbaikan --</option>
                                            {existingBuildings.map(b => (
                                                <option key={b.id} value={b.name}>{b.name}</option>
                                            ))}
                                            <option value="NEW_ENTRY">-- Input Gedung Baru --</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <Label>ASSET NUMBER</Label>
                                <div className="w-full bg-[#F8F9FA] rounded-2xl px-6 py-5 text-[14px] font-black text-gray-400 cursor-not-allowed">
                                    {form.assetNo}
                                </div>
                            </div>

                            <div>
                                <Label>TIPE GEDUNG <span className="text-red-500">*</span></Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView}
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[14px] font-black text-black outline-none appearance-none shadow-sm cursor-pointer"
                                        value={form.type || ''}
                                        onChange={(e) => setForm({...form, type: e.target.value})}
                                    >
                                        <option value="">(PILIH TIPE)</option>
                                        {buildingTypeList.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Internal Tabs for Information - UPDATED STYLE */}
                        <div className="flex flex-wrap gap-2 bg-gray-50 p-1.5 rounded-2xl mb-8 w-full md:w-fit">
                            {['INFO UTAMA', 'SPESIFIKASI FISIK', 'RENOVASI & LINGKUNGAN', 'BIAYA & LEGAL'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setGeneralInfoTab(tab)}
                                    className={`px-5 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap flex-1 md:flex-none ${
                                        generalInfoTab === tab 
                                        ? 'bg-black text-white shadow-lg shadow-black/20 scale-105' 
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* 1. INFO UTAMA (Lokasi & Utilitas) */}
                        {generalInfoTab === 'INFO UTAMA' && (
                            <>
                                <div>
                                    <SectionHeader num="1" title="ALAMAT LOKASI" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <Input label="JALAN / ALAMAT LENGKAP" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} placeholder="Input alamat lengkap..." />
                                        </div>
                                        <Input label="KOTA" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} />
                                        <Input label="KABUPATEN" value={form.district} onChange={(e) => setForm({...form, district: e.target.value})} />
                                        <Input label="PROPINSI" value={form.province} onChange={(e) => setForm({...form, province: e.target.value})} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 mt-4">
                                        <Input label="JARAK KE DEALER (KM)" value={form.distanceToDealer} onChange={(e) => setForm({...form, distanceToDealer: e.target.value})} />
                                        <Input label="KONDISI JALAN / AKSES" value={form.roadCondition} onChange={(e) => setForm({...form, roadCondition: e.target.value})} />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <SectionHeader num="2" title="UTILITAS" />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Input label="LISTRIK (WATT/AMPERE)" value={form.electricityPower} onChange={(e) => setForm({...form, electricityPower: e.target.value})} icon={Zap} />
                                        <Input label="SUMBER AIR" value={form.waterSource} onChange={(e) => setForm({...form, waterSource: e.target.value})} />
                                        <Input label="LINE TELEPON (QTY)" value={form.phoneLineCount} onChange={(e) => setForm({...form, phoneLineCount: e.target.value})} icon={Phone} />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* 2. SPESIFIKASI FISIK */}
                        {generalInfoTab === 'SPESIFIKASI FISIK' && (
                            <>
                                <div>
                                    <SectionHeader num="3" title="DIMENSI & FISIK" />
                                    <div className="grid grid-cols-3 gap-6">
                                        <Input label="LUAS TANAH (M2)" type="number" value={form.landArea} onChange={(e) => setForm({...form, landArea: e.target.value})} />
                                        <Input label="LUAS BANGUNAN (M2)" type="number" value={form.buildingArea} onChange={(e) => setForm({...form, buildingArea: e.target.value})} />
                                        <Input label="HALAMAN DEPAN (M2)" type="number" value={form.frontYardArea} onChange={(e) => setForm({...form, frontYardArea: e.target.value})} />
                                        <Input label="JUMLAH TINGKAT" value={form.totalFloors} onChange={(e) => setForm({...form, totalFloors: e.target.value})} />
                                        <Input label="KAPASITAS PARKIR" value={form.parkingCapacity} onChange={(e) => setForm({...form, parkingCapacity: e.target.value})} />
                                        <Input label="USIA BANGUNAN (THN)" value={form.buildingAge} onChange={(e) => setForm({...form, buildingAge: e.target.value})} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 mt-4">
                                        <Input label="KONDISI PAGAR" value={form.fenceCondition} onChange={(e) => setForm({...form, fenceCondition: e.target.value})} />
                                        <Input label="KONDISI PINTU PAGAR" value={form.gateCondition} onChange={(e) => setForm({...form, gateCondition: e.target.value})} />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <SectionHeader num="4" title="MATERIAL & STRUKTUR" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <CheckboxGroup title="TIANG / STRUKTUR" items={['Baja', 'Kayu', 'Beton']} selected={form.structureChecklist?.tiang || []} onChange={(v) => toggleStructureCheckboxForm('tiang', v)} />
                                        <CheckboxGroup title="ATAP" items={['Alumunium', 'Tanah Liat', 'Beton Cor', 'Genting Beton']} selected={form.structureChecklist?.atap || []} onChange={(v) => toggleStructureCheckboxForm('atap', v)} />
                                        <CheckboxGroup title="DINDING" items={['Batako', 'Bata Merah', 'Seng', 'Triplek']} selected={form.structureChecklist?.dinding || []} onChange={(v) => toggleStructureCheckboxForm('dinding', v)} />
                                        <CheckboxGroup title="LANTAI" items={['Keramik', 'Tanpa Keramik']} selected={form.structureChecklist?.lantai || []} onChange={(v) => toggleStructureCheckboxForm('lantai', v)} />
                                        <CheckboxGroup title="PINTU" items={['Kayu', 'Triplek', 'Baja', 'Alumunium', 'Seng']} selected={form.structureChecklist?.pintu || []} onChange={(v) => toggleStructureCheckboxForm('pintu', v)} />
                                        <CheckboxGroup title="JENDELA" items={['Kayu', 'Alumunium', 'Besi']} selected={form.structureChecklist?.jendela || []} onChange={(v) => toggleStructureCheckboxForm('jendela', v)} />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* 3. RENOVASI & LINGKUNGAN */}
                        {generalInfoTab === 'RENOVASI & LINGKUNGAN' && (
                            <>
                                <div>
                                    <SectionHeader num="5" title="KONDISI LINGKUNGAN" />
                                    <div className="grid grid-cols-1 gap-6 mb-6">
                                        <Label>BATAS LOKASI / POSISI</Label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="DEPAN" value={form.locationContext?.front} onChange={(e) => setForm({...form, locationContext: {...form.locationContext!, front: e.target.value}})} placeholder="Ada apa di depan?" />
                                            <Input label="BELAKANG" value={form.locationContext?.back} onChange={(e) => setForm({...form, locationContext: {...form.locationContext!, back: e.target.value}})} placeholder="Ada apa di belakang?" />
                                            <Input label="KANAN" value={form.locationContext?.right} onChange={(e) => setForm({...form, locationContext: {...form.locationContext!, right: e.target.value}})} placeholder="Ada apa di kanan?" />
                                            <Input label="KIRI" value={form.locationContext?.left} onChange={(e) => setForm({...form, locationContext: {...form.locationContext!, left: e.target.value}})} placeholder="Ada apa di kiri?" />
                                        </div>
                                    </div>
                                    <CheckboxGroup title="TIPE LINGKUNGAN" items={['Cluster', 'Padat Penduduk', 'Pergudangan', 'Perkantoran', 'Dekat Lapangan']} selected={form.environmentConditions || []} onChange={(v) => toggleCheckbox('environmentConditions', v)} />
                                </div>

                                <div className="mt-8">
                                    <SectionHeader num="6" title="KEBUTUHAN RENOVASI" />
                                    <div className="flex gap-4 mb-4">
                                        <label className="flex items-center gap-2"><input type="radio" checked={form.renovationNeeded} onChange={() => setForm({...form, renovationNeeded: true})} /> <span className="text-[11px] font-bold">Perlu Renovasi</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" checked={!form.renovationNeeded} onChange={() => setForm({...form, renovationNeeded: false})} /> <span className="text-[11px] font-bold">Tidak Perlu</span></label>
                                    </div>
                                    {form.renovationNeeded && (
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="ESTIMASI BIAYA (+/- RP)" value={form.renovationCostEstimate} onChange={(e) => setForm({...form, renovationCostEstimate: e.target.value})} />
                                            <Input label="ESTIMASI WAKTU (HARI)" value={form.renovationTimeEstimate} onChange={(e) => setForm({...form, renovationTimeEstimate: e.target.value})} />
                                            <Input label="DITANGGUNG OLEH (%)" value={form.renovationDetailsObj?.costSharing} onChange={(e) => setForm({...form, renovationDetailsObj: {...form.renovationDetailsObj!, costSharing: e.target.value}})} placeholder="Contoh: Pemilik 50%, Penyewa 50%" />
                                            <Input label="TENGGANG WAKTU (GRACE PERIOD)" value={form.renovationDetailsObj?.gracePeriod} onChange={(e) => setForm({...form, renovationDetailsObj: {...form.renovationDetailsObj!, gracePeriod: e.target.value}})} placeholder="Hari" />
                                            
                                            <div className="md:col-span-2">
                                                <Label>ITEM RENOVASI</Label>
                                                <div className="grid grid-cols-2 gap-4 mt-2">
                                                    <label className="flex items-center gap-2"><input type="checkbox" checked={form.renovationDetailsObj?.items.partition} onChange={(e) => setForm({...form, renovationDetailsObj: {...form.renovationDetailsObj!, items: {...form.renovationDetailsObj!.items, partition: e.target.checked}}})} /> <span className="text-[10px] font-bold">Sekat Ruangan</span></label>
                                                    <label className="flex items-center gap-2"><input type="checkbox" checked={form.renovationDetailsObj?.items.paint} onChange={(e) => setForm({...form, renovationDetailsObj: {...form.renovationDetailsObj!, items: {...form.renovationDetailsObj!.items, paint: e.target.checked}}})} /> <span className="text-[10px] font-bold">Pengecatan</span></label>
                                                    <label className="flex items-center gap-2"><input type="checkbox" checked={form.renovationDetailsObj?.items.lights} onChange={(e) => setForm({...form, renovationDetailsObj: {...form.renovationDetailsObj!, items: {...form.renovationDetailsObj!.items, lights: e.target.checked}}})} /> <span className="text-[10px] font-bold">Lampu-Lampu</span></label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* 4. BIAYA & LEGAL */}
                        {generalInfoTab === 'BIAYA & LEGAL' && (
                            <>
                                <div>
                                    <SectionHeader num="7" title="FINANSIAL" />
                                    {form.ownership === 'Rent' ? (
                                        <div className="grid grid-cols-2 gap-6">
                                            <Input label="HARGA SEWA / TAHUN (RP)" type="number" value={form.rentCost} onChange={(e) => setForm({...form, rentCost: e.target.value})} />
                                            <Input label="PERIODE SEWA (THN)" value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} placeholder="Min - Max Tahun" />
                                            <Input label="PAJAK PPH DITANGGUNG" value={form.taxPPH} onChange={(e) => setForm({...form, taxPPH: e.target.value})} placeholder="Pemilik / Penyewa" />
                                            <Input label="BIAYA NOTARIS" value={form.notaryFee} onChange={(e) => setForm({...form, notaryFee: e.target.value})} placeholder="Pemilik % / Penyewa %" />
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-6">
                                            <Input label="HARGA BELI (RP)" type="number" value={form.purchasePrice} onChange={(e) => setForm({...form, purchasePrice: e.target.value})} />
                                            <Input label="TANGGAL BELI" type="date" value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} />
                                            <Input label="BIAYA NOTARIS & PAJAK" value={form.notaryFee} onChange={(e) => setForm({...form, notaryFee: e.target.value})} placeholder="Total Biaya Legal" />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8">
                                    <SectionHeader num="8" title="LEGALITAS & PEMILIK" />
                                    <div className="grid grid-cols-2 gap-6 mb-6">
                                        <Input label="NAMA PEMILIK" value={form.ownerName} onChange={(e) => setForm({...form, ownerName: e.target.value})} icon={User} />
                                        <Input label="NO TELP PEMILIK" value={form.ownerPhone} onChange={(e) => setForm({...form, ownerPhone: e.target.value})} icon={Phone} />
                                        <Input label="ALAMAT PEMILIK" value={form.ownerAddress} onChange={(e) => setForm({...form, ownerAddress: e.target.value})} />
                                    </div>
                                    <CheckboxGroup title="DOKUMEN TERSEDIA" items={['SHM', 'SHGB', 'IMB']} selected={form.documentsAvailable || []} onChange={(v) => toggleCheckbox('documentsAvailable', v)} />
                                </div>

                                <div className="bg-blue-50 p-6 rounded-[2.5rem] border border-blue-100 mt-8">
                                    <SectionHeader num="9" title="ANALISA BISNIS (BM NOTES)" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <Input label="ESTIMASI OMZET/TAHUN" value={form.businessNotes?.margin} onChange={(e) => setForm({...form, businessNotes: {...form.businessNotes!, margin: e.target.value}})} />
                                        <Input label="WAKTU PENGIRIMAN (HARI)" value={form.businessNotes?.deliveryTime} onChange={(e) => setForm({...form, businessNotes: {...form.businessNotes!, deliveryTime: e.target.value}})} />
                                        <Input label="JUMLAH DEALER PARETO" value={form.businessNotes?.dealersCount} onChange={(e) => setForm({...form, businessNotes: {...form.businessNotes!, dealersCount: e.target.value}})} />
                                        <Input label="KOMPOSISI STAFF" value={form.businessNotes?.staffComposition} onChange={(e) => setForm({...form, businessNotes: {...form.businessNotes!, staffComposition: e.target.value}})} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'PROPOSAL & PERBANDINGAN' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {!isEditingProposal ? (
                        <>
                            {form.proposals && form.proposals.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {form.proposals.map((proposal) => (
                                        <div key={proposal.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-black text-white rounded-xl">
                                                    <Building size={20} />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleEditProposal(proposal)} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"><Edit3 size={16} /></button>
                                                    <button onClick={() => handleDeleteProposal(proposal.id)} className="p-2 bg-red-50 rounded-lg hover:bg-red-100 text-red-500 transition-all"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                            <h3 className="text-[14px] font-black text-black uppercase tracking-tight">{proposal.name}</h3>
                                            <p className="text-[11px] text-gray-500 font-medium mt-1 truncate">{proposal.address.jl}, {proposal.address.kota}</p>
                                            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                                <div>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">HARGA SEWA</p>
                                                    <p className="text-[13px] font-mono font-black text-black">Rp {parseInt(proposal.rentPrice || '0').toLocaleString('id-ID')}</p>
                                                </div>
                                                <span className="bg-gray-50 px-3 py-1 rounded-lg text-[9px] font-bold uppercase text-gray-600 border border-gray-100">{proposal.leaseNature}</span>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {!isView && (
                                        <button onClick={handleAddProposal} className="bg-[#F8F9FA] rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 hover:border-black transition-all group min-h-[250px]">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-black group-hover:text-white transition-all">
                                                <Plus size={24} />
                                            </div>
                                            <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest group-hover:text-black">Tambah Kandidat</h3>
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-[#F8F9FA] rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200">
                                    <div className="mb-6">
                                        <h3 className="text-[16px] font-black text-black uppercase tracking-tight">PERBANDINGAN KANDIDAT</h3>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2">BELUM ADA OPSI PROPERTI</p>
                                    </div>
                                    {!isView && (
                                        <button onClick={handleAddProposal} className="bg-black text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 shadow-xl transition-all flex items-center gap-3">
                                            <Plus size={16} /> Tambah Kandidat
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center gap-4 mb-4">
                                <button onClick={() => setIsEditingProposal(false)} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"><ChevronLeft size={20} /></button>
                                <div>
                                    <h3 className="text-[16px] font-black text-black uppercase tracking-tight">INPUT DATA KANDIDAT</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PROPOSAL LENGKAP</p>
                                </div>
                            </div>

                            {/* Internal Tabs for Proposal - UPDATED STYLE */}
                            <div className="flex flex-wrap gap-2 bg-gray-50 p-1.5 rounded-2xl mb-8 w-full md:w-fit">
                                {['INFO UTAMA', 'SPESIFIKASI FISIK', 'RENOVASI & LINGKUNGAN', 'BIAYA & LEGAL'].map(tab => (
                                    <button 
                                        key={tab}
                                        onClick={() => setProposalTab(tab)}
                                        className={`px-5 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap flex-1 md:flex-none ${
                                            proposalTab === tab 
                                            ? 'bg-black text-white shadow-lg shadow-black/20 scale-105' 
                                            : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10">
                                
                                {/* 1. INFO UTAMA (Lokasi & Utilitas) */}
                                
                            </div>
                        </div>
                    )}
                </div>
            )}
            </>
        </div>
      </div>
    </div>
  );
};
