import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { Palette, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleLogin = (e: import("react").FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login && login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-ivory p-10 text-center shadow-xl border border-lavender-light">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#6C7A63] to-[#4A3B52] text-white">
            <Palette className="h-8 w-8" />
          </div>
        </div>
        
        <h2 className="mt-6 text-3xl font-extrabold text-[#4A3B52]">Admin Dashboard</h2>
        <p className="mt-2 text-sm text-[#6C7A63]">
          Enter your password to access the dashboard
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg text-left">{error}</div>}
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#6C7A63]" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3B52] focus:border-transparent text-sm bg-ivory-dark focus:bg-ivory transition-colors"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6C7A63] to-[#4A3B52] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#4A3B52]/20 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4A3B52] focus:ring-offset-2 transition-all"
          >
            Sign in
            <LogIn className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
