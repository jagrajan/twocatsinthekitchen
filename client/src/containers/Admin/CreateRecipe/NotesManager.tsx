import React, { FC, useState, KeyboardEventHandler } from 'react';
import { RecipeNote } from 'store/recipeEditor/types';
import { FeedbackMessage } from 'store/feedback/types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';

interface Props {
  addNote: (note: RecipeNote) => void;
  addMessage: (message: FeedbackMessage) => void;
  removeNote: (position: number) => void;
  notes: RecipeNote[];
  swapNotes: (a: number, b: number) => void;
}

const NotesManager: FC<Props> = ({
  addMessage,
  addNote,
  removeNote,
  notes,
  swapNotes,
}) => {
  const [ text, setText ] = useState('');

  const onAddNote = () => {
    if (text === '') {
      addMessage({
        color: 'error',
        key: 'add-note-error',
        message: 'A note cannot be blank',
      });
    } else {
      addNote({
        position: -1,
        text,
      });
      setText('');
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
            label="Text"
            type="text"
            variant="outlined"
            value={text}
            onChange={e => setText(e.target.value)}
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
        data={notes}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete note',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                removeNote(rowData[0].position);
              } else {
                removeNote(rowData.position);
              }
            }
          },
          {
            icon: 'arrow_upward',
            tooltip: 'Move up',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swapNotes(rowData[0].position - 1, rowData[0].position);
              } else {
                swapNotes(rowData.position - 1, rowData.position);
              }
            }
          },
          {
            icon: 'arrow_downward',
            tooltip: 'Move down',
            onClick: (event, rowData) => {
              if (Array.isArray(rowData)) {
                swapNotes(rowData[0].position, rowData[0].position + 1);
              } else {
                swapNotes(rowData.position, rowData.position + 1);
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
