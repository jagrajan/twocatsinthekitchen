import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import React, { FC, useRef, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpwardIcon from '@material-ui/icons/ArrowUpward';
import DownwardIcon from '@material-ui/icons/ArrowDownward';

interface Props {
  edit: boolean;
  index: number;
  note: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  onSwapDown: () => void;
  onSwapUp: () => void;
}

const NoteRenderer: FC<Props> = ({
  edit,
  index,
  note,
  onChange,
  onRemove,
  onSwapDown,
  onSwapUp,
}) => {
  return (
    <Box m={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      {edit ? (<>
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={onSwapUp}>
          <UpwardIcon />
        </IconButton>
        <IconButton onClick={onSwapDown}>
          <DownwardIcon />
        </IconButton>
        <TextField style={{ flexGrow: 1 }} value={note} onChange={e => onChange(e.target.value)} />
      </>) : (
        <Typography>{note}</Typography>
      )}
    </Box>
  );
};

export default NoteRenderer;