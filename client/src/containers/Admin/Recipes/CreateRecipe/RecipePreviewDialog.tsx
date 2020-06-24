import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@twocats/store';
import { transformIngredient } from '../../../../components/RecipeCard/utils';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import RecipeRenderer from 'components/RecipeRenderer';

const CreateIngredientDialog: FC<
  DialogProps & { close: () => void } & PropsFromRedux
> = ({
  close,
  name,
  introduction,
  ingredients,
  imageUrl,
  steps,
  notes,
  ...props
}) => (
  <Dialog fullScreen {...props}>
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={close}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">Recipe Preview</Typography>
      </Toolbar>
    </AppBar>
    <DialogTitle>Recipe Preview</DialogTitle>
    <DialogContent>
      <DialogContentText />
      <Container maxWidth="md">
        <RecipeRenderer
          imageUrl={imageUrl || ''}
          ingredients={ingredients}
          introduction={introduction}
          name={name}
          notes={notes}
          steps={steps}
        />
      </Container>
    </DialogContent>
  </Dialog>
);

const mapState = (state: RootState) => ({
  imageUrl: state.recipeEditor.recipe.previewImage,
  ingredients: state.recipeEditor.recipe.ingredients
    .toArray()
    .map((x, position) => ({
      position,
      text: transformIngredient(x),
    })),
  introduction: state.recipeEditor.recipe.introduction,
  name: state.form.recipeEditor?.values?.name || 'Missing name',
  notes: state.recipeEditor.recipe.notes.toArray().map((text, position) => ({
    position,
    text,
  })),
  steps: state.recipeEditor.recipe.steps.toArray().map((text, position) => ({
    position,
    text,
  })),
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateIngredientDialog);
