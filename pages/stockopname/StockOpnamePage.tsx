import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { StockOpnameTable } from '../../components/StockOpnameTable';
import { StockOpnameRecord, MasterItem } from '../../types';

// Stock Opname Form
interface StockOpnameFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (records: StockOpnameRecord[]) => void;
    initialData?: StockOpnameRecord[];
    mode: 'create' | 'view' | 'approve';
    masterItems: MasterItem[];
    onApprove?: (opnameId: string, status: 'Approved' | 'Rejected', note?: string) => void;
}

const StockOpnameForm: React.FC<StockOpnameFormProps> = ({ 
    isOpen, onClose, onSave, initialData, mode, masterItems, onApprove 
}) => {
    const [opnameId] = useState(`OPN-${Date.now()}`);
    const [opnameDate, setOpnameDate] = useState(new Date().toISOString().split('T')[0]);
    const [location, setLocation] = useState('HO Warehouse');
    const [items, setItems] = useState<Array<{
        itemId: string;
        itemName: string;
        systemQty: number;
        actualQty: number;
        difference: number;
        notes: string;
    }>>([]);
    const [approvalNote, setApprovalNote] = useState('');

    const isViewMode = mode === 'view' || mode === 'approve';

    const addItem = () => {
        setItems([...items, {
            itemId: '',
            itemName: '',
            systemQty: 0,
            actualQty: 0,
            difference: 0,
            notes: ''
        }]);
    };

    const updateItem = (index: number, field: string, value: any) => {
        const updated = [...items];
        (updated[index] as any)[field] = value;
        
        // Auto calculate difference
        if (field === 'actualQty' || field === 'systemQty') {
            updated[index].difference = updated[index].actualQty - updated[index].systemQty;
        }
        
        // Auto fill system qty from master
        if (field === 'itemId') {
            const masterItem = masterItems.find(m => String(m.id) === value);
            if (masterItem) {
                updated[index].itemName = masterItem.itemName;
                updated[index].systemQty = masterItem.remainingStock;
                updated[index].difference = updated[index].actualQty - masterItem.remainingStock;
            }
        }
        
        setItems(updated);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        const records: StockOpnameRecord[] = items.map((item, idx) => ({
            id: `${opnameId}-${idx}`,
            opnameId,
            opnameDate,
            location,
            itemId: item.itemId,
            itemName: item.itemName,
            systemQty: item.systemQty,
            actualQty: item.actualQty,
            difference: item.difference,
            status: item.difference === 0 ? 'MATCHED' : 'DISCREPANCY',
            statusApproval: 'Pending',
            notes: item.notes
        }));
        onSave(records);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-black uppercase tracking-wider">
                        {mode === 'create' ? 'Input Stock Opname' : mode === 'approve' ? 'Approval Stock Opname' : 'Detail Stock Opname'}
                    </h2>
                    {initialData && <p className="text-xs text-gray-400 mt-1">#{initialData[0]?.opnameId}</p>}
                </div>
                
                <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
                    {/* Header Info */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Opname ID</label>
                            <input
                                type="text"
                                value={initialData?.[0]?.opnameId || opnameId}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tanggal</label>
                            <input
                                type="date"
                                value={initialData?.[0]?.opnameDate || opnameDate}
                                onChange={(e) => setOpnameDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                disabled={isViewMode}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lokasi</label>
                            <select
                                value={initialData?.[0]?.location || location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                disabled={isViewMode}
                            >
                                <option value="HO Warehouse">HO Warehouse</option>
                                <option value="Branch A">Branch A</option>
                                <option value="Branch B">Branch B</option>
                            </select>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-4 py-3 font-bold text-xs text-gray-500 uppercase">Item</th>
                                    <th className="text-center px-4 py-3 font-bold text-xs text-gray-500 uppercase">Sistem</th>
                                    <th className="text-center px-4 py-3 font-bold text-xs text-gray-500 uppercase">Aktual</th>
                                    <th className="text-center px-4 py-3 font-bold text-xs text-gray-500 uppercase">Selisih</th>
                                    <th className="text-left px-4 py-3 font-bold text-xs text-gray-500 uppercase">Catatan</th>
                                    {!isViewMode && <th className="w-10"></th>}
                                </tr>
                            </thead>
                            <tbody>
                                {(initialData || items).map((item, idx) => (
                                    <tr key={idx} className="border-t border-gray-100">
                                        <td className="px-4 py-2">
                                            {isViewMode ? (
                                                <span>{item.itemName}</span>
                                            ) : (
                                                <select
                                                    value={(item as any).itemId || ''}
                                                    onChange={(e) => updateItem(idx, 'itemId', e.target.value)}
                                                    className="w-full px-2 py-1 border border-gray-200 rounded-lg text-sm"
                                                >
                                                    <option value="">Pilih Item</option>
                                                    {masterItems.map(m => (
                                                        <option key={m.id} value={m.id}>{m.itemName}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 text-center font-mono">{item.systemQty}</td>
                                        <td className="px-4 py-2 text-center">
                                            {isViewMode ? (
                                                <span className="font-mono">{item.actualQty}</span>
                                            ) : (
                                                <input
                                                    type="number"
                                                    value={(item as any).actualQty || 0}
                                                    onChange={(e) => updateItem(idx, 'actualQty', parseInt(e.target.value))}
                                                    className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-center text-sm"
                                                />
                                            )}
                                        </td>
                                        <td className={`px-4 py-2 text-center font-mono font-bold ${item.difference !== 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {item.difference > 0 ? '+' : ''}{item.difference}
                                        </td>
                                        <td className="px-4 py-2">
                                            {isViewMode ? (
                                                <span className="text-gray-500">{item.notes || '-'}</span>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={(item as any).notes || ''}
                                                    onChange={(e) => updateItem(idx, 'notes', e.target.value)}
                                                    className="w-full px-2 py-1 border border-gray-200 rounded-lg text-sm"
                                                    placeholder="Catatan..."
                                                />
                                            )}
                                        </td>
                                        {!isViewMode && (
                                            <td className="px-2">
                                                <button onClick={() => removeItem(idx)} className="text-red-500 hover:text-red-700">×</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!isViewMode && (
                            <div className="p-3 border-t border-gray-100">
                                <button onClick={addItem} className="text-sm font-bold text-blue-600 hover:text-blue-800">+ Tambah Item</button>
                            </div>
                        )}
                    </div>

                    {/* Approval Section */}
                    {mode === 'approve' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Catatan Approval</label>
                            <textarea
                                value={approvalNote}
                                onChange={(e) => setApprovalNote(e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                placeholder="Tambahkan catatan..."
                            />
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
                        {isViewMode ? 'Tutup' : 'Batal'}
                    </button>
                    {mode === 'approve' && onApprove && initialData && (
                        <>
                            <button 
                                onClick={() => onApprove(initialData[0].opnameId!, 'Rejected', approvalNote)}
                                className="px-6 py-2 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600"
                            >
                                Reject
                            </button>
                            <button 
                                onClick={() => onApprove(initialData[0].opnameId!, 'Approved', approvalNote)}
                                className="px-6 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600"
                            >
                                Approve
                            </button>
                        </>
                    )}
                    {mode === 'create' && (
                        <button onClick={handleSubmit} className="px-6 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800">
                            Simpan
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main Page Components
interface StockOpnamePageProps {
    data: StockOpnameRecord[];
    masterItems: MasterItem[];
    onSave: (records: StockOpnameRecord[]) => void;
    onImportClick: () => void;
}

export const StockOpnamePage: React.FC<StockOpnamePageProps> = ({ data, masterItems, onSave, onImportClick }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        mode: 'create' | 'view';
        data?: StockOpnameRecord[];
    }>({ isOpen: false, mode: 'create' });

    const filteredData = activeTab === 'SEMUA' ? data : data.filter(s => s.status === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'MATCHED', 'DISCREPANCY']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => setModalState({ isOpen: true, mode: 'create' })} 
                customAddLabel="TAMBAH DATA" 
                onImportClick={onImportClick}
            />
            <StockOpnameTable 
                data={filteredData} 
                onView={(i) => {
                    const opnameItems = data.filter(so => so.opnameId === i.opnameId);
                    setModalState({ isOpen: true, mode: 'view', data: opnameItems });
                }} 
            />

            <StockOpnameForm
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, mode: 'create' })}
                onSave={(records) => { onSave(records); setModalState({ isOpen: false, mode: 'create' }); }}
                initialData={modalState.data}
                mode={modalState.mode}
                masterItems={masterItems}
            />
        </>
    );
};

// Approval Page
interface StockOpnameApprovalPageProps {
    data: StockOpnameRecord[];
    masterItems: MasterItem[];
    onApprove: (opnameId: string, status: 'Approved' | 'Rejected', note?: string) => void;
}

export const StockOpnameApprovalPage: React.FC<StockOpnameApprovalPageProps> = ({ data, masterItems, onApprove }) => {
    const [activeTab, setActiveTab] = useState('SEMUA');
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        data?: StockOpnameRecord[];
    }>({ isOpen: false });

    const filteredData = activeTab === 'SEMUA'
        ? data.filter(s => s.statusApproval === 'Pending')
        : data.filter(s => s.statusApproval?.toUpperCase() === activeTab);

    return (
        <>
            <FilterBar 
                tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={() => {}} 
                hideAdd={true}
            />
            <StockOpnameTable 
                data={filteredData} 
                onView={(i) => {
                    const opnameItems = data.filter(so => so.opnameId === i.opnameId);
                    setModalState({ isOpen: true, data: opnameItems });
                }} 
            />

            <StockOpnameForm
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false })}
                onSave={() => {}}
                initialData={modalState.data}
                mode="approve"
                masterItems={masterItems}
                onApprove={(opnameId, status, note) => {
                    onApprove(opnameId, status, note);
                    setModalState({ isOpen: false });
                }}
            />
        </>
    );
};

export default StockOpnamePage;
