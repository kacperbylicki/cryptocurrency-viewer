export type UpdateTokenResponse = {
  status: number;
  data: UpdateTokenData;
};

export type UpdateTokenData = {
  accessToken: string;
  refreshToken: string;
};

export type UpdateTokenParams = {
  refreshToken: string;
};
