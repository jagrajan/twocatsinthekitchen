import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createUnitAsync } from 'store/recipeEditor/actions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CreateIngredientDialog: FC<DialogProps> = (props) => {
  const nameRef = useRef<HTMLInputElement>();
  const pluralRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const onButtonClick = () => {
    const name = nameRef.current?.value;
    const plural = pluralRef.current?.value;
    if (name && plural) {
      dispatch(createUnitAsync.request({ name, plural }));
    }
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Create Unit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Quickly create a new unit in the database.
        </DialogContentText>
        <Box my={2}>
          <TextField
            inputRef={nameRef}
            autoFocus
            id="unitName"
            label="Name"
            type="text"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box my={2}>
          <TextField
            inputRef={pluralRef}
            id="unitPlural"
            label="Plural"
            type="text"
            variant="outlined"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={onButtonClick}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateIngredientDialog;
