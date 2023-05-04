import '../assets/styles/ToastNotification.scss';
import { ToastNotificationContext } from '../context/ToastNotificationContext';
import { useContext } from 'react';

export const ToastNotification = () => {
  const { toastNotificationType, toastNotificationContent } = useContext(
    ToastNotificationContext,
  );

  return (
    <div
      className={`toast-notification ${toastNotificationType}`}
      role="toast-notification">
      <p>{toastNotificationContent}</p>
    </div>
  );
};
