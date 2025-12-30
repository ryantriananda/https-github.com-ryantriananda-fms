
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Package, Tag, Archive, DollarSign, Calendar, Hash, History, Landmark, ShoppingCart, AlertCircle, Layers, UploadCloud, Trash2, Image as ImageIcon } from 'lucide-react';
import { MasterItem, GeneralMasterItem, PurchaseRecord } from '../types';
import { MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_UOM_DATA } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MasterItem>) => void;
  initialData?: MasterItem | null;
  moduleName: string;
  mode?: 'create' | 'edit' | 'view';
}

const MOCK_PURCHASE_HISTORY: PurchaseRecord[] = [
  { id: 'PO-001', date: '2024-03-15', vendorName: 'PT ATK Jaya', qty: 10, unitPrice: 'Rp 22.000', totalPrice: 'Rp 220.000', status: 'Completed', attachmentUrl: 'https://picsum.photos/id/1/200/200' },
  { id: 'PO-012', date: '2024-02-10', vendorName: 'Toko Buku Makmur', qty: 5, unitPrice: 'Rp 21.500', totalPrice: 'Rp 107.500', status: 'Completed' },
  { id: 'PO-045', date: '2024-01-05', vendorName: 'PT ATK Jaya', qty: 20, unitPrice: 'Rp 21.000', totalPrice: 'Rp 420.000', status: 'Completed', attachmentUrl: 'https://picsum.photos/id/20/200/200' },
];

export const MasterItemModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  moduleName,
  mode = 'create' 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [form, setForm] = useState<Partial<MasterItem>>({
    category: '',
    itemName: '',
    itemCode: '',
    uom: '',
    remainingStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    lastPurchasePrice: '',
    averagePrice: '',
    imageUrl: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setForm(initialData);
    } else if (isOpen) {
      setForm({
        category: '',
        itemName: '',
        itemCode: '',
        uom: '',
        remainingStock: 0,
        minimumStock: 0,
        maximumStock: 0,
        requestedStock: 0,
        lastPurchasePrice: '',
        averagePrice: '',
        imageUrl: '',
        purchaseDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isArk = moduleName.includes('ARK');
  const categories = isArk ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY;

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setForm(prev => ({ ...prev, imageUrl: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setForm(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      <Icon size={18} className="text-black" />
      <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 h-[90vh]">
        {/* Header */}
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-black uppercase tracking-tighter">
              {initialData ? `Edit Master ${isArk ? 'ARK' : 'ATK'}` : `Tambah Master ${isArk ? 'ARK' : 'ATK'}`}
            </h2>
            <div className="flex items-center gap-4 mt-1">
               <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Catalog Management</span>
               {form.itemCode && <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 rounded">#{form.itemCode}</span>}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#F8F9FA]">
          <div className="space-y-8">
            {/* Main Form Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Product Information Column */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <SectionHeader icon={Package} title="Informasi Barang" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* 1. Category First */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Kategori</label>
                    <div className="relative">
                      <select 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none bg-white transition-all shadow-sm"
                        value={form.category}
                        onChange={(e) => setForm({...form, category: e.target.value})}
                        disabled={isView}
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                      <Layers size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                    </div>
                  </div>
                  
                  {/* 2. Item Name Second */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nama Barang</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all shadow-sm"
                      value={form.itemName || ''}
                      onChange={(e) => setForm({...form, itemName: e.target.value})}
                      placeholder="Masukkan nama barang..."
                      disabled={isView}
                    />
                  </div>

                  {/* 3. Part Code - Logic: Category first then Part Code */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">
                      Kode Part {!form.category && <span className="text-red-400 normal-case font-medium ml-1">(Pilih kategori dulu)</span>}
                    </label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        disabled={!form.category || isView}
                        className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-bold outline-none transition-all shadow-sm ${(!form.category || isView) ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-white text-black focus:border-black'}`}
                        value={form.itemCode || ''}
                        onChange={(e) => setForm({...form, itemCode: e.target.value})}
                        placeholder={form.category ? "CON: TP-001" : "Select Category..."}
                      />
                      {!form.category && !isView && <AlertCircle size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />}
                    </div>
                  </div>

                  {/* 4. UOM */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Satuan (UOM)</label>
                    <div className="relative">
                      <select 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none bg-white shadow-sm transition-all"
                        value={form.uom}
                        onChange={(e) => setForm({...form, uom: e.target.value})}
                        disabled={isView}
                      >
                        <option value="">Pilih Satuan</option>
                        {MOCK_UOM_DATA.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                      </select>
                      <Tag size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* 5. Harga Beli */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Harga Beli</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xs">Rp</span>
                      <input 
                        type="text" 
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm font-black text-black focus:border-black outline-none transition-all shadow-sm"
                        value={form.lastPurchasePrice || ''}
                        onChange={(e) => setForm({...form, lastPurchasePrice: e.target.value})}
                        placeholder="0"
                        disabled={isView}
                      />
                    </div>
                  </div>

                  {/* 6. Qty */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Qty (Stok Saat Ini)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black focus:border-black outline-none transition-all shadow-sm"
                        value={form.remainingStock}
                        onChange={(e) => setForm({...form, remainingStock: parseInt(e.target.value) || 0})}
                        placeholder="0"
                        disabled={isView}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300 uppercase">{form.uom || 'Unit'}</span>
                    </div>
                  </div>

                  {/* Image Attachment Below Harga Beli as requested */}
                  <div className="md:col-span-2 mt-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Foto Barang / Attachment</label>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={onFileChange} 
                      disabled={isView}
                    />
                    <div 
                      onClick={() => !isView && fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); !isView && setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(!isView && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
                      className={`relative border-2 border-dashed rounded-2xl h-44 flex flex-col items-center justify-center transition-all overflow-hidden bg-white
                        ${form.imageUrl ? 'border-gray-200' : 'border-gray-100 hover:border-black hover:bg-gray-50/50'}
                        ${isDragging ? 'border-black bg-gray-100 scale-[0.99]' : ''}
                        ${!isView ? 'cursor-pointer' : 'cursor-default'}
                      `}
                    >
                      {form.imageUrl ? (
                        <div className="relative w-full h-full group">
                            <img src={form.imageUrl} alt="Preview" className="w-full h-full object-contain p-2" />
                            {!isView && (
                                <button 
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-black text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center p-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm border border-gray-100 transition-all mb-3 bg-white ${isDragging ? 'scale-110' : ''}`}>
                                <UploadCloud size={20} className={isDragging ? 'text-black' : 'text-gray-300'} />
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-4">
                                {isDragging ? 'Lepaskan Gambar' : 'Klik atau seret gambar ke sini'}
                            </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory Management Column (Limits & Peringatan) */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <SectionHeader icon={Hash} title="Stock Settings" />
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Min Stock</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-center disabled:bg-gray-50 bg-white"
                        value={form.minimumStock}
                        onChange={(e) => setForm({...form, minimumStock: parseInt(e.target.value) || 0})}
                        disabled={isView}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Max Stock</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-center disabled:bg-gray-50 bg-white"
                        value={form.maximumStock}
                        onChange={(e) => setForm({...form, maximumStock: parseInt(e.target.value) || 0})}
                        disabled={isView}
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Average Price</span>
                        <span className="text-sm font-black text-black">{form.averagePrice || 'Rp 0'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Last Purchase</span>
                        <span className="text-sm font-black text-blue-600">{form.lastPurchasePrice || 'Rp 0'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <AlertCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                      <p className="text-[9px] font-bold text-orange-700 uppercase leading-relaxed">
                          Sistem akan memicu peringatan otomatis jika stok berada di bawah batas minimum ({form.minimumStock}).
                      </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated Purchase History - Below information section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <SectionHeader icon={History} title="History Pembelian" />
                  <div className="flex items-center gap-2 px-3 py-1 bg-black text-white rounded-lg text-[9px] font-black uppercase tracking-widest mb-4">
                    <ShoppingCart size={12} /> {MOCK_PURCHASE_HISTORY.length} Transaksi Tercatat
                  </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-8">PO Number</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tanggal</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendor</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Qty</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Harga Satuan</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center pr-8">Attachment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {MOCK_PURCHASE_HISTORY.map((hist) => (
                        <tr key={hist.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-xs text-blue-600 pl-8">{hist.id}</td>
                          <td className="p-4 font-bold text-gray-600 text-xs">{hist.date}</td>
                          <td className="p-4 font-black text-black text-[12px] uppercase">{hist.vendorName}</td>
                          <td className="p-4 text-center font-black text-black text-xs">{hist.qty}</td>
                          <td className="p-4 text-right font-mono font-bold text-xs text-gray-500">{hist.unitPrice}</td>
                          <td className="p-4 text-right font-mono font-black text-black text-xs">{hist.totalPrice}</td>
                          <td className="p-4 text-center pr-8">
                            {hist.attachmentUrl ? (
                              <img src={hist.attachmentUrl} className="w-8 h-8 rounded object-cover mx-auto border border-gray-100" />
                            ) : (
                              <ImageIcon size={16} className="text-gray-200 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {MOCK_PURCHASE_HISTORY.length === 0 && (
                  <div className="p-12 text-center bg-white">
                    <History size={40} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-[10px] font-black text-gray-400 uppercase">Belum ada riwayat pembelian tercatat</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-10 py-2.5 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-12 py-2.5 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-lg hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2"
            >
                <Save size={14} /> Simpan Katalog
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
