import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { RootState } from '@twocats/store';
import FieldInput from 'components/ui/Input/FieldInput';
import LoadingStatus from 'components/ui/LoadingStatus';
import { IMAGE_SERVER } from 'config';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { FC, MutableRefObject, useState } from 'react';
import Cropper from 'react-cropper';
import { connect, ConnectedProps } from 'react-redux';
import { Field } from 'redux-form';
import { uploadBlogImage } from 'services/api/api-recipe-editor'
import {
  addNote,
  addTag as addTagAction,
  createTagAsync,
  removeNote,
  removeTag,
  setImageFile,
  setNotes,
  swapNotes,
} from 'store/recipeEditor/actions';
import styled from 'styled-components';
import validator from 'validator'
import NotesManager from './NotesManager';
import TagsManager from './TagsManager';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const validate = (values: { [key: string]: string }) => {
  const errors: { [key: string]: string } = {};
  if (!values.name || validator.isEmpty(values.name)) {
    errors.name = 'Please enter a recipe name';
  }
  if (!values.description || validator.isEmpty(values.description)) {
    errors.description = 'Please enter a recipe description';
  }
  if (!values.servings || validator.isEmpty(values.servings) || !validator.isNumeric(values.servings)) {
    errors.servings = 'Please enter a number for servings';
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
  addTag,
  allTags,
  createTag,
  imageData,
  imageFile,
  recipeNotes,
  removeNote,
  removeTag,
  setImageFile,
  setNotes,
  swapNotes,
  tags,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const onFileChange = async (files: File[]) => {
    setLoading(true);
    const file = files[0];
    if (file) {
      const filename = await uploadBlogImage(file);
      setImageFile(filename);
    }
    setLoading(false);
  }
  if (loading) {
    return <LoadingStatus />;
  }
  return (
    <>
      <Typography component="h2" variant="h3">Information & Metadata</Typography>
      <Fields />
      <Typography component="h2" variant="h3">Image</Typography>
      <Container maxWidth="sm">
        {imageFile && <>
          <img style={{width: '100%'}} src={`${IMAGE_SERVER}/${imageFile}`}/>
          <Box textAlign="center" my={2}>
            <Button variant="contained" color="primary" onClick={() => setImageFile(null)}>Delete</Button>
          </Box>
        </> }
        {!imageFile && <>
          <DropzoneArea onChange={onFileChange} />
        </>}
      </Container>
      <Typography component="h2" variant="h3">Notes</Typography>
      <NotesManager
        add={addNote}
        notes={recipeNotes.toArray()}
        remove={removeNote}
        setNotes={setNotes}
        swap={swapNotes}
      />
      <Typography component="h2" variant="h3">Tags</Typography>
      <TagsManager
        addTag={addTag}
        allTags={allTags}
        createTag={createTag}
        removeTag={removeTag}
        tags={tags}
      />
    </>
  )
}

const mapState = (state: RootState) => ({
  allTags: state.recipeEditor.tags,
  imageData: state.recipeEditor.recipe.imageData,
  imageFile: state.recipeEditor.recipe.imageFile,
  recipeNotes: state.recipeEditor.recipe.notes,
  tags: state.recipeEditor.recipe.tags.toArray(),
});

const mapDispatch = {
  addNote,
  addTag: addTagAction,
  createTag: createTagAsync.request,
  removeNote,
  removeTag,
  setImageFile,
  setNotes,
  swapNotes,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(InformationMetadata);
