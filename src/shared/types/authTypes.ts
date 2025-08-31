export type LoginRequest = {
  loginId: string;
  password: string;
};

export type LoginSuccessData = {
  userId: number;
  name: string;
  role: 'ADMIN' | 'USER';
  token: string;
};

export type ApiResponse<T> = {
  success: boolean;
  code: number;
  message: string;
  data: T | null;
};

export type LoginResponse = ApiResponse<LoginSuccessData>;
