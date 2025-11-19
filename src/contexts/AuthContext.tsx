import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const HARDCODED_USERS: User[] = [
  { 
    username: 'admin', 
    password: 'admin123', 
    firstName: 'Administrador', 
    lastName: 'Sistema', 
    role: 'admin', 
    email: 'admin@cuidar.com', 
    status: 'active', 
    image: 'Imagenes/Admin.png' 
  },
  { 
    username: 'cuidador1', 
    password: 'cuidador123', 
    firstName: 'María', 
    lastName: 'González', 
    role: 'worker', 
    email: 'maria@cuidar.com', 
    status: 'active', 
    image: 'Imagenes/Trabajador.jpg' 
  },
  { 
    username: 'cuidador2', 
    password: 'cuidador456', 
    firstName: 'Ana', 
    lastName: 'López', 
    role: 'worker', 
    email: 'ana@cuidar.com', 
    status: 'inactive', 
    image: 'Imagenes/Trabajadora1.avif' 
  },
  { 
    username: 'familia1', 
    password: 'familia123', 
    firstName: 'Carlos', 
    lastName: 'Rodríguez', 
    role: 'family', 
    email: 'carlos@cuidar.com', 
    status: 'active', 
    image: 'Imagenes/Familia.jpg' 
  },
  { 
    username: 'familia3', 
    password: 'familia789', 
    firstName: 'Roberto', 
    lastName: 'Pérez', 
    role: 'family', 
    email: 'roberto@cuidar.com', 
    status: 'inactive', 
    image: 'Imagenes/familia2.jpg' 
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    if (isLoggedIn && username) {
      const foundUser = HARDCODED_USERS.find(u => u.username === username);
      if (foundUser && foundUser.status === 'active') {
        setUser(foundUser);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {

    await new Promise(resolve => setTimeout(resolve, 300));
    
    const foundUser = HARDCODED_USERS.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser && foundUser.status === 'active') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('userRole', foundUser.role);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
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

