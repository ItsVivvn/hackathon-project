import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

function readStoredAuth() {
  try {
    const token = localStorage.getItem('civictrack_token');
    const user = localStorage.getItem('civictrack_user');
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => readStoredAuth());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const persistAuth = (token, user) => {
    if (token && user) {
      localStorage.setItem('civictrack_token', token);
      localStorage.setItem('civictrack_user', JSON.stringify(user));
      setAuth({ token, user });
      return;
    }

    localStorage.removeItem('civictrack_token');
    localStorage.removeItem('civictrack_user');
    setAuth({ token: null, user: null });
  };

  const login = async (payload) => {
    const response = await api.post('/auth/login', payload);
    persistAuth(response.data.token, response.data.user);
    return response.data;
  };

  const register = async (payload) => {
    const response = await api.post('/auth/register', payload);
    persistAuth(response.data.token, response.data.user);
    return response.data;
  };

  const adminLogin = async (payload) => {
    const response = await api.post('/admin/login', payload);
    persistAuth(response.data.token, response.data.user);
    return response.data;
  };

  const logout = () => persistAuth(null, null);

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        user: auth.user,
        ready,
        login,
        register,
        adminLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
