import {
    Box,
    Grid,
    Button
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAddNewItemWindowType, toggleAddItemWindowMinimized, toggleNewItemWindow } from "../../store/reducers/searchResultsReducer";
import styles from './index.module.css'

const AddItemCollapsedWindow = () => {
    const { addNewItemWindowType } = useSelector((state: RootState) => state.searchResults);

    const dispatch = useDispatch()

    return (
        <Box
            className={`${styles['wrapper']}`}
            component={"div"}
        >
            <Grid container className={`${styles['container']}`}>
                <Grid item>
                    <Box component="div">
                        Adding {addNewItemWindowType} item <div className={`${styles['gold']}`}>In Progress</div>
                    </Box>
                </Grid>
                <Grid item>
                    <Button
                        variant="text"
                        onClick={(e) => {
                            dispatch(toggleAddItemWindowMinimized(false))
                            dispatch(toggleNewItemWindow(true))
                            dispatch(setAddNewItemWindowType(addNewItemWindowType))
                        }}
                        style={{
                            minWidth: "fit-content",
                            padding: 0,
                            color: "var(--table-black-text)",
                        }}
                    >
                        Show
                    </Button>
                </Grid>
            </Grid>

        </Box>
    );
}

export default AddItemCollapsedWindow;