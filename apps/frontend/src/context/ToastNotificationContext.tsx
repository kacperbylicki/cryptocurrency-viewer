import { ReactNode, createContext, useState } from 'react';
import { ToastNotificationContextHandler } from '../types/contexts/toast-notification.types';

interface ToastNotificationProviderProps {
  children: ReactNode;
}
export const ToastNotificationContext =
  createContext<ToastNotificationContextHandler>(
    {} as ToastNotificationContextHandler,
  );

export const ToastNotificationProvider = ({
  children,
}: ToastNotificationProviderProps) => {
  const [activeToastNotification, setActiveToastNotification] = useState(false);
  const [toastNotificationType, setToastNotificationType] = useState('');
  const [toastNotificationContent, setToastNotificationContent] = useState('');

  const showToastNotification = (
    txt: string,
    type: 'error' | 'warning' | 'success',
  ) => {
    setActiveToastNotification(true);
    setToastNotificationType(type);
    setToastNotificationContent(txt);
    setTimeout(() => {
      setActiveToastNotification(false);
      setToastNotificationType('');
      setToastNotificationContent('');
    }, 2000);
  };

  const contextData = {
    activeToastNotification,
    showToastNotification,
    toastNotificationType,
    toastNotificationContent,
  };

  return (
    <ToastNotificationContext.Provider value={contextData}>
      {children}
    </ToastNotificationContext.Provider>
  );
};
