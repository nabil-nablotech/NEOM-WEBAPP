import ItemDetached from '../../../assets/images/searchResults/ItemDetached.svg';
import ItemAttached from '../../../assets/images/searchResults/ItemAttached.svg';
import {
    Box,
  } from "@mui/material";
import { DetachedIconTypes } from '../../../types/SearchResultsTabsProps';

const DetachedIcon = ({
    className,
    style,
    onClick,
    shouldShowAttachIcon = false
}: DetachedIconTypes) => {

    return (
        <Box
            className={className ? className : 'detached-icon'}
            style={{
                ...style,
                cursor: 'pointer'
            }}
            component={"img"}
            src={shouldShowAttachIcon ? ItemAttached : ItemDetached}
            alt="ItemDetached"
            onClick={e => {
                onClick(e)
            }}
        >
        </Box>
    );
}

export default DetachedIcon;