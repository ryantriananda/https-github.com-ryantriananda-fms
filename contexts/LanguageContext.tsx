
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // --- GENERAL & NAVIGATION ---
  'Home': { id: 'Beranda', en: 'Home' },
  'Dashboard': { id: 'Dashboard', en: 'Dashboard' },
  'Beranda': { id: 'Beranda', en: 'Home' },
  
  // --- MODULES (SIDEBAR PARENTS) ---
  'ATK': { id: 'ATK', en: 'Stationery' },
  'ARK': { id: 'ARK', en: 'Household' },
  'General Asset': { id: 'Aset Umum', en: 'General Asset' },
  'Log Book': { id: 'Buku Tamu', en: 'Log Book' },
  'Kendaraan': { id: 'Kendaraan', en: 'Vehicle' },
  'Gedung': { id: 'Gedung', en: 'Building' },
  'Timesheet': { id: 'Absensi', en: 'Timesheet' },
  'Vendor': { id: 'Vendor', en: 'Vendor' },
  'Manajemen User': { id: 'Manajemen User', en: 'User Management' },
  'Master Data': { id: 'Data Master', en: 'Master Data' },

  // --- SUB MENUS (SIDEBAR CHILDREN) ---
  // ATK
  'Request ATK': { id: 'Permintaan ATK', en: 'Stationery Request' },
  'Stationery Request Approval': { id: 'Persetujuan ATK', en: 'Stationery Approval' },
  'Master ATK': { id: 'Master ATK', en: 'Master Stationery' },
  
  // ARK
  'Daftar ARK': { id: 'Permintaan ARK', en: 'Household Request' },
  'Household Request Approval': { id: 'Persetujuan ARK', en: 'Household Approval' },
  'Master ARK': { id: 'Master ARK', en: 'Master Household' },

  // General Asset
  'Asset HC': { id: 'Aset HC', en: 'HC Asset' },
  'Asset IT': { id: 'Aset IT', en: 'IT Asset' },
  'Customer Service': { id: 'Customer Service', en: 'Customer Service' },
  'General Asset List': { id: 'Daftar Aset Umum', en: 'General Asset List' },

  // Kendaraan
  'Daftar Aset': { id: 'Daftar Aset', en: 'Asset List' },
  'Kontrak Kendaraan': { id: 'Kontrak Kendaraan', en: 'Vehicle Contract' },
  'Servis': { id: 'Servis', en: 'Service' },
  'Pajak & KIR': { id: 'Pajak & KIR', en: 'Tax & KIR' },
  'Mutasi': { id: 'Mutasi', en: 'Mutation' },
  'Penjualan': { id: 'Penjualan', en: 'Sales' },
  'Open Bid': { id: 'Lelang (Open Bid)', en: 'Open Bid' },

  // Gedung
  'Pemeliharaan Asset': { id: 'Pemeliharaan Aset', en: 'Asset Maintenance' },
  'Utility Monitoring': { id: 'Monitoring Utilitas', en: 'Utility Monitoring' },
  'Branch Improvement': { id: 'Perbaikan Cabang', en: 'Branch Improvement' },
  'Compliance & Legal': { id: 'Kepatuhan & Legal', en: 'Compliance & Legal' },
  'Master Gedung': { id: 'Master Gedung', en: 'Master Building' },

  // --- MASTER DATA SUB-MENUS ---
  'Master Vendor': { id: 'Master Vendor', en: 'Master Vendor' },
  'Master PPN': { id: 'Master PPN', en: 'Master VAT' },
  'Master Brand Type': { id: 'Master Tipe Brand', en: 'Master Brand Type' },
  'Master Brand': { id: 'Master Brand', en: 'Master Brand' },
  'Master Operator': { id: 'Master Operator', en: 'Master Operator' },
  'Master Asset Type': { id: 'Master Tipe Aset', en: 'Master Asset Type' },
  'Master Department': { id: 'Master Departemen', en: 'Master Department' },
  'Master Lokasi': { id: 'Master Lokasi', en: 'Master Location' },
  'Master Satuan': { id: 'Master Satuan', en: 'Master UOM' },
  'Master Warna': { id: 'Master Warna', en: 'Master Color' },
  'Master Tipe Gedung': { id: 'Master Tipe Gedung', en: 'Master Building Type' },
  'Master Cost Center': { id: 'Master Cost Center', en: 'Master Cost Center' },
  'Asset Category': { id: 'Kategori Aset', en: 'Asset Category' },
  'Jenis Pajak': { id: 'Jenis Pajak', en: 'Tax Type' },
  'Jenis Pembayaran': { id: 'Jenis Pembayaran', en: 'Payment Type' },
  'Jenis Servis': { id: 'Jenis Servis', en: 'Service Type' },
  'Status Mutasi': { id: 'Status Mutasi', en: 'Mutation Status' },
  'Status Penjualan': { id: 'Status Penjualan', en: 'Sales Status' },
  'Status Request': { id: 'Status Request', en: 'Request Status' },
  'Tipe Mutasi': { id: 'Tipe Mutasi', en: 'Mutation Type' },
  'Tipe Vendor': { id: 'Tipe Vendor', en: 'Vendor Type' },
  'Role': { id: 'Peran', en: 'Role' },
  'Sync Branchs': { id: 'Sync Cabang', en: 'Sync Branches' },
  'Sync Channels': { id: 'Sync Channel', en: 'Sync Channels' },
  'Jenis Kendaraan': { id: 'Jenis Kendaraan', en: 'Vehicle Type' },
  'Master Approval': { id: 'Master Approval', en: 'Master Approval' },

  // --- TABS & FILTERS ---
  'SEMUA': { id: 'SEMUA', en: 'ALL' },
  'PENDING': { id: 'MENUNGGU', en: 'PENDING' },
  'APPROVED': { id: 'DISETUJUI', en: 'APPROVED' },
  'REJECTED': { id: 'DITOLAK', en: 'REJECTED' },
  'REVISED': { id: 'REVISI', en: 'REVISED' },
  'ACTIVE': { id: 'AKTIF', en: 'ACTIVE' },
  'INACTIVE': { id: 'TIDAK AKTIF', en: 'INACTIVE' },
  'BLACKLIST': { id: 'BLACKLIST', en: 'BLACKLIST' },
  'DOKUMEN': { id: 'DOKUMEN', en: 'DOCUMENTS' },
  'PEMELIHARAAN': { id: 'PEMELIHARAAN', en: 'MAINTENANCE' },
  'OVERVIEW': { id: 'IKHTISAR', en: 'OVERVIEW' },
  'LISTRIK': { id: 'LISTRIK', en: 'ELECTRICITY' },
  'AIR': { id: 'AIR', en: 'WATER' },
  'INTERNET': { id: 'INTERNET', en: 'INTERNET' },
  'URGENT': { id: 'MENDESAK', en: 'URGENT' },
  'WARNING': { id: 'PERINGATAN', en: 'WARNING' },
  'SAFE': { id: 'AMAN', en: 'SAFE' },
  'LIVE': { id: 'LIVE', en: 'LIVE' },
  'ENDING SOON': { id: 'SEGERA BERAKHIR', en: 'ENDING SOON' },

  // --- BUTTON ACTIONS ---
  'Add': { id: 'Tambah', en: 'Add' },
  'Add Data': { id: 'Tambah Data', en: 'Add Data' },
  'Export': { id: 'Ekspor', en: 'Export' },
  'Import': { id: 'Impor', en: 'Import' },
  'Filter': { id: 'Filter', en: 'Filter' },
  'Sync': { id: 'Sinkron', en: 'Sync' },
  'SYNC': { id: 'SINKRON', en: 'SYNC' },
  'IMPORT': { id: 'IMPOR', en: 'IMPORT' },
  'EXPORT': { id: 'EKSPOR', en: 'EXPORT' },
  'FILTER': { id: 'FILTER', en: 'FILTER' },

  // --- CUSTOM BUTTON LABELS ---
  'Request Vehicle': { id: 'Request Kendaraan', en: 'Request Vehicle' },
  'Request Asset HC': { id: 'Request Aset HC', en: 'Request HC Asset' },
  'Request Asset IT': { id: 'Request Aset IT', en: 'Request IT Asset' },
  'Request Asset CS': { id: 'Request Aset CS', en: 'Request CS Asset' },
  'New Branch Req': { id: 'Req Cabang Baru', en: 'New Branch Req' },
  'New Contract': { id: 'Kontrak Baru', en: 'New Contract' },
  'Request Tax/KIR': { id: 'Request Pajak/KIR', en: 'Request Tax/KIR' },
  'Add User': { id: 'Tambah User', en: 'Add User' },
  'Input Utility': { id: 'Input Utilitas', en: 'Input Utility' },
  'Add Vendor': { id: 'Tambah Vendor', en: 'Add Vendor' },
  'Add Service': { id: 'Tambah Servis', en: 'Add Service' },
  'New Request': { id: 'Permintaan Baru', en: 'New Request' },
  'Add Workflow': { id: 'Tambah Workflow', en: 'Add Workflow' },
  'New Auction': { id: 'Lelang Baru', en: 'New Auction' },
  
  // --- UI LABELS ---
  'Search...': { id: 'Cari...', en: 'Search...' },
  'Search anything...': { id: 'Cari sesuatu...', en: 'Search anything...' },
  'Row per page': { id: 'Baris per hal', en: 'Row per page' },
  'Showing': { id: 'Menampilkan', en: 'Showing' },
  'of': { id: 'dari', en: 'of' },
  'items': { id: 'item', en: 'items' },
  'records': { id: 'data', en: 'records' },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
