import {
    Box
} from "@mui/material";
import { AddPlacesTypes } from "../../../types/AddItemTypes";
import { Place } from "../../../types/Place";
import styles from '../index.module.css'
import InventoryItem from "../ItemRow";
import { useDispatch, useSelector } from "react-redux";
import { modifyAssociatedPlaces } from "../../../store/reducers/searchResultsReducer";
import { RootState } from "../../../store";

const AddedPlaces = ({
    list
}: AddPlacesTypes) => {

    const dispatch = useDispatch()

    const { associatedPlaces } = useSelector(
        (state: RootState) => state.searchResults
      );

    const handleRemoveItem = (e: React.MouseEvent, uniqueId: string) => {
        dispatch(modifyAssociatedPlaces(associatedPlaces.filter((place: Place) => place.attributes.uniqueId !== uniqueId)))
    }

    if(list.length === 0) return <></>

    return (
        <Box component="div" className={`${styles["added-places"]}`}>
            <Box component="div" className={`${styles["title"]}`}>Places</Box>
            <Box component="div" className={`${styles["list"]}`}>
                {
                    list?.map((place: Place) => (
                        <Box component="div">
                            <InventoryItem
                                item={place}
                                handleRemoveItem={handleRemoveItem}
                            />
                        </Box>
                    ))
                }
            </Box>
        </Box>
    );
}

export default AddedPlaces;