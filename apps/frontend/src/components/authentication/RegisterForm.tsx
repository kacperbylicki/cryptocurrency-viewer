import { AuthContext } from '../../context/AuthContext';
import { MdClose } from 'react-icons/md';
import { useContext, useState } from 'react';

export const RegisterForm = () => {
  const [usernamePlaceholder, setUsernamePlaceholder] = useState('Username');
  const [emailPlaceholder, setEmailPlaceholder] = useState('Email');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Password');
  const [confirmPasswordPlaceholder, setConfirmPasswordPlaceholder] =
    useState('Confirm Password');

  const { setActiveSignInForm, setActiveRegisterForm, handleRegister } =
    useContext(AuthContext);

  const handleRegisterFormCloseBtn = () => {
    if (setActiveRegisterForm) setActiveRegisterForm(false);
  };

  const handleLoginRedirect = () => {
    if (setActiveSignInForm) setActiveSignInForm(true);
    if (setActiveRegisterForm) setActiveRegisterForm(false);
  };

  return (
    <section className="register-form">
      <div className="register-form-close-btn">
        <MdClose onClick={() => handleRegisterFormCloseBtn()} />
      </div>
      <div className="register-form-header">
        <h2>Create Account</h2>
      </div>
      <form
        id="registration-form"
        className="registration-form"
        onSubmit={(e) => handleRegister(e)}>
        <input
          required
          type="text"
          name="username_register"
          placeholder={usernamePlaceholder}
          onFocus={() => setUsernamePlaceholder('')}
          onBlur={() => setUsernamePlaceholder('Username')}
        />
        <input
          required
          type="email"
          name="email_register"
          placeholder={emailPlaceholder}
          onFocus={() => setEmailPlaceholder('')}
          onBlur={() => setEmailPlaceholder('Email')}
        />
        <input
          required
          type="password"
          name="password_register"
          placeholder={passwordPlaceholder}
          onFocus={() => setPasswordPlaceholder('')}
          onBlur={() => setPasswordPlaceholder('Password')}
        />
        <input
          required
          type="password"
          name="confirm_password_register"
          placeholder={confirmPasswordPlaceholder}
          onFocus={() => setConfirmPasswordPlaceholder('')}
          onBlur={() => setConfirmPasswordPlaceholder('Confirm Password')}
        />
        <button type="submit">Sign up</button>
        <p>
          If you already have an account.{' '}
          <span onClick={() => handleLoginRedirect()}>Sign in</span>
        </p>
      </form>
    </section>
  );
};
