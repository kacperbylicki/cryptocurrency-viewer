import '../assets/styles/ToastNotification.scss';
import { ToastNotificationContext } from '../context/ToastNotificationContext';
import { useContext } from 'react';

export const ToastNotification = () => {
  const { toastNotificationType, toastNotificationContent } = useContext(
    ToastNotificationContext,
  );

  return (
    <div className={`toast-notification ${toastNotificationType}`}>
      <p>{toastNotificationContent}</p>
    </div>
  );
};
