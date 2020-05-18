import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { RootState } from 'store';
import { fetchRecipeDetails } from 'store/recipe/actions';
import RecipeCard from './RecipeCard';
import { IMAGE_SERVER } from 'config';

type Props = PropsFromRedux
  & RouteComponentProps<{ id: string }>;

const RecipeDetails: FC<Props> = ({ fetchRecipeDetails, match, recipeDetails }) => {
  useEffect(() => {
    fetchRecipeDetails(match.params.id);
  }, [fetchRecipeDetails, match.params.id]);
  if (!recipeDetails) {
    return (
      <Container>Loading...</Container>
    );
  } else {
    return (
      <Container>
        <Typography variant="h3" component="h1">
          {recipeDetails.info.name}
        </Typography>
        <Container maxWidth="md">
          <RecipeCard
            imageUrl={`${IMAGE_SERVER}/${recipeDetails.info.image_file}`}
            ingredients={recipeDetails.ingredients}
            name={recipeDetails.info.name}
            steps={recipeDetails.steps}
          />
        </Container>
      </Container>
    );
  }
};

const mapState = (state: RootState) => ({
  recipeDetails: state.recipe.recipeDetails
});

const mapDispatch = {
  fetchRecipeDetails
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(RecipeDetails));
