
import React, { useState, useEffect } from 'react';
import { X, Save, List, Calendar, CheckCircle, FileText, User, Package, MapPin, History, Check, XCircle } from 'lucide-react';
import { VehicleRecord, LogBookRecord, AssetRecord, StationeryRequestRecord, StationeryRequestItem } from '../types';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA, MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_UOM_DATA } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
  onSaveStationeryRequest?: (request: Partial<StationeryRequestRecord>) => void;
  onSaveLogBook?: (logbook: Partial<LogBookRecord>) => void;
  initialAssetData?: AssetRecord;
  initialLogBookData?: LogBookRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const AddStockModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    moduleName = 'ATK', 
    onSaveStationeryRequest,
    onSaveLogBook,
    initialAssetData,
    initialLogBookData,
    mode = 'create'
}) => {
  const [stationeryRequestForm, setStationeryRequestForm] = useState<Partial<StationeryRequestRecord>>({
      type: 'DAILY REQUEST',
      deliveryType: 'Dikirim',
      location: 'MODENA Head Office',
      date: new Date().toISOString().split('T')[0]
  });
  const [requestItems, setRequestItems] = useState<StationeryRequestItem[]>([{ itemId: '', qty: '', categoryId: '', uom: '' }]);

  const isArkModule = moduleName.includes('ARK') || moduleName.includes('Household');
  const isViewMode = mode === 'view';

  useEffect(() => {
    if (isOpen) {
        if (mode === 'view' && initialAssetData) {
            setStationeryRequestForm({
                type: 'DAILY REQUEST',
                date: initialAssetData.date,
                remarks: initialAssetData.itemDescription || '',
                deliveryType: 'Dikirim',
                location: 'MODENA Head Office'
            });
            setRequestItems([{ itemId: '', qty: initialAssetData.qty.toString(), categoryId: initialAssetData.category, uom: 'PCS' }]);
        } else {
            setStationeryRequestForm({ 
                type: 'DAILY REQUEST', 
                deliveryType: 'Dikirim', 
                location: 'MODENA Head Office', 
                date: new Date().toISOString().split('T')[0],
                remarks: ''
            });
            setRequestItems([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
        }
    }
  }, [isOpen, initialAssetData, mode]);

  const handleSave = () => {
      if (onSaveStationeryRequest) onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
  }

  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => setStationeryRequestForm(prev => ({ ...prev, [field]: value }));

  const handleRequestItemChange = (index: number, field: keyof StationeryRequestItem, value: string) => {
      const newItems = [...requestItems];
      if (field === 'itemId') {
          const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
          const product = masterList.find(m => m.id.toString() === value);
          newItems[index] = { ...newItems[index], [field]: value, uom: product?.uom || '' };
      } else {
          newItems[index] = { ...newItems[index], [field]: value };
      }
      setRequestItems(newItems);
  }

  const addRequestItemRow = () => setRequestItems([...requestItems, { itemId: '', qty: '', categoryId: '', uom: '' }]);
  const removeRequestItemRow = (index: number) => { if (requestItems.length > 1) setRequestItems(requestItems.filter((_, i) => i !== index)); }

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon size={18} className="text-black" />
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-[2px] p-4 transition-opacity duration-300">
      <div className={`bg-[#F8F9FA] w-full ${isViewMode ? 'max-w-7xl' : 'max-w-5xl'} rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] transform transition-all scale-100`}>
        {/* Header */}
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
              <h2 className="text-[14px] font-black text-black uppercase tracking-widest">
                {isViewMode ? 'View Request Details' : (isArkModule ? 'CREATE HOUSEHOLD REQUEST' : 'CREATE STATIONERY REQUEST')}
              </h2>
          </div>
          <button className="text-gray-300 hover:text-red-500 transition-colors p-1" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="space-y-6">
                 {/* ORDER SETUP Section */}
                 <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                     <SectionHeader icon={FileText} title="ORDER SETUP" />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">ORDER TYPE</label>
                            <select 
                                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-[12px] font-black bg-white uppercase shadow-sm focus:border-black outline-none transition-all appearance-none" 
                                value={stationeryRequestForm.type} 
                                onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                                disabled={isViewMode}
                            >
                                <option value="DAILY REQUEST">DAILY REQUEST</option>
                                <option value="EVENT REQUEST">EVENT REQUEST</option>
                            </select>
                         </div>
                         <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">REQUEST DATE</label>
                            <input 
                                type="date" 
                                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-[12px] font-black bg-white shadow-sm focus:border-black outline-none transition-all" 
                                value={stationeryRequestForm.date} 
                                onChange={(e) => handleStationeryRequestChange('date', e.target.value)} 
                                disabled={isViewMode}
                            />
                         </div>
                     </div>
                 </div>

                 {/* ITEMS LIST Section */}
                 <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <SectionHeader icon={List} title="ITEMS LIST" />
                        {!isViewMode && (
                            <button 
                                onClick={addRequestItemRow} 
                                className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all"
                            >
                                + ADD ROW
                            </button>
                        )}
                    </div>
                    
                    <div className="overflow-hidden border border-gray-100 rounded-2xl mb-6">
                         <table className="w-full text-left">
                             <thead className="bg-[#F8F9FA] text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                 <tr>
                                     <th className="p-4 w-12 text-center">#</th>
                                     <th className="p-4">PRODUCT NAME</th>
                                     <th className="p-4 w-32 text-center">UOM</th>
                                     <th className="p-4 w-32 text-center">QTY</th>
                                     {!isViewMode && <th className="p-4 w-12 text-center"></th>}
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-50">
                                 {requestItems.map((item, idx) => {
                                     const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                     return (
                                     <tr key={idx}>
                                         <td className="p-4 text-center text-gray-300 font-black text-[12px]">{idx + 1}</td>
                                         <td className="p-4">
                                             <select 
                                                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-[12px] font-black bg-white shadow-sm appearance-none focus:border-black outline-none" 
                                                value={item.itemId} 
                                                onChange={(e) => handleRequestItemChange(idx, 'itemId', e.target.value)}
                                                disabled={isViewMode}
                                             >
                                                <option value="">Select Product...</option>
                                                {masterList.map(m => <option key={m.id} value={m.id}>{m.itemName} - {m.itemCode}</option>)}
                                             </select>
                                         </td>
                                         <td className="p-4 text-center">
                                             <span className="text-[11px] font-black text-gray-400 uppercase">{item.uom || '-'}</span>
                                         </td>
                                         <td className="p-4 text-center">
                                            <input 
                                                type="number" 
                                                className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-[12px] font-black text-center bg-white shadow-sm focus:border-black outline-none" 
                                                value={item.qty} 
                                                onChange={(e) => handleRequestItemChange(idx, 'qty', e.target.value)} 
                                                disabled={isViewMode}
                                            />
                                         </td>
                                         {!isViewMode && (
                                            <td className="p-4 text-center">
                                                <button onClick={() => removeRequestItemRow(idx)} className="text-gray-300 hover:text-red-500 transition-all">
                                                    <X size={18} />
                                                </button>
                                            </td>
                                         )}
                                     </tr>
                                 )})}
                             </tbody>
                         </table>
                    </div>
                    
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">REMARKS</label>
                        <textarea 
                            rows={3} 
                            className="w-full border border-gray-200 rounded-2xl p-5 text-[12px] font-medium text-black bg-gray-50/30 focus:border-black outline-none resize-none transition-all shadow-sm" 
                            placeholder="Add remarks for this request..." 
                            value={stationeryRequestForm.remarks} 
                            onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)} 
                            disabled={isViewMode}
                        />
                    </div>
                 </div>

                 {/* DELIVERY SETUP Section */}
                 <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <SectionHeader icon={MapPin} title="DELIVERY SETUP" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">LOCATION</label>
                            <select 
                                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-[12px] font-black bg-white uppercase shadow-sm focus:border-black outline-none transition-all appearance-none" 
                                value={stationeryRequestForm.location} 
                                onChange={(e) => handleStationeryRequestChange('location', e.target.value)}
                                disabled={isViewMode}
                            >
                                <option value="MODENA Head Office">MODENA Head Office</option>
                                <option value="Warehouse Cakung">Warehouse Cakung</option>
                                <option value="Showroom Kuningan">Showroom Kuningan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">METHOD</label>
                            <div className="flex gap-4">
                                {['Dikirim', 'Ambil Sendiri'].map(m => (
                                    <button 
                                        key={m}
                                        onClick={() => handleStationeryRequestChange('deliveryType', m)}
                                        disabled={isViewMode}
                                        className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all 
                                            ${stationeryRequestForm.deliveryType === m ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
            <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all">CANCEL</button>
            {!isViewMode && <button onClick={handleSave} className="px-12 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95">SAVE DATA</button>}
        </div>
      </div>
    </div>
  );
};
