import React from 'react';
import { 
    Clock, Car, Building, Users, AlertTriangle, Wrench, 
    Layers, Activity, Bed, Lock, ArrowRight
} from 'lucide-react';

interface DashboardStats {
    totalPendingRequests: number;
    activeIssues: number;
    inventoryAlert: number;
    liveVisitors: number;
    totalPods: number;
    occupiedPods: number;
    totalLockers: number;
    occupiedLockers: number;
    activeVehicles: number;
    serviceVehicles: number;
    totalBuildings: number;
    maintenanceBuildings: number;
    recentActivities: any[];
}

interface DashboardPageProps {
    stats: DashboardStats;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ stats }) => {
    const {
        totalPendingRequests,
        activeIssues,
        inventoryAlert,
        liveVisitors,
        totalPods,
        occupiedPods,
        totalLockers,
        occupiedLockers,
        activeVehicles,
        serviceVehicles,
        totalBuildings,
        maintenanceBuildings,
        recentActivities
    } = stats;

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* 1. TOP STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Pending</p>
                        <h3 className="text-[28px] font-black text-black leading-none">{totalPendingRequests}</h3>
                        <p className="text-[10px] font-medium text-orange-500 mt-2">Requests awaiting approval</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-orange-50 text-orange-600 group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Issues</p>
                        <h3 className="text-[28px] font-black text-black leading-none">{serviceVehicles + maintenanceBuildings}</h3>
                        <p className="text-[10px] font-medium text-blue-500 mt-2">Maint. & Service In Progress</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                        <Wrench size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Inventory Alert</p>
                        <h3 className="text-[28px] font-black text-black leading-none">{inventoryAlert}</h3>
                        <p className="text-[10px] font-medium text-red-500 mt-2">Items below min. stock</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-50 text-red-600 group-hover:scale-110 transition-transform">
                        <AlertTriangle size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Live Visitors</p>
                        <h3 className="text-[28px] font-black text-black leading-none">{liveVisitors}</h3>
                        <p className="text-[10px] font-medium text-green-500 mt-2">Currently checked in</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-50 text-green-600 group-hover:scale-110 transition-transform">
                        <Users size={24} />
                    </div>
                </div>
            </div>

            {/* 2. MIDDLE ROW: ASSET & FACILITY STATUS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Facility Occupancy */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                        <Layers size={18} className="text-black"/>
                        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">FACILITY STATUS</h3>
                    </div>
                    
                    <div className="space-y-6">
                        {/* Pod Status */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2">
                                    <Bed size={14} className="text-gray-400" />
                                    <span className="text-[11px] font-bold text-gray-600 uppercase">POD OCCUPANCY</span>
                                </div>
                                <span className="text-[14px] font-black text-black">{occupiedPods} <span className="text-gray-400 text-[10px]">/ {totalPods}</span></span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-black rounded-full transition-all duration-1000" 
                                    style={{ width: `${totalPods > 0 ? (occupiedPods/totalPods)*100 : 0}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Locker Status */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2">
                                    <Lock size={14} className="text-gray-400" />
                                    <span className="text-[11px] font-bold text-gray-600 uppercase">LOCKER USAGE</span>
                                </div>
                                <span className="text-[14px] font-black text-black">{occupiedLockers} <span className="text-gray-400 text-[10px]">/ {totalLockers}</span></span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
                                    style={{ width: `${totalLockers > 0 ? (occupiedLockers/totalLockers)*100 : 0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Operational Status (Vehicles & Buildings) */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                            <Activity size={18} className="text-black"/>
                            <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">OPERATIONAL HEALTH</h3>
                        </div>
                        <button className="text-[10px] font-bold text-gray-400 hover:text-black uppercase">View Report</button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                         <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-3">
                             <div className="flex justify-between items-start">
                                 <div className="p-2 bg-white rounded-lg shadow-sm text-black"><Car size={16} /></div>
                                 <span className="text-[10px] font-bold text-gray-400 uppercase">VEHICLES</span>
                             </div>
                             <div className="flex gap-4 mt-1">
                                 <div>
                                     <span className="text-[16px] font-black text-black">{activeVehicles}</span>
                                     <p className="text-[9px] text-green-600 font-bold uppercase">Active</p>
                                 </div>
                                 <div>
                                     <span className="text-[16px] font-black text-black">{serviceVehicles}</span>
                                     <p className="text-[9px] text-orange-500 font-bold uppercase">Service</p>
                                 </div>
                             </div>
                         </div>

                         <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-3">
                             <div className="flex justify-between items-start">
                                 <div className="p-2 bg-white rounded-lg shadow-sm text-black"><Building size={16} /></div>
                                 <span className="text-[10px] font-bold text-gray-400 uppercase">BUILDINGS</span>
                             </div>
                             <div className="flex gap-4 mt-1">
                                 <div>
                                     <span className="text-[16px] font-black text-black">{totalBuildings}</span>
                                     <p className="text-[9px] text-green-600 font-bold uppercase">Total</p>
                                 </div>
                                 <div>
                                     <span className="text-[16px] font-black text-black">{maintenanceBuildings}</span>
                                     <p className="text-[9px] text-blue-500 font-bold uppercase">Maint.</p>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>

            {/* 3. RECENT ACTIVITY FEED */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[14px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                        <Clock size={16} /> Recent Activity Feed
                    </h3>
                    <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider flex items-center gap-1">
                        View All History <ArrowRight size={12} />
                    </button>
                </div>
                <div className="space-y-4">
                    {recentActivities.map((act: any, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-[10px] shadow-sm
                                    ${['ATK', 'ARK'].includes(act.code) ? 'bg-blue-500' : 
                                      ['SRV'].includes(act.code) ? 'bg-orange-500' : 
                                      ['POD', 'LOC'].includes(act.code) ? 'bg-purple-600' : 'bg-black'}`}>
                                    {act.code}
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black text-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">{act.itemName}</h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{act.transactionNumber || act.id} • {act.date}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                                ${(act.status || '').toLowerCase().includes('pending') || (act.status || '').toLowerCase().includes('waiting') ? 'bg-orange-100 text-orange-600 border-orange-200' : 
                                  (act.status || '').toLowerCase().includes('approved') || (act.status || '').toLowerCase().includes('completed') ? 'bg-green-100 text-green-600 border-green-200' : 
                                  'bg-gray-200 text-gray-500 border-gray-300'}`}>
                                {act.status || 'Pending'}
                            </span>
                        </div>
                    ))}
                    {recentActivities.length === 0 && (
                        <div className="text-center py-8 text-gray-400 italic text-[11px] uppercase tracking-widest">No recent activities found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
