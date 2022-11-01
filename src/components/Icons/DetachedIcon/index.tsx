import ItemDetached from '../../../assets/images/searchResults/ItemDetached.svg';
import {
    Box,
  } from "@mui/material";


const DetachedIcon = ({
    style
}: {style?: React.CSSProperties}) => {
    return (
        <Box
            style={{
                ...style,
                cursor: 'pointer'
            }}
            component={"img"}
            src={ItemDetached}
            alt="ItemDetached"
        >
        </Box>
    );
}

export default DetachedIcon;