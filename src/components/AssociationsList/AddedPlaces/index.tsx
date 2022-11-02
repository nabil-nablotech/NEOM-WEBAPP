import {
    Box
} from "@mui/material";
import { AddPlacesTypes } from "../../../types/AddItemTypes";
import { Place } from "../../../types/Place";
import styles from '../index.module.css'

const AddedPlaces = ({
    list
}: AddPlacesTypes) => {
    return (
        <Box component="div" className={`${styles["added-places"]}`}>
            <Box component="div" className={`${styles["title"]}`}>Places</Box>
            <Box component="div" className={`${styles["list"]}`}>
                {
                    list?.map((place: Place) => (
                        <Box component="div">
                            Hi
                        </Box>
                    ))
                }
            </Box>
        </Box>
    );
}

export default AddedPlaces;