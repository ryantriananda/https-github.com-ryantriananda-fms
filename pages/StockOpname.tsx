import React, { useState } from 'react';
import { FilterBar } from '../components/FilterBar';
import { Eye, Edit2, Trash2, X } from 'lucide-react';

interface StockOpnameItem {
  id: number;
  tanggal: string;
  lokasi: string;
  kategori: string;
  namaBarang: string;
  kodeBarang: string;
  stokSistem: number;
  stokFisik: number;
  selisih: number;
  keterangan: string;
  status: string;
  petugas: string;
}

const StockOpname: React.FC = () => {
  const [data, setData] = useState<StockOpnameItem[]>([
    { id: 1, tanggal: '2026-01-02', lokasi: 'Gudang Pusat', kategori: 'ATK', namaBarang: 'Kertas A4', kodeBarang: 'ATK-001', stokSistem: 100, stokFisik: 98, selisih: -2, keterangan: 'Selisih minor', status: 'Selesai', petugas: 'John Doe' },
    { id: 2, tanggal: '2026-01-02', lokasi: 'Cabang Jakarta', kategori: 'ARK', namaBarang: 'Sabun Cuci', kodeBarang: 'ARK-001', stokSistem: 50, stokFisik: 50, selisih: 0, keterangan: 'Sesuai', status: 'Selesai', petugas: 'Jane Doe' },
    { id: 3, tanggal: '2026-01-01', lokasi: 'Cabang Surabaya', kategori: 'ATK', namaBarang: 'Pulpen', kodeBarang: 'ATK-002', stokSistem: 200, stokFisik: 195, selisih: -5, keterangan: 'Perlu investigasi', status: 'Draft', petugas: 'Bob Wilson' },
  ]);
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<StockOpnameItem | null>(null);
  const [form, setForm] = useState<Partial<StockOpnameItem>>({});

  const openModal = (mode: 'create' | 'edit' | 'view', item?: StockOpnameItem) => {
    setModalMode(mode);
    setSelectedItem(item || null);
    setForm(item || { 
      tanggal: new Date().toISOString().split('T')[0], 
      lokasi: '', kategori: '', namaBarang: '', kodeBarang: '',
      stokSistem: 0, stokFisik: 0, keterangan: '', petugas: '', status: 'Draft'
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const selisih = (form.stokFisik || 0) - (form.stokSistem || 0);
    if (modalMode === 'create') {
      setData([...data, { ...form, id: Date.now(), selisih } as StockOpnameItem]);
    } else {
      setData(data.map(d => d.id === selectedItem?.id ? { ...d, ...form, selisih } : d));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus?')) setData(data.filter(d => d.id !== id));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Draft': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSelisihStyle = (selisih: number) => {
    if (selisih === 0) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (selisih < 0) return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  const filteredData = activeTab === 'SEMUA' ? data : data.filter(item => item.status.toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'DRAFT', 'SELESAI']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="Tambah Stock Opname"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Tanggal</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Lokasi</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Kategori</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Nama Barang</th>
                <th className="text-right py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Stok Sistem</th>
                <th className="text-right py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Stok Fisik</th>
                <th className="text-center py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Selisih</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Petugas</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-right py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr><td colSpan={10} className="py-12 text-center text-gray-400 text-sm">Tidak ada data</td></tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.tanggal}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{item.lokasi}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-gray-100 text-gray-600">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.namaBarang}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-right">{item.stokSistem}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 text-right font-medium">{item.stokFisik}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getSelisihStyle(item.selisih)}`}>
                        {item.selisih > 0 ? '+' : ''}{item.selisih}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.petugas}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openModal('view', item)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><Eye size={16} /></button>
                        <button onClick={() => openModal('edit', item)} className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">{modalMode === 'create' ? 'Tambah' : modalMode === 'edit' ? 'Edit' : 'Detail'} Stock Opname</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Tanggal</label>
                  <input type="date" value={form.tanggal || ''} onChange={e => setForm({...form, tanggal: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Lokasi</label>
                  <input type="text" value={form.lokasi || ''} onChange={e => setForm({...form, lokasi: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" placeholder="Gudang Pusat" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Nama Barang</label>
                  <input type="text" value={form.namaBarang || ''} onChange={e => setForm({...form, namaBarang: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Kode Barang</label>
                  <input type="text" value={form.kodeBarang || ''} onChange={e => setForm({...form, kodeBarang: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Kategori</label>
                  <select value={form.kategori || ''} onChange={e => setForm({...form, kategori: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50">
                    <option value="">Pilih Kategori</option>
                    <option value="ATK">ATK</option>
                    <option value="ARK">ARK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Status</label>
                  <select value={form.status || ''} onChange={e => setForm({...form, status: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50">
                    <option value="Draft">Draft</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Stok Sistem</label>
                  <input type="number" value={form.stokSistem || 0} onChange={e => setForm({...form, stokSistem: Number(e.target.value)})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Stok Fisik</label>
                  <input type="number" value={form.stokFisik || 0} onChange={e => setForm({...form, stokFisik: Number(e.target.value)})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
              </div>
              {modalMode === 'view' && (
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Selisih</label>
                  <div className={`px-4 py-3 text-sm font-bold rounded-xl ${getSelisihStyle(form.selisih || 0)}`}>
                    {(form.selisih || 0) > 0 ? '+' : ''}{form.selisih || 0}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Petugas</label>
                <input type="text" value={form.petugas || ''} onChange={e => setForm({...form, petugas: e.target.value})} disabled={modalMode === 'view'}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Keterangan</label>
                <textarea value={form.keterangan || ''} onChange={e => setForm({...form, keterangan: e.target.value})} disabled={modalMode === 'view'} rows={2}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Tutup</button>
              {modalMode !== 'view' && <button onClick={handleSave} className="px-6 py-3 text-sm font-bold text-white bg-black rounded-xl hover:bg-gray-900 transition-colors">Simpan</button>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockOpname;
