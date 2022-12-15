import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente FavoriteRecipes', () => {
  const favorites = '/favorite-recipes';

  Object.assign(navigator, {
    clipboard: {
      writeText: () => { },
    },
  });

  test('se é renderizado todas as receitas', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(favorites);
    });

    // const favoritas = localStorage.getItem('user');
    // console.log(favoritas);

    const names = screen.getAllByTestId(/horizontal-name/i);

    expect(names.length).toBe(2);
  });

  test('se ao clicar no botão de desfavoritar, a receita é removida da tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(favorites);
    });

    const names = screen.getAllByTestId(/horizontal-name/i);

    const btnDesfavoritar = screen.getAllByTestId(/horizontal-favorite/i);
    userEvent.click(btnDesfavoritar[0]);
    userEvent.click(btnDesfavoritar[1]);

    expect(names[0]).not.toBeInTheDocument();
    expect(names[1]).not.toBeInTheDocument();
  });

  test('se ao clicar no ícone de comida, é renderizado apenas as comidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(favorites);
    });

    const textDrink = screen.getByText('drink');

    const btnMeals = screen.getByTestId(/by-meal/i);
    userEvent.click(btnMeals);

    expect(textDrink).not.toBeInTheDocument();
  });

  test('se ao clicar no ícone de bebida, é renderizado apenas as bebidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(favorites);
    });

    const btnAll = screen.getByTestId(/filter-by-all-btn/i);
    userEvent.click(btnAll);

    const textMeal = screen.getByText(/meal/i);

    const btnDrinks = screen.getByTestId(/by-drink/i);
    userEvent.click(btnDrinks);

    expect(textMeal).not.toBeInTheDocument();
  });

  test('se ao clicar no ícone de compartilhar, é copiado o link de detalhes da receita', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(favorites);
    });

    const btnCompartilhar = screen.getAllByTestId(/horizontal-share/i);
    userEvent.click(btnCompartilhar[0]);

    const textCopied = screen.getByText(/copied/);
    expect(textCopied).toBeInTheDocument();

    userEvent.click(btnCompartilhar[1]);

    expect(textCopied).toBeInTheDocument();
  });
});
