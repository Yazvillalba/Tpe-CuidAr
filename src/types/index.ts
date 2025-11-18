export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'worker' | 'family';
  email: string;
  status: 'active' | 'inactive';
  image?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

