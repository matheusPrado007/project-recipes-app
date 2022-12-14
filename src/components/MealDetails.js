import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class MealDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      clickShare: false,
    };
  }

  handleShare = () => {
    clipboardCopy(`http://localhost:3000/meals/${id}`);
    this.setState({ clickShare: true });
  };

  render() {
    const { clickShare } = this.state;
    const { recipe, done, inProgress,
      ingredientsAndMeasures, ID,
    } = this.props;
    return (
      <body>
        <h2 data-testid="recipe-title">
          { recipe.strMeal }
        </h2>
        <h5 data-testid="recipe-category">
          { recipe.strCategory }
        </h5>
        <img
          style={ { maxHeight: '300px', display: 'block' } }
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
        />
        {clickShare && <p>Link copied!</p>}
        <button
          style={
            { display: 'inline-block' }
          }
          type="button"
          data-testid="share-btn"
          onClick={ this.handleShare }
        >
          <img src={ shareIcon } alt="ícone de compartilhar" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          // onClick={ () => { this.desfavoritar(id); } }
        >
          <img src={ whiteHeartIcon } alt="ícone de desfavoritar" />
        </button>
        <p data-testid="instructions">
          { recipe.strInstructions }
        </p>
        <ul aria-label="ingredients-and-measure">
          { ingredientsAndMeasures
              && (ingredientsAndMeasures)
                .map((entry, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ Object.keys(entry) }
                  >
                    { `${Object.keys(entry)}, ${Object.values(entry)}` }
                  </li>
                ))}
        </ul>
        <iframe
          data-testid="video"
          width="140"
          height="105"
          src={ recipe.strYoutube }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media;
                gyroscope; picture-in-picture"
          allowFullScreen
        />
        {!done
              && (
                <Link to={ `/meals/${ID}/in-progress` }>
                  <button
                    className="startRecipe"
                    type="button"
                    data-testid="start-recipe-btn"
                  >
                    {!inProgress ? 'StartRecipe' : 'Continue Recipe'}
                  </button>
                </Link>)}
      </body>
    );
  }
}

MealDetails.propTypes = {
  ID: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.shape).isRequired,
  recipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default MealDetails;
