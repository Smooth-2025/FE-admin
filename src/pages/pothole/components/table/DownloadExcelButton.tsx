import { Button } from 'antd';
import { useState } from 'react';
import * as XLSX from 'xlsx';

import { useLazyGetAllPotholesQuery } from '@/shared/api/potholeApi';
import ToastAlert from '@/shared/components/ToastAlert';

export default function DownloadExcelButton() {
  const [trigger, { isLoading }] = useLazyGetAllPotholesQuery();
  const [alertInfo, setAlertInfo] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  );

  const handleDownload = async () => {
    try {
      const result = await trigger().unwrap();

      if (!result || result.length === 0) {
        showAlert('error', '다운로드할 데이터가 없습니다.');
        return;
      }

      const exportData = result.map((item) => ({
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

      // 워크북 생성 및 시트 추가
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'PotholeData');

      // 파일 다운로드
      XLSX.writeFile(workbook, 'pothole-data.xlsx');
      showAlert('success', '엑셀 다운로드가 완료되었습니다.');
    } catch {
      showAlert('error', '엑셀 다운로드에 실패했습니다.');
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => setAlertInfo(null), 3000);
  };

  return (
    <>
      {alertInfo && (
        <ToastAlert
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <Button onClick={handleDownload} loading={isLoading} disabled={isLoading}>
        .xlsx 다운로드
      </Button>
    </>
  );
}
