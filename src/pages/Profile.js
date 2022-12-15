import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends Component {
  render() {
    const { history } = this.props;

    const getLocalStorage = JSON.parse(localStorage.getItem('user'));

    const handleClick = () => {
      localStorage.clear();
      history.push('/');
    };
    return (
      <div>
        <Header history={ history } />
        <Footer />
        <main>
          <p data-testid="profile-email">
            { getLocalStorage ? getLocalStorage.email : 'Email' }
          </p>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
          >
            Logout
          </button>

        </main>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
