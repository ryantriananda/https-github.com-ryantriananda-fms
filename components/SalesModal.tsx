
import React, { useState, useEffect } from 'react';
import { X, Save, DollarSign, Car, Tag, TrendingUp, User, Clock, AlertCircle, Mail, Link, Copy, Check, ShieldCheck, ChevronRight, Trophy, Users, Phone, CreditCard, Info, Hash, Calendar as CalendarIcon, FileText, Package, Filter, Image, ChevronLeft, Download, Eye, Fuel, Gauge, Settings, MapPin, Camera, File, Shield, Maximize2, ZoomIn } from 'lucide-react';
import { SalesRecord, VehicleRecord, BidRecord, BidderRegistration, GeneralAssetRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<SalesRecord>) => void;
  initialData?: SalesRecord | null;
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
  generalAssetList?: any[]; // Supports both GeneralAssetRecord and BuildingAssetRecord
  assetType?: 'VEHICLE' | 'GENERAL_ASSET';
}

export const SalesModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    vehicleList = [],
    generalAssetList = [],
    assetType = 'VEHICLE'
}) => {
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // New Filter State

  const [form, setForm] = useState<Partial<SalesRecord>>({
    status: 'Open Bidding',
    statusApproval: 'Pending',
    tglRequest: new Date().toISOString().split('T')[0],
    hargaTertinggi: '0',
    hargaPembuka: '0',
    bids: [],
    assetType: assetType
  });

  // State for Bidding Logic
  const [newBidAmount, setNewBidAmount] = useState('');
  const [bidError, setBidError] = useState('');
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  // State for Registration Logic & View State
  const [isRegistered, setIsRegistered] = useState(false);
  const [viewState, setViewState] = useState<'idle' | 'registering' | 'bidding'>('idle');
  const [regForm, setRegForm] = useState<BidderRegistration>({
      name: '',
      ktp: '',
      phone: '',
      email: '',
      agreedToTerms: false
  });

  // State for Bidder Detail Popup
  const [selectedBidder, setSelectedBidder] = useState<BidRecord | null>(null);

  // NEW: State for Live Bidding Asset Detail
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [assetDetailTab, setAssetDetailTab] = useState<'images' | 'documents' | 'specs'>('images');
  const [showImageModal, setShowImageModal] = useState(false);

  // Mock Vehicle Images (in real app, these would come from vehicle data)
  const getVehicleImages = (vehicle: VehicleRecord | null) => {
    if (!vehicle) return [];
    // Default placeholder images if none exist
    return vehicle.images || [
      { id: '1', url: `https://source.unsplash.com/featured/800x600/?${vehicle.merek?.toLowerCase() || 'car'},suv`, type: 'Exterior Front', caption: 'Tampak Depan' },
      { id: '2', url: `https://source.unsplash.com/featured/800x600/?car,interior`, type: 'Interior', caption: 'Interior Dashboard' },
      { id: '3', url: `https://source.unsplash.com/featured/800x600/?car,side`, type: 'Exterior Side', caption: 'Tampak Samping' },
      { id: '4', url: `https://source.unsplash.com/featured/800x600/?car,rear`, type: 'Exterior Rear', caption: 'Tampak Belakang' },
      { id: '5', url: `https://source.unsplash.com/featured/800x600/?engine,car`, type: 'Engine', caption: 'Ruang Mesin' },
    ];
  };

  // Mock Vehicle Documents
  const getVehicleDocuments = (vehicle: VehicleRecord | null) => {
    if (!vehicle) return [];
    return [
      { id: 'bpkb', name: 'BPKB', number: vehicle.noBpkb || '-', status: 'Valid', expiry: '-', icon: FileText },
      { id: 'stnk', name: 'STNK', number: vehicle.noStnk || '-', status: vehicle.masaBerlaku1 ? 'Valid' : 'Expired', expiry: vehicle.masaBerlaku1 || '-', icon: FileText },
      { id: 'kir', name: 'KIR', number: vehicle.noKir || '-', status: vehicle.masaBerlakuKir ? 'Valid' : 'N/A', expiry: vehicle.masaBerlakuKir || '-', icon: Shield },
      { id: 'faktur', name: 'Faktur Pembelian', number: '-', status: 'Available', expiry: '-', icon: File },
      { id: 'insurance', name: 'Asuransi', number: '-', status: 'Check', expiry: '-', icon: Shield },
    ];
  };

  // Get full vehicle/asset details based on selection
  const selectedVehicle = assetType === 'VEHICLE' ? vehicleList.find(v => v.noPolisi === form.noPolisi) : null;
  const selectedGeneralAsset = assetType === 'GENERAL_ASSET' 
    ? generalAssetList.find(a => (a.assetNumber === form.assetNumber) || (a.assetCode === form.assetNumber)) 
    : null;

  // Filter Logic
  const filteredGeneralAssets = generalAssetList.filter(asset => {
      if (categoryFilter === 'ALL') return true;
      return asset.sourceCategory === categoryFilter;
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
        if (!initialData.bids) setForm(prev => ({ ...prev, bids: [] }));
      } else {
        setForm({
            status: 'Open Bidding',
            statusApproval: 'Pending',
            tglRequest: new Date().toISOString().split('T')[0],
            hargaTertinggi: '0',
            hargaPembuka: '0',
            noPolisi: '',
            assetNumber: '',
            channel: '',
            cabang: '',
            bids: [],
            assetType: assetType
        });
        setCategoryFilter('ALL'); // Reset filter
      }
      setActiveTab('DETAILS');
      setNewBidAmount('');
      setBidError('');
      setIsLinkCopied(false);
      setIsRegistered(false);
      setViewState('idle');
      setRegForm({ name: '', ktp: '', phone: '', email: '', agreedToTerms: false });
      setSelectedBidder(null);
    }
  }, [isOpen, initialData, assetType]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isOpenBidding = form.status === 'Open Bid' || form.status === 'Open Bidding';

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedNoPol = e.target.value;
      const vehicle = vehicleList.find(v => v.noPolisi === selectedNoPol);
      if (vehicle) {
          setForm(prev => ({
              ...prev,
              noPolisi: vehicle.noPolisi,
              channel: vehicle.channel,
              cabang: vehicle.cabang
          }));
      } else {
          setForm(prev => ({ ...prev, noPolisi: selectedNoPol, channel: '', cabang: '' }));
      }
  };

  const handleGeneralAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = e.target.value;
      const asset = generalAssetList.find(a => a.id === selectedId || a.assetNumber === selectedId || a.assetCode === selectedId);
      
      if (asset) {
          const assetNumber = asset.assetNumber || asset.assetCode;
          const assetName = asset.assetName || asset.type;
          // Use buildingName/location logic
          const location = asset.assetLocation || asset.buildingName;
          
          setForm(prev => ({
              ...prev,
              assetNumber: assetNumber,
              assetName: assetName,
              channel: asset.channel || 'Direct',
              cabang: location, 
          }));
      } else {
          setForm(prev => ({ ...prev, assetNumber: selectedId, channel: '', cabang: '' }));
      }
  };

  const handleRegister = () => {
      if (!regForm.name || !regForm.ktp || !regForm.phone || !regForm.email || !regForm.agreedToTerms) {
          setBidError('Harap lengkapi semua data formulir registrasi.');
          return;
      }
      setIsRegistered(true);
      setViewState('bidding');
      setBidError('');
  };

  const handlePlaceBid = () => {
      if (!isRegistered) {
          setViewState('registering');
          return;
      }

      const amount = parseInt(newBidAmount.replace(/[^0-9]/g, '') || '0');
      const currentHighest = parseInt((form.hargaTertinggi || '0').replace(/[^0-9]/g, '') || '0');
      const openingPrice = parseInt((form.hargaPembuka || '0').replace(/[^0-9]/g, '') || '0');

      if (amount <= openingPrice) {
          setBidError('Penawaran harus lebih tinggi dari harga pembuka.');
          return;
      }

      if (amount <= currentHighest) {
          setBidError('Penawaran harus lebih tinggi dari penawaran tertinggi saat ini.');
          return;
      }

      const newBid: BidRecord = {
          id: Date.now().toString(),
          amount: amount.toString(),
          bidderName: regForm.name || 'Current User', 
          bidderRole: regForm.name ? 'External Participant' : 'Internal Staff',
          bidderEmail: regForm.email || 'user@modena.com',
          bidderPhone: regForm.phone || '-',
          bidderKtp: regForm.ktp || '-',
          bidderAvatar: `https://ui-avatars.com/api/?name=${regForm.name || 'User'}&background=random`, 
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      const updatedBids = [newBid, ...(form.bids || [])];
      setForm(prev => ({
          ...prev,
          bids: updatedBids,
          hargaTertinggi: amount.toString()
      }));
      
      setNewBidAmount('');
      setBidError('');
  };

  const handleCopyLink = () => {
      const auctionLink = `https://auction.modena.com/bid/${form.id || Date.now()}`;
      navigator.clipboard.writeText(auctionLink);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-0.5">*</span>}
    </label>
  );

  const DetailItem = ({ label, value, icon: Icon }: { label: string, value?: string, icon?: any }) => (
    <div className="flex flex-col">
        <div className="flex items-center gap-1.5 mb-1">
            {Icon && <Icon size={10} className="text-gray-400" />}
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
        </div>
        <span className="text-[11px] font-black text-black truncate" title={value}>{value || '-'}</span>
    </div>
  );

  const tabs = ['DETAILS', 'LIVE BIDDING', 'WORKFLOW'];

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-[#FBFBFB] w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <DollarSign size={20} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    DETAIL PENJUALAN & LELANG
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">{assetType === 'VEHICLE' ? 'Vehicle Asset Disposal' : 'General Asset Disposal'}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        <div className="bg-white border-b border-gray-100 flex px-10 shrink-0 gap-8">
            {tabs.map(tab => (
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
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#FBFBFB] relative">
            
            {/* TAB: DETAILS */}
            {activeTab === 'DETAILS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="space-y-8">
                        {/* Asset Selection Card */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                {assetType === 'VEHICLE' ? <Car size={16} className="text-black"/> : <Package size={16} className="text-black"/>}
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">{assetType === 'VEHICLE' ? 'UNIT YANG DIJUAL' : 'ASET YANG DIJUAL'}</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2.5">
                                        <Label required>{assetType === 'VEHICLE' ? 'PILIH UNIT KENDARAAN' : 'PILIH ASET'}</Label>
                                        
                                        {/* Flagging Filter for General Asset */}
                                        {assetType === 'GENERAL_ASSET' && !isView && (
                                            <div className="flex gap-1">
                                                {['ALL', 'Asset HC', 'Asset IT', 'Customer Service'].map((cat) => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => setCategoryFilter(cat)}
                                                        className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider border transition-all ${
                                                            categoryFilter === cat 
                                                            ? 'bg-black text-white border-black' 
                                                            : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        {cat === 'ALL' ? 'Semua' : cat.replace('Asset ', '')}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {assetType === 'VEHICLE' ? (
                                        <select 
                                            disabled={isView || mode === 'edit'}
                                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 appearance-none cursor-pointer"
                                            value={form.noPolisi || ''}
                                            onChange={handleVehicleChange}
                                        >
                                            <option value="">-- Pilih Kendaraan (Hanya Milik Sendiri) --</option>
                                            {vehicleList.filter(v => v.ownership === 'Milik Modena').map(v => (
                                                <option key={v.id} value={v.noPolisi}>{v.noPolisi} - {v.nama} ({v.tahunPembuatan})</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <select 
                                            disabled={isView || mode === 'edit'}
                                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 appearance-none cursor-pointer"
                                            value={form.assetNumber || ''}
                                            onChange={handleGeneralAssetChange}
                                        >
                                            <option value="">-- Pilih Aset {categoryFilter !== 'ALL' ? `(${categoryFilter})` : ''} --</option>
                                            {filteredGeneralAssets.filter(a => a.ownership === 'Own').map(a => {
                                                const code = a.assetNumber || a.assetCode;
                                                const name = a.assetName || a.type;
                                                const loc = a.assetLocation || a.buildingName;
                                                const val = a.id || code;
                                                return (
                                                    <option key={a.id} value={val}>
                                                        {code} - {name} ({loc}) {categoryFilter === 'ALL' && a.sourceCategory ? `[${a.sourceCategory}]` : ''}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    )}
                                </div>

                                {/* Detailed Vehicle Info (Read Only) */}
                                {assetType === 'VEHICLE' && selectedVehicle && (
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200/50">
                                            <Info size={14} className="text-black" />
                                            <span className="text-[10px] font-black text-black uppercase tracking-widest">Spesifikasi Detail</span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                                            <DetailItem label="Merek" value={selectedVehicle.merek} />
                                            <DetailItem label="Tipe" value={selectedVehicle.tipeKendaraan} />
                                            <DetailItem label="Model" value={selectedVehicle.model} />
                                            <DetailItem label="Tahun" value={selectedVehicle.tahunPembuatan} icon={CalendarIcon} />
                                            <DetailItem label="Warna" value={selectedVehicle.warna} />
                                            <DetailItem label="Silinder" value={selectedVehicle.isiSilinder} />
                                            
                                            <div className="col-span-2 h-px bg-gray-200/50 my-1"></div>
                                            
                                            <DetailItem label="No. Rangka" value={selectedVehicle.noRangka} icon={Hash} />
                                            <DetailItem label="No. Mesin" value={selectedVehicle.noMesin} icon={Hash} />
                                            <DetailItem label="No. BPKB" value={selectedVehicle.noBpkb} icon={FileText} />
                                            
                                            <div className="col-span-2 mt-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Masa Berlaku STNK</span>
                                                <div className="flex gap-2">
                                                    <span className="text-[10px] font-mono font-bold text-black bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">{selectedVehicle.masaBerlaku1 || '-'} (1Y)</span>
                                                    <span className="text-[10px] font-mono font-bold text-black bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">{selectedVehicle.masaBerlaku5 || '-'} (5Y)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Detailed General Asset Info */}
                                {assetType === 'GENERAL_ASSET' && selectedGeneralAsset && (
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200/50">
                                            <Info size={14} className="text-black" />
                                            <span className="text-[10px] font-black text-black uppercase tracking-widest">Detail Aset</span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                                            <DetailItem label="Kategori" value={selectedGeneralAsset.assetCategory || selectedGeneralAsset.assetType} />
                                            <DetailItem label="Tipe / Nama" value={selectedGeneralAsset.type || selectedGeneralAsset.assetName} />
                                            <DetailItem label="Lokasi" value={selectedGeneralAsset.assetLocation || selectedGeneralAsset.buildingName} />
                                            <DetailItem label="Sub Lokasi" value={selectedGeneralAsset.subLocation || `${selectedGeneralAsset.floor || ''} ${selectedGeneralAsset.roomName || ''}`} />
                                            <DetailItem label="Departemen" value={selectedGeneralAsset.department || '-'} />
                                            <DetailItem label="Tgl Beli" value={selectedGeneralAsset.purchaseDate} icon={CalendarIcon} />
                                            
                                            <div className="col-span-2 h-px bg-gray-200/50 my-1"></div>
                                            
                                            <div className="col-span-2">
                                                <DetailItem label="Harga Perolehan" value={`Rp ${parseInt(selectedGeneralAsset.purchasePrice || '0').toLocaleString('id-ID')}`} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label>LOKASI ASET</Label>
                                        <input 
                                            type="text"
                                            disabled={true}
                                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-gray-500 outline-none"
                                            value={form.cabang || '-'}
                                        />
                                    </div>
                                    <div>
                                        <Label>TANGGAL REQUEST DISPOSAL</Label>
                                        <input 
                                            type="date"
                                            disabled={isView}
                                            className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400"
                                            value={form.tglRequest}
                                            onChange={(e) => setForm({...form, tglRequest: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sales Details Card */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Tag size={16} className="text-black"/>
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">DETAIL PENAWARAN</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <Label required>METODE PENJUALAN</Label>
                                    <select 
                                        disabled={isView}
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400 appearance-none cursor-pointer"
                                        value={form.status}
                                        onChange={(e) => setForm({...form, status: e.target.value})}
                                    >
                                        <option value="Open Bidding">Lelang Terbuka</option>
                                        <option value="Direct Sale">Penjualan Langsung</option>
                                        <option value="Scrap">Scrap / Besi Tua</option>
                                    </select>
                                </div>
                                
                                <div className="relative">
                                    <Label>HARGA PEMBUKA (IDR)</Label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                        <input 
                                            type="number"
                                            disabled={isView}
                                            className="w-full bg-[#F8F9FA] border-none rounded-2xl pl-10 pr-5 py-4 text-[12px] font-black text-black outline-none shadow-sm focus:ring-2 focus:ring-black/5 disabled:text-gray-400"
                                            value={form.hargaPembuka}
                                            onChange={(e) => setForm({...form, hargaPembuka: e.target.value})}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <Label>HARGA TERTINGGI SAAT INI</Label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                                        <input 
                                            type="number"
                                            disabled={true}
                                            className="w-full bg-green-50 border-none rounded-2xl pl-10 pr-5 py-4 text-[12px] font-black text-green-700 outline-none shadow-sm"
                                            value={form.hargaTertinggi}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side of Details Tab: LEADERBOARD SUMMARY */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Trophy size={16} className="text-yellow-500" />
                                    <h3 className="text-[11px] font-black text-black uppercase tracking-widest">TOP 4 LEADERBOARD</h3>
                                </div>
                                <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    Total: {form.bids?.length || 0}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {form.bids && form.bids.length > 0 ? (
                                    form.bids.slice(0, 4).map((bid, idx) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => setSelectedBidder(bid)}
                                            className={`p-4 rounded-2xl border flex justify-between items-center cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] ${
                                                idx === 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-[#FBFBFB] border-gray-100'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black text-white shadow-sm ${
                                                    idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-400' : 'bg-black'
                                                }`}>
                                                    #{idx + 1}
                                                </div>
                                                <div>
                                                    <p className="text-[12px] font-black text-black">{bid.bidderName}</p>
                                                    <p className="text-[10px] text-gray-400">{bid.timestamp.split(' ')[0]}</p>
                                                </div>
                                            </div>
                                            <p className="text-[14px] font-mono font-black text-black">
                                                Rp {parseInt(bid.amount).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-16 opacity-50 flex flex-col items-center border-2 border-dashed border-gray-100 rounded-3xl">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                            <Trophy size={24} className="text-gray-300" />
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Belum ada penawaran masuk</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-[10px] text-gray-400 text-center italic">
                                    *Klik pada penawar untuk melihat detail lengkap.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: LIVE BIDDING - ENHANCED WITH ASSET DETAILS */}
            {activeTab === 'LIVE BIDDING' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    
                    {/* LEFT PANEL: Asset Details with Images & Documents */}
                    <div className="lg:col-span-5 space-y-5">
                        
                        {/* Asset Image Gallery */}
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                            {/* Main Image */}
                            <div className="relative aspect-[4/3] bg-gray-100 group">
                                {selectedVehicle || selectedGeneralAsset ? (
                                    <>
                                        <img 
                                            src={getVehicleImages(selectedVehicle)[selectedImageIndex]?.url || `https://source.unsplash.com/featured/800x600/?car`}
                                            alt="Asset Image"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Image Navigation */}
                                        {getVehicleImages(selectedVehicle).length > 1 && (
                                            <>
                                                <button 
                                                    onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : getVehicleImages(selectedVehicle).length - 1)}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <ChevronLeft size={20} />
                                                </button>
                                                <button 
                                                    onClick={() => setSelectedImageIndex(prev => prev < getVehicleImages(selectedVehicle).length - 1 ? prev + 1 : 0)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <ChevronRight size={20} />
                                                </button>
                                            </>
                                        )}
                                        {/* Fullscreen Button */}
                                        <button 
                                            onClick={() => setShowImageModal(true)}
                                            className="absolute top-3 right-3 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Maximize2 size={16} />
                                        </button>
                                        {/* Image Type Badge */}
                                        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                                            {getVehicleImages(selectedVehicle)[selectedImageIndex]?.caption || 'Photo'}
                                        </div>
                                        {/* Image Counter */}
                                        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                            <Camera size={12} /> {selectedImageIndex + 1} / {getVehicleImages(selectedVehicle).length}
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                        <Image size={48} strokeWidth={1} />
                                        <p className="text-[10px] font-bold uppercase tracking-wider mt-2">Pilih Unit Terlebih Dahulu</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Thumbnail Strip */}
                            {(selectedVehicle || selectedGeneralAsset) && getVehicleImages(selectedVehicle).length > 1 && (
                                <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto">
                                    {getVehicleImages(selectedVehicle).map((img, idx) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                                selectedImageIndex === idx ? 'border-black ring-2 ring-black/20' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Asset Detail Tabs: Images/Documents/Specs */}
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                            {/* Tab Headers */}
                            <div className="flex border-b border-gray-100">
                                {[
                                    { key: 'images', label: 'GALERI', icon: Image },
                                    { key: 'documents', label: 'DOKUMEN', icon: FileText },
                                    { key: 'specs', label: 'SPESIFIKASI', icon: Settings },
                                ].map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setAssetDetailTab(tab.key as any)}
                                        className={`flex-1 py-3 px-4 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                                            assetDetailTab === tab.key 
                                            ? 'border-black text-black bg-gray-50' 
                                            : 'border-transparent text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        <tab.icon size={12} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Tab Content */}
                            <div className="p-5 max-h-[250px] overflow-y-auto custom-scrollbar">
                                {/* Documents Tab */}
                                {assetDetailTab === 'documents' && (
                                    <div className="space-y-3 animate-in fade-in duration-200">
                                        <div className="flex items-center gap-2 mb-4">
                                            <FileText size={14} className="text-black" />
                                            <span className="text-[10px] font-black text-black uppercase tracking-widest">Kelengkapan Dokumen</span>
                                        </div>
                                        {selectedVehicle ? (
                                            getVehicleDocuments(selectedVehicle).map(doc => (
                                                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all group cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                                                            <doc.icon size={16} className="text-gray-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[11px] font-black text-black">{doc.name}</p>
                                                            <p className="text-[9px] text-gray-400 font-medium">No: {doc.number}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-2">
                                                        <div>
                                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                                                doc.status === 'Valid' ? 'bg-green-100 text-green-700' :
                                                                doc.status === 'Expired' ? 'bg-red-100 text-red-700' :
                                                                doc.status === 'Available' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-gray-100 text-gray-500'
                                                            }`}>
                                                                {doc.status}
                                                            </span>
                                                            {doc.expiry !== '-' && (
                                                                <p className="text-[8px] text-gray-400 mt-0.5">Exp: {doc.expiry}</p>
                                                            )}
                                                        </div>
                                                        <button className="p-1.5 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-50">
                                                            <Download size={12} className="text-gray-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-gray-300">
                                                <FileText size={32} className="mx-auto mb-2" />
                                                <p className="text-[10px] font-bold">Pilih kendaraan untuk melihat dokumen</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Specs Tab */}
                                {assetDetailTab === 'specs' && selectedVehicle && (
                                    <div className="animate-in fade-in duration-200">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Car size={10} className="text-gray-400" />
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase">Merek</span>
                                                </div>
                                                <p className="text-[11px] font-black text-black">{selectedVehicle.merek || '-'}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Settings size={10} className="text-gray-400" />
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase">Tipe</span>
                                                </div>
                                                <p className="text-[11px] font-black text-black">{selectedVehicle.tipeKendaraan || '-'}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <CalendarIcon size={10} className="text-gray-400" />
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase">Tahun</span>
                                                </div>
                                                <p className="text-[11px] font-black text-black">{selectedVehicle.tahunPembuatan || '-'}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Fuel size={10} className="text-gray-400" />
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase">CC</span>
                                                </div>
                                                <p className="text-[11px] font-black text-black">{selectedVehicle.isiSilinder || '-'}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Gauge size={10} className="text-gray-400" />
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase">Odometer</span>
                                                </div>
                                                <p className="text-[11px] font-black text-black">{selectedVehicle.odometer || '0'} KM</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <MapPin size={10} className="text-gray-400" />
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase">Lokasi</span>
                                                </div>
                                                <p className="text-[11px] font-black text-black">{selectedVehicle.cabang || '-'}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                                    <span className="text-[8px] font-bold text-blue-600 uppercase">No. Rangka</span>
                                                    <p className="text-[10px] font-mono font-black text-blue-900 mt-0.5">{selectedVehicle.noRangka || '-'}</p>
                                                </div>
                                                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                                    <span className="text-[8px] font-bold text-blue-600 uppercase">No. Mesin</span>
                                                    <p className="text-[10px] font-mono font-black text-blue-900 mt-0.5">{selectedVehicle.noMesin || '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Images Tab - Grid View */}
                                {assetDetailTab === 'images' && (
                                    <div className="animate-in fade-in duration-200">
                                        {selectedVehicle ? (
                                            <div className="grid grid-cols-3 gap-2">
                                                {getVehicleImages(selectedVehicle).map((img, idx) => (
                                                    <button
                                                        key={img.id}
                                                        onClick={() => { setSelectedImageIndex(idx); setShowImageModal(true); }}
                                                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all group relative ${
                                                            selectedImageIndex === idx ? 'border-black' : 'border-transparent hover:border-gray-300'
                                                        }`}
                                                    >
                                                        <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                                            <ZoomIn size={16} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
                                                        </div>
                                                        <span className="absolute bottom-1 left-1 right-1 text-[7px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded truncate">
                                                            {img.caption}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-300">
                                                <Image size={32} className="mx-auto mb-2" />
                                                <p className="text-[10px] font-bold">Pilih kendaraan untuk melihat galeri</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* No asset selected message */}
                                {!selectedVehicle && !selectedGeneralAsset && assetDetailTab === 'specs' && (
                                    <div className="text-center py-8 text-gray-300">
                                        <Settings size={32} className="mx-auto mb-2" />
                                        <p className="text-[10px] font-bold">Pilih kendaraan untuk melihat spesifikasi</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Asset Quick Info */}
                        {selectedVehicle && (
                            <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-[2rem] p-5 shadow-xl">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Unit Lelang</p>
                                        <h3 className="text-[18px] font-black uppercase tracking-tight mt-1">{selectedVehicle.noPolisi}</h3>
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Car size={20} className="text-white" />
                                    </div>
                                </div>
                                <p className="text-[12px] font-bold text-gray-300">
                                    {selectedVehicle.nama || `${selectedVehicle.merek} ${selectedVehicle.tipeKendaraan}`}
                                </p>
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                                    <span className="text-[9px] font-bold text-gray-400 uppercase">{selectedVehicle.warna}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase">{selectedVehicle.tahunPembuatan}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase">{selectedVehicle.isiSilinder} CC</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* MIDDLE PANEL: Auction Status */}
                    <div className="lg:col-span-3 space-y-5">
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                                    <TrendingUp size={14} /> Status
                                </h3>
                                <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${isOpenBidding ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                    {isOpenBidding ? 'LIVE' : 'CLOSED'}
                                </span>
                            </div>
                            
                            <div className="mb-6">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Harga Tertinggi</p>
                                <p className="text-[28px] font-black text-green-600 font-mono tracking-tight leading-none">
                                    Rp {parseInt(form.hargaTertinggi || '0').toLocaleString('id-ID')}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center">
                                    <span className="text-[9px] font-bold text-gray-500 uppercase">Harga Pembuka</span>
                                    <span className="text-[12px] font-black text-black">
                                        Rp {parseInt(form.hargaPembuka || '0').toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center">
                                    <span className="text-[9px] font-bold text-gray-500 uppercase">Total Peserta</span>
                                    <span className="text-[12px] font-black text-black flex items-center gap-1.5">
                                        <Users size={12} /> {form.bids?.length || 0}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 pt-5 border-t border-gray-100">
                                <button 
                                    onClick={handleCopyLink}
                                    className="w-full py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                                >
                                    {isLinkCopied ? <Check size={14} className="text-green-400" /> : <Link size={14} />}
                                    {isLinkCopied ? 'Tersalin!' : 'Salin Link'}
                                </button>
                            </div>
                        </div>

                        {/* Top Bidders Mini */}
                        <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Trophy size={14} className="text-yellow-500" />
                                <span className="text-[10px] font-black text-black uppercase tracking-widest">Top 3</span>
                            </div>
                            {form.bids && form.bids.length > 0 ? (
                                <div className="space-y-2">
                                    {form.bids.slice(0, 3).map((bid, idx) => (
                                        <div 
                                            key={idx}
                                            onClick={() => setSelectedBidder(bid)}
                                            className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all hover:shadow-md ${
                                                idx === 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white ${
                                                idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-orange-400'
                                            }`}>
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-black text-black truncate">{bid.bidderName}</p>
                                            </div>
                                            <p className="text-[10px] font-mono font-black text-green-600">
                                                Rp {parseInt(bid.amount).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-gray-300">
                                    <Trophy size={24} className="mx-auto mb-2" />
                                    <p className="text-[9px] font-bold">Belum ada bid</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL: Live Feed & Bidding */}
                    <div className="lg:col-span-4 flex flex-col h-[650px] bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
                            <h3 className="text-[11px] font-black text-black uppercase tracking-widest">Live Feed</h3>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                Live
                            </div>
                        </div>

                        {/* VIEW STATE: IDLE */}
                        {viewState === 'idle' && !isRegistered && (
                            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gray-50/30">
                                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-5 shadow-xl">
                                    <ShieldCheck size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[14px] font-black text-black uppercase tracking-tight mb-2">Akses Terbatas</h3>
                                <p className="text-[10px] text-gray-500 font-medium max-w-xs leading-relaxed mb-6">
                                    Daftar untuk ikut lelang dan lihat penawaran detail.
                                </p>
                                <button 
                                    onClick={() => setViewState('registering')}
                                    className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                                >
                                    Daftar Sekarang <ChevronRight size={12} />
                                </button>
                            </div>
                        )}

                        {/* VIEW STATE: REGISTERING */}
                        {viewState === 'registering' && (
                            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-white animate-in slide-in-from-bottom-4">
                                <div className="flex items-center gap-2 mb-6">
                                    <button onClick={() => setViewState('idle')} className="p-1.5 bg-gray-50 rounded-full hover:bg-gray-100"><X size={14}/></button>
                                    <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Registrasi Peserta</h3>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Nama Lengkap *</label>
                                        <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[11px] font-bold outline-none focus:ring-2 focus:ring-black/5" value={regForm.name} onChange={(e) => setRegForm({...regForm, name: e.target.value})} placeholder="Sesuai KTP" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">NIK / KTP *</label>
                                        <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[11px] font-bold outline-none focus:ring-2 focus:ring-black/5" value={regForm.ktp} onChange={(e) => setRegForm({...regForm, ktp: e.target.value})} placeholder="16 digit" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">WhatsApp *</label>
                                            <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[11px] font-bold outline-none focus:ring-2 focus:ring-black/5" value={regForm.phone} onChange={(e) => setRegForm({...regForm, phone: e.target.value})} placeholder="08xx" />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Email *</label>
                                            <input type="email" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[11px] font-bold outline-none focus:ring-2 focus:ring-black/5" value={regForm.email} onChange={(e) => setRegForm({...regForm, email: e.target.value})} placeholder="email@domain.com" />
                                        </div>
                                    </div>
                                    
                                    <label className="flex items-start gap-2 cursor-pointer p-3 border border-gray-100 rounded-xl hover:bg-gray-50 mt-2">
                                        <input type="checkbox" className="w-4 h-4 rounded mt-0.5" checked={regForm.agreedToTerms} onChange={(e) => setRegForm({...regForm, agreedToTerms: e.target.checked})} />
                                        <span className="text-[9px] text-gray-500 font-medium leading-relaxed">Saya menyetujui Syarat & Ketentuan Lelang yang berlaku dan bertanggung jawab atas penawaran yang saya ajukan.</span>
                                    </label>

                                    {bidError && (
                                        <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-2 rounded-xl">
                                            <AlertCircle size={12} />
                                            <span className="text-[9px] font-bold">{bidError}</span>
                                        </div>
                                    )}

                                    <button onClick={handleRegister} className="w-full py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 shadow-lg active:scale-95 mt-2">
                                        Simpan & Masuk Lelang
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* VIEW STATE: BIDDING */}
                        {viewState === 'bidding' && isRegistered && (
                            <>
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3 bg-[#FAFAFA]">
                                    {form.bids && form.bids.length > 0 ? (
                                        form.bids.map((bid, idx) => (
                                            <div 
                                                key={idx} 
                                                onClick={() => setSelectedBidder(bid)}
                                                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <img src={bid.bidderAvatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                                                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white ${idx === 0 ? 'bg-green-500' : 'bg-gray-400'}`}>
                                                            {idx + 1}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[11px] font-black text-black">{bid.bidderName}</h4>
                                                        <span className="text-[8px] text-gray-400 flex items-center gap-1"><Clock size={8} /> {bid.timestamp}</span>
                                                    </div>
                                                </div>
                                                <p className="text-[13px] font-mono font-black text-green-600">Rp {parseInt(bid.amount).toLocaleString('id-ID')}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center opacity-40">
                                            <TrendingUp size={28} className="text-gray-400 mb-2" />
                                            <p className="text-[10px] font-black text-gray-400 uppercase">Menunggu bid pertama...</p>
                                        </div>
                                    )}
                                </div>

                                {isOpenBidding && (
                                    <div className="p-4 border-t border-gray-100 bg-white shrink-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-[9px] font-black text-gray-400 uppercase">Penawaran Anda</label>
                                            <span className="text-[8px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                                                <Check size={8} /> {regForm.name}
                                            </span>
                                        </div>
                                        <div className="relative mb-3">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[11px] font-black text-gray-400">Rp</span>
                                            <input 
                                                type="number"
                                                className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-3 text-[14px] font-black text-black outline-none focus:ring-2 focus:ring-black/5"
                                                value={newBidAmount}
                                                onChange={(e) => { setNewBidAmount(e.target.value); setBidError(''); }}
                                                placeholder="0"
                                            />
                                        </div>
                                        
                                        {bidError && (
                                            <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-2 rounded-xl mb-3">
                                                <AlertCircle size={12} />
                                                <span className="text-[9px] font-bold">{bidError}</span>
                                            </div>
                                        )}

                                        <button 
                                            onClick={handlePlaceBid}
                                            disabled={!newBidAmount}
                                            className="w-full py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Kirim Penawaran
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Image Fullscreen Modal */}
            {showImageModal && selectedVehicle && (
                <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center animate-in fade-in zoom-in-95">
                    <button onClick={() => setShowImageModal(false)} className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                        <X size={24} />
                    </button>
                    <button 
                        onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : getVehicleImages(selectedVehicle).length - 1)}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={() => setSelectedImageIndex(prev => prev < getVehicleImages(selectedVehicle).length - 1 ? prev + 1 : 0)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
                    >
                        <ChevronRight size={24} />
                    </button>
                    <div className="max-w-5xl max-h-[80vh]">
                        <img 
                            src={getVehicleImages(selectedVehicle)[selectedImageIndex]?.url}
                            alt="Full size"
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {getVehicleImages(selectedVehicle).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImageIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${selectedImageIndex === idx ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>
                    <div className="absolute bottom-6 right-6 text-white text-[11px] font-bold">
                        {getVehicleImages(selectedVehicle)[selectedImageIndex]?.caption} ({selectedImageIndex + 1}/{getVehicleImages(selectedVehicle).length})
                    </div>
                </div>
            )}

            {/* TAB: WORKFLOW */}
            {activeTab === 'WORKFLOW' && (
                <div className="w-full py-20 text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Workflow information available after creation</p>
                </div>
            )}

            {/* GLOBAL OVERLAY: Selected Bidder Details */}
            {selectedBidder && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 p-8 flex flex-col animate-in fade-in zoom-in-95 duration-200">
                    <button onClick={() => setSelectedBidder(null)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"><X size={20}/></button>
                    
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6">
                            <img src={selectedBidder.bidderAvatar} className="w-full h-full object-cover" alt={selectedBidder.bidderName} />
                        </div>
                        <h2 className="text-[20px] font-black text-black uppercase tracking-tight">{selectedBidder.bidderName}</h2>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1 mb-8">{selectedBidder.bidderRole}</p>
                        
                        <div className="w-full max-w-sm space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-2"><CreditCard size={14} /> NIK / KTP</span>
                                <span className="text-[12px] font-black text-black">{selectedBidder.bidderKtp || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-2"><Phone size={14} /> Phone</span>
                                <span className="text-[12px] font-black text-black">{selectedBidder.bidderPhone || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-2"><Mail size={14} /> Email</span>
                                <span className="text-[12px] font-black text-black">{selectedBidder.bidderEmail || '-'}</span>
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Bid Amount</p>
                                <p className="text-[24px] font-black text-green-600 font-mono tracking-tight">Rp {parseInt(selectedBidder.amount).toLocaleString('id-ID')}</p>
                                <p className="text-[10px] text-gray-400 mt-2 font-medium">Placed on {selectedBidder.timestamp}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-[#F8F9FA] border-none rounded-2xl hover:bg-gray-100 hover:text-black transition-all">BATAL</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> SIMPAN PENJUALAN
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
