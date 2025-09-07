import 'leaflet/dist/leaflet.css';

import { useGetAllPotholesQuery } from '@api/potholeApi';
import styled from '@emotion/styled';
import { getErrorMessage } from '@utils/errorUtil';
import L from 'leaflet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { HEATMAP_CONFIG, MAP_CONFIG } from './constants';
import HeatmapControlsComponent from './HeatmapControls';
import HeatmapLegend from './HeatmapLegend';
import HeatmapStats from './HeatmapStats';
import PotholeMarker from './PotholeMarker';
import { type IntensityFilter, useHeatmapFilter } from './useHeatmapFilter';

const HeatmapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Pretendard', sans-serif;
`;

const HeatmapControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
  flex-wrap: wrap;
`;

const MapWrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 600px;
`;

const LoadingContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const ErrorContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  gap: 16px;
  color: #f64c4c;
  font-size: 1rem;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #3a70e2;
  }
`;

// Leaflet 기본 아이콘 설정
delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Heatmap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const heatLayerRef = useRef<L.HeatLayer | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [showMarkers, setShowMarkers] = useState(false);
  const [intensityFilter, setIntensityFilter] = useState<IntensityFilter>('all');
  const [heatLoaded, setHeatLoaded] = useState(false);

  // RTK Query를 사용한 데이터 가져오기
  const { data: potholeData = [], error: apiError, isLoading, refetch } = useGetAllPotholesQuery();

  // 커스텀 훅을 사용한 필터링 및 통계
  const { filteredData, stats } = useHeatmapFilter({
    data: potholeData,
    filter: intensityFilter,
  });

  // 에러 메시지 처리
  const errorMessage = apiError ? getErrorMessage(apiError) : null;

  // 히트맵 레이어 생성 및 업데이트
  const updateHeatmap = useCallback(() => {
    if (!mapRef.current || !mapReady || !heatLoaded || filteredData.length === 0) return;

    // 기존 히트맵 레이어 제거
    if (heatLayerRef.current) {
      mapRef.current.removeLayer(heatLayerRef.current);
    }

    // 지도 렌더링 완료 후 히트맵 생성
    setTimeout(() => {
      if (!mapRef.current) return;

      // 히트맵 데이터 포맷 변환 [lat, lng, intensity]
      const heatmapData: [number, number, number][] = filteredData.map((pothole) => [
        pothole.location.latitude,
        pothole.location.longitude,
        pothole.impact / MAP_CONFIG.impactNormalizationFactor,
      ]);

      // 새 히트맵 레이어 생성
      heatLayerRef.current = L.heatLayer(heatmapData, HEATMAP_CONFIG);
      heatLayerRef.current.addTo(mapRef.current);
    }, 100);
  }, [filteredData, mapReady, heatLoaded]);

  // 동적으로 leaflet.heat 로드
  useEffect(() => {
    import('leaflet.heat').then(() => setHeatLoaded(true));
  }, []);

  // 데이터 업데이트 시 히트맵 갱신
  useEffect(() => {
    if (mapReady && heatLoaded && filteredData.length > 0) {
      updateHeatmap();
    }
  }, [updateHeatmap, mapReady, heatLoaded, filteredData]);

  const handleRefresh = () => refetch();
  const handleToggleMarkers = () => setShowMarkers(!showMarkers);
  const handleFilterChange = (filter: string) => setIntensityFilter(filter as IntensityFilter);

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
      </LoadingContainer>
    );
  }

  if (errorMessage) {
    return (
      <ErrorContainer>
        <ErrorMessage>
          <div>오류 발생: {errorMessage}</div>
          <RetryButton onClick={handleRefresh}>🔄 다시 시도</RetryButton>
        </ErrorMessage>
      </ErrorContainer>
    );
  }

  return (
    <HeatmapContainer>
      <HeatmapControls>
        <HeatmapControlsComponent
          showMarkers={showMarkers}
          onToggleMarkers={handleToggleMarkers}
          intensityFilter={intensityFilter}
          onFilterChange={handleFilterChange}
          onRefresh={handleRefresh}
        />
        <HeatmapStats total={stats.total} confirmed={stats.confirmed} highRisk={stats.highRisk} />
      </HeatmapControls>

      <MapWrapper>
        <MapContainer
          center={MAP_CONFIG.center}
          zoom={MAP_CONFIG.zoom}
          style={{ height: '100%', width: '100%' }}
          whenReady={() => setMapReady(true)}
          ref={(map) => {
            if (map) {
              mapRef.current = map;
            }
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {showMarkers &&
            filteredData
              .filter((pothole) => pothole.confirmed)
              .map((pothole) => <PotholeMarker key={pothole.potholeId} pothole={pothole} />)}
        </MapContainer>

        <HeatmapLegend />
      </MapWrapper>
    </HeatmapContainer>
  );
};

export default Heatmap;
