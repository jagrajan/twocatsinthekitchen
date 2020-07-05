import Container from '@material-ui/core/Container';
import { RootState } from '@twocats/store';
import LoadingStatus from 'components/ui/LoadingStatus';
import NotesManager from './NotesManager';
import { createMatchSelector } from 'connected-react-router';
import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  loadNotesAsync,
  loadRecipeDetailsAsync,
  updateNotesAsync,
} from 'store/recipe/actions';
import { transformIngredient } from '../../components/RecipeCard/utils';
import RecipeRenderer from '../../components/RecipeRenderer';
import { IMAGE_SERVER} from 'config';

const Recipe: FC<PropsFromRedux> = ({
  loading,
  loadRecipeDetails,
  loadNotes,
  match,
  myNotes,
  recipe,
  scale,
  updateNotes,
  user,
}) => {
  const id = match?.params.id;
  useEffect(() => {
    if (id) {
      loadRecipeDetails(id);
    }
  }, [loadRecipeDetails, id])

  useEffect(() => {
    if (recipe && recipe.recipe_id && user) {
      loadNotes(recipe.recipe_id);
    }
  }, [loadNotes, recipe, user])

  const onUpdateNotes = (notes: string[]) => {
    if (recipe && recipe.recipe_id && user) {
      updateNotes({ id: recipe.recipe_id, notes });
      loadNotes(recipe.recipe_id);
    }
  };
  if (!recipe || loading) {
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
          instructions: x.instructions,
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
        {user && <NotesManager
          onSaveNotes={onUpdateNotes}
          serverNotes={myNotes}
        />}
      </Container>
    );
  }
};

const mapState = (state: RootState) => ({
  loading: state.recipe.isLoadingRecipePage || state.recipe.notesLoading,
  match: createMatchSelector<RootState, {id: string | undefined }>('/recipe/:id')(state),
  myNotes: state.recipe.notes.toArray(),
  recipe: state.recipe.recipe,
  scale: state.recipe.scale,
  user: state.auth.authKey,
});

const mapDispatch = {
  loadNotes: loadNotesAsync.request,
  loadRecipeDetails: loadRecipeDetailsAsync.request,
  updateNotes: updateNotesAsync.request,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Recipe);
