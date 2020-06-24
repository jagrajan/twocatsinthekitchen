import React, { FC, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@twocats/store';
import { getAuthKey, getIsAdmin } from 'store/auth/selectors';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
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

const Navigation: FC<PropsFromRedux> = ({ isAdmin, authKey }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const entries = NAVIGATION_ENTRIES.filter(e => {
    switch(e.view) {
      case AccessLevel.USERS:
        return authKey;
      case AccessLevel.UNREGISTERED:
        return !authKey;
      case AccessLevel.ADMINS:
        return isAdmin;
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
      <UndecoratedLink to={i.url} key={i.text}>
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
        <IconButton color="inherit" onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={"right"}
          onClick={() => setOpen(false)}
          open={open}
        >
          <List className={classes.navList}>{navButtonsMobile}</List>
        </Drawer>
      </div>
    </nav>
  );
};


const mapState = (state: RootState) => ({
  authKey: getAuthKey(state),
  isAdmin: getIsAdmin(state),
});

const mapDispatch = { };

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigation);
