import React, { useState, useEffect, useRef } from 'react';
import { X, Wrench, Clock, CheckCircle2, AlertCircle, Camera, Plus, Trash2, ArrowRight, FileText, Car, DollarSign, User, Calendar, MapPin, Star, Package, PlayCircle } from 'lucide-react';
import { ServiceRecord, VehicleRecord, VendorRecord, SparePart } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ServiceRecord>) => void;
  initialData?: ServiceRecord | null;
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
  vendorList?: VendorRecord[];
  serviceHistory?: ServiceRecord[];
  serviceTypeList?: string[];
}

export const ServiceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode = 'create',
  vehicleList = [],
  vendorList = [],
  serviceHistory = [],
  serviceTypeList = ['Servis Berkala', 'Perbaikan', 'Ganti Oli', 'Ganti Ban', 'Tune Up', 'Body Repair', 'AC Service']
}) => {
  const [form, setForm] = useState<Partial<ServiceRecord>>({
    status: 'Draft',
    statusApproval: 'Pending',
    tglRequest: new Date().toISOString().split('T')[0],
    spareParts: []
  });

  const [parts, setParts] = useState<SparePart[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<ServiceRecord | null>(null);
  
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        setParts(initialData.spareParts || []);
      } else {
        setForm({
          status: 'Draft',
          statusApproval: 'Pending',
          tglRequest: new Date().toISOString().split('T')[0],
          noPolisi: '',
          vendor: '',
          masalah: '',
          jenisServis: '',
          kmKendaraan: '',
          estimasiBiaya: '',
          spareParts: []
        });
        setParts([]);
      }
      setSelectedHistoryItem(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleSave = () => {
    const dataToSave: Partial<ServiceRecord> = {
      ...form,
      spareParts: parts
    };
    onSave(dataToSave);
  };

  const getSLABadge = () => {
    if (!form.tglRequest) return null;
    const requestDate = new Date(form.tglRequest);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - requestDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (form.status === 'Completed') {
      return <span className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-700">Completed</span>;
    }
    if (diffDays > 7) {
      return <span className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-600">Overdue &gt;7 Days</span>;
    }
    if (diffDays > 3) {
      return <span className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-600">Warning &gt;3 Days</span>;
    }
    return <span className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-600">On Track</span>;
  };

  const addPart = () => {
    setParts([...parts, { name: '', qty: 1, price: '' }]);
  };

  const removePart = (index: number) => {
    setParts(parts.filter((_, i) => i !== index));
  };

  const updatePart = (index: number, field: keyof SparePart, value: any) => {
    const updated = [...parts];
    updated[index] = { ...updated[index], [field]: value };
    setParts(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (type === 'before') {
          setForm(prev => ({ ...prev, photoBefore: ev.target?.result as string }));
        } else {
          setForm(prev => ({ ...prev, photoAfter: ev.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedVehicle = vehicleList.find(v => v.noPolisi === form.noPolisi);

  const formatCurrency = (value: string | number | undefined) => {
    if (!value) return '-';
    const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9]/g, '')) : value;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in progress': return 'bg-blue-100 text-blue-700';
      case 'pending': case 'draft': return 'bg-gray-100 text-gray-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // ============================================
  // STANDARDIZED UI COMPONENTS
  // ============================================
  
  const Label = ({ children, required }: { children?: React.ReactNode; required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, field, type = "text", disabled = false, placeholder = "", className = "", required = false }: any) => (
    <div className={className}>
      <Label required={required}>{label}</Label>
      <input
        type={type}
        disabled={isView || disabled}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-300 shadow-sm"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
      />
    </div>
  );

  const SelectField = ({ label, value, field, options, required = false, disabled = false }: any) => (
    <div>
      <Label required={required}>{label}</Label>
      <select
        disabled={isView || disabled}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 shadow-sm cursor-pointer appearance-none"
        value={value || ''}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
      >
        <option value="">-- Pilih --</option>
        {options.map((opt: any) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );

  const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
    <div>
      <Label>{label}</Label>
      <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black">{value || '-'}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* ============================================ */}
        {/* HEADER - STANDARDIZED */}
        {/* ============================================ */}
        <div className="px-12 py-8 bg-white flex items-center justify-between shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20">
              <Wrench size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-black uppercase tracking-tight leading-none">
                {mode === 'create' ? 'Input Servis Kendaraan' : mode === 'edit' ? 'Update Servis' : 'Detail Servis'}
              </h2>
              <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Vehicle Service Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {getSLABadge()}
            <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-3 rounded-full hover:bg-gray-50">
              <X size={32} />
            </button>
          </div>
        </div>

        {/* ============================================ */}
        {/* CONTENT - 3 COLUMN LAYOUT */}
        {/* ============================================ */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-[#FBFBFB]">
          
          {/* Left/Center Column: Form or Detail View */}
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
            {selectedHistoryItem ? (
              // ============================================
              // DETAIL VIEW - History Item Selected
              // ============================================
              <div className="space-y-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-black" />
                    <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Detail History Servis</h3>
                  </div>
                  <button
                    onClick={() => setSelectedHistoryItem(null)}
                    className="text-[11px] font-bold text-gray-500 hover:text-black transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={14} className="rotate-180" /> Kembali ke Form
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <ReadOnlyField label="No. Polisi" value={selectedHistoryItem.noPolisi || '-'} />
                  <ReadOnlyField label="Tanggal Request" value={formatDate(selectedHistoryItem.tglRequest)} />
                  <ReadOnlyField label="Jenis Servis" value={selectedHistoryItem.jenisServis || '-'} />
                  <ReadOnlyField label="Vendor" value={selectedHistoryItem.vendor || '-'} />
                  <ReadOnlyField label="KM Kendaraan" value={selectedHistoryItem.kmKendaraan || '-'} />
                  <ReadOnlyField label="Estimasi Biaya" value={formatCurrency(selectedHistoryItem.estimasiBiaya)} />
                  
                  <div className="md:col-span-2">
                    <Label>Masalah / Keluhan</Label>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black min-h-[80px]">
                      {selectedHistoryItem.masalah || '-'}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Status</Label>
                    <span className={`inline-block px-4 py-2 rounded-full text-[10px] font-black uppercase ${getStatusColor(selectedHistoryItem.status)}`}>
                      {selectedHistoryItem.status}
                    </span>
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={star <= (selectedHistoryItem.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spare Parts Table */}
                {selectedHistoryItem.spareParts && selectedHistoryItem.spareParts.length > 0 && (
                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Package size={16} className="text-black" />
                      <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Spare Parts</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-[12px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left px-5 py-3 font-black text-gray-500 uppercase text-[10px] tracking-wider">Nama Part</th>
                            <th className="text-center px-5 py-3 font-black text-gray-500 uppercase text-[10px] tracking-wider">Qty</th>
                            <th className="text-right px-5 py-3 font-black text-gray-500 uppercase text-[10px] tracking-wider">Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedHistoryItem.spareParts.map((part, idx) => (
                            <tr key={idx} className="border-t border-gray-100">
                              <td className="px-5 py-4 font-bold text-black">{part.name}</td>
                              <td className="px-5 py-4 text-center text-gray-600">{part.qty}</td>
                              <td className="px-5 py-4 text-right font-bold text-black">{formatCurrency(part.price)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Photo Evidence */}
                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div>
                    <Label>Foto Before</Label>
                    {selectedHistoryItem.photoBefore ? (
                      <img src={selectedHistoryItem.photoBefore} alt="Before" className="w-full h-48 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-[11px] border border-gray-200">
                        <Camera size={24} className="mr-2 text-gray-300" /> No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Foto After</Label>
                    {selectedHistoryItem.photoAfter ? (
                      <img src={selectedHistoryItem.photoAfter} alt="After" className="w-full h-48 object-cover rounded-2xl border border-gray-200 shadow-sm" />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-[11px] border border-gray-200">
                        <Camera size={24} className="mr-2 text-gray-300" /> No Image
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // ============================================
              // INPUT FORM
              // ============================================
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                
                {/* Vehicle Information Section */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <Car size={16} className="text-black" />
                    <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Informasi Kendaraan</h3>
                  </div>
                </div>

                <SelectField
                  label="No. Polisi"
                  value={form.noPolisi}
                  field="noPolisi"
                  required
                  options={vehicleList.map(v => ({ value: v.noPolisi, label: `${v.noPolisi} - ${v.nama}` }))}
                />
                <InputField
                  label="Nama Kendaraan"
                  value={selectedVehicle?.nama || ''}
                  field=""
                  disabled
                />
                <InputField
                  label="Channel"
                  value={selectedVehicle?.channel || form.channel || ''}
                  field="channel"
                  disabled
                />
                <InputField
                  label="Cabang"
                  value={selectedVehicle?.cabang || form.cabang || ''}
                  field="cabang"
                  disabled
                />

                {/* Service Details Section */}
                <div className="md:col-span-2 mt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Wrench size={16} className="text-black" />
                    <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Detail Servis</h3>
                  </div>
                </div>

                <InputField
                  label="Tanggal Request"
                  value={form.tglRequest}
                  field="tglRequest"
                  type="date"
                  required
                />
                <SelectField
                  label="Jenis Servis"
                  value={form.jenisServis}
                  field="jenisServis"
                  required
                  options={serviceTypeList}
                />
                <SelectField
                  label="Vendor"
                  value={form.vendor}
                  field="vendor"
                  options={vendorList.map(v => ({ value: v.vendorName, label: v.vendorName }))}
                />
                <InputField
                  label="KM Kendaraan"
                  value={form.kmKendaraan}
                  field="kmKendaraan"
                  placeholder="Masukkan KM saat ini"
                />
                
                <div className="md:col-span-2">
                  <Label required>Masalah / Keluhan</Label>
                  <textarea
                    disabled={isView}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-300 shadow-sm min-h-[100px] resize-none"
                    value={form.masalah || ''}
                    placeholder="Jelaskan masalah atau keluhan kendaraan..."
                    onChange={(e) => setForm({ ...form, masalah: e.target.value })}
                  />
                </div>
                
                <InputField
                  label="Estimasi Biaya"
                  value={form.estimasiBiaya}
                  field="estimasiBiaya"
                  placeholder="Rp 0"
                />
                <InputField
                  label="Teknisi"
                  value={form.technician}
                  field="technician"
                  placeholder="Nama teknisi"
                />

                {/* Spare Parts Section */}
                <div className="md:col-span-2 mt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Package size={16} className="text-black" />
                      <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Spare Parts</h3>
                    </div>
                    {!isView && (
                      <button
                        onClick={addPart}
                        className="flex items-center gap-2 text-[11px] font-bold text-black hover:text-gray-600 transition-colors bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200"
                      >
                        <Plus size={14} /> Tambah Part
                      </button>
                    )}
                  </div>
                  
                  {parts.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center">
                      <Package size={36} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-[12px] text-gray-400 font-bold">Belum ada spare part ditambahkan</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {parts.map((part, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                          <input
                            type="text"
                            placeholder="Nama Part"
                            disabled={isView}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none disabled:bg-gray-100 placeholder:text-gray-300"
                            value={part.name}
                            onChange={(e) => updatePart(index, 'name', e.target.value)}
                          />
                          <input
                            type="number"
                            placeholder="Qty"
                            disabled={isView}
                            className="w-20 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none disabled:bg-gray-100 text-center"
                            value={part.qty}
                            onChange={(e) => updatePart(index, 'qty', parseInt(e.target.value) || 0)}
                          />
                          <input
                            type="text"
                            placeholder="Harga"
                            disabled={isView}
                            className="w-32 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none disabled:bg-gray-100"
                            value={part.price}
                            onChange={(e) => updatePart(index, 'price', e.target.value)}
                          />
                          {!isView && (
                            <button onClick={() => removePart(index)} className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-xl">
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Photo Evidence Section */}
                <div className="md:col-span-2 mt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Camera size={16} className="text-black" />
                    <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Dokumentasi</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <Label>Foto Before</Label>
                      <input type="file" ref={beforeInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'before')} />
                      <div
                        onClick={() => !isView && beforeInputRef.current?.click()}
                        className={`w-full h-48 bg-white border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center transition-all ${isView ? 'cursor-default' : 'cursor-pointer hover:border-black hover:bg-gray-50'}`}
                      >
                        {form.photoBefore ? (
                          <img src={form.photoBefore} alt="Before" className="w-full h-full object-cover rounded-2xl" />
                        ) : (
                          <>
                            <Camera size={28} className="text-gray-300 mb-2" />
                            <span className="text-[11px] text-gray-400 font-bold">Upload Foto Before</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Foto After</Label>
                      <input type="file" ref={afterInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'after')} />
                      <div
                        onClick={() => !isView && afterInputRef.current?.click()}
                        className={`w-full h-48 bg-white border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center transition-all ${isView ? 'cursor-default' : 'cursor-pointer hover:border-black hover:bg-gray-50'}`}
                      >
                        {form.photoAfter ? (
                          <img src={form.photoAfter} alt="After" className="w-full h-full object-cover rounded-2xl" />
                        ) : (
                          <>
                            <Camera size={28} className="text-gray-300 mb-2" />
                            <span className="text-[11px] text-gray-400 font-bold">Upload Foto After</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ============================================ */}
          {/* RIGHT SIDEBAR - SERVICE HISTORY */}
          {/* ============================================ */}
          <div className="w-full lg:w-[350px] bg-white border-l border-gray-100 flex flex-col shrink-0">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-black" />
                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">History Servis</h3>
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 font-bold">Riwayat servis kendaraan ini</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {serviceHistory.length === 0 ? (
                <div className="text-center py-16">
                  <Wrench size={36} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-[11px] text-gray-400 font-bold">Belum ada history servis</p>
                </div>
              ) : (
                serviceHistory.map((history) => (
                  <div
                    key={history.id}
                    onClick={() => setSelectedHistoryItem(history)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedHistoryItem?.id === history.id
                        ? 'bg-black text-white border-black shadow-xl shadow-black/20'
                        : 'bg-gray-50 border-gray-200 hover:border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${selectedHistoryItem?.id === history.id ? 'text-gray-400' : 'text-gray-400'}`}>
                        {formatDate(history.tglRequest)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${
                        selectedHistoryItem?.id === history.id
                          ? 'bg-white/20 text-white'
                          : getStatusColor(history.status)
                      }`}>
                        {history.status}
                      </span>
                    </div>
                    <p className={`text-[12px] font-black mb-1 ${selectedHistoryItem?.id === history.id ? 'text-white' : 'text-black'}`}>
                      {history.jenisServis || 'Servis'}
                    </p>
                    <p className={`text-[11px] truncate ${selectedHistoryItem?.id === history.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      {history.masalah || '-'}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t ${selectedHistoryItem?.id === history.id ? 'border-white/20' : 'border-gray-200'}">
                      <span className={`text-[10px] font-bold ${selectedHistoryItem?.id === history.id ? 'text-gray-300' : 'text-gray-400'}`}>
                        {history.vendor || '-'}
                      </span>
                      <ArrowRight size={14} className={selectedHistoryItem?.id === history.id ? 'text-white' : 'text-gray-400'} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* FOOTER - STANDARDIZED */}
        {/* ============================================ */}
        <div className="px-12 py-6 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-wider text-gray-500 hover:bg-gray-100 transition-all"
          >
            {isView ? 'Tutup' : 'Batal'}
          </button>
          {!isView && (
            <button
              onClick={handleSave}
              className="px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-wider bg-black text-white hover:bg-gray-800 transition-all shadow-xl shadow-black/20"
            >
              Simpan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
