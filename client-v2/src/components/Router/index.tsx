import React, { FC } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@twocats/store';
import { getAuthKey, getIsAdmin } from 'store/auth/selectors';

import AdminDashboard from 'containers/Admin';
import AdminRecipes from 'containers/Admin/Recipes';
import CreateRecipe from 'containers/Admin/Recipes/CreateRecipe';

import Header from 'components/layout/Header';
import Home from 'containers/Home';
import Login from 'containers/Login';
import Logout from 'containers/Logout';

const Router: FC<PropsFromRedux> = ({ authKey, isAdmin, children }) => {
  return (
    <BrowserRouter>
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
        <Route exact path='/admin'>
          {isAdmin && <AdminDashboard />}
        </Route>
        <Route exact path='/admin/recipes'>
          {isAdmin && <AdminRecipes />}
        </Route>
        <Route exact path='/admin/recipes/create'>
          {isAdmin && <CreateRecipe />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapState = (state: RootState) => ({
  authKey: getAuthKey(state),
  isAdmin: getIsAdmin(state),
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Router);
