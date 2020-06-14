import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@twocats/store';
import {
  loadAllIngredientsAsync,
  loadAllUnitsAsync,
  addIngredient,
  removeIngredient,
  swapIngredients,
  addStep,
  removeStep,
  swapSteps
} from 'store/recipeEditor/actions';
import Typography from '@material-ui/core/Typography';
import IngredientManager from './IngredientManager';
import StepsManager from './StepsManager';

const IngredientsSteps: FC<PropsFromRedux> = ({
  addIngredient,
  addStep,
  loadAllIngredients,
  loadAllUnits,
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
    loadAllUnits();
    loadAllIngredients();
  }, [loadAllUnits, loadAllIngredients]);
  return (
    <>
      <Typography component="h2" variant="h3">Ingredients</Typography>
      <IngredientManager
        addIngredient={addIngredient}
        ingredients={ingredients}
        recipeIngredients={recipeIngredients.toArray()}
        removeIngredient={removeIngredient}
        swapIngredients={swapIngredients}
        units={units}
        />
      <Typography component="h2" variant="h3">Steps</Typography>
      <StepsManager
        addStep={addStep}
        steps={recipeSteps.toArray()}
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
  addStep,
  loadAllIngredients: loadAllIngredientsAsync.request,
  loadAllUnits: loadAllUnitsAsync.request,
  removeIngredient,
  removeStep,
  swapIngredients,
  swapSteps
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(IngredientsSteps);
