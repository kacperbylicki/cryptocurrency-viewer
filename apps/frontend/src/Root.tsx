import { Loader } from './components/Loader';
import { LoaderContext } from './context/LoaderContext';
import { Menu } from './components/Menu';
import { Ranking } from './components/Ranking';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastNotification } from './components/ToastNotification';
import { ToastNotificationContext } from './context/ToastNotificationContext';
import { useContext, useEffect, useState } from 'react';

export const Root = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { activeToastNotification } = useContext(ToastNotificationContext);
  const { activeLoader } = useContext(LoaderContext);

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
    <Router>
      <div className="App">
        <Menu width={width} />
        {activeLoader && <Loader />}
        <Routes>
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
        {activeToastNotification && <ToastNotification />}
      </div>
    </Router>
  );
};
