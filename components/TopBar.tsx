
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
    <header className="h-20 bg-white/95 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-30 transition-all border-b-2 border-gray-100 shadow-sm">
      <div className="flex items-center gap-6">
        {/* Hamburger Menu for Mobile */}
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2.5 hover:bg-gray-50 rounded-2xl text-black shadow-sm border-2 border-gray-100 hover:border-gray-200 transition-all"
        >
          <Menu size={24} strokeWidth={2.5} />
        </button>

        {/* Breadcrumbs - Stylish */}
        <div className="hidden sm:flex items-center gap-3 text-sm">
           {breadcrumbs.map((item, index) => (
               <React.Fragment key={index}>
                   <span className={`font-black uppercase tracking-tight transition-all ${index === breadcrumbs.length - 1 ? 'text-black text-[16px]' : 'text-gray-300 text-[12px] hover:text-gray-400'}`}>
                     {item}
                   </span>
                   {index < breadcrumbs.length - 1 && <span className="text-gray-200 font-black">/</span>}
               </React.Fragment>
           ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        
        {/* ROLE SWITCHER (FOR DEMO/DEV) */}
        <div className="relative hidden md:block">
            <button 
                onClick={() => setIsRoleOpen(!isRoleOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition-all hover:shadow-md ${getRoleColor(userRole)}`}
            >
                {getRoleIcon(userRole)}
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">View: {userRole}</span>
                <ChevronDown size={14} strokeWidth={2.5} />
            </button>

            {isRoleOpen && (
                <div className="absolute top-full right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-5 py-3 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] border-b-2 border-gray-50 bg-gray-50">Switch Role View</div>
                    {['Admin', 'Officer', 'Staff'].map((role) => (
                        <button 
                            key={role}
                            onClick={() => handleRoleSelect(role as any)}
                            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-all"
                        >
                            {getRoleIcon(role)}
                            <span className={`text-[12px] font-bold ${userRole === role ? 'text-black' : 'text-gray-500'}`}>{role}</span>
                            {userRole === role && <div className="w-2 h-2 rounded-full bg-black ml-auto"></div>}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Search Bar (Visual Only) */}
        <div className="hidden xl:flex items-center bg-white px-5 py-3 rounded-2xl border-2 border-gray-200 shadow-sm w-72 hover:border-gray-300 hover:shadow-md transition-all">
            <Search size={16} className="text-gray-400" strokeWidth={2.5} />
            <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-[12px] font-bold ml-3 w-full placeholder:text-gray-300" />
        </div>

        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border-2 border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all"
          >
            {language === 'id' ? (
                <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-5 h-auto rounded-sm" />
            ) : (
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-auto rounded-sm" />
            )}
            <span className="text-[10px] font-black text-black uppercase tracking-wider">{language}</span>
            <ChevronDown size={14} className="text-gray-400" strokeWidth={2.5} />
          </button>

          {isLangOpen && (
            <div className="absolute top-full right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button 
                  onClick={() => toggleLanguage('id')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all"
                >
                    <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-5 h-auto" />
                    <span className="text-[11px] font-bold">Indonesia</span>
                </button>
                <button 
                  onClick={() => toggleLanguage('en')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all"
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
                className={`relative p-3 rounded-2xl border-2 shadow-sm transition-all group ${isNotifOpen ? 'bg-gradient-to-br from-black to-gray-800 text-white border-black shadow-lg' : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-black hover:border-gray-300'}`}
            >
                <Bell size={20} strokeWidth={2.5} className="transition-colors" />
                <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-md"></span>
            </button>

            {isNotifOpen && (
                <div className="absolute top-full right-0 mt-3 w-96 bg-white rounded-3xl shadow-2xl border-2 border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="px-6 py-5 border-b-2 border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                        <h3 className="text-[13px] font-black text-black uppercase tracking-[0.2em]">Notifications</h3>
                        <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">Mark all read</button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-3">
                        {MOCK_NOTIFICATIONS.map(notif => (
                            <div key={notif.id} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group border-2 border-transparent hover:border-gray-100 mb-2">
                                {getNotifIcon(notif.type)}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-[12px] font-bold ${notif.read ? 'text-gray-600' : 'text-black'}`}>{notif.title}</h4>
                                        <span className="text-[10px] text-gray-400 font-bold">{notif.time}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{notif.message}</p>
                                </div>
                                {!notif.read && <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0 shadow-md"></div>}
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t-2 border-gray-100 text-center bg-gray-50">
                        <button className="text-[11px] font-black text-black uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">View All History</button>
                    </div>
                </div>
            )}
        </div>
        
        {/* Divider */}
        <div className="h-10 w-[2px] bg-gray-200 rounded-full"></div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
            <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-4 cursor-pointer pl-3 group"
            >
                <div className="text-right hidden sm:block">
                    <p className="text-[13px] font-black text-black leading-tight uppercase group-hover:text-blue-600 transition-colors">Ibnu Faisal</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">{userRole}</p>
                </div>
                <div className="relative">
                    <img 
                        src="https://picsum.photos/id/1005/100/100" 
                        alt="Profile" 
                        className={`w-12 h-12 rounded-2xl object-cover border-2 shadow-lg transition-all ${isProfileOpen ? 'border-black scale-105' : 'border-gray-200 group-hover:border-gray-300'}`}
                    />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-md"></div>
                </div>
            </div>

            {isProfileOpen && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border-2 border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-5 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">Signed in as</p>
                        <p className="text-[13px] font-black text-black truncate">ibnu.faisal@modena.com</p>
                    </div>
                    <div className="p-3 space-y-2">
                        <button className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-gray-50 transition-all text-left group border-2 border-transparent hover:border-gray-100">
                            <User size={18} strokeWidth={2.5} className="text-gray-400 group-hover:text-black transition-colors" />
                            <span className="text-[12px] font-bold text-gray-600 group-hover:text-black transition-colors">My Profile</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-gray-50 transition-all text-left group border-2 border-transparent hover:border-gray-100">
                            <Settings size={18} strokeWidth={2.5} className="text-gray-400 group-hover:text-black transition-colors" />
                            <span className="text-[12px] font-bold text-gray-600 group-hover:text-black transition-colors">Account Settings</span>
                        </button>
                    </div>
                    <div className="p-3 border-t-2 border-gray-100">
                        <button 
                            onClick={() => alert('Logout clicked')}
                            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-red-50 transition-all text-left group border-2 border-transparent hover:border-red-100"
                        >
                            <LogOut size={18} strokeWidth={2.5} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                            <span className="text-[12px] font-bold text-gray-600 group-hover:text-red-500 transition-colors">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};
