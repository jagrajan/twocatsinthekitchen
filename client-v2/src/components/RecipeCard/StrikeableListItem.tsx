import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
  text: string;
}

const useStyles = makeStyles(theme => ({
  striked: {
    textDecoration: 'line-through',
  },
}));

const StrikableListItem: FC<Props> = ({ text }) => {
  const [striked, setStriked] = useState(false);
  const classes = useStyles();
  return (
    <ListItem button onClick={()  => setStriked(!striked)}>
      <ListItemText primary={text} className={striked ? classes.striked : ''} />
    </ListItem>
  );
};

export default StrikableListItem;
