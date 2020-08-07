import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1.5rem',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
}));

const RecipeGrid: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>{children}</div>
  );
};

export default RecipeGrid;