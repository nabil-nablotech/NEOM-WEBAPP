import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import FormControl from "@mui/material/FormControl";
import { InputAdornment } from "@mui/material";
import { AutoCompleteSingleSelectProps } from '../../types/DropdownComponent';
import SearchIcon from '@mui/icons-material/Search';
import FomrError from '../FormError';
import CloseIcon from '@mui/icons-material/Close';

export default function FreeSolo({ className, formControlSx, itemsList, value, placeholder, label, defaultValue, selectStylesSx, handleSelectChange, handleChange, renderOption,
  errorField, handleClear }: AutoCompleteSingleSelectProps & {errorField?: string, handleClear?: () => void}) {
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
          options={itemsList}
          value={value}
          defaultValue={defaultValue}
          onChange={handleSelectChange}

          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              onChange={handleChange}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: <>
                  <InputAdornment position="start">
                    <SearchIcon sx={{}} />
                  </InputAdornment>
                </>,
                endAdornment: <>
                  {
                    value?.trim()?.length > 0 &&
                    <InputAdornment position="end">
                      <CloseIcon fontSize='small' sx={{
                        marginRight: 1,
                        cursor: 'pointer'
                      }}
                      onClick={
                        e=> {
                          handleClear && handleClear()
                        }
                      }
                      />
                    </InputAdornment>
                  }
                </>,
                style: {
                  padding: 0,
                  paddingLeft: '0.6em'
                }
            }}
          />
        )}
        sx={{
          ...selectStylesSx,
          '& .MuiFormControl-root' : {
            border: errorField ? '1px solid var(--orange-shade)' : 'inherit',
            borderRadius: errorField ? '4px' : 'inherit',
            
          },
        }}
        getOptionLabel={(option: any) => option?.label || ''}
        renderOption={renderOption}
      />
      </FormControl>
      {
        errorField &&
        <FomrError
          style={{
            marginTop: '3px'
          }}
          msg={errorField}
        />
      }
    </div>
  );
}


