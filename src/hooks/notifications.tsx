import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { NotificationDTOS } from '@dtos/NotificationDTOS';

type NotificationsProviderProps = {
  children: ReactNode;
}

type NotificationsContextData = {
  notifications: NotificationDTOS[];
  isLoading: boolean;
}

const NotificationsContext = createContext<NotificationsContextData>({} as NotificationsContextData);

function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<NotificationDTOS[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchNotifications() {
    setLoading(true);

    await api.get('/notifications')
      .then(response => {

        setNotifications(response.data);

      })
      .catch(error => {

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
        }
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      });

  }

  useEffect(() => {
    fetchNotifications();
  }, [])

  return (
    <NotificationsContext.Provider value={{ notifications, isLoading }}>
      {children}
    </NotificationsContext.Provider>
  )
}

function useNotifications() {
  const context = useContext(NotificationsContext);

  return context;
}

export { NotificationsContext, NotificationsProvider, useNotifications }