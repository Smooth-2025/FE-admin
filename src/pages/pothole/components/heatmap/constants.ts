// 포트홀 충격량 임계값 상수
export const IMPACT_THRESHOLDS = {
  HIGH: 7.0,
  MEDIUM: 4.0
} as const;

// 마커 색상 상수
export const MARKER_COLORS = {
  HIGH: '#ff0000',    // 빨강 (7.0 이상)
  MEDIUM: '#ffaa00',  // 주황 (4.0-7.0)
  LOW: '#00ff00'      // 초록 (4.0 미만)
} as const;

// 지도 설정 상수
export const MAP_CONFIG = {
  center: [37.5580, 127.0035] as [number, number], // 동국대학교 학술관 중심
  zoom: 15,
  impactNormalizationFactor: 10
} as const;

// 히트맵 설정 상수
export const HEATMAP_CONFIG = {
  radius: 25,
  blur: 15,
  maxZoom: 17,
  gradient: {
    0.0: '#0000ff',
    0.2: '#00ffff',
    0.4: '#00ff00',
    0.6: '#ffff00',
    0.8: '#ff8000',
    1.0: '#ff0000'
  }
} as const;