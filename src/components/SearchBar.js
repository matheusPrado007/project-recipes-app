import React from 'react';
import PropTypes from 'prop-types';
import { filterMealsByIngredient, filterMealsByName,
  filterMealsByFistLetter, filterDrinksByIngredient, filterDrinksByName,
  filterDrinksByFistLetter } from '../services/api';

class SearchBar extends React.Component {
  state = {
    search: '',
    selectedOption: '',
  };

  onSearchChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onRadioChange = ({ target }) => {
    const { value } = target;
    this.setState({
      selectedOption: value,
    });
  };

  filtersIfMeals = async () => {
    const { selectedOption, search } = this.state;
    if (selectedOption === 'Ingredient') {
      const fetch = await filterMealsByIngredient(search);
      return fetch;
    }

    if (selectedOption === 'Name') {
      const fetch = await filterMealsByName(search);
      return fetch;
    }

    if (selectedOption === 'fistLetter' && search.length === 1) {
      const fetch = await filterMealsByFistLetter(search);
      return fetch;
    }

    if (selectedOption === 'fistLetter' && search.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  filtersIfDrinks = async () => {
    const { selectedOption, search } = this.state;
    if (selectedOption === 'Ingredient') {
      const fetch = await filterDrinksByIngredient(search);
      return fetch;
    }

    if (selectedOption === 'Name') {
      const fetch = await filterDrinksByName(search);
      return fetch;
    }

    if (selectedOption === 'fistLetter' && search.length === 1) {
      const fetch = await filterDrinksByFistLetter(search);
      return fetch;
    }

    if (selectedOption === 'fistLetter' && search.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  searchButton = async () => {
    const { location: { pathname }, history: { push } } = this.props;

    if (pathname === '/meals') {
      const filter = await this.filtersIfMeals();
      const result = filter.meals;

      if (result.length === 1) {
        push(`/meals/${result[0].idMeal}`);
      }

      console.log(result);
    }

    if (pathname === '/drinks') {
      const filter = await this.filtersIfDrinks();
      const result = filter.drinks;

      if (result.length === 1) {
        push(`/drinks/${result[0].idDrink}`);
      }

      console.log(result);
    }
  };

  render() {
    const { selectedOption, search } = this.state;
    return (
      <div>
        <input
          value={ search }
          placeholder="search"
          name="search"
          type="text"
          onChange={ this.onSearchChange }
        />

        <label htmlFor="Ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="Ingredient"
            value="Ingredient"
            id="Ingedient"
            checked={ selectedOption === 'Ingredient' }
            onChange={ this.onRadioChange }
          />
          Ingredient
        </label>

        <label htmlFor="Name">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="Name"
            value="Name"
            id="Name"
            checked={ selectedOption === 'Name' }
            onChange={ this.onRadioChange }
          />
          Name
        </label>

        <label htmlFor="fistLetter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="fistLetter"
            value="fistLetter"
            id="fistLetter"
            checked={ selectedOption === 'fistLetter' }
            onChange={ this.onRadioChange }
          />
          Frist letter
        </label>

        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ this.searchButton }
        >
          Search
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  pathname: PropTypes.func,
  push: PropTypes.func,
}.isRequired;

export default SearchBar;
