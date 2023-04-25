import { BrowserRouter } from 'react-router-dom';
import { Root } from '../../src/Root';
import { ToastNotificationContext } from '../../src/context/ToastNotificationContext';
import { ToastNotificationContextHandler } from '../../src/types/contexts/toast-notification.types';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Root', () => {
  it('renders the Menu component', () => {
    render(
      <ToastNotificationContext.Provider
        value={
          {
            activeToastNotification: false,
          } as unknown as ToastNotificationContextHandler
        }>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ToastNotificationContext.Provider>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  //   it('renders the ToastNotification component when there is an activeToastNotification', () => {
  //     render(
  //       <ToastNotificationContext.Provider
  //         value={
  //           {
  //             activeToastNotification: true,
  //             toastNotificationType: 'success',
  //             toastNotificationContent: 'test',
  //           } as unknown as ToastNotificationContextHandler
  //         }>
  //         <BrowserRouter>
  //           <Root />
  //         </BrowserRouter>
  //       </ToastNotificationContext.Provider>,
  //     );

  //     expect(screen.getByRole('alert')).toBeInTheDocument();
  //     expect(screen.getByText('Test Message')).toBeInTheDocument();
  //   });

  //   it('does not render the ToastNotification component when there is no activeToastNotification', () => {
  //     render(
  //       <ToastNotificationContext.Provider
  //         value={
  //           {
  //             activeToastNotification: false,
  //           } as unknown as ToastNotificationContextHandler
  //         }>
  //         <BrowserRouter>
  //           <Root />
  //         </BrowserRouter>
  //       </ToastNotificationContext.Provider>,
  //     );

  //     expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  //   });

  //   it('updates the width state when the window is resized', async () => {
  //     render(
  //       <ToastNotificationContext.Provider
  //         value={
  //           {
  //             activeToastNotification: false,
  //           } as unknown as ToastNotificationContextHandler
  //         }>
  //         <BrowserRouter>
  //           <Root />
  //         </BrowserRouter>
  //       </ToastNotificationContext.Provider>,
  //     );

  //     const initialWidth = window.innerWidth;

  //     // Resize the window
  //     Object.defineProperty(window, 'innerWidth', {
  //       writable: true,
  //       configurable: true,
  //       value: initialWidth + 100,
  //     });

  //     fireEvent(window, new Event('resize'));

  //     const menu = screen.getByRole('navigation');
  //     expect(menu).toHaveAttribute('width', (initialWidth + 100).toString());
  //   });
});
