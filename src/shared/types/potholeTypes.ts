import type { ApiResponse } from '@shared-types/apiResponse';

export interface Pothole {
  potholeId: string;
  user: {
    userId: string;
    userName: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  detectedAt: string;
  impact: number;
  shake: number;
  speed: number;
  imageUrl: string;
  confirmed: boolean;
}

export type PagedResponse<T> = {
  content: T[];
  page: number;
  totalPages: number;
};

export type PotholeResponse = ApiResponse<PagedResponse<Pothole>>;
