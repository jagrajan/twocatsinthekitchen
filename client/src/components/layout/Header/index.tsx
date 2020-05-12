import React, { FC, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Navigation from './Navigation';
import UndecoratedLink from 'components/UndecoratedLink';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  clear: {
    height: '4rem',
  },
}));

const Header: FC = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar>
        <Container>
          <ToolBar>
            <UndecoratedLink to="/" className={classes.title}>
              <Typography variant="h6">
                Two Cats in the Kitchen
              </Typography>
            </UndecoratedLink>
            <Navigation />
          </ToolBar>
        </Container>
      </AppBar>
      <div className={classes.clear} />
    </Fragment>
  );
};

export default Header;
