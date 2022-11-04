import { ChangeEvent, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Box, Chip } from '@mui/material';
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

    let querySelected = tabName === 'Places' ? placesKeyWords : tabName === 'Events' ? eventsKeyWords : mediaKeyWords;
    const { data: keyWordsData, refetch: keyWordsPlaces } = useQuery(querySelected);
    const [isComponentVisible, setIsComponentVisible] = useState(true);

    const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let suggestions: any = [];
        if (value.length > 0) {
            keyWordsPlaces({ text: value });

            for (let i = 0; i < keyWordsData[tabName === 'Places' ? 'places' : tabName === 'Events' ? 'visits' : 'medias']?.data?.length; i++) {
                if (
                    keyWordsData[tabName === 'Places' ? 'places' : tabName === 'Events' ? 'visits' : 'medias']?.data[i]?.attributes?.keywords !== null
                ) {

                    const foundWordArray: string[] = keyWordsData[tabName === 'Places' ? 'places' : tabName === 'Events' ? 'visits' : 'medias']?.data[i].attributes["keywords"].filter((element: string) => element.includes(value))

                    suggestions.push({
                        name: foundWordArray
                    });

                    setShouldRenderList(true)
                } else {
                    setShouldRenderList(false)
                }
            }

        } else {
            setShouldRenderList(false)
            suggestions = []
        }
        setIsComponentVisible(true);
        setSearch({ suggestions: suggestions, text: value });
    };

    const [shouldRenderList, setShouldRenderList] = useState<boolean>()

    useEffect(() => {

        setShouldRenderList(
            search?.text.length > 0 &&
            (
                search?.suggestions.length > 0 &&
                search?.suggestions.some((value: { name: string[] }) => value.name && value.name.length > 0)
            ) &&
            isComponentVisible
        )

    }, [search?.text, search?.suggestions.length, isComponentVisible])

    const suggestionSelected = (e: React.MouseEvent, value: any) => {

        setIsComponentVisible(false);
        setSearch({
            text: "",
            suggestions: []
        });
        setShouldRenderList(false)
        onKeyDown(value)
    };

    const onDeleteKeyWord = (value: any) => {
        setIsComponentVisible(false)
        onDelete(value)
    }

    return (
        <>

            <Box component="div">Make your content discoverable</Box>
            <div >
                <TextInput
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
                {
                    <Box component="div" style={{
                        display: 'flex',
                        gap: '5px',
                        marginTop: "5px"
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
                }

            </div>
            {shouldRenderList && (
                <AutoCompleteContainer>
                    {search?.suggestions.map((item: IData, index_) => (
                        <> {item.name?.map((val, index) => {

                            /**dont show keywords being already added in chips */
                            if (currentKeywordArray.some(ele => ele === val)) return <></>

                            return (
                                <div key={index_}>
                                    <AutoCompleteItem key={index}>
                                        <AutoCompleteItemButton
                                            key={index}
                                            onClick={(e) => suggestionSelected(e, val)}
                                        >
                                            {val}
                                        </AutoCompleteItemButton>
                                    </AutoCompleteItem>
                                </div>
                            )
                        })}</>
                    ))}
                </AutoCompleteContainer>
            )}
        </>
    );
};