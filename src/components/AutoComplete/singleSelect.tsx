import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from "@mui/material/FormControl";
import { InputAdornment } from "@mui/material";
import { AutoCompleteSingleSelectProps } from '../../types/DropdownComponent';
import SearchIcon from '@mui/icons-material/Search';

export default function FreeSolo({ className, formControlSx, itemsList, value, placeholder, label, selectStylesSx, handleSelectChange }: AutoCompleteSingleSelectProps) {
  return (
    <div className={className}>
      <FormControl sx={{ width: '100%', ...formControlSx }}>
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
          onChange={handleSelectChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: <>
                  <InputAdornment position="start">
                    <SearchIcon sx={{}} />
                  </InputAdornment>
                </>,
                style: {
                  padding: 0,
                  paddingLeft: '0.6em'
                }
            }}
          />
        )}
        sx={{
          ...selectStylesSx
        }}
      />
      </FormControl>
    </div>
  );
}


