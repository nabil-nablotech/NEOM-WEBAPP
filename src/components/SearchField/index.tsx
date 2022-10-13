import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import TextInput from "../TextInput";
import { Avatar, InputAdornment } from "@mui/material";
import SearchIcon from "../SearchField/leading-icon.svg";
import CrossIcon from "../SearchField/trailing-icon.svg";
import styles from './index.module.css'
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import { useQuery } from "@apollo/client";
import { places, events } from "../../query/search";

function CustomSearchField(props: {className?: string; onKeyDown?: (e:KeyboardEvent<HTMLInputElement>) => void; handleChange?: (e:ChangeEvent<HTMLInputElement>) => void}) {
  const { loading:placeLoading, error:placeError, data:placeData, refetch:placeRefetch } = useQuery(places);
  const { loading:loadingEvent, error:erroEvent, data:eventData, refetch:eventRefetch } = useQuery(events);
  const { className, handleChange, onKeyDown } = props;
  const [searchText, setSearchText] = useState('')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    let wordsArray = searchText.split(' ');
    if(wordsArray.length>=2){
      placeRefetch({ search_one: wordsArray[0], search_two:wordsArray[1]});
      // eventRefetch({ search_one: wordsArray[0], search_two:wordsArray[1]});
    }

    if(handleChange) {
      handleChange(e)
    }
  }

  return (
    <>
    {
      console.log('places data ===================>',placeData?.places?.data)
    }
    {/* {
      console.log('Events data ===================>',eventData?.events?.data)
    } */}
      <TextInput
        className={`${styles['search-field']} ${className}`}
        label="Search" type={"text"}
        showLabel={false}
        value={searchText}
        onChange={(e) => {
          handleTextChange(e)
        }}
        onKeyDown={onKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{
              cursor: 'pointer'
            }}
              onClick={(e) => {
                console.log(" i am here")
                
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
