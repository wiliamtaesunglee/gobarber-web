import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignIn from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { getByPlaholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaholderText('E-mail');
    const passwordField = getByPlaholderText('Senha');
    const buttonElement = getByText('Entrar')

    fireEvent.change(emailField, { target: { value: 'teste@teste.com.br' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
  });
})
