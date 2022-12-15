import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

class FavoriteRecipes extends Component {
  state = {
    recipes: JSON.parse(localStorage.getItem('favoriteRecipes')),
    clickShare: false,
    filtereds: JSON.parse(localStorage.getItem('favoriteRecipes')),
  };

  desfavoritar = (id) => {
    const { recipes } = this.state;
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes
      .filter((recipe) => recipe.id !== id)));
    this.setState({ recipes: JSON.parse(localStorage.getItem('favoriteRecipes')),
      filtereds: JSON.parse(localStorage.getItem('favoriteRecipes')) });
  };

  clickFilter = (type) => {
    const { recipes } = this.state;
    this.setState({ filtereds: recipes.filter((recipe) => recipe.type !== type) });
  };

  render() {
    const { history } = this.props;
    const { filtereds, clickShare } = this.state;
    return (
      <div>
        {console.log(filtereds)}
        <Header history={ history } />

        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => { this.clickFilter(); } }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => { this.clickFilter('drink'); } }
        >
          <img src={ mealIcon } alt="ícone de comida" />
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => { this.clickFilter('meal'); } }
        >
          <img src={ drinkIcon } alt="ícone de bebida" />
        </button>

        {clickShare && <p>Link copied!</p>}

        {filtereds && filtereds.map((recipe, index) => {
          const { id, type, nationality, category, alcoholicOrNot, name, image } = recipe;
          if (type === 'meal') {
            return (
              <div key={ id }>
                <Link to={ `/meals/${id}` }>
                  <img
                    src={ image }
                    alt={ name }
                    data-testid={ `${index}-horizontal-image` }
                    style={ { width: '360px', weight: '640px' } }
                  />
                </Link>

                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${nationality} - ${category}`}

                </p>

                <p>{type}</p>

                <Link to={ `/meals/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{name}</p>
                </Link>

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => {
                    clipboardCopy(`http://localhost:3000/meals/${id}`);
                    this.setState({ clickShare: true });
                  } }
                >
                  <img src={ shareIcon } alt="ícone de compartilhar" />
                </button>

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  onClick={ () => { this.desfavoritar(id); } }
                >
                  <img src={ blackHeartIcon } alt="ícone de desfavoritar" />
                </button>

              </div>
            );
          }
          return (
            <div key={ id }>
              <Link to={ `/drinks/${id}` }>
                <img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                  style={ { width: '360px', weight: '640px' } }
                />
              </Link>

              <Link to={ `/drinks/${id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{name}</p>
              </Link>

              <p>{type}</p>

              <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>

              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ () => {
                  clipboardCopy(`http://localhost:3000/drinks/${id}`);
                  this.setState({ clickShare: true });
                } }
              >
                <img src={ shareIcon } alt="ícone de compartilhar" />
              </button>

              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                onClick={ () => { this.desfavoritar(id); } }
              >
                <img src={ blackHeartIcon } alt="ícone de favoritar" />
              </button>

            </div>
          );
        })}
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default FavoriteRecipes;
