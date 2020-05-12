import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Container from '@material-ui/core/Container';
import { RootState } from 'store';
import { fetchRecentRecipes } from 'store/recipe/actions';
import RecentRecipes from './RecentRecipes';

class Home extends Component<PropsFromRedux> {
  componentDidMount() {
    this.props.fetchRecentRecipes();
  }

  render() {
    const { recentRecipes } = this.props;
    return (
      <Container>
        {recentRecipes && <RecentRecipes recentRecipes={recentRecipes} />}
      </Container>
    );
  }
}

const mapState = (state: RootState) => ({
  recentRecipes: state.recipe.recentRecipes
});

const mapDispatch = {
  fetchRecentRecipes
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);
