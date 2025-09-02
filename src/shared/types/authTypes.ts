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

export type ApiResponse<T> = {
  success: boolean;
  code: number;
  message: string;
  data: T | null;
};

export type LoginResponse = ApiResponse<LoginSuccessData>;
export type RefreshResponse = ApiResponse<RefreshSuccessData>;
