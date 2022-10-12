import React, { useState, ChangeEvent } from "react";
import TextInput from "../TextInput";
import { Avatar, InputAdornment } from "@mui/material";
import SearchIcon from "../SearchField/leading-icon.svg";
import CrossIcon from "../SearchField/trailing-icon.svg";
import styles from './index.module.css'
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import { useQuery } from "@apollo/client";
import { places, events } from "../../api/search";

function CustomSearchField(props: {className?: string, handleChange?: (e:ChangeEvent<HTMLInputElement>) => void}) {
  const { loading:placeLoading, error:placeError, data:placeData, refetch:placeRefetch } = useQuery(places);
  const { loading:loadingEvent, error:erroEvent, data:eventData, refetch:eventRefetch } = useQuery(events);
  const { className, handleChange } = props;
  const [searchText, setSearchText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let wordsArray = searchText.split(' ');
    if(wordsArray.length>=2){
      placeRefetch({ search1: wordsArray[0], search2:wordsArray[1]});
      eventRefetch({ search1: wordsArray[0], search2:wordsArray[1]});
    }

    setSearchText(e.target.value)
    
    if(handleChange) {
      handleChange(e)
      
    }
  }

  const searchRef = React.createRef()

  return (
    <>
    {
      console.log('places data ===================>',placeData?.places?.data)
    }
    {
      console.log('Events data ===================>',eventData?.events?.data)
    }
      <TextInput
        className={`${styles['search-field']} ${className}`}
        label="Search" type={"text"}
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
