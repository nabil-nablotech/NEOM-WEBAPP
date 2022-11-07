import { AppBar, Toolbar, Box, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { ConfirmationModalTypes } from '../../types/CustomModalTypes';
import modalStyles from './index.module.css';
import CloseIcon from '@mui/icons-material/Close';
import Button from "../../components/Button";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleConfirmOpenEdit } from '../../store/reducers/searchResultsReducer';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { tabNameProps } from '../../types/SearchResultsTabsProps';


export const ConfirmationModal = ({
    type,
    open,
    handleClose,
}: ConfirmationModalTypes) => {
    const { addNewItemWindowType } = useSelector((state: RootState) => state.searchResults);
    const dispatch = useDispatch()
    let { tabName } = useParams<{ tabName?: tabNameProps }>();

    const modalTypeEdit = type === "confirm-edit"
    const modalTypeLogout = type === "confirm-logout"

    return <>
        <Dialog
            open={open}
            onClose={handleClose}
            className={`${modalStyles['dialog-wrapper']}`}
            style={{
                zIndex: 3333
            }}
        >

            <Box component="div" className={`${modalStyles['content']}`} sx={{
            }}>
                <Grid container className={`${modalStyles['title-row']}`} style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'flex-end',
                }}>
                    <Grid item className={`${modalStyles['title']}`}>
                        {`${modalTypeEdit ? 'Edit' : 'Delete'} ${tabName ? tabName : ''}`}
                    </Grid>
                    <Grid item sm={1}>
                        <CloseIcon fontSize="large"
                            style={{
                            }}
                        />
                    </Grid>
                </Grid>
                <Box component="div" className={`${modalStyles['sentence']}`}>
                    {
                        modalTypeEdit ?
                            `You already have new item being added . Are you sure you still want to edit this item ?` :
                            `Are you sure you want to delete this item? This action cannot be undone.`
                    }
                </Box>
                <Box
                    component="div"
                    className={`${modalStyles['btn-row']}`}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: '1em'
                    }}
                >
                    <Button
                        colors={["#fff", "var(--table-black-text)", "none"]}
                        label="Cancel"
                        onClick={(e) => {
                            handleClose(e)
                        }}
                        style={{
                            paddingInline: 0,
                        }}
                    />
                    <Button
                        colors={["var(--orange-shade)", "#fff", "none"]}
                        label={modalTypeEdit ? "Edit" : "Delete"}
                        type="button"
                        onClick={e => {
                            dispatch(toggleConfirmOpenEdit(true))
                            handleClose(e)

                        }}
                    />
                </Box>
            </Box>
        </Dialog>
    </>
}