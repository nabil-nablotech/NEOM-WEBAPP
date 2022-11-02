import {
    Box,
    Grid,
    Button
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleAddItemWindowMinimized } from "../../store/reducers/searchResultsReducer";
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
                <Grid item>Adding {addNewItemWindowType} item in progress</Grid>
                <Grid item>
                    <Button
                        variant="text"
                        onClick={(e) => dispatch(toggleAddItemWindowMinimized(false))}
                        style={{
                            minWidth: "fit-content",
                            textTransform: 'unset',
                            padding: 0,
                            color: "var(--table-black-text)",
                        }}
                    >
                        Show
                    </Button>
                </Grid>
                <Grid item></Grid>
            </Grid>

        </Box>
    );
}

export default AddItemCollapsedWindow;