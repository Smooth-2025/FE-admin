import { useLogoutMutation } from '@api/authApi';
import * as S from '@app/navTab.style';
import logoutIcon from '@images/logout.png';
import { authStorage } from '@utils/authStorage';
import { getErrorMessage } from '@utils/errorUtil';
import { useNavigate } from 'react-router-dom';

export default function NavTab() {
  const userName = authStorage.getName();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .unwrap()
      .then((res) => {
        if (res.success) {
          navigate('/');
        }
      })
      .catch((err) => {
        getErrorMessage(err);
      });
  };

  return (
    <S.Header>
      <S.Container>
        <S.LeftSection>Smooth 관리자 센터</S.LeftSection>
        <S.CenterSection>
          <S.NavLink to="/report">사고 리포트</S.NavLink>
          <S.NavLink to="/pothole">노면 리포트</S.NavLink>
        </S.CenterSection>
        <S.RightSection>
          <S.Profile>{userName}</S.Profile>
          <S.Logout onClick={handleLogout}>
            <img src={logoutIcon} alt="logout" />
          </S.Logout>
        </S.RightSection>
      </S.Container>
    </S.Header>
  );
}
