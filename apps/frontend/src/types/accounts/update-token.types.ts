export type UpdateTokenResponse = {
  status: number;
  data: UpdateTokenResult | null;
};

export type UpdateTokenResult = {
  accessToken: string | null;
  refreshToken: string | null;
};

export type UpdateTokenPayload = {
  refreshToken: string;
};
