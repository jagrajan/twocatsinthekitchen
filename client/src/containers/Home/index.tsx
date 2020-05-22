import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Container from '@material-ui/core/Container';
import { RootState } from 'store';
import { fetchRecentRecipes } from 'store/recipe/actions';
import RecentRecipes from './RecentRecipes';

const Home: FC<PropsFromRedux> = ({ fetchRecentRecipes, recentRecipes }) => {
  useEffect(() => {
    fetchRecentRecipes();
  }, [fetchRecentRecipes]);
  if (recentRecipes) {
    return (
      <Container>
        <RecentRecipes recentRecipes={recentRecipes} />}
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
  fetchRecentRecipes
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);
