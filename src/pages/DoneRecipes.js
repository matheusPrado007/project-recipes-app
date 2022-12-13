import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipes extends Component {
  state = {
    array: [{
      idMeal: '123456',
      strMealThumb: 'algumaCoisa',
      strMeal: 'comida',
      strCategory: 'comestível',
      strArea: 'daqui',
      strTags: ['boa', 'demais'],
    }, {
      idDrink: '654321',
      strDrinkThumb: 'algumaCoisa',
      strDrink: 'bebida',
      strCategory: 'bebível',
      strAlcoholic: 'sim',
      strTags: ['dá', 'pro', 'gasto'],
    }],
  };

  allFilterButton = () => {};

  mealsFilterButton = () => {};

  drinksFitlerButton = () => {};

  render() {
    const { array } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />

        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ this.allFilterButton }
        >
          All
        </button>

        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ this.mealsFilterButton }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ this.drinksFitlerButton }
        >
          Drinks
        </button>

        { array.map((recipeDone, index) => (
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

            <h4 data-testid={ `${index}-horizontal-done-date` }>Data</h4>

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
