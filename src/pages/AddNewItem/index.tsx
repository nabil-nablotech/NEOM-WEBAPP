import { Box, Typography, Button as DefaultButton } from "@mui/material";
import { AddNewItemProps } from "../../types/CustomDrawerTypes";
import placeStyles from '../../components/SearchResultTabs/Places/AddNewItem/index.module.css'
import styles from './index.module.css'
import Button from "../../components/Button";

const StepContent = () => {

    return <Box component="div">
        Hellp
    </Box>
}

const AddNewItem = ({
    onClose
}: AddNewItemProps) => {
    return (
        <Box component={"div"} className={`${styles['add-new-item-parent']}`}>
            <Box component="div" className={`${placeStyles['add-new-item-container']}`}>

                <Box component="div" className={`${placeStyles['content-section']}`}>
                    <Box component="div" className={`${placeStyles['hide-btn']}`}
                        style={{
                            marginRight: 0,
                            marginLeft: 'auto',
                            width: 'fit-content'
                        }}>
                        <DefaultButton variant="text" onClick={e => onClose()}
                            style={{
                                // paddingInline: 0,
                                minWidth: 'fit-content',
                                padding: 0,
                                color: 'var(--table-black-text)'
                            }}
                        >Hide</DefaultButton>
                    </Box>
                    <Typography className={`${placeStyles['add-title']}`} variant="h4" component="h4" style={{
                    }}>
                        Add New Item
                    </Typography>
                    <>
                        <StepContent
                        />
                    </>
                </Box>
                <Box component="div"
                    className={`${placeStyles["btn-row"]}`}
                    sx={{
                        display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        colors={["#fff", "var(--table-black-text)", "none"]}
                        className={`${placeStyles["plain-whitee-btn"]}`}
                        label={'Cancel'}
                        onClick={e => onClose()}
                        style={{
                            paddingInline: 0
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default AddNewItem;