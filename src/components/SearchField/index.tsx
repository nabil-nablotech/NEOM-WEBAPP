import React, { ChangeEvent, KeyboardEvent, Ref, useRef } from "react";
import TextInput from "../TextInput";
import { Avatar, InputAdornment } from "@mui/material";
import SearchIcon from "../SearchField/leading-icon.svg";
import CrossIcon from "../SearchField/trailing-icon.svg";
import styles from './index.module.css'
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from "../../store";
import {setSearchText} from '../../store/reducers/searchResultsReducer';

function CustomSearchField(props: {
  className?: string;
  searchText?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleClearSearchText?: () => void;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleChangeParent?: (e: ChangeEvent<HTMLInputElement>) => void
  shouldHandleChangeFromParent?: boolean,
  valueFromParent?: string
}) {
  const { className, onKeyDown, handleChangeParent, handleClearSearchText,
    shouldHandleChangeFromParent, valueFromParent } = props;
  const dispatch = useDispatch();

  let {searchText} =  useSelector((state: RootState) => state.searchResults);

  if(shouldHandleChangeFromParent && valueFromParent) {
    searchText = valueFromParent
  }
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(shouldHandleChangeFromParent && handleChangeParent) {
      handleChangeParent(e)
    } else {
      dispatch(setSearchText(e.target.value));
    }
  }

  return <>
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
            onClick={() => console.log('clicking on adornment')}
          >
            <Avatar alt="Search icon" src={SearchIcon} sx={{ width: 16, height: 20, backgroundColor: '#fff' }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start"
            sx={{
              cursor: 'pointer',
              marginRight: 0
            }}
            onClick={handleClearSearchText}
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
}

// 
export default CustomSearchField;
