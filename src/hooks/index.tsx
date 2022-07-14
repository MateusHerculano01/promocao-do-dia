import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { HideBottomBarProvider } from './hideBottomBar';
import { NotificationsProvider } from './notifications';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <HideBottomBarProvider>
        <NotificationsProvider>
          {children}
        </NotificationsProvider>
      </HideBottomBarProvider>
    </AuthProvider>
  )
}

export { AppProvider };