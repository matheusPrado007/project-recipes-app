import React from 'react';
import { mealDetailsByID,
  cocktailDetailsByID,
  mealRecomendationsByID,
  cocktailRecomendationsByID,
} from '../Services/DetailsAPI';

class RecipeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      isMeal: true,
    };
  }

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    if (pathname.includes('meals')) {
      const ID = pathname.split('/')[2];
      const response = await mealDetailsByID(ID);
      const recomendationsResponse = await mealRecomendationsByID();
      const recipeDetails = response.meals[0];
      // console.log(recomendationsResponse);
      this.setState({
        recipe: recipeDetails,
        isMeal: true,
      });
    } else {
      const ID = pathname.split('/')[2];
      const recipeDetails = cocktailDetailsByID(ID);
      const recomendationsResponse = await cocktailRecomendationsByID();
      this.setState({
        recipe: recipeDetails,
        isMeal: false,
      });
    }
  }

  render() {
    const { recipe, isMeal } = this.state;
    return (
      <>
        <h1>RecipeDetails</h1>
        { isMeal
          && (
            <>
              <h2
                data-testid="recipe-title"
              >
                {recipe.strMeal}
              </h2>
              <h6
                data-testid="recipe-category"
              >
                {recipe.strCategory}
              </h6>
              <img
                data-testid="recipe-photo"
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
            </>
          )}
      </>
    );
  }
}

RecipeDetails.propTypes = {
  // name: PropTypes.string
}.isRequired;

export default RecipeDetails;
