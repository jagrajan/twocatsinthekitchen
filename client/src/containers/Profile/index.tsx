import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'store';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const Profile: FC<PropsFromRedux> = ({ profile }) => {
  if (profile) {
    return(
      <Container maxWidth="sm">
        <Typography component="h1" variant="h4">My profile</Typography>
        <Box mt={4}>
          <Typography variant="body1">Name: </Typography>
          <Typography variant="body2">{profile.name}</Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="body1">Email: </Typography>
          <Typography variant="body2">{profile.email}</Typography>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="sm">
        <p>
          <Typography component="span" variant="body1">Please make sure you are logged in!</Typography>
        </p>
      </Container>
    );
  }
};

const mapState = (state: RootState) => ({
  profile: state.auth.profile,
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Profile);
