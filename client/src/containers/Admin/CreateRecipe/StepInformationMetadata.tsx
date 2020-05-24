import React, { FC } from 'react';
import { Field  } from 'redux-form';
import validator from 'validator'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FieldInput from 'components/ui/Input/FieldInput';

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
    </StyledContainer>
  );
};

const InformationMetadata: FC = () => {
  return (
    <>
      <Box my={4}>
        <Typography component="h2" variant="h3">Information & Metadata</Typography>
      </Box>
      <Fields />
    </>
  )
}

export default InformationMetadata;
