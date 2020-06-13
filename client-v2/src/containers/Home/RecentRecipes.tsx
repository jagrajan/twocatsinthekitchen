import React, { FC } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import RecipeInfo from './RecipeInfo';
import { RecipeWithVersion } from 'services/api/api-recipe';
import { IMAGE_SERVER } from 'config';

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

type Props = {
  recentRecipes: RecipeWithVersion[];
}

const RecentRecipes: FC<Props> = ({ recentRecipes }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {recentRecipes.map(recipe =>
        <RecipeInfo
          key={recipe.id}
          name={recipe.recipe_version[0].name || ''}
          imageFile={`${IMAGE_SERVER}/${recipe.recipe_version[0].image_file || ''}`}
          slug={recipe.slug || ''}
          updateDate={moment(recipe.last_update)
            .format('MMMM Do YYYY, h:mm:ss a')}
        />
      )}
    </div>
  );
};

export default RecentRecipes;
