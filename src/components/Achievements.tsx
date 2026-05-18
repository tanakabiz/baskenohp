import { Trophy, History, Medal } from 'lucide-react';
import { motion } from 'motion/react';

export default function Achievements() {
  const records = [
    { year: '2023', event: '札幌市民大会', result: '3回戦進出', icon: Trophy },
    { year: '2022', event: '札幌市民大会', result: '2回戦進出', icon: Medal },
    { year: '2021', event: 'チーム結成', result: '活動開始', icon: History },
  ];

  return (
    <section id="results" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
           <div className="w-full lg:w-1/3">
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
           </div>

           <div className="w-full lg:w-2/3">
             <div className="relative border-l-4 border-[#E60012] ml-4 md:ml-0">
               {records.map((record, index) => (
                 <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="mb-10 ml-8 relative"
                 >
                   <div className="absolute -left-[45px] top-1 bg-white border-4 border-[#1A1A1A] w-12 h-12 rounded-full flex items-center justify-center text-[#E60012] z-10 shadow-[4px_4px_0px_#1A1A1A]">
                     <record.icon size={20} />
                   </div>
                   
                   <div className="bg-zinc-50 border-2 border-[#1A1A1A] p-6 skew-x-[-2deg] relative shadow-[8px_8px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#1A1A1A] transition-all">
                     <div className="skew-x-[2deg]">
                       <span className="font-display text-[#E60012] text-xl font-black">{record.year}</span>
                       <h3 className="font-display text-2xl font-black text-[#1A1A1A] mt-1">{record.event}</h3>
                       <p className="font-sans font-bold text-zinc-600 mt-2 bg-white inline-block px-2 border border-zinc-200">{record.result}</p>
                     </div>
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
