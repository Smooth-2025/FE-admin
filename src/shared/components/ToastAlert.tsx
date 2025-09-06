import { Alert } from 'antd';
import { useEffect } from 'react';

import * as S from './ToastAlert.style';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export type ToastAlertProps = {
  type: AlertType;
  message: string;
  duration?: number; // ms
  onClose: () => void;
};

export default function ToastAlert({ type, message, duration = 3000, onClose }: ToastAlertProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <S.AlertWrapper>
      <Alert type={type} message={message} showIcon />
    </S.AlertWrapper>
  );
}
