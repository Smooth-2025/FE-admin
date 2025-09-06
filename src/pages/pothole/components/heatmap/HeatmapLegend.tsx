import styled from '@emotion/styled';
import React from 'react';

import { IMPACT_THRESHOLDS } from './constants';

const MapLegend = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const LegendTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 0.875rem;
  color: #1F1F1F;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 10px;
  }
`;

const LegendPin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  
  svg {
    width: 14px;
    height: 18px;
  }
`;

const LegendText = styled.span`
  font-size: 0.75rem;
  color: #1F1F1F;
`;

const LegendNote = styled.div`
  font-size: 0.6875rem;
  color: #8E8E8E;
  border-top: 1px solid #E1E1E1;
  padding-top: 8px;
`;

const HeatmapLegend: React.FC = () => {
  return (
    <MapLegend>
      <LegendTitle>히트맵 범례</LegendTitle>
      <LegendItem>
        <LegendPin>
          <svg viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1C5.6 1 2 4.6 2 9c0 4.5 8 17 8 17s8-12.5 8-17c0-4.4-3.6-8-8-8z" 
                  fill="#ff0000" 
                  stroke="white" 
                  strokeWidth="1"/>
            <circle cx="10" cy="9" r="2.5" fill="white"/>
          </svg>
        </LegendPin>
        <LegendText>높은 충격량 ({IMPACT_THRESHOLDS.HIGH}g 이상)</LegendText>
      </LegendItem>
      <LegendItem>
        <LegendPin>
          <svg viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1C5.6 1 2 4.6 2 9c0 4.5 8 17 8 17s8-12.5 8-17c0-4.4-3.6-8-8-8z" 
                  fill="#ffaa00" 
                  stroke="white" 
                  strokeWidth="1"/>
            <circle cx="10" cy="9" r="2.5" fill="white"/>
          </svg>
        </LegendPin>
        <LegendText>중간 충격량 ({IMPACT_THRESHOLDS.MEDIUM}-{IMPACT_THRESHOLDS.HIGH}g)</LegendText>
      </LegendItem>
      <LegendItem>
        <LegendPin>
          <svg viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1C5.6 1 2 4.6 2 9c0 4.5 8 17 8 17s8-12.5 8-17c0-4.4-3.6-8-8-8z" 
                  fill="#00ff00" 
                  stroke="white" 
                  strokeWidth="1"/>
            <circle cx="10" cy="9" r="2.5" fill="white"/>
          </svg>
        </LegendPin>
        <LegendText>낮은 충격량 ({IMPACT_THRESHOLDS.MEDIUM}g 미만)</LegendText>
      </LegendItem>
      <LegendNote>
        * 색상 진함 = 포트홀 밀도 높음
      </LegendNote>
    </MapLegend>
  );
};

export default HeatmapLegend;