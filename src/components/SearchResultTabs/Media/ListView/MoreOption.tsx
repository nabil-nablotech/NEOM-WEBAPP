import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Media } from "../../../../types/Media";

export const MoreOptionsComponent = ({ record, id }: { id: string; record: Media }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    // const showRecoveryLink = record.recoveryToken;
    return (
      <>
        <div className="">
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
          <MenuItem key={1}>Menu 1</MenuItem>
          <MenuItem key={2}>Menu 2</MenuItem>
        </Menu>
      </>
    );
  };