import Typography from '@material-ui/core/Typography';
import { RootState } from '@twocats/store';
import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  addIngredient,
  addStep,
  loadAllIngredientsAsync,
  loadAllUnitsAsync,
  removeIngredient,
  removeStep,
  setIngredients,
  setSteps,
  swapIngredients,
  swapSteps
} from 'store/recipeEditor/actions';
import IngredientManager from './IngredientManager';
import StepsManager from './StepsManager';

const IngredientsSteps: FC<PropsFromRedux> = ({
  addIngredient,
  addStep,
  creatingIngredient,
  creatingUnit,
  loadAllIngredients,
  loadAllUnits,
  ingredients,
  recipeIngredients,
  recipeSteps,
  removeIngredient,
  removeStep,
  setIngredients,
  setSteps,
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
        creatingIngredient={creatingIngredient}
        creatingUnit={creatingUnit}
        ingredients={ingredients}
        recipeIngredients={recipeIngredients.toArray()}
        removeIngredient={removeIngredient}
        setIngredients={setIngredients}
        swapIngredients={swapIngredients}
        units={units}
        />
      <Typography component="h2" variant="h3">Steps</Typography>
      <StepsManager
        addStep={addStep}
        steps={recipeSteps.toArray()}
        removeStep={removeStep}
        setSteps={setSteps}
        swapSteps={swapSteps}
      />
    </>
  );
};

const mapState = (state: RootState) => ({
  creatingIngredient: state.recipeEditor.creatingIngredient,
  creatingUnit: state.recipeEditor.creatingUnit,
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
  setIngredients,
  setSteps,
  swapIngredients,
  swapSteps
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(IngredientsSteps);
