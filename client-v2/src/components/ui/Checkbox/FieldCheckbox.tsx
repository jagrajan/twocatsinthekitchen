import React, { FC } from 'react';
import { WrappedFieldProps } from 'redux-form';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type FieldProps = WrappedFieldProps & {
  label: string
} & CheckboxProps;

const FieldCheckbox: FC<FieldProps> = ({
  input,
  meta,
  name,
  label,
  ...rest
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
        name={name}
        {...input}
        {...rest}
        />
      }
      label={label}
    />
  )
};

export default FieldCheckbox;
