import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'store';
import {
  fetchAllIngredients,
  fetchAllUnits,
  addIngredient,
  removeIngredient,
  swapIngredients,
  addStep,
  removeStep,
  swapSteps
} from 'store/recipeEditor/actions';
import { addMessage } from 'store/feedback/actions';
import Typography from '@material-ui/core/Typography';
import IngredientManager from './IngredientManager';
import StepsManager from './StepsManager';

const IngredientsSteps: FC<PropsFromRedux> = ({
  addIngredient,
  addMessage,
  addStep,
  fetchAllIngredients,
  fetchAllUnits,
  ingredients,
  recipeIngredients,
  recipeSteps,
  removeIngredient,
  removeStep,
  swapIngredients,
  swapSteps,
  units,
}) => {
  useEffect(() => {
    fetchAllIngredients();
    fetchAllUnits();
  }, [fetchAllIngredients, fetchAllUnits]);
  return (
    <>
      <Typography component="h2" variant="h3">Ingredients</Typography>
      <IngredientManager
        addIngredient={addIngredient}
        addMessage={addMessage}
        ingredients={ingredients}
        recipeIngredients={recipeIngredients}
        removeIngredient={removeIngredient}
        swapIngredients={swapIngredients}
        units={units}
        />
      <Typography component="h2" variant="h3">Steps</Typography>
      <StepsManager
        addStep={addStep}
        addMessage={addMessage}
        steps={recipeSteps}
        removeStep={removeStep}
        swapSteps={swapSteps}
      />
    </>
  );
};

const mapState = (state: RootState) => ({
  ingredients: state.recipeEditor.ingredients,
  recipeIngredients: state.recipeEditor.recipe.ingredients,
  recipeSteps: state.recipeEditor.recipe.steps,
  units: state.recipeEditor.units,
});

const mapDispatch = {
  addIngredient,
  addMessage,
  addStep,
  fetchAllIngredients,
  fetchAllUnits,
  removeIngredient,
  removeStep,
  swapIngredients,
  swapSteps
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(IngredientsSteps);
