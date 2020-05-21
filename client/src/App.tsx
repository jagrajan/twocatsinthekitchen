import React, { FC, useEffect }  from 'react';
import Router from './components/Router';
import { connect, ConnectedProps } from 'react-redux';
import { fetchProfile, validateKey } from 'store/auth/actions';
import { RootState } from 'store';
import ThemeProvider from './components/ThemeProvider';
import NotificationsManager from './containers/NotificationManager';

const App: FC<PropsFromRedux> = ({ fetchProfile, key, validateKey }) => {
  useEffect(() => {
    validateKey();
  }, [validateKey]);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile, key]);

  return (
    <ThemeProvider>
      <NotificationsManager>
        <Router />
      </NotificationsManager>
    </ThemeProvider>
  );
}

const mapState = (state: RootState) => ({
  key: state.auth.key
});

const mapDispatch = {
  fetchProfile,
  validateKey
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
