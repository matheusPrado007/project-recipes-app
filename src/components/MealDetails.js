import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../css/StartRecipeBtn.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class MealDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      clickShare: false,
      favorited: false,
    };
  }

  componentDidMount() {
    this.createFavoriteStorage();
    this.checkFavorited();
  }

  createFavoriteStorage = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (!favoriteRecipes) {
      const favorite = [];
      const stringfyed = JSON.stringify(favorite);
      localStorage.setItem('favoriteRecipes', stringfyed);
    }
  };

  checkFavorited = async () => {
    const { ID } = this.props;
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const recipesArray = await JSON.parse(favoriteRecipes);
    const favorited = recipesArray.some((recipe) => Number(recipe.id) === Number(ID));
    this.setState({
      favorited,
    });
  };

  handleShare = () => {
    const { ID } = this.props;
    clipboardCopy(`http://localhost:3000/meals/${ID}`);
    this.setState({ clickShare: true });
  };

  handleFavorite = async () => {
    const { favorited } = this.state;
    const { recipe, ID } = this.props;
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const recipesArray = await JSON.parse(favoriteRecipes);
    if (!favorited) {
      const favoritedRecipe = {
        id: ID,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      recipesArray.push(favoritedRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipesArray));
      this.setState({
        favorited: true,
      });
    } else {
      const newArray = recipesArray
        .filter((recipeInTheArray) => Number(recipeInTheArray.id) !== Number(ID));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      this.setState({
        favorited: false,
      });
    }
  };

  render() {
    const { clickShare, favorited } = this.state;
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
          onClick={ this.handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ !favorited ? whiteHeartIcon : blackHeartIcon }
            alt="ícone de favoritar"
          />
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
                <a
                  href={ `/meals/${ID}/in-progress` }
                >
                  <button
                    data-testid="start-recipe-btn"
                    className="startRecipe"
                    type="button"
                  >
                    {!inProgress ? 'StartRecipe' : 'Continue Recipe'}
                  </button>
                </a>)}
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
    strArea: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default MealDetails;
