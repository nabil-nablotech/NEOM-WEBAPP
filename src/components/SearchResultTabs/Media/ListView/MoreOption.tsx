import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Media } from "../../../../types/Media";

export const MoreOptionsComponent = ({ setEdit, record, id }: { setEdit: (payload: Media) => void; id: string; record: Media }) => {
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
      <div className="" onClick={handleClick}>
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
          key={2}
          onClick={(e) => {
            e.stopPropagation();
            setEdit(record);
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem key={3}>Delete</MenuItem>
      </Menu>
    </>
  );
};