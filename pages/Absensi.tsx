import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, Clock, CheckCircle, XCircle } from 'lucide-react';

interface AbsensiItem {
  id: string;
  tanggal: string;
  nama: string;
  nip: string;
  departemen: string;
  jamMasuk: string;
  jamKeluar: string;
  status: string;
  keterangan: string;
}

const Absensi: React.FC = () => {
  const [data, setData] = useState<AbsensiItem[]>([
    { id: 'ABS-001', tanggal: '2026-01-02', nama: 'John Doe', nip: 'EMP001', departemen: 'IT', jamMasuk: '08:00', jamKeluar: '17:00', status: 'Hadir', keterangan: '' },
    { id: 'ABS-002', tanggal: '2026-01-02', nama: 'Jane Smith', nip: 'EMP002', departemen: 'HR', jamMasuk: '08:15', jamKeluar: '17:30', status: 'Terlambat', keterangan: 'Macet' },
    { id: 'ABS-003', tanggal: '2026-01-02', nama: 'Bob Wilson', nip: 'EMP003', departemen: 'Finance', jamMasuk: '-', jamKeluar: '-', status: 'Izin', keterangan: 'Sakit' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<AbsensiItem | null>(null);
  const [form, setForm] = useState({ tanggal: '', nama: '', nip: '', departemen: '', jamMasuk: '', jamKeluar: '', status: '', keterangan: '' });

  const openModal = (mode: 'create' | 'edit' | 'view', item?: AbsensiItem) => {
    setModalMode(mode);
    setSelectedItem(item || null);
    if (item) setForm({ ...item });
    else setForm({ tanggal: new Date().toISOString().split('T')[0], nama: '', nip: '', departemen: '', jamMasuk: '', jamKeluar: '', status: 'Hadir', keterangan: '' });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      setData([...data, { ...form, id: `ABS-${Date.now()}` } as AbsensiItem]);
    } else {
      setData(data.map(d => d.id === selectedItem?.id ? { ...d, ...form } : d));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus?')) setData(data.filter(d => d.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hadir': return 'bg-green-100 text-green-800';
      case 'Terlambat': return 'bg-yellow-100 text-yellow-800';
      case 'Izin': return 'bg-blue-100 text-blue-800';
      case 'Sakit': return 'bg-orange-100 text-orange-800';
      case 'Alpha': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = data.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Absensi</h1>
        <p className="text-sm text-gray-600">Kelola data absensi karyawan</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Cari nama/NIP..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <span className="text-sm text-gray-500">{filteredData.length} data</span>
        </div>
        <button onClick={() => openModal('create')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} /> Tambah Absensi
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departemen</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jam Masuk</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jam Keluar</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{item.tanggal}</td>
                <td className="px-4 py-3 text-sm font-medium">{item.nip}</td>
                <td className="px-4 py-3 text-sm">{item.nama}</td>
                <td className="px-4 py-3 text-sm">{item.departemen}</td>
                <td className="px-4 py-3 text-sm">{item.jamMasuk}</td>
                <td className="px-4 py-3 text-sm">{item.jamKeluar}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>{item.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openModal('view', item)} className="text-gray-600 hover:text-gray-900 mr-2"><Eye size={18} /></button>
                  <button onClick={() => openModal('edit', item)} className="text-blue-600 hover:text-blue-900 mr-2"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">{modalMode === 'create' ? 'Tambah' : modalMode === 'edit' ? 'Edit' : 'Detail'} Absensi</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal</label>
                  <input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">NIP</label>
                  <input type="text" value={form.nip} onChange={e => setForm({...form, nip: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama</label>
                  <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Departemen</label>
                  <input type="text" value={form.departemen} onChange={e => setForm({...form, departemen: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Jam Masuk</label>
                  <input type="time" value={form.jamMasuk} onChange={e => setForm({...form, jamMasuk: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jam Keluar</label>
                  <input type="time" value={form.jamKeluar} onChange={e => setForm({...form, jamKeluar: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} disabled={modalMode === 'view'}
                  className="w-full px-3 py-2 border rounded-lg">
                  <option value="Hadir">Hadir</option>
                  <option value="Terlambat">Terlambat</option>
                  <option value="Izin">Izin</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Alpha">Alpha</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Keterangan</label>
                <textarea value={form.keterangan} onChange={e => setForm({...form, keterangan: e.target.value})} disabled={modalMode === 'view'}
                  className="w-full px-3 py-2 border rounded-lg" rows={2} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Tutup</button>
              {modalMode !== 'view' && <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Simpan</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Absensi;
