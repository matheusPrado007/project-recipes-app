import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Recipes from '../pages/Recipes';

describe('Pagina de Recipes', () => {
  test('1- Verificar se ao carregar a pagina Login, contêm dois inputs e um button', () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);

    expect(history.location.pathname).toBe('/');

    const tbnAll = screen.getByRole('button', { name: /All/i });
    expect(tbnAll).toBeInTheDocument();
  });
});
