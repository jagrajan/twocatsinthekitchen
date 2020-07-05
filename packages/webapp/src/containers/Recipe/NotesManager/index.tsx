import { List } from 'immutable';
import React, { FC, useState, useRef, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NoteRenderer from './NoteRenderer';
import swap from 'utils/swap';

interface Props {
  onSaveNotes: (notes: string[]) => void;
  serverNotes: string[];
}

const NotesManager: FC<Props> = ({
  onSaveNotes,
  serverNotes,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [notes, setNotes] = useState<List<string>>(List(serverNotes))
  useEffect(() => {
    setNotes(List(serverNotes));
  }, [serverNotes])
  const inputRef = useRef<HTMLInputElement>(null);
  const onAddNote = () => {
    if (inputRef.current && inputRef.current.value !== '') {
      setNotes(notes.push(inputRef.current.value));
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }
  return (
    <Container maxWidth="md">
      <div>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
          <Typography component="h2" variant="h4">My Notes</Typography>
          {edit ? (
            <IconButton onClick={() => {
              onSaveNotes(notes.toArray());
              setEdit(false);
            }}>
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => {
              setEdit(true);
              setTimeout(() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }, 250)
            }}>
              <EditIcon />
            </IconButton>
          )
          }
        </Box>
      </div>
      {notes.toArray().map((note, index) => (
        <NoteRenderer
          edit={edit}
          index={index}
          key={index}
          note={note}
          onChange={(val) => setNotes(notes.set(index, val))}
          onRemove={() => setNotes(notes.remove(index))}
          onSwapDown={() => setNotes(swap<string>([index, index + 1], notes))}
          onSwapUp={() => setNotes(swap<string>([index - 1, index], notes))}
        />
      ))}
      {edit && (
        <div>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
            <TextField inputRef={inputRef} style={{ flexGrow: 1 }} variant="outlined" />
            <IconButton onClick={onAddNote}>
              <AddIcon />
            </IconButton>
          </Box>
        </div>
      )}
    </Container>
  );
};

export default NotesManager;
