import * as S from '@notfound/notFoundPage.style';
import { useNavigate } from 'react-router-dom';

import Background from '@/shared/components/Background';
export default function NotFoundPage() {
  const navigate = useNavigate();
  const handleBack = () => navigate('/');

  return (
    <Background>
      <S.Container>
        <S.Title>404</S.Title>
        <S.SubTitle>페이지를 찾을 수 없습니다.</S.SubTitle>
        <S.BackButton onClick={handleBack}>돌아가기</S.BackButton>
      </S.Container>
    </Background>
  );
}
