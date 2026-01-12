
import React from 'react';
import { Search, Plus, Download, Upload, Filter, Grid, List, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
  onExportClick?: () => void;
  onImportClick?: () => void;
  onSyncClick?: () => void;
  searchPlaceholder?: string;
  moduleName?: string;
  hideAdd?: boolean;
  hideImport?: boolean;
  hideExport?: boolean;
  customAddLabel?: string;
  podFilters?: { lantai: string; jenisKamar: string; };
  onPodFilterChange?: (field: string, value: string) => void;
}

export const FilterBar: React.FC<Props> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  onAddClick, 
  onExportClick,
  onImportClick,
  onSyncClick,
  searchPlaceholder, 
  moduleName,
  hideAdd = false,
  hideImport = false,
  hideExport = false,
  customAddLabel,
  podFilters,
  onPodFilterChange
}) => {
  const { t } = useLanguage();
  const isService = moduleName === 'Servis';

  // Determine button label
  let addButtonLabel = t('Add Data');
  if (customAddLabel) {
      addButtonLabel = customAddLabel; // Already translated in App.tsx
  } else if (isService) {
      addButtonLabel = t('New Request');
  }

  return (
    <div className="mb-10 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left Side: Pill Tabs */}
        <div className="flex bg-white rounded-2xl p-2 shadow-md border-2 border-gray-100 gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const isApprovalTab = tab.toLowerCase().includes('persetujuan') || tab === 'APPROVED';
            
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 rounded-xl flex items-center gap-2
                ${isActive 
                  ? 'bg-gradient-to-r from-black to-gray-800 text-white shadow-lg shadow-black/20 scale-105' 
                  : 'text-gray-400 hover:text-black hover:bg-gray-50 hover:scale-102'
                }`}
              >
                {t(tab)}
                {/* Mock counter for demo */}
                {isApprovalTab && (
                   <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600 border border-red-200'}`}>3</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Right Side: Search & Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative group hidden xl:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={searchPlaceholder || t("Search...")} 
              className="w-72 bg-white pl-12 pr-4 py-3.5 text-[12px] font-bold border-2 border-gray-200 rounded-2xl hover:border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm focus:shadow-lg focus:ring-4 focus:ring-black/5"
            />
          </div>
          
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm h-[46px]">
            <button className="flex items-center justify-center w-11 h-full border-r-2 border-gray-100 text-gray-400 hover:text-black hover:bg-gray-50 transition-all">
              <Grid size={18} />
            </button>
            <button className="flex items-center justify-center w-11 h-full bg-gray-50 text-black transition-all">
              <List size={18} />
            </button>
          </div>

          <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm h-[46px]">
            {onSyncClick && (
                <button 
                  onClick={onSyncClick}
                  className="flex items-center gap-2 px-5 h-full border-r-2 border-gray-100 text-gray-500 hover:text-black hover:bg-gray-50 transition-all text-[10px] font-black uppercase tracking-widest"
                  title="Synchronize Data"
                >
                <RefreshCw size={16} strokeWidth={2.5} /> <span className="hidden sm:inline">{t('SYNC')}</span>
                </button>
            )}
            {!hideImport && (
                <button 
                  onClick={onImportClick}
                  className="flex items-center gap-2 px-5 h-full border-r-2 border-gray-100 text-gray-500 hover:text-black hover:bg-gray-50 transition-all text-[10px] font-black uppercase tracking-widest"
                >
                <Upload size={16} strokeWidth={2.5} /> <span className="hidden sm:inline">{t('IMPORT')}</span>
                </button>
            )}
            {!hideExport && (
                <button 
                  onClick={onExportClick}
                  className="flex items-center gap-2 px-5 h-full border-r-2 border-gray-100 text-gray-500 hover:text-black hover:bg-gray-50 transition-all text-[10px] font-black uppercase tracking-widest"
                >
                <Download size={16} strokeWidth={2.5} /> <span className="hidden sm:inline">{t('EXPORT')}</span>
                </button>
            )}
            <button className="flex items-center gap-2 px-5 h-full text-gray-500 hover:text-black hover:bg-gray-50 transition-all text-[10px] font-black uppercase tracking-widest">
              <Filter size={16} strokeWidth={2.5} /> <span className="hidden sm:inline">{t('FILTER')}</span>
            </button>
          </div>

          {!hideAdd && (
            <button 
              onClick={onAddClick}
              className="bg-gradient-to-r from-black to-gray-800 text-white px-8 h-[46px] rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:from-gray-900 hover:to-black transition-all shadow-xl shadow-black/30 hover:scale-105 hover:shadow-2xl active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} strokeWidth={3} /> {addButtonLabel}
            </button>
          )}
        </div>
      </div>

      {podFilters && onPodFilterChange && (
        <div className="flex flex-wrap gap-4 items-center bg-gradient-to-r from-gray-50 to-white p-4 rounded-2xl border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                    <Filter size={14} className="text-gray-500" />
                </div>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Additional Filters:</span>
            </div>
            <select 
                className="bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-[11px] font-bold outline-none cursor-pointer hover:border-gray-300 focus:border-black transition-all shadow-sm"
                value={podFilters.lantai}
                onChange={(e) => onPodFilterChange('lantai', e.target.value)}
            >
                <option value="">Semua Lantai</option>
                <option value="Lt 2 Pria">Lt 2 Pria</option>
                <option value="Lt 2 Perempuan">Lt 2 Perempuan</option>
                <option value="Lt 3 Pria">Lt 3 Pria</option>
                <option value="Lt 3 Perempuan">Lt 3 Perempuan</option>
            </select>
            <select 
                className="bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-[11px] font-bold outline-none cursor-pointer hover:border-gray-300 focus:border-black transition-all shadow-sm"
                value={podFilters.jenisKamar}
                onChange={(e) => onPodFilterChange('jenisKamar', e.target.value)}
            >
                <option value="">Semua Tipe Kamar</option>
                <option value="Single Bed">Single Bed</option>
                <option value="Double Bed">Double Bed</option>
                <option value="Quadruple Bed">Quadruple Bed</option>
            </select>
        </div>
      )}
    </div>
  );
};
