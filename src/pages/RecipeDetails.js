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
      ingredientsAndMeasures,
    };
  }

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    if (pathname.includes('meals')) {
      const ID = pathname.split('/')[2];
      const response = await mealDetailsByID(ID);
      const recomendationsResponse = await mealRecomendationsByID();
      const recipeDetails = response.meals[0];
      const ingredientsEntries = Object.values(recipeDetails).slice(9, 29);
      const measuresEntries = Object.values(recipeDetails).slice(29, 49);
      // console.log(ingredientsEntries);
      // console.log(measuresEntries);
      const ingredientsAndMeasures = [];
      ingredientsEntries
        .forEach((value, index) => measuresEntries
          .forEach((value2, index2) => {
            if (index === index2) {
              const obj = ({
                [value]: value2,
              });
              ingredientsAndMeasures.push(obj);
            }
          }));
      console.log(ingredientsAndMeasures);
      this.setState({
        recipe: recipeDetails,
        isMeal: true,
        ingredientsAndMeasures,
      });
    } else {
      const ID = pathname.split('/')[2];
      const response = await cocktailDetailsByID(ID);
      const recomendationsResponse = await cocktailRecomendationsByID();
      const recipeDetails = response.drinks[0];
      this.setState({
        recipe: recipeDetails,
        isMeal: false,
        ingredientsAndMeasures,
      });
    }
  }

  render() {
    const { recipe, isMeal, ingredientsAndMeasures } = this.state;
    return (
      <>
        {/* <h1>RecipeDetails</h1> */}
        <>
          <h2
            data-testid="recipe-title"
          >
            { isMeal ? recipe.strMeal : recipe.strDrink }
          </h2>
          <h6
            data-testid="recipe-category"
          >
            { recipe.strCategory }
          </h6>
          <img
            style={ { maxHeight: '200px' } }
            data-testid="recipe-photo"
            src={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ isMeal ? recipe.strMeal : recipe.strDrinkThumb }
          />
          <p
            data-testid="instructions"
          >
            { recipe.strInstructions }
          </p>
          <ul>
            { ingredientsAndMeasures
              && ingredientsAndMeasures.map((entry, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ entry }
                >
                  {entry}
                </li>
              ))}
          </ul>
          {
            isMeal
              && <iframe
                data-testid="video"
                width="420"
                height="315"
                src={ recipe.strYoutube }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture"
                allowFullScreen
              />
          }
        </>
        {/* )} */}
      </>
    );
  }
}

RecipeDetails.propTypes = {
  // name: PropTypes.string
}.isRequired;

export default RecipeDetails;
