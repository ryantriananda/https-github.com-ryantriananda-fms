
import React, { useState, useEffect, useMemo } from 'react';
import { X, Save, List, Calendar, CheckCircle, FileText, User, Package, MapPin, History, Check, XCircle, Clock, Users, MessageSquare, Send, Trash2, ChevronDown, Plus, RotateCcw, Edit3, Layers, Mail, Smartphone, CreditCard, Baby, Minus, CheckCircle2, GitBranch, Shield, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { VehicleRecord, LogBookRecord, AssetRecord, StationeryRequestRecord, StationeryRequestItem, MasterPodRecord, MasterLockerRecord } from '../types';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA, MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_UOM_DATA, MOCK_REQUEST_TYPES } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  moduleName?: string;
  onSaveStationeryRequest?: (request: Partial<StationeryRequestRecord>) => void;
  onSaveLogBook?: (logbook: Partial<LogBookRecord>) => void;
  initialAssetData?: AssetRecord;
  initialLogBookData?: LogBookRecord;
  mode?: 'create' | 'edit' | 'view' | 'approve';
  onSavePod?: (data: Partial<MasterPodRecord>) => void;
  onSaveMasterLocker?: (data: Partial<MasterLockerRecord>) => void;
  currentUser?: any;
  onApprove?: () => void;
  onReject?: () => void;
}

export const AddStockModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, // Generic save
    moduleName = 'ATK', 
    onSaveStationeryRequest,
    onSaveLogBook,
    onSavePod,
    onSaveMasterLocker,
    initialAssetData,
    initialLogBookData,
    mode = 'create',
    currentUser,
    onApprove,
    onReject
}) => {
  // ATK / ARK State
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [isHistoryView, setIsHistoryView] = useState(false); // Controls the History View

  // Inline Workflow Action State
  const [inlineAction, setInlineAction] = useState<{ type: 'Approve' | 'Reject' | 'Revise' | null, note: string }>({ type: null, note: '' });

  const [stationeryRequestForm, setStationeryRequestForm] = useState<Partial<StationeryRequestRecord>>({
      type: 'DAILY REQUEST',
      deliveryType: 'PICKUP HO',
      location: 'MODENA Head Office',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
  });
  const [requestItems, setRequestItems] = useState<StationeryRequestItem[]>([{ itemId: '', qty: '', categoryId: '', uom: '-' }]);
  
  // State to toggle editing in Approval Mode
  const [isEditing, setIsEditing] = useState(false);

  // LogBook State
  const [logBookForm, setLogBookForm] = useState<Partial<LogBookRecord>>({
      tanggalKunjungan: new Date().toISOString().split('T')[0],
      jamDatang: '09:00',
      jamPulang: '',
      lokasiModena: 'SATRIO',
      kategoriTamu: 'CUSTOMER',
      countAdult: 0,
      countIndividual: 1,
      countChild: 0,
      namaTamu: '',
      email: '',
      phone: '',
      identityCardNumber: '',
      visitorCardNumber: '',
      note: '',
      lakiLaki: 0,
      wanita: 0,
      anakAnak: 0
  });

  const isArkModule = moduleName.includes('ARK') || moduleName.includes('Household');
  const isLogBook = moduleName === 'Log Book';
  const isViewMode = mode === 'view' || mode === 'approve';
  const isApprove = mode === 'approve';
  
  // Determine if form fields should be disabled
  const isFormDisabled = mode === 'view' || (mode === 'approve' && !isEditing);
  
  // Design Specific Check: Is this the ATK/ARK Request Modal?
  const isRequestModal = !isLogBook && !moduleName.includes('Pod') && !moduleName.includes('Loker');

  // Master Data Selection based on Module
  const categoryList = isArkModule ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY;
  const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;

  useEffect(() => {
    if (isOpen) {
      setIsEditing(false);
      setActiveTab('DETAILS');
      setIsHistoryView(false);
      setInlineAction({ type: null, note: '' }); // Reset inline action

      if (isLogBook) {
          if (initialLogBookData && mode !== 'create') {
              setLogBookForm(initialLogBookData);
          } else {
              setLogBookForm({
                  tanggalKunjungan: new Date().toISOString().split('T')[0],
                  jamDatang: '09:00',
                  jamPulang: '',
                  lokasiModena: 'SATRIO',
                  kategoriTamu: 'CUSTOMER',
                  countAdult: 0,
                  countIndividual: 1,
                  countChild: 0,
                  namaTamu: '',
                  email: '',
                  phone: '',
                  identityCardNumber: '',
                  visitorCardNumber: '',
                  note: '',
                  lakiLaki: 0,
                  wanita: 0,
                  anakAnak: 0
              });
          }
      } else {
          // ATK/ARK Logic
          if ((mode === 'view' || mode === 'approve') && initialAssetData) {
              setStationeryRequestForm({
                  type: 'DAILY REQUEST',
                  date: initialAssetData.date,
                  remarks: initialAssetData.itemDescription || 'Permintaan rutin operasional.',
                  deliveryType: 'PICKUP HO',
                  location: 'MODENA Head Office',
                  status: initialAssetData.status
              });
              // Map initial data to item list (Mock mapping)
              setRequestItems([{ 
                  itemId: initialAssetData.id.toString(), 
                  qty: initialAssetData.qty.toString(), 
                  categoryId: initialAssetData.category, 
                  uom: initialAssetData.uom || '-' 
              }]);
          } else {
              setStationeryRequestForm({ 
                  type: 'DAILY REQUEST', 
                  deliveryType: 'PICKUP HO', 
                  location: 'MODENA Head Office', 
                  date: new Date().toISOString().split('T')[0],
                  remarks: '',
                  status: 'Pending'
              });
              setRequestItems([{ itemId: '', qty: '', categoryId: '', uom: '-' }]);
          }
      }
    }
  }, [isOpen, initialAssetData, initialLogBookData, mode, isLogBook, moduleName]);

  const handleSave = () => {
      if (isLogBook && onSaveLogBook) {
          onSaveLogBook(logBookForm);
      } else if (onSavePod && moduleName.includes('Pod')) {
          onSavePod({});
      } else if (onSaveMasterLocker && moduleName.includes('Loker')) {
          onSaveMasterLocker({});
      } else if (onSaveStationeryRequest) {
          onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      }
      onClose(); // Ensure modal closes
  }
  
  // Handler for Inline Workflow Submit
  const handleInlineSubmit = () => {
      const { type, note } = inlineAction;
      if (!type) return;

      const newStatus = type === 'Approve' ? 'Approved' : type === 'Reject' ? 'Rejected' : 'Revised';
      
      setStationeryRequestForm(prev => ({ ...prev, status: newStatus }));
      
      if (onSaveStationeryRequest) {
          onSaveStationeryRequest({ 
              ...stationeryRequestForm, 
              status: newStatus, 
              items: requestItems,
              // Append note to remarks for demo purposes
              remarks: note ? `${stationeryRequestForm.remarks || ''} \n[${type} Note]: ${note}` : stationeryRequestForm.remarks 
          });
      }
      onClose();
  };

  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => setStationeryRequestForm(prev => ({ ...prev, [field]: value }));

  const handleRequestItemChange = (index: number, field: keyof StationeryRequestItem, value: string) => {
      const newItems = [...requestItems];
      if (field === 'categoryId') {
          newItems[index] = { ...newItems[index], categoryId: value, itemId: '', uom: '-' };
      } else if (field === 'itemId') {
          const product = masterList.find(m => m.id.toString() === value);
          newItems[index] = { 
              ...newItems[index], 
              itemId: value, 
              uom: product?.uom || '-',
              categoryId: product?.category || newItems[index].categoryId
          };
      } else {
          newItems[index] = { ...newItems[index], [field]: value };
      }
      setRequestItems(newItems);
  }

  const addRequestItemRow = () => setRequestItems([...requestItems, { itemId: '', qty: '', categoryId: '', uom: '-' }]);
  const removeRequestItemRow = (index: number) => { if (requestItems.length > 1) setRequestItems(requestItems.filter((_, i) => i !== index)); }

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon size={18} className="text-black" />
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 ml-1">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const InputField = ({ label, value, onChange, type = "text", placeholder, className, disabled, icon: Icon }: any) => (
      <div className={className}>
          <Label>{label}</Label>
          <div className="relative">
            <input 
                type={type} 
                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 shadow-sm uppercase transition-all"
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled || isViewMode}
            />
            {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
          </div>
      </div>
  );

  // --- RENDER USER HISTORY VIEW ---
  const renderHistoryView = () => {
      const requesterName = initialAssetData?.employee?.name || currentUser?.name || 'User';
      
      const userHistoryLogs = [
          { id: 'REQ-1092', date: '2023-10-20', items: 'Kertas A4 (5), Pulpen (10)', status: 'Approved', note: 'Monthly supply' },
          { id: 'REQ-1085', date: '2023-09-15', items: 'Tinta Printer (2)', status: 'Rejected', note: 'Over budget limit' },
          { id: 'REQ-1040', date: '2023-08-01', items: 'Map Folder (50), Staples (5)', status: 'Approved', note: 'Event preparation' },
          { id: 'REQ-0992', date: '2023-07-10', items: 'Kertas A3 (2)', status: 'Approved', note: 'Design team request' },
      ];

      return (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300 p-8 h-full bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 shrink-0">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
                          <History size={24} />
                      </div>
                      <div>
                          <h3 className="text-[16px] font-black text-black uppercase tracking-tight">Riwayat Permintaan User</h3>
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                            Requester: <span className="text-black">{requesterName}</span>
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
                    {userHistoryLogs.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-gray-300 bg-gray-50/50 hover:bg-white transition-all group cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-xl border border-gray-200 shadow-sm text-[10px] font-black text-gray-400 group-hover:border-blue-200 group-hover:text-blue-500 transition-colors">
                                    <span className="uppercase">{new Date(item.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-[16px] text-black group-hover:text-blue-600">{new Date(item.date).getDate()}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="text-[13px] font-black text-black uppercase tracking-tight">{item.id}</div>
                                        {item.note && <span className="text-[10px] text-gray-400 italic font-medium truncate max-w-[200px]">- {item.note}</span>}
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                                        <Package size={12} /> {item.items}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                    item.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 
                                    item.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}>
                                    {item.status}
                                </span>
                                <ChevronDown size={16} className="-rotate-90 text-gray-300 group-hover:text-black transition-colors" />
                            </div>
                        </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                      <p className="text-[10px] text-gray-400 font-medium italic">Menampilkan 4 transaksi terakhir</p>
                  </div>
              </div>
          </div>
      );
  };

  // --- RENDER LOGBOOK FORM ---
  const renderLogBookForm = () => (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full flex flex-col">
                  <SectionHeader icon={User} title="GUEST DETAILS" />
                  <div className="space-y-6">
                        <InputField label="NAMA TAMU" placeholder="Nama Lengkap..." value={logBookForm.namaTamu} onChange={(e: any) => setLogBookForm({...logBookForm, namaTamu: e.target.value})} icon={User} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="EMAIL" placeholder="email@example.com" value={logBookForm.email} onChange={(e: any) => setLogBookForm({...logBookForm, email: e.target.value})} icon={Mail} />
                            <InputField label="NOMOR HP" placeholder="0812..." value={logBookForm.phone} onChange={(e: any) => setLogBookForm({...logBookForm, phone: e.target.value})} icon={Smartphone} />
                        </div>
                        <div>
                            <Label>KATEGORI TAMU</Label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer uppercase shadow-sm"
                                    value={logBookForm.kategoriTamu}
                                    onChange={(e) => setLogBookForm({...logBookForm, kategoriTamu: e.target.value})}
                                    disabled={isViewMode}
                                >
                                    <option value="CUSTOMER">CUSTOMER</option>
                                    <option value="SUPPLIER">SUPPLIER</option>
                                    <option value="INTERNAL">INTERNAL</option>
                                    <option value="CONTRACTOR">CONTRACTOR</option>
                                    <option value="INTERVIEWEE">INTERVIEWEE</option>
                                    <option value="OTHERS">OTHERS</option>
                                    <option value="VENDOR">VENDOR</option>
                                </select>
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                  </div>
              </div>
              <div className="flex flex-col gap-6">
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                      <SectionHeader icon={Shield} title="IDENTITY & ACCESS" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="NO. KTP/SIM/PASSPORT" placeholder="3201..." value={logBookForm.identityCardNumber} onChange={(e: any) => setLogBookForm({...logBookForm, identityCardNumber: e.target.value})} icon={CreditCard} />
                           <InputField label="NO. VISITOR CARD" placeholder="VC-001" value={logBookForm.visitorCardNumber} onChange={(e: any) => setLogBookForm({...logBookForm, visitorCardNumber: e.target.value})} icon={CreditCard} />
                      </div>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex-1">
                      <SectionHeader icon={MapPin} title="VISIT DETAILS" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                              <Label>LOKASI MODENA</Label>
                              <div className="relative">
                                <select className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[13px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer uppercase shadow-sm" value={logBookForm.lokasiModena} onChange={(e) => setLogBookForm({...logBookForm, lokasiModena: e.target.value})} disabled={isViewMode}>
                                    <option value="SATRIO">SATRIO</option>
                                    <option value="SURYOPRANOTO">SURYOPRANOTO</option>
                                    <option value="WAREHOUSE">WAREHOUSE</option>
                                    <option value="KEMANG">KEMANG</option>
                                    <option value="SURYO">SURYO</option>
                                </select>
                                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              </div>
                          </div>
                          <InputField label="TANGGAL" type="date" value={logBookForm.tanggalKunjungan} onChange={(e: any) => setLogBookForm({...logBookForm, tanggalKunjungan: e.target.value})} icon={Calendar} />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                          <InputField label="TIME LOG IN" type="time" value={logBookForm.jamDatang} onChange={(e: any) => setLogBookForm({...logBookForm, jamDatang: e.target.value})} icon={Clock} />
                          <InputField label="TIME LOG OUT" type="time" value={logBookForm.jamPulang} onChange={(e: any) => setLogBookForm({...logBookForm, jamPulang: e.target.value})} icon={Clock} placeholder="--:--" />
                      </div>
                  </div>
              </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <SectionHeader icon={Users} title="BREAKDOWN VISITOR" />
              <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 mb-3 shadow-sm border border-pink-100"><Users size={20} /></div>
                      <Label>GROUP / ADULT</Label>
                      <input type="number" className="w-24 text-center bg-[#F8F9FA] border-none rounded-xl py-3 text-[16px] font-black text-black outline-none focus:ring-2 focus:ring-black/5" value={logBookForm.countAdult} onChange={(e) => setLogBookForm({...logBookForm, countAdult: parseInt(e.target.value) || 0})} disabled={isViewMode} />
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-3 shadow-sm border border-blue-100"><CheckCircle2 size={20} /></div>
                      <Label>INDIVIDUAL</Label>
                      <input type="number" className="w-24 text-center bg-[#F8F9FA] border-none rounded-xl py-3 text-[16px] font-black text-black outline-none focus:ring-2 focus:ring-black/5" value={logBookForm.countIndividual} onChange={(e) => setLogBookForm({...logBookForm, countIndividual: parseInt(e.target.value) || 0})} disabled={isViewMode} />
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-3 shadow-sm border border-orange-100"><Baby size={20} /></div>
                      <Label>CHILD / OTHER</Label>
                      <input type="number" className="w-24 text-center bg-[#F8F9FA] border-none rounded-xl py-3 text-[16px] font-black text-black outline-none focus:ring-2 focus:ring-black/5" value={logBookForm.countChild} onChange={(e) => setLogBookForm({...logBookForm, countChild: parseInt(e.target.value) || 0})} disabled={isViewMode} />
                  </div>
              </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <SectionHeader icon={MessageSquare} title="CATATAN / NOTES" />
              <textarea className="w-full bg-[#F8F9FA] border-none rounded-2xl px-6 py-5 text-[13px] font-medium text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 resize-none transition-all shadow-inner italic" rows={3} placeholder="Tulis catatan kunjungan di sini..." value={logBookForm.note} onChange={(e: any) => setLogBookForm({...logBookForm, note: e.target.value})} disabled={isViewMode} />
          </div>
      </div>
  );

  const renderMasterForm = () => <div className="p-8"><p>Master Form Placeholder</p></div>;

  // --- RENDER REQUEST FORM ---
  const renderRequestForm = () => (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          {/* Top Row: App Info & Requester Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full">
                  <SectionHeader icon={Send} title="APPLICATION INFO" />
                  <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">REQUEST DATE</label>
                          <input 
                              type="text" 
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none shadow-sm"
                              value={stationeryRequestForm.date}
                              onChange={(e) => handleStationeryRequestChange('date', e.target.value)}
                              disabled={isFormDisabled}
                          />
                      </div>
                      <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">REQUEST TYPE</label>
                          <div className="relative">
                            <select 
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none shadow-sm appearance-none cursor-pointer"
                                value={stationeryRequestForm.type}
                                onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                                disabled={isFormDisabled}
                            >
                                <option value="">Select Type...</option>
                                {MOCK_REQUEST_TYPES.map((type) => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                      </div>
                  </div>
                  <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">DELIVERY METHOD</label>
                      <button 
                        className="w-full bg-black text-white py-4 rounded-xl text-[12px] font-black uppercase tracking-widest shadow-lg shadow-black/20"
                        disabled={isFormDisabled}
                      >
                          {stationeryRequestForm.deliveryType || 'PICKUP HO'}
                      </button>
                  </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full flex flex-col">
                  <SectionHeader icon={User} title="REQUESTER INFO" />
                  <div className="flex-1 flex flex-col justify-center">
                      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center gap-6 shadow-sm">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                              <img 
                                src={isViewMode && initialAssetData?.employee?.avatar ? initialAssetData.employee.avatar : currentUser?.avatar || "https://ui-avatars.com/api/?name=Current+User&background=random"} 
                                alt="User" 
                                className="w-full h-full object-cover"
                              />
                          </div>
                          <div>
                              <h3 className="text-[20px] font-black text-black uppercase tracking-tight">
                                {isViewMode && initialAssetData?.employee?.name ? initialAssetData.employee.name : currentUser?.name || 'CURRENT USER'}
                              </h3>
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                {isViewMode && initialAssetData?.employee?.role ? initialAssetData.employee.role : currentUser?.role || 'STAFF'}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Middle: Requested Items */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <SectionHeader icon={Package} title="REQUESTED ITEMS" />
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
                  <table className="w-full text-left">
                      <thead>
                          <tr className="bg-[#F8F9FA] border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              <th className="p-5 pl-8 w-40">KATEGORI</th>
                              <th className="p-5 w-64">ITEM NAME</th>
                              <th className="p-5 w-32">ITEM CODE</th>
                              <th className="p-5 text-center w-32 bg-blue-50/30 text-blue-600">IN STOCK</th>
                              <th className="p-5 text-center w-24">QTY</th>
                              <th className="p-5 text-center w-24">UOM</th>
                              {!isFormDisabled && <th className="p-5 w-12 text-center"></th>}
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                          {requestItems.map((item, idx) => {
                              const selectedProduct = masterList.find(m => m.id.toString() === item.itemId);
                              const filteredItems = item.categoryId ? masterList.filter(m => m.category === item.categoryId) : masterList;
                              
                              let displayCategory = item.categoryId || selectedProduct?.category;
                              let displayItemName = selectedProduct?.itemName;
                              let displayItemCode = selectedProduct?.itemCode;
                              
                              // Logic for stock
                              const inStock = selectedProduct ? selectedProduct.inStock : 0;
                              
                              if (isViewMode && !selectedProduct && initialAssetData) {
                                  displayCategory = initialAssetData.category;
                                  displayItemName = initialAssetData.itemName;
                                  displayItemCode = initialAssetData.itemCode || '-';
                              }

                              return (
                                  <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                      <td className="p-5 pl-8">
                                          {isFormDisabled ? (
                                              <span className="text-[12px] font-black text-black uppercase">{displayCategory || '-'}</span>
                                          ) : (
                                              <div className="relative">
                                                  <select 
                                                      className="w-full bg-transparent border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-bold text-black outline-none appearance-none cursor-pointer focus:border-black uppercase focus:ring-0"
                                                      value={item.categoryId}
                                                      onChange={(e) => handleRequestItemChange(idx, 'categoryId', e.target.value)}
                                                  >
                                                      <option value="">Select...</option>
                                                      {categoryList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                                  </select>
                                                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                              </div>
                                          )}
                                      </td>
                                      <td className="p-5">
                                          {isFormDisabled ? (
                                              <span className="text-[12px] font-black text-black uppercase">{displayItemName}</span>
                                          ) : (
                                              <div className="relative">
                                                  <select 
                                                      className="w-full bg-transparent border-none text-[12px] font-bold text-black outline-none appearance-none cursor-pointer p-0 focus:ring-0"
                                                      value={item.itemId}
                                                      onChange={(e) => handleRequestItemChange(idx, 'itemId', e.target.value)}
                                                  >
                                                      <option value="">Select Item...</option>
                                                      {filteredItems.map(m => <option key={m.id} value={m.id}>{m.itemName}</option>)}
                                                  </select>
                                              </div>
                                          )}
                                      </td>
                                      <td className="p-5"><span className="text-[12px] font-mono font-bold text-blue-600">{displayItemCode || '-'}</span></td>
                                      
                                      {/* IN STOCK COLUMN */}
                                      <td className="p-5 text-center bg-blue-50/10">
                                         {selectedProduct ? (
                                             <div className={`py-1 px-2 rounded-lg text-[11px] font-black border ${inStock > 0 ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-red-500 bg-red-50 border-red-100'}`}>
                                                 {inStock} {item.uom}
                                             </div>
                                         ) : (
                                             <span className="text-gray-300 font-bold">-</span>
                                         )}
                                      </td>
                                      
                                      <td className="p-5 text-center">
                                          {isFormDisabled ? (
                                              <div className="w-16 mx-auto border border-gray-200 rounded-lg px-2 py-1.5 text-[14px] font-black text-center bg-white shadow-sm">
                                                  {isViewMode && initialAssetData ? initialAssetData.qty : item.qty}
                                              </div>
                                          ) : (
                                              <input 
                                                  type="number"
                                                  className={`w-20 border rounded-lg px-3 py-2 text-[12px] font-black text-center outline-none focus:border-black ${isEditing ? 'border-yellow-400 bg-yellow-50 text-black' : 'border-gray-200'}`}
                                                  value={item.qty}
                                                  onChange={(e) => handleRequestItemChange(idx, 'qty', e.target.value)}
                                                  min="1"
                                              />
                                          )}
                                      </td>
                                      <td className="p-5 text-center"><span className="text-[12px] font-bold text-gray-500 uppercase">{item.uom || '-'}</span></td>
                                      {!isFormDisabled && (
                                          <td className="p-5 text-center">
                                              <button onClick={() => removeRequestItemRow(idx)} className="text-gray-200 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                          </td>
                                      )}
                                  </tr>
                              )
                          })}
                      </tbody>
                  </table>
              </div>
              {!isFormDisabled && (
                  <button onClick={addRequestItemRow} className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest flex items-center gap-2 transition-colors">
                      <Plus size={14} strokeWidth={3} /> ADD MORE ITEM
                  </button>
              )}
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <SectionHeader icon={MessageSquare} title="KETERANGAN / REMARKS" />
              <textarea 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-[13px] font-medium text-black outline-none focus:border-black placeholder:text-gray-300 resize-none transition-all shadow-sm"
                  rows={3}
                  placeholder="Tulis catatan tambahan di sini..."
                  value={stationeryRequestForm.remarks}
                  onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)}
                  disabled={isFormDisabled}
              />
          </div>
      </div>
  );

  // --- RENDER WORKFLOW ---
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
                            <h4 className="text-[14px] font-black text-black uppercase tracking-tight">SUBMITTED</h4>
                            <div className="flex items-center gap-2 mt-1.5 text-[11px] font-medium text-gray-500">
                                <User size={12} />
                                <span>{isViewMode && initialAssetData?.employee?.name ? initialAssetData.employee.name : currentUser?.name || 'System Admin'}</span>
                                <span className="text-gray-300">•</span>
                                <span>{stationeryRequestForm.date}</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: GA Approval (Active/Pending Step) */}
                    <div className="flex gap-8">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-lg ${
                            stationeryRequestForm.status === 'Approved' ? 'bg-green-500 text-white shadow-green-200' :
                            stationeryRequestForm.status === 'Rejected' ? 'bg-red-500 text-white shadow-red-200' :
                            'bg-white border-orange-200 text-orange-500 shadow-orange-100'
                        }`}>
                            {stationeryRequestForm.status === 'Approved' ? <CheckCircle2 size={20} /> : 
                             stationeryRequestForm.status === 'Rejected' ? <XCircle size={20} /> : <Clock size={20} />}
                        </div>
                        
                        <div className="pt-2 w-full">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">GENERAL AFFAIR</span>
                            <h4 className="text-[14px] font-black text-black uppercase tracking-tight">
                                {stationeryRequestForm.status === 'Approved' ? 'APPROVED' : 
                                 stationeryRequestForm.status === 'Rejected' ? 'REJECTED' : 
                                 stationeryRequestForm.status === 'Revised' ? 'NEEDS REVISION' : 'PENDING REVIEW'}
                            </h4>
                            
                            {/* Inline Actions for Approval - REPLACED POPUP LOGIC WITH INLINE ACCORDION */}
                            {(stationeryRequestForm.status === 'Pending' || stationeryRequestForm.status === 'Waiting Approval') && isApprove && (
                                <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                                    {!inlineAction.type ? (
                                        <div className="flex flex-wrap gap-3">
                                            <button 
                                                onClick={() => setInlineAction({ type: 'Approve', note: '' })}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-xl shadow-lg shadow-green-200 hover:bg-green-600 transition-all active:scale-95"
                                            >
                                                <Check size={14} strokeWidth={3} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">APPROVE</span>
                                            </button>
                                            <button 
                                                onClick={() => setInlineAction({ type: 'Revise', note: '' })}
                                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-lg bg-blue-500 text-white shadow-blue-200 hover:bg-blue-600 transition-all active:scale-95"
                                            >
                                                <RotateCcw size={14} strokeWidth={3} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">REVISE</span>
                                            </button>
                                            <button 
                                                onClick={() => setInlineAction({ type: 'Reject', note: '' })}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-95"
                                            >
                                                <XCircle size={14} strokeWidth={3} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">REJECT</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 animate-in slide-in-from-top-2">
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
                                </div>
                            )}

                            {/* Status Label for Non-Approvers */}
                            {(stationeryRequestForm.status === 'Pending' || stationeryRequestForm.status === 'Waiting Approval') && !isApprove && (
                                <div className="mt-4">
                                    <p className="text-[11px] text-orange-500 font-bold bg-orange-50 px-3 py-2 rounded-lg border border-orange-100 inline-block">
                                        Waiting for GA approval...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step 3: Fulfillment */}
                    <div className="flex gap-8 opacity-50">
                        <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 border-4 border-white">
                            <GitBranch size={20} />
                        </div>
                        <div className="pt-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">PROCUREMENT / STORE</span>
                            <h4 className="text-[14px] font-black text-gray-300 uppercase tracking-tight">FULFILLMENT QUEUED</h4>
                        </div>
                    </div>
                </div>
          </div>
      </div>
  );

  if (!isOpen) return null;

  let modalTitle = '';
  if (isLogBook) modalTitle = isViewMode ? 'LOG BOOK ENTRY DETAILS' : 'CREATE LOG BOOK ENTRY';
  else if (moduleName.includes('Pod')) modalTitle = 'ADD MASTER POD';
  else if (moduleName.includes('Loker')) modalTitle = 'ADD MASTER LOCKER';
  else if (isArkModule) modalTitle = isViewMode ? 'HOUSEHOLD REQUEST DETAILS' : 'CREATE HOUSEHOLD REQUEST';
  else modalTitle = isViewMode ? 'STATIONERY REQUEST DETAILS' : 'CREATE STATIONERY REQUEST';

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className={`bg-[#F8F9FA] w-full ${isLogBook || isViewMode ? 'max-w-6xl' : 'max-w-5xl'} rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]`}>
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
              {isLogBook && (
                  <div className="w-12 h-12 bg-black rounded-[1rem] flex items-center justify-center text-white shadow-xl shadow-black/20">
                      <Users size={22} strokeWidth={2.5} />
                  </div>
              )}
              <h2 className="text-[16px] font-black text-black uppercase tracking-[0.2em] leading-none">
                {modalTitle}
              </h2>
          </div>
          <div className="flex items-center gap-4">
              {(mode === 'approve' || isViewMode) && isRequestModal && (
                  <button 
                    onClick={() => setIsHistoryView(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest text-black transition-all shadow-sm"
                  >
                      <History size={14} /> VIEW HISTORY
                  </button>
              )}
              <button className="text-gray-300 hover:text-black transition-all p-1" onClick={onClose}>
                <X size={24} />
              </button>
          </div>
        </div>
        
        {/* Tabs for Request Modal (Hide for LogBook) */}
        {!isLogBook && !moduleName.includes('Pod') && !moduleName.includes('Loker') && !isHistoryView && (
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
            {isHistoryView ? renderHistoryView() : (
                <>
                    {isLogBook ? renderLogBookForm() : 
                     (moduleName.includes('Pod') || moduleName.includes('Loker')) ? renderMasterForm() :
                     activeTab === 'WORKFLOW' ? renderWorkflow() : renderRequestForm()
                    }
                </>
            )}
        </div>

        {/* Footer (Hide in History Mode) */}
        {!isHistoryView && (
            <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                {mode === 'approve' ? (
                    <>
                        <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-black bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                            CLOSE
                        </button>
                    </>
                ) : isViewMode ? (
                    <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 transition-all shadow-xl shadow-black/20">
                        TUTUP
                    </button>
                ) : (
                    <>
                        <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">
                            BATAL
                        </button>
                        {!isLogBook && (
                            <button className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">
                                SAVE DRAFT
                            </button>
                        )}
                        <button onClick={handleSave} className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2">
                            {isLogBook ? <Save size={16} strokeWidth={2.5} /> : null} SIMPAN DATA
                        </button>
                    </>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
