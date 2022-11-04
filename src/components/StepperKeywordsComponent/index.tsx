import { ChangeEvent, useState, useEffect, SyntheticEvent } from "react";
import { useQuery } from "@apollo/client";
import { Box, Chip, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import { tabNameProps } from "../../types/SearchResultsTabsProps";
import { placesKeyWords } from "../../query/places";
import { eventsKeyWords } from "../../query/events";
import { mediaKeyWords } from "../../query/media";
import TextInput from "../../components/TextInput";

import {
    AutoCompleteContainer,
    AutoCompleteItem,
    AutoCompleteItemButton
} from "./styles";
import { handleEnter } from "../../utils/services/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


const textInputSxStyles = {
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
        border: "none",
    },
    "& .MuiFormLabel-root.MuiInputLabel-root ": {},
    "& .MuiInputBase-input.MuiOutlinedInput-input ": {
        lineHeight: "1.2",
        border: "1.4px solid #fff",
        padding: "0.5em 1em",
        height: "1.4em",
    },
    "& .MuiOutlinedInput-notchedOutline span": {
        opacity: 1,
    },
    "& .MuiOutlinedInput-notchedOutline legend": {
        color: "transparent",
    },
};
const commonFormControlSxStyles = {
    width: "100%",
    flexGrow: 0,
    "& .MuiInputBase-root": {
        backgroundColor: "#fff",
    },
};


interface IData {
    name: [];
}


type PropsPassed = {
    onKeyDown: (str: string) => void
    onDelete: (str: string) => void
    currentKeywordArray: string[] | []
}
export const StepperKeywordsComponent = ({
    onKeyDown,
    onDelete,
    currentKeywordArray
}: PropsPassed) => {
    let { tabName } = useParams<{ tabName?: tabNameProps, uniqueId: string }>();
    const [search, setSearch] = useState({
        text: "",
        suggestions: []
    });
    const { addNewItemWindowType } = useSelector((state: RootState) => state.searchResults);

    let querySelected = addNewItemWindowType === 'Places' ? placesKeyWords : addNewItemWindowType === 'Events' ? eventsKeyWords : mediaKeyWords;
    const { data: keyWordsData, refetch: keyWordsPlaces } = useQuery(querySelected);
    const [isComponentVisible, setIsComponentVisible] = useState(true);

    const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setSearch(state => ({
            ...state,
            text: e.target.value || ''
        }))

        let suggestions: any = [];
        if (value.length > 0) {
            keyWordsPlaces({ text: value });

            for (let i = 0; i < keyWordsData[addNewItemWindowType === 'Places' ? 'places' : addNewItemWindowType === 'Events' ? 'visits' : 'medias']?.data?.length; i++) {
                if (
                    keyWordsData[addNewItemWindowType === 'Places' ? 'places' : addNewItemWindowType === 'Events' ? 'visits' : 'medias']?.data[i]?.attributes?.keywords !== null
                ) {

                    const foundWordArray: string[] = keyWordsData[addNewItemWindowType === 'Places' ? 'places' : addNewItemWindowType === 'Events' ? 'visits' : 'medias']?.data[i].attributes["keywords"].filter((element: string) => element.includes(value))

                    suggestions.push({
                        name: foundWordArray
                    });

                    setIsComponentVisible(true);

                } else {
                    setIsComponentVisible(false);

                }
            }

        } else {
            setIsComponentVisible(false);
            suggestions = []
        }

        setSearch(state => ({ ...state, suggestions: suggestions }));
    };

    const [showList, setShowList] = useState<Array<string> | []>([])

    useEffect(() => {
        let currentList: string[] = []

        if (search.suggestions.length > 0) {

            search.suggestions.forEach((suggestion: { name: Array<string> | [] }) => {

                if (suggestion?.name && suggestion?.name?.length > 0) {
                    for (let val of suggestion.name) {

                        if (!currentList.includes(val)) {

                            currentList.push(val)
                        }
                    }
                }
            })
        }

        setShowList(currentList)

    }, [search])

    const suggestionSelected = (value: any) => {

        setIsComponentVisible(false);
        setSearch({
            text: "",
            suggestions: []
        });
        onKeyDown(value)
    };

    const onDeleteKeyWord = (value: any) => {
        setIsComponentVisible(false)
        onDelete(value)
    }

    console.log('hex: ', search, )
    return (
        <>

            <Box component="div">Make your content discoverable</Box>
            <Box component="div">
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    inputValue={search.text}
                    options={search.text ? showList.map((option) => option) : []}
                    renderInput={(params) => {
                        const newObj = { ...params }

                        delete newObj.inputProps.value

                        return <>
                            <TextInput
                                {...newObj}
                                className={`${styles["english-name"]}`}
                                id="keyword-div"
                                label="Add Keywords"
                                name="keywords"
                                value={search.text}
                                onChange={onTextChanged}
                                onKeyDown={e => {
                                    handleEnter(e, () => {
                                        onKeyDown(search.text)
                                    });
                                }}
                                sx={{
                                    ...textInputSxStyles,
                                }}
                                formControlSx={commonFormControlSxStyles}
                            />
                        </>
                    }}
                    onChange={(event: SyntheticEvent<Element, Event>, value: string | null) => {

                        if (value !== null) {
                            suggestionSelected(value)
                        }
                    }}
                />
                <Box component="div" style={{
                    display: 'flex',
                    gap: '5px',
                    marginTop: "1em",
                    flexWrap: 'wrap'
                }}>
                    {
                        currentKeywordArray && currentKeywordArray.length > 0 && currentKeywordArray.map((item: any, index: any) => (
                            <Chip key={index} size="small" variant="outlined" label={item}
                                deleteIcon={<CloseIcon fontSize="small" />}
                                onDelete={e => { onDeleteKeyWord(item) }}
                            />
                        ))
                    }
                </Box>
                {false && (
                    <Box component="div" style={{
                        position: 'relative',
                        width: '56%'
                    }}>
                        <Box component="div" style={{
                            position: 'absolute',
                            height: '1.4em',
                            top: '-5px',
                            right: 0,
                            zIndex: 2,
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            borderRadius: '50px',
                            border: '1px solid #000'
                        }}
                            onClick={e => {
                                e.preventDefault()
                            }}>
                            <CloseIcon fontSize="small" />
                        </Box>

                        <AutoCompleteContainer>

                            <> {showList?.map((val: string, index) => {

                                /**dont show keywords being already added in chips */
                                if (currentKeywordArray.some(ele => ele === val)) return <></>

                                return (
                                    <div key={index}>
                                        <AutoCompleteItem>
                                            <AutoCompleteItemButton
                                                onClick={(e) => suggestionSelected(val)}
                                            >
                                                {val}
                                            </AutoCompleteItemButton>
                                        </AutoCompleteItem>
                                    </div>
                                )
                            })}</>
                        </AutoCompleteContainer>
                    </Box>
                )}
            </Box>
        </>
    );
};