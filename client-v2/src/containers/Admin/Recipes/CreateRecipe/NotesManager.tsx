import React, { FC, KeyboardEventHandler, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';

interface Props {
  add: (note: string) => void;
  remove: (position: number) => void;
  notes: string[];
  swap: (indices: [number, number]) => void;
}

const NotesManager: FC<Props> = ({
  add,
  remove,
  notes,
  swap
}) => {
  const noteInput = useRef<HTMLInputElement>();

  const onAddNote = () => {
    if (noteInput.current) {
      const text = noteInput.current.value;
      if (text === '') {
        // addMessage({
        //   color: 'error',
        //   key: 'add-note-error',
        //   message: 'A note cannot be blank',
        // });
      } else {
        add(text);
        noteInput.current.value = '';
      }
    }
  }

  const onKeyPressHandle: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddNote();
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <TextField
            inputRef={noteInput}
            label="Text"
            type="text"
            variant="outlined"
            onKeyPress={onKeyPressHandle}
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
            onClick={onAddNote}
          >
            Add Note
          </Button>
        </Grid>
      </Grid>
      <MaterialTable
         columns={[
          { title: "Position", field: "position", type: 'numeric' },
          { title: "Text", field: "text"  },
        ]}
        data={notes.map((text, position) => ({ position, text }))}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete note',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                remove(rowData[0].position);
              } else {
                remove(rowData.position);
              }
            }
          },
          {
            icon: 'arrow_upward',
            tooltip: 'Move up',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swap([rowData[0].position - 1, rowData[0].position]);
              } else {
                swap([rowData.position - 1, rowData.position]);
              }
            }
          },
          {
            icon: 'arrow_downward',
            tooltip: 'Move down',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swap([rowData[0].position, rowData[0].position + 1]);
              } else {
                swap([rowData.position, rowData.position + 1]);
              }
            }
          }
        ]}
        title="Notes"
      />
    </>
  );
};

export default NotesManager;
