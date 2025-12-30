
import React, { useState, useEffect } from 'react';
import { X, Save, ChevronsUpDown, Building2 } from 'lucide-react';
import { GeneralAssetRecord, GeneralMasterItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<GeneralAssetRecord>) => void;
  initialData?: Partial<GeneralAssetRecord>;
  mode?: 'create' | 'edit' | 'view';
  assetTypeList?: GeneralMasterItem[];
  categoryList?: GeneralMasterItem[];
  locationList?: GeneralMasterItem[];
  departmentList?: GeneralMasterItem[];
}

export const AssetGeneralModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    assetTypeList = [],
    categoryList = [],
    locationList = [],
    departmentList = []
}) => {
  const [form, setForm] = useState<Partial<GeneralAssetRecord>>({
    assetNumber: '[Auto Generate]',
    assetCategory: '',
    ownership: 'Rent',
    type: '',
    assetLocation: '',
    channel: '',
    department: '',
    subLocation: '',
    address: '',
    purchasePrice: '',
    purchaseDate: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(prev => ({ ...prev, ...initialData }));
      } else {
        setForm({
          assetNumber: '[Auto Generate]',
          assetCategory: '',
          ownership: 'Rent',
          type: '',
          assetLocation: '',
          channel: '',
          department: '',
          subLocation: '',
          address: '',
          purchasePrice: '',
          purchaseDate: ''
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  // Fix: make children optional to resolve TS error where children are passed via JSX but reported as missing
  const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-2.5">
      {children} {required && <span className="text-red-500 font-black ml-1">*</span>}
    </label>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
      {...props}
      disabled={isView || props.disabled}
      className={`w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm disabled:bg-gray-50/50 disabled:text-gray-400 ${props.className || ''}`}
    />
  );

  const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div className="relative">
      <select 
        {...props}
        disabled={isView || props.disabled}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[12px] font-black text-black focus:border-black outline-none transition-all appearance-none disabled:bg-gray-50/50 disabled:text-gray-400 shadow-sm cursor-pointer uppercase"
      >
        {props.children}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronsUpDown size={16} strokeWidth={3} />
      </div>
    </div>
  );

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#FBFBFB] w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-12 py-10 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-black rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl shadow-black/20">
              <Building2 size={28} />
            </div>
            <div>
              <h2 className="text-[22px] font-black text-black uppercase tracking-tight leading-none">General Information</h2>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Building Asset & Contract Details</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black p-3 rounded-full hover:bg-gray-50 transition-all">
            <X size={32} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content - Two Column Grid like Image 1 */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            
            {/* Left Column Fields */}
            <div className="space-y-10">
              <div>
                <Label>Asset Number</Label>
                <Input value={form.assetNumber} readOnly disabled className="bg-gray-50 text-gray-400" />
              </div>
              
              <div>
                <Label required>Type</Label>
                <Select 
                  value={form.type} 
                  onChange={(e) => setForm({...form, type: e.target.value})} 
                >
                  <option value="">(PILIH TIPE)</option>
                  {assetTypeList.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </Select>
              </div>

              <div>
                <Label required>Asset Location</Label>
                <Select 
                  value={form.assetLocation} 
                  onChange={(e) => setForm({...form, assetLocation: e.target.value})}
                >
                  <option value="">(PILIH LOKASI)</option>
                  {locationList.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
                </Select>
              </div>

              <div>
                <Label required>Department</Label>
                <Select 
                  value={form.department} 
                  onChange={(e) => setForm({...form, department: e.target.value})}
                >
                  <option value="">(PILIH DEPARTEMEN)</option>
                  {departmentList.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </Select>
              </div>

              {/* Purchase Date */}
              <div>
                <Label>Purchase Date</Label>
                <Input 
                  type="date"
                  value={form.purchaseDate} 
                  onChange={(e) => setForm({...form, purchaseDate: e.target.value})} 
                />
              </div>
            </div>

            {/* Right Column Fields */}
            <div className="space-y-10">
              <div>
                <Label>Asset Category</Label>
                <Select 
                  value={form.assetCategory} 
                  onChange={(e) => setForm({...form, assetCategory: e.target.value})} 
                >
                  <option value="">(PILIH KATEGORI)</option>
                  {categoryList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </Select>
              </div>

              <div>
                <Label>Ownership</Label>
                <Input 
                  value={form.ownership} 
                  onChange={(e) => setForm({...form, ownership: e.target.value})} 
                />
              </div>

              <div>
                <Label required>Channel</Label>
                <Select 
                  value={form.channel} 
                  onChange={(e) => setForm({...form, channel: e.target.value})}
                >
                  <option value="">Select Channel...</option>
                  <option value="Direct">Direct</option>
                  <option value="Indirect">Indirect</option>
                  <option value="HCO">HCO</option>
                </Select>
              </div>

              <div>
                <Label>Sub Location</Label>
                <Input 
                  value={form.subLocation} 
                  onChange={(e) => setForm({...form, subLocation: e.target.value})} 
                  placeholder="Input Sub-Location (e.g. Floor)..."
                />
              </div>

              {/* Purchase Price */}
              <div className="relative">
                <Label>Purchase Price (IDR)</Label>
                <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">Rp</span>
                    <Input 
                      type="number"
                      className="pl-10"
                      value={form.purchasePrice} 
                      onChange={(e) => setForm({...form, purchasePrice: e.target.value})} 
                      placeholder="0"
                    />
                </div>
              </div>
            </div>

            {/* Full Width Bottom Address */}
            <div className="md:col-span-2 mt-4">
              <Label>Address</Label>
              <div className="relative">
                <textarea 
                  disabled={isView}
                  maxLength={255}
                  value={form.address}
                  onChange={(e) => setForm({...form, address: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-[2rem] px-8 py-6 text-[13px] font-black text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm min-h-[140px] resize-none leading-relaxed"
                  placeholder="(max. 255 characters)"
                />
                <div className="absolute bottom-6 right-8 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  {form.address?.length || 0} / 255
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-12 py-10 bg-white border-t border-gray-100 flex justify-end gap-6 shrink-0">
          <button 
            onClick={onClose} 
            className="px-12 py-5 text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 hover:text-black transition-all"
          >
            Cancel
          </button>
          {!isView && (
            <button 
              onClick={handleSave} 
              className="px-20 py-5 text-[11px] font-black uppercase tracking-[0.25em] text-white bg-black rounded-2xl shadow-2xl shadow-black/20 hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-4"
            >
              <Save size={18} strokeWidth={3} /> {mode === 'create' ? 'Submit Asset Request' : 'Save Information'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
