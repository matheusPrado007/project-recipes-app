import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />

      <Route exact path="/Profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
    </Switch>
  );
}

export default App;
