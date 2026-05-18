import { Trophy, History, Medal, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteData } from '../contexts/SiteContext';
import EditableText from './EditableText';

export default function Achievements() {
  const { siteData, updateAchievement, addAchievement, removeAchievement, isAdmin } = useSiteData();

  const handleAddAchievement = () => {
    addAchievement({
      year: new Date().getFullYear().toString(),
      event: '新しいイベント',
      result: '結果を入力',
    });
  };

  return (
    <section id="results" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
           <div className="w-full lg:w-1/3 pt-8 shrink-0">
             <div className="relative inline-block mb-4">
                <span className="text-6xl font-display font-black text-zinc-100 absolute -top-8 -left-8 -z-10 tracking-widest">HISTORY</span>
                <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1A1A1A] uppercase">
                  実績・経歴
                </h2>
             </div>
             <p className="font-sans font-bold text-zinc-600 mt-4 leading-relaxed">
               まだまだ発展途上のチームですが、日々成長を続けています。<br/>
               大会での勝利を目指しつつ、過程を楽しむことを忘れません。
             </p>
             
             {isAdmin && (
               <button 
                 onClick={handleAddAchievement}
                 className="mt-8 bg-[#E60012] text-white px-6 py-2 font-bold tracking-widest hover:bg-[#1A1A1A] transition-colors border-2 border-transparent flex items-center gap-2"
               >
                 <Plus size={20} /> 実績を追加
               </button>
             )}
           </div>

           <div className="w-full lg:w-2/3">
             <div className="relative border-l-4 border-[#E60012] ml-4 md:ml-0">
               {(!siteData.achievements || siteData.achievements.length === 0) ? (
                 <div className="mb-10 ml-8 text-zinc-500 font-bold">実績が登録されていません。</div>
               ) : (
                 siteData.achievements.map((record: any, index: number) => (
                   <motion.div 
                      key={record.id}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-10 ml-8 relative group"
                   >
                     {isAdmin && (
                       <button 
                         onClick={() => removeAchievement(record.id)}
                         className="absolute -right-4 -top-4 bg-black/80 hover:bg-black text-white p-2 z-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                       >
                         <Trash2 size={16} />
                       </button>
                     )}

                     <div className="absolute -left-[45px] top-1 bg-white border-4 border-[#1A1A1A] w-12 h-12 rounded-full flex items-center justify-center text-[#E60012] z-10 shadow-[4px_4px_0px_#1A1A1A]">
                       <Trophy size={20} />
                     </div>
                     
                     <div className="bg-zinc-50 border-2 border-[#1A1A1A] p-6 skew-x-[-2deg] relative shadow-[8px_8px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#1A1A1A] transition-all cursor-text flex">
                       <div className="skew-x-[2deg] w-full">
                         <div className="font-display text-[#E60012] text-xl font-black w-32 inline-block">
                           <EditableText 
                             value={record.year}
                             onSave={(val) => updateAchievement(record.id, { year: val })}
                           />
                         </div>
                         <h3 className="font-display text-2xl font-black text-[#1A1A1A] mt-1 relative z-10">
                           <EditableText 
                             value={record.event}
                             onSave={(val) => updateAchievement(record.id, { event: val })}
                           />
                         </h3>
                         <div className="font-sans font-bold text-zinc-600 mt-2 bg-white inline-block px-2 border border-zinc-200">
                           <EditableText 
                             value={record.result}
                             onSave={(val) => updateAchievement(record.id, { result: val })}
                           />
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 ))
               )}
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}
