import React from 'react';
import PropTypes from 'prop-types';
import { mealDetailsByID,
  cocktailDetailsByID,
} from '../Services/DetailsAPI';
import '../css/RecipeInProgress.css';

class RecipeInProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      checkbox: [],
    };
  }

  async componentDidMount() {
    this.newFunc();
    const { history: { location: { pathname } } } = this.props;
    if (pathname.includes('meals')) {
      const ID = pathname.split('/')[2];
      const response = await mealDetailsByID(ID);
      const recipeDetails = response.meals[0];
      const NumberMinSlice = 9;
      const NumberMaxSlice = 29;
      const ingredientsEntries = Object.values(recipeDetails)
        .slice(NumberMinSlice, NumberMaxSlice);
      const ingredients = [];
      ingredientsEntries.forEach((element) => {
        if (element !== '' && element !== null) {
          ingredients.push(element);
        }
      });

      this.setState({
        recipe: recipeDetails,
        ingredients,
      });
    } else {
      const ID = pathname.split('/')[2];
      const response = await cocktailDetailsByID(ID);
      const recipeDetails = response.drinks[0];
      const NumberMinSlice = 17;
      const NumberMaxSlice = 29;
      const drinksEntries = Object.values(recipeDetails)
        .slice(NumberMinSlice, NumberMaxSlice);
      const drinks = [];
      drinksEntries.forEach((element) => {
        if (element !== '' && element !== null && element !== 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg') {
          drinks.push(element);
        }
      });
      this.setState({
        recipe: recipeDetails,
        drinks,
      });
    }
  }

  handleCheck = ({ target }) => {
    if (target.checked) {
      target.parentNode.classList.add('line');
    } else {
      target.parentNode.classList.remove('line');
    }
  };

  newFunc = async (a, b) => {
    const { checkbox } = this.state;
    const progress = a;
    if (b === true) {
      this.setState((prev) => ({ checkbox: [...prev.checkbox, progress] }));
    } else if (b === false) {
      const filterRemove = checkbox.filter((el) => el !== progress);
      this.setState({ checkbox: filterRemove });
    }
  };

  saveResults = async ({ target }) => {
    const progress = target.name;
    const check = target.checked;
    await this.newFunc(progress, check);
    const { checkbox } = this.state;
    console.log(checkbox);

    const { history: { location: { pathname } } } = this.props;
    const ID = Number(pathname.split('/')[2]);
    const inProgressRecipes = await JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(inProgressRecipes);

    if (pathname.includes('meals')) {
      const inProgressCheckbox = {
        drinks: {
          ...inProgressRecipes.drinks,
        },
        meals: {
          ...inProgressRecipes.meals,
          [ID]: checkbox,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressCheckbox));
    } else {
      const inProgressCheckbox = {
        drinks: {
          ...inProgressRecipes.drinks,
          [ID]: checkbox,
        },
        meals: {
          ...inProgressRecipes.meals,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressCheckbox));
    }
  };

  render() {
    const { recipe, ingredients, drinks } = this.state;
    const { history: { location: { pathname } } } = this.props;
    const local = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    return (
      <div>
        {console.log(local)}
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
                <br />
                { ingredients
                    && ingredients.map((el, i) => (
                      <label
                        key={ i }
                        htmlFor="ingredient"
                        data-testid={ `${i}-ingredient-step` }
                      >
                        <input
                          id="ingredient"
                          type="checkbox"
                          className="line"
                          // checked={ local !== [] && local.find((e) => e === el) }
                          name={ el }
                          onChange={ this.handleCheck }
                          onClick={ this.saveResults }
                        />
                        {`${el}`}
                      </label>
                    ))}
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
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                  // disabled={ true }
                >
                  Finalizar
                </button>

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
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                  data-testid="recipe-photo"
                />
                <br />
                { drinks
                    && drinks.map((e, i) => (
                      <label
                        key={ i }
                        htmlFor="drink-label"
                        data-testid={ `${i}-ingredient-step` }
                      >
                        <input
                          type="checkbox"
                          className="line"
                          name={ e }
                          // checked={ local.find((a) => a === e) }
                          onChange={ this.handleCheck }
                          onClick={ this.saveResults }
                        />
                        {`${e}`}
                      </label>
                    ))}
                <p>
                  { recipe.strAlcoholic }
                </p>
                <p data-testid="instructions">
                  {recipe.strInstructions}
                </p>
                <button type="button" data-testid="share-btn">
                  Compartilhar
                </button>
                <button type="button" data-testid="favorite-btn">
                  Favoritar
                </button>
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                  // disabled={ local.find((e) => e) }
                >
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
