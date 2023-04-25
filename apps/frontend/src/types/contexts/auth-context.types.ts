import { Dispatch, SetStateAction } from 'react';
import { UpdateTokenResult } from '../accounts/update-token.types';
import { User } from '../accounts/user.types';

export interface AuthContextHandler {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRefreshToken: (updateTokenData: UpdateTokenResult) => Promise<void>;
  user?: User;
  accessToken?: string;
  setActiveRegisterForm: Dispatch<React.SetStateAction<boolean>>;
  activeRegisterForm: boolean;
  setActiveSignInForm: Dispatch<SetStateAction<boolean>>;
  activeSignInForm: boolean;
  handleLogout: () => void;
}
