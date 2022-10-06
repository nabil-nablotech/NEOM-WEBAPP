import React, { Component } from 'react'
import styles from './index.module.css'
import { Box } from '@mui/material'
import Logo from '../../pages/UserManagement/img/Logo.svg'
import UserMenuComponent from './../UserMenu/index';

const Header = () => {
    return (

        <Box
            className={`${styles['header-container']}`}
        >
            <Box className={`${styles['logo']}`}>
                <Box
                    component="img"
                    alt="NEOM logo"
                    src={Logo}
                />
            </Box>
            <UserMenuComponent
                // userInitials={'ST'}
            />
        </Box>
    )
}

export default Header;