import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Info, UserPlus, Plus, Trash2, Edit3, MessageCircle } from 'lucide-react';
import { useSiteData } from '../contexts/SiteContext';
import EditableText from './EditableText';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${date.getMonth() + 1}月${date.getDate()}日(${days[date.getDay()]})`;
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export default function Schedule() {
  const { siteData, updateSchedule, addSchedule, removeSchedule, isAdmin } = useSiteData();

  const handleAddSchedule = () => {
    addSchedule({
      date: new Date().toISOString().slice(0, 16),
      location: '未定',
      isRecruiting: false,
      description: '通常練習'
    });
  };

  return (
    <section id="schedule" className="py-24 bg-white relative">
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="w-full h-full bg-speed-lines" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <span className="absolute -top-6 -left-8 text-8xl text-zinc-100 font-black font-display rotate-[-5deg]">CALENDAR</span>
            <h2 className="font-display text-5xl sm:text-7xl font-black text-[#1A1A1A] tracking-wider relative z-10">
              SCHEDULE
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#E60012] skew-x-[-20deg]" />
            </h2>
          </div>
          <p className="font-sans text-[#E60012] font-bold tracking-widest mt-4">〜 今月の活動予定 〜</p>

          {isAdmin && (
            <button 
              onClick={handleAddSchedule}
              className="mt-8 bg-[#1A1A1A] text-white px-6 py-2 font-bold tracking-widest hover:bg-[#E60012] transition-colors border-2 border-transparent flex items-center gap-2 mx-auto"
            >
              <Plus size={20} /> スケジュールを追加
            </button>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {(!siteData.schedules || siteData.schedules.length === 0) ? (
            <div className="text-center py-12 bg-zinc-50 border-4 border-zinc-200">
              <p className="font-sans font-bold text-zinc-500">現在、予定されているスケジュールはありません。</p>
            </div>
          ) : (
            siteData.schedules.map((schedule: any) => (
              <motion.div 
                key={schedule.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#E60012] p-6 relative group"
              >
                {isAdmin && (
                  <button 
                    onClick={() => removeSchedule(schedule.id)}
                    className="absolute top-4 right-4 bg-black/80 hover:bg-black text-white p-2 z-50 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="flex-shrink-0 md:w-48 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-zinc-300 pb-4 md:pb-0 md:pr-6 cursor-text">
                    {isAdmin ? (
                      <div>
                        <label className="text-xs text-zinc-500 mb-1 block">日時編集</label>
                        <input 
                          type="datetime-local" 
                          value={schedule.date.slice(0, 16)} 
                          onChange={(e) => updateSchedule(schedule.id, { date: e.target.value })}
                          className="w-full border-2 border-zinc-300 p-1 bg-zinc-50"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-[#E60012] mb-1">
                          <Calendar size={20} />
                          <span className="font-display font-black text-2xl">{formatDate(schedule.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-600 font-bold ml-1">
                          <Clock size={16} />
                          <span>{formatTime(schedule.date)} 〜</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex-grow space-y-3 cursor-text">
                    <div className="flex items-start gap-2">
                      <MapPin size={18} className="text-[#1A1A1A] mt-1 shrink-0" />
                      <div className="w-full">
                        <EditableText 
                          value={schedule.location}
                          onSave={(val) => updateSchedule(schedule.id, { location: val })}
                          className="font-sans font-bold text-lg text-[#1A1A1A] w-full block"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Info size={18} className="text-[#1A1A1A] mt-0.5 shrink-0" />
                      <div className="w-full">
                        <EditableText 
                          value={schedule.description}
                          onSave={(val) => updateSchedule(schedule.id, { description: val })}
                          className="font-sans font-bold text-zinc-600 text-sm w-full block"
                          multiline={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:w-56 shrink-0 flex flex-col gap-3">
                    {isAdmin ? (
                      <div className="bg-zinc-50 p-3 border-2 border-zinc-200">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                          <input 
                            type="checkbox" 
                            checked={schedule.isRecruiting} 
                            onChange={(e) => updateSchedule(schedule.id, { isRecruiting: e.target.checked })}
                            className="w-5 h-5 accent-[#E60012]"
                          />
                          ゲスト募集する
                        </label>
                      </div>
                    ) : (
                      <>
                        {schedule.isRecruiting ? (
                          <>
                            <div className="bg-green-100 text-green-800 px-4 py-2 text-center font-bold text-sm flex items-center justify-center gap-2 border-2 border-green-500">
                              <UserPlus size={16} />
                              ゲスト参加 可
                            </div>
                            <a 
                              href="https://www.instagram.com/shammgod_sapporo/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-[#E60012] text-white px-4 py-2.5 text-center font-bold text-sm flex items-center justify-center gap-2 hover:bg-black transition-colors skew-x-[-10deg]"
                            >
                              <div className="skew-x-[10deg] flex items-center gap-2">
                                <MessageCircle size={16} />
                                DMで参加希望を送る
                              </div>
                            </a>
                          </>
                        ) : (
                          <div className="bg-zinc-100 text-zinc-500 px-4 py-3 text-center font-bold text-sm flex items-center justify-center gap-2 border-2 border-zinc-300">
                            <UserPlus size={16} />
                            ゲスト募集なし
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
