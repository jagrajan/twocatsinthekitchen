import React, { FC, useState, ChangeEvent } from 'react';
import { MeasuredIngredient } from 'store/recipeEditor/actions';
// import { unit, ingredient } from '@twocats/server/node_modules/@prisma/client';
import { Unit as unit, Ingredient as ingredient } from 'store/recipeEditor/actions';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// type unit = {
//   id: number;
//   name: string | null;
//   plural: string | null;
//   create_date: Date;
//   last_update: Date;
// };

// type ingredient = {
//   id: number;
//   name: string;
//   plural: string | null;
//   category: number | null;
//   unit: number | null;
//   create_date: Date;
//   last_update: Date;
// };

interface Props {
  addIngredient: (ingredient: MeasuredIngredient) => void;
  ingredients: ingredient[];
  recipeIngredients: MeasuredIngredient[];
  removeIngredient: (position: number) => void;
  swapIngredients: (indices: [number, number]) => void;
  units: unit[];
}

const IngredientManager: FC<Props> = ({
  addIngredient,
  ingredients,
  recipeIngredients,
  removeIngredient,
  swapIngredients,
  units,
}) => {
  const [ amount, setAmount ] = useState('');
  const [ unit, setUnit ] = useState<unit | null>(null);
  const [ ingredient, setIngredient ] = useState<ingredient | null>(null);

  const onAddIngredient = () => {
    const re = /^\d+((\/\d+)|\.\d+)?(-\d+(\/\d+)?)?$/;
    if (unit === null || ingredient === null) {
    } else if (re.test(amount) || amount === '') {
      let minAmount = amount;
      let maxAmount = amount;
      if (amount.toString().includes('-')) {
        const splits = amount.split('-');
        minAmount = splits[0];
        maxAmount = splits[1];
      }
      addIngredient({
        unit,
        ingredient,
        minAmount,
        maxAmount,
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
            onChange={(e: ChangeEvent<{}>, val: ingredient | null) => setIngredient(val)}
            value={ingredient}
            renderInput={(params) => <TextField {...params} label="Ingredient" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            id="combo-box-unit"
            options={units}
            getOptionLabel={(option) => (option.name === '' ? '-' : option.name || '')}
            onChange={(e: ChangeEvent<{}>, val: unit | null) => setUnit(val)}
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
          { title: "Min Amount", field: "minAmount"  },
          { title: "Max Amount", field: "maxAmount"  },
          { title: "Ingredient", field: "ingredient.name" },
          { title: "Unit", field: "unit.name" },
        ]}
        data={recipeIngredients.map((val, position) => ({...val, position}))}
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
                swapIngredients([rowData[0].position - 1, rowData[0].position]);
              } else {
                swapIngredients([rowData.position - 1, rowData.position]);
              }
            }
          },
          {
            icon: 'arrow_downward',
            tooltip: 'Move down',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swapIngredients([rowData[0].position, rowData[0].position + 1]);
              } else {
                swapIngredients([rowData.position, rowData.position + 1]);
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
