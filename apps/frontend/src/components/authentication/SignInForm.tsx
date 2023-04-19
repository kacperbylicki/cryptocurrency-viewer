import '../../assets/styles/authentication/SignInForm.scss';
import { AuthContext } from '../../context/AuthContext';
import { GoSignIn } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { useContext, useState } from 'react';

export const SignInForm = () => {
  const { setActiveSignInForm, setActiveRegisterForm, handleLogin } =
    useContext(AuthContext);

  const [emailPlaceholder, setEmailPlaceholder] = useState('Email');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Password');

  const handleSignInCloseBtn = () => {
    if (setActiveSignInForm !== undefined) setActiveSignInForm(false);
  };

  const handleSignInCreateBtn = () => {
    if (setActiveRegisterForm !== undefined) setActiveRegisterForm(true);
    if (setActiveSignInForm !== undefined) setActiveSignInForm(false);
  };

  return (
    <section className="sign-in">
      <div className="sign-in-close-btn">
        <MdClose onClick={() => handleSignInCloseBtn()} />
      </div>
      <div className="sign-in-header">
        <h2 className="sign-in-welcome-txt-first">Hello!</h2>
        <h2 className="sign-in-welcome-txt-second">Sign into Your account</h2>
      </div>
      <form className="sign-in-form" onSubmit={(e) => handleLogin(e)}>
        <input
          required
          type="email"
          name="email"
          placeholder={emailPlaceholder}
          onFocus={() => setEmailPlaceholder('')}
          onBlur={() => setEmailPlaceholder('Email')}
        />
        <input
          required
          type="password"
          name="password"
          placeholder={passwordPlaceholder}
          onFocus={() => setPasswordPlaceholder('')}
          onBlur={() => setPasswordPlaceholder('Password')}
        />

        <button>
          <GoSignIn /> Sign in
        </button>
        <p>
          Don't have an account?{' '}
          <span onClick={() => handleSignInCreateBtn()}>Create</span>
        </p>
      </form>
    </section>
  );
};
