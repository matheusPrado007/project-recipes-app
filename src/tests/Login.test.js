import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Pagina de Login', () => {
  test('1- Verificar se ao carregar a pagina Login, contêm dois inputs e um button', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const btnEnter = screen.getByRole('button', { name: /Enter/i });
    expect(btnEnter).toBeInTheDocument();

    expect(btnEnter).toHaveProperty('disabled', true);

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, '1234567');
    expect(inputPassword.value).toBe('1234567');
    expect(btnEnter).toHaveProperty('disabled', true);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, 'test@trybe.com');
    expect(inputEmail.value).toBe('test@trybe.com');
    expect(btnEnter).toHaveProperty('disabled', false);

    expect(history.location.pathname).toBe('/');
  });
});
