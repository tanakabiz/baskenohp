import { useRef } from 'react';
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("ファイルサイズが大きすぎます（5MB以下にしてください）");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAdmin) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div className={`relative group cursor-pointer inline-block ${className}`} onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      fileInputRef.current?.click();
    }}>
      <img src={src} alt={alt} className={`w-full h-full object-cover group-hover:opacity-60 transition-all`} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity ring-4 ring-inset ring-[#E60012]">
        <div className="bg-[#E60012] text-white px-4 py-2 rounded-full flex gap-2 items-center font-bold text-sm shadow-lg whitespace-nowrap">
          <ImagePlus size={18} /> 画像を変更
        </div>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
