
import React, { useRef, useState } from 'react';
import { X, UploadCloud, FileSpreadsheet, CheckCircle2, Download, AlertCircle, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
  title: string;
  templateName?: string;
}

export const ImportDataModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onImport, 
    title,
    templateName = "DATA_TEMPLATE.xlsx"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile);
      onClose();
      setSelectedFile(null);
    }
  };

  const handleDownloadTemplate = () => {
      // Logic download template dummy
      const link = document.createElement('a');
      link.href = '#';
      link.download = templateName;
      document.body.appendChild(link);
      // link.click(); // Uncomment to simulate click
      alert(`Downloading template: ${templateName}`);
      document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100">
        
        {/* Header */}
        <div className="px-10 py-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-[16px] font-black text-black uppercase tracking-tight leading-none">
              IMPORT DATA: {title}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 space-y-10 bg-white">
            
            {/* Step 1: Download Template */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">1</div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">DOWNLOAD TEMPLATE</span>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100 group-hover:scale-110 transition-transform">
                            <FileSpreadsheet size={20} strokeWidth={2} />
                        </div>
                        <div>
                            <h4 className="text-[12px] font-black text-black uppercase tracking-tight">{templateName}</h4>
                            <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-wide">Format Standar untuk Import Data</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleDownloadTemplate}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-[10px] font-black uppercase tracking-widest text-black hover:bg-black hover:text-white hover:border-black transition-all flex items-center gap-2"
                    >
                        <Download size={14} /> Download
                    </button>
                </div>
            </div>

            {/* Step 2: Upload File */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">2</div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">UPLOAD COMPLETED FILE</span>
                </div>

                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".xlsx, .xls, .csv" 
                    onChange={handleFileChange} 
                />
                
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`h-48 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group
                    ${isDragging ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black hover:bg-gray-50'}
                    ${selectedFile ? 'border-green-500 bg-green-50/10' : ''}
                    `}
                >
                    {selectedFile ? (
                        <div className="text-center animate-in zoom-in duration-300">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600 shadow-sm">
                                <CheckCircle2 size={24} strokeWidth={3} />
                            </div>
                            <p className="text-[12px] font-black text-black uppercase tracking-widest mb-1">{selectedFile.name}</p>
                            <p className="text-[10px] font-bold text-gray-400">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                            <p className="text-[10px] font-bold text-green-600 mt-3 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">Click to change file</p>
                        </div>
                    ) : (
                        <div className="text-center p-8">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 group-hover:scale-110 transition-transform">
                                <UploadCloud size={24} />
                            </div>
                            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                Click to Browse or Drag and Drop your file here
                            </p>
                            <p className="text-[10px] font-bold text-gray-300 uppercase">Supported: .XLSX, .XLS (Max. 10MB)</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-blue-700 uppercase leading-relaxed tracking-wide">
                    Pastikan format kolom pada file Excel Anda sudah sesuai dengan template agar data dapat terbaca dengan sempurna oleh sistem.
                </p>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
            <button 
                onClick={onClose} 
                className="px-8 py-4 bg-white border border-gray-200 text-gray-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 hover:text-black transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleImport}
              disabled={!selectedFile}
              className="px-10 py-4 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <UploadCloud size={16} /> Process Import
            </button>
        </div>
      </div>
    </div>
  );
};
