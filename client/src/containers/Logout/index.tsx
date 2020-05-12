import React, { FC, Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from 'store';
import { addMessage } from 'store/feedback/actions';
import { logoutUser } from 'store/auth/actions';

const Logout: FC<PropsFromRedux> = ({ addMessage, authKey, logoutUser }) => {
  logoutUser();
  if (!authKey) {
    addMessage({
      key: 'logout',
      color: 'success',
      message: 'You have been logged out',
    });
  }
  return (
    <Fragment>
      {authKey === undefined && <Redirect to="/" />}
      <p>You are being logged out. You will be redirected once you have been logged out.</p>
    </Fragment>
  );
};

const mapState = (state: RootState) => ({
  authKey: state.auth.key
});

const mapDispatch = {
  addMessage,
  logoutUser
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Logout);
