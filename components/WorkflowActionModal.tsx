
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, RotateCcw, MessageSquare } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
  action: 'Approve' | 'Reject' | 'Revise';
  entityName?: string;
}

export const WorkflowActionModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, action, entityName }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setComment('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Validation: Comment is mandatory for Reject and Revise
    if ((action === 'Reject' || action === 'Revise') && !comment.trim()) {
      setError('Komentar/Alasan wajib diisi untuk tindakan ini.');
      return;
    }
    onSubmit(comment);
  };

  const getHeaderStyle = () => {
    switch (action) {
      case 'Approve': return { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, iconColor: 'text-green-600', title: 'Konfirmasi Persetujuan' };
      case 'Reject': return { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, iconColor: 'text-red-600', title: 'Alasan Penolakan' };
      case 'Revise': return { bg: 'bg-blue-50', text: 'text-blue-700', icon: RotateCcw, iconColor: 'text-blue-600', title: 'Catatan Revisi' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', icon: MessageSquare, iconColor: 'text-gray-600', title: 'Workflow Action' };
    }
  };

  const style = getHeaderStyle();
  const Icon = style.icon;

  return (
    <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100">
        
        {/* Header */}
        <div className={`px-8 py-6 border-b border-gray-100 flex items-center justify-between ${style.bg}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-white rounded-xl shadow-sm ${style.iconColor}`}>
              <Icon size={20} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className={`text-[16px] font-black uppercase tracking-tight leading-none ${style.text}`}>
                    {style.title}
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wide">
                    {action === 'Approve' ? 'Lanjutkan proses?' : 'Berikan alasan detail'}
                </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-all p-2 rounded-full hover:bg-white/50">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-4">
            {entityName && (
                <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Item Reference</span>
                    <span className="text-[12px] font-black text-black line-clamp-1">{entityName}</span>
                </div>
            )}

            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    {action === 'Approve' ? 'Catatan (Opsional)' : 'Komentar / Alasan'} <span className="text-red-500">*</span>
                </label>
                <textarea 
                    className={`w-full bg-[#F8F9FA] border rounded-2xl px-5 py-4 text-[13px] font-medium text-black outline-none transition-all placeholder:text-gray-300 shadow-inner min-h-[120px] resize-none
                        ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-black/20'}
                    `}
                    placeholder={action === 'Reject' ? "Contoh: Dokumen tidak lengkap, mohon lampirkan ulang..." : "Ketik catatan di sini..."}
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                        if (error) setError('');
                    }}
                    autoFocus
                />
                {error && <p className="text-[10px] font-bold text-red-500 mt-2 flex items-center gap-1"><XCircle size={10} /> {error}</p>}
            </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-white border-t border-gray-100 flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all"
          >
            Batal
          </button>
          <button 
            onClick={handleSubmit} 
            className={`flex-[2] py-3 text-[11px] font-black uppercase tracking-widest text-white rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2
                ${action === 'Approve' ? 'bg-green-600 hover:bg-green-700 shadow-green-200' : 
                  action === 'Reject' ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : 
                  'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}
            `}
          >
            {action === 'Approve' ? 'Setujui' : 'Kirim'}
          </button>
        </div>
      </div>
    </div>
  );
};
