import PropTypes from 'prop-types';
import Drinks from '../components/Drinks';
import Meals from '../components/Meals';

function Recipes({ history: { location: { pathname } }, history }) {
  return (
    <div>
      {pathname === '/meals'
        ? <Meals history={ history } /> : <Drinks history={ history } /> }

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
