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
    if (setActiveSignInForm) setActiveSignInForm(false);
  };

  const handleRegisterRedirect = () => {
    if (setActiveRegisterForm) setActiveRegisterForm(true);
    if (setActiveSignInForm) setActiveSignInForm(false);
  };

  return (
    <section className="sign-in">
      <div
        className="sign-in-close-btn"
        role="sign-in-close-btn"
        onClick={() => handleSignInCloseBtn()}>
        <MdClose />
      </div>
      <div className="sign-in-header">
        <h2 className="sign-in-welcome-txt-first">Hello!</h2>
        <h2 className="sign-in-welcome-txt-second">Sign into Your account</h2>
      </div>
      <form
        className="sign-in-form"
        role="sign-in-form"
        onSubmit={(e) => handleLogin(e)}>
        <input
          required
          type="email"
          name="email_signin"
          placeholder={emailPlaceholder}
          onFocus={() => setEmailPlaceholder('')}
          onBlur={() => setEmailPlaceholder('Email')}
        />
        <input
          required
          type="password"
          name="password_signin"
          placeholder={passwordPlaceholder}
          onFocus={() => setPasswordPlaceholder('')}
          onBlur={() => setPasswordPlaceholder('Password')}
        />

        <button>
          <GoSignIn /> Sign in
        </button>
        <p>
          Don't have an account?{' '}
          <span onClick={() => handleRegisterRedirect()}>Create</span>
        </p>
      </form>
    </section>
  );
};
