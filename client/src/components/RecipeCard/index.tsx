import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import StrikeableListItem from './StrikeableListItem';
import Box from '@material-ui/core/Box';
import RecipeFact from './RecipeFact';
import { useDispatch } from 'react-redux';
import { setRecipeScale } from 'store/recipe/actions';
import Slider from '@material-ui/core/Slider';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  divider: {
    padding: '1.5rem',
  },
  factsContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-evenly',
      width: '100%',
    },
  },
  heading: {
    background: theme.palette.secondary.main,
    color: '#FFF',
    margin: '.5rem',
    padding: '.5rem',
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
    // border: `4px solid ${theme.palette.secondary.main}`,
  },
}));

const SliderRenderer: FC<{scale: number}> = ({ scale }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Box mb={4}>
        <Typography variant="overline">Scale</Typography>
      </Box>
      <Slider
        min={0.5}
        step={0.25}
        max={4}
        value={scale}
        marks={true}
        valueLabelDisplay="on"
        onChange={(_, val) => {
          const scale = Array.isArray(val) ? val[0] : val;
          dispatch(setRecipeScale(scale));
        }}
      />
    </>
  );
};


interface Props {
  cookTime: string;
  imageUrl: string;
  name: string;
  notes: {
    position: number;
    text: string;
  }[];
  prepTime: string;
  scale: number,
  servings: string;
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
  cookTime,
  imageUrl,
  ingredients,
  name,
  notes,
  prepTime,
  scale,
  servings,
  steps,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

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
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Box display="flex" flexDirection="column" height="100%" alignItems="center">
            <div className={classes.infoContainer}>
              <Typography variant="h4">{name}</Typography>
            </div>
            <Box className={classes.factsContainer}>
              <RecipeFact name="Cook time">{cookTime}</RecipeFact>
              <RecipeFact name="Prep time">{prepTime}</RecipeFact>
              <RecipeFact name="Servings">{servings}</RecipeFact>
            </Box>
            {matches && <Box width="60%" pt={3}>
              <SliderRenderer scale={scale} />
            </Box>}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={imageUrl} alt={name} />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.divider}>
          {!matches && <SliderRenderer scale={scale} />}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className={classes.heading}>Ingredients</Typography>
          <div>
            <List>{ingRender}</List>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className={classes.heading}>Steps</Typography>
          <div>
            <List>{stepsRender}</List>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.heading}>Notes</Typography>
          <div>
            <List>{notesRender}</List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeCard;
