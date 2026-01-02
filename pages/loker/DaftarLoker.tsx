import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { Eye, Edit2, Trash2, X } from 'lucide-react';

interface LokerItem {
  id: number;
  nomorLoker: string;
  lokasi: string;
  lantai: string;
  ukuran: string;
  status: string;
  penggunaNama: string;
  penggunaNip: string;
  departemen: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  keterangan: string;
}

const DaftarLoker: React.FC = () => {
  const [data, setData] = useState<LokerItem[]>([
    { id: 1, nomorLoker: 'L-001', lokasi: 'Gedung A', lantai: 'Lt. 1', ukuran: 'Kecil', status: 'Terpakai', penggunaNama: 'John Doe', penggunaNip: 'EMP001', departemen: 'IT', tanggalMulai: '2025-01-01', tanggalSelesai: '2026-12-31', keterangan: '' },
    { id: 2, nomorLoker: 'L-002', lokasi: 'Gedung A', lantai: 'Lt. 1', ukuran: 'Sedang', status: 'Tersedia', penggunaNama: '', penggunaNip: '', departemen: '', tanggalMulai: '', tanggalSelesai: '', keterangan: '' },
    { id: 3, nomorLoker: 'L-003', lokasi: 'Gedung B', lantai: 'Lt. 2', ukuran: 'Besar', status: 'Rusak', penggunaNama: '', penggunaNip: '', departemen: '', tanggalMulai: '', tanggalSelesai: '', keterangan: 'Kunci rusak' },
  ]);
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<LokerItem | null>(null);
  const [form, setForm] = useState<Partial<LokerItem>>({});

  const openModal = (mode: 'create' | 'edit' | 'view', item?: LokerItem) => {
    setModalMode(mode);
    setSelectedItem(item || null);
    setForm(item || { 
      nomorLoker: '', lokasi: '', lantai: '', ukuran: 'Kecil', status: 'Tersedia', 
      penggunaNama: '', penggunaNip: '', departemen: '', tanggalMulai: '', tanggalSelesai: '', keterangan: '' 
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      setData([...data, { ...form, id: Date.now() } as LokerItem]);
    } else {
      setData(data.map(d => d.id === selectedItem?.id ? { ...d, ...form } : d));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus?')) setData(data.filter(d => d.id !== id));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Tersedia': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Terpakai': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Rusak': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredData = activeTab === 'SEMUA' ? data : data.filter(item => item.status.toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'TERSEDIA', 'TERPAKAI', 'RUSAK']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="Tambah Loker"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">No. Loker</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Lokasi</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Ukuran</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Pengguna</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Departemen</th>
                <th className="text-right py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-gray-400 text-sm">Tidak ada data</td></tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="py-4 px-6 text-sm font-bold text-gray-900">{item.nomorLoker}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.lokasi} - {item.lantai}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-gray-100 text-gray-600">
                        {item.ukuran}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{item.penggunaNama || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.departemen || '-'}</td>
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
              <h2 className="text-lg font-black text-gray-900">{modalMode === 'create' ? 'Tambah' : modalMode === 'edit' ? 'Edit' : 'Detail'} Loker</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">No. Loker</label>
                  <input type="text" value={form.nomorLoker || ''} onChange={e => setForm({...form, nomorLoker: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" placeholder="L-001" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Ukuran</label>
                  <select value={form.ukuran || ''} onChange={e => setForm({...form, ukuran: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50">
                    <option value="Kecil">Kecil</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Besar">Besar</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Lokasi</label>
                  <input type="text" value={form.lokasi || ''} onChange={e => setForm({...form, lokasi: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" placeholder="Gedung A" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Lantai</label>
                  <input type="text" value={form.lantai || ''} onChange={e => setForm({...form, lantai: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" placeholder="Lt. 1" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Status</label>
                <select value={form.status || ''} onChange={e => setForm({...form, status: e.target.value})} disabled={modalMode === 'view'}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50">
                  <option value="Tersedia">Tersedia</option>
                  <option value="Terpakai">Terpakai</option>
                  <option value="Rusak">Rusak</option>
                </select>
              </div>
              {form.status === 'Terpakai' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Nama Pengguna</label>
                      <input type="text" value={form.penggunaNama || ''} onChange={e => setForm({...form, penggunaNama: e.target.value})} disabled={modalMode === 'view'}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">NIP</label>
                      <input type="text" value={form.penggunaNip || ''} onChange={e => setForm({...form, penggunaNip: e.target.value})} disabled={modalMode === 'view'}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Departemen</label>
                    <input type="text" value={form.departemen || ''} onChange={e => setForm({...form, departemen: e.target.value})} disabled={modalMode === 'view'}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                  </div>
                </>
              )}
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

export default DaftarLoker;
