import { AppBar, Toolbar, Box, Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
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
import { getSingleInventoryNameFromTabName, PLACES_TAB_NAME } from '../../utils/services/helpers';
import { useState, useEffect } from 'react';

const DeleteInventoryForm = () => {
    const { itemAboutToDelete } = useSelector((state: RootState) => state.searchResults);

    const [checkList, setCheckList] = useState<Array<boolean>>([])

    useEffect(() => {
        if (itemAboutToDelete === PLACES_TAB_NAME) {
            setCheckList(checkList.fill(false, 0, 4))
        }
    }, [itemAboutToDelete])

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, itemNo: number) => {
        setCheckList(state => {
            let newCheckList = [...state]
            newCheckList.fill(!state[itemNo - 1], itemNo - 1, itemNo)
            return newCheckList
        })
    }

    if (itemAboutToDelete === PLACES_TAB_NAME) {

        return <>
            <FormGroup sx={{
                '& .MuiFormControlLabel-root': {
                    marginRight: 0
                }
            }}>
                <FormControlLabel control={
                    <Checkbox style={{ color: "var(--orange-shade)" }} checked={checkList[0]} onChange={e => {
                        handleChecked(e, 1)
                    }} />
                }
                    label={`All the ${getSingleInventoryNameFromTabName(itemAboutToDelete)} information will be deleted`}
                />
                <FormControlLabel control={
                    <Checkbox style={{ color: "var(--orange-shade)" }} checked={checkList[1]} onChange={e => {
                        handleChecked(e, 2)
                    }} />
                }
                    label="All media items linked to this place will be deleted"
                />
                <FormControlLabel control={
                    <Checkbox style={{ color: "var(--orange-shade)" }} checked={checkList[2]} onChange={e => {
                        handleChecked(e, 3)
                    }} />
                }
                    label="All library items linked to this place will be deleted"
                />
                <FormControlLabel control={
                    <Checkbox style={{ color: "var(--orange-shade)" }} checked={checkList[3]} onChange={e => {
                        handleChecked(e, 4)
                    }} />
                }
                    label="All remarks will be deleted"
                />
                <FormControlLabel control={
                    <Checkbox style={{ color: "var(--orange-shade)" }} checked={checkList[4]} onChange={e => {
                        handleChecked(e, 5)
                    }} />
                }
                    label="All the events linked to this place and their information, library items, media items and remarks will also be deleted"
                />
            </FormGroup>
        </>
    }

    return <></>

}
export const ConfirmationModal = ({
    type,
    open,
    handleClose,
}: ConfirmationModalTypes) => {
    const { addNewItemWindowType, addItemWindowMinimized } = useSelector((state: RootState) => state.searchResults);
    const dispatch = useDispatch()
    let { tabName } = useParams<{ tabName?: tabNameProps }>();

    const modalTypeEdit = type === "confirm-edit"
    const modalTypeDelete = type === "confirm-delete"
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
                        {`${modalTypeEdit ? 'Edit' : modalTypeDelete ? 'Delete' : 'Logout'} ${tabName ? tabName : ''}`}
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
                            modalTypeDelete ?
                                `Are you sure you want to delete this item? This action cannot be undone.` :
                                `Are you sure you want to logout? This action cannot be undone.`
                    }
                </Box>
                {
                    modalTypeDelete &&
                    <DeleteInventoryForm />
                }
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
                        label={modalTypeEdit ? 'Edit' : modalTypeDelete ? 'Delete' : 'Logout'}
                        type="button"
                        onClick={e => {
                            if (modalTypeEdit) {
                                dispatch(toggleConfirmOpenEdit(true))
                            }
                            handleClose(e)

                        }}
                    />
                </Box>
            </Box>
        </Dialog>
    </>
}