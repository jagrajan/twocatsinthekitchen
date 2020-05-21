import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { RootState } from 'store';
import { showNav, hideNav } from 'store/navigation/actions';
import UndecoratedLink from 'components/UndecoratedLink';
import { NAVIGATION_ENTRIES, AccessLevel } from 'config/navigation';

const useStyles = makeStyles(theme => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navButton: {
    padding: '1rem 2rem',
  },
  navList: {
    minWidth: '20rem',
  },
}));

const Navigation: FC<PropsFromRedux> = ({ authKey, hideNav, open, showNav }) => {
  const classes = useStyles();

  const entries = NAVIGATION_ENTRIES.filter(e => {
    switch(e.view) {
      case AccessLevel.USERS:
        return authKey !== undefined && authKey !== null;
      case AccessLevel.UNREGISTERED:
        return authKey === undefined || authKey === null;
      case AccessLevel.ADMINS:
        return authKey !== undefined && authKey !== null && authKey.admin;
      case AccessLevel.EVERYONE:
        return true;
    }
    return false;
  });

  const navButtonsDesktop = entries.map(i => {
    return (
      <UndecoratedLink to={i.url} key={i.text}>
        <Button
          className={classes.navButton}
          color="inherit"
        >
          {i.text}
        </Button>
      </UndecoratedLink>
    );
  });

  const navButtonsMobile = entries.map(i => {
    return (
      <UndecoratedLink to={i.url} key={i.text} onClick={() => hideNav()}>
        <ListItem>{i.text}</ListItem>
      </UndecoratedLink>
    );
  });

  return (
    <nav>
      <div className={classes.sectionDesktop}>
        {navButtonsDesktop}
      </div>
      <div className={classes.sectionMobile}>
        <IconButton onClick={() => showNav()} color="inherit">
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={"right"}
          onClose={() => hideNav()}
          open={open}
        >
          <List className={classes.navList}>{navButtonsMobile}</List>
        </Drawer>
      </div>
    </nav>
  );
};

const mapState = (state: RootState) => ({
  authKey: state.auth.info,
  open: state.navigation.showNav
});

const mapDispatch = {
  showNav,
  hideNav
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigation);
