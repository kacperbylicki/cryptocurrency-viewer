import Menu from './components/menu/Menu';
import { ToastNotification } from './components/ToastNotification';
import { ToastNotificationContext } from './context/ToastNotificationContext';
import { useContext, useEffect, useState } from 'react';

const Root = () => {
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
      <Menu width={width} />
      {activeToastNotification && <ToastNotification />}
    </div>
  );
};

export default Root;
