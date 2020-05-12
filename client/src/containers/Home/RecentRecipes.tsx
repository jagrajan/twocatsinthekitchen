import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RecipeShortInformation } from 'store/recipe/types';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr'
    }
  }
}));

type Props = {
  recentRecipes: Array<RecipeShortInformation>;
}

const RecentRecipes: FC<Props> = ({ recentRecipes }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <p>This is a something</p>
    {recentRecipes.map(recipe => <div>
    {recipe.info.name}
    </div>)}
    </div>
  );
};

export default RecentRecipes;
