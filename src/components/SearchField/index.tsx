import React, { useState } from "react";
import TextInput from "../TextInput";
import { Avatar, InputAdornment } from "@mui/material";
import SearchIcon from "../SearchField/leading-icon.svg";
import CrossIcon from "../SearchField/trailing-icon.svg";


function CustomSearchField(props: {className?: string}) {
  const { className } = props;

  const [searchText, setSearchText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const searchRef = React.createRef()

  return (
    <>
      <TextInput
        className={`search-field`}
        label="Search" type={"text"}
        // placeholder={false}
        showLabel={false}
        value={searchText} onChange={(e) => handleChange(e)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{
              cursor: 'pointer'
            }}
              onClick={() => {
                // searchRef.current && searchRef.current.focus()
              }}>
              <Avatar alt="Search icon" src={SearchIcon} sx={{ width: 16, height: 20 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start"
              sx={{
                cursor: 'pointer',
                marginRight: 0
              }}
              onClick={() => {
                setSearchText('')
              }}
            >
              <Avatar alt="Cross icon" src={CrossIcon} sx={{ width: 16, height: 20 }} />
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiInputBase-input ': {
            backgroundColor: '#fff'
          }
        }}
        // ref={searchRef}
      />
    </>
  );
}

// 
export default CustomSearchField;
