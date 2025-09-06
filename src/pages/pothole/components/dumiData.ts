import type { Pothole } from '@/shared/types/potholeTypes';

export const POTHOLE_DUMI: Pothole[] = [
  {
    potholeId: 'p1',
    user: {
      userId: 'u1',
      userName: '홍길동',
    },
    location: {
      latitude: 37.5665,
      longitude: 126.978,
    },
    detectedAt: '2025-09-01T10:30:00Z',
    impact: 75,
    shake: 42,
    speed: 45,
    imageUrl: 'https://example.com/pothole1.jpg',
    confirmed: true,
  },
  {
    potholeId: 'p2',
    user: {
      userId: 'u2',
      userName: '김철수',
    },
    location: {
      latitude: 35.1796,
      longitude: 129.0756,
    },
    detectedAt: '2025-09-02T14:20:00Z',
    impact: 55,
    shake: 30,
    speed: 38,
    imageUrl: 'https://example.com/pothole2.jpg',
    confirmed: false,
  },
  {
    potholeId: 'p3',
    user: {
      userId: 'u3',
      userName: '이영희',
    },
    location: {
      latitude: 35.8714,
      longitude: 128.6014,
    },
    detectedAt: '2025-09-03T09:15:00Z',
    impact: 90,
    shake: 50,
    speed: 52,
    imageUrl: 'https://example.com/pothole3.jpg',
    confirmed: true,
  },
];
