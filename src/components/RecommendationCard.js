import PropTypes from 'prop-types';
import React from 'react';

class RecommendationCard extends React.Component {
  render() {
    const { isMeal, index, recomendation } = this.props;
    return (
      <a
        data-testid={ `${index}-recommendation-card` }
        key={ isMeal ? recomendation.idDrink : recomendation.idMeal }
        href={ isMeal ? `/drinks/${recomendation.idDrink}`
          : `/meals/${recomendation.idMeal}` }
      >
        <img
          style={ { maxHeight: '200px' } }
          onDragStart={ this.handleDragStart }
          src={ isMeal
            ? recomendation.strDrinkThumb : recomendation.strMealThumb }
          alt={ isMeal ? recomendation.strDrink : recomendation.strMeaL }
          role="presentation"
        />
        <span
          data-testid={ `${index}-recommendation-title` }
        >
          { isMeal ? recomendation.strDrink : recomendation.strMeal }
        </span>
      </a>
    );
  }
}

RecommendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  isMeal: PropTypes.bool.isRequired,
  recomendation: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeaL: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default RecommendationCard;
