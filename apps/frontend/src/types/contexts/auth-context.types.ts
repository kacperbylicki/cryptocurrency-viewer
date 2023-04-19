import { Dispatch, SetStateAction } from 'react';
import { UpdateTokenData } from '../accounts/update-token.types';
import { User } from '../accounts/user.types';

export interface AuthContextHandler {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRefreshToken: (updateTokenData: UpdateTokenData) => Promise<void>;
  user?: User;
  accessToken: string | undefined;
  setActiveRegisterForm: Dispatch<React.SetStateAction<boolean>>;
  activeRegisterForm: boolean;
  setActiveSignInForm: Dispatch<SetStateAction<boolean>>;
  activeSignInForm: boolean;
  handleLogout: () => void;
}
