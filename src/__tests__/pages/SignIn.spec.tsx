import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { getByPlaceholderText, container } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = container.querySelector('.btn');

    userEvent.type(emailField, 'teste@teste.com.br');
    userEvent.type(passwordField, '123456');

    userEvent.click(buttonElement);

    waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
