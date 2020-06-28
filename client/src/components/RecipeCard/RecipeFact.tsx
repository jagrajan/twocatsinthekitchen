import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface Props {
  name: string;
}

const RecipeFact: FC<Props> = ({ children, name }) => {
  return (
    <Box>
      <Typography variant="overline">{name}</Typography>
      <Typography>{children}</Typography>
    </Box>
  );
};

export default RecipeFact;
