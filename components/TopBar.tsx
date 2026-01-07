
import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Menu, Search, UserCircle, Shield, Briefcase, User, LogOut, Settings, CheckCircle2, AlertTriangle, Clock, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  breadcrumbs?: string[];
  onMenuClick?: () => void;
  userRole: 'Admin' | 'Staff' | 'Officer';
  onRoleChange: (role: 'Admin' | 'Staff' | 'Officer') => void;
}

// Mock Notifications Data
const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'approval', title: 'New Vehicle Request', message: 'Toyota Avanza requested by Sales Dept.', time: '2 mins ago', read: false },
    { id: 2, type: 'warning', title: 'Stock Alert', message: 'Paper A4 stock is below minimum level.', time: '1 hour ago', read: false },
    { id: 3, type: 'success', title: 'Request Approved', message: 'Your ATK request #TRX-001 has been approved.', time: '3 hours ago', read: true },
    { id: 4, type: 'info', title: 'Maintenance Due', message: 'AC Split Lobby is due for service tomorrow.', time: '1 day ago', read: true },
];

export const TopBar: React.FC<Props> = ({ 
    breadcrumbs = ['Home', 'Asset Monitoring'], 
    onMenuClick,
    userRole,
    onRoleChange
}) => {
  const { language, setLanguage } = useLanguage();
  
  // Dropdown States
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Close dropdowns when clicking outside (simple implementation)
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
          if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguage = (lang: 'id' | 'en') => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  const handleRoleSelect = (role: 'Admin' | 'Staff' | 'Officer') => {
      onRoleChange(role);
      setIsRoleOpen(false);
  };

  const getRoleIcon = (role: string) => {
      switch(role) {
          case 'Admin': return <Shield size={14} className="text-purple-500" />;
          case 'Officer': return <Briefcase size={14} className="text-blue-500" />;
          default: return <User size={14} className="text-green-500" />;
      }
  };

  const getRoleColor = (role: string) => {
      switch(role) {
          case 'Admin': return 'bg-purple-50 text-purple-700 border-purple-100';
          case 'Officer': return 'bg-blue-50 text-blue-700 border-blue-100';
          default: return 'bg-green-50 text-green-700 border-green-100';
      }
  };

  const getNotifIcon = (type: string) => {
      switch(type) {
          case 'approval': return <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><User size={14} /></div>;
          case 'warning': return <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center"><AlertTriangle size={14} /></div>;
          case 'success': return <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><CheckCircle2 size={14} /></div>;
          default: return <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center"><Clock size={14} /></div>;
      }
  };

  return (
    <header className="h-20 bg-[#FBFBFB] flex items-center justify-between px-8 sticky top-0 z-30 transition-all">
      <div className="flex items-center gap-6">
        {/* Hamburger Menu for Mobile */}
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 hover:bg-white rounded-xl text-black shadow-sm"
        >
          <Menu size={24} />
        </button>

        {/* Breadcrumbs - Stylish */}
        <div className="hidden sm:flex items-center gap-3 text-sm">
           {breadcrumbs.map((item, index) => (
               <React.Fragment key={index}>
                   <span className={`font-black uppercase tracking-tight ${index === breadcrumbs.length - 1 ? 'text-black text-[14px]' : 'text-gray-300 text-[12px]'}`}>
                     {item}
                   </span>
                   {index < breadcrumbs.length - 1 && <span className="text-gray-300">/</span>}
               </React.Fragment>
           ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        
        {/* ROLE SWITCHER (FOR DEMO/DEV) */}
        <div className="relative hidden md:block">
            <button 
                onClick={() => setIsRoleOpen(!isRoleOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${getRoleColor(userRole)}`}
            >
                {getRoleIcon(userRole)}
                <span className="text-[10px] font-black uppercase tracking-wider">View: {userRole}</span>
                <ChevronDown size={12} />
            </button>

            {isRoleOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Switch Role View</div>
                    {['Admin', 'Officer', 'Staff'].map((role) => (
                        <button 
                            key={role}
                            onClick={() => handleRoleSelect(role as any)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                            {getRoleIcon(role)}
                            <span className={`text-[11px] font-bold ${userRole === role ? 'text-black' : 'text-gray-500'}`}>{role}</span>
                            {userRole === role && <div className="w-1.5 h-1.5 rounded-full bg-black ml-auto"></div>}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Search Bar (Visual Only) */}
        <div className="hidden xl:flex items-center bg-white px-4 py-2.5 rounded-full border border-gray-100 shadow-sm w-64">
            <Search size={14} className="text-gray-300" />
            <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-[11px] font-bold ml-2 w-full placeholder:text-gray-300" />
        </div>

        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-gray-300 transition-all"
          >
            {language === 'id' ? (
                <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-5 h-auto rounded-sm" />
            ) : (
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-auto rounded-sm" />
            )}
            <span className="text-[10px] font-black text-black uppercase">{language}</span>
            <ChevronDown size={12} className="text-gray-400" />
          </button>

          {isLangOpen && (
            <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button 
                  onClick={() => toggleLanguage('id')}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                    <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-5 h-auto" />
                    <span className="text-[11px] font-bold">Indonesia</span>
                </button>
                <button 
                  onClick={() => toggleLanguage('en')}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                    <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-auto" />
                    <span className="text-[11px] font-bold">English</span>
                </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
            <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative p-2.5 rounded-xl border shadow-sm transition-all group ${isNotifOpen ? 'bg-black text-white border-black' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-black'}`}
            >
                <Bell size={18} className="transition-colors" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {isNotifOpen && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]">
                        <h3 className="text-[12px] font-black text-black uppercase tracking-widest">Notifications</h3>
                        <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800">Mark all read</button>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar p-2">
                        {MOCK_NOTIFICATIONS.map(notif => (
                            <div key={notif.id} className="flex gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                                {getNotifIcon(notif.type)}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h4 className={`text-[11px] font-bold ${notif.read ? 'text-gray-600' : 'text-black'}`}>{notif.title}</h4>
                                        <span className="text-[9px] text-gray-400">{notif.time}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{notif.message}</p>
                                </div>
                                {!notif.read && <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></div>}
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-gray-50 text-center">
                        <button className="text-[10px] font-black text-black uppercase tracking-widest hover:text-blue-600 transition-colors">View All History</button>
                    </div>
                </div>
            )}
        </div>
        
        {/* Divider */}
        <div className="h-8 w-[1px] bg-gray-200"></div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
            <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 cursor-pointer pl-2 group"
            >
                <div className="text-right hidden sm:block">
                    <p className="text-[12px] font-black text-black leading-tight uppercase group-hover:text-blue-600 transition-colors">Ibnu Faisal</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{userRole}</p>
                </div>
                <div className="relative">
                    <img 
                        src="https://picsum.photos/id/1005/100/100" 
                        alt="Profile" 
                        className={`w-10 h-10 rounded-full object-cover border-2 shadow-md transition-all ${isProfileOpen ? 'border-black' : 'border-white group-hover:border-blue-100'}`}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
            </div>

            {isProfileOpen && (
                <div className="absolute top-full right-0 mt-4 w-56 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-4 border-b border-gray-50 bg-[#FAFAFA]">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-[12px] font-black text-black truncate">ibnu.faisal@modena.com</p>
                    </div>
                    <div className="p-2 space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                            <User size={14} className="text-gray-400 group-hover:text-black" />
                            <span className="text-[11px] font-bold text-gray-600 group-hover:text-black">My Profile</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                            <Settings size={14} className="text-gray-400 group-hover:text-black" />
                            <span className="text-[11px] font-bold text-gray-600 group-hover:text-black">Account Settings</span>
                        </button>
                    </div>
                    <div className="p-2 border-t border-gray-50">
                        <button 
                            onClick={() => alert('Logout clicked')}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-left group"
                        >
                            <LogOut size={14} className="text-gray-400 group-hover:text-red-500" />
                            <span className="text-[11px] font-bold text-gray-600 group-hover:text-red-500">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};
