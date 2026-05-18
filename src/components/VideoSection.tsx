import { Youtube } from 'lucide-react';

export default function VideoSection() {
  return (
    <section className="py-24 bg-[#1A1A1A] relative border-y-4 border-[#E60012]">
      <div className="absolute inset-0 bg-flame-gradient opacity-10 mix-blend-overlay" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 text-center text-white">
          <div className="inline-flex items-center justify-center bg-[#E60012] p-4 rounded-full mb-4 shadow-[0_0_20px_rgba(230,0,18,0.5)]">
            <Youtube size={40} className="fill-current text-white" />
          </div>
          <h2 className="font-display text-4xl font-black tracking-wider block">MATCH ARCHIVES</h2>
          <p className="font-sans font-bold mt-4 text-zinc-400">試合の空気感、熱量を動画で体感せよ</p>
        </div>

        <div className="aspect-video w-full bg-zinc-900 border-4 border-white shadow-[0_0_30px_rgba(230,0,18,0.3)] relative overflow-hidden group">
          {/* Replace this div with actual iframe when ready */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <Youtube size={64} className="text-[#E60012] mb-4 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all" />
            <h3 className="font-display text-2xl text-white font-black tracking-widest mb-2">YOUTUBE CHANNEL</h3>
            <p className="font-sans text-zinc-400 font-bold">試合動画はYouTubeで公開中！</p>
            <a 
              href="https://www.youtube.com/@shammgod.official" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 px-6 py-3 bg-[#E60012] text-white font-display font-black tracking-widest skew-x-[-10deg] hover:bg-white hover:text-[#1A1A1A] transition-colors"
            >
              <div className="skew-x-[10deg]">チャンネルを見る</div>
            </a>
          </div>
          
          <div className="absolute inset-0 bg-speed-lines opacity-20" />
        </div>
      </div>
    </section>
  );
}
