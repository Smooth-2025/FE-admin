import styled from '@emotion/styled';
import bgMark from '@images/smooth.png?url';

export const Background = styled.div`
  position: relative; /* 의사요소 기준 */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #01b2ff 0%, #2636ff 50%, #6a29ff 100%);

  &::before {
    content: '';
    position: absolute;
    top: 5%;
    left: -20%;
    width: 1200px;
    aspect-ratio: 3109.29 / 2405.47;

    /* 🔴 핵심: SVG를 마스크로 사용 */
    -webkit-mask: url(${bgMark}) no-repeat left bottom / contain;
    mask: url(${bgMark}) no-repeat left bottom / contain;

    /* 여기서 보이는 ‘색’을 지정합니다 */
    background: rgba(255, 255, 255, 0.14);

    pointer-events: none;
    z-index: 0;
  }
`;

export default Background;
