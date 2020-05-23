import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FieldInput from 'components/ui/Input/FieldInput';

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Form: FC<InjectedFormProps> = ({ handleSubmit, submitting }) => {
  return (
    <StyledForm>
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
        label="Servings"
        name="description"
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
        label="Description"
        name="description"
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
    </StyledForm>
  );
};

const ReduxForm = reduxForm({
  form: 'recipeCreator',
})(Form);

const InformationMetadata: FC = () => {
  return (
    <>
      <Box my={4}>
        <Typography component="h2" variant="h3">Information & Metadata</Typography>
      </Box>
      <ReduxForm />
    </>
  )
}

export default InformationMetadata;
