import { Menu } from './components/Menu';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastNotification } from './components/ToastNotification';
import { ToastNotificationContext } from './context/ToastNotificationContext';
import { useContext, useEffect, useState } from 'react';

export const Root = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { activeToastNotification } = useContext(ToastNotificationContext);

  // Checking the window size for the mobile version
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Menu width={width} />
        {activeToastNotification && <ToastNotification />}
      </Router>
    </div>
  );
};
