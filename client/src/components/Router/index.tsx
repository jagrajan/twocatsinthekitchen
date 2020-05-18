import React, { FC } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Header from 'components/layout/Header';
import Home from 'containers/Home';
import LoginContainer from 'containers/Login';
import Logout from 'containers/Logout';
import Recipe from 'containers/Recipe';

const Router: FC = ({ children }) => {
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
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
