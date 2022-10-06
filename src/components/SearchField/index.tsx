import React, { useState, ChangeEvent } from "react";
import TextInput from "../TextInput";
import { Avatar, InputAdornment } from "@mui/material";
import SearchIcon from "../SearchField/leading-icon.svg";
import CrossIcon from "../SearchField/trailing-icon.svg";
import styles from './index.module.css'
import CircleSharpIcon from '@mui/icons-material/CircleSharp';

function CustomSearchField(props: {className?: string, handleChange?: (e:ChangeEvent<HTMLInputElement>) => void}) {
  const { className, handleChange } = props;

  const [searchText, setSearchText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)

    if(handleChange) {
      handleChange(e)
    }
  }

  const searchRef = React.createRef()

  return (
    <>
      <TextInput
        className={`${styles['search-field']} ${className}`}
        label="Search" type={"text"}
        // placeholder={false}
        showLabel={false}
        value={searchText}
        onChange={(e) => {
          handleTextChange(e)
          setIsTyping(true)
        }}
        onBlur={e => setIsTyping(false)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{
              cursor: 'pointer'
            }}
              onClick={() => {
                // searchRef.current && searchRef.current.focus()
              }}>
              <Avatar alt="Search icon" src={SearchIcon} sx={{ width: 16, height: 20, backgroundColor: '#fff' }} />
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
              {(searchText === '') ?
                <CircleSharpIcon style={{
                  color: '#fff'
                }} /> :
                <Avatar alt="Cross icon" src={CrossIcon} sx={{ width: 16, height: 20 }} />
              }
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
