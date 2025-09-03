import styled from '@emotion/styled';
import { NavLink as RRNavLink } from 'react-router-dom';

export const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  box-shadow:
    0px 1px 2px ${({ theme }) => theme.colors.black_a12},
    0px 0px 1px ${({ theme }) => theme.colors.black_a12};
`;

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1512px;
  height: 70px;
`;

export const LeftSection = styled.p`
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: ${({ theme }) => theme.fontSize[20]};
  font-weight: 700;
  line-height: 1.5;
`;

export const CenterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const NavLink = styled(RRNavLink)`
  font-size: ${({ theme }) => theme.fontSize[16]};
  color: ${({ theme }) => theme.colors.neutral500};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.neutral700};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary600};
    font-weight: 700;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Profile = styled.p`
  font-size: ${({ theme }) => theme.fontSize[16]};
  color: ${({ theme }) => theme.colors.primary600};
`;

export const Logout = styled.button`
  border: none;
  background: transparent;
  img {
    width: 28px;
    height: 28px;
  }
`;
