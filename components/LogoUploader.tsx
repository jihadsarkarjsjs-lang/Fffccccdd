
import React, { useState, useRef } from 'react';

interface LogoUploaderProps {
  onLogoChange: (logo: string | null) => void;
  currentLogo: string | null;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoChange, currentLogo }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onLogoChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center cursor-pointer
        ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}
        ${currentLogo ? 'bg-slate-50' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={onFileInputChange} 
      />
      
      {currentLogo ? (
        <div className="flex flex-col items-center gap-2">
          <img src={currentLogo} alt="Company Logo" className="h-16 w-auto object-contain rounded" />
          <p className="text-xs text-slate-500">Click to change logo</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="text-sm font-medium text-slate-700">Drag & drop logo here</div>
          <p className="text-xs text-slate-500">or click to browse</p>
        </div>
      )}
    </div>
  );
};

export default LogoUploader;
