import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente FavoriteRecipes', () => {
  const favorites = '/favorite-recipes';
  const recipe = [{ id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', alcoholicOrNot: 'Optional alcohol', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' }, { id: '52977', type: 'meal', nationality: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' }];

  Object.assign(navigator, {
    clipboard: {
      writeText: () => { },
    },
  });

  test('se ao acessar a tela de receitas favoritas ainda não há nenhuma receita favorita', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push(favorites);
    });

    expect(localStorage.getItem('favoriteRecipes')).toBe(null);
  });

  test('se ao iniciar a aplicação e favoritar alguma receita, aparece na tela de receitas favoritas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));

    act(() => {
      history.push(favorites);
    });

    const nameRecipe = await screen.findByText('GG');
    expect(nameRecipe).toBeInTheDocument();
  });

  test('se ao clicar no ícone de comida, é renderizado apenas as comidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));

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

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));

    act(() => {
      history.push(favorites);
    });

    const textMeal = screen.getByText(/meal/i);

    const btnDrinks = screen.getByTestId(/by-drink/i);
    userEvent.click(btnDrinks);

    expect(textMeal).not.toBeInTheDocument();
  });

  test('se ao clicar no botão ALL, todas as receitas aparecem', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));

    act(() => {
      history.push(favorites);
    });

    const textMeal = screen.getByText(/meal/i);
    const textDrink = screen.getByText('drink');

    const btnAll = screen.getByTestId(/by-all/);
    userEvent.click(btnAll);

    expect(textMeal).toBeInTheDocument();
    expect(textDrink).toBeInTheDocument();
  });

  test('se ao clicar no botão de desfavoritar, a receita é removida da tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));

    act(() => {
      history.push(favorites);
    });

    const textDrink = screen.getByText('drink');
    const textMeal = screen.getByText(/meal/i);

    const btnDesfavoritar = screen.getAllByTestId(/horizontal-favorite/i);
    userEvent.click(btnDesfavoritar[0]);
    userEvent.click(btnDesfavoritar[1]);

    expect(textDrink).not.toBeInTheDocument();
    expect(textMeal).not.toBeInTheDocument();
  });

  test('se ao clicar no ícone de compartilhar, é copiado o link de detalhes da receita', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));

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
