import styled from '@emotion/styled';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize[18]};
  color: ${({ theme }) => theme.colors.neutral600};
`;

export const Input = styled.input`
  width: 100%;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.neutral300};
  border-radius: 10px;
  padding: 0 12px;
  font-size: ${({ theme }) => theme.fontSize[14]};
  background: ${({ theme }) => theme.colors.primary100};
  &:focus {
    outline: none;
    border-color: #8ab4ff;
    box-shadow: 0 0 0 3px rgba(138, 180, 255, 0.35);
    background: #fff;
  }
`;
