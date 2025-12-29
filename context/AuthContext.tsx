
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  mobileNumber: string;
  name?: string;
  pincode?: string;
  city?: string;
}

interface AuthContextType {
  user: User | null;
  login: (mobile: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  updateLocation: (city: string, pincode: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('luxe_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (mobile: string) => {
    const newUser = { mobileNumber: mobile, city: 'Mumbai', pincode: '400001' };
    setUser(newUser);
    localStorage.setItem('luxe_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxe_user');
  };

  const updateLocation = (city: string, pincode: string) => {
    if (user) {
      const updatedUser = { ...user, city, pincode };
      setUser(updatedUser);
      localStorage.setItem('luxe_user', JSON.stringify(updatedUser));
    }
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, updateLocation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
