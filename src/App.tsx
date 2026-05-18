import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TeamIntro from './components/TeamIntro';
import Schedule from './components/Schedule';
import Members from './components/Members';
import Achievements from './components/Achievements';
import VideoSection from './components/VideoSection';
import Recruit from './components/Recruit';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import AdminButton from './components/AdminButton';

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-red-600 selection:text-white bg-white">
      <Navbar />
      <main>
        <Hero />
        <TeamIntro />
        <Schedule />
        <Members />
        <Achievements />
        <VideoSection />
        <Recruit />
      </main>
      <Footer />
      <MobileBottomNav />
      <AdminButton />
    </div>
  );
}
