import React, { FC } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import validator from 'validator'
import styled from 'styled-components';
import LoadingButton from 'components/ui/Button/LoadingButton';
import FieldInput from 'components/ui/Input/FieldInput';
import FieldCheckbox from 'components/ui/Checkbox/FieldCheckbox';

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 1rem;
`;

const validate = (values: { [key: string]: string }) => {
  let errors: { [key: string]: string } = {};
  if (!values.email || validator.isEmpty(values.email)) {
    errors.email = 'Please enter your email';
  } else if (!validator.isEmail(values.email)) {
    errors.email = 'Email format is not valid';
  }
  if (!values.password || validator.isEmpty(values.password)) {
    errors.password = 'Please enter your password';
  }
  return errors;
};

let Form: FC<InjectedFormProps> = ({ handleSubmit, submitting }) => {
  return (
    <StyledForm onSubmit={handleSubmit} autoComplete="off" noValidate>
      <Field
        component={FieldInput}
        disabled={submitting}
        fullWidth
        label="Email"
        name="email"
        type="email"
        variant="outlined"
      />
      <Field
        component={FieldInput}
        disabled={submitting}
        fullWidth
        label="Password"
        name="password"
        type="password"
        variant="outlined"
      />
      <Field
        component={FieldCheckbox}
        disabled={submitting}
        label="Stay signed in"
        name="staySignedIn"
        color="primary"
        />
      <LoadingButton
        color="primary"
        size="large"
        loading={submitting}
        type="submit"
        variant="contained"
      >
        Log in
      </LoadingButton>
    </StyledForm>
  );
};

const ReduxForm = reduxForm({
  form: 'login',
  validate
})(Form);

export default ReduxForm;
