import React, { FC, useEffect } from 'react';
import ThemeProvider from 'components/ThemeProvider';
import Router from 'components/Router';
import { loadJWTAsync } from 'store/auth/actions';
import { connect, ConnectedProps } from 'react-redux';
import './App.css';

const App: FC<PropsFromRedux> = ({ loadJWT }) => {
  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

const mapDispatch = {
  loadJWT: loadJWTAsync.request,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
