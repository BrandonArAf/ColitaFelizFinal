import { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../lib/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('cf_token') : null;
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('cf_user') : null;

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('cf_token');
        localStorage.removeItem('cf_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await apiLogin(email, password);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cf_token', result.token);
      localStorage.setItem('cf_user', JSON.stringify(result.user));
    }
    setToken(result.token);
    setUser(result.user);
    return result;
  };

  const register = async (nombre, email, password) => {
    const result = await apiRegister(nombre, email, password);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cf_token', result.token);
      localStorage.setItem('cf_user', JSON.stringify(result.user));
    }
    setToken(result.token);
    setUser(result.user);
    return result;
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cf_token');
      localStorage.removeItem('cf_user');
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
