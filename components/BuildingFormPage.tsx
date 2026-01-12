
import React, { useState, useEffect, useRef } from 'react';
import { Save, Building, Phone, FileText, CheckCircle2, Clock, Trash2, Plus, ChevronDown, User, Home, Zap, Key, UploadCloud, MousePointer2, ChevronLeft, Edit3, ArrowLeft, MapPin, Ruler, DollarSign, FileCheck, X, Briefcase, Calendar, Calculator, CheckSquare, ShieldCheck, Droplets, Layers, Image as ImageIcon, Camera, CreditCard, FileBadge, Scale, Layout, History, Receipt } from 'lucide-react';
import { BuildingRecord, GeneralMasterItem, BuildingProposal, RentalHistoryRecord } from '../types';

interface Props {
  onBack: () => void;
  onSave: (data: Partial<BuildingRecord>) => void;
  initialData?: BuildingRecord | null;
  mode?: 'create' | 'edit' | 'view';
  buildingTypeList?: GeneralMasterItem[];
  existingBuildings?: BuildingRecord[];
}

export const BuildingFormPage: React.FC<Props> = ({ 
    onBack, 
    onSave, 
    initialData, 
    mode = 'create',
    buildingTypeList = [],
    existingBuildings = []
}) => {
  // Navigation State
  const [activeSection, setActiveSection] = useState('section-info');

  // Floor Photo Upload State
  const floorFileInputRef = useRef<HTMLInputElement>(null);
  const [activeFloorUpload, setActiveFloorUpload] = useState<string | null>(null);

  // General Photo Upload State
  const generalFileInputRef = useRef<HTMLInputElement>(null);
  const [activeGeneralUpload, setActiveGeneralUpload] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<BuildingRecord>>({
    status: 'Pending',
    ownership: 'Rent',
    workflow: [],
    // Defaults matching PDF
    telephoneDetails: { canAdd: false, costPerLine: '', borneBy: 'Penyewa' },
    electricityDetails: { power: '', source: 'PLN' },
    waterSource: 'Pam',
    landDimensions: { length: '', width: '', total: '' },
    buildingDimensions: { length: '', width: '', total: '' },
    yardDimensions: { length: '', width: '', total: '' },
    fenceDetails: { material: '', condition: 'Baik', height: '', gateMaterial: '', gateCondition: 'Baik', gateHeight: '' },
    parkingDetails: { hasParking: false, capacity: '' },
    securityChecklist: [],
    floorDimensions: { 
        dasar: { l: '', w: '', area: '', photo: '' },
        lt1: { l: '', w: '', area: '', photo: '' },
        lt2: { l: '', w: '', area: '', photo: '' },
        lt3: { l: '', w: '', area: '', photo: '' },
        lt4: { l: '', w: '', area: '', photo: '' },
    },
    materialChecklist: [],
    proposals: [],
    rentalHistory: []
  });

  const [isManualInput, setIsManualInput] = useState(false);
  
  // Calculate area helper
  const calculateArea = (length: string, width: string) => {
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      return (l * w).toFixed(2);
  };

  useEffect(() => {
      if (initialData) {
        setForm(initialData);
        setIsManualInput(true);
      } else {
         // Defaults
         setIsManualInput(existingBuildings.length === 0);
      }
  }, [initialData, existingBuildings]);

  const isView = mode === 'view';

  // --- Scrolling Logic ---
  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(id);
      }
  };

  // --- Handlers ---
  const handleDimensionChange = (
      group: 'landDimensions' | 'buildingDimensions' | 'yardDimensions', 
      field: 'length' | 'width', 
      value: string
  ) => {
      const currentGroup = form[group] || { length: '', width: '', total: '' };
      const newGroup = { ...currentGroup, [field]: value };
      newGroup.total = calculateArea(newGroup.length, newGroup.width);
      setForm(prev => ({ ...prev, [group]: newGroup }));
  };

  const handleFloorDimensionChange = (floor: keyof typeof form.floorDimensions, field: 'l' | 'w', value: string) => {
      const currentFloors = { ...form.floorDimensions } as any;
      currentFloors[floor] = { ...currentFloors[floor], [field]: value };
      currentFloors[floor].area = calculateArea(currentFloors[floor].l, currentFloors[floor].w);
      setForm(prev => ({ ...prev, floorDimensions: currentFloors }));
  };

  const handleFloorPhotoUpload = (floor: string) => {
      if (!isView) {
          setActiveFloorUpload(floor);
          setTimeout(() => floorFileInputRef.current?.click(), 0);
      }
  };

  const onFloorFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && activeFloorUpload) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              const currentFloors = { ...form.floorDimensions } as any;
              currentFloors[activeFloorUpload] = { 
                  ...currentFloors[activeFloorUpload], 
                  photo: ev.target?.result as string 
              };
              setForm(prev => ({ ...prev, floorDimensions: currentFloors }));
          };
          reader.readAsDataURL(file);
      }
      e.target.value = ''; // Reset
  };

  const handleRemoveFloorPhoto = (e: React.MouseEvent, floor: string) => {
      e.stopPropagation();
      if (!isView) {
          const currentFloors = { ...form.floorDimensions } as any;
          currentFloors[floor] = { ...currentFloors[floor], photo: '' };
          setForm(prev => ({ ...prev, floorDimensions: currentFloors }));
      }
  };

  // General Photo Handlers (used for visual docs AND legal docs)
  const handleGeneralPhotoUpload = (field: string) => {
      if (!isView) {
          setActiveGeneralUpload(field);
          setTimeout(() => generalFileInputRef.current?.click(), 0);
      }
  };

  const onGeneralFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && activeGeneralUpload) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setForm(prev => ({ ...prev, [activeGeneralUpload]: ev.target?.result as string }));
          };
          reader.readAsDataURL(file);
      }
      e.target.value = '';
  };

  const handleRemoveGeneralPhoto = (e: React.MouseEvent, field: string) => {
      e.stopPropagation();
      if (!isView) {
          setForm(prev => ({ ...prev, [field]: '' }));
      }
  };

  const toggleChecklist = (field: 'securityChecklist' | 'materialChecklist', item: string) => {
      const list = form[field] || [];
      if (list.includes(item)) {
          setForm(prev => ({ ...prev, [field]: list.filter(i => i !== item) }));
      } else {
          setForm(prev => ({ ...prev, [field]: [...list, item] }));
      }
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
              }));
          }
      }
  };

  // --- UI Components ---
  const SectionHeader = ({ num, title, sub, icon: Icon }: any) => (
    <div className="flex items-start gap-4 mb-8 pb-4 border-b border-gray-100">
      <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shrink-0 shadow-lg shadow-black/20">
          {Icon ? <Icon size={20} /> : <span className="font-black text-[14px]">{num}</span>}
      </div>
      <div>
        <h3 className="text-[16px] font-black text-black uppercase tracking-tight">{title}</h3>
        {sub && <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">{sub}</p>}
      </div>
    </div>
  );

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
      {children}
    </label>
  );

  const Input = (props: any) => (
    <div className={`mb-4 w-full ${props.wrapperClassName}`}>
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

  const CheckboxItem = ({ label, checked, onChange }: any) => (
      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${checked ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>
          <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-white border-white' : 'bg-gray-100 border-gray-300'}`}>
              {checked && <div className="w-2 h-2 rounded-full bg-black"></div>}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
          <input type="checkbox" className="hidden" checked={checked} onChange={onChange} disabled={isView} />
      </label>
  );

  // Reusable Upload Box Component for General Photos
  const GeneralUploadBox = ({ label, uploadKey, icon: Icon = Camera }: { label: string, uploadKey: keyof BuildingRecord, icon?: any }) => {
      const preview = form[uploadKey] as string;
      return (
        <div 
             onClick={() => handleGeneralPhotoUpload(uploadKey)}
             className={`w-full h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all cursor-pointer group
                ${preview ? 'border-gray-200 bg-white' : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-black'}
             `}
             title={`Upload ${label}`}
        >
             {preview ? (
                 <div className="relative w-full h-full group/photo">
                     <img src={preview} className="w-full h-full object-cover" alt={label} />
                     {!isView && (
                         <button 
                            onClick={(e) => handleRemoveGeneralPhoto(e, uploadKey)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center text-white transition-opacity"
                         >
                             <Trash2 size={16} />
                         </button>
                     )}
                     <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center">
                         <span className="text-[9px] font-bold text-white uppercase tracking-wider">{label}</span>
                     </div>
                 </div>
             ) : (
                 <div className="flex flex-col items-center gap-2">
                     <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={16} className="text-gray-400 group-hover:text-black" />
                     </div>
                     <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-black tracking-widest">{label}</span>
                 </div>
             )}
        </div>
      );
  };

  return (
    <div className="flex flex-col h-full bg-[#FBFBFB] animate-in fade-in duration-300 relative">
      
      {/* Sticky Header with Anchor Navigation */}
      <div className="sticky top-0 z-30 px-8 py-6 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between shrink-0 transition-all">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack} 
            className="w-10 h-10 bg-gray-50 hover:bg-black hover:text-white rounded-xl flex items-center justify-center transition-all group"
          >
            <ArrowLeft size={20} className="text-gray-400 group-hover:text-white" strokeWidth={2.5} />
          </button>
          
          <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'INPUT DATA GEDUNG (PDF FORMAT)' : 'DETAIL GEDUNG (PDF FORMAT)'}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        REF: F.50/MI-HCO/R00/2021
                    </span>
                </div>
            </div>
        </div>

        <div className="hidden xl:flex gap-1 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
            {[
                { id: 'section-info', label: '1. INFO UTAMA' },
                { id: 'section-1', label: '2. ALAMAT' },
                { id: 'section-2', label: '3. UTILITAS' },
                { id: 'section-3', label: '4. DIMENSI' },
                { id: 'section-4', label: 'KEAMANAN' },
                { id: 'section-5', label: '5. LANTAI' },
                { id: 'section-6', label: '6. MATERIAL' },
                { id: 'section-8', label: 'LEGALITAS' },
                { id: 'section-7', label: 'DOKUMENTASI' }
            ].map(item => (
                <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                        ${activeSection === item.id ? 'bg-black text-white shadow-md' : 'text-gray-400 hover:text-black hover:bg-white'}`}
                >
                    {item.label}
                </button>
            ))}
        </div>
      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Main Form Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12 pb-32 scroll-smooth">
             
             {/* Center Content with max-width */}
             <div className="max-w-5xl mx-auto space-y-12">
             
             {/* SECTION 0: IDENTITAS & KEPEMILIKAN */}
             <section id="section-info" className="scroll-mt-32">
                <SectionHeader num="1" title="IDENTITAS & KEPEMILIKAN" sub="Status & Ownership" icon={Building} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {['Rent', 'Own'].map(type => (
                        <button
                            key={type}
                            onClick={() => !isView && setForm({...form, ownership: type as any})}
                            disabled={isView}
                            className={`h-24 rounded-2xl flex items-center justify-center gap-4 transition-all duration-300 border-2
                                ${form.ownership === type 
                                ? 'bg-white border-black ring-4 ring-gray-50' 
                                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                        >
                            <div className={`p-3 rounded-xl ${form.ownership === type ? 'bg-black text-white' : 'bg-gray-50 text-gray-300'}`}>
                                {type === 'Rent' ? <Key size={20} /> : <Home size={20} />}
                            </div>
                            <div className="text-left">
                                <span className={`text-[14px] font-black uppercase tracking-tight block ${form.ownership === type ? 'text-black' : 'text-gray-400'}`}>
                                    {type === 'Rent' ? 'SEWA (RENT)' : 'MILIK SENDIRI (OWN)'}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-2">
                                <Label>NAMA PROPERTI / GEDUNG</Label>
                                {!isView && (
                                    <button onClick={() => setIsManualInput(!isManualInput)} className="text-[9px] font-bold text-blue-600 hover:underline uppercase tracking-wider">
                                        {isManualInput ? "Pilih dari Daftar" : "Input Manual"}
                                    </button>
                                )}
                            </div>
                            {isManualInput ? (
                                <input 
                                    type="text"
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[16px] font-black text-black outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-black/5"
                                    value={form.name || ''} 
                                    onChange={e => setForm({...form, name: e.target.value})} 
                                    placeholder="Contoh: MODENA Home Center Bintaro"
                                    disabled={isView}
                                />
                            ) : (
                                <div className="relative">
                                    <select 
                                        disabled={isView}
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[16px] font-black text-black outline-none appearance-none shadow-sm cursor-pointer"
                                        value={existingBuildings.find(b => b.name === form.name) ? form.name : ''}
                                        onChange={handleBuildingSelect}
                                    >
                                        <option value="">-- Pilih Gedung --</option>
                                        {existingBuildings.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                                        <option value="NEW_ENTRY">+ Input Gedung Baru</option>
                                    </select>
                                    <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <Label>TIPE GEDUNG</Label>
                            <div className="relative">
                                <select 
                                    disabled={isView}
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[13px] font-black text-black outline-none appearance-none shadow-sm cursor-pointer"
                                    value={form.type || ''}
                                    onChange={(e) => setForm({...form, type: e.target.value})}
                                >
                                    <option value="">(PILIH TIPE)</option>
                                    {buildingTypeList.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                </select>
                                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <Label>ASSET NUMBER</Label>
                            <div className="w-full bg-gray-100 rounded-2xl px-5 py-4 text-[13px] font-black text-gray-500 cursor-not-allowed border border-transparent">
                                {form.assetNo || '[AUTO GENERATED]'}
                            </div>
                        </div>
                    </div>

                    {/* CONDITIONAL FIELDS BASED ON OWNERSHIP */}
                    <div className="pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-2 rounded-lg text-white ${form.ownership === 'Rent' ? 'bg-black' : 'bg-blue-600'}`}>
                                {form.ownership === 'Rent' ? <DollarSign size={16}/> : <FileBadge size={16}/>}
                            </div>
                            <h4 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">
                                {form.ownership === 'Rent' ? 'DETAIL BIAYA SEWA' : 'DETAIL LEGALITAS & NILAI ASET'}
                            </h4>
                        </div>

                        {form.ownership === 'Rent' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <Label>HARGA SEWA (PER TAHUN)</Label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                        <Input 
                                            type="number"
                                            className="pl-12"
                                            value={form.rentCost}
                                            onChange={(e: any) => setForm({...form, rentCost: e.target.value})}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <Label>DEPOSIT (JIKA ADA)</Label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                        <Input 
                                            type="number"
                                            className="pl-12"
                                            value={form.rentDeposit}
                                            onChange={(e: any) => setForm({...form, rentDeposit: e.target.value})}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="PERIODE MULAI" type="date" value={form.startDate} onChange={(e: any) => setForm({...form, startDate: e.target.value})} />
                                    <Input label="PERIODE BERAKHIR" type="date" value={form.endDate} onChange={(e: any) => setForm({...form, endDate: e.target.value})} />
                                </div>

                                <Input label="DURASI SEWA (TAHUN)" value={form.rentPeriod} onChange={(e: any) => setForm({...form, rentPeriod: e.target.value})} placeholder="Contoh: 2 Tahun" />
                                
                                <div className="md:col-span-2 grid grid-cols-2 gap-6">
                                    <Input label="NAMA PEMILIK / LESSOR" value={form.ownerName} onChange={(e: any) => setForm({...form, ownerName: e.target.value})} icon={User} placeholder="Nama Pemilik" />
                                    <Input label="NO HP PEMILIK" value={form.ownerPhone} onChange={(e: any) => setForm({...form, ownerPhone: e.target.value})} icon={Phone} placeholder="081..." />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <Label>HARGA BELI / PEROLEHAN</Label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                        <Input 
                                            type="number"
                                            className="pl-12"
                                            value={form.purchasePrice}
                                            onChange={(e: any) => setForm({...form, purchasePrice: e.target.value})}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <Input label="TANGGAL PEMBELIAN" type="date" value={form.purchaseDate} onChange={(e: any) => setForm({...form, purchaseDate: e.target.value})} />
                                
                                <div>
                                    <Label>JENIS SERTIFIKAT</Label>
                                    <div className="relative">
                                        <select 
                                            disabled={isView}
                                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[13px] font-black text-black outline-none appearance-none shadow-sm cursor-pointer"
                                            value={form.certificateType || ''}
                                            onChange={(e) => setForm({...form, certificateType: e.target.value as any})}
                                        >
                                            <option value="">(PILIH TIPE)</option>
                                            <option value="SHM">SHM (Hak Milik)</option>
                                            <option value="HGB">HGB (Guna Bangunan)</option>
                                            <option value="Strata">Strata Title</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <Input label="NOMOR SERTIFIKAT" value={form.certificateNo} onChange={(e: any) => setForm({...form, certificateNo: e.target.value})} placeholder="Nomor Sertifikat..." icon={FileText} />
                                
                                <div className="relative">
                                    <Label>NJOP (TERAKHIR)</Label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                        <Input 
                                            type="number"
                                            className="pl-12"
                                            value={form.njop}
                                            onChange={(e: any) => setForm({...form, njop: e.target.value})}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <Label>BIAYA PBB (PER TAHUN)</Label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                        <Input 
                                            type="number"
                                            className="pl-12"
                                            value={form.pbbTax}
                                            onChange={(e: any) => setForm({...form, pbbTax: e.target.value})}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
             </section>

             {/* 1. ALAMAT LOKASI */}
             <section id="section-1" className="scroll-mt-32">
                <SectionHeader num="2" title="ALAMAT LOKASI" sub="Location Details" icon={MapPin} />
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input label="JALAN (JL.)" value={form.address} onChange={(e: any) => setForm({...form, address: e.target.value})} placeholder="Nama Jalan Lengkap..." />
                        </div>
                        <Input label="KOTA" value={form.city} onChange={(e: any) => setForm({...form, city: e.target.value})} />
                        <Input label="KABUPATEN" value={form.kabupaten} onChange={(e: any) => setForm({...form, kabupaten: e.target.value})} />
                        <Input label="PROPINSI" value={form.province} onChange={(e: any) => setForm({...form, province: e.target.value})} />
                    </div>
                </div>
             </section>

             {/* ... OTHER SECTIONS ... */}
             {/* 2-4. UTILITAS */}
             <section id="section-2" className="scroll-mt-32">
                <SectionHeader num="3" title="UTILITAS BANGUNAN" sub="Telp, Listrik, Air" icon={Zap} />
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                    
                    {/* 2. Telepon */}
                    <div>
                        <h4 className="text-[11px] font-black text-black uppercase tracking-widest mb-4 flex items-center gap-2"><Phone size={14}/> 2. JUMLAH & NO. LINE TELP</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                            <Input label="JUMLAH LINE" placeholder="1, 2, 3..." value={form.telephoneDetails?.count} onChange={(e: any) => setForm({...form, telephoneDetails: {...form.telephoneDetails!, count: e.target.value}})} />
                            
                            <div>
                                <Label>BILA KURANG DITAMBAH?</Label>
                                <div className="flex gap-2">
                                    <button onClick={() => setForm({...form, telephoneDetails: {...form.telephoneDetails!, canAdd: true}})} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase ${form.telephoneDetails?.canAdd ? 'bg-black text-white' : 'bg-white border'}`}>YA</button>
                                    <button onClick={() => setForm({...form, telephoneDetails: {...form.telephoneDetails!, canAdd: false}})} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase ${!form.telephoneDetails?.canAdd ? 'bg-black text-white' : 'bg-white border'}`}>TIDAK</button>
                                </div>
                            </div>

                            <Input label="BIAYA PENAMBAHAN (RP)" type="number" value={form.telephoneDetails?.costPerLine} onChange={(e: any) => setForm({...form, telephoneDetails: {...form.telephoneDetails!, costPerLine: e.target.value}})} placeholder="0" />
                            
                            <div>
                                <Label>DITANGGUNG OLEH</Label>
                                <select className="w-full bg-white px-4 py-3 rounded-xl text-[12px] font-black border-none outline-none appearance-none cursor-pointer" value={form.telephoneDetails?.borneBy} onChange={(e: any) => setForm({...form, telephoneDetails: {...form.telephoneDetails!, borneBy: e.target.value}})}>
                                    <option value="Penyewa">PENYEWA</option>
                                    <option value="Pemilik">PEMILIK</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 3. Listrik */}
                    <div>
                        <h4 className="text-[11px] font-black text-black uppercase tracking-widest mb-4 flex items-center gap-2"><Zap size={14}/> 3. JUMLAH DAYA LISTRIK</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="AMPERE / VOLTAGE (110-220V)" value={form.electricityDetails?.power} onChange={(e: any) => setForm({...form, electricityDetails: {...form.electricityDetails!, power: e.target.value}})} placeholder="Contoh: 2200 VA / 10A" />
                            <div>
                                <Label>SUMBER LISTRIK</Label>
                                <div className="flex gap-2">
                                    {['PLN', 'Swasta'].map(s => (
                                        <button key={s} onClick={() => setForm({...form, electricityDetails: {...form.electricityDetails!, source: s as any}})} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase ${form.electricityDetails?.source === s ? 'bg-yellow-400 text-black' : 'bg-gray-50 border'}`}>{s}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Air */}
                    <div>
                        <h4 className="text-[11px] font-black text-black uppercase tracking-widest mb-4 flex items-center gap-2"><Droplets size={14}/> 4. SUMBER AIR</h4>
                        <div className="flex gap-3 flex-wrap">
                            {['PAM', 'POMPA', 'SUMUR', 'LAINNYA'].map(w => (
                                <button key={w} onClick={() => setForm({...form, waterDetails: w})} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${form.waterDetails === w ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-300'}`}>{w}</button>
                            ))}
                        </div>
                    </div>
                </div>
             </section>

             {/* 5. LUAS & DIMENSI */}
             <section id="section-3" className="scroll-mt-32">
                <SectionHeader num="4" title="LUAS & KONDISI FISIK" sub="Area Dimensions & Condition" icon={Ruler} />
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                    
                    {/* Dimensions Table */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                <tr>
                                    <th className="p-4">JENIS AREA</th>
                                    <th className="p-4 text-center">PANJANG (M)</th>
                                    <th className="p-4 text-center">LEBAR (M)</th>
                                    <th className="p-4 text-center">TOTAL (M2)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    { label: 'LUAS TANAH', key: 'landDimensions' },
                                    { label: 'LUAS BANGUNAN', key: 'buildingDimensions' },
                                    { label: 'HALAMAN DEPAN', key: 'yardDimensions' }
                                ].map((row: any) => (
                                    <tr key={row.key}>
                                        <td className="p-4 font-black text-[11px]">{row.label}</td>
                                        <td className="p-4"><input type="number" className="w-full text-center bg-gray-50 rounded-lg p-2 font-bold text-[12px]" placeholder="0" value={form[row.key as keyof BuildingRecord]?.length} onChange={(e) => handleDimensionChange(row.key, 'length', e.target.value)} /></td>
                                        <td className="p-4"><input type="number" className="w-full text-center bg-gray-50 rounded-lg p-2 font-bold text-[12px]" placeholder="0" value={form[row.key as keyof BuildingRecord]?.width} onChange={(e) => handleDimensionChange(row.key, 'width', e.target.value)} /></td>
                                        <td className="p-4 text-center font-black text-[12px] bg-blue-50/30">{form[row.key as keyof BuildingRecord]?.total || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Fence & Parking */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                             <h4 className="text-[11px] font-black text-black uppercase tracking-widest mb-4">KONDISI PAGAR</h4>
                             <div className="space-y-4">
                                 <Input label="MATERIAL PAGAR" placeholder="Tembok/Besi/Seng..." value={form.fenceDetails?.material} onChange={(e: any) => setForm({...form, fenceDetails: {...form.fenceDetails!, material: e.target.value}})} />
                                 <div className="grid grid-cols-2 gap-4">
                                     <div>
                                         <Label>KONDISI</Label>
                                         <select className="w-full bg-white p-3 rounded-xl text-[11px] font-bold outline-none" value={form.fenceDetails?.condition} onChange={(e: any) => setForm({...form, fenceDetails: {...form.fenceDetails!, condition: e.target.value}})}>
                                             <option>Baik</option><option>Sedang</option><option>Kurang</option>
                                         </select>
                                     </div>
                                     <Input label="TINGGI (M)" type="number" value={form.fenceDetails?.height} onChange={(e: any) => setForm({...form, fenceDetails: {...form.fenceDetails!, height: e.target.value}})} />
                                 </div>
                             </div>
                        </div>
                        
                        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                             <h4 className="text-[11px] font-black text-black uppercase tracking-widest mb-4">PINTU PAGAR & PARKIR</h4>
                             <div className="space-y-4">
                                 <Input label="MATERIAL PINTU" placeholder="Besi/Kayu..." value={form.fenceDetails?.gateMaterial} onChange={(e: any) => setForm({...form, fenceDetails: {...form.fenceDetails!, gateMaterial: e.target.value}})} />
                                 <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                                     <Label>PARKIR MALAM?</Label>
                                     <input type="checkbox" className="w-5 h-5 rounded text-black focus:ring-0" checked={form.parkingDetails?.hasParking} onChange={(e) => setForm({...form, parkingDetails: {...form.parkingDetails!, hasParking: e.target.checked}})} />
                                 </div>
                                 {form.parkingDetails?.hasParking && (
                                     <Input label="KAPASITAS UNIT" placeholder="Jml Kendaraan" value={form.parkingDetails?.capacity} onChange={(e: any) => setForm({...form, parkingDetails: {...form.parkingDetails!, capacity: e.target.value}})} />
                                 )}
                             </div>
                        </div>
                    </div>
                </div>
             </section>

             {/* KEAMANAN */}
             <section id="section-4" className="scroll-mt-32">
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                     <h4 className="text-[11px] font-black text-black uppercase tracking-widest mb-6 flex items-center gap-2"><ShieldCheck size={14}/> KEAMANAN (CHECKLIST)</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {[
                             'Terdapat Security Area Gedung',
                             'Terdapat Security Area Wilayah',
                             'Terdapat CCTV',
                             'Terdapat Alarm',
                             'Terdapat Free Area Assembly Point',
                             'Terdapat Pos Polisi/Hansip <500m'
                         ].map(item => (
                             <CheckboxItem 
                                key={item} 
                                label={item} 
                                checked={form.securityChecklist?.includes(item)} 
                                onChange={() => toggleChecklist('securityChecklist', item)} 
                            />
                         ))}
                     </div>
                 </div>
             </section>

             {/* 6. JUMLAH TINGKAT */}
             <section id="section-5" className="scroll-mt-32">
                 <SectionHeader num="5" title="JUMLAH TINGKAT" sub="Floor Dimensions & Photos" icon={Layers} />
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                     <input type="file" ref={floorFileInputRef} className="hidden" accept="image/*" onChange={onFloorFileChange} />
                     
                     <div className="space-y-4">
                         {['dasar', 'lt1', 'lt2', 'lt3', 'lt4'].map((floor, idx) => {
                             const label = floor === 'dasar' ? 'LANTAI DASAR' : `LANTAI ${idx}`;
                             const data = (form.floorDimensions as any)[floor];
                             return (
                                 <div key={floor} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 rounded-2xl group transition-all hover:bg-gray-100/50">
                                     <div className="w-full md:w-32 font-black text-[11px] uppercase">{label}</div>
                                     <div className="flex-1 flex items-center gap-2 w-full">
                                         <input type="number" className="w-full bg-white p-2 rounded-lg text-center font-bold text-[12px]" placeholder="P (m)" value={data?.l} onChange={(e) => handleFloorDimensionChange(floor as any, 'l', e.target.value)} />
                                         <span className="text-gray-400 text-[10px]">X</span>
                                         <input type="number" className="w-full bg-white p-2 rounded-lg text-center font-bold text-[12px]" placeholder="L (m)" value={data?.w} onChange={(e) => handleFloorDimensionChange(floor as any, 'w', e.target.value)} />
                                         <span className="text-gray-400 text-[10px]">=</span>
                                         <div className="w-32 bg-blue-100/50 p-2 rounded-lg text-center font-black text-[12px] text-blue-800">{data?.area || 0} m2</div>
                                     </div>
                                     
                                     {/* Photo Upload Box */}
                                     <div 
                                         onClick={() => handleFloorPhotoUpload(floor)}
                                         className={`w-full md:w-20 h-16 rounded-xl border-2 border-dashed flex items-center justify-center relative overflow-hidden transition-all shrink-0 cursor-pointer 
                                            ${data?.photo ? 'border-gray-200 bg-white' : 'border-gray-300 bg-white/50 hover:bg-white hover:border-black'}
                                         `}
                                         title="Upload Floor Photo"
                                     >
                                         {data?.photo ? (
                                             <div className="relative w-full h-full group/photo">
                                                 <img src={data.photo} className="w-full h-full object-cover" alt="Floor" />
                                                 {!isView && (
                                                     <button 
                                                        onClick={(e) => handleRemoveFloorPhoto(e, floor)}
                                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center text-white transition-opacity"
                                                     >
                                                         <Trash2 size={14} />
                                                     </button>
                                                 )}
                                             </div>
                                         ) : (
                                             <div className="flex flex-col items-center gap-1">
                                                 <Camera size={14} className="text-gray-400" />
                                                 <span className="text-[7px] font-black uppercase text-gray-400">Photo</span>
                                             </div>
                                         )}
                                     </div>
                                 </div>
                             )
                         })}
                     </div>
                 </div>
             </section>

             {/* 7. JENIS BANGUNAN (MATERIAL) */}
             <section id="section-6" className="scroll-mt-32">
                 <SectionHeader num="6" title="JENIS BANGUNAN" sub="Material Specification Checklist" icon={Calculator} />
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {[
                             { cat: 'STRUKTUR', items: ['Tiang Baja', 'Tiang Kayu', 'Beton Bertulang'] },
                             { cat: 'ATAP', items: ['Genting Alumunium', 'Genting Tanah Liat', 'Beton Cor', 'Asbes'] },
                             { cat: 'DINDING', items: ['Batako', 'Bata Merah', 'Seng', 'Triplek/Gypsum'] },
                             { cat: 'LANTAI', items: ['Keramik', 'Tanpa Keramik (Semen)', 'Marmer/Granit'] },
                             { cat: 'PINTU', items: ['Kayu', 'Triplek', 'Baja', 'Alumunium', 'Seng', 'Kaca'] },
                             { cat: 'JENDELA', items: ['Kayu', 'Alumunium', 'Besi'] }
                         ].map(group => (
                             <div key={group.cat} className="space-y-3">
                                 <h4 className="text-[10px] font-black text-black bg-gray-100 px-3 py-1.5 rounded-lg inline-block">{group.cat}</h4>
                                 <div className="space-y-2">
                                     {group.items.map(item => (
                                         <CheckboxItem 
                                            key={item} 
                                            label={item} 
                                            checked={form.materialChecklist?.includes(item)} 
                                            onChange={() => toggleChecklist('materialChecklist', item)} 
                                         />
                                     ))}
                                 </div>
                             </div>
                         ))}
                         
                         <div className="md:col-span-2 lg:col-span-3 pt-6 mt-6 border-t border-gray-100">
                             <div className="flex items-center gap-4">
                                 <Label>LAMA BANGUNAN BERDIRI:</Label>
                                 <div className="flex gap-2 flex-1">
                                     {['< 5 Tahun', '5-10 Tahun', '10-15 Tahun', '> 15 Tahun'].map(age => (
                                         <button 
                                            key={age}
                                            onClick={() => setForm({...form, buildingAge: age})}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-bold transition-all ${form.buildingAge === age ? 'bg-black text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                         >
                                             {age}
                                         </button>
                                     ))}
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </section>

             {/* 8. DOKUMEN LEGAL & PAJAK */}
             <section id="section-8" className="scroll-mt-32">
                 <SectionHeader num="D-1" title="DOKUMEN LEGAL & PAJAK" sub="Certificates, Contracts & Tax" icon={FileText} />
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                     <input type="file" ref={generalFileInputRef} className="hidden" accept="image/*" onChange={onGeneralFileChange} />
                     
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         <GeneralUploadBox label="SCAN SERTIFIKAT" uploadKey="docSertifikat" icon={FileBadge} />
                         <GeneralUploadBox label="SCAN PBB TERBARU" uploadKey="docPBB" icon={FileText} />
                         <GeneralUploadBox label="SCAN IMB / PBG" uploadKey="docIMB" icon={Scale} />
                         <GeneralUploadBox label="KONTRAK / PERJANJIAN" uploadKey="docContract" icon={Briefcase} />
                     </div>
                 </div>
             </section>

             {/* 9. DOKUMENTASI VISUAL */}
             <section id="section-7" className="scroll-mt-32">
                 <SectionHeader num="D-2" title="DOKUMENTASI VISUAL" sub="General Building Photos & Layout" icon={ImageIcon} />
                 <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         <GeneralUploadBox label="TAMPAK DEPAN" uploadKey="photoFront" icon={Camera} />
                         <GeneralUploadBox label="TAMPAK SAMPING" uploadKey="photoSide" icon={Camera} />
                         <GeneralUploadBox label="JALAN DEPAN / LINGKUNGAN" uploadKey="photoRoad" icon={Camera} />
                         <GeneralUploadBox label="INTERIOR UTAMA" uploadKey="photoInterior" icon={Camera} />
                         <div className="md:col-span-4 mt-2 pt-2 border-t border-dashed border-gray-100">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">FLOOR PLAN & LAYOUT</h4>
                            <div className="h-48">
                                <GeneralUploadBox label="DENAH / LAYOUT UTAMA" uploadKey="floorPlanMaster" icon={Layout} />
                            </div>
                         </div>
                     </div>
                 </div>
             </section>
             </div>
        </div>

        {/* RIGHT SIDEBAR: RENTAL HISTORY LOG (ONLY FOR RENT OWNERSHIP) */}
        {form.ownership === 'Rent' && (
            <div className="w-[400px] bg-white border-l border-gray-100 flex flex-col shrink-0 z-20 shadow-[-5px_0_30px_rgba(0,0,0,0.02)] h-full">
                
                {/* Sidebar Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
                    <div className="flex items-center gap-3">
                        <History size={18} className="text-black"/>
                        <div>
                            <h3 className="text-[12px] font-black text-black uppercase tracking-widest">RENTAL LOG HISTORY</h3>
                            <p className="text-[9px] font-bold text-gray-400 mt-0.5">TRACK LEASE CONTRACTS</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
                    
                    {/* Timeline List */}
                    <div className="relative space-y-0 pl-2">
                        {/* Continuous Line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-100 rounded-full"></div>
                        
                        {form.rentalHistory && form.rentalHistory.length > 0 ? (
                            form.rentalHistory.map((hist, idx) => (
                                <div key={hist.id} className="relative pl-8 pb-8 group last:pb-0">
                                    {/* Dot Indicator */}
                                    <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 transition-colors ${idx === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    
                                    {/* Card */}
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all group-hover:border-gray-200 relative">
                                        
                                        <div className="flex flex-col gap-1 mb-3">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">PERIOD</span>
                                            <div className="flex items-center gap-2 text-[11px] font-bold text-black font-mono">
                                                <Calendar size={12} className="text-gray-400"/>
                                                {hist.periodStart} <span className="text-gray-300">→</span> {hist.periodEnd}
                                            </div>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">LESSOR</span>
                                            <div className="flex items-center gap-2 text-[12px] font-black text-black uppercase mt-0.5">
                                                <User size={12} className="text-gray-400"/>
                                                {hist.lessorName}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-100">
                                            <span className="text-[9px] font-bold text-gray-400 uppercase">ANNUAL COST</span>
                                            <span className="text-[12px] font-black text-green-600 font-mono flex items-center gap-1">
                                                <Receipt size={12} />
                                                Rp {parseInt(hist.annualCost).toLocaleString('id-ID')}
                                            </span>
                                        </div>

                                        {hist.status === 'Active' && (
                                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-widest">
                                                CURRENT
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="pl-8 pt-2 opacity-50">
                                <p className="text-[10px] text-gray-400 font-medium italic">No rental history records found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-30 px-12 py-8 bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-end gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
          <button onClick={onBack} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">
            BATAL
          </button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> SIMPAN DATA
            </button>
          )}
      </div>

    </div>
  );
};
