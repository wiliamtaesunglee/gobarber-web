import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  > header {
    height: 144px;
    background-color: #28262e;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: 1120px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      height: 100%;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -174px auto;

  place-content: center;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`;

export const InputSection = styled.div`
  margin-top: 24px !important;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;

  animation: ${appearFromLeft} 1s;
`;

export const AvatarInput = styled.div`
  position: relative;
  margin-bottom: 32px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background-color: #ff9000;
    right: 0;
    bottom: 0;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #28262e;
    }

    &:hover {
      background-color: ${shade(.2, '#ff9000')}
    }
  }

`
