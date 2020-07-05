import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import UndecoratedLink from 'components/UndecoratedLink';
import moment from 'moment';
import React, { FC } from 'react';
import { RecipeVersion } from 'store/recipeEditor/types';

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.grey[200],
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
}));

type Props = {
  isReleased: boolean;
  onPrimaryClick: () => void;
  version: RecipeVersion;
}

const VersionOverview: FC<Props> = ({ isReleased, onPrimaryClick, version }) => {
  const styles = useStyles();
  return (
    <Box className={styles.container} p={2} m={2}>
      <Box>
        <Typography component="h3" variant="h5">Version {version.version}: {version.name}</Typography>
        <Typography variant="body2">{moment(version.last_update).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box mr={2}>
          <Button variant="contained" color="primary" onClick={onPrimaryClick}>
            Make {isReleased? 'hidden' : 'released'}
          </Button>
        </Box>
        <UndecoratedLink to={`/admin/recipes/edit/${version.id}`}>
          <Button variant="contained" color="secondary">Edit</Button>
        </UndecoratedLink>
      </Box>
    </Box>
  );
};

export default VersionOverview;
