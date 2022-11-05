import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Event } from '../../../../types/Event';
import { Media } from '../../../../types/Media';
import { setEventData, setEventEdit } from '../../../../store/reducers/eventReducer';
import { getRole } from "../../../../utils/storage/storage";
import { tabNameProps } from '../../../../types/SearchResultsTabsProps';

const superEditor = getRole() === 'SuperEditor';
const editor = getRole() === 'Editor';

const MoreOptionsComponent = ({
    type,
    record,
    setEdit
}: {
    type: tabNameProps;
    record: Event | Media;
    setEdit: (payload:{record: Event | Media, type: tabNameProps}) => void
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };
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
                    onClick={() => {
                        setEdit({record, type});
                        handleClose();
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem key={2}>
                   Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default MoreOptionsComponent;
function setEditEvent(arg0: boolean): any {
    throw new Error('Function not implemented.');
}

