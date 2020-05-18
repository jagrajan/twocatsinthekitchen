import React, { FC, useEffect }  from 'react';
import Router from './components/Router';
import { connect, ConnectedProps } from 'react-redux';
import { validateKey } from 'store/auth/actions';
import ThemeProvider from './components/ThemeProvider';
import NotificationsManager from './containers/NotificationManager';

const App: FC<PropsFromRedux> = ({ validateKey }) => {
  useEffect(() => {
    validateKey();
  }, [validateKey]);
  return (
    <ThemeProvider>
      <NotificationsManager>
        <Router />
      </NotificationsManager>
    </ThemeProvider>
  );
}

const mapState = null;

const mapDispatch = {
  validateKey
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
