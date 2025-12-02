import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType } from '../types';
import api from '../utils/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
  };

  useEffect(() => {

    const checkSession = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const username = localStorage.getItem('username');
      
      if (isLoggedIn && username) {
        try {

          const response = await api.get<User>(`/auth/user/${username}`);
          if (response.success && response.user) {
            setUser(response.user);
            setIsAuthenticated(true);
          } else {

            logout();
          }
        } catch (error) {
          console.error('Error verificando sesión:', error);

          logout();
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post<User>('/auth/login', { username, password });
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userRole', response.user.role);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error en login:', error);
      throw error; 
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated
  };


  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

