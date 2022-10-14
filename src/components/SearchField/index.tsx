import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import TextInput from "../TextInput";
import { Avatar, InputAdornment } from "@mui/material";
import SearchIcon from "../SearchField/leading-icon.svg";
import CrossIcon from "../SearchField/trailing-icon.svg";
import styles from './index.module.css'
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from "../../store";
import {setSearchText} from '../../store/reducers/searchResultsReducer';

function CustomSearchField(props: {className?: string; searchText?: string; onKeyDown?: (e:KeyboardEvent<HTMLInputElement>) => void; handleChange?: (e:ChangeEvent<HTMLInputElement>) => void}) {
  const { className, onKeyDown } = props;
  const dispatch = useDispatch();

  const {searchText} = useSelector((state: RootState) => state.searchResults);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  }

  return (
    <>
      <TextInput
        className={`${styles['search-field']} ${className}`}
        label="Search" type={"text"}
        showLabel={false}
        value={searchText}
        onChange={handleTextChange}
        onKeyDown={onKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{
              cursor: 'pointer'
            }}
              onClick={(e) => {
                dispatch(setSearchText(''));
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
