import { recipe_version } from '@prisma/client';
import { IMAGE_SERVER } from 'config';
import moment from 'moment';
import React, { FC } from 'react';
import RecipeGrid from '../../components/layout/RecipeGrid';
import RecipeInfo from './RecipeInfo';

type Props = {
  recentRecipes: recipe_version[];
}

const RecentRecipes: FC<Props> = ({ recentRecipes }) => {
  return (
    <RecipeGrid>
      {recentRecipes.map(recipe =>
        <RecipeInfo
          key={recipe.id}
          name={recipe.name || ''}
          imageFile={`${IMAGE_SERVER}/${recipe.image_file || ''}`}
          slug={recipe.slug || ''}
          updateDate={moment(recipe.last_update)
            .format('MMMM Do YYYY, h:mm:ss a')}
        />
      )}
    </RecipeGrid>
  );
};

export default RecentRecipes;
