import React from 'react';
import PropTypes from 'prop-types';
// import clipboardCopy from 'clipboard-copy';
import { mealDetailsByID,
  cocktailDetailsByID,
} from '../Services/DetailsAPI';
import '../css/RecipeInProgress.css';

class RecipeInProgress extends React.Component {
  state = {
    recipe: {},
    checkbox: [],
    // copy: false,
  };

  async componentDidMount() {
    const { history: { location: { pathname } }, match: { params: { id } } } = this.props;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes === null) {
      const inProgressCheckbox = { drinks: {}, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressCheckbox));
    }
    if (pathname.includes('meals') && inProgressRecipes !== null) {
      this.setState({
        checkbox: inProgressRecipes.meals[id],
      });
    } else if (pathname.includes('drinks') && inProgressRecipes !== null) {
      this.setState({
        checkbox: inProgressRecipes.drinks[id],
      });
    }
    const NumberMaxSlice = 29;
    if (pathname.includes('meals')) {
      const response = await mealDetailsByID(id);
      const recipeDetails = response.meals[0];
      const NumberMinSlice = 9;
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
    } else if (pathname.includes('drinks')) {
      const response = await cocktailDetailsByID(id);
      const recipeDetails = response.drinks[0];
      const NumberMinSlice = 17;
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

  componentDidUpdate() {
    const { checkbox } = this.state;
    const { history: { location: { pathname } }, match: { params: { id } } } = this.props;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes === null) {
      const inProgressCheckbox = {
        drinks: {},
        meals: {},
      }; localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressCheckbox));
    }
    if (pathname.includes('meals') && inProgressRecipes !== null) {
      const inProgressCheckbox = {
        drinks: { ...inProgressRecipes.drinks },
        meals: {
          ...inProgressRecipes.meals, [id]: checkbox },
      }; localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressCheckbox));
    } else if (pathname.includes('drinks') && inProgressRecipes !== null) {
      const inProgressCheckbox = {
        drinks: {
          ...inProgressRecipes.drinks, [id]: checkbox },
        meals: { ...inProgressRecipes.meals },
      }; localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressCheckbox));
    }
  }

  handleCheck = (event) => {
    const progress = event.target.name;
    if (event.target.checked === true) {
      event.target.parentNode.classList.add('line');
      this.setState((state) => ({ checkbox: [...state.checkbox, progress] }));
    } else if (event.target.checked === false) {
      event.target.parentNode.classList.remove('line');
      this.setState((state) => ({ checkbox: state.checkbox
        .filter((el) => el !== progress) }));
    }
  };

  onClick = () => {
    const { history: { push } } = this.props;
    push('/done-recipes');
  };

  // favorite = () => {
  //   const { match: { params: { id } } } = this.props;
  //   const url = `http://localhost:3000/meals/52772/${id}`;
  //   clipboardCopy(url);
  //   this.setState({ copy: true });
  // };

  render() {
    const { recipe, ingredients, drinks, checkbox } = this.state;
    const { history: { location: { pathname } } } = this.props;
    const ingredientsList = ingredients !== undefined && ingredients.map((el) => el);
    const drinksList = drinks !== undefined && drinks.map((el) => el);
    return (
      <div>
        { pathname.includes('meals')
          ? (
            <div>
              <h1 data-testid="recipe-title">
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
                          name={ el }
                          checked={ checkbox
                            && checkbox
                              .find((e) => e === el) }
                          onChange={ this.handleCheck }
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
                disabled={ checkbox !== undefined
                    && checkbox.length !== (ingredientsList.length) }
                onClick={ this.onClick }
              >
                Finalizar
              </button>

            </div>
          ) : (
            <div>
              <h1 data-testid="recipe-title">
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
                          checked={ checkbox
                            && checkbox
                              .find((el) => el === e) }
                          onClick={ this.handleCheck }
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
                disabled={ checkbox !== undefined
                    && checkbox.length !== (drinksList.length) }
                onClick={ this.onClick }
              >
                Finalizar
              </button>
            </div>
          )}
      </div>
    );
  }
}
RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  match: PropTypes.shape({
    params: PropTypes.objectOf,
  }),
}.isRequired;
export default RecipeInProgress;
