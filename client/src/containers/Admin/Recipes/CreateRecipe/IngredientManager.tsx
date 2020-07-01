import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useNotification from 'hooks/useNotification';
import MaterialTable from 'material-table';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import {
  Ingredient as ingredient,
  MeasuredIngredient,
  Unit as unit,
} from 'store/recipeEditor/actions';
import CreateIngredientDialog from './CreateIngredientDialog';
import CreateUnitDialog from './CreateUnitDialog';
import { List } from 'immutable';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';

interface Props {
  addIngredient: (ingredient: MeasuredIngredient) => void;
  creatingIngredient: boolean;
  creatingUnit: boolean;
  ingredients: ingredient[];
  recipeIngredients: MeasuredIngredient[];
  removeIngredient: (position: number) => void;
  setIngredients: (ingredients: MeasuredIngredient[]) => void;
  swapIngredients: (indices: [number, number]) => void;
  units: unit[];
}

const IngredientManager: FC<Props> = ({
  addIngredient,
  creatingIngredient,
  creatingUnit,
  ingredients,
  recipeIngredients,
  removeIngredient,
  setIngredients,
  swapIngredients,
  units,
}) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const alternativeAmountRef = useRef<HTMLInputElement>(null);
  const [unit, setUnit] = useState<unit | null>(null);
  const [alternativeUnit, setAlternativeUnit] = useState<unit | null>(null);
  const [ingredient, setIngredient] = useState<ingredient | null>(null);
  const [ingredientModalOpen, setIngredientModalOpen] = useState<boolean>(
    false
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editPosition, setEditPosition] = useState<number>(0);
  const [unitModalOpen, setUnitModalOpen] = useState<boolean>(false);
  const [alternativeMeasurement, setAlternativeMeasurement] = useState<
    List<{
      maxAmount: string;
      minAmount: string;
      unit: unit;
    }>
  >(List());
  const notification = useNotification();
  useEffect(() => {
    setIngredientModalOpen(creatingIngredient);
  }, [creatingIngredient]);
  useEffect(() => {
    setUnitModalOpen(creatingUnit);
  }, [creatingUnit]);

  const onAddAlternativeMeasurement = () => {
    const re = /^\d+((\/\d+)|\.\d+)?(-\d+(\/\d+)?)?$/;
    const amount = alternativeAmountRef.current?.value;
    if (alternativeUnit === null) {
      notification({
        key: 'add-alternative-measurement-error',
        color: 'error',
        message: 'Please specify an ingredient and unit',
      });
    } else if (amount && (re.test(amount) || amount === '')) {
      let minAmount = amount;
      let maxAmount = amount;
      if (amount.toString().includes('-')) {
        const splits = amount.split('-');
        minAmount = splits[0];
        maxAmount = splits[1];
      }
      setAlternativeMeasurement(
        alternativeMeasurement.push({
          maxAmount,
          minAmount,
          unit: alternativeUnit,
        })
      );
      setAlternativeUnit(null);
      if (alternativeAmountRef.current) {
        alternativeAmountRef.current.value = '';
      }
    }
  };

  const onDeleteAlternative = (position: number) => {
    setAlternativeMeasurement(alternativeMeasurement.delete(position));
  };

  const onAddIngredient = () => {
    const re = /^\d+((\/\d+)|\.\d+)?(-\d+(\/\d+)?)?$/;
    const amount = amountRef.current?.value;
    if (unit === null || ingredient === null) {
      notification({
        key: 'add-ingredient-error',
        color: 'error',
        message: 'Please specify an ingredient and unit',
      });
    } else if (amount === '' && (amount && re.test(amount))) {
      let minAmount = amount;
      let maxAmount = amount;
      if (amount.toString().includes('-')) {
        const splits = amount.split('-');
        minAmount = splits[0];
        maxAmount = splits[1];
      }
      const newIng = {
        alternativeMeasurement: alternativeMeasurement.toArray(),
        ingredient,
        maxAmount,
        minAmount,
        unit,
      };
      if (editMode) {
        setIngredients(List(recipeIngredients).set(editPosition, newIng).toArray());
        setEditMode(false);
      } else {
        addIngredient(newIng);
      }
      setUnit(null);
      setIngredient(null);
      setAlternativeMeasurement(List());
      if (amountRef.current) {
        amountRef.current.value = '';
      }
    }
  };

  return (
    <>
      <CreateIngredientDialog
        open={ingredientModalOpen}
        onClose={() => setIngredientModalOpen(false)}
      />
      <CreateUnitDialog
        open={unitModalOpen}
        onClose={() => setUnitModalOpen(false)}
      />
      <Grid container spacing={2}>
        <Grid item xs={9} md={4}>
          <Autocomplete
            id="combo-box-ingredient"
            options={ingredients}
            getOptionLabel={(option) => option.name}
            onChange={(e: ChangeEvent<{}>, val: ingredient | null) =>
              setIngredient(val)
            }
            value={ingredient}
            renderInput={(params) => (
              <TextField {...params} label="Ingredient" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={3} md={2}>
          <Button
            style={{ height: '100%' }}
            size="large"
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => setIngredientModalOpen(true)}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={9} md={4}>
          <Autocomplete
            id="combo-box-unit"
            options={units}
            getOptionLabel={(option) =>
              option.name === '' ? '-' : option.name || ''
            }
            onChange={(e, val: unit | null) => setUnit(val)}
            value={unit}
            renderInput={(params) => (
              <TextField {...params} label="Unit" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={3} md={2}>
          <Button
            style={{ height: '100%' }}
            size="large"
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => setUnitModalOpen(true)}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            inputRef={amountRef}
            label="Amount"
            type="text"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h3" variant="h5">
            Alternative Measurements
          </Typography>
          {alternativeMeasurement.toArray().map((a, position) => (
            <Box
              p={2}
              my={2}
              bgcolor="#e6e8e7"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1">
                {a.minAmount} to {a.maxAmount} {a.unit.name}
              </Typography>
              <IconButton onClick={() => onDeleteAlternative(position)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            inputRef={alternativeAmountRef}
            label="Amount"
            type="text"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Autocomplete
            id="combo-box-unit-alternative"
            options={units}
            getOptionLabel={(option) =>
              option.name === '' ? '-' : option.name || ''
            }
            onChange={(_, val) => setAlternativeUnit(val)}
            value={alternativeUnit}
            renderInput={(params) => (
              <TextField {...params} label="Unit" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            style={{ height: '100%' }}
            size="large"
            color="secondary"
            variant="contained"
            fullWidth
            onClick={onAddAlternativeMeasurement}
          >
            Add Alternative
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{ height: '100%', fontSize: '130%' }}
            size="large"
            color="primary"
            variant="contained"
            fullWidth
            onClick={onAddIngredient}
            endIcon={<Add />}
          >
            {editMode ? 'Update' : 'Add'}
          </Button>
        </Grid>
      </Grid>
      <MaterialTable
        columns={[
          { title: 'Position', field: 'position', type: 'numeric' },
          { title: 'Min Amount', field: 'minAmount' },
          { title: 'Max Amount', field: 'maxAmount' },
          { title: 'Ingredient', field: 'ingredient.name' },
          { title: 'Unit', field: 'unit.name' },
        ]}
        data={recipeIngredients.map((val, position) => ({ ...val, position }))}
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
            },
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
            },
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
            },
          },
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => {
              const ing = Array.isArray(rowData)
                ? rowData[0]
                : rowData;
              setEditMode(true);
              setEditPosition(ing.position);
              setUnit(ing.unit);
              setIngredient(ing.ingredient);
              if (amountRef.current) {
                amountRef.current.value = ing.minAmount + '-' + ing.maxAmount;
              }
              setAlternativeMeasurement(List(ing.alternativeMeasurement));
            },
          },
        ]}
        title="Ingredients"
      />
    </>
  );
};

export default IngredientManager;
