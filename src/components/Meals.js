import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDrinksAndFoods, getCategDrinksAndFoods } from '../redux/actions';
import { getMealsApi, getCategoriesMeals, getFilter } from '../Services/getAPI';
import Header from './Header';
import Footer from './Footer';

class Meals extends Component {
  state = {
    categories: '',
  };

  componentDidMount() {
    this.fetchApi();
    this.mealsCategoriesApi();
  }

  fetchApi = async () => {
    const { dispatch } = this.props;
    const requestMealsApi = await getMealsApi();
    const result = requestMealsApi.meals;
    const twelve = 12;
    console.log(result);
    dispatch(getDrinksAndFoods(result.slice(0, twelve)));
  };

  mealsCategoriesApi = async () => {
    const { dispatch } = this.props;
    const requestDrinksApi = await getCategoriesMeals();
    const result = requestDrinksApi.meals;
    const five = 5;
    dispatch(getCategDrinksAndFoods(result.slice(0, five)));
  };

  onClick = async ({ target }) => {
    const { name } = target;
    const { categories } = this.state;
    if (name === categories) return this.handleClick();
    this.setState({ categories: name });
    const { dispatch } = this.props;
    const twelve = 12;
    const requestApi = await getFilter(name);
    dispatch(getDrinksAndFoods(requestApi.slice(0, twelve)));
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const twelve = 12;
    const { meals } = await getMealsApi();
    dispatch(getDrinksAndFoods(meals.slice(0, twelve)));
  };

  render() {
    const { foodsAndDrinks, getCategories } = this.props;
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        {
          getCategories.map((meal, index) => {
            const { strCategory } = meal;
            return (
              <button
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
                type="button"
                name={ strCategory }
                onClick={ this.onClick }
              >
                { strCategory }
              </button>
            );
          })
        }
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ this.handleClick }
        >
          All

        </button>
        {
          foodsAndDrinks.map((meal, index) => {
            const { strMeal, strMealThumb } = meal;
            return (
              <Link to={ `/meals/${meal.idMeal}` } key={ meal.idMeal }>
                <div
                  key={ index }
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt="IMG"
                    width="80px"
                  />
                  <h2 data-testid={ `${index}-card-name` }>
                    {strMeal}
                  </h2>
                </div>
              </Link>
            );
          })
        }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodsAndDrinks: state.drinksAndFoods.foodsAndDrinks,
  getCategories: state.drinksAndFoods.getCategories,
});

Meals.propTypes = {
  dispatch: PropTypes.func.isRequired,
  foodsAndDrinks: PropTypes.shape({
    map: PropTypes.func,
    slice: PropTypes.func,
  }).isRequired,
  getCategories: PropTypes.shape({
    map: PropTypes.func,
    slice: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Meals);
