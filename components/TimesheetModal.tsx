
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Save, Clock, MapPin, User, CheckSquare, Calendar, Image as ImageIcon, Trash2, Building, Plus, AlertTriangle, Box, QrCode, PenTool, ShieldAlert, Timer, RotateCcw, Copy, CheckCircle2, ChevronDown, ChevronUp, Camera, FileText } from 'lucide-react';
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

  const validEmployees = useMemo(() => {
     return userList.filter(u => ['Cleaning', 'Security', 'Teknisi'].includes(u.role));
  }, [userList]);

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

  // --- Photo Upload Logic ---

  const handleUploadClick = (index: number) => {
      if(isView || isApprove) return; // Prevent upload in view/approve mode
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

  const handleCopyYesterday = () => {
      // Mock Copy Logic
      const dummyActivities: TimesheetActivity[] = [
          { id: `COPY-1`, activityType: 'Patroli area', location: 'Lobby', startTime: '07:00', endTime: '08:00', duration: 1, notes: 'Routine check' },
          { id: `COPY-2`, activityType: 'CCTV check', location: 'Control Room', startTime: '08:00', endTime: '09:00', duration: 1, notes: 'All cameras OK' },
      ];
      setForm(prev => ({ ...prev, activities: dummyActivities }));
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
                    {mode === 'create' ? 'INPUT LAPORAN HARIAN' : mode === 'approve' ? 'APPROVAL LAPORAN' : 'DETAIL LAPORAN'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">DAILY ACTIVITY TIMESHEET</p>
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
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">INFORMASI PETUGAS & WAKTU</h3>
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
                                <Label required>NAMA PETUGAS</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView || isApprove}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm appearance-none cursor-pointer uppercase"
                                        value={form.employee?.id || ''}
                                        onChange={(e) => {
                                            const user = validEmployees.find((c) => c.id === e.target.value);
                                            if(user) setForm({ ...form, employee: user });
                                        }}
                                    >
                                        <option value="">-- PILIH PETUGAS --</option>
                                        {validEmployees.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.role})</option>)}
                                    </select>
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <Label required>TANGGAL LAPORAN</Label>
                                <div className="relative">
                                    <input 
                                        type="date"
                                        disabled={isView || isApprove}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm uppercase"
                                        value={form.date}
                                        onChange={(e) => setForm({...form, date: e.target.value})}
                                    />
                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <Label required>SHIFT KERJA</Label>
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
                                <Label required>STATUS KEHADIRAN</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView || isApprove}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm appearance-none cursor-pointer uppercase"
                                        value={form.status}
                                        onChange={(e) => setForm({...form, status: e.target.value as any})}
                                    >
                                        <option value="Tepat Waktu">Tepat Waktu</option>
                                        <option value="Terlambat">Terlambat</option>
                                        <option value="Absen">Absen</option>
                                        <option value="Izin">Izin</option>
                                        <option value="Libur">Libur</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-black rounded-full"></div>
                            <h3 className="text-[11px] font-black text-black uppercase tracking-widest">LOKASI & VALIDASI</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label required>GEDUNG / CABANG</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView || isApprove}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm appearance-none cursor-pointer uppercase"
                                        value={form.location || ''}
                                        onChange={(e) => setForm({...form, location: e.target.value})}
                                    >
                                        <option value="">-- PILIH LOKASI --</option>
                                        {buildingList.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                                        <option value="Jakarta Head Office">JAKARTA HEAD OFFICE</option>
                                        <option value="Surabaya Branch">SURABAYA BRANCH</option>
                                    </select>
                                    <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                </div>
                            </div>
                            
                            <div>
                                <Label>VALIDASI GPS</Label>
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
                                <Label>CATATAN UMUM (OPTIONAL)</Label>
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
                    {validationError && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 animate-in shake">
                            <AlertTriangle size={18} className="text-red-500 mt-0.5" />
                            <div>
                                <h4 className="text-[11px] font-black text-red-700 uppercase tracking-wide">Validasi Waktu Gagal</h4>
                                <p className="text-[10px] text-red-600 font-medium">{validationError}</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <CheckSquare size={18} className="text-black"/>
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">DAFTAR AKTIVITAS ({form.activities?.length || 0})</h3>
                            </div>
                            {!isView && !isApprove && form.employee?.role && (
                                <button 
                                    onClick={handleAddActivity}
                                    className="bg-black text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
                                >
                                    <Plus size={14} /> TAMBAH
                                </button>
                            )}
                        </div>

                        {!form.employee?.role && (
                            <div className="text-center p-8 bg-red-50 border border-red-100 rounded-2xl mb-6">
                                <p className="text-[11px] font-black text-red-500 uppercase">SILAKAN PILIH PETUGAS TERLEBIH DAHULU UNTUK MEMUAT JENIS KEGIATAN.</p>
                            </div>
                        )}

                        <div className="space-y-6">
                             {form.activities?.map((activity, idx) => (
                                <div key={activity.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group transition-all hover:border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mb-4">
                                        <div className="lg:col-span-4">
                                            <Label required>JENIS KEGIATAN</Label>
                                            <select 
                                                disabled={isView || isApprove}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none appearance-none cursor-pointer uppercase"
                                                value={activity.activityType}
                                                onChange={(e) => handleActivityChange(idx, 'activityType', e.target.value)}
                                            >
                                                <option value="">-- PILIH KEGIATAN --</option>
                                                {activityTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                        
                                        <div className={role === 'Teknisi' ? "lg:col-span-4" : "lg:col-span-8"}>
                                            <Label>LOKASI SPESIFIK</Label>
                                            <input 
                                                type="text"
                                                disabled={isView || isApprove}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none"
                                                placeholder={form.area || "Area..."}
                                                value={activity.location}
                                                onChange={(e) => handleActivityChange(idx, 'location', e.target.value)}
                                            />
                                        </div>
                                        <div className="lg:col-span-3 relative">
                                            <Label required>JAM MULAI</Label>
                                            <div className="relative">
                                                <input 
                                                    type="time" 
                                                    disabled={isView || isApprove}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black text-center focus:border-black outline-none"
                                                    value={activity.startTime}
                                                    onChange={(e) => handleActivityChange(idx, 'startTime', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <Label required>JAM SELESAI</Label>
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
                                        <div className="lg:col-span-2">
                                            <Label>DURASI (JAM)</Label>
                                            <div className={`w-full bg-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-center ${activity.duration < 0 ? 'text-red-500' : 'text-gray-600'}`}>
                                                {activity.duration > 0 ? activity.duration : 'INVALID'} H
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Additional Details: Notes & Photo */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4 border-t border-gray-200/50 mt-4">
                                        <div className="lg:col-span-8">
                                            <Label>CATATAN AKTIVITAS</Label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    disabled={isView || isApprove}
                                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pl-10 text-[12px] font-medium text-black focus:border-black outline-none placeholder:text-gray-400"
                                                    placeholder="Deskripsi detail pekerjaan..."
                                                    value={activity.notes || ''}
                                                    onChange={(e) => handleActivityChange(idx, 'notes', e.target.value)}
                                                />
                                                <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-4">
                                            <Label>FOTO KEGIATAN</Label>
                                            <button 
                                                onClick={() => handleUploadClick(idx)}
                                                disabled={isView || isApprove}
                                                className={`w-full h-[46px] rounded-xl border border-dashed flex items-center justify-center gap-2 transition-all relative overflow-hidden
                                                    ${activity.photo 
                                                    ? 'bg-black border-black text-white' 
                                                    : 'bg-white border-gray-300 text-gray-400 hover:border-black hover:text-black hover:bg-gray-50'}
                                                    ${(isView || isApprove) ? 'cursor-default' : 'cursor-pointer'}
                                                `}
                                            >
                                                {activity.photo ? (
                                                    <>
                                                        <img src={activity.photo} className="w-6 h-6 rounded-md object-cover border border-white/20" alt="Activity" />
                                                        <span className="text-[10px] font-bold uppercase truncate max-w-[100px]">Ubah Foto</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Camera size={16} />
                                                        <span className="text-[10px] font-bold uppercase">Upload</span>
                                                    </>
                                                )}
                                            </button>
                                            {activity.photo && !isView && !isApprove && (
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleActivityChange(idx, 'photo', '');
                                                    }}
                                                    className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full text-red-500 shadow-md hover:bg-red-50 border border-gray-100 z-10"
                                                    title="Hapus Foto"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

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
                        </div>
                    </div>
                </div>
            )}
            
            {isApprove && activeTab === 'APPROVAL' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <PenTool size={32} className="text-black mb-4" />
                        <h3 className="text-[14px] font-black text-black uppercase tracking-widest mb-2">TANDA TANGAN DIGITAL</h3>
                        <p className="text-[10px] text-gray-400 font-medium mb-6 max-w-md">
                            Dengan menandatangani ini, Anda menyetujui bahwa laporan aktivitas yang diajukan adalah benar dan valid sesuai prosedur perusahaan.
                        </p>
                        <div className="w-full max-w-md h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center cursor-crosshair hover:bg-gray-100 transition-all mb-4">
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pointer-events-none">AREA TANDA TANGAN (TOUCH/MOUSE)</span>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">CANCEL</button>
          
          {!isView && !isApprove && (
            <button 
                onClick={() => onSave(form)} 
                disabled={!form.employee || (form.activities?.length || 0) === 0 || !!validationError}
                className="px-16 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Save size={18} strokeWidth={2.5} /> SIMPAN LAPORAN
            </button>
          )}

          {isApprove && (
              <>
                <button 
                    onClick={() => { setForm(prev => ({ ...prev, status: 'Izin' })); onClose(); }} 
                    className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-red-500 rounded-2xl hover:bg-red-600 shadow-xl shadow-red-200 transition-all active:scale-95 flex items-center gap-2"
                >
                    <ShieldAlert size={16} /> REJECT
                </button>
                <button 
                    onClick={() => { setForm(prev => ({ ...prev, status: 'Tepat Waktu' })); onClose(); }} 
                    className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-green-500 rounded-2xl hover:bg-green-600 shadow-xl shadow-green-200 transition-all active:scale-95 flex items-center gap-2"
                >
                    <CheckCircle2 size={16} strokeWidth={2.5} /> APPROVE
                </button>
              </>
          )}
        </div>
      </div>
    </div>
  );
};
