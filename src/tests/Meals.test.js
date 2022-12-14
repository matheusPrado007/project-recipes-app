import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('The page Meals', () => {
  test('Testing the datatestId', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const page = screen.getByTestId('page-title');
    const profileTop = screen.getByTestId('profile-top-btn');
    const searchTop = screen.getByTestId('search-top-btn');
    const allCategory = screen.getByTestId('All-category-filter');
    const footer = screen.getByTestId('footer');
    const drinksBottom = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    expect(page).toBeInTheDocument();
    expect(profileTop).toBeInTheDocument();
    expect(searchTop).toBeInTheDocument();
    expect(allCategory).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(drinksBottom).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  test('Testing if the button appears', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const saveBtn = screen.getByTestId(/All/i);
    expect(saveBtn).toBeInTheDocument();
  });

  test('Test if it renders the 12 recipes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const btnCategories = await screen.findByText('Beef');
    expect(btnCategories).toBeInTheDocument();
    userEvent.click(btnCategories);

    const twelveRecipes = await screen.findAllByTestId(/card-name/);
    expect(twelveRecipes.length).toEqual(12);
  });

  test('Test Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const buttonMeals = await screen.findByText('Dessert');
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
  });
  test('Test Dessert', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const btnMeals = await screen.getByTestId(/category-filter/);
    userEvent.click(btnMeals);
    expect(btnMeals).toBeInTheDocument();
    const twelveRecipes = await screen.findAllByTestId(/card-name/);
    expect(twelveRecipes.length).toEqual(12);
  });

  test('Test if it renders the 12 recipes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonCategories = await screen.findByText('Goat');
    expect(buttonCategories).toBeInTheDocument();

    userEvent.click(buttonCategories);
    const twelveRecipes = await screen.findByText(/Mbuzi/);
    expect(twelveRecipes).toBeInTheDocument();

    userEvent.click(buttonCategories);
    const oneRecipe = await screen.findAllByTestId(/card-name/);
    expect(oneRecipe.length).toBe(1);
  });
});
