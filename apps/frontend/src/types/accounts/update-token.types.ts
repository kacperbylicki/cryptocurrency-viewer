export type UpdateTokenResponse = {
  status: number;
  data: UpdateTokenResult | null;
};

export type UpdateTokenResult = {
  accessToken: string;
  refreshToken: string;
};

export type UpdateTokenPayload = {
  refreshToken: string;
};
