import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '../types';
import api from '../utils/api';

const mapBackendUserToFrontend = (user: any): User => {

  const statusMap: { [key: string]: 'active' | 'inactive' } = {
    'activo': 'active',
    'inactivo': 'inactive',
    'active': 'active',
    'inactive': 'inactive'
  };
  
  const roleMap: { [key: string]: 'admin' | 'worker' | 'family' } = {
    'admin': 'admin',
    'worker': 'worker',
    'family': 'family',
    'Administrador': 'admin',
    'Cuidador': 'worker',
    'Familia': 'family'
  };

  const userStatus = (user.status as string)?.toLowerCase() || '';
  const mappedStatus = statusMap[userStatus] || (userStatus === 'activo' ? 'active' : 'inactive');
  
  const roleValue = (user.role as string)?.toLowerCase() || user.role;
  const mappedRole = roleMap[roleValue] || roleMap[user.role as string] || (user.role as 'admin' | 'worker' | 'family');

  return {
    username: user.username,
    password: '', 
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: mappedRole,
    status: mappedStatus,
    image: user.image || undefined
  };
};

type UsersContextType = {
  users: User[];
  loading: boolean;
  error: string | null;
  dashboardStats: {
    totalUsers: number;
    workers: number;
    families: number;
    admins: number;
    activeUsers: number;
  };
  addUser: (newUser: User) => Promise<boolean>;
  updateUser: (username: string, updatedUser: Partial<User>) => Promise<boolean>;
  deleteUser: (username: string) => Promise<boolean>;
  toggleUserStatus: (username: string) => Promise<User | null>;
  getUserByUsername: (username: string) => User | undefined;
  getDashboardStats: () => {
    totalUsers: number;
    workers: number;
    families: number;
    admins: number;
    activeUsers: number;
  };
  refreshUsers: () => Promise<void>;
  refreshDashboardStats: () => Promise<void>;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    workers: 0,
    families: 0,
    admins: 0,
    activeUsers: 0,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<any>('/users');
      
      if (response.success && response.users) {

        const mappedUsers: User[] = response.users.map((user: any) => mapBackendUserToFrontend(user));
        setUsers(mappedUsers);
      } else {
        setError('Error al cargar usuarios');
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      interface DashboardStatsResponse {
        success: boolean;
        stats?: {
          totalUsers: number;
          workers: number;
          families: number;
          activeUsers: number;
        };
      }

      interface RolStatsResponse {
        success: boolean;
        count?: number;
      }

      const response = await api.get<DashboardStatsResponse['stats']>('/users/stats/dashboard') as DashboardStatsResponse;
      if (response.success && response.stats) {

        const adminsResponse = await api.get<number>('/users/stats/rol/admin') as RolStatsResponse;
        const adminsCount = adminsResponse.success ? (adminsResponse.count || 0) : 0;
        
        setDashboardStats({
          totalUsers: response.stats.totalUsers || 0,
          workers: response.stats.workers || 0,
          families: response.stats.families || 0,
          admins: adminsCount,
          activeUsers: response.stats.activeUsers || 0,
        });
      }
    } catch (err: any) {
      console.error('Error fetching dashboard stats:', err);

      const totalUsers = users.length;
      const workers = users.filter(u => u.role === 'worker').length;
      const families = users.filter(u => u.role === 'family').length;
      const admins = users.filter(u => u.role === 'admin').length;
      const activeUsers = users.filter(u => u.status === 'active').length;
      setDashboardStats({ totalUsers, workers, families, admins, activeUsers });
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDashboardStats();
  }, []);

  const refreshDashboardStats = async () => {
    await fetchDashboardStats();
  };

  const refreshUsers = async () => {
    await fetchUsers();
    await fetchDashboardStats();
  };

  const addUser = async (newUser: User): Promise<boolean> => {
    try {
      setError(null);
      const response = await api.post<User>('/users', {
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password || 'default123', 
        role: newUser.role,
        image: newUser.image || null
      });

      if (response.success && response.user) {
        await fetchUsers();
        await fetchDashboardStats(); 
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Error adding user:', err);
      setError(err.message || 'Error al crear usuario');
      throw err;
    }
  };

  const updateUser = async (username: string, updatedUser: Partial<User>): Promise<boolean> => {
    try {
      setError(null);

      const updateData = {
        ...updatedUser,
        username: updatedUser.username || username,
      };
          
      const response = await api.put<User>(`/users/${username}`, updateData);

      if (response.success && response.user) {
        await fetchUsers(); 
        await fetchDashboardStats(); 
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Error updating user:', err);
      setError(err.message || 'Error al actualizar usuario');
      throw err;
    }
  };

  const deleteUser = async (username: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await api.delete(`/users/${username}`);

      if (response.success) {
        await fetchUsers(); 
        await fetchDashboardStats(); 
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Error deleting user:', err);
      setError(err.message || 'Error al eliminar usuario');
      throw err;
    }
  };

  const toggleUserStatus = async (username: string): Promise<User | null> => {
    try {
      setError(null);
      const response = await api.patch<User>(`/users/${username}/toggle-status`);

      if (response.success && response.user) {
        await fetchUsers(); 
        await fetchDashboardStats(); 
        
        return mapBackendUserToFrontend(response.user);
      }
      return null;
    } catch (err: any) {
      console.error('Error toggling user status:', err);
      setError(err.message || 'Error al cambiar estado del usuario');
      throw err;
    }
  };

  const getUserByUsername = (username: string) => users.find(u => u.username === username);

  const getDashboardStats = () => {

    return dashboardStats;
  };

  const value = useMemo<UsersContextType>(() => ({
    users,
    loading,
    error,
    dashboardStats,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    getUserByUsername,
    getDashboardStats,
    refreshUsers,
    refreshDashboardStats
  }), [users, loading, error, dashboardStats]);

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error('useUsers must be used within UsersProvider');
  return ctx;
};
