import React from 'react';
import { Link } from 'react-router-dom';
import { mealDetailsByID,
  cocktailDetailsByID,
  mealRecomendationsByID,
  cocktailRecomendationsByID,
} from '../Services/DetailsAPI';
import '../css/StartRecipeBtn.css';

class RecipeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      isMeal: true,
      ingredientsAndMeasures: [],
      recomendations: [],
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
      console.log(recomendationsResponse.drinks);
      const ingredientsAndMeasures = this
        .ingredientsAndMeasuresFunc(
          Object.values(response.meals[0]).slice(nine, twentyNine),
          Object.values(response.meals[0]).slice(twentyNine),
        );
      this.setState({
        recipe: response.meals[0],
        isMeal: true,
        ingredientsAndMeasures,
        recomendations: recomendationsResponse.drinks,
      });
    } else {
      const response = await cocktailDetailsByID(ID);
      const recomendationsResponse = await cocktailRecomendationsByID();
      const ingredientsAndMeasures = this
        .ingredientsAndMeasuresFunc(
          Object.values(response.drinks[0]).slice(seventeen, thirtyTwo),
          Object.values(response.drinks[0]).slice(thirtyTwo),
        );
      this.setState({
        recipe: response.drinks[0],
        isMeal: false,
        ingredientsAndMeasures,
        recomendations: recomendationsResponse.meals,
      });
    }
  }

  ingredientsAndMeasuresFunc = (ingredientsArray, measuresArray) => {
    const ingredientsAndMeasures = [];
    ingredientsArray
      .forEach((value, index) => measuresArray
        .forEach((value2, index2) => {
          if (index === index2
            && value2 !== '' && value2 !== null && value !== ''
          ) {
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
    const { history: { location: { pathname } } } = this.props;
    const ID = pathname.split('/')[2];
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
        {isMeal
          ? (
            <Link to={ `/meals/${ID}/in-progress` }>
              <button
                className="startRecipe"
                type="button"
                data-testid="start-recipe-btn"
              >
                StartRecipe
              </button>
            </Link>
          )
          : (
            <Link to={ `/drinks/${ID}/in-progress` }>
              <button
                className="startRecipe"
                type="button"
                data-testid="start-recipe-btn"
              >
                StartRecipe
              </button>
            </Link>
          )}
      </body>
    );
  }
}

RecipeDetails.propTypes = {
  // name: PropTypes.string
}.isRequired;

export default RecipeDetails;
