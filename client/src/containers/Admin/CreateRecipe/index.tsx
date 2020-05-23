import React, { FC, useState } from 'react';
import Container from '@material-ui/core/Container';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import InformationMetadata from './StepInformationMetadata';

const CreateRecipe: FC = () => {

  const [ currentStep, setCurrentStep ] = useState(0);

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
      {currentStep === 0 && <InformationMetadata />}
    </Container>
  )
}

export default CreateRecipe;
