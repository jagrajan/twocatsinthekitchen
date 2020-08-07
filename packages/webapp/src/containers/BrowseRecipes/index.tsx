import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Search } from '@material-ui/icons';
import { RootState } from '@twocats/store';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import React, { FC } from 'react';
import { ConnectedProps } from 'react-redux';
import { connect } from 'react-redux';
import RecipeGrid from '../../components/layout/RecipeGrid';
import LoadingStatus from '../../components/ui/LoadingStatus';
import { IMAGE_SERVER } from '../../config';
import { loadRecipesAsync } from '../../store/browse/actions';
import RecipeInfo from '../Home/RecipeInfo';
import { recipe_version } from '@prisma/client';

function filterRecipes(recipes: recipe_version[], text: string) {
  if (!text || text === '') {
    return recipes;
  }
  return recipes.filter(r => r.name?.toLowerCase().includes(text.toLowerCase()));
}

const BrowseRecipes: FC<PropsFromRedux> = ({ loading, loadRecipes, recipes }) => {
  const [searchText, setSearchText] = useState<string>('');
  useEffect(() => {
    loadRecipes();
  }, [loadRecipes])

  if (loading) {
    return <LoadingStatus/>;
  }

  return (
    <Container>
      <Box mb={2}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={e => setSearchText(e.target.value)}
          value={searchText}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}

        />
      </Box>
      <RecipeGrid>
        {filterRecipes(recipes, searchText).map(recipe =>
          <RecipeInfo
            key={recipe.id}
            name={recipe.name || ''}
            imageFile={`${IMAGE_SERVER}/${recipe.image_file || ''}`}
            slug={recipe.slug || ''}
            updateDate={moment(recipe.create_date)
              .format('MMMM Do YYYY, h:mm:ss a')}
          />
        )}
      </RecipeGrid>
    </Container>
  );
};

const mapState = (state: RootState) => ({
  loading: state.browse.loading,
  recipes: state.browse.recipes,
});

const mapDispatch = {
  loadRecipes: loadRecipesAsync.request,
};

const withConnect = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof withConnect>;

export default withConnect(BrowseRecipes);