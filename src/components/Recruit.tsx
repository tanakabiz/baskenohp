import { Instagram, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Recruit() {
  return (
    <section id="recruit" className="py-32 bg-white relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
         <span className="font-display font-black text-[30vw] text-zinc-50 tracking-tighter whitespace-nowrap opacity-50 pointer-events-none select-none">
           BATTLE
         </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ type: "spring", bounce: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-2 font-display text-lg tracking-widest skew-x-[-10deg] mb-8">
            <Zap size={20} className="text-[#E60012]" />
            <span className="skew-x-[10deg]">挑戦者求む</span>
          </div>
          
          <h2 className="font-brush text-5xl sm:text-7xl font-bold text-[#1A1A1A] mb-8 text-stroke-1">
            練習試合相手<br/>
            <span className="text-[#E60012] text-stroke-none text-6xl sm:text-8xl block mt-2">大募集!!</span>
          </h2>
        </motion.div>

        <div className="font-sans font-bold text-lg sm:text-xl text-zinc-700 space-y-6 mb-12 bg-white/80 p-8 border-4 border-[#1A1A1A] shadow-[12px_12px_0px_#E60012] text-left mx-auto max-w-2xl transform rotate-1">
          <ul className="space-y-4 list-none">
            <li className="flex items-start gap-3">
              <span className="text-[#E60012] font-black text-2xl leading-none mt-1">✔</span>
              <span>どんなチームでも大歓迎！楽しく対戦しましょう。</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#E60012] font-black text-2xl leading-none mt-1">✔</span>
              <span>札幌市内OK！市外からの遠征も歓迎します。</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#E60012] font-black text-2xl leading-none mt-1">✔</span>
              <span>市外チーム様とは、土日祝の昼間メインで調整可能です。</span>
            </li>
          </ul>
        </div>

        <p className="font-display text-2xl font-black text-[#1A1A1A] mb-8 tracking-widest">
          申し込みはInstagramのDMから！
        </p>

        <motion.a
          href="https://www.instagram.com/shammgod_sapporo/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center gap-4 w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-[#E60012] to-[#FF4500] text-white font-display font-black text-2xl tracking-widest rounded-full shadow-[0_10px_30px_rgba(230,0,18,0.4)] border-4 border-white overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <Instagram size={32} />
          <span>DMを送る</span>
        </motion.a>

      </div>
    </section>
  );
}
