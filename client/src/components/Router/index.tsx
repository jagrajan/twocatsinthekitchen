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
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
