import React, { FC, useEffect } from 'react';
import ThemeProvider from 'components/ThemeProvider';
import Router from 'components/Router';
import { loadJWTAsync } from 'store/auth/actions';
import { RootState } from '@twocats/store';
import { connect, ConnectedProps } from 'react-redux';

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

const mapState = (state: RootState) => ({
});

const mapDispatch = {
  loadJWT: loadJWTAsync.request,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
