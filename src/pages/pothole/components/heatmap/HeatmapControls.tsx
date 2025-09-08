import styled from '@emotion/styled';
import React from 'react';

const ControlsLeft = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  border: 1px solid #E1E1E1;
  border-radius: 8px;
  background: #ffffff;
  color: #1F1F1F;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #F5F5F5;
  }

  ${props => props.active && `
    border: none;
    background: #3B82F6;
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  `}
`;

const ControlSelect = styled.select`
  padding: 10px 15px;
  border: 1px solid #E1E1E1;
  border-radius: 8px;
  background: #ffffff;
  font-size: 0.875rem;
  cursor: pointer;
  color: #1F1F1F;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

interface HeatmapControlsProps {
  showMarkers: boolean;
  onToggleMarkers: () => void;
  intensityFilter: string;
  onFilterChange: (filter: string) => void;
  onRefresh: () => void;
}

const HeatmapControls: React.FC<HeatmapControlsProps> = ({
  showMarkers,
  onToggleMarkers,
  intensityFilter,
  onFilterChange,
  onRefresh
}) => {
  return (
    <ControlsLeft>
      <ControlButton 
        onClick={onToggleMarkers}
        active={showMarkers}
      > 확정된 포트홀
      </ControlButton>
      <ControlSelect 
        value={intensityFilter} 
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">모든 강도</option>
        <option value="high">높은 강도 (7.0 이상)</option>
        <option value="medium">중간 강도 (4.0-7.0)</option>
        <option value="low">낮은 강도 (4.0 미만)</option>
      </ControlSelect>
      <ControlButton onClick={onRefresh}>
        새로고침
      </ControlButton>
    </ControlsLeft>
  );
};

export default HeatmapControls;