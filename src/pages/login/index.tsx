import { useLoginMutation } from '@api/authApi';
import Background from '@components/Background';
import FormField from '@login/components/FormField';
import * as S from '@login/loginPage.style';
import { getErrorMessage } from '@utils/errorUtil';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    login({ loginId, password })
      .unwrap()
      .then((res) => {
        if (res.success) {
          navigate('/');
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        setError(getErrorMessage(err));
      });
  };

  return (
    <Background>
      <S.Card>
        <S.Title>Smooth 관리자 센터</S.Title>
        <S.SubTitle>로그인을 위해 이메일과 비밀번호를 입력해주세요.</S.SubTitle>
        <S.Form onSubmit={onSubmit}>
          <FormField
            label="아이디"
            name="username"
            placeholder="아이디를 입력해주세요."
            value={loginId}
            onChange={setLoginId}
          />
          <FormField
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={setPassword}
          />
          {error && <S.Error>{error}</S.Error>}
          <S.Submit type="submit" disabled={isLoading}>
            로그인
          </S.Submit>
        </S.Form>
      </S.Card>
    </Background>
  );
}
