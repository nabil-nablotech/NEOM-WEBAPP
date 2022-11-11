import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";  
import { PlaceApi, Place } from '../../../../types/Place';
import { Event } from '../../../../types/Event';
import { getRole } from "../../../../utils/storage/storage";
import { tabNameProps } from '../../../../types/SearchResultsTabsProps';
import { Media } from '../../../../types/Media';
import { useDispatch } from 'react-redux';
import { setDeleteItemType, setDeletePayload, toggleDeleteConfirmationWindowOpen } from '../../../../store/reducers/searchResultsReducer';
import { LIBRARY_TAB_NAME, PLACES_TAB_NAME } from '../../../../utils/services/helpers';
import { deleteRecord } from '../../../../api/delete';

const superEditor = getRole() === 'SuperEditor';
const editor = getRole() === 'Editor';

const MoreOptionsComponent = ({
    type,
    record,
    setEdit
}: {
    type: tabNameProps
    record: any;
    setEdit: (payload: {record: PlaceApi | Place | Media | Event, type: tabNameProps}) => void
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const dispatch = useDispatch();
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
                style={{
                    display: 'flex',
                    justifyContent: 'end'
                }}
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
                        setEdit({record, type});
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
                        dispatch(setDeleteItemType(type === "Library" ? LIBRARY_TAB_NAME : PLACES_TAB_NAME))
                        dispatch(setDeletePayload({
                            visit_associates_id: [], 
                            media_associates_id: record?.attributes?.media_associates?.data.map((item: any) => item?.attributes?.media_unique_id?.data?.id),
                            remark_headers_id: [],
                            visit: [],
                            id: record.id
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


