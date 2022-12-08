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
      ingredientsAndMeasures: [],
    };
  }

  async componentDidMount() {
    const nine = 9;
    const seventeen = 17;
    const twentyNine = 29;
    const thirtyTwo = 32;
    const { history: { location: { pathname } } } = this.props;
    const ID = pathname.split('/')[2];
    if (pathname.includes('meals')) {
      const response = await mealDetailsByID(ID);
      const recomendationsResponse = await mealRecomendationsByID();
      const recipeDetails = response.meals[0];
      const ingredientsEntries = Object.values(recipeDetails).slice(nine, twentyNine);
      const measuresEntries = Object.values(recipeDetails).slice(twentyNine);
      const ingredientsAndMeasures = this
        .ingredientsAndMeasuresFunc(ingredientsEntries, measuresEntries);
      this.setState({
        recipe: recipeDetails,
        isMeal: true,
        ingredientsAndMeasures,
      });
    } else {
      const response = await cocktailDetailsByID(ID);
      const recomendationsResponse = await cocktailRecomendationsByID();
      const recipeDetails = response.drinks[0];
      const ingredientsEntries = Object.values(recipeDetails).slice(21, 36);
      const measuresEntries = Object.values(recipeDetails).slice(36);
      const ingredientsAndMeasures = this
        .ingredientsAndMeasuresFunc(ingredientsEntries, measuresEntries);
      console.log(ingredientsAndMeasures);
      this.setState({
        recipe: recipeDetails,
        isMeal: false,
        ingredientsAndMeasures,
      });
    }
  }

  ingredientsAndMeasuresFunc = (ingredientsArray, measuresArray) => {
    const ingredientsAndMeasures = [];
    ingredientsArray
      .forEach((value, index) => measuresArray
        .forEach((value2, index2) => {
          if (index === index2) {
            const obj = ({
              [value]: value2,
            });
            ingredientsAndMeasures.push(obj);
          }
        }));
    return ingredientsAndMeasures;
  };

  render() {
    const { recipe, isMeal, ingredientsAndMeasures } = this.state;
    return (
      <body>
        <h2
          data-testid="recipe-title"
        >
          { isMeal ? recipe.strMeal : recipe.strDrink }
        </h2>
        {isMeal
          ? (
            <h5
              data-testid="recipe-category"
            >
              { recipe.strCategory }
            </h5>
          )
          : (
            <h5
              data-testid="recipe-category"
            >
              { `${recipe.strCategory}, ${recipe.strAlcoholic}` }
            </h5>
          )}
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
              && (ingredientsAndMeasures)
                // .filter((ingredientAndMeasure) => Object
                //   .keys(ingredientAndMeasure) !== null)
                .map((entry, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ Object.keys(entry) }
                  >
                    { `${Object.keys(entry)}, ${Object.values(entry)}` }
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
      </body>
    );
  }
}

RecipeDetails.propTypes = {
  // name: PropTypes.string
}.isRequired;

export default RecipeDetails;
