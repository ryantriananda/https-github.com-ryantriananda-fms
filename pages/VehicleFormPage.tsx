
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeft, Save, Car, Shield, FileText, Briefcase, MapPin, DollarSign, UploadCloud, Trash2, Calendar, User, Info, CheckCircle2, Clock, GitBranch, Image as ImageIcon, Calculator, TrendingDown, TrendingUp, History, Check } from 'lucide-react';
import { VehicleRecord, GeneralMasterItem, ServiceRecord } from '../types';

interface Props {
  onBack: () => void;
  onSave: (data: Partial<VehicleRecord>) => void;
  initialData?: VehicleRecord;
  mode?: 'create' | 'edit' | 'view';
  brandList?: GeneralMasterItem[];
  colorList?: GeneralMasterItem[];
  channelList?: GeneralMasterItem[];
  branchList?: GeneralMasterItem[];
  serviceData?: ServiceRecord[];
}

type DocKeys = 'stnk' | 'kir' | 'front' | 'rear' | 'right' | 'left';

export const VehicleFormPage: React.FC<Props> = ({ 
    onBack, 
    onSave, 
    initialData, 
    mode = 'create',
    brandList = [],
    colorList = [],
    channelList = [],
    branchList = [],
    serviceData = []
}) => {
  console.log('🚗 VehicleFormPage rendering...', { mode, hasInitialData: !!initialData });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadKey, setActiveUploadKey] = useState<DocKeys | null>(null);
  
  const [docPreviews, setDocPreviews] = useState<{ [key in DocKeys]: string | null }>({
      stnk: null,
      kir: null,
      front: null,
      rear: null,
      right: null,
      left: null
  });

  const [activeTab, setActiveTab] = useState('INFORMASI');
  const [form, setForm] = useState<Partial<VehicleRecord>>({
    status: 'Aktif',
    ownership: 'Milik Modena',
    channel: '',
    cabang: '',
    approvalStatus: 'Pending',
    depreciationMethod: 'Garis Lurus (Straight Line)',
    usefulLife: 4,
    residualValue: '0'
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setDocPreviews({
          stnk: initialData.stnkUrl || null,
          kir: initialData.kirUrl || null,
          front: initialData.photoFront || null,
          rear: initialData.photoRear || null,
          right: initialData.photoRight || null,
          left: initialData.photoLeft || null
      });
    } else {
      setForm({ 
          status: 'Aktif', 
          ownership: 'Milik Modena', 
          channel: '', 
          cabang: '',
          approvalStatus: 'Pending',
          depreciationMethod: 'Garis Lurus (Straight Line)',
          usefulLife: 4,
          residualValue: '0'
      });
      setDocPreviews({ stnk: null, kir: null, front: null, rear: null, right: null, left: null });
    }
    setActiveTab('INFORMASI');
  }, [initialData]);

  const depreciationData = useMemo(() => {
      const price = parseInt(form.hargaBeli || '0') || 0;
      const residual = parseInt(form.residualValue || '0') || 0;
      const years = form.usefulLife || 4;
      
      const depreciableAmount = Math.max(0, price - residual);
      const yearlyDep = depreciableAmount / years;
      const monthlyDep = yearlyDep / 12;

      let accumulatedDep = 0;
      let monthsPassed = 0;

      if (form.tglBeli) {
          const start = new Date(form.tglBeli);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - start.getTime());
          monthsPassed = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)); 
          
          const maxMonths = years * 12;
          const effectiveMonths = Math.min(monthsPassed, maxMonths);
          
          accumulatedDep = effectiveMonths * monthlyDep;
      }

      const netBookValue = Math.max(price - accumulatedDep, residual);

      return {
          yearlyDep,
          monthlyDep,
          accumulatedDep,
          netBookValue,
          monthsPassed: Math.floor(monthsPassed/12) + " Thn " + (monthsPassed % 12) + " Bln"
      };
  }, [form.hargaBeli, form.residualValue, form.usefulLife, form.tglBeli]);

  const isView = mode === 'view';

  const handleUploadClick = (key: DocKeys) => {
      if (!isView) {
          setActiveUploadKey(key);
          setTimeout(() => fileInputRef.current?.click(), 0);
      }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && activeUploadKey) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setDocPreviews(prev => ({ ...prev, [activeUploadKey]: ev.target?.result as string }));
          };
          reader.readAsDataURL(file);
      }
      e.target.value = ''; 
  }

  const handleRemoveImage = (e: React.MouseEvent, key: DocKeys) => {
      e.stopPropagation();
      setDocPreviews(prev => ({ ...prev, [key]: null }));
  }

  const handleSave = () => {
      const payload = {
          ...form,
          stnkUrl: docPreviews.stnk,
          kirUrl: docPreviews.kir,
          photoFront: docPreviews.front,
          photoRear: docPreviews.rear,
          photoRight: docPreviews.right,
          photoLeft: docPreviews.left
      };
      onSave(payload);
      onBack();
  };

  const Label: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-3">
          {children}
          {required && <span className="text-red-500 ml-1">*</span>}
      </label>
  );

  const InputField = ({ label, value, field, required, placeholder, type = 'text', disabled, className = '', icon }: any) => (
      <div className={className}>
          <Label required={required}>{label}</Label>
          <div className="relative">
              {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">{React.createElement(icon, { size: 18 })}</div>}
              <input 
                  type={type}
                  className={`w-full bg-white border-2 border-gray-200 rounded-2xl ${icon ? 'pl-12' : 'px-5'} py-4 text-[13px] font-bold outline-none disabled:bg-gray-50 focus:border-black focus:ring-4 focus:ring-black/5 transition-all`}
                  value={value || ''}
                  onChange={e => setForm({...form, [field]: e.target.value})}
                  placeholder={placeholder}
                  disabled={disabled || isView}
              />
          </div>
      </div>
  );

  const MasterSelectField = ({ label, value, field, dataList, required }: any) => (
      <div>
          <Label required={required}>{label}</Label>
          <select 
              className="w-full bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black outline-none disabled:bg-gray-50 uppercase cursor-pointer focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
              disabled={isView} 
              value={value || ''} 
              onChange={e => setForm({...form, [field]: e.target.value})}
          >
              <option value="">({label})</option>
              {dataList.map((item: GeneralMasterItem) => (
                  <option key={item.id} value={item.name}>{item.name}</option>
              ))}
          </select>
      </div>
  );

  const SectionHeader = ({ title, sub }: { title: string; sub: string }) => (
      <div className="mb-8 pb-6 border-b-2 border-gray-100">
          <h3 className="text-[14px] font-black text-black uppercase tracking-tight leading-none">{title}</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mt-2">{sub}</p>
      </div>
  );

  const ImageUploadBox = ({ label, docKey }: { label: string; docKey: DocKeys }) => {
      const previewUrl = docPreviews[docKey];
      return (
          <div>
              <Label>{label}</Label>
              <div 
                  onClick={() => handleUploadClick(docKey)}
                  className={`relative bg-gradient-to-br from-gray-50 to-white border-2 border-dashed rounded-3xl overflow-hidden h-56 flex flex-col items-center justify-center cursor-pointer transition-all group ${
                      isView ? 'cursor-default' : 'hover:border-black hover:shadow-xl hover:scale-[1.02]'
                  } ${previewUrl ? 'border-black' : 'border-gray-200'}`}
              >
                  {previewUrl ? (
                      <>
                          <img src={previewUrl} alt={label} className="absolute inset-0 w-full h-full object-cover" />
                          {!isView && (
                              <button 
                                  onClick={(e) => handleRemoveImage(e, docKey)}
                                  className="absolute top-3 right-3 bg-black text-white p-2.5 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                              >
                                  <Trash2 size={18} strokeWidth={2.5} />
                              </button>
                          )}
                      </>
                  ) : (
                      <div className="text-center">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md border-2 border-gray-100 group-hover:border-black transition-all">
                              <UploadCloud size={28} className="text-gray-300 group-hover:text-black transition-colors" strokeWidth={2.5} />
                          </div>
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">
                              {isView ? 'No Image' : 'Upload Image'}
                          </p>
                      </div>
                  )}
              </div>
          </div>
      );
  };

  const tabs = ['INFORMASI', 'DOKUMEN', 'SERVICE HISTORY', 'WORKFLOW'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b-2 border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-12 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button 
                onClick={onBack}
                className="p-3 hover:bg-gray-50 rounded-2xl text-black shadow-sm border-2 border-gray-100 hover:border-gray-200 transition-all"
              >
                <ArrowLeft size={24} strokeWidth={2.5} />
              </button>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-3xl flex items-center justify-center text-white shadow-xl">
                  <Car size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-[22px] font-black text-black uppercase tracking-tight leading-none">
                     {mode === 'edit' ? 'Perbarui Data Aset' : mode === 'view' ? 'Rincian Aset Kendaraan' : 'Input Data Aset Kendaraan'}
                  </h1>
                  <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">Vehicle Asset & Database Management</p>
                </div>
              </div>
            </div>
            {!isView && (
              <button 
                onClick={handleSave}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.15em] hover:shadow-2xl hover:scale-105 transition-all border-2 border-black"
              >
                <Save size={20} strokeWidth={2.5} />
                Simpan Data
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b-2 border-gray-100 shadow-sm sticky top-[104px] z-20">
        <div className="max-w-[1600px] mx-auto px-12 flex gap-8">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-[4px] 
                ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Form Body */}
      <div className="max-w-[1600px] mx-auto px-12 py-12">
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        
        {activeTab === 'INFORMASI' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-12">
              {/* Card 1: ASSET SETUP */}
              <div className="bg-white p-10 rounded-3xl border-2 border-gray-100 shadow-lg">
                <SectionHeader title="ASSET SETUP" sub="General Asset Information" />
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <Label required>Flagging Kepemilikan</Label>
                    <div className="flex gap-4">
                      {['Milik Modena', 'Sewa'].map(type => {
                        const isSelected = form.ownership === type;
                        return (
                          <button
                            key={type}
                            onClick={() => !isView && setForm({...form, ownership: type as any})}
                            disabled={isView}
                            className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.15em] rounded-2xl border-2 transition-all 
                              ${isSelected 
                                ? 'bg-gradient-to-r from-black to-gray-800 text-white border-black shadow-xl scale-[1.02]' 
                                : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'}`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <InputField label="No. Polisi" value={form.noPolisi} field="noPolisi" required placeholder="B 1234 ABC" />
                  <InputField label="Deskripsi Unit" value={form.nama} field="nama" placeholder="Toyota Avanza 1.3 CVT..." required />
                </div>
              </div>

              {/* Card 2: VEHICLE SPECIFICATION */}
              <div className="bg-white p-10 rounded-3xl border-2 border-gray-100 shadow-lg">
                <SectionHeader title="VEHICLE SPECIFICATION" sub="Core Unit Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <MasterSelectField label="Merek" value={form.merek} field="merek" dataList={brandList} />
                  <InputField label="Tipe Kendaraan" value={form.tipeKendaraan} field="tipeKendaraan" placeholder="AVANZA" />
                  
                  <InputField label="Model" value={form.model} field="model" placeholder="A/T" />
                  <InputField label="Tahun Pembuatan" value={form.tahunPembuatan} field="tahunPembuatan" placeholder="2022" />
                  
                  <MasterSelectField label="Warna" value={form.warna} field="warna" dataList={colorList} />
                  <InputField label="Isi Silinder" value={form.isiSilinder} field="isiSilinder" placeholder="1329 CC" />
                  
                  <InputField label="No. Rangka" value={form.noRangka} field="noRangka" placeholder="Input nomor rangka..." />
                  <InputField label="No. Mesin" value={form.noMesin} field="noMesin" placeholder="Input nomor mesin..." />
                </div>
              </div>

              {/* Card 3: ALLOCATION & USAGE */}
              <div className="bg-white p-10 rounded-3xl border-2 border-gray-100 shadow-lg">
                <SectionHeader title="ALLOCATION & USAGE" sub="Assigned Dept & User" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label>Channel</Label>
                    <select 
                      className="w-full bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black outline-none disabled:bg-gray-50 uppercase cursor-pointer focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                      disabled={isView} 
                      value={form.channel || ''} 
                      onChange={e => setForm({...form, channel: e.target.value})}
                    >
                      <option value="">(PILIH CHANNEL)</option>
                      {channelList.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Dept / Cabang</Label>
                    <select 
                      className="w-full bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black outline-none disabled:bg-gray-50 uppercase cursor-pointer focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                      disabled={isView} 
                      value={form.cabang || ''} 
                      onChange={e => setForm({...form, cabang: e.target.value})}
                    >
                      <option value="">(PILIH CABANG)</option>
                      {branchList.map((b) => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <InputField label="Pengguna Utama" value={form.pengguna} field="pengguna" placeholder="Full Name" className="md:col-span-2" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              {/* Card 4: LEGAL DOCUMENTS */}
              <div className="bg-white p-10 rounded-3xl border-2 border-gray-100 shadow-lg">
                <SectionHeader title="LEGAL DOCUMENTS" sub="Validity & Numbers" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="No. BPKB" value={form.noBpkb} field="noBpkb" placeholder="S-03714594" className="md:col-span-2" />
                  <InputField label="BPKB Remarks" value={form.keteranganBpkb} field="keteranganBpkb" className="md:col-span-2" placeholder="Masukan catatan BPKB..." />
                  
                  <InputField label="No. STNK" value={form.noStnk} field="noStnk" placeholder="XXXXXX" />
                  <InputField label="Masa Berlaku STNK" value={form.masaBerlakuStnk} field="masaBerlakuStnk" type="date" />
                  
                  <InputField label="No. KIR" value={form.noKir} field="noKir" placeholder="XXXXXX" />
                  <InputField label="Masa Berlaku KIR" value={form.masaBerlakuKir} field="masaBerlakuKir" type="date" />
                </div>
              </div>

              {/* Card 5: FINANCIAL SETUP */}
              <div className="bg-white p-10 rounded-3xl border-2 border-gray-100 shadow-lg">
                <SectionHeader title="FINANCIAL SETUP" sub="Cost & Depreciation" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Tanggal Beli" value={form.tglBeli} field="tglBeli" type="date" icon={Calendar} className="md:col-span-2" />
                  
                  <div>
                    <Label required>Harga Beli (Rp)</Label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[11px] font-black text-gray-400">RP</span>
                      <input 
                        type="text"
                        className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-14 pr-5 py-4 text-[13px] font-bold outline-none disabled:bg-gray-50 focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                        value={form.hargaBeli || ''}
                        onChange={e => setForm({...form, hargaBeli: e.target.value.replace(/[^0-9]/g, '')})}
                        placeholder="0"
                        disabled={isView}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Depreciation Method</Label>
                    <select 
                      className="w-full bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black outline-none disabled:bg-gray-50 cursor-pointer focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                      disabled={isView}
                      value={form.depreciationMethod || ''}
                      onChange={e => setForm({...form, depreciationMethod: e.target.value})}
                    >
                      <option value="Garis Lurus (Straight Line)">Garis Lurus (Straight Line)</option>
                      <option value="Saldo Menurun (Declining Balance)">Saldo Menurun (Declining Balance)</option>
                    </select>
                  </div>

                  <div>
                    <Label>Useful Life</Label>
                    <div className="relative">
                      <input 
                        type="number"
                        className="w-full bg-white border-2 border-gray-200 rounded-2xl px-5 pr-20 py-4 text-[13px] font-bold outline-none disabled:bg-gray-50 focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                        value={form.usefulLife || 4}
                        onChange={e => setForm({...form, usefulLife: parseInt(e.target.value) || 4})}
                        min="1"
                        disabled={isView}
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 uppercase">Years</span>
                    </div>
                  </div>

                  <div>
                    <Label>Residual Value (Rp)</Label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[11px] font-black text-gray-400">RP</span>
                      <input 
                        type="text"
                        className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-14 pr-5 py-4 text-[13px] font-bold outline-none disabled:bg-gray-50 focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                        value={form.residualValue || '0'}
                        onChange={e => setForm({...form, residualValue: e.target.value.replace(/[^0-9]/g, '')})}
                        placeholder="0"
                        disabled={isView}
                      />
                    </div>
                  </div>
                </div>

                {/* Depreciation Summary */}
                <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator size={20} className="text-black" strokeWidth={2.5} />
                    <h4 className="text-[12px] font-black uppercase tracking-[0.15em] text-black">Depreciation Calculation</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-2xl border-2 border-gray-100">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2">Yearly Depreciation</p>
                      <p className="text-[16px] font-black text-black">Rp {depreciationData.yearlyDep.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border-2 border-gray-100">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2">Monthly Depreciation</p>
                      <p className="text-[16px] font-black text-black">Rp {depreciationData.monthlyDep.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border-2 border-gray-100">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2">Accumulated Depreciation</p>
                      <p className="text-[16px] font-black text-red-600">Rp {depreciationData.accumulatedDep.toLocaleString('id-ID')}</p>
                      <p className="text-[9px] font-bold text-gray-400 mt-1">{depreciationData.monthsPassed}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border-2 border-gray-100">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2">Net Book Value</p>
                      <p className="text-[16px] font-black text-green-600">Rp {depreciationData.netBookValue.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6: STATUS */}
              <div className="bg-white p-10 rounded-3xl border-2 border-gray-100 shadow-lg">
                <SectionHeader title="STATUS" sub="Current Condition" />
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <Label>Status Kendaraan</Label>
                    <div className="flex gap-4">
                      {['Aktif', 'Tidak Aktif'].map(s => {
                        const isSelected = form.status === s;
                        return (
                          <button
                            key={s}
                            onClick={() => !isView && setForm({...form, status: s as any})}
                            disabled={isView}
                            className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.15em] rounded-2xl border-2 transition-all 
                              ${isSelected 
                                ? s === 'Aktif' 
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600 shadow-xl' 
                                  : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-500 shadow-xl'
                                : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'}`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <Label>Catatan Tambahan</Label>
                    <textarea 
                      className="w-full bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-medium outline-none disabled:bg-gray-50 resize-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                      value={form.catatan || ''}
                      onChange={e => setForm({...form, catatan: e.target.value})}
                      placeholder="Masukkan catatan atau informasi tambahan..."
                      disabled={isView}
                      rows={5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'DOKUMEN' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ImageUploadBox label="STNK" docKey="stnk" />
            <ImageUploadBox label="KIR" docKey="kir" />
            <ImageUploadBox label="Foto Depan" docKey="front" />
            <ImageUploadBox label="Foto Belakang" docKey="rear" />
            <ImageUploadBox label="Foto Kanan" docKey="right" />
            <ImageUploadBox label="Foto Kiri" docKey="left" />
          </div>
        )}

        {activeTab === 'SERVICE HISTORY' && (
          <div className="bg-white p-12 rounded-3xl border-2 border-gray-100 shadow-lg">
            <div className="flex items-center gap-4 mb-8">
              <History size={24} className="text-black" strokeWidth={2.5} />
              <h3 className="text-[16px] font-black uppercase tracking-tight text-black">Riwayat Service Kendaraan</h3>
            </div>
            {serviceData && serviceData.length > 0 ? (
              <div className="space-y-6">
                {serviceData.map((service, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-[13px] font-black text-black uppercase">{service.jenisServis}</h4>
                            <p className="text-[10px] font-bold text-gray-400 mt-1">{service.tanggalServis}</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed ml-13">{service.keterangan}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">BIAYA</p>
                        <p className="text-[14px] font-black text-black">Rp {parseInt(service.biaya || '0').toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <History size={32} className="text-gray-300" strokeWidth={2.5} />
                </div>
                <p className="text-[13px] font-black text-gray-300 uppercase tracking-[0.15em]">Belum ada riwayat service</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'WORKFLOW' && (
          <div className="bg-white p-12 rounded-3xl border-2 border-gray-100 shadow-lg">
            <div className="flex items-center gap-4 mb-8">
              <GitBranch size={24} className="text-black" strokeWidth={2.5} />
              <h3 className="text-[16px] font-black uppercase tracking-tight text-black">Approval Workflow</h3>
            </div>
            <div className="space-y-6">
              <div className={`p-8 rounded-2xl border-2 ${
                form.approvalStatus === 'Approved' ? 'bg-green-50 border-green-200' :
                form.approvalStatus === 'Rejected' ? 'bg-red-50 border-red-200' :
                form.approvalStatus === 'Revised' ? 'bg-blue-50 border-blue-200' :
                'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    form.approvalStatus === 'Approved' ? 'bg-green-500' :
                    form.approvalStatus === 'Rejected' ? 'bg-red-500' :
                    form.approvalStatus === 'Revised' ? 'bg-blue-500' :
                    'bg-orange-500'
                  } text-white shadow-lg`}>
                    <CheckCircle2 size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-black uppercase tracking-tight text-black">Current Status</h4>
                    <p className={`text-[18px] font-black uppercase tracking-tight mt-1 ${
                      form.approvalStatus === 'Approved' ? 'text-green-600' :
                      form.approvalStatus === 'Rejected' ? 'text-red-600' :
                      form.approvalStatus === 'Revised' ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>{form.approvalStatus || 'Pending'}</p>
                  </div>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Asset sedang menunggu approval dari departemen terkait. Harap tunggu notifikasi lebih lanjut.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
