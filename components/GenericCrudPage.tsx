import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, X } from 'lucide-react';

const API_URL = 'http://localhost:8080/api';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface Field {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface Props {
  title: string;
  description?: string;
  endpoint: string;
  columns: Column[];
  fields: Field[];
  defaultValues?: Record<string, any>;
}

export const GenericCrudPage: React.FC<Props> = ({
  title,
  description,
  endpoint,
  columns,
  fields,
  defaultValues = {},
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [form, setForm] = useState<Record<string, any>>(defaultValues);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${endpoint}`);
      if (response.ok) {
        const result = await response.json();
        setData(Array.isArray(result) ? result : result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = modalMode === 'edit' 
        ? `${API_URL}/${endpoint}/${selectedItem.id}`
        : `${API_URL}/${endpoint}`;
      
      const response = await fetch(url, {
        method: modalMode === 'edit' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        fetchData();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const openModal = (mode: 'create' | 'edit' | 'view', item?: any) => {
    setModalMode(mode);
    setSelectedItem(item || null);
    if (item) {
      setForm(item);
    } else {
      setForm(defaultValues);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setForm(defaultValues);
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderField = (field: Field) => {
    const value = form[field.key] ?? '';
    const isDisabled = modalMode === 'view';

    switch (field.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            disabled={isDisabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Pilih {field.label}</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            disabled={isDisabled}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })}
            disabled={isDisabled}
            className="rounded"
          />
        );
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => setForm({ ...form, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
            disabled={isDisabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        );
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-sm text-gray-500">{filteredData.length} data</span>
        </div>
        <button
          onClick={() => openModal('create')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Tambah Data
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-500">Tidak ada data</td>
                </tr>
              ) : (
                filteredData.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50">
                    {columns.map(col => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {col.render ? col.render(item[col.key], item) : item[col.key] || '-'}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => openModal('view', item)} className="text-gray-600 hover:text-gray-900 mr-3">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => openModal('edit', item)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {modalMode === 'create' ? 'Tambah Data' : modalMode === 'edit' ? 'Edit Data' : 'Detail Data'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {fields.map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
            {modalMode !== 'view' && (
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={handleCloseModal} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Batal
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Simpan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericCrudPage;
