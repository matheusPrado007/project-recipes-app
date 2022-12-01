import PropTypes from 'prop-types';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes({ history: { location: { pathname } } }) {
  return (
    <div>
      Recipes
      {pathname === '/meals' ? <Meals /> : <Drinks /> }
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default Recipes;
