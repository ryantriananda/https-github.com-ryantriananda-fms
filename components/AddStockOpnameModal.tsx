
import React, { useState, useEffect, useMemo } from 'react';
import { X, Save, Calendar, Box, Hash, Calculator, AlertTriangle, Search, Layers, ChevronDown, FileText, CheckCircle2, XCircle, User } from 'lucide-react';
import { StockOpnameRecord, MasterItem } from '../types';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (records: StockOpnameRecord[]) => void;
  currentUser?: string;
  mode?: 'create' | 'view' | 'approve';
  initialData?: StockOpnameRecord[]; // Pass an array of records belonging to the same opnameId
  onApprove?: (opnameId: string, note?: string) => void;
  onReject?: (opnameId: string, note?: string) => void;
}

interface OpnameItem extends MasterItem {
    inputPhysicalQty: string;
    diff: number;
}

export const AddStockOpnameModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    currentUser = 'System Admin', 
    mode = 'create', 
    initialData,
    onApprove,
    onReject
}) => {
  const [category, setCategory] = useState<'ATK' | 'ARK'>('ATK');
  const [subCategory, setSubCategory] = useState<string>('');
  const [opnameDate, setOpnameDate] = useState(new Date().toISOString().split('T')[0]);
  const [opnameId, setOpnameId] = useState(`SO-${Date.now().toString().slice(-6)}`);
  
  const [items, setItems] = useState<OpnameItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [approvalNote, setApprovalNote] = useState('');

  // Determine source data dynamically
  const currentMasterData = useMemo(() => {
      return category === 'ATK' ? MOCK_MASTER_DATA : MOCK_MASTER_ARK_DATA;
  }, [category]);

  // Extract unique sub-categories
  const subCategories = useMemo(() => {
      // If viewing/approving existing data, extract from items directly if needed
      // But for consistency we use master data categories for the filter dropdown
      const cats = new Set(currentMasterData.map(item => item.category));
      return Array.from(cats);
  }, [currentMasterData]);

  useEffect(() => {
      if (isOpen) {
          if ((mode === 'view' || mode === 'approve') && initialData && initialData.length > 0) {
              // Load existing data
              const firstRecord = initialData[0];
              setOpnameId(firstRecord.opnameId);
              setOpnameDate(firstRecord.date);
              setCategory(firstRecord.category as 'ATK' | 'ARK');
              setApprovalNote(firstRecord.approvalNote || '');

              // Map records back to OpnameItem structure
              const mappedItems: OpnameItem[] = initialData.map(record => {
                  // Try to find original master data to get extra fields like min/max stock if available
                  // In a real app, this might come from a join or embedded data
                  return {
                      id: record.itemCode, // Using itemCode as ID for simplicity in mapping
                      itemCode: record.itemCode,
                      itemName: record.itemName,
                      category: record.category,
                      uom: record.uom,
                      remainingStock: record.systemQty,
                      inputPhysicalQty: record.physicalQty.toString(),
                      diff: record.diff,
                      // Mock fields required by MasterItem interface
                      minimumStock: 0,
                      maximumStock: 0,
                      requestedStock: 0
                  };
              });
              setItems(mappedItems);
          } else {
              // Create Mode: Reset and Load
              setOpnameId(`SO-${category}-${Date.now().toString().slice(-6)}`);
              setSubCategory('');
              setApprovalNote('');
              
              const mappedItems: OpnameItem[] = currentMasterData.map(item => ({
                  ...item,
                  inputPhysicalQty: item.remainingStock.toString(),
                  diff: 0
              }));
              setItems(mappedItems);
          }
      }
  }, [isOpen, category, mode, initialData, currentMasterData]);

  // Handle Qty Input Change
  const handleQtyChange = (id: string | number, val: string) => {
      if (mode !== 'create') return; // Read-only in view/approve
      
      const numVal = parseInt(val) || 0;
      setItems(prev => prev.map(item => {
          if (item.id === id) {
              const diff = numVal - item.remainingStock;
              return {
                  ...item,
                  inputPhysicalQty: val,
                  diff: diff
              };
          }
          return item;
      }));
  };

  const handleSave = () => {
      const records: StockOpnameRecord[] = items.map(item => ({
          id: `REC-${Date.now()}-${item.id}`,
          opnameId: opnameId,
          date: opnameDate,
          itemCode: item.itemCode,
          itemName: item.itemName,
          category: category,
          systemQty: item.remainingStock,
          physicalQty: parseInt(item.inputPhysicalQty) || 0,
          diff: item.diff,
          uom: item.uom,
          performedBy: currentUser,
          status: item.diff === 0 ? 'MATCHED' : 'DISCREPANCY',
          statusApproval: 'Pending' // Default new records to Pending
      }));
      
      onSave(records);
      onClose();
  };

  const filteredItems = items.filter(i => {
      const matchesSearch = i.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            i.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSub = subCategory ? i.category === subCategory : true;
      return matchesSearch && matchesSub;
  });

  const totalDiscrepancies = items.filter(i => i.diff !== 0).length;
  const isReadOnly = mode !== 'create';

  if (!isOpen) return null;

  const Label = ({ children }: { children?: React.ReactNode }) => (
      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
          {children}
      </label>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#F8F9FA] w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh]">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                <Calculator size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                    {mode === 'create' ? 'INITIALIZE STOCK OPNAME' : mode === 'approve' ? 'APPROVE STOCK OPNAME' : 'STOCK OPNAME DETAIL'}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-[0.3em]">Inventory Control System</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={28} />
          </button>
        </div>

        {/* Controls Section */}
        <div className="p-10 space-y-6 shrink-0 overflow-y-auto max-h-[40vh] custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Categorization Filter Card */}
                <div className="lg:col-span-8 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-6">
                        <Layers size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">CATEGORIZATION FILTER</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <Label>MAIN MODULE CATEGORY</Label>
                            <div className="flex gap-3 bg-[#F8F9FA] p-1.5 rounded-2xl border border-gray-100">
                                <button
                                    onClick={() => !isReadOnly && setCategory('ATK')}
                                    disabled={isReadOnly}
                                    className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        category === 'ATK' 
                                        ? 'bg-black text-white shadow-lg' 
                                        : 'text-gray-400 hover:bg-white hover:text-gray-600'
                                    }`}
                                >
                                    ATK CATEGORY
                                </button>
                                <button
                                    onClick={() => !isReadOnly && setCategory('ARK')}
                                    disabled={isReadOnly}
                                    className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        category === 'ARK' 
                                        ? 'bg-black text-white shadow-lg' 
                                        : 'text-gray-400 hover:bg-white hover:text-gray-600'
                                    }`}
                                >
                                    ARK CATEGORY
                                </button>
                            </div>
                        </div>
                        <div>
                            <Label>ITEM SUB-CATEGORY</Label>
                            <div className="relative">
                                <select
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[11px] font-bold text-black outline-none focus:border-black appearance-none cursor-pointer transition-all shadow-sm uppercase"
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                >
                                    <option value="">All Sub-Categories...</option>
                                    {subCategories.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Opname Info Card */}
                <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <FileText size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">OPNAME INFO</h3>
                    </div>
                    
                    <div className="space-y-5">
                        <div>
                            <Label>OPNAME REFERENCE ID</Label>
                            <div className="w-full bg-[#F0F9FF] border border-blue-100 rounded-2xl px-5 py-4 text-[12px] font-black text-blue-600 font-mono tracking-wide">
                                {opnameId}
                            </div>
                        </div>
                        <div>
                            <Label>PERFORMED ON</Label>
                            <div className="relative">
                                <input 
                                    type="date"
                                    disabled={isReadOnly}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[12px] font-bold text-black outline-none focus:border-black shadow-sm"
                                    value={opnameDate}
                                    onChange={(e) => setOpnameDate(e.target.value)}
                                />
                                <Calendar size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar - Separate Row */}
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search item by code or name..." 
                    className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 text-[12px] font-bold outline-none focus:border-black transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-10 pb-6">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <Box size={16} className="text-black" />
                    <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">INVENTORY COUNT TABLE</h3>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#FBFBFB] border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <th className="p-5 pl-8 w-16 text-center">#</th>
                            <th className="p-5 w-32">ITEM CODE</th>
                            <th className="p-5">ITEM NAME</th>
                            <th className="p-5 w-24 text-center">UOM</th>
                            <th className="p-5 w-32 text-center text-gray-400">SYSTEM QTY</th>
                            <th className="p-5 w-32 text-center bg-blue-50/30 text-blue-600">PHYSICAL QTY</th>
                            <th className="p-5 w-24 text-center">DIFF</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-[12px]">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-4 text-center font-bold text-gray-300">{index + 1}</td>
                                    <td className="p-4 font-mono font-bold text-gray-600">{item.itemCode}</td>
                                    <td className="p-4 font-bold text-black">{item.itemName}</td>
                                    <td className="p-4 text-center font-medium text-gray-500">{item.uom}</td>
                                    <td className="p-4 text-center">
                                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg font-bold">{item.remainingStock}</span>
                                    </td>
                                    <td className="p-4 text-center bg-blue-50/10">
                                        <input 
                                            type="number"
                                            disabled={isReadOnly}
                                            className="w-20 text-center bg-white border border-gray-200 rounded-lg py-1.5 font-bold text-black focus:border-black focus:ring-0 outline-none transition-all shadow-sm"
                                            value={item.inputPhysicalQty}
                                            onChange={(e) => handleQtyChange(item.id, e.target.value)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`font-black font-mono ${item.diff === 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {item.diff > 0 ? `+${item.diff}` : item.diff}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="p-20 text-center">
                                    <div className="flex flex-col items-center opacity-40">
                                        <Box size={40} className="text-gray-300 mb-2" />
                                        <p className="text-[12px] font-black text-gray-300 uppercase tracking-widest">Select Category to List Items</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 bg-white border-t border-gray-100 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-2xl border border-gray-100">
                <AlertTriangle size={16} className={totalDiscrepancies > 0 ? 'text-red-500' : 'text-gray-300'} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {totalDiscrepancies} Items with Discrepancy
                </span>
            </div>
            
            <div className="flex gap-4 items-center">
                {mode === 'approve' && (
                    <div className="mr-4">
                        <input 
                            type="text" 
                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[11px] font-medium outline-none w-64 focus:bg-white focus:border-black transition-all"
                            placeholder="Approval Notes (Optional)..."
                            value={approvalNote}
                            onChange={(e) => setApprovalNote(e.target.value)}
                        />
                    </div>
                )}

                <button onClick={onClose} className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all">
                    {mode === 'view' ? 'CLOSE' : 'CANCEL'}
                </button>
                
                {mode === 'create' && (
                    <button 
                        onClick={handleSave}
                        className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Save size={16} strokeWidth={2.5} /> SAVE DATA
                    </button>
                )}

                {mode === 'approve' && (
                    <>
                        <button 
                            onClick={() => onReject && onReject(opnameId, approvalNote)}
                            className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-red-500 rounded-2xl hover:bg-red-600 shadow-xl shadow-red-500/20 transition-all active:scale-95 flex items-center gap-2"
                        >
                            <XCircle size={16} strokeWidth={2.5} /> REJECT
                        </button>
                        <button 
                            onClick={() => onApprove && onApprove(opnameId, approvalNote)}
                            className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-green-500 rounded-2xl hover:bg-green-600 shadow-xl shadow-green-500/20 transition-all active:scale-95 flex items-center gap-2"
                        >
                            <CheckCircle2 size={16} strokeWidth={2.5} /> APPROVE
                        </button>
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
