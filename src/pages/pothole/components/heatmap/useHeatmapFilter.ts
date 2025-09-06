import type { Pothole } from '@shared-types/potholeTypes';
import { useMemo } from 'react';

import { IMPACT_THRESHOLDS } from './constants';

export type IntensityFilter = 'all' | 'high' | 'medium' | 'low';

interface UseHeatmapFilterProps {
  data: Pothole[];
  filter: IntensityFilter;
}

interface HeatmapStats {
  total: number;
  confirmed: number;
  highRisk: number;
}

export const useHeatmapFilter = ({ data, filter }: UseHeatmapFilterProps) => {
  const filteredData = useMemo(() => {
    switch (filter) {
      case 'high':
        return data.filter(pothole => pothole.impact >= IMPACT_THRESHOLDS.HIGH);
      case 'medium':
        return data.filter(pothole =>
          pothole.impact >= IMPACT_THRESHOLDS.MEDIUM &&
          pothole.impact < IMPACT_THRESHOLDS.HIGH
        );
      case 'low':
        return data.filter(pothole => pothole.impact < IMPACT_THRESHOLDS.MEDIUM);
      default:
        return data;
    }
  }, [data, filter]);

  const stats = useMemo((): HeatmapStats => {
    const confirmedData = filteredData.filter(pothole => pothole.confirmed);
    return {
      total: filteredData.length,
      confirmed: confirmedData.length,
      highRisk: confirmedData.filter(pothole => pothole.impact >= IMPACT_THRESHOLDS.HIGH).length
    };
  }, [filteredData]);

  return { filteredData, stats };
};