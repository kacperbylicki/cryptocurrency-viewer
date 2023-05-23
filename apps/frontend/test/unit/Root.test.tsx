// import { Root } from '../../src/Root';
// import { ToastNotificationContext } from '../../src/context/ToastNotificationContext';
// import { act } from 'react-dom/test-utils';
// import {
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from '@testing-library/react';
// import { vi, describe } from 'vitest';

// describe.skip('Root component', () => {
//   it.skip('renders menu', () => {
//     render(<Root />);
//     const menuElement = screen.getByRole('menu');
//     expect(menuElement).toBeInTheDocument();
//   });

//   it.skip('does not render toast notification when there is no active notification', () => {
//     render(
//       <ToastNotificationContext.Provider
//         value={{
//           activeToastNotification: false,
//           toastNotificationType: 'error',
//           toastNotificationContent: 'something went wrong!',
//           showToastNotification: vi.fn(),
//         }}>
//         <Root />
//       </ToastNotificationContext.Provider>,
//     );
//     const toastNotificationElement = screen.queryByRole('toast-notification');
//     expect(toastNotificationElement).not.toBeInTheDocument();
//   });

//   it.skip('renders toast notification when there is an active notification', () => {
//     render(
//       <ToastNotificationContext.Provider
//         value={{
//           activeToastNotification: true,
//           toastNotificationType: 'success',
//           toastNotificationContent: 'successfully logged in!',
//           showToastNotification: vi.fn(),
//         }}>
//         <Root />
//       </ToastNotificationContext.Provider>,
//     );
//     const toastNotificationElement = screen.getByRole('toast-notification');
//     expect(toastNotificationElement).toBeInTheDocument();
//   });

//   it.skip('disappears after 2 seconds', async () => {
//     render(
//       <ToastNotificationContext.Provider
//         value={{
//           activeToastNotification: true,
//           toastNotificationType: 'success',
//           toastNotificationContent: 'successfully logged in!',
//           showToastNotification: vi.fn(),
//         }}>
//         <Root />
//       </ToastNotificationContext.Provider>,
//     );

//     const toastNotificationElement = screen.getByRole('toast-notification');
//     expect(toastNotificationElement).toBeInTheDocument();

//     act(() => {
//       vi.useFakeTimers();
//       vi.advanceTimersByTime(2000);
//     });

//     await waitForElementToBeRemoved(
//       () => screen.getByRole('toast-notification'),
//       { timeout: 5000 },
//     );

//     expect(screen.queryByRole('toast-notification')).not.toBeInTheDocument();
//   }, 5000);
// });

describe('Root component', () => {
  it('sample test', () => {
    console.log('sample test');
  });
});

export {};
