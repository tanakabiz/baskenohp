import { Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-24 lg:pb-10 border-t-[8px] border-[#E60012] relative overflow-hidden">
      <div className="absolute inset-0 bg-speed-lines opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b border-zinc-800 pb-16">
          
          <div className="text-center md:text-left">
            <a href="#" className="inline-block mb-4">
              <img src="/syam.png" alt="SHAMMGOD" className="h-16 w-auto object-contain bg-white/10 rounded-full p-2" />
            </a>
            <p className="text-sm font-sans font-bold text-zinc-400 max-w-sm">
              札幌市を拠点とする社会人バスケットボールチーム。<br/>
              「楽しさも、本気も。」をモットーに活動中！
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <p className="font-display tracking-widest text-[#E60012] font-black text-sm">FOLLOW US</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/shammgod_sapporo/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border-2 border-zinc-700 bg-zinc-800 flex items-center justify-center text-white hover:border-[#E60012] hover:bg-[#E60012] transition-colors shadow-[4px_4px_0px_#000]">
                <Instagram size={24} />
              </a>
              <a href="https://www.youtube.com/@shammgod.official" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border-2 border-zinc-700 bg-zinc-800 flex items-center justify-center text-white hover:border-[#E60012] hover:bg-[#E60012] transition-colors shadow-[4px_4px_0px_#000]">
                <Youtube size={24} />
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs font-sans font-bold tracking-wider uppercase">
            © {new Date().getFullYear()} Shammgod Sapporo. All rights reserved.
          </p>
          <div className="flex gap-6">
             <span className="text-zinc-600 text-xs font-sans font-bold">札幌社会人バスケットボール</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
