export type LoginResponse = {
  status: number;
  data: LoginData;
};

export type LoginData = {
  accessToken: string;
  refreshToken: string;
};

export type LoginParams = {
  email: string;
  password: string;
};
