export type RegisterResponse = {
  status: number;
};

export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};
