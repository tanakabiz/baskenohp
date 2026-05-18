import { Instagram, Youtube, MessageSquare, Calendar } from 'lucide-react';

export default function MobileBottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        <a 
          href="#schedule" 
          className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-[#E60012] transition-colors"
        >
          <Calendar size={22} className="mb-1" />
          <span className="text-[10px] font-bold">予定</span>
        </a>
        <a 
          href="https://www.instagram.com/shammgod_sapporo/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-[#E60012] transition-colors"
        >
          <Instagram size={22} className="mb-1" />
          <span className="text-[10px] font-bold">Instagram</span>
        </a>
        <a 
          href="https://www.youtube.com/@shammgod.official" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-[#E60012] transition-colors"
        >
          <Youtube size={24} className="mb-1" />
          <span className="text-[10px] font-bold">YouTube</span>
        </a>
        <a 
          href="#recruit" 
          className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-[#E60012] transition-colors"
        >
          <MessageSquare size={22} className="mb-1" />
          <span className="text-[10px] font-bold">練習試合</span>
        </a>
      </div>
    </div>
  );
}
