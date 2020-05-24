import React, { FC, useState, ChangeEvent } from 'react';
import { RecipeStep } from 'store/recipeEditor/types';
import { FeedbackMessage } from 'store/feedback/types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';

interface Props {
  addStep: (step: RecipeStep) => void;
  addMessage: (message: FeedbackMessage) => void;
  removeStep: (position: number) => void;
  steps: RecipeStep[];
  swapSteps: (a: number, b: number) => void;
}

const StepsManager: FC<Props> = ({
  addMessage,
  addStep,
  removeStep,
  steps,
  swapSteps,
}) => {
  const [ text, setText ] = useState('');
  const onAddStep = () => {
    if (text === '') {
      addMessage({
        color: 'error',
        key: 'add-step-error',
        message: 'A step cannot be blank',
      });
    } else {
      addStep({
        position: -1,
        description: text,
      });
      setText('');
    }
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <TextField
            label="Description"
            type="text"
            variant="outlined"
            value={text}
            onChange={e => setText(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            style={{ height: '100%' }}
            size="large"
            color="primary"
            variant="contained"
            fullWidth
            onClick={onAddStep}
          >
            Add Step
          </Button>
        </Grid>
      </Grid>
      <MaterialTable
         columns={[
          { title: "Position", field: "position", type: 'numeric' },
          { title: "Description", field: "description"  },
        ]}
        data={steps}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete step',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                removeStep(rowData[0].position);
              } else {
                removeStep(rowData.position);
              }
            }
          },
          {
            icon: 'arrow_upward',
            tooltip: 'Move up',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swapSteps(rowData[0].position - 1, rowData[0].position);
              } else {
                swapSteps(rowData.position - 1, rowData.position);
              }
            }
          },
          {
            icon: 'arrow_downward',
            tooltip: 'Move down',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swapSteps(rowData[0].position, rowData[0].position + 1);
              } else {
                swapSteps(rowData.position, rowData.position + 1);
              }
            }
          }
        ]}
        title="Steps"
      />
    </>
  );
};

export default StepsManager;
