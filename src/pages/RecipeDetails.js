import PropTypes from 'prop-types';
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mealDetailsByID, cocktailDetailsByID, mealRecomendationsByID,
  cocktailRecomendationsByID } from '../Services/DetailsAPI';
import '../css/StartRecipeBtn.css';
import RecommendationCard from '../components/RecommendationCard';
import ingredientsAndMeasuresFunc from '../Services/Helpers';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';

const six = 6;
const nine = 9;
const seventeen = 17;
const twentyNine = 29;
const thirtyTwo = 32;

class RecipeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      isMeal: true,
      ingredientsAndMeasures: [],
      recomendations: [],
      done: false,
      inProgress: false,
    };
  }

  async componentDidMount() {
    this.isDoneHandler();
    this.inProgressHandler();
    const { history: { location: { pathname } } } = this.props;
    const ID = pathname.split('/')[2];
    if (pathname.includes('meals')) {
      const response = await mealDetailsByID(ID);
      const recomendationsResponse = await mealRecomendationsByID();
      const ingredientsAndMeasures = ingredientsAndMeasuresFunc(
        Object.values(response.meals[0]).slice(nine, twentyNine),
        Object.values(response.meals[0]).slice(twentyNine),
      );
      this.setState({
        recipe: response.meals[0],
        isMeal: true,
        ingredientsAndMeasures,
        recomendations: recomendationsResponse.drinks.slice(0, six),
      });
    } else {
      const response = await cocktailDetailsByID(ID);
      const recomendationsResponse = await cocktailRecomendationsByID();
      const ingredientsAndMeasures = ingredientsAndMeasuresFunc(
        Object.values(response.drinks[0]).slice(seventeen, thirtyTwo),
        Object.values(response.drinks[0]).slice(thirtyTwo),
      );
      this.setState({
        recipe: response.drinks[0],
        isMeal: false,
        ingredientsAndMeasures,
        recomendations: recomendationsResponse.meals.slice(0, six),
      });
    }
  }

  inProgressHandler = async () => {
    const inProgressRecipes = await JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { history: { location: { pathname } } } = this.props;
    const ID = Number(pathname.split('/')[2]);
    if (inProgressRecipes) {
      const inProgress = inProgressRecipes
        .some((inProgressRecipe) => inProgressRecipe.id === ID);
      this.setState({
        inProgress,
      });
    } else {
      const inProgress = [];
      const stringfyed = JSON.stringify(inProgress);
      localStorage.setItem('inProgressRecipes', stringfyed);
    }
  };

  isDoneHandler = async () => {
    const doneRecipes = await JSON.parse(localStorage.getItem('doneRecipes'));
    const { history: { location: { pathname } } } = this.props;
    const ID = Number(pathname.split('/')[2]);
    if (doneRecipes) {
      const done = doneRecipes.some((doneRecipe) => doneRecipe.id === ID);
      this.setState({
        done,
      });
    } else {
      const done = [];
      const stringfyed = JSON.stringify(done);
      localStorage.setItem('doneRecipes', stringfyed);
    }
  };

  render() {
    const { recipe, done, isMeal,
      inProgress, recomendations, ingredientsAndMeasures,
    } = this.state;
    const { history: { location: { pathname } } } = this.props;
    const ID = pathname.split('/')[2];
    return (
      <body>
        { isMeal
          ? (
            <MealDetails
              recipe={ recipe }
              inProgress={ inProgress }
              ingredientsAndMeasures={ ingredientsAndMeasures }
              done={ done }
              ID={ ID }
            />)
          : (
            <DrinkDetails
              recipe={ recipe }
              inProgress={ inProgress }
              ingredientsAndMeasures={ ingredientsAndMeasures }
              done={ done }
              ID={ ID }
            />
          )}
        <AliceCarousel
          responsive={ { 360: { items: 2 } } }
          items={
            recomendations.map((recomendation, index) => (
              <RecommendationCard
                key={ isMeal ? recomendation.idDrink : recomendation.idMeal }
                recomendation={ recomendation }
                index={ index }
                isMeal={ isMeal }
              />))
          }
        />
      </body>
    );
  }
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeDetails;
