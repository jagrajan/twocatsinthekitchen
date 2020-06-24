import React, { FC, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';

interface Props {
  addStep: (step: string) => void;
  removeStep: (position: number) => void;
  steps: string[];
  swapSteps: (indices: [number, number]) => void;
}

const StepsManager: FC<Props> = ({
  addStep,
  removeStep,
  steps,
  swapSteps,
}) => {
  const inputRef = useRef<HTMLInputElement>();
  const onAddStep = () => {
    if (inputRef.current) {
      const text = inputRef.current.value;
      if (text === '') {
      } else {
        addStep(text);
        inputRef.current.value = '';
      }
    }
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <TextField
            inputRef={inputRef}
            label="Description"
            type="text"
            variant="outlined"
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
        data={steps.map((description, position) => ({ position, description }))}
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
                swapSteps([rowData[0].position - 1, rowData[0].position]);
              } else {
                swapSteps([rowData.position - 1, rowData.position]);
              }
            }
          },
          {
            icon: 'arrow_downward',
            tooltip: 'Move down',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swapSteps([rowData[0].position, rowData[0].position + 1]);
              } else {
                swapSteps([rowData.position, rowData.position + 1]);
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
