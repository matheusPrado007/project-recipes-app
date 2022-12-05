import PropTypes from 'prop-types';
import React, { Component } from 'react';

class RecipesInProgress extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="recipe-title">Tiltle:</h1>
        <img
          src={ a }
          alt="a"
          data-testid="recipe-photo"
        />
        <button
          type="button"
          data-testid="share-btn"
        >
          Search
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite
        </button>
        <p
          data-testid="recipe-category"
        >
          texto
        </p>
        <p
          data-testid="instructions"
        >
          Instruções
        </p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish
        </button>
      </div>
    );
  }
}

RecipesInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default RecipesInProgress;
