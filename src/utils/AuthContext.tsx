import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { client } from './apolloClient';

interface AuthContextType {
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
}

interface User {
  token: string;
}

interface SignInData {
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
        if (userToken) {
          console.log('Token retrieved from SecureStore:');
          const isExpired = isTokenExpired(userToken);
          if (!isExpired) {
            setUser({ token: userToken });
          } else {
            console.log('Token is expired');
            await signOut();
          }
        } else {
          console.error('No token found in SecureStore');
        }
      } catch (e) {
        console.error('Failed to load token from SecureStore', e);
      }
    };

    bootstrapAsync();
  }, []);

  const isTokenExpired = (token: string): boolean => {
    try {
      const base64UrlDecode = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
        return atob(padded);
      };
  
      const payload = JSON.parse(base64UrlDecode(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000); 
      return exp < now;
    } catch (e) {
      console.error('Failed to check token expiry', e);
      return true; 
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      await SecureStore.setItemAsync('userToken', data.token);
      await client.clearStore();
      setUser({ token: data.token });
      console.log('Token saved to SecureStore:');
    } catch (e) {
      console.error('Failed to save token to SecureStore', e);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      await client.clearStore();
      setUser(null);
      console.log('Token deleted from SecureStore');
    } catch (e) {
      console.error('Failed to delete token from SecureStore', e);
    }
  };

  const authContext = {
    signIn,
    signOut,
    user,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
