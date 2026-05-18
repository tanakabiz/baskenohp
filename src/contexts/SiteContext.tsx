import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultSiteData } from '../data/defaultData';

export type SiteContextType = {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  siteData: typeof defaultSiteData;
  updateSiteData: (newData: Partial<typeof defaultSiteData>) => void;
  updateMember: (memberId: number, newData: any) => void;
  addMember: (member: any) => void;
  removeMember: (memberId: number) => void;
  updateSchedule: (scheduleId: number, newData: any) => void;
  addSchedule: (schedule: any) => void;
  removeSchedule: (scheduleId: number) => void;
  updateAchievement: (achievementId: number, newData: any) => void;
  addAchievement: (achievement: any) => void;
  removeAchievement: (achievementId: number) => void;
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [siteData, setSiteData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shammgod_site_data');
      if (saved) {
        try {
          // Merge with defaultSiteData to ensure no missing properties
          const parsed = JSON.parse(saved);
          return { ...defaultSiteData, ...parsed };
        } catch (e) {
          return defaultSiteData;
        }
      }
    }
    return defaultSiteData;
  });

  useEffect(() => {
    try {
      localStorage.setItem('shammgod_site_data', JSON.stringify(siteData));
    } catch(e) {
      console.error("Failed to save site data to localStorage", e);
      alert("データの保存に失敗しました。画像のサイズが大きい可能性があります。");
    }
  }, [siteData]);

  const login = (password: string) => {
    if (password === 'shammgod3150') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  const updateSiteData = (newData: Partial<typeof defaultSiteData>) => {
    setSiteData((prev: any) => ({ ...prev, ...newData }));
  };

  const updateMember = (memberId: number, newData: any) => {
    setSiteData((prev: any) => ({
      ...prev,
      members: prev.members.map((m: any) => m.id === memberId ? { ...m, ...newData } : m)
    }));
  };

  const addMember = (member: any) => {
    setSiteData((prev: any) => ({
      ...prev,
      members: [...prev.members, { ...member, id: Date.now() }]
    }));
  };

  const removeMember = (memberId: number) => {
    setSiteData((prev: any) => ({
      ...prev,
      members: prev.members.filter((m: any) => m.id !== memberId)
    }));
  };

  const updateSchedule = (scheduleId: number, newData: any) => {
    setSiteData((prev: any) => ({
      ...prev,
      schedules: prev.schedules.map((s: any) => s.id === scheduleId ? { ...s, ...newData } : s)
    }));
  };

  const addSchedule = (schedule: any) => {
    setSiteData((prev: any) => ({
      ...prev,
      schedules: [...(prev.schedules || []), { ...schedule, id: Date.now() }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }));
  };

  const removeSchedule = (scheduleId: number) => {
    setSiteData((prev: any) => ({
      ...prev,
      schedules: prev.schedules.filter((s: any) => s.id !== scheduleId)
    }));
  };

  const updateAchievement = (achievementId: number, newData: any) => {
    setSiteData((prev: any) => ({
      ...prev,
      achievements: prev.achievements.map((a: any) => a.id === achievementId ? { ...a, ...newData } : a)
    }));
  };

  const addAchievement = (achievement: any) => {
    setSiteData((prev: any) => ({
      ...prev,
      achievements: [{ ...achievement, id: Date.now() }, ...(prev.achievements || [])].sort((a, b) => parseInt(b.year) - parseInt(a.year))
    }));
  };

  const removeAchievement = (achievementId: number) => {
    setSiteData((prev: any) => ({
      ...prev,
      achievements: prev.achievements.filter((a: any) => a.id !== achievementId)
    }));
  };

  return (
    <SiteContext.Provider value={{ 
      isAdmin, 
      login, 
      logout, 
      siteData, 
      updateSiteData, 
      updateMember, 
      addMember, 
      removeMember,
      updateSchedule,
      addSchedule,
      removeSchedule,
      updateAchievement,
      addAchievement,
      removeAchievement
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSiteData = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSiteData must be used within SiteProvider');
  return context;
};
