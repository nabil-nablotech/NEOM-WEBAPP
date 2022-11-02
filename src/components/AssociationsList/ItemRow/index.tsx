import {
    Box,
    Grid,
    Button
} from "@mui/material";
import { InventoryItemTypes } from "../../../types/AddItemTypes";
import styles from '../index.module.css'
import CloseIcon from '@mui/icons-material/Close';

const InventoryItem = ({
    item,
    handleRemoveItem
}: InventoryItemTypes) => {


    return (
        <Box component="div" className={`${styles["inventory-item"]}`}>
            <Grid container className={`${styles['container']}`}>
                <Grid item>{item.attributes.placeNameEnglish}</Grid>
                <Grid item>{item.attributes.placeNameArabic}</Grid>
                <Grid item className={`${styles["right-section"]}`} sx={{
                        marginLeft: 'auto'
                    }}>
                    <Grid container className={`${styles['right-container']}`} >
                        <Grid>{item.attributes.placeNumber}</Grid>
                        <Grid>
                            <Button variant="text" onClick={e => handleRemoveItem(e, item.attributes.uniqueId)}
                                style={{
                                    minWidth: 'fit-content',
                                    padding: 0,
                                    color: 'var(--table-black-text)'
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default InventoryItem;