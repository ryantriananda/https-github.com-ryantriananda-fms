
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Save, Clock, MapPin, User, CheckSquare, Calendar, Image as ImageIcon, Trash2, Building, Plus, AlertTriangle, Box, QrCode, PenTool, ShieldAlert, Timer, RotateCcw, Copy, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { TimesheetRecord, BuildingRecord, UserRecord, TimesheetActivity } from '../types';
import { ACTIVITY_TYPES, MOCK_BUILDING_ASSETS, MOCK_GENERAL_ASSET_DATA, CLEANING_CHECKLISTS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<TimesheetRecord>) => void;
  initialData?: TimesheetRecord | null;
  mode?: 'create' | 'edit' | 'view' | 'approve';
  buildingList?: BuildingRecord[];
  userList?: UserRecord[];
}

export const TimesheetModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    buildingList = [],
    userList = []
}) => {
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [form, setForm] = useState<Partial<TimesheetRecord>>({
    date: new Date().toISOString().split('T')[0],
    status: 'Tepat Waktu',
    shift: 'Pagi',
    activities: [],
    totalHours: 0,
    generalNotes: ''
  });
  
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeActivityIndex, setActiveActivityIndex] = useState<number | null>(null);
  const [activeTimerIndex, setActiveTimerIndex] = useState<number | null>(null);
  const [expandedChecklists, setExpandedChecklists] = useState<Record<number, boolean>>({});

  // Logic to validate time overlap
  const validateTimeOverlap = (activities: TimesheetActivity[]) => {
      setValidationError(null);
      if (activities.length < 2) return;

      const sorted = [...activities].sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

      for (let i = 0; i < sorted.length - 1; i++) {
          const currentEnd = sorted[i].endTime;
          const nextStart = sorted[i+1].startTime;

          if (currentEnd && nextStart && currentEnd > nextStart) {
              setValidationError(`Terdapat tumpang tindih waktu antara aktivitas ${i+1} dan ${i+2}. Mohon cek jam selesai.`);
              return;
          }
      }
  };

  // Derive available Activity Types based on selected Employee's Role
  const activityTypes = useMemo(() => {
      const role = form.employee?.role as keyof typeof ACTIVITY_TYPES;
      if (role && ACTIVITY_TYPES[role]) {
          return ACTIVITY_TYPES[role];
      }
      return []; 
  }, [form.employee?.role]);

  // Combined Assets List for Technicians (Mocking data for dropdown)
  const availableAssets = useMemo(() => {
      const bldAssets = MOCK_BUILDING_ASSETS.map(a => ({ id: a.id, name: `${a.assetName} (${a.assetCode})`, location: a.buildingName }));
      const genAssets = MOCK_GENERAL_ASSET_DATA.map(a => ({ id: a.id, name: `${a.assetName || a.type} (${a.assetNumber})`, location: a.assetLocation }));
      return [...bldAssets, ...genAssets];
  }, []);

  const validEmployees = userList.filter(u => ['Cleaning', 'Security', 'Teknisi'].includes(u.role));

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            date: new Date().toISOString().split('T')[0],
            status: 'Tepat Waktu',
            shift: 'Pagi',
            activities: [],
            totalHours: 0,
            generalNotes: ''
        });
      }
      setActiveTab('DETAILS');
      setValidationError(null);
      setActiveTimerIndex(null);
    }
  }, [isOpen, initialData]);

  // Auto-calculate Total Hours & Validate
  useEffect(() => {
      const total = (form.activities || []).reduce((sum, act) => sum + (act.duration || 0), 0);
      setForm(prev => ({ ...prev, totalHours: Number(total.toFixed(2)) }));
      validateTimeOverlap(form.activities || []);
  }, [form.activities]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isApprove = mode === 'approve';
  const role = form.employee?.role;

  // --- Handlers ---

  const handleAddActivity = () => {
      const newActivity: TimesheetActivity = {
          id: `ACT-${Date.now()}`,
          activityType: '',
          location: form.location || '', 
          startTime: '08:00',
          endTime: '09:00',
          duration: 1,
          notes: ''
      };
      setForm(prev => ({ ...prev, activities: [...(prev.activities || []), newActivity] }));
  };

  const handleRemoveActivity = (index: number) => {
      if (isView || isApprove) return;
      const updated = [...(form.activities || [])];
      updated.splice(index, 1);
      setForm(prev => ({ ...prev, activities: updated }));
  };

  const handleActivityChange = (index: number, field: keyof TimesheetActivity, value: any) => {
      const updated = [...(form.activities || [])];
      updated[index] = { ...updated[index], [field]: value };

      // Auto-calc duration if time changes
      if (field === 'startTime' || field === 'endTime') {
          const start = field === 'startTime' ? value : updated[index].startTime;
          const end = field === 'endTime' ? value : updated[index].endTime;
          
          if (start && end) {
              const [startH, startM] = start.split(':').map(Number);
              const [endH, endM] = end.split(':').map(Number);
              let diff = (endH * 60 + endM) - (startH * 60 + startM);
              if (diff < 0) diff += 24 * 60; // Handle overnight (simple)
              updated[index].duration = Number((diff / 60).toFixed(2));
          }
      }

      // Handle Asset Link Name update
      if (field === 'linkedAssetId') {
          const asset = availableAssets.find(a => a.id === value);
          if (asset) updated[index].linkedAssetName = asset.name;
      }

      // Handle Checklist Initialization for Cleaning
      if (field === 'activityType' && role === 'Cleaning') {
          const checklistItems = CLEANING_CHECKLISTS[value] || [];
          updated[index].checklist = checklistItems.map(label => ({ label, checked: false }));
      }

      setForm(prev => ({ ...prev, activities: updated }));
  };

  // --- Deep Dive Logic ---

  const handleChecklistToggle = (actIndex: number, checkIndex: number) => {
      if (isView && !isApprove) return; 
      const updated = [...(form.activities || [])];
      const activity = updated[actIndex];
      if (activity.checklist) {
          activity.checklist[checkIndex].checked = !activity.checklist[checkIndex].checked;
          setForm(prev => ({ ...prev, activities: updated }));
      }
  };

  const handleGeoLocation = () => {
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
              setForm(prev => ({
                  ...prev,
                  coordinates: {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                      timestamp: new Date().toISOString()
                  }
              }));
              alert("Lokasi berhasil diambil!");
          });
      } else {
          alert("Geolocation tidak didukung browser ini.");
      }
  };

  const handleCopyYesterday = () => {
      // Mock Copy Logic
      const dummyActivities: TimesheetActivity[] = [
          { id: `COPY-1`, activityType: 'Patroli area', location: 'Lobby', startTime: '07:00', endTime: '08:00', duration: 1, notes: 'Routine check' },
          { id: `COPY-2`, activityType: 'CCTV check', location: 'Control Room', startTime: '08:00', endTime: '09:00', duration: 1, notes: 'All cameras OK' },
      ];
      setForm(prev => ({ ...prev, activities: dummyActivities }));
  };

  const toggleTimer = (index: number) => {
      if (activeTimerIndex === index) {
          // Stop Timer
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          handleActivityChange(index, 'endTime', `${hours}:${minutes}`);
          setActiveTimerIndex(null);
      } else {
          // Start Timer
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          handleActivityChange(index, 'startTime', `${hours}:${minutes}`);
          setActiveTimerIndex(index);
      }
  };

  // --- Photo Upload Logic ---

  const handleUploadClick = (index: number) => {
      if(isView && !isApprove) return;
      setActiveActivityIndex(index);
      fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && activeActivityIndex !== null) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              handleActivityChange(activeActivityIndex, 'photo', ev.target?.result as string);
          };
          reader.readAsDataURL(file);
      }
      e.target.value = '';
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Clock size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Input Laporan Harian' : mode === 'approve' ? 'Approval Laporan' : 'Detail Laporan'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Daily Activity Timesheet</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8">
            {['DETAILS', 'AKTIVITAS', isApprove ? 'APPROVAL' : null].filter(Boolean).map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab!)}
                    className={`py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[3px] 
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1 bg-[#FBFBFB]">
            
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

            {activeTab === 'DETAILS' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-black rounded-full"></div>
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Informasi Petugas & Waktu</h3>
                            </div>
                            {!isView && !isApprove && (
                                <button 
                                    onClick={handleCopyYesterday}
                                    className="flex items-center gap-2 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all"
                                >
                                    <Copy size={12} /> Salin Kemarin
                                </button>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label required>Nama Petugas</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView || isApprove}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm appearance-none cursor-pointer"
                                        value={form.employee?.name || ''}
                                        onChange={(e) => {
                                            const user = validEmployees.find((c) => c.name === e.target.value);
                                            if(user) setForm({ ...form, employee: { name: user.name, role: user.role as any, phone: user.phone, avatar: user.avatar || '' } });
                                        }}
                                    >
                                        <option value="">-- Pilih Petugas --</option>
                                        {validEmployees.map((c) => <option key={c.id} value={c.name}>{c.name} ({c.role})</option>)}
                                    </select>
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <Label required>Tanggal Laporan</Label>
                                <div className="relative">
                                    <input 
                                        type="date"
                                        disabled={isView || isApprove}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm"
                                        value={form.date}
                                        onChange={(e) => setForm({...form, date: e.target.value})}
                                    />
                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <Label required>Shift Kerja</Label>
                                <div className="flex gap-3">
                                    {['Pagi', 'Siang', 'Malam'].map(s => (
                                        <button
                                            key={s}
                                            disabled={isView || isApprove}
                                            onClick={() => setForm({...form, shift: s as any})}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                                form.shift === s 
                                                ? 'bg-black text-white border-black shadow-lg' 
                                                : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label required>Status Kehadiran</Label>
                                <select 
                                    disabled={isView || isApprove}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm appearance-none cursor-pointer"
                                    value={form.status}
                                    onChange={(e) => setForm({...form, status: e.target.value as any})}
                                >
                                    <option value="Tepat Waktu">Tepat Waktu</option>
                                    <option value="Terlambat">Terlambat</option>
                                    <option value="Absen">Absen</option>
                                    <option value="Izin">Izin</option>
                                    <option value="Libur">Libur</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-black rounded-full"></div>
                            <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Lokasi & Validasi</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label required>Gedung / Cabang</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView || isApprove}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm appearance-none cursor-pointer"
                                        value={form.location || ''}
                                        onChange={(e) => setForm({...form, location: e.target.value})}
                                    >
                                        <option value="">-- Pilih Lokasi --</option>
                                        {buildingList.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                                        <option value="Jakarta Head Office">Jakarta Head Office</option>
                                        <option value="Surabaya Branch">Surabaya Branch</option>
                                    </select>
                                    <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                </div>
                            </div>
                            
                            <div>
                                <Label>Validasi GPS</Label>
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-1">
                                        <input 
                                            type="text"
                                            disabled={true}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[11px] font-mono text-gray-500 outline-none"
                                            placeholder="Latitude, Longitude"
                                            value={form.coordinates ? `${form.coordinates.lat.toFixed(6)}, ${form.coordinates.lng.toFixed(6)}` : ''}
                                        />
                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                    {!isView && !isApprove && (
                                        <button 
                                            onClick={handleGeoLocation}
                                            className="bg-black text-white px-4 py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                                            title="Ambil Lokasi Saat Ini"
                                        >
                                            <MapPin size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <Label>Catatan Umum (Optional)</Label>
                                <textarea 
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-medium text-black focus:border-black outline-none disabled:bg-gray-50 transition-all placeholder:text-gray-300 shadow-sm resize-none"
                                    placeholder="Tulis catatan tambahan harian..."
                                    rows={2}
                                    value={form.generalNotes || ''}
                                    onChange={(e) => setForm({...form, generalNotes: e.target.value})}
                                    disabled={isView || isApprove}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'AKTIVITAS' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    
                    {/* Validation Error Banner */}
                    {validationError && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 animate-in shake">
                            <AlertTriangle size={18} className="text-red-500 mt-0.5" />
                            <div>
                                <h4 className="text-[11px] font-black text-red-700 uppercase tracking-wide">Validasi Waktu Gagal</h4>
                                <p className="text-[10px] text-red-600 font-medium">{validationError}</p>
                            </div>
                        </div>
                    )}

                    {/* Max Hours Warning */}
                    {form.totalHours > 16 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
                            <AlertTriangle size={18} className="text-orange-500 mt-0.5" />
                            <div>
                                <h4 className="text-[11px] font-black text-orange-700 uppercase tracking-wide">Peringatan Durasi Shift</h4>
                                <p className="text-[10px] text-orange-600 font-medium">Total jam kerja melebihi batas wajar (16 Jam). Mohon periksa kembali.</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <CheckSquare size={18} className="text-black"/>
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Daftar Aktivitas ({form.activities?.length || 0})</h3>
                            </div>
                            {!isView && !isApprove && form.employee?.role && (
                                <button 
                                    onClick={handleAddActivity}
                                    className="bg-black text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
                                >
                                    <Plus size={14} /> Tambah Aktivitas
                                </button>
                            )}
                        </div>

                        {!form.employee?.role && (
                            <div className="text-center p-8 bg-red-50 border border-red-100 rounded-2xl mb-6">
                                <p className="text-[11px] font-black text-red-500 uppercase">Silakan pilih petugas terlebih dahulu untuk memuat jenis kegiatan.</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {form.activities?.map((activity, idx) => (
                                <div key={activity.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group transition-all hover:border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mb-4">
                                        
                                        {/* Activity Type Dropdown */}
                                        <div className="lg:col-span-4">
                                            <Label required>Jenis Kegiatan</Label>
                                            <select 
                                                disabled={isView || isApprove}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none appearance-none cursor-pointer"
                                                value={activity.activityType}
                                                onChange={(e) => handleActivityChange(idx, 'activityType', e.target.value)}
                                            >
                                                <option value="">-- Pilih Kegiatan --</option>
                                                {activityTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>

                                        {/* DEEP DIVE: Technician Asset Selection */}
                                        {role === 'Teknisi' && (
                                            <div className="lg:col-span-4">
                                                <Label>Aset Terkait (Opsional)</Label>
                                                <div className="relative">
                                                    <select 
                                                        disabled={isView || isApprove}
                                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-blue-600 focus:border-blue-500 outline-none appearance-none cursor-pointer"
                                                        value={activity.linkedAssetId || ''}
                                                        onChange={(e) => handleActivityChange(idx, 'linkedAssetId', e.target.value)}
                                                    >
                                                        <option value="">-- Pilih Aset --</option>
                                                        {availableAssets.map(a => (
                                                            <option key={a.id} value={a.id}>{a.name}</option>
                                                        ))}
                                                    </select>
                                                    <Box size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Location specific for activity */}
                                        <div className={role === 'Teknisi' ? "lg:col-span-4" : "lg:col-span-8"}>
                                            <Label>Lokasi Spesifik</Label>
                                            <input 
                                                type="text"
                                                disabled={isView || isApprove}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none"
                                                placeholder={form.area || "Area..."}
                                                value={activity.location}
                                                onChange={(e) => handleActivityChange(idx, 'location', e.target.value)}
                                            />
                                        </div>

                                        {/* Time Inputs & Timer */}
                                        <div className="lg:col-span-3 relative">
                                            <Label required>Jam Mulai</Label>
                                            <div className="relative">
                                                <input 
                                                    type="time" 
                                                    disabled={isView || isApprove}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black text-center focus:border-black outline-none"
                                                    value={activity.startTime}
                                                    onChange={(e) => handleActivityChange(idx, 'startTime', e.target.value)}
                                                />
                                                {!isView && !isApprove && (
                                                    <button 
                                                        onClick={() => toggleTimer(idx)}
                                                        className={`absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${activeTimerIndex === idx ? 'text-red-500 animate-pulse' : 'text-green-500 hover:bg-green-50'}`}
                                                        title="Start/Stop Timer"
                                                    >
                                                        <Timer size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <Label required>Jam Selesai</Label>
                                            <input 
                                                type="time" 
                                                disabled={isView || isApprove}
                                                className={`w-full bg-white border rounded-xl px-4 py-3 text-[12px] font-bold text-black text-center focus:border-black outline-none ${
                                                    activity.duration < 0 ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                                value={activity.endTime}
                                                onChange={(e) => handleActivityChange(idx, 'endTime', e.target.value)}
                                            />
                                        </div>

                                        {/* Calculated Duration */}
                                        <div className="lg:col-span-2">
                                            <Label>Durasi (Jam)</Label>
                                            <div className={`w-full bg-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-center ${activity.duration < 0 ? 'text-red-500' : 'text-gray-600'}`}>
                                                {activity.duration > 0 ? activity.duration : 'Invalid'} h
                                            </div>
                                        </div>

                                        {/* Evidence Upload */}
                                        <div className="lg:col-span-4">
                                            <Label>Bukti Foto</Label>
                                            <div 
                                                onClick={() => handleUploadClick(idx)}
                                                className={`w-full h-[46px] border-2 border-dashed rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
                                                    activity.photo ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white hover:border-black'
                                                }`}
                                            >
                                                {activity.photo ? (
                                                    <span className="text-[10px] font-black text-green-600 uppercase">Uploaded</span>
                                                ) : (
                                                    <>
                                                        <ImageIcon size={14} className="text-gray-400" />
                                                        <span className="text-[9px] font-bold text-gray-400 uppercase">Upload</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* DEEP DIVE: Cleaning Checklist */}
                                    {role === 'Cleaning' && activity.checklist && activity.checklist.length > 0 && (
                                        <div className="mb-4 bg-white p-4 rounded-xl border border-gray-100">
                                            <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setExpandedChecklists(prev => ({...prev, [idx]: !prev[idx]}))}>
                                                <Label>CHECKLIST KEBERSIHAN</Label>
                                                {expandedChecklists[idx] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                            </div>
                                            {(expandedChecklists[idx] || !isView) && (
                                                <div className="grid grid-cols-2 gap-2">
                                                    {activity.checklist.map((item, cIdx) => (
                                                        <label key={cIdx} className="flex items-center gap-2 text-[10px] font-medium text-gray-600 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={item.checked} 
                                                                disabled={isView && !isApprove}
                                                                onChange={() => handleChecklistToggle(idx, cIdx)}
                                                                className="rounded border-gray-300 text-black focus:ring-0"
                                                            />
                                                            {item.label}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* DEEP DIVE: Security Incident & Checkpoint */}
                                    {role === 'Security' && (
                                        <div className="mb-4 flex flex-wrap gap-4 items-center">
                                            <button 
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${activity.isQrVerified ? 'bg-green-100 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-500'}`}
                                                onClick={() => !isView && !isApprove && handleActivityChange(idx, 'isQrVerified', !activity.isQrVerified)}
                                            >
                                                <QrCode size={12} /> {activity.isQrVerified ? 'Checkpoint Verified' : 'Scan Checkpoint'}
                                            </button>
                                            
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="checkbox" 
                                                    id={`incident-${idx}`}
                                                    checked={!!activity.incidentDescription}
                                                    onChange={(e) => handleActivityChange(idx, 'incidentDescription', e.target.checked ? 'Incident detected' : '')}
                                                    disabled={isView && !isApprove}
                                                />
                                                <label htmlFor={`incident-${idx}`} className="text-[10px] font-bold text-red-500 uppercase cursor-pointer">Report Incident</label>
                                            </div>
                                            
                                            {activity.incidentDescription && (
                                                <input 
                                                    type="text" 
                                                    className="flex-1 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5 text-[10px] text-red-700 focus:outline-none placeholder:text-red-300"
                                                    placeholder="Describe incident..."
                                                    value={activity.incidentDescription}
                                                    onChange={(e) => handleActivityChange(idx, 'incidentDescription', e.target.value)}
                                                    disabled={isView && !isApprove}
                                                />
                                            )}
                                        </div>
                                    )}

                                    {/* DEEP DIVE: Technician Spare Parts */}
                                    {role === 'Teknisi' && (
                                        <div className="mb-4">
                                            <Label>Spare Parts Used</Label>
                                            <input 
                                                type="text"
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-[11px] font-medium text-black focus:border-black outline-none placeholder:text-gray-300"
                                                placeholder="e.g. 2x Lampu LED, 1x Kabel (Optional)"
                                                value={activity.spareParts || ''}
                                                onChange={(e) => handleActivityChange(idx, 'spareParts', e.target.value)}
                                                disabled={isView && !isApprove}
                                            />
                                        </div>
                                    )}

                                    {/* Notes */}
                                    <div className="mb-2">
                                        <input 
                                            type="text"
                                            disabled={isView && !isApprove}
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-medium text-black focus:border-black outline-none placeholder:text-gray-300"
                                            placeholder="Catatan hasil pekerjaan..."
                                            value={activity.notes}
                                            onChange={(e) => handleActivityChange(idx, 'notes', e.target.value)}
                                        />
                                    </div>

                                    {/* APPROVAL MODE: Rejection Note Per Item */}
                                    {isApprove && (
                                        <div className="mt-2 pt-2 border-t border-gray-200">
                                            <Label>Revisi / Catatan Supervisor</Label>
                                            <input 
                                                type="text"
                                                className="w-full bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-2 text-[11px] text-yellow-800 focus:border-yellow-400 outline-none placeholder:text-yellow-400/50"
                                                placeholder="Berikan catatan jika ada koreksi..."
                                                value={activity.rejectionNote || ''}
                                                onChange={(e) => handleActivityChange(idx, 'rejectionNote', e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {/* Remove Button */}
                                    {!isView && !isApprove && (
                                        <button 
                                            onClick={() => handleRemoveActivity(idx)}
                                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {(!form.activities || form.activities.length === 0) && (
                                <div className="text-center p-12 border-2 border-dashed border-gray-100 rounded-2xl">
                                    <p className="text-[10px] font-bold text-gray-300 uppercase">Belum ada aktivitas ditambahkan</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-black text-white p-6 rounded-[2rem] shadow-xl shadow-black/20 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Jam Kerja</p>
                            <h3 className="text-[24px] font-black">{form.totalHours} Jam</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jumlah Aktivitas</p>
                            <h3 className="text-[24px] font-black">{form.activities?.length || 0} Item</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: APPROVAL (Only in Approve Mode) */}
            {isApprove && activeTab === 'APPROVAL' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <PenTool size={32} className="text-black mb-4" />
                        <h3 className="text-[14px] font-black text-black uppercase tracking-widest mb-2">Tanda Tangan Digital</h3>
                        <p className="text-[10px] text-gray-400 font-medium mb-6 max-w-md">
                            Dengan menandatangani ini, Anda menyetujui bahwa laporan aktivitas yang diajukan adalah benar dan valid sesuai prosedur perusahaan.
                        </p>
                        
                        <div className="w-full max-w-md h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center cursor-crosshair hover:bg-gray-100 transition-all mb-4">
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pointer-events-none">Area Tanda Tangan (Touch/Mouse)</span>
                        </div>
                        
                        <div className="flex gap-4 w-full max-w-md">
                            <button className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200">Clear</button>
                            <button className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200">Confirm Sign</button>
                        </div>
                    </div>
                </div>
            )}

        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">Cancel</button>
          
          {!isView && !isApprove && (
            <button 
                onClick={() => onSave(form)} 
                disabled={!form.employee || (form.activities?.length || 0) === 0 || !!validationError}
                className="px-16 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Save size={18} strokeWidth={2.5} /> Simpan Laporan
            </button>
          )}

          {isApprove && (
              <>
                <button 
                    onClick={() => { setForm(prev => ({ ...prev, status: 'Izin' })); onClose(); }} // Mock Reject
                    className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-red-500 rounded-2xl hover:bg-red-600 shadow-xl shadow-red-200 transition-all active:scale-95 flex items-center gap-2"
                >
                    <ShieldAlert size={16} /> Reject
                </button>
                <button 
                    onClick={() => { setForm(prev => ({ ...prev, status: 'Tepat Waktu' })); onClose(); }} // Mock Approve
                    className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-green-500 rounded-2xl hover:bg-green-600 shadow-xl shadow-green-200 transition-all active:scale-95 flex items-center gap-2"
                >
                    <CheckCircle2 size={16} strokeWidth={2.5} /> Approve
                </button>
              </>
          )}
        </div>
      </div>
    </div>
  );
};
