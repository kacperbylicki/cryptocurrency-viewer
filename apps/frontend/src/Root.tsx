import { AuthContext } from './context/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { LiveChart } from './pages/LiveChart';
import { Menu } from './components/Menu';
import { News } from './pages/News';
import { NotFound } from './pages/NotFound';
import { Ranking } from './pages/Ranking';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Statistics } from './pages/Statistics';
import { ToastNotification } from './components/ToastNotification';
import { ToastNotificationContext } from './context/ToastNotificationContext';
import { createAxiosInstance } from './api/axiosInstance';
import { useContext, useEffect, useState } from 'react';

export const Root = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { activeToastNotification } = useContext(ToastNotificationContext);
  const { handleRefreshToken } = useContext(AuthContext);

  useEffect(() => {
    createAxiosInstance(handleRefreshToken);
  }, []);

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
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/live-chart" element={<LiveChart />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {activeToastNotification && <ToastNotification />}
      </div>
    </Router>
  );
};
