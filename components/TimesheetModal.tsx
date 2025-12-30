
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Clock, MapPin, User, CheckSquare, Calendar, Image as ImageIcon, Trash2, UploadCloud, Building } from 'lucide-react';
import { TimesheetRecord, BuildingRecord, UserRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<TimesheetRecord>) => void;
  initialData?: TimesheetRecord | null;
  mode?: 'create' | 'edit' | 'view';
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
    tasks: [],
    photos: []
  });
  
  const [newTask, setNewTask] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock cleaners if userList is empty/generic
  const cleaners = userList.length > 0 ? userList : [
      { id: 'USR-001', name: 'Siti Aminah', role: 'Cleaning Service', avatar: 'https://via.placeholder.com/150', phone: '08123456789' },
      { id: 'USR-002', name: 'Budi Santoso', role: 'Cleaning Service', avatar: 'https://via.placeholder.com/150', phone: '08123456789' },
  ];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            date: new Date().toISOString().split('T')[0],
            status: 'Tepat Waktu',
            shift: 'Pagi',
            tasks: [],
            photos: [],
            clockIn: '',
            clockOut: ''
        });
      }
      setActiveTab('DETAILS');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleAddTask = () => {
      if (newTask.trim()) {
          setForm(prev => ({ ...prev, tasks: [...(prev.tasks || []), newTask] }));
          setNewTask('');
      }
  };

  const removeTask = (index: number) => {
      if (isView) return;
      setForm(prev => ({ ...prev, tasks: prev.tasks?.filter((_, i) => i !== index) }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setForm(prev => ({ ...prev, photos: [...(prev.photos || []), ev.target?.result as string] }));
          };
          reader.readAsDataURL(file);
      }
      e.target.value = '';
  };

  const removeImage = (index: number) => {
      if (isView) return;
      setForm(prev => ({ ...prev, photos: prev.photos?.filter((_, i) => i !== index) }));
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBFBFB] w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Clock size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'Input Timesheet Kebersihan' : mode === 'edit' ? 'Edit Timesheet' : 'Detail Timesheet'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Cleaning Service Log</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8">
            {['DETAILS', 'CHECKLIST TUGAS', 'BUKTI FOTO'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-[3px] 
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-500'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1 bg-[#FBFBFB]">
            
            {activeTab === 'DETAILS' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-black rounded-full"></div>
                            <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Informasi Petugas & Waktu</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label required>Petugas Kebersihan</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm appearance-none cursor-pointer"
                                        value={form.employee?.name || ''}
                                        onChange={(e) => {
                                            const cleaner = cleaners.find((c: any) => c.name === e.target.value);
                                            if(cleaner) setForm({ ...form, employee: { name: cleaner.name, role: cleaner.role, phone: cleaner.phone, avatar: cleaner.avatar } as any });
                                        }}
                                    >
                                        <option value="">-- Pilih Petugas --</option>
                                        {cleaners.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <Label required>Tanggal</Label>
                                <div className="relative">
                                    <input 
                                        type="date"
                                        disabled={isView}
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
                                            disabled={isView}
                                            onClick={() => setForm({...form, shift: s})}
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
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm appearance-none cursor-pointer"
                                    value={form.status}
                                    onChange={(e) => setForm({...form, status: e.target.value as any})}
                                >
                                    <option value="Tepat Waktu">Tepat Waktu</option>
                                    <option value="Terlambat">Terlambat</option>
                                    <option value="Absen">Absen</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Jam Masuk</Label>
                                    <input 
                                        type="time" 
                                        disabled={isView}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black text-center focus:border-black outline-none disabled:bg-gray-50 shadow-sm"
                                        value={form.clockIn}
                                        onChange={(e) => setForm({...form, clockIn: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <Label>Jam Pulang</Label>
                                    <input 
                                        type="time" 
                                        disabled={isView}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[13px] font-black text-black text-center focus:border-black outline-none disabled:bg-gray-50 shadow-sm"
                                        value={form.clockOut}
                                        onChange={(e) => setForm({...form, clockOut: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-black rounded-full"></div>
                            <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Lokasi Penugasan</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label required>Gedung / Cabang</Label>
                                <div className="relative">
                                    <select 
                                        disabled={isView}
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
                                <Label required>Area Spesifik</Label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        disabled={isView}
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm"
                                        placeholder="Contoh: Lobby, Toilet Lt. 1, Pantry"
                                        value={form.area || ''}
                                        onChange={(e) => setForm({...form, area: e.target.value})}
                                    />
                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'CHECKLIST TUGAS' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <CheckSquare size={18} className="text-black"/>
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Daftar Pekerjaan</h3>
                            </div>
                        </div>

                        {!isView && (
                            <div className="flex gap-3 mb-6">
                                <input 
                                    type="text" 
                                    className="flex-1 bg-[#F8F9FA] border-none rounded-xl px-5 py-3 text-[12px] font-bold outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-400"
                                    placeholder="Tambah tugas baru (contoh: Mopping Lantai Lobby)..."
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                />
                                <button 
                                    onClick={handleAddTask}
                                    className="bg-black text-white px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all"
                                >
                                    Tambah
                                </button>
                            </div>
                        )}

                        <div className="space-y-3">
                            {form.tasks && form.tasks.length > 0 ? (
                                form.tasks.map((task, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-[#FBFBFB] rounded-xl border border-gray-100 hover:border-gray-200 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded bg-green-100 text-green-600 flex items-center justify-center border border-green-200">
                                                <CheckSquare size={12} />
                                            </div>
                                            <span className="text-[12px] font-bold text-gray-700">{task}</span>
                                        </div>
                                        {!isView && (
                                            <button onClick={() => removeTask(idx)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-8 border-2 border-dashed border-gray-100 rounded-xl">
                                    <p className="text-[10px] font-bold text-gray-300 uppercase">Belum ada tugas ditambahkan</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'BUKTI FOTO' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <ImageIcon size={18} className="text-black"/>
                            <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Dokumentasi Pekerjaan</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {!isView && (
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all group"
                                >
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <UploadCloud size={20} className="text-gray-400 group-hover:text-black" />
                                    </div>
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-black">Upload Foto</span>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </div>
                            )}

                            {form.photos?.map((photo, idx) => (
                                <div key={idx} className="aspect-square rounded-2xl overflow-hidden relative group border border-gray-100">
                                    <img src={photo} alt={`Evidence ${idx}`} className="w-full h-full object-cover" />
                                    {!isView && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button 
                                                onClick={() => removeImage(idx)}
                                                className="bg-white text-red-500 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> Simpan Laporan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
