import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDrinksAndFoods, getCategDrinksAndFoods } from '../redux/actions';
import { getMealsApi, getCategoriesMeals } from '../Services/getAPI';
import Header from './Header';
import Footer from './Footer';

class Meals extends Component {
  componentDidMount() {
    this.fetchApi();
    this.mealsCategoriesApi();
  }

  fetchApi = async () => {
    const { dispatch } = this.props;
    const requestMealsApi = await getMealsApi();
    const result = requestMealsApi.meals;
    const twelve = 12;
    dispatch(getDrinksAndFoods(result.slice(0, twelve)));
  };

  mealsCategoriesApi = async () => {
    const { dispatch } = this.props;
    const requestDrinksApi = await getCategoriesMeals();
    const result = requestDrinksApi.meals;
    const five = 5;
    dispatch(getCategDrinksAndFoods(result.slice(0, five)));
  };

  render() {
    const { foodsAndDrinks, getCategories } = this.props;
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        Meals
        {
          getCategories.map((meal, index) => {
            const { strCategory } = meal;
            return (
              <button
                type="button"
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
              >
                { strCategory }
              </button>
            );
          })
        }
        {
          foodsAndDrinks.map((meal, index) => {
            const { strMeal, strMealThumb } = meal;
            return (
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
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Meals);
