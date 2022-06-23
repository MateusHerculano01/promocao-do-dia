import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { HideBottomBarProvider } from './hideBottomBar';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <HideBottomBarProvider>
        {children}
      </HideBottomBarProvider>
    </AuthProvider>
  )
}

export { AppProvider };