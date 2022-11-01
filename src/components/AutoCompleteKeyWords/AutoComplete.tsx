import { ChangeEvent, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Chip } from '@mui/material';
import {setSelectedValue} from '../../store/reducers/refinedSearchReducer';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import CloseIcon from '@mui/icons-material/Close';
import { placesKeyWords } from "../../query/places";
import { eventsKeyWords } from "../../query/events";
import { mediaKeyWords } from "../../query/media";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import { tabNameProps } from "../../types/SearchResultsTabsProps";

import {
  AutoCompleteContainer,
  Input,
  AutoCompleteItem,
  AutoCompleteItemButton
} from "./styles";

interface IData {
  name: string;
}
export const AutoComplete = () => {
let { tabName } = useParams<{ tabName?: tabNameProps, uniqueId: string }>();
  const [search, setSearch] = useState({
    text: "",
    suggestions: []
  });
  const { selectedValue } = useSelector(
    (state: RootState) => state.refinedSearch
  );
  const dispatch = useDispatch();
  let querySelected = tabName==='Places'?placesKeyWords:tabName==='Events'?eventsKeyWords:mediaKeyWords;
  const { loading:keyWordsLoading, error:keyWordsErrorData, data:keyWordsData, refetch:keyWordsPlaces} = useQuery(querySelected);
  const [isComponentVisible, setIsComponentVisible] = useState(true);
//   useEffect(() => {

//   }, [tabName]);
  
  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions:any = [];
    if (value.length > 0) {
        keyWordsPlaces({text:value});
        for (let i = 0; i < keyWordsData[tabName==='Places'?'places':tabName==='Events'?'visits':'medias']?.data?.length; i++) {
            if (keyWordsData[tabName==='Places'?'places':tabName==='Events'?'visits':'medias']?.data[i]?.attributes?.keywords!==null) {
                suggestions.push({
                name: keyWordsData[tabName==='Places'?'places':tabName==='Events'?'visits':'medias']?.data[i].attributes["keywords"]
                });
          }
        }
    }
    setIsComponentVisible(true);
    setSearch({suggestions:suggestions, text: value });
  };
  const selectedValueCopy = JSON.parse(JSON.stringify(selectedValue));
  const suggestionSelected = (value:IData) => {
    const val:any = value.name[0];
    setIsComponentVisible(false);
    if(!selectedValueCopy['keyWords']?.includes(val)){
            selectedValueCopy['keyWords'].push(val);
            dispatch(setSelectedValue(selectedValueCopy));
    }
    setSearch({
      text: "",
      suggestions: []
    });
  };

  const onDeleteKeyWord = (value:any)=>{
        selectedValueCopy['keyWords'] = selectedValueCopy['keyWords'].filter((element: string) => element !== value);
        dispatch(setSelectedValue(selectedValueCopy));
  }

  return (
    <>
      <div
        onClick={() => setIsComponentVisible(false)}
        style={{
          display: isComponentVisible ? "block" : "none",
          backgroundColor: "transparent",
          position: "fixed",
          zIndex: 0,
          top: 0,
          left: 0
        }}
      />
      <div >
        <Input
          className={`${styles["dropdown"]} ${styles["extra-width"]}`}
          id="input"
          autoComplete="off"
          value={search.text}
          onChange={onTextChanged}
          type={"text"}
          placeholder="Keywords"
        />
        {
            <Box component="div" style={{
                display: 'flex',
                gap: '5px',
                marginTop:"5px"
            }}>
                {
                    selectedValueCopy&&selectedValueCopy?.keyWords && selectedValueCopy?.keyWords?.map((item: any, index: any) => (
                        <Chip key={index} size="small" variant="outlined" label={item}
                            deleteIcon={<CloseIcon fontSize="small" />}
                            onDelete={e => {onDeleteKeyWord(item)}}
                        />
                    ))
                }
            </Box>
        }
        
      </div>
      {search?.suggestions.length > 0 && isComponentVisible && (
        <AutoCompleteContainer>
          {search?.suggestions.map((item: IData, index) => (
            <AutoCompleteItem key={index}>
              <AutoCompleteItemButton
                key={index}
                onClick={() => suggestionSelected(item)}
              >
                {item.name}
              </AutoCompleteItemButton>
            </AutoCompleteItem>
          ))}
        </AutoCompleteContainer>
      )}
    </>
  );
};