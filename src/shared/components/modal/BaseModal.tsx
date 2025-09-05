import { Drawer, Modal } from 'antd';

import * as S from './BaseModal.style';

type ModalType = 'center' | 'right';

type PropsType = {
  open: boolean;
  onClose: () => void;
  type?: ModalType;
  title?: string;
  children: React.ReactNode;
};

export default function BaseModal({ open, onClose, type = 'center', title, children }: PropsType) {
  return type === 'center' ? (
    <Modal open={open} onCancel={onClose} title={<S.Title>{title}</S.Title>} footer={null} centered>
      {children}
    </Modal>
  ) : (
    <Drawer open={open} onClose={onClose} title={title} placement="right">
      {children}
    </Drawer>
  );
}
