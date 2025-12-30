
import React from 'react';
import { Search, Plus, Download, Upload, Filter, Grid, List, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
  onExportClick?: () => void;
  onSyncClick?: () => void;
  searchPlaceholder?: string;
  moduleName?: string;
  hideAdd?: boolean;
  hideImport?: boolean;
  hideExport?: boolean;
  customAddLabel?: string;
}

export const FilterBar: React.FC<Props> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  onAddClick, 
  onExportClick,
  onSyncClick,
  searchPlaceholder, 
  moduleName,
  hideAdd = false,
  hideImport = false,
  hideExport = false,
  customAddLabel
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
    <div className="mb-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left Side: Pill Tabs */}
        <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const isApprovalTab = tab.toLowerCase().includes('persetujuan') || tab === 'APPROVED';
            
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all rounded-xl flex items-center gap-2
                ${isActive 
                  ? 'bg-black text-white shadow-lg shadow-black/10 scale-105' 
                  : 'text-gray-400 hover:text-black hover:bg-gray-50'
                }`}
              >
                {t(tab)}
                {/* Mock counter for demo */}
                {isApprovalTab && (
                   <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500'}`}>3</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Right Side: Search & Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative group hidden xl:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-black transition-colors" size={16} />
            <input 
              type="text" 
              placeholder={searchPlaceholder || t("Search...")} 
              className="w-64 bg-white pl-11 pr-4 py-3 text-[11px] font-bold border border-gray-200 rounded-xl focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm focus:shadow-md"
            />
          </div>
          
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm h-[42px]">
            <button className="flex items-center justify-center w-10 h-full border-r border-gray-100 text-gray-400 hover:text-black hover:bg-gray-50 transition-all">
              <Grid size={16} />
            </button>
            <button className="flex items-center justify-center w-10 h-full bg-gray-50 text-black border-r border-gray-100 transition-all">
              <List size={16} />
            </button>
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm h-[42px]">
            {onSyncClick && (
                <button 
                  onClick={onSyncClick}
                  className="flex items-center gap-2 px-4 h-full border-r border-gray-100 text-gray-500 hover:text-black hover:bg-gray-50 transition-all text-[10px] font-black uppercase tracking-widest"
                  title="Synchronize Data"
                >
                <RefreshCw size={14} /> <span className="hidden sm:inline">{t('SYNC')}</span>
                </button>
            )}
            {!hideImport && (
                <button className="flex items-center gap-2 px-4 h-full border-r border-gray-100 text-gray-500 hover:text-black hover:bg-gray-50 transition-all text-[10px] font-black uppercase tracking-widest">
                <Upload size={14} /> <span className="hidden sm:inline">{t('IMPORT')}</span>
                </button>
            )}
            {!hideExport && (
                <button 
                  onClick={onExportClick}
                  className="flex items-center gap-2 px-4 h-full border-r border-gray-100 text-gray-500 hover:text-black hover:bg-gray-50 transition-all text-[10px] font-black uppercase tracking-widest"
                >
                <Download size={14} /> <span className="hidden sm:inline">{t('EXPORT')}</span>
                </button>
            )}
            <button className="flex items-center gap-2 px-4 h-full text-gray-500 hover:text-black hover:bg-gray-50 transition-all text-[10px] font-black uppercase tracking-widest">
              <Filter size={14} /> <span className="hidden sm:inline">{t('FILTER')}</span>
            </button>
          </div>

          {!hideAdd && (
            <button 
              onClick={onAddClick}
              className="bg-black text-white px-6 h-[42px] rounded-xl font-black text-[10px] uppercase tracking-[0.15em] flex items-center gap-2 hover:bg-gray-900 transition-all shadow-xl shadow-black/20 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Plus size={16} strokeWidth={3} /> {addButtonLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
