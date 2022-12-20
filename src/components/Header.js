import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      searching: false,
      pathName: '',
      noSearch: false,
    };
  }

  componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    switch (pathname) {
    case '/profile':
      this.setState({
        pathName: 'Profile',
        noSearch: true,
      });
      break;
    case '/drinks':
      this.setState({
        pathName: 'Drinks',
      });
      break;
    case '/meals':
      this.setState({
        pathName: 'Meals',
      });
      break;
    case '/done-recipes':
      this.setState({
        pathName: 'Done Recipes',
        noSearch: true,
      });
      break;
    case '/favorite-recipes':
      this.setState({
        pathName: 'Favorite Recipes',
        noSearch: true,
      });
      break;
    default:
    }
  }

  handleSearch = () => {
    const { searching } = this.state;
    if (searching) {
      this.setState({
        searching: false,
      });
    } else {
      this.setState({
        searching: true,
      });
    }
  };

  render() {
    const { searching, pathName, noSearch } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1
          data-testid="page-title"
        >
          {pathName}
        </h1>
        <Link
          to="/profile"
        >
          <button
            type="button"
          // onClick={ this.handleProfile }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              type="image/svg+xml"
              alt="profile icon"
            />
          </button>
        </Link>
        {!noSearch
          && (
            <button
              type="button"
              onClick={ this.handleSearch }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                name="searchIcon"
                type="image/svg+xml"
                alt="search icon"
              />
            </button>
          )}
        { searching && <SearchBar history={ history } />}
      </div>
    );
  }
}

Header.propTypes = {
  // name: PropTypes.string
}.isRequired;

export default Header;
// export default connect()(Header);
