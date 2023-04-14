import '../../assets/styles/Menu.scss';
import '../../assets/styles/authentication/RegisterForm.scss';
import guest from '../../assets/images/guest.png';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';
import { GoSignIn } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';
import { MenuDataItem, menuData } from './MenuData';
import { RegisterForm } from '../authentication/RegisterForm';
import { SignInForm } from '../authentication/SignInForm';
import { useContext, useState } from 'react';

type MenuProps = {
  width: number;
};
const Menu = ({ width }: MenuProps) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const location = useLocation();
  const {
    activeSignInForm,
    setActiveSignInForm,
    setActiveRegisterForm,
    activeRegisterForm,
    user,
    handleLogout,
  } = useContext(AuthContext);

  // Disable scroll on body
  if (activeMenu && width < 1024) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }

  function handleMenuIcon() {
    setActiveMenu(!activeMenu);
  }

  function handleSignInButton() {
    setActiveMenu(false);
    if (setActiveSignInForm !== undefined)
      setActiveSignInForm(!activeSignInForm);
    if (setActiveRegisterForm !== undefined) setActiveRegisterForm(false);
    console.log(activeSignInForm);
  }

  function handleCreateAccountButton() {
    setActiveMenu(false);
    if (setActiveRegisterForm !== undefined)
      setActiveRegisterForm(!activeRegisterForm);
    if (setActiveSignInForm !== undefined) setActiveSignInForm(false);
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
          <div>{user ? <p>{JSON.parse(user)?.username}</p> : <p>Guest</p>}</div>
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
          {user ? (
            <button onClick={() => handleLogout()}>
              <AiOutlinePoweroff /> Sign out
            </button>
          ) : (
            <button onClick={() => handleSignInButton()}>
              <GoSignIn /> Sign in
            </button>
          )}
          {!user && (
            <p>
              Not registered yet?{' '}
              <span onClick={() => handleCreateAccountButton()}>
                Create an Account
              </span>
            </p>
          )}
        </div>
      </div>
      {activeSignInForm && <SignInForm />}
      {activeRegisterForm && <RegisterForm />}
    </div>
  );
};

export default Menu;