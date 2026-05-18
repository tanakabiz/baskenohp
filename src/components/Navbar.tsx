import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Youtube } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'TEAM', href: '#team', jp: 'チーム紹介' },
    { name: 'SCHEDULE', href: '#schedule', jp: '予定' },
    { name: 'MEMBERS', href: '#members', jp: 'メンバー' },
    { name: 'RESULTS', href: '#results', jp: '実績' },
    { name: 'MATCH', href: '#recruit', jp: '練習試合' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img src="/syam.png" alt="SHAMMGOD" className="h-16 md:h-20 w-auto object-contain" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative flex flex-col items-center"
            >
              <span className="text-xs font-bold tracking-widest text-zinc-400 group-hover:text-[#E60012] transition-colors uppercase leading-none">
                {link.name}
              </span>
              <span className="text-sm font-bold text-zinc-800 group-hover:text-[#E60012] transition-colors leading-tight mt-1">
                {link.jp}
              </span>
            </a>
          ))}
          <div className="flex items-center gap-4 ml-4">
            <a href="https://www.instagram.com/shammgod_sapporo/" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-[#E60012] transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://www.youtube.com/@shammgod.official" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-[#E60012] transition-colors">
              <Youtube size={28} />
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-zinc-900 hover:text-[#E60012]"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at right top)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at right top)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at right top)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#E60012] z-50 flex flex-col p-6"
          >
            <div className="flex justify-between items-center bg-speed-lines absolute inset-0 opacity-10 pointer-events-none" />
            <div className="flex justify-end relative z-10">
              <button
                className="text-white bg-black/20 p-2 rounded-full backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 mt-16 px-4 relative z-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl font-black text-white tracking-widest">{link.jp}</span>
                    <span className="font-display text-sm text-white/70 tracking-widest uppercase">{link.name}</span>
                  </div>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
