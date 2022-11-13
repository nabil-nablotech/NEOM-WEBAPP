import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Media } from "../../../../types/Media";
import { setDeleteItemType, setDeletePayload, toggleDeleteConfirmationWindowOpen } from "../../../../store/reducers/searchResultsReducer";
import { isRecordHavingAssociations, MEDIA_TAB_NAME } from "../../../../utils/services/helpers";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export const MoreOptionsComponent = ({ setEdit, record, id }: { setEdit: (payload: Media) => void; id: string; record: any }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { media } = useSelector(
    (state: RootState) => state.searchResults
)
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
        <MenuItem key={3}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleDeleteConfirmationWindowOpen({
              flag: true,
              isAssociatedToPlacesOrEvents: media ? isRecordHavingAssociations(
                media.filter(item => item?.id === record?.media_unique_id?.id?.toString())[0]
              ) : false,
            }))
            dispatch(setDeleteItemType(MEDIA_TAB_NAME))
            dispatch(setDeletePayload({
              id: typeof record.id === 'string' ? parseInt(record.id) : record.id
            }))
          }}
        >Delete</MenuItem>
      </Menu>
    </>
  );
};