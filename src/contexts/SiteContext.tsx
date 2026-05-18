import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultSiteData } from '../data/defaultData';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, collection, deleteDoc } from 'firebase/firestore';

export type SiteContextType = {
  isAdmin: boolean;
  login: () => Promise<boolean>;
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
  const [siteData, setSiteData] = useState<typeof defaultSiteData>(defaultSiteData);
  const [loading, setLoading] = useState(true);

  // Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'tanaka.biz.b2026@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  // Data Listeners
  useEffect(() => {
    // We use real-time listeners so changes sync immediately across devices
    const unsubSettings = onSnapshot(doc(db, 'site', 'settings'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSiteData(prev => ({ 
          ...prev, 
          hero: data.hero || prev.hero,
          teamIntro: data.teamIntro || prev.teamIntro
        }));
      } else {
        // Init if missing
        if (isAdmin) {
          setDoc(doc(db, 'site', 'settings'), { hero: defaultSiteData.hero, teamIntro: defaultSiteData.teamIntro });
        }
      }
    });

    const unsubMembers = onSnapshot(collection(db, 'members'), (snapshot) => {
      const members = snapshot.docs.map(d => ({ ...d.data(), id: Number(d.id) } as any));
      if (members.length > 0) {
        setSiteData(prev => ({ ...prev, members: members.sort((a,b) => a.id - b.id) }));
      } else {
        if (isAdmin) {
          defaultSiteData.members.forEach(m => setDoc(doc(db, 'members', String(m.id)), m));
        }
      }
    });

    const unsubSchedules = onSnapshot(collection(db, 'schedules'), (snapshot) => {
      const schedules = snapshot.docs.map(d => ({ ...d.data(), id: Number(d.id) } as any));
      if (schedules.length > 0) {
        setSiteData(prev => ({ ...prev, schedules: schedules.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) }));
      } else {
        if (isAdmin) {
          defaultSiteData.schedules.forEach(s => setDoc(doc(db, 'schedules', String(s.id)), s));
        }
      }
    });

    const unsubAchievements = onSnapshot(collection(db, 'achievements'), (snapshot) => {
      const achievements = snapshot.docs.map(d => ({ ...d.data(), id: Number(d.id) } as any));
      if (achievements.length > 0) {
        setSiteData(prev => ({ ...prev, achievements: achievements.sort((a, b) => parseInt(b.year) - parseInt(a.year)) }));
      } else {
        if (isAdmin) {
          defaultSiteData.achievements.forEach(a => setDoc(doc(db, 'achievements', String(a.id)), a));
        }
      }
    });

    setLoading(false);
    return () => {
      unsubSettings();
      unsubMembers();
      unsubSchedules();
      unsubAchievements();
    };
  }, [isAdmin]);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      setAuthWarning();
      const res = await signInWithPopup(auth, provider);
      if (res.user.email === 'tanaka.biz.b2026@gmail.com') {
        setIsAdmin(true);
        return true;
      }
      alert('管理者権限がありません。');
      await signOut(auth);
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const setAuthWarning = () => {
    /* Ignore inside */
  };

  const logout = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  const updateSiteData = async (newData: Partial<typeof defaultSiteData>) => {
    try {
      const updates: any = {};
      if (newData.hero) updates.hero = newData.hero;
      if (newData.teamIntro) updates.teamIntro = newData.teamIntro;
      if (Object.keys(updates).length > 0) {
        await setDoc(doc(db, 'site', 'settings'), updates, { merge: true });
      }
    } catch(e) {
      console.error(e);
      alert('更新に失敗しました。');
    }
  };

  const updateMember = async (memberId: number, newData: any) => {
    try {
      const member = siteData.members.find(m => m.id === memberId);
      if (!member) return;
      await setDoc(doc(db, 'members', String(memberId)), { ...member, ...newData });
    } catch(e) {}
  };

  const addMember = async (member: any) => {
    try {
      const id = Date.now();
      await setDoc(doc(db, 'members', String(id)), { ...member, id });
    } catch(e) {}
  };

  const removeMember = async (memberId: number) => {
    try {
      await deleteDoc(doc(db, 'members', String(memberId)));
    } catch(e) {}
  };

  const updateSchedule = async (scheduleId: number, newData: any) => {
    try {
      const schedule = siteData.schedules.find(s => s.id === scheduleId);
      if (!schedule) return;
      await setDoc(doc(db, 'schedules', String(scheduleId)), { ...schedule, ...newData });
    } catch(e) {}
  };

  const addSchedule = async (schedule: any) => {
    try {
      const id = Date.now();
      await setDoc(doc(db, 'schedules', String(id)), { ...schedule, id });
    } catch(e) {}
  };

  const removeSchedule = async (scheduleId: number) => {
    try {
      await deleteDoc(doc(db, 'schedules', String(scheduleId)));
    } catch(e) {}
  };

  const updateAchievement = async (achievementId: number, newData: any) => {
    try {
      const ach = siteData.achievements.find(a => a.id === achievementId);
      if (!ach) return;
      await setDoc(doc(db, 'achievements', String(achievementId)), { ...ach, ...newData });
    } catch(e) {}
  };

  const addAchievement = async (achievement: any) => {
    try {
      const id = Date.now();
      await setDoc(doc(db, 'achievements', String(id)), { ...achievement, id });
    } catch(e) {}
  };

  const removeAchievement = async (achievementId: number) => {
    try {
      await deleteDoc(doc(db, 'achievements', String(achievementId)));
    } catch(e) {}
  };

  if (loading) return null;

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
