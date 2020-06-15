import React, { FC, useState, useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loadRecipeDetailsAsync, uploadRecipeImageAsync, clearRecipe } from 'store/recipeEditor/actions';
import { createMatchSelector } from 'connected-react-router';
import Cropper from 'react-cropper';
import { RootState } from '@twocats/store';
import Container from '@material-ui/core/Container';
import { FormSubmitHandler, reduxForm, InjectedFormProps } from 'redux-form';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import LoadingButton from 'components/ui/Button/LoadingButton';
import LoadingStatus from 'components/ui/LoadingStatus';
import InformationMetadata, { validate } from './InformationMetadata';
import IngredientsSteps from './IngredientsSteps';

const StyledForm = styled.form`
  & > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;
  }
`;

const Form: FC<InjectedFormProps> = ({ children, handleSubmit, submitting }) => {
  return (
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
}

const ReduxForm = reduxForm({
  form: 'recipeEditor',
  validate
})(Form);

const CreateRecipe: FC<PropsFromRedux> = ({
  clearRecipe,
  loadRecipeDetails,
  loading,
  match,
  uploadRecipeImage,
}) => {

  const [ currentStep, setCurrentStep ] = useState(0);
  const id = match?.params.id;
  const cropperRef = useRef<Cropper | null>(null);

  useEffect(() => {
    console.log(id);
    if (id) {
      loadRecipeDetails(parseInt(id));
    } else {
      clearRecipe();
    }
  }, [id, loadRecipeDetails, clearRecipe]);

  const onSubmit: FormSubmitHandler = (values: { [key: string]: string }) => {
    const dataUrl = cropperRef.current?.getCroppedCanvas()?.toDataURL();
    if (dataUrl) {
      uploadRecipeImage(dataUrl);
    }
    // createRecipe();
  };

  return (
    <>
      {loading && <LoadingStatus />}
      <Container>
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
        </ReduxForm>
      </Container>
    </>
  );
}

const mapState = (state: RootState) => ({
  loading: state.recipeEditor.loading,
  match: createMatchSelector<RootState, {id: string | undefined }>('/admin/recipes/edit/:id')(state),
});

const mapDispatch = {
  clearRecipe,
  loadRecipeDetails: loadRecipeDetailsAsync.request,
  uploadRecipeImage: uploadRecipeImageAsync.request,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateRecipe);
