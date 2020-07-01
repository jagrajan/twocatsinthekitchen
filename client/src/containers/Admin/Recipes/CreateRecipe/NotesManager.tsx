import { List } from 'immutable';
import React, { FC, KeyboardEventHandler, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';

interface Props {
  add: (note: string) => void;
  remove: (position: number) => void;
  notes: string[];
  setNotes: (steps: string[]) => void;
  swap: (indices: [number, number]) => void;
}

const NotesManager: FC<Props> = ({
  add,
  remove,
  notes,
  setNotes,
  swap
}) => {
  const noteInput = useRef<HTMLInputElement>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editPosition, setEditPosition] = useState<number>(0);

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
        if (editMode) {
          setNotes(List(notes).set(editPosition, text).toArray());
        } else {
          add(text);
        }
        setEditMode(false);
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
            {editMode ? 'Update' : 'Add'} Note
          </Button>
        </Grid>
      </Grid>
      <MaterialTable
         columns={[
          { title: 'Position', field: 'position', type: 'numeric' },
          { title: 'Text', field: 'text'  },
        ]}
        data={notes.map((text, position) => ({ position, text }))}
        actions={[
          {
            icon: 'delete',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                remove(rowData[0].position);
              } else {
                remove(rowData.position);
              }
            },
            tooltip: 'Delete note',
          },
          {
            icon: 'arrow_upward',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swap([rowData[0].position - 1, rowData[0].position]);
              } else {
                swap([rowData.position - 1, rowData.position]);
              }
            },
            tooltip: 'Move up',
          },
          {
            icon: 'arrow_downward',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swap([rowData[0].position, rowData[0].position + 1]);
              } else {
                swap([rowData.position, rowData.position + 1]);
              }
            },
            tooltip: 'Move down',
          },
          {
            icon: 'edit',
            onClick: (event, rowData) => {
              const note = Array.isArray(rowData) ? rowData[0] : rowData;
              setEditMode(true);
              setEditPosition(note.position);
              if (noteInput.current) {
                noteInput.current.value = note.text;
                noteInput.current.focus();
              }
            },
            tooltip: 'Edit',
          },
        ]}
        title="Notes"
      />
    </>
  );
};

export default NotesManager;
