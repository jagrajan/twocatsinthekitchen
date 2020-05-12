import React, { FC, InputHTMLAttributes } from 'react';
import { WrappedFieldProps } from 'redux-form';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

type FieldProps = WrappedFieldProps/* & InputHTMLAttributes<HTMLInputElement>*/ & {
  label: string
} & TextFieldProps;

const FieldInput: FC<FieldProps> = ({
  input,
  meta,
  name,
  ...rest
}) => {
  return (
    <TextField
      name={name}
      {...input}
      {...rest}
      error={meta.touched && meta.error ? true: false}
      helperText={meta.touched && meta.error ? meta.error : ''}
    />
  )
};

export default FieldInput;
