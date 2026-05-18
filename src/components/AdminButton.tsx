import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useSiteData } from '../contexts/SiteContext';

export default function AdminButton() {
  const { isAdmin, login, logout } = useSiteData();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setIsOpen(false);
      setPassword('');
      setError('');
    } else {
      setError('パスワードが間違っています。');
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 z-50 bg-[#1A1A1A] text-white p-4 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:bg-[#E60012] hover:rotate-90 transition-all duration-300"
      >
        <Settings size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-8 max-w-sm w-full border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#E60012] relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-black">
               <X size={24} />
            </button>
            <h2 className="font-display text-2xl font-black mb-6">ADMIN LOGIN</h2>
            
            {isAdmin ? (
              <div className="space-y-4">
                <p className="font-sans font-bold text-green-600 mb-4">ログイン中です。画面上の要素をクリックして編集できます。</p>
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full bg-[#1A1A1A] text-white py-3 font-display font-black hover:bg-zinc-800 transition-colors skew-x-[-5deg]"
                >
                  <p className="skew-x-[5deg]">ログアウト</p>
                </button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block font-sans text-sm font-bold text-zinc-700 mb-2">パスワード</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-zinc-300 p-3 font-sans focus:border-[#E60012] focus:outline-none"
                    placeholder="Password"
                  />
                  {error && <p className="text-[#E60012] text-sm mt-2 font-bold">{error}</p>}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#E60012] text-white py-3 font-display font-black tracking-widest hover:bg-red-700 transition-colors skew-x-[-5deg]"
                >
                  <p className="skew-x-[5deg]">LOGIN</p>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
