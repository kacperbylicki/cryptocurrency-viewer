export type LoginResponse = {
  status: number;
  data: LoginResult | null;
};

export type LoginResult = {
  accessToken: string;
  refreshToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
