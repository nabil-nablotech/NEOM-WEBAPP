import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Event } from '../../../../types/Event';
import { Media } from '../../../../types/Media';
import { setEventData, setEventEdit } from '../../../../store/reducers/eventReducer';
import { getRole } from "../../../../utils/storage/storage";
import { tabNameProps } from '../../../../types/SearchResultsTabsProps';
import { MediaAssociateObj } from '../../../../types/Place';
import { useDispatch } from 'react-redux';
import { setDeleteItemType, setDeletePayload, toggleDeleteConfirmationWindowOpen } from '../../../../store/reducers/searchResultsReducer';
import { EVENTS_TAB_NAME, LIBRARY_TAB_NAME, MEDIA_TAB_NAME } from '../../../../utils/services/helpers';
import { useParams } from 'react-router-dom';

const superEditor = getRole() === 'SuperEditor';
const editor = getRole() === 'Editor';

const MoreOptionsComponent = ({
    type,
    record,
    setEdit
}: {
    type: tabNameProps;
    record: any;
    setEdit: (payload: { record: Event | Media | MediaAssociateObj, type: tabNameProps }) => void
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };
    const dispatch = useDispatch();
    const { tabName } = useParams<{ tabName: tabNameProps }>();

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div
                className=""
                onClick={handleClick}
            >
                <MoreHorizIcon className="more-menu-div" />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    key={1}
                    onClick={(e) => {
                        e.stopPropagation();
                        setEdit({ record: record, type });
                        handleClose();
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem key={2}
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleDeleteConfirmationWindowOpen({
                            flag: true,
                            isAssociatedToPlacesOrEvents: false,
                        }))
                        dispatch(setDeleteItemType(
                            type === "Library" ? LIBRARY_TAB_NAME : MEDIA_TAB_NAME 
                        ))

                        dispatch(setDeletePayload({
                            id: tabName === EVENTS_TAB_NAME ? (
                                (type === "Media" || type === "Library") ?  record?.media_unique_id?.id : 
                                typeof record.id === 'string' ? parseInt(record.id) : record.id
                            ) : record.id,
                            
                        }))
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default MoreOptionsComponent;

