import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockFood from './helpers/mockFood';
import mockDrink from './helpers/mockDrink';

describe('Pagina de RecipeInProgress', () => {
  test('1-Pagina /meals - Verificar se ao carregar a pagina, contêm 3 buttons uma img e alguns testesId', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockFood,
    }));
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/52772/in-progress');
    });

    expect(history.location.pathname).toBe('/meals/52772/in-progress');
    const textHeader = screen.getByTestId('recipe-title');
    expect(textHeader).toBeInTheDocument();
    const textCategory = screen.getByTestId('recipe-category');
    expect(textCategory).toBeInTheDocument();
    const textInstructions = screen.getByTestId('instructions');
    expect(textInstructions).toBeInTheDocument();
    const checkbox = await screen.findAllByRole('checkbox');
    expect(checkbox[0]).toBeInTheDocument();
    const checkboxText = await screen.findByText(/water/i);
    expect(checkboxText).toBeInTheDocument();

    userEvent.click(checkbox[0]);
    expect(checkbox[0]).toBeChecked();

    userEvent.click(checkbox[0]);
    expect(checkbox[0]).not.toBeChecked();

    const img = screen.getByTestId(/recipe-photo/i);
    expect(img).toBeInTheDocument();

    const btnCompartilhar = screen.getByRole('button', { name: /Compartilhar/i });
    expect(btnCompartilhar).toBeInTheDocument();

    const btnFavoritar = screen.getByRole('button', { name: /Favoritar/i });
    expect(btnFavoritar).toBeInTheDocument();

    const btnFinalizar = screen.getByRole('button', { name: /Finalizar/i });
    expect(btnFinalizar).toBeInTheDocument();
    global.fetch.mockRestore();

    global.fetch = jest.fn(async () => ({
      json: async () => mockDrink,
    }));
    act(() => {
      history.push('/drinks/17222/in-progress');
    });

    expect(history.location.pathname).toBe('/drinks/17222/in-progress');
    const textHeaderD = screen.getByTestId('recipe-title');
    expect(textHeaderD).toBeInTheDocument();
    const textCategoryD = screen.getByTestId('recipe-category');
    expect(textCategoryD).toBeInTheDocument();
    const textInstructionsD = screen.getByTestId('instructions');
    expect(textInstructionsD).toBeInTheDocument();
    const imgD = screen.getByTestId(/recipe-photo/i);
    expect(imgD).toBeInTheDocument();
    const btnCompartilharD = screen.getByRole('button', { name: /Compartilhar/i });
    expect(btnCompartilharD).toBeInTheDocument();

    const btnFavoritarD = screen.getByRole('button', { name: /Favoritar/i });
    expect(btnFavoritarD).toBeInTheDocument();

    const btnFinalizarD = screen.getByRole('button', { name: /Finalizar/i });
    expect(btnFinalizarD).toBeInTheDocument();
    global.fetch.mockRestore();
  });
});
