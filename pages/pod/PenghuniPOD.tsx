import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { Eye, Edit2, Trash2, LogOut, X } from 'lucide-react';

interface PODOccupantItem {
  id: number;
  podName: string;
  noKamar: string;
  namaKaryawan: string;
  nik: string;
  departemen: string;
  cabang: string;
  tglMasuk: string;
  tglKeluar: string;
  statusHuni: string;
  biayaPerBulan: number;
  metodePembayaran: string;
  keterangan: string;
}

const PenghuniPOD: React.FC = () => {
  const [data, setData] = useState<PODOccupantItem[]>([
    { id: 1, podName: 'POD Jakarta 1', noKamar: 'A-101', namaKaryawan: 'John Doe', nik: 'EMP001', departemen: 'IT', cabang: 'Jakarta', tglMasuk: '2025-06-01', tglKeluar: '', statusHuni: 'Aktif', biayaPerBulan: 1500000, metodePembayaran: 'Potong Gaji', keterangan: '' },
    { id: 2, podName: 'POD Surabaya 1', noKamar: 'B-205', namaKaryawan: 'Jane Smith', nik: 'EMP002', departemen: 'Sales', cabang: 'Surabaya', tglMasuk: '2025-01-15', tglKeluar: '2025-12-31', statusHuni: 'Keluar', biayaPerBulan: 1200000, metodePembayaran: 'Transfer', keterangan: 'Pindah ke cabang lain' },
    { id: 3, podName: 'POD Bandung 1', noKamar: 'C-102', namaKaryawan: 'Bob Wilson', nik: 'EMP003', departemen: 'Finance', cabang: 'Bandung', tglMasuk: '2025-09-01', tglKeluar: '', statusHuni: 'Aktif', biayaPerBulan: 1300000, metodePembayaran: 'Potong Gaji', keterangan: '' },
  ]);
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<PODOccupantItem | null>(null);
  const [form, setForm] = useState<Partial<PODOccupantItem>>({});

  const openModal = (mode: 'create' | 'edit' | 'view', item?: PODOccupantItem) => {
    setModalMode(mode);
    setSelectedItem(item || null);
    setForm(item || { 
      podName: '', noKamar: '', namaKaryawan: '', nik: '', departemen: '', cabang: '',
      tglMasuk: new Date().toISOString().split('T')[0], tglKeluar: '', statusHuni: 'Aktif',
      biayaPerBulan: 0, metodePembayaran: 'Potong Gaji', keterangan: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      setData([...data, { ...form, id: Date.now() } as PODOccupantItem]);
    } else {
      setData(data.map(d => d.id === selectedItem?.id ? { ...d, ...form } : d));
    }
    setIsModalOpen(false);
  };

  const handleCheckout = (item: PODOccupantItem) => {
    const tglKeluar = prompt('Tanggal keluar (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    if (!tglKeluar) return;
    setData(data.map(d => d.id === item.id ? { ...d, statusHuni: 'Keluar', tglKeluar } : d));
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus?')) setData(data.filter(d => d.id !== id));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Keluar': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  };

  const filteredData = activeTab === 'SEMUA' ? data : data.filter(item => item.statusHuni.toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'AKTIF', 'KELUAR']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="Tambah Penghuni"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">POD</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">No Kamar</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Nama Karyawan</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">NIK</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Departemen</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Tgl Masuk</th>
                <th className="text-right py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Biaya/Bulan</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-right py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr><td colSpan={9} className="py-12 text-center text-gray-400 text-sm">Tidak ada data</td></tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.podName}</td>
                    <td className="py-4 px-6 text-sm font-bold text-gray-900">{item.noKamar}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{item.namaKaryawan}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.nik}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.departemen}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.tglMasuk}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.biayaPerBulan)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(item.statusHuni)}`}>
                        {item.statusHuni}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openModal('view', item)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><Eye size={16} /></button>
                        {item.statusHuni === 'Aktif' && (
                          <>
                            <button onClick={() => handleCheckout(item)} className="p-2 text-orange-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Checkout"><LogOut size={16} /></button>
                            <button onClick={() => openModal('edit', item)} className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                          </>
                        )}
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
              <h2 className="text-lg font-black text-gray-900">{modalMode === 'create' ? 'Tambah' : modalMode === 'edit' ? 'Edit' : 'Detail'} Penghuni POD</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Nama POD</label>
                  <input type="text" value={form.podName || ''} onChange={e => setForm({...form, podName: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" placeholder="POD Jakarta 1" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">No Kamar</label>
                  <input type="text" value={form.noKamar || ''} onChange={e => setForm({...form, noKamar: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" placeholder="A-101" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Nama Karyawan</label>
                  <input type="text" value={form.namaKaryawan || ''} onChange={e => setForm({...form, namaKaryawan: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">NIK</label>
                  <input type="text" value={form.nik || ''} onChange={e => setForm({...form, nik: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Departemen</label>
                  <input type="text" value={form.departemen || ''} onChange={e => setForm({...form, departemen: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Cabang</label>
                  <input type="text" value={form.cabang || ''} onChange={e => setForm({...form, cabang: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Tanggal Masuk</label>
                  <input type="date" value={form.tglMasuk || ''} onChange={e => setForm({...form, tglMasuk: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Biaya per Bulan</label>
                  <input type="number" value={form.biayaPerBulan || 0} onChange={e => setForm({...form, biayaPerBulan: Number(e.target.value)})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Metode Pembayaran</label>
                  <select value={form.metodePembayaran || ''} onChange={e => setForm({...form, metodePembayaran: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50">
                    <option value="Potong Gaji">Potong Gaji</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Status</label>
                  <select value={form.statusHuni || ''} onChange={e => setForm({...form, statusHuni: e.target.value})} disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-black focus:ring-0 outline-none transition-colors disabled:bg-gray-50">
                    <option value="Aktif">Aktif</option>
                    <option value="Keluar">Keluar</option>
                  </select>
                </div>
              </div>
              {modalMode === 'view' && form.tglKeluar && (
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-2">Tanggal Keluar</label>
                  <input type="text" value={form.tglKeluar} disabled className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50" />
                </div>
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

export default PenghuniPOD;
