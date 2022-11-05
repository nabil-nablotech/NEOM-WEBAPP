import { ChangeEvent, useState, useEffect, SyntheticEvent } from "react";
import { useQuery } from "@apollo/client";
import { Box, Chip, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import styles from "./index.module.css";
import { placesAddKeyWords } from "../../query/places";
import { eventsAddKeyWords } from "../../query/events";
import { mediaAddKeyWords } from "../../query/media";
import TextInput from "../../components/TextInput";

import { detectLowerCaseStringInArray, handleEnter } from "../../utils/services/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { graphQlHeaders } from "../../utils/services/interceptor";


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

type keyWord = {
    keywords: string[] | []
    __typename: string
    id: number
}

type parent = {
    attributes: keyWord
    __typename: string
    id: number
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

    const [search, setSearch] = useState({
        text: "",
        suggestions: []
    });
    const { addNewItemWindowType } = useSelector((state: RootState) => state.searchResults);
    const [completeList, setCompleteList] = useState<string[] | []>([])

    const apiKeyword = addNewItemWindowType === 'Places' ? 'places' : addNewItemWindowType === 'Events' ? 'visits' : 'medias'

    let querySelected = addNewItemWindowType === 'Places' ? placesAddKeyWords : addNewItemWindowType === 'Events' ? eventsAddKeyWords : mediaAddKeyWords;

    const { data: keyWordsData, refetch: keyWordsPlaces } = useQuery(querySelected, graphQlHeaders());

    const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setSearch(state => ({
            ...state,
            text: e.target.value || ''
        }))

        let suggestions: any = [];
        if (value.length > 0) {
            keyWordsPlaces({ text: value });

            for (let i = 0; i < keyWordsData[apiKeyword]?.data?.length; i++) {
                if (
                    keyWordsData[apiKeyword]?.data[i]?.attributes?.keywords !== null
                ) {

                    const foundWordArray: string[] = keyWordsData[apiKeyword]?.data[i].attributes["keywords"].filter((element: string) => element.toLowerCase().includes(value.toLowerCase()))

                    suggestions.push({
                        name: foundWordArray
                    });


                } else {

                }
            }

        } else {
            suggestions = []
        }

        setSearch(state => ({ ...state, suggestions: suggestions }));
    };

    const [showList, setShowList] = useState<Array<string> | []>([])

    const defaultList = async () => {
        const data = await keyWordsPlaces({ text: '' });

        // console.log('hex: ref:', data.data[apiKeyword].data.map((item: parent) => item.attributes.keywords))

        const list: string[] = []

        data.data[apiKeyword].data.forEach((item: parent) => {


            const dataKeywordsArray = item.attributes.keywords //array

            if (dataKeywordsArray?.length > 0) {
                dataKeywordsArray.forEach((word: string) => {

                    if (!detectLowerCaseStringInArray(word, list)) {
                        list.push(word)
                    }
                })
            }
        })


        setCompleteList(list)
    }

    useEffect(() => {
        defaultList()
    }, [])

    useEffect(() => {

        let newList: string[] | [] = [...completeList]

        if (
            (currentKeywordArray.length > 0) &&
            (completeList.length === 0)
        ) {
            newList = [...currentKeywordArray]
        }

        if (
            (currentKeywordArray.length > 0) &&
            (completeList.length > 0)
        ) {
            currentKeywordArray.forEach((item: string) => {
                if (!detectLowerCaseStringInArray(item, completeList)) {

                    newList = [item, ...newList]
                }
            })
        }

        setCompleteList(newList)

    }, [currentKeywordArray, completeList.length > 0])


    useEffect(() => {
        let currentList: string[] = []

        if (search.suggestions.length > 0) {

            search.suggestions.forEach((suggestion: { name: Array<string> | [] }) => {

                if (suggestion?.name && suggestion?.name?.length > 0) {
                    for (let val of suggestion.name) {

                        if (!detectLowerCaseStringInArray(val, currentList)) {
                            currentList.push(val)
                        }
                    }
                }
            })
        }

        setShowList(currentList)

    }, [search, completeList])

    const suggestionSelected = (value: any) => {

        if (value && value !== '') {

            if (!detectLowerCaseStringInArray(value, currentKeywordArray)) {
                setSearch({
                    text: "",
                    suggestions: []
                });
                onKeyDown(value)
            }
        }

    };

    const onDeleteKeyWord = (value: any) => {
        onDelete(value)
    }

    const CustomChip = ({
        index,
        item
    }: { index: number, item: string }) => {
        let isSelected = false

        if (currentKeywordArray.length > 0) {
            // @ts-ignore
            isSelected = currentKeywordArray.includes(item)
        }

        const handleClick = (e: React.MouseEvent) => {
            e.preventDefault()
            if (isSelected) {
                onDeleteKeyWord(item)
            } else {
                suggestionSelected(item)
            }
        }

        return <>
            <Box component="div" key={index} onClick={e => {
                handleClick(e)
            }}>

                <Chip size="small" variant="outlined" label={item}
                    deleteIcon={
                        isSelected ? <CloseIcon fontSize="small"
                            style={{
                                color: isSelected ? 'inherit' : 'gray'
                            }}
                        /> :
                            <AddIcon fontSize="small" />
                    }
                    clickable={true}
                    onDelete={e => {
                        /**dont delete else icons wont appear */
                        handleClick(e)
                    }}
                    sx={{
                        border: isSelected ? '1px solid #000' : '1px dashed gray',
                        color: isSelected ? 'inherit' : 'gray',
                        borderRadius: '10px'
                    }}
                />
            </Box>
        </>

    }

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
                                        suggestionSelected(search.text)
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
                        completeList && completeList.length > 0 && completeList.map((item: string, index: any) => <>
                            <CustomChip
                                index={index}
                                item={item}
                            />
                        </>
                        )
                    }
                </Box>
            </Box>
        </>
    );
};