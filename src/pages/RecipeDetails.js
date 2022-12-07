import React from 'react';
import { mealDetailsByID, cocktailDetailsByID } from '../Services/DetailsAPI';

class RecipeDetails extends React.Component {
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
      const recipeDetails = response.meals[0];
      console.log(recipeDetails);
      this.setState({
        recipe: recipeDetails,
      });
    } else {
      const ID = pathname.split('/')[2];
      const recipeDetails = cocktailDetailsByID(ID);
      this.setState({
        recipe: recipeDetails,
      });
    }
  }

  render() {
    const { recipe } = this.state;
    // const recipeIngredients = recipe.entries;
    // console.log(recipeIngredients);
    return (
      <>
        <h1>RecipeDetails</h1>
        <h2
          data-testid="recipe-title"
        >
          { recipe.strMeal }
        </h2>
        <h6
          data-testid="recipe-category"
        >
          { recipe.strCategory }
        </h6>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
        />
      </>
    );
  }
}

RecipeDetails.propTypes = {
  // name: PropTypes.string
}.isRequired;

export default RecipeDetails;
