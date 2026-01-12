
import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

interface Props {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export const Toast: React.FC<Props> = ({ type, message, onClose }) => {
  const config = {
    success: {
      icon: CheckCircle2,
      bg: 'bg-gradient-to-r from-green-50 to-green-100',
      border: 'border-green-200',
      text: 'text-green-700',
      iconColor: 'text-green-500'
    },
    error: {
      icon: XCircle,
      bg: 'bg-gradient-to-r from-red-50 to-red-100',
      border: 'border-red-200',
      text: 'text-red-700',
      iconColor: 'text-red-500'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-gradient-to-r from-orange-50 to-orange-100',
      border: 'border-orange-200',
      text: 'text-orange-700',
      iconColor: 'text-orange-500'
    },
    info: {
      icon: Info,
      bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-700',
      iconColor: 'text-blue-500'
    }
  };

  const { icon: Icon, bg, border, text, iconColor } = config[type];

  return (
    <div className={`fixed top-24 right-8 z-[1000] ${bg} ${border} border-2 rounded-3xl shadow-2xl p-6 flex items-center gap-4 animate-in slide-in-from-top-4 fade-in duration-300 min-w-[400px]`}>
      <div className={`${iconColor} flex-shrink-0`}>
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <p className={`${text} text-[13px] font-bold flex-1 leading-relaxed`}>{message}</p>
      {onClose && (
        <button 
          onClick={onClose}
          className={`${text} hover:opacity-70 transition-opacity text-[11px] font-black uppercase tracking-wider`}
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
