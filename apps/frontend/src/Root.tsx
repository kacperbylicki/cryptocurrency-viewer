import { LiveChart } from './pages/LiveChart';
import { Loader } from './components/Loader';
import { LoaderContext } from './context/LoaderContext';
import { Menu } from './components/Menu';
import { News } from './pages/News';
import { Ranking } from './components/Ranking';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Statistics } from './components/statistics/Statistics';
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
          <Route path="/live-chart" element={<LiveChart />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/news" element={<News />} />
        </Routes>
        {activeToastNotification && <ToastNotification />}
      </div>
    </Router>
  );
};
