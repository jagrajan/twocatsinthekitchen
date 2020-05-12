import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Progress from '@material-ui/core/CircularProgress';

type StyledButtonProps = ButtonProps & {
  loading?: boolean
};


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  progress: {
    left: '50%',
    marginLeft: -15,
    top: '50%',
    marginTop: -15,
    position: 'absolute',
    zIndex: 500,
  },
}));

const StyledButton: FC<StyledButtonProps> = ({loading, ...props}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Button {...props} disabled={loading} />
      {loading && <Progress className={classes.progress} size={30} />}
    </div>
  );
};

export default StyledButton;
