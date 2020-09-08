import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'success' | 'info' | 'error';
}

const toastTypeVariations = {
  info: css`
    background-color: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background-color: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background-color: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  max-width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + div {
    margin-top: 8px;
  }

  ${({ type }) => toastTypeVariations[type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  > button {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    color: inherit;
  }
`;
