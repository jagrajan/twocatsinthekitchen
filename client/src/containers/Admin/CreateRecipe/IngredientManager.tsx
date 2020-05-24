import React, { FC, useState, ChangeEvent } from 'react';
import { Ingredient, RecipeIngredient, Unit } from 'store/recipeEditor/types';
import { FeedbackMessage } from 'store/feedback/types';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  addIngredient: (ingredient: RecipeIngredient) => void;
  addMessage: (message: FeedbackMessage) => void;
  ingredients: Ingredient[];
  recipeIngredients: RecipeIngredient[];
  removeIngredient: (position: number) => void;
  swapIngredients: (a: number, b: number) => void;
  units: Unit[];
}

const IngredientManager: FC<Props> = ({
  addIngredient,
  addMessage,
  ingredients,
  recipeIngredients,
  removeIngredient,
  swapIngredients,
  units,
}) => {
  const [ amount, setAmount ] = useState('');
  const [ unit, setUnit ] = useState<Unit | null>(null);
  const [ ingredient, setIngredient ] = useState<Ingredient | null>(null);

  const onAddIngredient = () => {
    if (unit === null || ingredient === null) {
      addMessage({
        color: 'error',
        key: 'add-ingredient-error',
        message: 'You need a unit and an ingredient'
      });
    } else {
      addIngredient({
        unit,
        ingredient,
        amount,
        position: -1
      });
      setAmount('');
      setUnit(null);
      setIngredient(null);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            id="combo-box-ingredient"
            options={ingredients}
            getOptionLabel={(option) => option.name}
            onChange={(e: ChangeEvent<{}>, val: Ingredient | null) => setIngredient(val)}
            value={ingredient}
            renderInput={(params) => <TextField {...params} label="Ingredient" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            id="combo-box-unit"
            options={units}
            getOptionLabel={(option) => (option.name === '' ? '-' : option.name)}
            onChange={(e: ChangeEvent<{}>, val: Unit | null) => setUnit(val)}
            value={unit}
            renderInput={(params) => <TextField {...params} label="Unit" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Amount"
            type="text"
            variant="outlined"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            style={{ height: '100%' }}
            size="large"
            color="primary"
            variant="contained"
            fullWidth
            onClick={onAddIngredient}
          >
            Add Ingredient
          </Button>
        </Grid>
      </Grid>
      <MaterialTable
         columns={[
          { title: "Position", field: "position", type: 'numeric' },
          { title: "Amount", field: "amount"  },
          { title: "Ingredient", field: "ingredient.name" },
          { title: "Unit", field: "unit.name" },
        ]}
        data={recipeIngredients}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete Ingredient',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                removeIngredient(rowData[0].position);
              } else {
                removeIngredient(rowData.position);
              }
            }
          },
          {
            icon: 'arrow_upward',
            tooltip: 'Move up',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swapIngredients(rowData[0].position - 1, rowData[0].position);
              } else {
                swapIngredients(rowData.position - 1, rowData.position);
              }
            }
          },
          {
            icon: 'arrow_downward',
            tooltip: 'Move down',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swapIngredients(rowData[0].position, rowData[0].position + 1);
              } else {
                swapIngredients(rowData.position, rowData.position + 1);
              }
            }
          }
        ]}
        title="Ingredients"
      />
    </>
  );
}

export default IngredientManager;
