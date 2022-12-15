import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('The page Profil', () => {
  test('Testing the datatestId', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    const profile = screen.getByTestId('profile-email');
    const btnDone = screen.getByTestId('profile-done-btn');
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(profile).toBeInTheDocument();
    expect(btnDone).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });

  test('Testing the page redirection logout', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });

  test('Testing the page redirection Done', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    const btnDone = screen.getByTestId('profile-done-btn');
    expect(btnDone).toBeInTheDocument();
    userEvent.click(btnDone);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Testing the page redirection Favorite', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Testing the page redirection Favorite', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'fabiohenrique_2@hotmail.com' }));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    const email = screen.getByTestId('profile-email');

    expect(email).toHaveTextContent('fabiohenrique_2@hotmail.com');
    expect(email).toBeInTheDocument();
  });
});
