import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route path="/meals" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />

      <Route exact path="/Profile" component={ Profile } />
      {/* <Route exact path="/meals/:id" />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } /> */}

    </Switch>
  );
}

export default App;
