import React from 'react';
import PropTypes from 'prop-types';
import { mealDetailsByID,
  cocktailDetailsByID,
} from '../Services/DetailsAPI';
// import Header from './Header';

class RecipeInProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
    };
  }

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    if (pathname.includes('meals')) {
      const ID = pathname.split('/')[2];
      const response = await mealDetailsByID(ID);
      const recipeDetails = response.meals;
      console.log(recipeDetails);
      this.setState({
        recipe: recipeDetails,
      });
    } else {
      const ID = pathname.split('/')[2];
      const response = await cocktailDetailsByID(ID);
      const recipeDetails = response.drinks;
      console.log(recipeDetails);
      this.setState({
        recipe: recipeDetails,
      });
    }
  }

  render() {
    const { recipe } = this.state;

    return (
      <div>
        {/* <Header history={ history } /> */}
        {
          pathname.includes('meals')
            ? (
              <div>
                <h1
                  data-testid="recipe-title"
                >
                  { recipe.strMeal }
                </h1>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid="recipe-photo"
                />
                <p data-testid="recipe-category">
                  { recipe.strCategory }
                </p>
                <p data-testid="instructions">
                  { recipe.strInstructions }
                </p>
                <button type="button" data-testid="share-btn">
                  Compartilhar
                </button>
                <button type="button" data-testid="favorite-btn">
                  Favoritar
                </button>
                <button type="button" data-testid="finish-recipe-btn">
                  Finalizar
                </button>
                <label htmlFor="checkbox">
                  <input type="checkbox" />
                </label>
              </div>
            )
            : (
              <div>
                <h1
                  data-testid="recipe-title"
                >
                  { recipe.strDrink }
                </h1>
                <p data-testid="recipe-category">
                  { recipe.strCategory }
                </p>
                <p>
                  { recipe.strAlcoholic }
                </p>
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                  data-testid="recipe-photo"
                />
                <p data-testid="instructions">
                  {}
                </p>
                <button type="button" data-testid="share-btn">
                  Compartilhar
                </button>
                <button type="button" data-testid="favorite-btn">
                  Favoritar
                </button>
                <button type="button" data-testid="finish-recipe-btn">
                  Finalizar
                </button>
              </div>
            )
        }
      </div>
    );
  }
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
export default RecipeInProgress;
