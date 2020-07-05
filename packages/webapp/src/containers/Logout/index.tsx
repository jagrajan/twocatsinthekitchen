import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '@twocats/store';
import { logoutAsync } from 'store/auth/actions';

const Logout: FC<PropsFromRedux> = ({ authKey, logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);
  return <>
    {!authKey && <Redirect to="/" />}
  </>;
};

const mapState = (state: RootState) => ({
  authKey: state.auth.authKey,
});

const mapDispatch = {
  logout: logoutAsync.request
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Logout);
