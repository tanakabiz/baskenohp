import React, { useState, useEffect } from 'react';
import { useSiteData } from '../contexts/SiteContext';
import { Edit3 } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  as?: any;
  className?: string;
  multiline?: boolean;
}

export default function EditableText({ 
  value, 
  onSave, 
  as = "span", 
  className = "", 
  multiline = false 
}: EditableTextProps) {
  const { isAdmin } = useSiteData();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleSave = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    onSave(text);
    setIsEditing(false);
  };

  const Tag = as;

  if (!isAdmin) {
    return (
      <Tag className={className}>
        {value.split('\n').map((line, i) => <span key={i}>{line}{i !== value.split('\n').length - 1 && <br/>}</span>)}
      </Tag>
    );
  }

  if (isEditing) {
    return (
      <span className={`block relative ${className} bg-yellow-50/90 text-black border-2 border-dashed border-[#E60012] p-1 min-w-[100px] z-50`} onClick={(e) => e.stopPropagation()}>
        {multiline ? (
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className="w-full bg-transparent outline-none resize-y min-h-[100px] text-black"
            autoFocus
          />
        ) : (
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className="w-full bg-transparent outline-none text-black"
            autoFocus
          />
        )}
        <span className="absolute -bottom-8 right-0 flex gap-2 w-max shadow-md">
           <button onClick={(e) => { e.stopPropagation(); setIsEditing(false); }} className="bg-zinc-800 text-white text-xs px-3 py-1.5 font-sans font-bold hover:bg-black">キャンセル</button>
           <button onClick={handleSave} className="bg-[#E60012] text-white text-xs px-3 py-1.5 font-sans font-bold hover:bg-red-700">保存</button>
        </span>
      </span>
    );
  }

  return (
    <Tag 
      className={`${className} group relative cursor-pointer hover:ring-2 hover:ring-[#E60012] hover:ring-offset-2 transition-all outline-dashed outline-2 outline-transparent hover:outline-[#E60012]/30`} 
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
      }}
    >
      {value.split('\n').map((line, i) => <span key={i}>{line}{i !== value.split('\n').length - 1 && <br/>}</span>)}
      <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-[#E60012] text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
        <Edit3 size={14} />
      </span>
    </Tag>
  );
}
