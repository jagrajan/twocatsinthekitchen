import React, { FC } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import StrikableListItem from './StrikableListItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2rem',
  },
  infoContainer: {

  },
  imageContainer: {
    textAlign: 'right',
  },
  image: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '15rem',
    }
  },
  divider: {
    padding: '1.5rem',
  },
}));

interface Props {
  imageUrl: string;
  name: string;
  steps: {
    position: number;
    description: string;
  }[];
  ingredients: {
    position: number;
    ingredient_name: string;
  }[];
}

const RecipeCard: FC<Props> = ({
  imageUrl,
  ingredients,
  name,
  steps
}) => {
  const classes = useStyles();

  const stepsRender = steps.map(step => (
    <StrikableListItem
      key={step.position}
      text={`${step.position}. ${step.description}`}
    />
  ));

  const ingRender = ingredients.map(ing => (
    <StrikableListItem
      key={ing.position}
      text={`${ing.ingredient_name}`}
    />
  ));

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div className={classes.infoContainer}>
            <Typography variant="h4">{name}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={imageUrl} alt={name} />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.divider}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Ingredients</Typography>
          <div>
            <List>{ingRender}</List>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Steps</Typography>
          <div>
            <List>{stepsRender}</List>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecipeCard;
