import React, { FC } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import RecipeInfo from './RecipeInfo';
import { RecipeShortInformation } from 'store/recipe/types';
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
  recentRecipes: Array<RecipeShortInformation>;
}

const RecentRecipes: FC<Props> = ({ recentRecipes }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {recentRecipes.map(recipe =>
        <RecipeInfo
          key={recipe.info.id}
          name={recipe.info.name}
          imageFile={`${IMAGE_SERVER}/${recipe.info.image_file}`}
          slug={recipe.metadata.slug}
          updateDate={moment(recipe.info.last_update)
            .format('MMMM Do YYYY, h:mm:ss a')}
        />
      )}
    </div>
  );
};

export default RecentRecipes;
