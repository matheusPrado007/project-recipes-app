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
  const drinksButtonPage = 'drinks-bottom-btn';
  it('Verifica se ao ultilizar os filtros de busca por ingredient na página de drinks, é retornado as respostas esperadas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, emailValue);

    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, '1234567');

    const btnEnter = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/meals');
    const btnDrink = screen.getByTestId(drinksButtonPage);
    userEvent.click(btnDrink);
    expect(history.location.pathname).toBe('/drinks');

    const searchIcon = screen.getByTestId(buttonForSearchBar);
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(testidSearchBar);
    userEvent.type(searchBar, 'water');

    const filterRadioIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(filterRadioIngredient);

    const searchButton = screen.getByTestId(testidButtonSearch);
    userEvent.click(searchButton);

    const firstRecipe = await screen.findByRole('heading', { level: 2, name: 'Adam Sunrise' });
    expect(firstRecipe).toBeInTheDocument();
    const recipes = screen.getAllByAltText('IMG');
    expect(recipes.length).toBe(12);
  });

  it('Verifica se ao ultilizar os filtros de busca por name na página de drinks, é retornado as respostas esperadas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, emailValue);

    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, '1234567');

    const btnEnter = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/meals');
    const btnDrink = screen.getByTestId(drinksButtonPage);
    userEvent.click(btnDrink);
    expect(history.location.pathname).toBe('/drinks');

    const searchIcon = screen.getByTestId(buttonForSearchBar);
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(testidSearchBar);
    userEvent.type(searchBar, 'coffee');

    const filterRadioName = screen.getByTestId(testidFilterName);
    userEvent.click(filterRadioName);

    const searchButton = screen.getByTestId(testidButtonSearch);
    userEvent.click(searchButton);

    const firstRecipe = await screen.findByRole('heading', { level: 2, name: 'Iced Coffee' });
    expect(firstRecipe).toBeInTheDocument();
    const recipes = screen.getAllByAltText('IMG');
    expect(recipes.length).toBe(12);
  });

  it('Verifica se ao ultilizar os filtros de busca por first-letter na página de drinks, é retornado as respostas esperadas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, emailValue);

    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, '1234567');

    const btnEnter = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/meals');
    const btnDrink = screen.getByTestId(drinksButtonPage);
    userEvent.click(btnDrink);
    expect(history.location.pathname).toBe('/drinks');

    const searchIcon = screen.getByTestId(buttonForSearchBar);
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(testidSearchBar);
    userEvent.type(searchBar, 'q');

    const filterRadioFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(filterRadioFirstLetter);

    const searchButton = screen.getByTestId(testidButtonSearch);
    userEvent.click(searchButton);

    const firstRecipe = await screen.findByRole('heading', { level: 2, name: 'Quentin' });
    expect(firstRecipe).toBeInTheDocument();
    const recipes = screen.getAllByAltText('IMG');
    expect(recipes.length).toBe(8);
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
    const btnDrink = screen.getByTestId(drinksButtonPage);
    userEvent.click(btnDrink);
    expect(history.location.pathname).toBe('/drinks');

    const searchIcon = screen.getByTestId(buttonForSearchBar);
    userEvent.click(searchIcon);

    const searchBar = screen.getByTestId(testidSearchBar);
    userEvent.type(searchBar, 'Adam Sunrise');

    const filterRadioName = screen.getByTestId(testidFilterName);
    userEvent.click(filterRadioName);

    const searchButton = screen.getByTestId(testidButtonSearch);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15567');
    });
  });
});
