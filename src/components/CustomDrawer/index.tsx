import { Box, Drawer } from '@mui/material';
import React, { useState } from 'react'
import { CustomDrawerProps } from '../../types/CustomDrawerTypes';

const CustomDrawer = ({
    origin,
    isOpen,
    onClose,
    children
}: CustomDrawerProps) => {

    return (
        <Box component="div" style={{
            zIndex: '33'
        }}>
            <Drawer
                anchor={origin ? origin : "left"}
                open={isOpen}
                onClose={onClose}
                >
                    {children}
                </Drawer>
        </Box>
    );
}
 
export default CustomDrawer;