import type { ApiResponse } from '@shared-types/apiResponse';

export type LoginRequest = {
  loginId: string;
  password: string;
};

export type LoginSuccessData = {
  name: string;
  token: string;
};

export type RefreshSuccessData = {
  token: string;
};

export type LoginResponse = ApiResponse<LoginSuccessData>;
export type RefreshResponse = ApiResponse<RefreshSuccessData>;
