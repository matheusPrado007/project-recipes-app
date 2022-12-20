import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipes extends Component {
  state = {
    array: [],
    filters: [],
  };

  componentDidMount() {
    const recipesDoneLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({ array: recipesDoneLocal });
    const { array } = this.state;
    this.setState({ filters: array });
  }

  filterButton = ({ target }) => {
    const { value } = target;
    const { array } = this.state;
    console.log(value);
    if (value === 'All') {
      this.setState({ filters: array });
    } else if (value === 'Meals') {
      this.setState({ filters: array.filter((receita) => receita.idMeal) });
    } else if (value === 'Drinks') {
      this.setState({ filters: array.filter((receita) => receita.idDrink) });
    }
  };

  render() {
    const { filters } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />

        <button
          data-testid="filter-by-all-btn"
          type="button"
          value="All"
          onClick={ this.filterButton }
        >
          All
        </button>

        <button
          data-testid="filter-by-meal-btn"
          type="button"
          value="Meals"
          onClick={ this.filterButton }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          value="Drinks"
          onClick={ this.filterButton }
        >
          Drinks
        </button>

        { filters.map((recipeDone, index) => (
          <div key={ recipeDone.idMeal }>

            { recipeDone.idMeal && (
              <Link to={ `/meals/${recipeDone.idMeal}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipeDone.strMealThumb }
                  alt="IMG"
                  width="80px"
                />
              </Link>
            )}

            { recipeDone.idDrink && (
              <Link to={ `/drinks/${recipeDone.idDrink}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipeDone.strDrinkThumb }
                  alt="IMG"
                  width="80px"
                />
              </Link>
            )}

            { recipeDone.idMeal && (
              <Link to={ `/meals/${recipeDone.idMeal}` }>
                <h2
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipeDone.strMeal }
                </h2>
              </Link>
            )}

            { recipeDone.idDrink && (
              <Link to={ `/drinks/${recipeDone.idDrink}` }>
                <h2
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipeDone.strDrink }
                </h2>
              </Link>
            )}

            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              { (recipeDone.strCategory && recipeDone.strArea)
               || recipeDone.strAlcoholic }
            </h4>

            <h4
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipeDone.doneDate }
            </h4>

            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              onClick={ () => {
                navegator.clipboard.writeText(`/meals/${recipeDone.idMeal}`);
              } }
            >
              <img
                src={ shareIcon }
                type="image/svg+xml"
                alt="share icon"
              />
            </button>

            { recipeDone.strTags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            )) }

          </div>
        )) }
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DoneRecipes;
