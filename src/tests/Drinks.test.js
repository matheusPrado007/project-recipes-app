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
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

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

  test('Test if it renders the 12 recipes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const twelveRecipes = await screen.findAllByTestId(/card-name/);
    expect(twelveRecipes.length).toEqual(12);
  });

  test('Test Drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const buttonMeals = await screen.findByText('Shake');
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
  });
  test('Test Shake', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const btnMeals = await screen.getByTestId(/category-filter/);
    userEvent.click(btnMeals);
    expect(btnMeals).toBeInTheDocument();
    const twelveRecipes = await screen.findAllByTestId(/card-name/);
    expect(twelveRecipes.length).toEqual(12);
  });

  test('Test if it renders the 12 recipes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const buttonCategories = await screen.findByText('Cocoa');
    expect(buttonCategories).toBeInTheDocument();

    userEvent.click(buttonCategories);
    const twelveRecipes = await screen.findByText(/Castillian/);
    expect(twelveRecipes).toBeInTheDocument();

    userEvent.click(buttonCategories);
    const oneRecipe = await screen.findAllByTestId(/card-name/);
    expect(oneRecipe.length).toBe(9);
  });
});
