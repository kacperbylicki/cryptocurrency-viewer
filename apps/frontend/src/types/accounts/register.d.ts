export type RegisterResponse = {
  status: number;
};

export type RegisterParams = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};
