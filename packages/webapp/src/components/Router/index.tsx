import React, { FC } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@twocats/store';
import { getAuthKey, getIsAdmin } from 'store/auth/selectors';
import { history } from 'store';

import AdminDashboard from 'containers/Admin';
import AdminRecipes from 'containers/Admin/Recipes';
import CreateRecipe from 'containers/Admin/Recipes/CreateRecipe';
import RecipeOverview from 'containers/Admin/Recipes/RecipeOverview';

import BrowseRecipes from 'containers/BrowseRecipes';
import Header from 'components/layout/Header';
import Home from 'containers/Home';
import Login from 'containers/Login';
import Logout from 'containers/Logout';
import Recipe from 'containers/Recipe';

const Router: FC<PropsFromRedux> = ({ authKey, isAdmin, children }) => {
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/logout'>
          <Logout />
        </Route>
        <Route exact path='/recipes'>
          <BrowseRecipes />
        </Route>
        <Route path='/recipe/:id'>
          <Recipe />
        </Route>
        <Route exact path='/admin'>
          {isAdmin && <AdminDashboard />}
        </Route>
        <Route exact path='/admin/recipes'>
          {isAdmin && <AdminRecipes />}
        </Route>
        <Route exact path='/admin/recipes/create'>
          {isAdmin && <CreateRecipe />}
        </Route>
        <Route path='/admin/recipes/edit/:id'>
          {isAdmin && <CreateRecipe />}
        </Route>
        <Route path='/admin/recipes/overview/:id'>
          {isAdmin && <RecipeOverview />}
        </Route>
      </Switch>
    </ConnectedRouter>
  );
};

const mapState = (state: RootState) => ({
  authKey: getAuthKey(state),
  isAdmin: getIsAdmin(state),
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Router);
