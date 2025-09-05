import * as S from '@app/appLayout.style';
import NavTab from '@app/NavTab';
import { Outlet } from 'react-router-dom';
export default function AppLayout() {
  return (
    <>
      <NavTab />
      <S.Container>
        <Outlet />
      </S.Container>
    </>
  );
}
