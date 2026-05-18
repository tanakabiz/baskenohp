import { motion } from 'motion/react';
import { MapPin, Clock, Trophy, Flame, Instagram } from 'lucide-react';
import { useSiteData } from '../contexts/SiteContext';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

export default function TeamIntro() {
  const { siteData, updateSiteData } = useSiteData();

  const specs = [
    { label: '活動エリア', value: '札幌市西区・北区・東区', icon: MapPin },
    { label: '活動時間', value: '夜メイン', icon: Clock },
    { label: 'レベル', value: '市民大会1〜2回戦', icon: Trophy },
    { label: 'プレースタイル', value: 'エンジョイ × 本気', icon: Flame },
  ];

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-zinc-50 border-y-4 border-[#1A1A1A]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,#E60012_0%,transparent_70%)] opacity-20" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle_at_bottom_left,#E60012_0%,transparent_70%)] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Manga style image frame */}
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-[#E60012] translate-x-4 translate-y-4 shadow-xl z-0" />
            <div className="absolute inset-0 border-4 border-[#1A1A1A] translate-x-2 translate-y-2 z-10 pointer-events-none" />
            
            <div className="relative z-20 aspect-square md:aspect-[3/4] bg-[#1A1A1A] overflow-hidden group">
               <EditableImage 
                 src={siteData.teamIntro.image} 
                 onSave={(base64) => updateSiteData({ teamIntro: { ...siteData.teamIntro, image: base64 } })}
                 alt="Team Shammgod" 
                 className="w-full h-full object-cover object-center md:object-top group-hover:scale-105 transition-transform duration-700" 
               />
               
               <a 
                 href="https://www.instagram.com/shammgod_sapporo/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="absolute bottom-6 right-6 bg-white/90 p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-[#E60012] hover:text-white text-[#E60012] transition-colors border-2 border-[#1A1A1A] z-30"
               >
                 <Instagram size={32} />
               </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-8">
             <div className="inline-block relative">
                <span className="absolute -top-3 -left-4 text-6xl text-[#E60012]/20 font-black font-display rotate-[-10deg]">VIBES</span>
                <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1A1A1A] tracking-wider relative z-10">
                  <EditableText 
                    value={siteData.teamIntro.title}
                    onSave={(val) => updateSiteData({ teamIntro: { ...siteData.teamIntro, title: val } })}
                    as="span"
                  />
                  <span className="block w-1/2 h-1 bg-[#E60012] mt-2 skew-x-[-20deg]" />
                </h2>
             </div>

             <div className="space-y-4 font-sans text-lg text-zinc-700 font-bold leading-relaxed border-l-4 border-[#E60012] pl-6 bg-white p-4 shadow-sm relative">
                <div className="absolute top-0 right-0 w-8 h-8 bg-speed-lines opacity-10" />
                <EditableText 
                  value={siteData.teamIntro.description1}
                  onSave={(val) => updateSiteData({ teamIntro: { ...siteData.teamIntro, description1: val } })}
                  as="p"
                  multiline={true}
                />
                <EditableText 
                  value={siteData.teamIntro.description2}
                  onSave={(val) => updateSiteData({ teamIntro: { ...siteData.teamIntro, description2: val } })}
                  as="p"
                  multiline={true}
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-4 border-2 border-[#1A1A1A] skew-x-[-2deg] hover:bg-[#1A1A1A] hover:text-white transition-colors group"
                  >
                    <div className="skew-x-[2deg]">
                      <spec.icon className="text-[#E60012] mb-2 group-hover:text-white transition-colors" size={24} />
                      <p className="font-display text-xs text-zinc-500 group-hover:text-zinc-400 mb-1">{spec.label}</p>
                      <p className="font-sans font-black tracking-wide">{spec.value}</p>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
