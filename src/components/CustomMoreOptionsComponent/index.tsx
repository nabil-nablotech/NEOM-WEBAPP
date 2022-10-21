import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CustomMoreOptionsComponentProps } from "../../types/SearchResultsTabsProps";

export const CustomMoreOptionsComponent = ({
    menuActions,
    moreIconClassName
}: CustomMoreOptionsComponentProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: any) => {
        e.preventDefault()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="">
                <MoreHorizIcon className={`more-menu-div ${moreIconClassName ? moreIconClassName : ''}`}
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={handleClick}
                />
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
                {
                    menuActions.map((item, inx) => (
                        <MenuItem key={inx} onClick={e => item.action()}>{item.label}</MenuItem>
                    ))
                }
            </Menu>
        </>
    );
};