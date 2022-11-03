import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";  
import { Place } from '../../../../types/Place';
import { getRole } from "../../../../utils/storage/storage";

const superEditor = getRole() === 'SuperEditor';
const editor = getRole() === 'Editor';

const MoreOptionsComponent = ({
    record,
    setEdit
}: {
    record: any;
    setEdit: (payload: Place) => void
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
                        setEdit(record);
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


