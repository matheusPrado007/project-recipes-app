import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes referentes ao component SearchBar', () => {
  const email = 'email-input';
  const emailValue = 'test@trybe.com';
  const password = 'password-input';
  const buttonForSearchBar = 'search-top-btn';
  const testidSearchBar = 'search-input';
  const testidFilterName = 'name-search-radio';
  const testidButtonSearch = 'exec-search-btn';
  it('Verifica se a barra e botão de busca estão na tela, além de seus botões de filtro', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, emailValue);

    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, '1234567');

    expect(history.location.pathname).toBe('/');

    const btnEnter = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(btnEnter);

    expect(history.location.pathname).toBe('/meals');

    const searchButton = screen.getByTestId(buttonForSearchBar);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const searchBarr = screen.getByTestId(testidSearchBar);
    const searchButtonBarr = screen.getByTestId(testidButtonSearch);
    const filterRadioIngredient = screen.getByTestId('ingredient-search-radio');
    const filterRadioName = screen.getByTestId(testidFilterName);
    const filterRadioFirstLetter = screen.getByTestId('first-letter-search-radio');
    expect(searchBarr && searchButtonBarr && filterRadioIngredient
         && filterRadioName && filterRadioFirstLetter).toBeInTheDocument();
  });

  it('Verifica se ao ultilizar os filtros de busca por ingredient na página de meals, é retornado as respostas esperadas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, emailValue);

    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, '1234567');

    const btnEnter = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/meals');

    const searchIcon = screen.getByTestId(buttonForSearchBar);
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(testidSearchBar);
    userEvent.type(searchBar, 'water');

    const filterRadioIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(filterRadioIngredient);

    const searchButton = screen.getByTestId(testidButtonSearch);
    userEvent.click(searchButton);

    const firstRecipe = await screen.findByRole('heading', { level: 2, name: 'BeaverTails' });
    expect(firstRecipe).toBeInTheDocument();
    const recipes = screen.getAllByAltText('IMG');
    expect(recipes.length).toBe(12);
  });

  it('Verifica se ao ultilizar os filtros de busca por name na página de meals, é retornado as respostas esperadas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, emailValue);

    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, '1234567');

    const btnEnter = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/meals');

    const searchIcon = screen.getByTestId(buttonForSearchBar);
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(testidSearchBar);
    userEvent.type(searchBar, 'egg');

    const filterRadioName = screen.getByTestId(testidFilterName);
    userEvent.click(filterRadioName);

    const searchButton = screen.getByTestId(testidButtonSearch);
    userEvent.click(searchButton);

    const firstRecipe = await screen.findByRole('heading', { level: 2, name: 'Egg Drop Soup' });
    expect(firstRecipe).toBeInTheDocument();
    const recipes = screen.getAllByAltText('IMG');
    expect(recipes.length).toBe(5);
  });

  it('Verifica se ao ultilizar os filtros de busca por first-letter na página de meals, é retornado as respostas esperadas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, emailValue);

    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, '1234567');

    const btnEnter = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/meals');

    const searchIcon = screen.getByTestId(buttonForSearchBar);
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(testidSearchBar);
    userEvent.type(searchBar, 'k');

    const filterRadioFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(filterRadioFirstLetter);

    const searchButton = screen.getByTestId(testidButtonSearch);
    userEvent.click(searchButton);

    const firstRecipe = await screen.findByRole('heading', { level: 2, name: 'Kapsalon' });
    expect(firstRecipe).toBeInTheDocument();
    const recipes = screen.getAllByAltText('IMG');
    expect(recipes.length).toBe(12);
  });
  it('Verifica se ao ultilizar um filtro na página de meals e o retorno for apenas uma receita, o usuário é levado para página de detalhes dessa receita', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, emailValue);

    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, '1234567');

    const btnEnter = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/meals');

    const searchIcon = screen.getByTestId(buttonForSearchBar);
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(testidSearchBar);
    userEvent.type(searchBar, 'Pad See Ew');

    const filterRadioName = screen.getByTestId(testidFilterName);
    userEvent.click(filterRadioName);

    const searchButton = screen.getByTestId(testidButtonSearch);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52774');
    });
  });
});
