export interface ToastNotificationContextHandler {
  activeToastNotification: boolean;
  showToastNotification: (
    txt: string,
    type: 'error' | 'warning' | 'success',
  ) => void;
  toastNotificationType: string;
  toastNotificationContext: string;
}
