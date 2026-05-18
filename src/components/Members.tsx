import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Instagram, Plus, Trash2 } from 'lucide-react';
import { useSiteData } from '../contexts/SiteContext';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const getStatColor = (value: string) => {
  if (value.includes('S')) return 'text-[#E60012]';
  if (value === 'A') return 'text-orange-500';
  if (value === 'B') return 'text-yellow-500';
  if (value === 'C') return 'text-green-500';
  if (value === 'D') return 'text-blue-500';
  if (value === 'E') return 'text-purple-500';
  if (value === 'F') return 'text-zinc-400';
  if (value === 'G') return 'text-zinc-600';
  return 'text-zinc-500';
};

export default function Members() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { siteData, updateMember, addMember, removeMember, isAdmin } = useSiteData();

  const handleAddMember = () => {
    addMember({
      name: 'Player New',
      alias: '新しいメンバー',
      position: 'ポジション',
      specialMove: 'Coming soon...',
      quote: 'Coming soon...',
      instagram: '',
      image: '/syam.png',
      stats: [
        { subject: '得点力', value: 'C' },
        { subject: '3P', value: 'C' },
        { subject: 'スピード', value: 'C' },
        { subject: 'フィジカル', value: 'C' },
        { subject: 'スタミナ', value: 'C' },
        { subject: 'IQ', value: 'C' },
        { subject: 'ディフェンス', value: 'C' },
      ]
    });
  };

  return (
    <section id="members" className="py-24 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 bg-speed-lines opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-wider inline-block relative">
            <span className="relative z-10">ROSTER</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-[#E60012] skew-x-[-20deg]" />
          </h2>
          <p className="font-sans text-[#E60012] font-bold tracking-widest mt-4">〜 シャムゴットの精鋭たち 〜</p>
          
          {isAdmin && (
            <button 
              onClick={handleAddMember}
              className="mt-8 bg-[#E60012] text-white px-6 py-2 font-bold tracking-widest hover:bg-white hover:text-[#E60012] transition-colors border-2 border-transparent hover:border-[#E60012] flex items-center gap-2 mx-auto"
            >
              <Plus size={20} /> メンバーを追加
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.members.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white border-4 border-white hover:border-[#E60012] transition-colors relative group overflow-hidden cursor-pointer flex flex-col"
              onClick={() => setSelectedId(selectedId === member.id ? null : member.id)}
            >
              {isAdmin && (
                <button 
                  onClick={(e) => { e.stopPropagation(); removeMember(member.id); }}
                  className="absolute top-2 left-2 bg-black/80 hover:bg-black text-white p-2 z-50 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              <div className="absolute top-0 right-0 bg-[#E60012] text-white font-display text-xs px-2 py-1 font-black z-10 w-24 text-center cursor-text">
                <EditableText 
                  value={member.position}
                  onSave={(val) => updateMember(member.id, { position: val })}
                />
              </div>

              <div className="bg-[#1A1A1A] flex items-center justify-center h-64 relative overflow-hidden border-b-4 border-[#1A1A1A]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#E60012_0%,transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity z-10 pointer-events-none" />
                <EditableImage 
                  src={member.image || `/player-${member.id}.png`}
                  alt={member.name}
                  onSave={(base64) => updateMember(member.id, { image: base64 })}
                  className="w-full h-full object-cover object-top transition-transform duration-500"
                />
              </div>
              
              <div className="p-4 bg-white relative flex-grow flex flex-col">
                <div className="absolute -top-6 left-2 bg-[#1A1A1A] text-white px-3 py-1 font-sans font-bold text-xs transform -skew-x-12 z-10 border border-[#1A1A1A] cursor-text max-w-[80%]">
                  <EditableText 
                    value={member.alias}
                    onSave={(val) => updateMember(member.id, { alias: val })}
                    className="skew-x-12 block truncate"
                  />
                </div>

                <div className="flex items-center justify-between mt-2 flex-wrap gap-2 text-black cursor-text">
                  <h3 className="font-display text-2xl font-black text-[#1A1A1A] group-hover:text-[#E60012] transition-colors break-words">
                    <EditableText 
                      value={member.name}
                      onSave={(val) => updateMember(member.id, { name: val })}
                    />
                  </h3>
                  {member.instagram && !isAdmin && (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="bg-zinc-100 p-2 rounded-full text-zinc-400 hover:text-[#E60012] hover:bg-red-50 transition-colors shrink-0">
                      <Instagram size={18} />
                    </a>
                  )}
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 bg-zinc-50 p-3 border-2 border-zinc-100 mb-2 cursor-text">
                  {member.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-end border-b-2 border-zinc-200 border-dotted pb-1">
                      <EditableText 
                        value={stat.subject}
                        onSave={(val) => {
                          const newStats = [...member.stats];
                          newStats[idx].subject = val;
                          updateMember(member.id, { stats: newStats });
                        }}
                        className="font-sans text-[10px] font-black text-zinc-500 tracking-wider inline-block min-w-[40px]"
                      />
                      <EditableText 
                        value={stat.value}
                        onSave={(val) => {
                          const newStats = [...member.stats];
                          newStats[idx].value = val;
                          updateMember(member.id, { stats: newStats });
                        }}
                        className={`font-display font-black text-xl leading-none italic ${getStatColor(stat.value)} drop-shadow-sm min-w-[20px] text-right inline-block`}
                      />
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {(selectedId === member.id || isAdmin) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-auto cursor-text text-black"
                    >
                      <div className="mt-2 pt-4 border-t-2 border-zinc-100 space-y-4">
                        <div>
                          <p className="text-xs text-zinc-500 font-bold mb-1 flex items-center gap-1"><Zap size={12} className="text-[#E60012]" /> 必殺技</p>
                          <div className="font-display font-black text-[#1A1A1A] text-sm bg-zinc-100 p-2 border-l-4 border-[#1A1A1A]">
                            <EditableText 
                              value={member.specialMove || 'N/A'}
                              onSave={(val) => updateMember(member.id, { specialMove: val })}
                              className="block"
                            />
                          </div>
                        </div>
                        <div>
                           <p className="text-xs text-zinc-500 font-bold mb-1">一言</p>
                           <div className="font-sans font-bold text-[#1A1A1A] text-sm border-l-4 border-[#E60012] pl-2">
                             <EditableText 
                                value={member.quote || ''}
                                onSave={(val) => updateMember(member.id, { quote: val })}
                                className="block"
                             />
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {selectedId !== member.id && !isAdmin && (
                  <div className="text-center mt-3 group-hover:opacity-100 opacity-50 transition-opacity mt-auto pt-2">
                    <span className="text-[10px] font-black text-[#E60012] block animate-bounce tracking-widest bg-red-50 py-1">▼ TAP FOR DETAILS ▼</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
