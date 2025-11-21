import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';

interface UsersContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (originalUsername: string, updatedUser: User) => void;
  deleteUser: (username: string) => void;
  toggleUserStatus: (username: string) => void;
  refreshUsers: () => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
}

const DEFAULT_USERS: User[] = [
  { 
    username: 'admin', 
    password: 'admin123', 
    firstName: 'Administrador', 
    lastName: 'Sistema', 
    role: 'admin', 
    email: 'admin@cuidar.com', 
    status: 'active', 
    image: '/Imagenes/Admin.png' 
  },
  { 
    username: 'cuidador1', 
    password: 'cuidador123', 
    firstName: 'María', 
    lastName: 'González', 
    role: 'worker', 
    email: 'maria@cuidar.com', 
    status: 'active', 
    image: '/Imagenes/Trabajador.jpg' 
  },
  { 
    username: 'cuidador2', 
    password: 'cuidador456', 
    firstName: 'Ana', 
    lastName: 'López', 
    role: 'worker', 
    email: 'ana@cuidar.com', 
    status: 'inactive', 
    image: '/Imagenes/Trabajadora1.avif' 
  },
  { 
    username: 'familia1', 
    password: 'familia123', 
    firstName: 'Carlos', 
    lastName: 'Rodríguez', 
    role: 'family', 
    email: 'carlos@cuidar.com', 
    status: 'active', 
    image: '/Imagenes/Familia.jpg' 
  },
  { 
    username: 'familia3', 
    password: 'familia789', 
    firstName: 'Roberto', 
    lastName: 'Pérez', 
    role: 'family', 
    email: 'roberto@cuidar.com', 
    status: 'inactive', 
    image: '/Imagenes/familia2.jpg' 
  }
];

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsersFromStorage = () => {
    const storedUsers = localStorage.getItem('cuidarUsers');
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error('Error loading users from storage:', error);
        setUsers(DEFAULT_USERS);
        saveUsersToStorage(DEFAULT_USERS);
      }
    } else {
      setUsers(DEFAULT_USERS);
      saveUsersToStorage(DEFAULT_USERS);
    }
  };

  const saveUsersToStorage = (usersToSave: User[]) => {
    localStorage.setItem('cuidarUsers', JSON.stringify(usersToSave));
  };

  useEffect(() => {
    loadUsersFromStorage();
  }, []);

  const addUser = (user: User) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const updateUser = (originalUsername: string, updatedUser: User) => {
    const updatedUsers = users.map(u => 
      u.username === originalUsername ? updatedUser : u
    );
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const deleteUser = (username: string) => {
    const updatedUsers = users.filter(u => u.username !== username);
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const toggleUserStatus = (username: string) => {
    const updatedUsers = users.map(u => 
      u.username === username 
        ? { ...u, status: (u.status === 'active' ? 'inactive' : 'active') as User['status'] }
        : u
    );
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const refreshUsers = () => {
    loadUsersFromStorage();
  };

  const value: UsersContextType = {
    users,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    refreshUsers
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};

