import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from "@mui/material/FormControl";
import { AutoCompleteSingleSelectProps } from '../../types/DropdownComponent';

export default function FreeSolo({className, formControlSx, itemsList, value, placeholder, label, selectStylesSx, handleSelectChange}: AutoCompleteSingleSelectProps) {
  return (
    <div className={className}>
      <FormControl sx={{ minWidth: 120, ...formControlSx }}>
      {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      /> */}
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={itemsList.map((option: any) => option)}
        value={value}
        placeholder={placeholder}
        onChange={handleSelectChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
        sx={selectStylesSx}
      />
      </FormControl>
    </div>
  );
}


