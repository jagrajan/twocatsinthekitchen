import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createRecipeAsync } from 'store/recipeEditor/actions';
import { RootState } from '@twocats/store';
import Container from '@material-ui/core/Container';
import { FormSubmitHandler, reduxForm, InjectedFormProps } from 'redux-form';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import LoadingButton from 'components/ui/Button/LoadingButton';
import InformationMetadata, { validate } from './InformationMetadata';
import IngredientsSteps from './IngredientsSteps';

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.5rem;
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
  form: 'recipeCreator',
  validate
})(Form);

const CreateRecipe: FC<PropsFromRedux> = ({ createRecipe }) => {

  const [ currentStep, setCurrentStep ] = useState(0);

  const onSubmit: FormSubmitHandler = (values: { [key: string]: string }) => {
    createRecipe();
  };

  return (
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
        {currentStep === 0 && <InformationMetadata />}
        {currentStep === 1 && <IngredientsSteps />}
      </ReduxForm>
    </Container>
  )
}

const mapState = (state: RootState) => ({
});

const mapDispatch = {
  createRecipe: createRecipeAsync.request
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateRecipe);
