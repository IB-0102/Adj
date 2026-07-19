import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login?: (password: string) => boolean;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localToken = localStorage.getItem('adminToken');
    if (localToken === 'Greatvalue123') {
      setUser({ id: 'admin', role: 'admin', email: 'admin' });
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentToken = localStorage.getItem('adminToken');
      if (currentToken === 'Greatvalue123') return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (password: string) => {
    if (password === 'Greatvalue123') {
      localStorage.setItem('adminToken', password);
      setUser({ id: 'admin', role: 'admin', email: 'admin' });
      return true;
    }
    return false;
  };

  const logout = async () => {
    localStorage.removeItem('adminToken');
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
