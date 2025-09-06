import styled from '@emotion/styled';
import React from 'react';

const ControlsRight = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #8E8E8E;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div<{ danger?: boolean }>`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => props.danger ? '#F64C4C' : '#1F1F1F'};
`;

interface HeatmapStatsProps {
  total: number;
  confirmed: number;
  highRisk: number;
}

const HeatmapStats: React.FC<HeatmapStatsProps> = ({ total, confirmed, highRisk }) => {
  return (
    <ControlsRight>
      <StatItem>
        <StatLabel>총 포트홀</StatLabel>
        <StatValue>{total}</StatValue>
      </StatItem>
      <StatItem>
        <StatLabel>확정된 포트홀</StatLabel>
        <StatValue>{confirmed}</StatValue>
      </StatItem>
      <StatItem>
        <StatLabel>고위험 확정</StatLabel>
        <StatValue danger>{highRisk}</StatValue>
      </StatItem>
    </ControlsRight>
  );
};

export default HeatmapStats;