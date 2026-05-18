import React, { useRef, useState } from 'react';
import { useSiteData } from '../contexts/SiteContext';
import { ImagePlus } from 'lucide-react';

interface EditableImageProps {
  src: string;
  onSave: (base64: string) => void;
  className?: string;
  alt?: string;
}

export default function EditableImage({
  src,
  onSave,
  className = "",
  alt = ""
}: EditableImageProps) {
  const { isAdmin } = useSiteData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimension 1200px
          const MAX_SIZE = 1200;
          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            onSave(compressedBase64);
            setHasError(false);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  if (!isAdmin) {
    if (hasError || !src) {
      return <div className={`bg-transparent ${className}`}></div>;
    }
    return <img src={src} alt="" className={className} onError={handleError} />;
  }

  // Extract object-fit / object-position classes to apply to inner img
  const matchImgClasses = className.match(/object-\S+/g) || [];
  const imgClasses = `w-full h-full object-cover group-hover:opacity-60 transition-all ${matchImgClasses.join(' ')}`;

  return (
    <div 
      className={`relative group cursor-pointer inline-block ${className}`} 
      onClick={(e) => {
        e.stopPropagation();
        fileInputRef.current?.click();
      }}
    >
      {!hasError && src ? (
        <img src={src} alt="" className={imgClasses} onError={handleError} />
      ) : (
        <div className={`w-full h-full bg-black/5 flex items-center justify-center text-zinc-400 group-hover:opacity-60 transition-all`}>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity ring-4 ring-inset ring-[#E60012]">
        <div className="bg-[#E60012] text-white px-4 py-2 rounded-full flex gap-2 items-center font-bold text-sm shadow-lg whitespace-nowrap">
          <ImagePlus size={18} /> 画像を変更
        </div>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
