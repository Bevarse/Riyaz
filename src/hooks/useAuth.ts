import { useEffect, useState, createContext, useContext } from 'react';
import { auth } from '../lib/firebase'; // or '../lib/supabase' depending on your choice
import firebase from 'firebase/app'; // if using Firebase
// import { SupabaseClient } from '@supabase/supabase-js'; // if using Supabase

interface AuthContextType {
  user: firebase.User | null; // or SupabaseUser if using Supabase
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null); // or SupabaseUser
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    await auth.signInWithEmailAndPassword(email, password); // or use Supabase's signIn method
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await auth.signOut(); // or use Supabase's signOut method
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};