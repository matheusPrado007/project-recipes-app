import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../css/StartRecipeBtn.css';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class DrinkDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      clickShare: false,
    };
  }

  componentDidMount() {
    this.createFavoriteStorage();
  }

  createFavoriteStorage = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (!favoriteRecipes) {
      const favorite = [];
      const stringfyed = JSON.stringify(favorite);
      localStorage.setItem('favoriteRecipes', stringfyed);
    }
  };

  handleShare = () => {
    const { ID } = this.props;
    clipboardCopy(`http://localhost:3000/drinks/${ID}`);
    this.setState({ clickShare: true });
  };

  handleFavorite = async () => {
    const { recipe, ID } = this.props;
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const jsonRecipes = await JSON.parse(favoriteRecipes);
    const favoritedRecipe = {
      id: ID,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    jsonRecipes.push(favoritedRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(jsonRecipes));
  };
  // JÁ ESTÁ ADICIONANDO UMA NOVA RECEITA NOS FAVORITOS, FALTA IMPLEMENTAR A LÓGICA PARA NÃO ADICIONAR REPETIDA E DESFAVORITAR E FALTA REPETIR A LÓGICA NO MealDetails;

  render() {
    const { clickShare } = this.state;
    const { recipe, done, inProgress,
      ingredientsAndMeasures, ID,
    } = this.props;
    return (
      <body>
        <h2 data-testid="recipe-title">
          { recipe.strDrink }
        </h2>
        <h5 data-testid="recipe-category">
          { `${recipe.strCategory}, ${recipe.strAlcoholic}` }
        </h5>
        <img
          style={ { maxHeight: '300px', display: 'block' } }
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
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
          onClick={ this.handleFavorite }
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
        {!done
              && (
                <a href={ `/drinks/${ID}/in-progress` }>
                  <button
                    className="startRecipe"
                    type="button"
                    data-testid="start-recipe-btn"
                  >
                    {!inProgress ? 'StartRecipe' : 'Continue Recipe'}
                  </button>
                </a>)}
      </body>
    );
  }
}

DrinkDetails.propTypes = {
  ID: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.shape).isRequired,
  recipe: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
};

export default DrinkDetails;
