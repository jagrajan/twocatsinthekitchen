import React, { FC, MutableRefObject } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@twocats/store';
import {
  addNote,
  removeNote,
  swapNotes,
} from 'store/recipeEditor/actions';
// import { addMessage } from 'store/feedback/actions';
import { Field  } from 'redux-form';
import validator from 'validator'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FieldInput from 'components/ui/Input/FieldInput';
import DropzoneCropper from 'components/ui/DropzoneCropper';
import Cropper from 'react-cropper';
import NotesManager from './NotesManager';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const validate = (values: { [key: string]: string }) => {
  let errors: { [key: string]: string } = {};
  if (!values.name || validator.isEmpty(values.name)) {
    errors.name = 'Please enter a recipe name';
  }
  if (!values.description || validator.isEmpty(values.description)) {
    errors.description = 'Please enter a recipe description';
  }
  return errors;
};

const Fields: FC = () => {
  return (
    <StyledContainer>
      <Field
        component={FieldInput}
        fullWidth
        label="Name"
        name="name"
        type="text"
        variant="outlined"
      />
      <Field
        component={FieldInput}
        fullWidth
        label="Description"
        name="description"
        type="text"
        variant="outlined"
      />
      <Field
        component={FieldInput}
        fullWidth
        label="Prep time"
        name="prepTime"
        type="text"
        variant="outlined"
      />
      <Field
        component={FieldInput}
        fullWidth
        label="Cook time"
        name="cookTime"
        type="text"
        variant="outlined"
      />
      <Field
        component={FieldInput}
        fullWidth
        label="Servings"
        name="servings"
        type="number"
        variant="outlined"
      />
      <Field
        component={FieldInput}
        fullWidth
        label="Slug"
        name="slug"
        type="text"
        variant="outlined"
      />
    </StyledContainer>
  );
};

type OwnProps = {
  cropperRef?: MutableRefObject<Cropper | null>;
}

const InformationMetadata: FC<PropsFromRedux & OwnProps> = ({
  addNote,
  cropperRef,
  imageData,
  recipeNotes,
  removeNote,
  swapNotes,
}) => {
  const cropperProps = imageData ? { originalImage: imageData } : {};
  return (
    <>
      <Typography component="h2" variant="h3">Information & Metadata</Typography>
      <Fields />
      <Typography component="h2" variant="h3">Image</Typography>
      <Container maxWidth="sm">
        <DropzoneCropper cropperRef={cropperRef} {...cropperProps}  />
      </Container>
      <Typography component="h2" variant="h3">Notes</Typography>
      <NotesManager
        add={addNote}
        notes={recipeNotes.toArray()}
        remove={removeNote}
        swap={swapNotes}
      />
      <Typography component="h2" variant="h3">Tags</Typography>
    </>
  )
}

const mapState = (state: RootState) => ({
  imageData: state.recipeEditor.recipe.imageData,
  recipeNotes: state.recipeEditor.recipe.notes,
});

const mapDispatch = {
  addNote,
  removeNote,
  swapNotes,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(InformationMetadata);
