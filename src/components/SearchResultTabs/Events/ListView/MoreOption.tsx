import { useState, useEffect } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { User } from '../../../../types/User';
import { StyledAntTable } from '../../../StyledAntTable';
import styled from "styled-components";
import { antTablePaginationCss } from '../../../../utils/services/helpers';
import { setEventData } from '../../../../store/reducers/eventReducer';

const MoreOptionsComponent = ({
    record,
    id,
    dispatch
}: {
    id: number;
    record: User;
    dispatch: any
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div
                className=""
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
                        dispatch(setEditEvent(true));
                        dispatch(setEventData(record));
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

