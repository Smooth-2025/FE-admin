import type { ApiResponse } from '@shared-types/apiResponse';

export type ScaleType = 'medium' | 'high'; // medium(심각) | high(보통)

interface drivingLogs {
  speed: number; // 차량 속도 (km/h)
  decelerationRate: number; // 순간 감속 값 (m/s^2)
  brakePedal: boolean; // 브레이크 상태 (true: 밟음, false: 안 밟음)
  acceleratorPedal: boolean; // 엑셀 상태 (true: 밟음, false: 안 밟음)
  timeOffsetSeconds: number; // 사고 시점 기준 상대 초 ( -10 .. 0 )
}

export interface Report {
  accidentId: string; // 사고 아이디
  user: {
    userId: string; //유저 아이디
    userName: string; //유저 이름
  };
  location: {
    latitude: number; // 사고 발생 위도
    longitude: number; // 사고 발생 경도
  };
  accidentAt: string; // 사고 발생 시각
  emergencyResponse: {
    // 응급 정보 섹션
    emergencyNotified: boolean; //119 신고 유무
    familyNotified: boolean; //가족 문자 전송 유무
    reportedAt: string; // 119 신고 시각
  };
  impulse: number; //충격량
  scale: ScaleType;
  drivingLogs: drivingLogs[];
}

export type PagedResponse<T> = {
  content: T[];
  page: number;
  totalPages: number;
};

export type ReportResponse = ApiResponse<PagedResponse<Report>>;

export type ConfirmReportResponse = {
  success: boolean;
  code: number;
  message: string;
  data: null;
};
