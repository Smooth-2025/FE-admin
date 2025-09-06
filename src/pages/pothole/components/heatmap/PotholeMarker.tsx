import styled from '@emotion/styled';
import type { Pothole } from '@shared-types/potholeTypes';
import L from 'leaflet';
import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { IMPACT_THRESHOLDS, MARKER_COLORS } from './constants';

const PopupContent = styled.div`
  padding: 5px;
  min-width: 200px;
`;

const PopupTitle = styled.h4`
  margin: 0 0 8px 0;
  color: #1F1F1F;
`;

const PopupItem = styled.p`
  margin: 4px 0;
`;

interface PotholeMarkerProps {
  pothole: Pothole;
}

const getMarkerColor = (impact: number): string => {
  if (impact >= IMPACT_THRESHOLDS.HIGH) return MARKER_COLORS.HIGH;
  if (impact >= IMPACT_THRESHOLDS.MEDIUM) return MARKER_COLORS.MEDIUM;
  return MARKER_COLORS.LOW;
};

const createCustomIcon = (impact: number) => {
  const color = getMarkerColor(impact);
  return L.divIcon({
    className: 'custom-pin-marker',
    html: `
      <svg width="20" height="28" viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-${impact}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <path d="M10 1C5.6 1 2 4.6 2 9c0 4.5 8 17 8 17s8-12.5 8-17c0-4.4-3.6-8-8-8z" 
              fill="${color}" 
              stroke="white" 
              stroke-width="1.5"
              filter="url(#shadow-${impact})"/>
        <circle cx="10" cy="9" r="2.5" fill="white"/>
      </svg>
    `,
    iconSize: [20, 28],
    iconAnchor: [10, 28],
    popupAnchor: [0, -28]
  });
};

const PotholeMarker: React.FC<PotholeMarkerProps> = ({ pothole }) => {
  // 아이콘을 메모이제이션하여 불필요한 재생성 방지
  const icon = useMemo(() => createCustomIcon(pothole.impact), [pothole.impact]);

  return (
    <Marker
      position={[pothole.location.latitude, pothole.location.longitude]}
      icon={icon}
    >
      <Popup>
        <PopupContent>
          <PopupTitle>확정된 포트홀</PopupTitle>
          <PopupItem>
            <strong>ID:</strong> {pothole.potholeId}
          </PopupItem>
          <PopupItem>
            <strong>사용자:</strong> {pothole.user.userName}
          </PopupItem>
          <PopupItem>
            <strong>충격량:</strong> {pothole.impact.toFixed(2)}g
          </PopupItem>
          <PopupItem>
            <strong>속도:</strong> {pothole.speed.toFixed(1)}km/h
          </PopupItem>
          <PopupItem>
            <strong>발생일:</strong> {pothole.detectedAt}
          </PopupItem>
        </PopupContent>
      </Popup>
    </Marker>
  );
};

export default PotholeMarker;