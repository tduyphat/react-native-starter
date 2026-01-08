import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { User } from '../models/user';
import { apiService } from '../services/api-service';
import { tokenStorage } from '../services/tokenStorage';
import { getUserProfile, initUserTable, saveUserProfile } from '../db/userDB';

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchProfileWithToken = async (t: string) => {
    const res = await apiService.getProfile(t);
    return res.data.data as User;
  };

  const bootstrap = async () => {
    try {
      const savedToken = await tokenStorage.get();
      if (!savedToken) return;

      // Validate token by fetching profile
      const profile = await fetchProfileWithToken(savedToken);
      setUser(profile);

      await initUserTable();
      await saveUserProfile({
        id: profile.id,
        username: profile.username,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        role: profile.role,
        age: profile.age,
        password: profile.password,
      });

      const saved = await getUserProfile(profile.id);
      console.log('Saved user in SQLite:', saved);
    } catch (err) {
      // Token invalid/expired or request failed: clear it
      await tokenStorage.clear();
      setUser(null);
    }
  };

  useEffect(() => {
    bootstrap();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await apiService.login(username, password);
      const newToken = res.data.data.token;
      await tokenStorage.set(newToken);

      const profile = await fetchProfileWithToken(newToken);
      console.log('profile', profile);
      setUser(profile);
    } catch (err: any) {
      const message = err?.response?.data?.error?.message ?? 'Login failed';

      console.log(message);
    }
  };

  const logout = async () => {
    await tokenStorage.clear();
    setUser(null);
  };

  const contextValue: AuthContextProps = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
