
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 border-2 border-gray-100">
        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-500 shadow-lg border-2 border-red-200">
            <AlertTriangle size={40} strokeWidth={2.5} />
          </div>
          <h3 className="text-[18px] font-black text-black uppercase tracking-tight mb-3">{title}</h3>
          <p className="text-[13px] font-medium text-gray-500 leading-relaxed px-4">{message}</p>
        </div>
        <div className="px-10 pb-10 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-2xl text-[12px] font-black uppercase tracking-[0.15em] hover:bg-gray-100 hover:text-black transition-all border-2 border-gray-200 hover:border-gray-300"
          >
            Cancel
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.15em] hover:from-red-600 hover:to-red-700 transition-all shadow-xl shadow-red-500/40 border-2 border-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
