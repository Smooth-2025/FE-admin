import { Button } from 'antd';
import * as XLSX from 'xlsx';

import type { Pothole } from '@/shared/types/potholeTypes';

type PropsType = {
  data: Pothole[];
};

export default function DownloadExcelButton({ data }: PropsType) {
  const handleDownload = () => {
    const exportData = data.map((item) => ({
      '포트홀 ID': item.potholeId,
      '사용자 ID': item.user.userId,
      '사용자 이름': item.user.userName,
      '발생위치(위도)': item.location.latitude,
      '발생위치(경도)': item.location.longitude,
      '발생 시각': new Date(item.detectedAt).toLocaleString(),
      '충격량(g)': item.impact,
      '흔들림(Z)': item.shake,
      '속도(km/h)': item.speed,
      '심각 확정 여부': item.confirmed ? '확인됨' : '미확인',
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PotholeData');
    XLSX.writeFile(workbook, 'pothole-data.xlsx');
  };

  return <Button onClick={handleDownload}>.xlsx 다운로드</Button>;
}
