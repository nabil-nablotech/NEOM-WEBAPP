import React, { ChangeEvent, FocusEvent } from "react";
import Box from "@mui/material/Box";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled, SxProps } from '@mui/material/styles';

interface TextInputProps {
  error?: boolean;
  onChange?: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  onBlur?: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  
  onFocus?: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string | "";
  defaultValue?: string | "";
  errorText?: string | "";
  fullWidth?: boolean;
  size?: "small" | "medium";
  type?: string;
  label: string;
  className?: string;
  name?: string;
  showLabel?: boolean;
  InputProps?: any;
  sx?: any;
  ref?: React.RefObject<HTMLDivElement>;
  required?: boolean,
  autoComplete?: string,
  formControlSx?: SxProps
};

const NeomTextInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  // color: theme.palette.getContrastText(grey[500]),
  fontSize: 12,
  // lineHeight: 20,
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

export default function NTextFields(props: TextInputProps) {
  const {
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    error,
    value,
    label,
    defaultValue,
    errorText,
    size,
    fullWidth,
    type,
    className,
    showLabel = true,
    InputProps,
    sx,
    ref,
    required,
    name,
    autoComplete,
    formControlSx
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
          id={error ? `outlined-error ${className}` : `outlined-size-small ${className}`}
          size={size ? size : "small"}
          fullWidth={fullWidth}
          label={showLabel ? label : ''}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          helperText={errorText}
          type={type}
          placeholder={label}
          sx={{
            ...sx,
            ...formControlSx
          }}
          InputProps={{
            ...InputProps
          }}
          ref={ref ? ref : null}
          required={required}
          name={name}
          autoComplete={autoComplete}
        >
          {value}
          </NeomTextInput>
      </Box>
    </Grid>
  );
}
