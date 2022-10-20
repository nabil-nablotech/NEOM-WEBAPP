import React from 'react'
import { stringAvatar } from '../../utils/services/helpers';
import { Box } from "@mui/material";

const RenderInitials = ({
    firstName, lastName
}: {
    firstName?: string
    lastName?: string
}) => {
    return (
        <Box>
            <>
                {
                    firstName && lastName &&
                    <Box style={{
                        padding: '12px 8px',
                        border: '1px solid black',
                        borderRadius: '50%',
                        width: 'fit-content'
                    }}>{stringAvatar(`${firstName} ${lastName}`)}</Box>
                }
                {
                    (!firstName || !lastName) &&
                    <Box style={{
                        padding: '12px 8px',
                        border: '1px solid black',
                        borderRadius: '50%',
                        width: 'fit-content'
                    }}>{`U U`}</Box>
                }
            </>
        </Box>
    );
}

export default RenderInitials;