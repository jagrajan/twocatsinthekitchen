import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FormSubmitHandler  } from 'redux-form';
import { RootState } from '@twocats/store';
import { loginAsync } from 'store/auth/actions';
import { LoginPayload  } from 'services/api/api-auth';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';

const useStyles = makeStyles(() => ({
  padCenter: {
    padding: '2rem',
    textAlign: 'center',
  },
}));

const LoginContainer: FC<PropsFromRedux> = ({ authKey, login }) => {
  const classes = useStyles();

  const onSubmit: FormSubmitHandler = (values: { [key: string]: string }) => {
    login(values as LoginPayload);
  };

  return (
    <Container maxWidth="xs">
      {authKey && <Redirect to="/" />}
      <div className={classes.padCenter}>
        <Typography component="h1" variant="h4">Log in</Typography>
      </div>
      <LoginForm onSubmit={onSubmit} />
      <div className={classes.padCenter}>
        <Link component={RouterLink} color="primary" to="/register" >
          Create an account
        </Link>
      </div>
    </Container>
  );
}

const mapState = (state: RootState) => ({
  authKey: state.auth.authKey,
});

const mapDispatch = {
  login: loginAsync.request
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoginContainer);
