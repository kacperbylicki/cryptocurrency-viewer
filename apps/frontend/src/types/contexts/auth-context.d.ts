import { Dispatch, SetStateAction } from 'react';
import { UpdateTokenData } from '../accounts/update-token';

export interface IAuthContext {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRefreshToken: (updateTokenData: UpdateTokenData) => Promise<void>;
  user: any;
  accessToken: string | undefined;
  setActiveRegisterForm: Dispatch<React.SetStateAction<boolean>>;
  activeRegisterForm: boolean;
  setActiveSignInForm: Dispatch<SetStateAction<boolean>>;
  activeSignInForm: boolean;
  handleLogout: () => void;
}
