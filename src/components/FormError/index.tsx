import React from 'react'
import {
    Box,
} from "@mui/material";

type FormErrorTypes = {
    msg: string,
    style?: React.CSSProperties
}

const FomrError = ({
    msg,
    style = {}
}: FormErrorTypes) => {
    return (
        <Box component="div" style={{
            ...style,
            fontSize: 'smaller',
            lineHeight: 1,
            color: 'var(--orange-shade)'
        }}>
            {msg}
        </Box>
    );
}

export default FomrError;