import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Header', () => {
  test('1- Verifica se o Header aparece corretamente em "Meals"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const pageHeader = screen.getByRole('heading', { name: /meals/i });
    expect(pageHeader).toBeInTheDocument();
  });
  test('2- Verifica se o Header aparece corretamente em "Drinks"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const pageHeader = screen.getByRole('heading', { name: /drinks/i });
    expect(pageHeader).toBeInTheDocument();
  });
  test('3- Verifica se o Header aparece corretamente em "Profile"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    const pageHeader = screen.getByRole('heading', { name: /profile/i });
    expect(pageHeader).toBeInTheDocument();
  });
  test('4- Verifica se o Header aparece corretamente em "Done Recipes"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    const pageHeader = screen.getByRole('heading', { name: /Done Recipes/i });
    expect(pageHeader).toBeInTheDocument();
  });
  test('5- Verifica se o Header aparece corretamente em "Favorite Recipes"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const pageHeader = screen.getByRole('heading', { name: /favorite Recipes/i });
    expect(pageHeader).toBeInTheDocument();
  });
  test('6- Verifica se o profile button aparece corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });
  test('7- Verifica se o search button aparece corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
  });
  test('8- Verifica se o botão search funciona corretamente ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchExecBtn = await screen.findByTestId('exec-search-btn');
    expect(searchExecBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(searchExecBtn).not.toBeInTheDocument();
  });
});
