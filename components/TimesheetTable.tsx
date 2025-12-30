
import React from 'react';
import { TimesheetRecord } from '../types';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Pencil, Smartphone, Trash2, MapPin, CheckSquare, Clock, Eye } from 'lucide-react';

interface Props {
  data: TimesheetRecord[];
  onEdit?: (item: TimesheetRecord) => void;
  onDelete?: (id: string | number) => void;
  onView?: (item: TimesheetRecord) => void;
}

export const TimesheetTable: React.FC<Props> = ({ data, onEdit, onDelete, onView }) => {
  const getStatusStyle = (status: string) => {
      switch(status) {
          case 'Tepat Waktu': return 'bg-green-50 text-green-700 border-green-200';
          case 'Terlambat': return 'bg-orange-50 text-orange-700 border-orange-200';
          case 'Absen': return 'bg-red-50 text-red-700 border-red-200';
          default: return 'bg-blue-50 text-blue-700 border-blue-200';
      }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            {/* Header Row 1 */}
            <tr className="bg-[#F9FAFB] border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <th rowSpan={2} className="p-6 pl-8 w-16 text-center border-r border-gray-100">#</th>
              <th rowSpan={2} className="p-6 w-64 border-r border-gray-100">Personil Kebersihan</th>
              <th rowSpan={2} className="p-6 w-48 border-r border-gray-100">Lokasi & Area</th>
              <th rowSpan={2} className="p-6 w-32 border-r border-gray-100">Shift</th>
              {/* Grouped Header */}
              <th colSpan={2} className="p-4 text-center border-b border-gray-100 w-56 border-r">
                Waktu Kerja
              </th>
              <th rowSpan={2} className="p-6 w-40 border-r border-gray-100 text-center">Status</th>
              <th rowSpan={2} className="p-6 w-48 border-r border-gray-100">Tugas & Bukti</th>
              <th rowSpan={2} className="p-6 w-32 text-center">Aksi</th>
            </tr>
            {/* Header Row 2 */}
            <tr className="bg-[#F9FAFB] text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="p-4 text-center border-r border-gray-100 border-b border-gray-200">Masuk</th>
                <th className="p-4 text-center border-r border-gray-100 border-b border-gray-200">Pulang</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px] text-gray-700">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="bg-white hover:bg-[#FDFDFD] transition-all cursor-pointer group"
                onClick={() => onView?.(item)}
              >
                <td className="p-6 text-center font-bold text-gray-300 pl-8">{index + 1}</td>
                
                {/* Employee Cell */}
                <td className="p-6 border-r border-gray-50">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.employee.avatar} 
                      alt={item.employee.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-black text-black text-[13px] uppercase tracking-tight">{item.employee.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{item.employee.phone}</p>
                    </div>
                  </div>
                </td>

                <td className="p-6 border-r border-gray-50">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <MapPin size={12} className="text-gray-300" />
                            <span className="font-bold text-black text-[11px] uppercase">{item.location}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium pl-5">{item.area}</span>
                        <div className="text-[10px] text-gray-400 font-mono pl-5 mt-1">{item.date}</div>
                    </div>
                </td>
                
                <td className="p-6 border-r border-gray-50">
                    <span className="bg-gray-50 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-100 inline-block">
                        {item.shift}
                    </span>
                </td>
                
                <td className="p-6 text-center border-r border-gray-50">
                    <div className="font-mono font-black text-black text-[13px]">{item.clockIn || '--:--'}</div>
                </td>

                <td className="p-6 text-center border-r border-gray-50">
                    <div className="font-mono font-black text-gray-500 text-[13px]">{item.clockOut || '--:--'}</div>
                </td>
                
                <td className="p-6 text-center border-r border-gray-50">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(item.status)}`}>
                        {item.status}
                    </span>
                </td>

                 <td className="p-6 border-r border-gray-50">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                            <CheckSquare size={12} /> {item.tasks?.length || 0} Tugas Selesai
                        </div>
                        <div className="flex items-center gap-1">
                            {item.photos && item.photos.length > 0 ? (
                                item.photos.slice(0, 3).map((photo, idx) => (
                                    <img key={idx} src={photo} className="w-8 h-8 rounded-lg border border-gray-200 object-cover shadow-sm" alt="Bukti" />
                                ))
                            ) : (
                                <span className="text-[9px] text-gray-300 italic">No photos</span>
                            )}
                            {item.photos && item.photos.length > 3 && (
                                <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[9px] font-bold text-gray-400 border border-gray-200">
                                    +{item.photos.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                </td>

                <td className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                            className="p-2 text-gray-300 hover:text-black transition-all bg-white hover:bg-gray-50 rounded-xl"
                        >
                            <Eye size={16} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                            className="p-2 text-gray-300 hover:text-blue-600 transition-all bg-white hover:bg-blue-50 rounded-xl"
                        >
                            <Pencil size={16} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                            className="p-2 text-gray-300 hover:text-red-500 transition-all bg-white hover:bg-red-50 rounded-xl"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-10 py-8 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Showing <span className="text-black ml-1">{data.length} records</span>
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronsLeft size={16} />
                 </button>
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronLeft size={16} />
                 </button>
                 
                 <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-[11px] shadow-xl shadow-black/20">1</div>
                 
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronRight size={16} />
                 </button>
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronsRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
