import '../../assets/styles/Menu.scss';
import guest from '../../assets/images/guest.png';
import { GoSignIn } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';
import { MenuDataItem, menuData } from './MenuData';
import { useState } from 'react';

type MenuProps = {
  width: number;
};
const Menu = ({ width }: MenuProps) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const location = useLocation();

  // Disable scroll on body
  if (activeMenu && width < 1024) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }

  function handleMenuIcon() {
    setActiveMenu(!activeMenu);
  }

  // Style for the active menu link
  const styleLink = {
    backgroundColor: '#21212b',
    padding: '1.5rem 2rem',
    color: '#fff',
  };

  return (
    <div className="menu-wrapper">
      <div className="menu-icon">
        {activeMenu ? (
          <input
            checked
            type="checkbox"
            className="dot-menu dot-menu__checkbox"
            id="dot-menu"
            onClick={() => handleMenuIcon()}
          />
        ) : (
          <input
            type="checkbox"
            className="dot-menu dot-menu__checkbox"
            id="dot-menu"
            onClick={() => handleMenuIcon()}
          />
        )}

        <label htmlFor="dot-menu" className="dot-menu__label">
          <span></span>
        </label>
      </div>
      <div className={activeMenu || width > 1024 ? 'menu' : 'menu none'}>
        <div className="user-icon" onClick={() => setActiveMenu(false)}>
          <img src={guest} alt="" />
          <div>
            <p>Guest</p>
          </div>
        </div>
        <ul className="menu-links">
          {menuData.map((item: MenuDataItem) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setActiveMenu(false)}
                  style={
                    location.pathname === item.path ? styleLink : undefined
                  }>
                  <Icon
                    currentLocation={location.pathname}
                    pathname={item.path}
                    color={'#1fc2a0'}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="button-authentication-wrapper">
          <button>
            <GoSignIn /> Sign in
          </button>
          <p>
            Not registered yet? <span>Create an Account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
