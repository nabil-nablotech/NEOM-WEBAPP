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
import Button from "../../components/Button";
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

type CustomChipTypes = {
    index: number
    item: string
    currentKeywordArray: string[] | []
    onDeleteKeyWord: (value: any) => void
    suggestionSelected: (value: any) => void
}

const CustomChip = ({
    index,
    item,
    currentKeywordArray,
    onDeleteKeyWord,
    suggestionSelected
}: CustomChipTypes) => {
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
    const [currentlyShownList, setCurrentlyShownList] = useState<string[] | []>([])
    const [preloadedKeywordsList, setPreloadedKeywordsList] = useState<string[] | []>([])
    const [selectAll, setSelectAll] = useState<boolean>(false)

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

    const loadKeywordsList = async () => {
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

        setCurrentlyShownList(list)
        setPreloadedKeywordsList(list)
    }

    useEffect(() => {
        loadKeywordsList()
    }, [])

    useEffect(() => {

        let newList: string[] | [] = [...currentlyShownList]

        if (
            (currentKeywordArray.length > 0) &&
            (currentlyShownList.length === 0)
        ) {
            newList = [...currentKeywordArray]
        }

        if (
            (currentKeywordArray.length > 0) &&
            (currentlyShownList.length > 0)
        ) {
            currentKeywordArray.forEach((item: string) => {
                if (!detectLowerCaseStringInArray(item, currentlyShownList)) {

                    newList = [item, ...newList]
                }
            })
        }
        setCurrentlyShownList(newList)

    }, [currentKeywordArray, currentlyShownList.length > 0])


    useEffect(() => {
        /** set dropdown list based on inputs */
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

    }, [search, currentlyShownList])

    const suggestionSelected = (value: any) => {

        if (value && (value !== '')) {

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

        if (!detectLowerCaseStringInArray(value, preloadedKeywordsList)) {
            setCurrentlyShownList(state => state.filter(item => item !== value))
        }
    }

    const handleSelectAll = () => {
        setSelectAll(state => !state)
        if (currentlyShownList.length > 0) {
            if (!selectAll) { // reverse flag
                currentlyShownList.forEach(val => {
                    suggestionSelected(val)
                })

            } else {
                currentKeywordArray.forEach(val => {
                    onDeleteKeyWord(val)
                })
            }
        }
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
                <Box component="div">
                    <Button
                        colors={["#fff", "var(--table-black-text)", "none"]}
                        className={`${styles["plain-whitee-btn"]}`}
                        label={selectAll ? "Remove all" : "Select all"}
                        onClick={e => {
                            handleSelectAll()
                        }}
                        style={{
                            paddingInline: 0,
                            paddingBlock: 0,
                            marginTop: '1em',
                            lineHeight: '1em',
                            height: 'fit-content'
                        }}
                    />
                </Box>
                <Box component="div" style={{
                    display: 'flex',
                    gap: '5px',
                    marginTop: "1em",
                    flexWrap: 'wrap'
                }}>
                    {
                        currentlyShownList && currentlyShownList.length > 0 && currentlyShownList.map((item: string, index: any) => <>
                            <CustomChip
                                index={index}
                                item={item}
                                currentKeywordArray={currentKeywordArray}
                                onDeleteKeyWord={onDeleteKeyWord}
                                suggestionSelected={suggestionSelected}
                            />
                        </>
                        )
                    }
                </Box>
            </Box>
        </>
    );
};