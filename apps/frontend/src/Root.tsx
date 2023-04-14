import Menu from './components/menu/Menu';
import { useEffect, useState } from 'react';

const Root = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

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
    </div>
  );
};

export default Root;
