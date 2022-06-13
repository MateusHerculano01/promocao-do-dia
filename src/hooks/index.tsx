import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { AdvertiserProvider } from './advertiser';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <AdvertiserProvider>
        {children}
      </AdvertiserProvider>
    </AuthProvider>
  )
}

export { AppProvider };