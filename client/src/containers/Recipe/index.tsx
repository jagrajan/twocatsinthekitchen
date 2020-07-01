import Container from '@material-ui/core/Container';
import { RootState } from '@twocats/store';
import LoadingStatus from 'components/ui/LoadingStatus';
import { createMatchSelector } from 'connected-react-router';
import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loadRecipeDetailsAsync } from 'store/recipe/actions';
import { transformIngredient } from '../../components/RecipeCard/utils';
import RecipeRenderer from '../../components/RecipeRenderer';
import { IMAGE_SERVER} from 'config';

const Recipe: FC<PropsFromRedux> = ({
  loadRecipeDetails,
  match,
  recipe,
  scale,
}) => {
  const id = match?.params.id;
  useEffect(() => {
    if (id) {
      loadRecipeDetails(id);
    }
  }, [loadRecipeDetails, id])
  if (!recipe) {
    return <LoadingStatus />;
  } else {
    const ingredients = recipe.measured_ingredient
      .map((x, position) => ({
        position,
        text: transformIngredient({
          ingredient: x.ingredient,
          unit: x.unit,
          maxAmount: x.max_amount,
          minAmount: x.min_amount,
          alternativeMeasurement: x.alternative_measurement.map(a => ({
            maxAmount: a.max_amount,
            minAmount: a.min_amount,
            unit: a.unit,
          })),
        }, scale),
      }));
    const notes = recipe.recipe_note.map((x, position) => ({
      position,
      ...x
    }));
    const steps = recipe.recipe_step.map((x, position) => ({
      position,
      text: x.description,
    }));
    return (
      <Container>
        <RecipeRenderer
          cookTime={recipe.cook_time || ''}
          imageUrl={`${IMAGE_SERVER}/${recipe.image_file}` || ''}
          ingredients={ingredients}
          introduction={recipe.introduction || ''}
          name={recipe.name || ''}
          notes={notes}
          prepTime={recipe.prep_time || ''}
          scale={scale}
          servings={(recipe.serves && (recipe.serves * scale).toString()) || ''}
          steps={steps}
        />
      </Container>
    );
  }
};

const mapState = (state: RootState) => ({
  match: createMatchSelector<RootState, {id: string | undefined }>('/recipe/:id')(state),
  recipe: state.recipe.recipe,
  scale: state.recipe.scale,
});

const mapDispatch = {
  loadRecipeDetails: loadRecipeDetailsAsync.request,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Recipe);
