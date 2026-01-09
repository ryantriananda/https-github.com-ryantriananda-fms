
import React, { useState, useEffect } from 'react';
import { X, Save, Lock, User, MapPin, Briefcase, Info, Unlock, AlertCircle, ChevronDown, CheckCircle2, XCircle, Clock, Check, RotateCcw, GitBranch, History, ArrowLeft, Package } from 'lucide-react';
import { LockerRequestRecord, UserRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<LockerRequestRecord>) => void;
  initialData?: LockerRequestRecord | null;
  mode?: 'create' | 'edit' | 'view' | 'approve';
  currentUser?: UserRecord;
}

export const LockerRequestModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    currentUser 
}) => {
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [isHistoryView, setIsHistoryView] = useState(false);
  const [inlineAction, setInlineAction] = useState<{ type: 'Approve' | 'Reject' | 'Revise' | null, note: string }>({ type: null, note: '' });

  const [form, setForm] = useState<Partial<LockerRequestRecord>>({
    requestDate: new Date().toISOString().split('T')[0],
    lockerNumber: '001',
    floor: 'LANTAI 1',
    requestType: 'REQUEST LOKER BARU',
    requesterName: '',
    requesterRole: '',
    jobTitle: '',
    department: '',
    statusLocker: 'Kosong',
    status: 'Pending',
    reason: ''
  });

  useEffect(() => {
    if (isOpen) {
      // Default to WORKFLOW tab if in Approval mode
      setActiveTab(mode === 'approve' ? 'WORKFLOW' : 'DETAILS');
      setIsHistoryView(false);
      setInlineAction({ type: null, note: '' });
      
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            requestDate: new Date().toISOString().split('T')[0],
            lockerNumber: '001', 
            floor: 'LANTAI 1',
            requestType: 'REQUEST LOKER BARU',
            requesterName: currentUser?.name || 'Siti Aminah',
            requesterRole: currentUser?.role || 'Staff',
            jobTitle: 'Team Leader',
            department: currentUser?.department || 'Finance',
            statusLocker: 'Kosong',
            status: 'Pending',
            reason: ''
        });
      }
    }
  }, [isOpen, initialData, currentUser, mode]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isApprove = mode === 'approve';
  const isReadOnly = isView || isApprove;

  const handleInlineSubmit = () => {
      const { type, note } = inlineAction;
      if (!type) return;

      const newStatus = type === 'Approve' ? 'Approved' : type === 'Reject' ? 'Rejected' : 'Revised';
      
      onSave({ 
          ...form, 
          status: newStatus,
          // Append note if needed or store separately
      });
      onClose();
  };

  const handleFooterAction = (action: 'Approve' | 'Reject' | 'Revise') => {
      setActiveTab('WORKFLOW');
      setInlineAction({ type: action, note: '' });
      // Ideally scroll to workflow action area here if needed
  };

  const handleStatusChange = (status: 'Terisi' | 'Kosong' | 'Kunci Hilang') => {
      if (isReadOnly) return;
      setForm(prev => ({ ...prev, statusLocker: status }));
  };

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 ml-1">
      {children}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon size={18} className="text-black" />
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const InputField = ({ label, value, onChange, placeholder, icon: Icon, disabled, className }: any) => (
    <div className={`mb-6 ${className}`}>
        <Label>{label}</Label>
        <div className="relative">
            <input 
                type="text"
                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-sm uppercase"
                placeholder={placeholder}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled || isReadOnly}
            />
            {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
        </div>
    </div>
  );

  // --- RENDER HISTORY VIEW ---
  const renderHistoryView = () => {
      const historyLogs = [
          { id: 'REQ-LOC-001', date: '2023-01-10', action: 'Locker Assigned', status: 'Approved', note: 'Assigned Locker 001 - Floor 1' },
          { id: 'REQ-LOC-002', date: '2023-06-15', action: 'Key Replacement', status: 'Completed', note: 'Lost key reported, spare key issued' },
          { id: 'REQ-LOC-003', date: '2023-12-01', action: 'Locker Return', status: 'Approved', note: 'Resignation - Locker Returned' },
      ];

      return (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300 p-8 h-full bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 shrink-0">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
                          <History size={24} />
                      </div>
                      <div>
                          <h3 className="text-[16px] font-black text-black uppercase tracking-tight">Riwayat Penggunaan Loker</h3>
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                            User: <span className="text-black">{form.requesterName}</span>
                          </p>
                      </div>
                  </div>
                  <button 
                      onClick={() => setIsHistoryView(false)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
                  >
                      <ArrowLeft size={14} /> Back to Form
                  </button>
              </div>

              <div className="overflow-auto custom-scrollbar flex-1 -mx-4 px-4">
                  <div className="space-y-4">
                    {historyLogs.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-gray-300 bg-gray-50/50 hover:bg-white transition-all group cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-xl border border-gray-200 shadow-sm text-[10px] font-black text-gray-400 group-hover:border-blue-200 group-hover:text-blue-500 transition-colors">
                                    <span className="uppercase">{new Date(item.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-[16px] text-black group-hover:text-blue-600">{new Date(item.date).getDate()}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="text-[13px] font-black text-black uppercase tracking-tight">{item.action}</div>
                                        <div className="text-[10px] font-mono text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-100">{item.id}</div>
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                                        <Info size={12} /> {item.note}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                    item.status === 'Approved' || item.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                    item.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                  </div>
              </div>
          </div>
      );
  };

  // --- RENDER MAIN CONTENT ---
  const renderDetails = () => (
      <div className="animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column: INFORMASI DASAR */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full">
                    <SectionHeader icon={Info} title="INFORMASI DASAR" />
                    
                    <div className="space-y-2">
                        <InputField 
                            label="LOCKER NO" 
                            value={form.lockerNumber} 
                            onChange={(val: string) => setForm({...form, lockerNumber: val})}
                            placeholder="001"
                            icon={Lock}
                        />
                        
                        <InputField 
                            label="FLOOR / LOCATION" 
                            value={form.floor}
                            onChange={(val: string) => setForm({...form, floor: val})}
                            placeholder="LANTAI 1"
                            icon={MapPin}
                        />

                        <div className="mb-4">
                            <Label>TIPE REQUEST</Label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-5 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer uppercase shadow-sm"
                                    value={form.requestType}
                                    onChange={(e) => setForm({...form, requestType: e.target.value})}
                                    disabled={isReadOnly}
                                >
                                    <option value="REQUEST LOKER BARU">REQUEST LOKER BARU</option>
                                    <option value="PINDAH LOKER">PINDAH LOKER</option>
                                    <option value="PINJAM KUNCI CADANGAN LOKER">PINJAM KUNCI CADANGAN LOKER</option>
                                    <option value="LAPOR KUNCI HILANG">LAPOR KUNCI HILANG</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* STATUS LOKER Section within Details */}
                        <div className="pt-4 border-t border-dashed border-gray-100">
                             <Label>STATUS LOKER SAAT INI</Label>
                             <div className="grid grid-cols-3 gap-2 mt-2">
                                <button
                                    onClick={() => handleStatusChange('Terisi')}
                                    disabled={isReadOnly}
                                    className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border ${
                                        form.statusLocker === 'Terisi' 
                                        ? 'bg-black text-white border-black shadow-lg' 
                                        : 'bg-white text-gray-400 border-gray-200'
                                    }`}
                                >
                                    <Lock size={14} />
                                    <span className="text-[9px] font-black uppercase">TERISI</span>
                                </button>
                                <button
                                    onClick={() => handleStatusChange('Kosong')}
                                    disabled={isReadOnly}
                                    className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border ${
                                        form.statusLocker === 'Kosong' 
                                        ? 'bg-[#10B981] text-white border-[#10B981] shadow-lg' 
                                        : 'bg-white text-gray-400 border-gray-200'
                                    }`}
                                >
                                    <Unlock size={14} />
                                    <span className="text-[9px] font-black uppercase">KOSONG</span>
                                </button>
                                <button
                                    onClick={() => handleStatusChange('Kunci Hilang')}
                                    disabled={isReadOnly}
                                    className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border ${
                                        form.statusLocker === 'Kunci Hilang' 
                                        ? 'bg-red-500 text-white border-red-500 shadow-lg' 
                                        : 'bg-white text-gray-400 border-gray-200'
                                    }`}
                                >
                                    <AlertCircle size={14} />
                                    <span className="text-[9px] font-black uppercase">HILANG</span>
                                </button>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: OCCUPANT DETAILS */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full">
                    <SectionHeader icon={User} title="OCCUPANT DETAILS" />
                    
                    <div className="space-y-2">
                        <InputField 
                            label="NAMA PENGHUNI" 
                            value={form.requesterName} 
                            onChange={(val: string) => setForm({...form, requesterName: val})}
                            placeholder="AAN JUNAIDI"
                            icon={User}
                        />
                        
                        <InputField 
                            label="ROLE / POSITION" 
                            value={form.requesterRole} 
                            onChange={(val: string) => setForm({...form, requesterRole: val})}
                            placeholder="TECHNICIAN"
                            icon={Briefcase}
                        />

                        <div className="grid grid-cols-2 gap-6">
                            <InputField 
                                label="JABATAN"
                                placeholder="TEAM LEADER"
                                value={form.jobTitle || ''}
                                onChange={(val: string) => setForm({...form, jobTitle: val})}
                            />
                            <InputField 
                                label="DEPARTMENT"
                                placeholder="AFTER SALES"
                                value={form.department || ''}
                                onChange={(val: string) => setForm({...form, department: val})}
                            />
                        </div>

                         <div className="pt-2">
                             <Label>ALASAN PENGAJUAN</Label>
                             <textarea 
                                disabled={isReadOnly}
                                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[13px] font-medium text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner resize-none"
                                rows={3}
                                placeholder="Ketik alasan pengajuan..."
                                value={form.reason || ''}
                                onChange={(e) => setForm({...form, reason: e.target.value})}
                             />
                         </div>
                    </div>
                </div>
            </div>
      </div>
  );

  const renderWorkflow = () => (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-[63px] top-12 bottom-12 w-[2px] bg-gray-100"></div>
                <div className="space-y-10 relative z-10">
                    {/* Step 1: Initiator */}
                    <div className="flex gap-8">
                        <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-200 shrink-0 border-4 border-white">
                            <CheckCircle2 size={20} />
                        </div>
                        <div className="pt-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">INITIATOR</span>
                            <h4 className="text-[14px] font-black text-black uppercase tracking-tight">REQUEST SUBMITTED</h4>
                            <div className="flex items-center gap-2 mt-1.5 text-[11px] font-medium text-gray-500">
                                <User size={12} />
                                <span>{form.requesterName || 'User'}</span>
                                <span className="text-gray-300">•</span>
                                <span>{form.requestDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Approval (Active/Pending Step) */}
                    <div className="flex gap-8">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-lg ${
                            form.status === 'Approved' ? 'bg-green-500 text-white shadow-green-200' :
                            form.status === 'Rejected' ? 'bg-red-500 text-white shadow-red-200' :
                            'bg-white border-orange-200 text-orange-500 shadow-orange-100'
                        }`}>
                            {form.status === 'Approved' ? <CheckCircle2 size={20} /> : 
                             form.status === 'Rejected' ? <XCircle size={20} /> : <Clock size={20} />}
                        </div>
                        
                        <div className="pt-2 w-full">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">GA / HR APPROVAL</span>
                            <h4 className="text-[14px] font-black text-black uppercase tracking-tight">
                                {form.status === 'Approved' ? 'APPROVED' : 
                                 form.status === 'Rejected' ? 'REJECTED' : 
                                 form.status === 'Revised' ? 'NEEDS REVISION' : 'PENDING REVIEW'}
                            </h4>
                            
                            {/* Confirmation Input Box (Triggered by Footer Buttons) */}
                            {(form.status?.toLowerCase() === 'pending' || form.status?.toLowerCase().includes('waiting')) && isApprove && inlineAction.type && (
                                <div className="mt-4 animate-in fade-in slide-in-from-top-2 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                                    <div className="flex justify-between items-center mb-3">
                                        <h5 className={`text-[11px] font-black uppercase tracking-widest ${
                                            inlineAction.type === 'Approve' ? 'text-green-600' : 
                                            inlineAction.type === 'Reject' ? 'text-red-600' : 'text-blue-600'
                                        }`}>
                                            Confirm {inlineAction.type}
                                        </h5>
                                        <button onClick={() => setInlineAction({ type: null, note: '' })} className="text-gray-400 hover:text-black"><X size={14} /></button>
                                    </div>
                                    
                                    <textarea 
                                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-[12px] font-medium text-black focus:ring-2 focus:ring-black/5 outline-none resize-none mb-3"
                                        placeholder={inlineAction.type === 'Approve' ? "Tambahkan catatan (opsional)..." : "Wajib isi alasan..."}
                                        rows={2}
                                        value={inlineAction.note}
                                        onChange={(e) => setInlineAction({...inlineAction, note: e.target.value})}
                                        autoFocus
                                    />
                                    
                                    <div className="flex justify-end gap-3">
                                        <button 
                                            onClick={() => setInlineAction({ type: null, note: '' })}
                                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-500 hover:text-black"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handleInlineSubmit}
                                            disabled={(inlineAction.type === 'Reject' || inlineAction.type === 'Revise') && !inlineAction.note.trim()}
                                            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase text-white shadow-md transition-all ${
                                                (inlineAction.type === 'Reject' || inlineAction.type === 'Revise') && !inlineAction.note.trim() 
                                                ? 'bg-gray-300 cursor-not-allowed' 
                                                : inlineAction.type === 'Approve' ? 'bg-green-600 hover:bg-green-700' 
                                                : inlineAction.type === 'Reject' ? 'bg-red-600 hover:bg-red-700' 
                                                : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Status Label for non-interaction */}
                            {(form.status?.toLowerCase() === 'pending' || form.status?.toLowerCase().includes('waiting')) && !inlineAction.type && (
                                <p className="text-[11px] text-gray-400 mt-2 italic">
                                    {isApprove ? 'Please select an action from the footer.' : 'Waiting for GA approval...'}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Step 3: Assignment */}
                    <div className="flex gap-8 opacity-50">
                        <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 border-4 border-white">
                            <GitBranch size={20} />
                        </div>
                        <div className="pt-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">ASSIGNMENT</span>
                            <h4 className="text-[14px] font-black text-gray-300 uppercase tracking-tight">KEY HANDOVER & ALLOCATION</h4>
                        </div>
                    </div>
                </div>
          </div>
      </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-[#F8F9FA] w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                  <Lock size={20} strokeWidth={2.5} />
              </div>
              <div>
                  <h2 className="text-[16px] font-black text-black uppercase tracking-[0.2em] leading-none">
                    {mode === 'create' ? 'TAMBAH DATA PERMINTAAN LOKER' : 'DETAIL PERMINTAAN LOKER'}
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">FORMULIR PENGAJUAN FASILITAS LOKER</p>
              </div>
          </div>
          <div className="flex items-center gap-4">
              {(mode === 'approve' || isView) && (
                  <button 
                    onClick={() => setIsHistoryView(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest text-black transition-all shadow-sm"
                  >
                      <History size={14} /> VIEW HISTORY
                  </button>
              )}
              <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
                <X size={24} />
              </button>
          </div>
        </div>

        {/* Tabs */}
        {!isHistoryView && (
            <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8">
                {['DETAILS', 'WORKFLOW'].map(tab => (
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
        )}

        {/* Content Body */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
            {isHistoryView ? renderHistoryView() : (
                activeTab === 'DETAILS' ? renderDetails() : renderWorkflow()
            )}
        </div>

        {/* Footer */}
        {!isHistoryView && (
            <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            {isApprove ? (
                <>
                    <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                        BATAL
                    </button>
                    {(form.status?.toLowerCase() === 'pending' || form.status?.toLowerCase().includes('waiting')) && (
                        <>
                            <button 
                                onClick={() => handleFooterAction('Reject')} 
                                className="px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#EF4444] bg-white border border-[#EF4444] rounded-2xl hover:bg-[#FEF2F2] transition-all flex items-center gap-2"
                            >
                                <XCircle size={16} strokeWidth={2.5} /> REJECT
                            </button>
                            <button 
                                onClick={() => handleFooterAction('Revise')} 
                                className="px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#3B82F6] bg-white border border-[#3B82F6] rounded-2xl hover:bg-[#EFF6FF] transition-all flex items-center gap-2"
                            >
                                <RotateCcw size={16} strokeWidth={2.5} /> REVISE
                            </button>
                            <button 
                                onClick={() => handleFooterAction('Approve')} 
                                className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all flex items-center gap-2 active:scale-95"
                            >
                                <CheckCircle2 size={16} strokeWidth={2.5} /> APPROVE
                            </button>
                        </>
                    )}
                    {(form.status?.toLowerCase() !== 'pending' && !form.status?.toLowerCase().includes('waiting')) && (
                         <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-black bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                            CLOSE
                         </button>
                    )}
                </>
            ) : (
                <>
                    <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                    BATAL
                    </button>
                    {!isView && (
                        <button 
                            onClick={() => onSave(form)} 
                            className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
                        >
                            <Save size={18} strokeWidth={2.5} /> SIMPAN PERMINTAAN
                        </button>
                    )}
                </>
            )}
            </div>
        )}
      </div>
    </div>
  );
};
