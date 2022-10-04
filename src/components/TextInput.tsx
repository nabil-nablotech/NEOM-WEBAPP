import React, { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

type TextInputProps = {
  error?: boolean;
  onChange?: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  value?: string | "";
  defaultValue?: string | "";
  errorText?: string | "";
  fullWidth?: boolean;
  size?: "small" | "medium";
  type?: string;
  label: string;
  className?: string;
};

const NeomTextInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  // color: theme.palette.getContrastText(grey[500]),
  fontSize: 12,
  lineHeight: 20,
  letterSpacing: 2,
  textAlign: 'center',
  padding: '10px, 24px, 10px, 24px',
  height: 40,
  '& label.Mui-focused': {
    'legends': {
      color: 'var(--grey-text)',
      borderRadius: '2px',
      width: 'fit-content'
    }
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'var(--grey-text)',
  },
  '& .MuiOutlinedInput-root': {
  }
}));

export default function ValidationTextFields(props: TextInputProps) {
  const {
    onChange,
    error,
    value,
    label,
    defaultValue,
    errorText,
    size,
    fullWidth,
    type,
    className
  } = props;
  return (
    <Grid item className={className ? className : ''}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <NeomTextInput
          error={error}
          id={error ? "outlined-error" : "outlined-size-small"}
          size={size ? size : "small"}
          fullWidth={fullWidth}
          label={label}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          helperText={errorText}
          type={type}
        >
          {value}
          </NeomTextInput>
      </Box>
    </Grid>
  );
}
