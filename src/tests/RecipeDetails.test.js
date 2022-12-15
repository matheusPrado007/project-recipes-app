import React from 'react';
import { screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Pagina de Detalhes', () => {
  it('1- Verificar se a página de detalhes contém o título da receita e os ingredientes corretos', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/53026');
    });
    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });
  it('2- Verificar se a página de detalhes contém o vídeo da receita', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/52977');
    });
    const video = await screen.findByTestId('video');
    expect(video).toBeInTheDocument();
  });
  it('3- Verificar se a página de detalhes o botão para iniciar receita e direciona para a página correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/53026');
    });
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    expect().toBe();
  });
  it('4- Verificar se a lista de ingredientes de comida tem o tamanho correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/53065');
    });
    const listItems = await screen.findByRole('list', {
      name: /ingredients-and-measure/i,
    });
    const { findAllByRole } = within(listItems);
    const items = await findAllByRole('listitem');
    expect(items.length).toBe(7);
    // código retirado do site https://balavishnuvj.com/blog/testing-lists-items-with-react-testing-library/
  });
  it('5- Verificar se a lista de ingredientes de bebida tem o tamanho correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks/17222');
    });
    const listItems = await screen.findByRole('list', {
      name: /ingredients-and-measure/i,
    });
    const items = within(listItems).getAllByRole('listitem');
    console.log(items.length);
    expect(items.length).toBe(4);
  });
});
