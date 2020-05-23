import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'store';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// Admin related containers
import Admin from 'containers/Admin';
import AdminRecipes from 'containers/Admin/Recipes';
import CreateRecipe from 'containers/Admin/CreateRecipe';

import Header from 'components/layout/Header';
import Home from 'containers/Home';
import LoginContainer from 'containers/Login';
import Logout from 'containers/Logout';
import Profile from 'containers/Profile';
import Recipe from 'containers/Recipe';

const Router: FC<PropsFromRedux> = ({ authInfo, children }) => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginContainer />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/recipe/:id">
          <Recipe />
        </Route>
        <Route exact path="/profile">
          {authInfo && <Profile />}
        </Route>
        <Route exact path="/admin">
          {authInfo && authInfo.admin && <Admin />}
        </Route>
        <Route exact path="/admin/recipes">
          {authInfo && authInfo.admin && <AdminRecipes />}
        </Route>
        <Route exact path="/admin/create-recipe">
          {authInfo && authInfo.admin && <CreateRecipe />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapState = (state: RootState) => ({
  authInfo: state.auth.info
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Router);
