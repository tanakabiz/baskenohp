import { motion } from 'motion/react';
import { ArrowRight, Instagram } from 'lucide-react';
import { useSiteData } from '../contexts/SiteContext';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

export default function Hero() {
  const { siteData, updateSiteData } = useSiteData();

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Anime Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-speed-lines opacity-10" />
        <div className="absolute top-0 right-0 w-[50vw] h-[100vh] bg-[#E60012] clip-slant-reverse opacity-5" />
        {/* Dynamic background image */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center opacity-80 mix-blend-multiply flex-shrink-0">
             <EditableImage 
               src={siteData.hero.image} 
               onSave={(base64) => updateSiteData({ hero: { ...siteData.hero, image: base64 } })}
               alt="Shammgod Team" 
               className="w-full h-full object-cover object-[70%_center] lg:object-center" 
             />
             
             {/* Instagram Icon Overlay on the image */}
             <a 
               href="https://www.instagram.com/shammgod_sapporo/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="absolute bottom-1/4 right-1/4 md:bottom-20 md:right-32 bg-white/90 p-4 sm:p-6 rounded-full shadow-[0_0_30px_rgba(230,0,18,0.4)] hover:scale-110 hover:bg-[#E60012] hover:text-white text-[#E60012] transition-all group z-20 border-4 border-[#1A1A1A]"
             >
               <Instagram size={40} className="sm:w-16 sm:h-16" />
               <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white font-display text-xs sm:text-sm font-black tracking-widest px-4 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                 CHECK OUR INSTAGRAM
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#1A1A1A]"></div>
               </span>
             </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="mb-8"
          >
            <h1 className="font-brush text-[3.5rem] sm:text-[5rem] lg:text-[7rem] leading-[1.1] font-bold text-[#1A1A1A] tracking-tighter mix-blend-darken relative">
              <EditableText 
                value={siteData.hero.catchphrase1}
                onSave={(val) => updateSiteData({ hero: { ...siteData.hero, catchphrase1: val } })}
                as="span"
                className="block text-stroke-2 text-white"
              />
              <EditableText 
                value={siteData.hero.catchphrase2}
                onSave={(val) => updateSiteData({ hero: { ...siteData.hero, catchphrase2: val } })}
                as="span"
                className="block text-[#E60012]"
              />
            </h1>
            <p className="font-display text-xl sm:text-2xl mt-6 text-[#1A1A1A] font-black tracking-wide bg-white/80 inline-block px-2">
              <EditableText 
                value={siteData.hero.subtext}
                onSave={(val) => updateSiteData({ hero: { ...siteData.hero, subtext: val } })}
                as="span"
              />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-zinc-600 text-lg max-w-lg mb-10 font-sans font-bold leading-relaxed bg-white/80 inline-block p-2"
          >
            <EditableText 
              value={siteData.hero.description}
              onSave={(val) => updateSiteData({ hero: { ...siteData.hero, description: val } })}
              as="span"
              multiline={true}
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#recruit"
              className="group relative px-8 py-5 bg-[#E60012] text-white font-display font-black text-lg tracking-widest overflow-hidden skew-x-[-10deg] shadow-[8px_8px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#1A1A1A] transition-all"
            >
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="relative skew-x-[10deg] flex items-center justify-center gap-2">
                練習試合を申し込む
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </a>
            
            <a
              href="https://www.instagram.com/shammgod_sapporo/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-5 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-display font-black text-lg tracking-widest overflow-hidden skew-x-[-10deg] shadow-[8px_8px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#1A1A1A] transition-all flex items-center justify-center gap-2"
            >
              <div className="skew-x-[10deg] flex items-center gap-2">
                <Instagram size={20} />
                Instagramを見る
              </div>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative manga text */}
      <div className="absolute -right-20 top-1/4 opacity-10 pointer-events-none hidden lg:block rotate-90">
        <span className="font-brush text-9xl tracking-[0.2em] whitespace-nowrap text-[#1A1A1A]">闘志燃焼</span>
      </div>
    </section>
  );
}
