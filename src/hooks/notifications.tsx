import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useAuth } from "./auth";
import { AxiosError } from "axios";
import { api } from "@services/api";
import { NotificationDTOS } from '@dtos/NotificationDTOS';

type NotificationsProviderProps = {
  children: ReactNode;
}

type NotificationsContextData = {
  notifications: NotificationDTOS[];
  isLoading: boolean;
  handleRegisterNotification: (notificationTitle: string, notificationMessage: string) => void;
  ChangeNotificationsToViewed: () => void;
  fetchNotifications: () => void;
  haveNotifications: () => boolean;
}

const NotificationsContext = createContext<NotificationsContextData>({} as NotificationsContextData);

function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<NotificationDTOS[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth();


  async function delay(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) };

  async function fetchNotifications() {
    console.log('entrou na fetchNotifications')
    setLoading(true);

    await delay(500);

    await api.get('/notifications')
      .then(response => {

        setNotifications(response.data.reverse());

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

  async function handleRegisterNotification(notificationTitle: string, notificationMessage: string) {
    try {
      if (!!notificationTitle && !!notificationMessage) {
        await api.post(`/notifications/new`, { notificationTitle, notificationMessage });
      }

      fetchNotifications();
    } catch (error) {
      Alert.alert('Enviar Notificação', 'Falha ao enviar notificação para os usuários. ❌');
    }
  }

  async function ChangeNotificationsToViewed() {
    await fetchNotifications();

    const notifications_ids: string[] = [];

    for await (const iteredNotifications of notifications) {
      notifications_ids.push(iteredNotifications._id);
    }

    await api.put(`/notifications/update`, { notifications_ids })
      .then(response => {
      })
      .catch(error => {

        if (error instanceof AxiosError) {
          console.log(error.response?.data)
        }
      })

  }

  const haveNotifications = useCallback(() => {

    const findNotifications = notifications.findIndex(notification =>
    (notification?.users?.find(users =>
      users.user === user?.id && users.visualized === false)));

    return findNotifications !== -1 ? true : false

  }, [notifications]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationsContext.Provider value={{
      notifications,
      isLoading,
      handleRegisterNotification,
      fetchNotifications,
      ChangeNotificationsToViewed,
      haveNotifications
    }}>
      {children}
    </NotificationsContext.Provider>
  )
}

function useNotifications() {
  const context = useContext(NotificationsContext);

  return context;
}

export { NotificationsContext, NotificationsProvider, useNotifications }