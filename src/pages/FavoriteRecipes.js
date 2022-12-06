import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

class FavoriteRecipes extends Component {
  render() {
    const { history } = this.props;
    // const favoritas = localStorage.getItem('favoriteRecipes');
    const favoritas = [{
      id: 0,
      type: 'meal',
      nationality: 'brasileiro',
      category: '',
      alcoholicOrNot: 'not',
      name: 'churrasco',
      image: 'https://st1.uvnimg.com/3d/28/5601ad8e4d32a7272e3b7a8d8110/churrasco-0522.jpg',
    },

    {
      id: 1,
      type: 'drink',
      nationality: 'brasileiro',
      category: '',
      alcoholicOrNot: 'alcoholic',
      name: 'caipirinha',
      image: 'https://img.itdg.com.br/images/recipes/000/128/825/319875/319875_original.jpg',
    },
    ];

    return (
      <div>
        <Header history={ history } />

        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>

        <button type="button" data-testid="filter-by-meal-btn">
          <img src={ mealIcon } alt="ícone de comida" />
        </button>

        <button type="button" data-testid="filter-by-drink-btn">
          <img src={ drinkIcon } alt="ícone de bebida" />
        </button>

        {favoritas.map((recipe, index) => {
          const { id, type, nationality, category, alcoholicOrNot, name, image } = recipe;
          return (
            <div key={ id }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />

              <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>

              <p data-testid={ `${index}-horizontal-name` }>{name}</p>

              <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
                <img src={ shareIcon } alt="ícone de compartilhar" />
              </button>

              <button type="button" data-testid={ `${index}-horizontal-favorite-btn` }>
                <img src={ whiteHeartIcon } alt="ícone de favoritar" />
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
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default FavoriteRecipes;
