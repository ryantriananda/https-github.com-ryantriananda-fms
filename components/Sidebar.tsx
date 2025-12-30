
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  Users, 
  Home, 
  BookOpen, 
  ChevronLeft,
  ChevronRight,
  Car,
  Database,
  Wrench,
  Send,
  DollarSign,
  ChevronDown,
  X,
  Building,
  Briefcase,
  Bell,
  Box,
  House,
  Settings,
  UserCog,
  Zap,
  ShieldCheck,
  Package,
  List,
  Monitor,
  Tag,
  MapPin,
  Scale,
  CreditCard,
  Layers,
  Palette,
  Landmark,
  Component,
  Percent,
  Radio,
  Stamp,
  RefreshCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  activeItem: string;
  onNavigate: (label: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    subItems?: MenuItem[];
}

export const Sidebar: React.FC<Props> = ({ 
  activeItem, 
  onNavigate, 
  isCollapsed, 
  onToggle, 
  isMobileOpen, 
  onCloseMobile 
}) => {
  const { t } = useLanguage();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Auto-expand menu based on activeItem
  useEffect(() => {
    menuItems.forEach(item => {
        if (item.subItems && item.subItems.some(sub => sub.label === activeItem)) {
            setExpandedMenus(prev => prev.includes(item.label) ? prev : [...prev, item.label]);
        }
    });
  }, [activeItem]);

  const toggleMenu = (label: string) => {
    if (isCollapsed) {
        onToggle();
        if (!expandedMenus.includes(label)) {
             setExpandedMenus(prev => [...prev, label]);
        }
    } else {
        setExpandedMenus(prev => 
            prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
        );
    }
  };

  const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { 
        label: 'ATK', 
        icon: <Box size={20} />,
        subItems: [
            { label: 'Request ATK', icon: <Database size={16} /> },
            { label: 'Stationery Request Approval', icon: <FileText size={16} /> },
            { label: 'Master ATK', icon: <Settings size={16} /> },
        ]
    },
    { 
        label: 'ARK', 
        icon: <House size={20} />,
        subItems: [
            { label: 'Daftar ARK', icon: <Database size={16} /> },
            { label: 'Household Request Approval', icon: <FileText size={16} /> },
            { label: 'Master ARK', icon: <Settings size={16} /> },
        ]
    },
    { 
        label: 'General Asset', 
        icon: <Package size={20} />,
        subItems: [
            { label: 'Asset HC', icon: <Database size={16} /> },
            { label: 'Asset IT', icon: <Monitor size={16} /> },
        ]
    },
    { label: 'Log Book', icon: <BookOpen size={20} /> },
    { 
        label: 'Kendaraan', 
        icon: <Car size={20} />,
        subItems: [
            { label: 'Daftar Aset', icon: <Database size={16} /> },
            { label: 'Kontrak Kendaraan', icon: <Briefcase size={16} /> },
            { label: 'Servis', icon: <Wrench size={16} /> },
            { label: 'Pajak & KIR', icon: <FileText size={16} /> },
            { label: 'Mutasi', icon: <Send size={16} /> },
            { label: 'Penjualan', icon: <DollarSign size={16} /> },
        ]
    },
    { 
        label: 'Gedung', 
        icon: <Building size={20} />,
        subItems: [
             { label: 'Pemeliharaan Asset', icon: <Wrench size={16} /> },
             { label: 'Utility Monitoring', icon: <Zap size={16} /> },
             { label: 'Branch Improvement', icon: <FileText size={16} /> },
             { label: 'Compliance & Legal', icon: <ShieldCheck size={16} /> },
        ]
    },
    { label: 'Timesheet', icon: <Clock size={20} /> },
    { label: 'Vendor', icon: <Users size={20} /> },
    { label: 'Manajemen User', icon: <UserCog size={20} /> },
    { 
      label: 'Master Data', 
      icon: <Home size={20} />,
      subItems: [
        // Moved Master Approval to top for better visibility
        { label: 'Master Approval', icon: <CheckCircle2 size={16} /> },
        
        // Group 1: General Masters
        { label: 'Master Vendor', icon: <Users size={16} /> },
        { label: 'Master PPN', icon: <Percent size={16} /> },
        { label: 'Master Brand Type', icon: <Stamp size={16} /> },
        { label: 'Master Brand', icon: <Tag size={16} /> },
        { label: 'Master Operator', icon: <Radio size={16} /> },
        { label: 'Master Asset Type', icon: <Component size={16} /> },
        { label: 'Master Department', icon: <Layers size={16} /> },
        { label: 'Master Lokasi', icon: <MapPin size={16} /> },
        { label: 'Master Satuan', icon: <Scale size={16} /> },
        { label: 'Master Warna', icon: <Palette size={16} /> },
        { label: 'Master Tipe Gedung', icon: <Landmark size={16} /> },
        { label: 'Master Cost Center', icon: <CreditCard size={16} /> },
        { label: 'Asset Category', icon: <Box size={16} /> },
        
        // Group 2: Configuration Masters (From Request)
        { label: 'Jenis Pajak', icon: <Sliders size={16} /> },
        { label: 'Jenis Pembayaran', icon: <Sliders size={16} /> },
        { label: 'Jenis Servis', icon: <Sliders size={16} /> },
        { label: 'Status Mutasi', icon: <Sliders size={16} /> },
        { label: 'Status Penjualan', icon: <Sliders size={16} /> },
        { label: 'Status Request', icon: <Sliders size={16} /> },
        { label: 'Tipe Mutasi', icon: <Sliders size={16} /> },
        { label: 'Tipe Vendor', icon: <Sliders size={16} /> },
        { label: 'Role', icon: <UserCog size={16} /> },
        { label: 'Sync Branchs', icon: <RefreshCw size={16} /> },
        { label: 'Sync Channels', icon: <RefreshCw size={16} /> },
        { label: 'Jenis Kendaraan', icon: <Car size={16} /> },
      ]
    },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 bg-[#0A0A0A] text-gray-400 flex flex-col transition-all duration-300 border-r border-gray-900
    ${isMobileOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
    ${isCollapsed && !isMobileOpen ? 'lg:w-[90px]' : 'lg:w-[280px]'}
  `;

  return (
    <div className={sidebarClasses}>
      {/* Logo Section */}
      <div className={`h-20 flex items-center px-8 border-b border-white/5 ${isCollapsed ? 'justify-center px-0' : 'justify-between'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]">M</div>
          {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col">
                  <h1 className="font-black text-white text-[16px] tracking-tight leading-none">MODENA</h1>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Asset Manager</p>
              </div>
          )}
        </div>
        {isMobileOpen && (
          <button onClick={onCloseMobile} className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Menu Section */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-1">
        {menuItems.map((item, index) => {
          const hasSub = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedMenus.includes(item.label);
          const isParentActive = activeItem === item.label || (item.subItems && item.subItems.some(sub => sub.label === activeItem)); 

          if (hasSub) {
              return (
                  <div key={index} className="space-y-1 mb-2">
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3.5 rounded-xl transition-all duration-200 group relative
                        ${isParentActive ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                      >
                         <div className="flex items-center gap-4">
                            <span className={`${isParentActive ? 'text-white' : 'text-gray-500 group-hover:text-white'} transition-colors`}>{item.icon}</span>
                            {!isCollapsed && <span className="text-[12px] font-bold uppercase tracking-wide">{t(item.label)}</span>}
                         </div>
                         {!isCollapsed && (
                             <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : 'text-gray-600'}`} 
                             />
                         )}
                         
                         {/* Active Indicator Line */}
                         {isParentActive && !isCollapsed && (
                             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                         )}
                      </button>

                      {/* Submenu */}
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded && !isCollapsed ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="pt-1 pb-2 pl-4 space-y-1">
                              {item.subItems!.map((sub, subIndex) => {
                                  const isSubActive = activeItem === sub.label;
                                  return (
                                    <button
                                        key={subIndex}
                                        onClick={() => onNavigate(sub.label)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ml-2
                                            ${isSubActive
                                            ? 'text-white bg-white/10' 
                                            : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-white' : 'bg-gray-700'}`}></div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider">{t(sub.label)}</span>
                                    </button>
                                  )
                              })}
                          </div>
                      </div>
                  </div>
              );
          }

          return (
            <button
              key={index}
              onClick={() => onNavigate(item.label)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start gap-4'} px-4 py-3.5 rounded-xl transition-all duration-200 group relative mb-1
                ${isParentActive 
                  ? 'bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.15)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <span className={`${isParentActive ? 'text-black' : 'text-gray-500 group-hover:text-white'} transition-colors`}>{item.icon}</span>
              {!isCollapsed && <span className="text-[12px] font-bold uppercase tracking-wide">{t(item.label)}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer Toggle */}
      <div className="p-6 border-t border-white/5 hidden lg:block">
        <button 
            onClick={onToggle}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} p-3 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all`}
        >
          <div className="bg-white/10 p-1.5 rounded-lg">
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </div>
          {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-[0.15em]">Collapse Menu</span>}
        </button>
      </div>
    </div>
  );
};
