import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Container from '@material-ui/core/Container';
import { RootState } from '@twocats/store';
import { loadRecentRecipesAsync } from 'store/recipe/actions';
import RecentRecipes from './RecentRecipes';

const Home: FC<PropsFromRedux> = ({ loadRecentRecipe, recentRecipes }) => {
  useEffect(() => {
    loadRecentRecipe();
  }, [loadRecentRecipe]);
  if (recentRecipes) {
    return (
      <Container>
        <RecentRecipes recentRecipes={recentRecipes} />
      </Container>
     );
  } else {
    return <Container>Fetching recipes...</Container>;
  }
};

const mapState = (state: RootState) => ({
  recentRecipes: state.recipe.recentRecipes
});

const mapDispatch = {
  loadRecentRecipe: loadRecentRecipesAsync.request,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);
