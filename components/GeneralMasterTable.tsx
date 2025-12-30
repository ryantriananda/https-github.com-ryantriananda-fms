
import React from 'react';
import { GeneralMasterItem } from '../types';
import { Pencil, Trash2, ChevronLeft, ChevronRight, MoreHorizontal, Car, Truck, Bike, Bus, Layers } from 'lucide-react';

interface Props {
  data: GeneralMasterItem[];
  onEdit: (item: GeneralMasterItem) => void;
  onDelete: (id: number) => void;
  title?: string;
}

export const GeneralMasterTable: React.FC<Props> = ({ data, onEdit, onDelete, title }) => {
  const isVehicleType = title?.toLowerCase().includes('kendaraan');

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('motor') || n.includes('bike') || n.includes('roda dua')) return <Bike size={18} />;
    if (n.includes('truck') || n.includes('truk') || n.includes('box')) return <Truck size={18} />;
    if (n.includes('bus')) return <Bus size={18} />;
    return <Car size={18} />;
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-6 w-24 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">#</th>
              <th className="p-6 text-[10px] font-black text-black uppercase tracking-[0.15em] border-b border-gray-100">Item Description / Category Name</th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em] border-b border-gray-100">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px] text-gray-700">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                        <td className="p-6 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                        <td className="p-6">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-black border border-gray-100 shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                                    {isVehicleType ? getIcon(item.name) : <Layers size={18} />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-black uppercase tracking-tight text-[14px]">
                                        {item.name}
                                    </span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Sistem ID: {item.id}</span>
                                </div>
                            </div>
                        </td>
                        <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <button 
                                    onClick={() => onEdit(item)}
                                    className="p-3 text-gray-400 hover:text-black bg-white hover:bg-gray-100 rounded-xl transition-all border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md"
                                    title="Edit Item"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button 
                                    onClick={() => onDelete(item.id)}
                                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100 shadow-sm hover:shadow-md"
                                    title="Hapus Item"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3} className="p-32 text-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                                <MoreHorizontal size={32} className="text-gray-200" />
                            </div>
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">Belum ada data tersedia</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Pagination Footer */}
       <div className="px-10 py-8 border-t border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Total <span className="text-black ml-1 font-black">{data.length} Master Items</span>
            </div>
            
            <div className="flex items-center gap-3">
                 <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronLeft size={18} />
                 </button>
                 <div className="bg-black text-white w-11 h-11 flex items-center justify-center rounded-xl font-black text-[12px] shadow-2xl shadow-black/20">1</div>
                 <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronRight size={18} />
                 </button>
            </div>
      </div>
    </div>
  );
};
