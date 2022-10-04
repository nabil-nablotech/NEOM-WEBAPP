import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // color: theme.palette.getContrastText(grey[500]),
  backgroundColor: '#13100DE5',
  borderRadius: 100,
  fontSize: 12,
  lineHeight: 20,
  letterSpacing: 2,
  textAlign: 'center',
  padding: '10px, 24px, 10px, 24px',
  height: 40,
  '&:hover': {
    backgroundColor: grey[700],
  },
}));

type CustomButtonProps  = {
  label: string | ''
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  className?: string
}

export default function CustomizedButtons(props: CustomButtonProps) {
  const {label, disabled, onClick, className} = props; 
  return (
    <Stack spacing={2} direction="row" >
      <ColorButton className={className ? className : ''} onClick={onClick} disabled={disabled} variant="contained">{label}</ColorButton>
    </Stack>
  );
}
