import React, { FC } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import StrikeableListItem from './StrikeableListItem';

const useStyles = makeStyles((theme) => ({
  divider: {
    padding: '1.5rem',
  },
  image: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '15rem',
    },
  },
  imageContainer: {
    textAlign: 'right',
  },
  infoContainer: {},
  root: {
    padding: '2rem',
  },
}));

interface Props {
  imageUrl: string;
  name: string;
  notes: {
    position: number;
    text: string;
  }[];
  steps: {
    position: number;
    text: string;
  }[];
  ingredients: {
    position: number;
    text: string;
  }[];
}

const RecipeCard: FC<Props> = ({
  imageUrl,
  ingredients,
  name,
  notes,
  steps,
}) => {
  const classes = useStyles();

  const stepsRender = steps.map((step) => (
    <StrikeableListItem
      key={step.position}
      text={`${step.position + 1}. ${step.text}`}
    />
  ));
  const ingRender = ingredients.map((ing) => (
    <StrikeableListItem key={ing.position} text={`${ing.text}`} />
  ));
  const notesRender = notes.map((note) => (
    <StrikeableListItem key={note.position} text={`${note.text}`} />
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
        <Grid item xs={12} className={classes.divider}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Notes</Typography>
          <div>
            <List>{notesRender}</List>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecipeCard;
