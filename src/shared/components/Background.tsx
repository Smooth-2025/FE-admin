import styled from '@emotion/styled';
import bgMark from '@images/smooth.png?url';

const Background = styled.div`
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
    -webkit-mask: url(${bgMark}) no-repeat left bottom / contain;
    mask: url(${bgMark}) no-repeat left bottom / contain;
    background: rgba(255, 255, 255, 0.14);
    pointer-events: none;
    z-index: 0;
  }
`;

export default Background;
