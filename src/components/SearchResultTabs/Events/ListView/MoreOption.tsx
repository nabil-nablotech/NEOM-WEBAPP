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
import { setDeleteItemType, toggleDeleteConfirmationWindowOpen } from '../../../../store/reducers/searchResultsReducer';
import { EVENTS_TAB_NAME } from '../../../../utils/services/helpers';

const superEditor = getRole() === 'SuperEditor';
const editor = getRole() === 'Editor';

const MoreOptionsComponent = ({
    type,
    record,
    setEdit
}: {
    type: tabNameProps;
    record: Event | Media | MediaAssociateObj;
    setEdit: (payload: { record: Event | Media | MediaAssociateObj, type: tabNameProps }) => void
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };
    const dispatch = useDispatch();

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
                        dispatch(toggleDeleteConfirmationWindowOpen(true))
                        dispatch(setDeleteItemType(EVENTS_TAB_NAME))
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default MoreOptionsComponent;

