import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  clearRecipe as clearRecipeAction,
  loadRecipeDetailsAsync,
  setPreviewImage as setPreviewImageAction,
  uploadRecipeImageAsync,
} from 'store/recipeEditor/actions';
import { createMatchSelector } from 'connected-react-router';
import Cropper from 'react-cropper';
import { RootState } from '@twocats/store';
import Container from '@material-ui/core/Container';
import { FormSubmitHandler, InjectedFormProps, reduxForm } from 'redux-form';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import LoadingButton from 'components/ui/Button/LoadingButton';
import LoadingStatus from 'components/ui/LoadingStatus';
import InformationMetadata, { validate } from './InformationMetadata';
import IngredientsSteps from './IngredientsSteps';
import BlogPostEditor from './BlogPostEditor';
import RecipePreviewDialog from './RecipePreviewDialog';

const StyledForm = styled.form`
  & > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;
  }
`;

const Form: FC<InjectedFormProps> = ({ children, handleSubmit, submitting }) => (
  <StyledForm onSubmit={handleSubmit} noValidate autoComplete="off">
    {children}
    <LoadingButton
      color="primary"
      size="large"
      loading={submitting}
      type="submit"
      variant="contained"
    >
      Create Recipe
    </LoadingButton>
  </StyledForm>
);

const ReduxForm = reduxForm({
  form: 'recipeEditor',
  validate,
})(Form);

const CreateRecipe: FC<PropsFromRedux> = ({
  clearRecipe,
  loadRecipeDetails,
  loading,
  match,
  setPreviewImage,
  uploadRecipeImage,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modal, setModal] = useState(false);
  const id = match?.params.id;
  const cropperRef = useRef<Cropper | null>(null);

  useEffect(() => {
    if (id) {
      loadRecipeDetails(parseInt(id, 10));
    } else {
      clearRecipe();
    }
  }, [id, loadRecipeDetails, clearRecipe]);

  const onSubmit: FormSubmitHandler = () => {
    const dataUrl = cropperRef.current?.getCroppedCanvas()?.toDataURL();
    if (dataUrl) {
      uploadRecipeImage(dataUrl);
    }
    // createRecipe();
  };

  const onPreview = () => {
    const dataUrl = cropperRef.current?.getCroppedCanvas()?.toDataURL();
    if (dataUrl) {
      setPreviewImage(dataUrl);
    }
    setModal(true);
  };

  return (
    <>
      {loading && <LoadingStatus />}
      <RecipePreviewDialog open={modal} close={() => setModal(false)} />
      <Container>
        <Box textAlign="right">
          <Button variant="contained" color="secondary" onClick={onPreview}>Preview</Button>
        </Box>
        <Stepper nonLinear activeStep={currentStep}>
          <Step>
            <StepButton onClick={() => setCurrentStep(0)}>Information & Metadata</StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => setCurrentStep(1)}>Ingredients & Steps</StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => setCurrentStep(2)}>Blog Post</StepButton>
          </Step>
        </Stepper>
        <ReduxForm onSubmit={onSubmit}>
          <div style={{ display: currentStep === 0 ? 'grid' : 'none' }}><InformationMetadata cropperRef={cropperRef} /></div>
          <div style={{ display: currentStep === 1 ? 'grid' : 'none' }}><IngredientsSteps /></div>
          <div style={{ display: currentStep === 2 ? 'grid' : 'none' }}><BlogPostEditor /></div>
        </ReduxForm>
      </Container>
    </>
  );
};

const mapState = (state: RootState) => ({
  loading: state.recipeEditor.loading || state.recipeEditor.creatingIngredient
  || state.recipeEditor.creatingUnit,
  match: createMatchSelector<RootState, {id: string | undefined }>('/admin/recipes/edit/:id')(state),
});

const mapDispatch = {
  clearRecipe: clearRecipeAction,
  loadRecipeDetails: loadRecipeDetailsAsync.request,
  setPreviewImage: setPreviewImageAction,
  uploadRecipeImage: uploadRecipeImageAsync.request,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateRecipe);
