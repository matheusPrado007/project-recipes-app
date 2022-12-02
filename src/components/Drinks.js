import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getDrinksAndFoods, getCategDrinksAndFoods } from '../redux/actions';
import { getDrinksApi, getCategoriesDrinks, getFilterDrink } from '../Services/getAPI';
import Header from './Header';
import Footer from './Footer';

class Recipes extends Component {
  state = {
    categories: '',
  };

  componentDidMount() {
    this.fetchApi();
    this.drinksCategoriesApi();
  }

  fetchApi = async () => {
    const { dispatch } = this.props;
    const requestDrinksApi = await getDrinksApi();
    const result = requestDrinksApi.drinks;
    const twelve = 12;
    dispatch(getDrinksAndFoods(result.slice(0, twelve)));
  };

  drinksCategoriesApi = async () => {
    const { dispatch } = this.props;
    const requestDrinksApi = await getCategoriesDrinks();
    const result = requestDrinksApi.drinks;
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
    const requestApi = await getFilterDrink(name);
    dispatch(getDrinksAndFoods(requestApi.slice(0, twelve)));
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const twelve = 12;
    const { drinks } = await getDrinksApi();
    dispatch(getDrinksAndFoods(drinks.slice(0, twelve)));
  };

  render() {
    const { foodsAndDrinks, getCategories } = this.props;
    console.log(foodsAndDrinks);
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        {
          getCategories.map((drink, index) => {
            const { strCategory } = drink;
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
          name="all"
          onClick={ this.handleClick }
        >
          All

        </button>
        {
          foodsAndDrinks.map((drink, index) => {
            const { strDrink, strDrinkThumb } = drink;
            return (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >

                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt="IMG"
                  width="80px"
                />

                <h2 data-testid={ `${index}-card-name` }>
                  {strDrink}
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

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getCategories: PropTypes.shape({
    map: PropTypes.func,
    slice: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
  foodsAndDrinks: PropTypes.shape({
    map: PropTypes.func,
    slice: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Recipes);
