import { Container } from '@mui/material';
import React, { Component } from 'react'
import Header from '../../components/Header';
import UserMenuComponent from '../../components/UserMenu/index';
// import UserMenuComponent from './../../components/UserMenu/index';
import styles from './index.module.css'
import Button from "../../components/Button";

const UserManagement = () => {
    return (
        <>
            <div>
                <Header />
                <UserMenuComponent />
                {/* <div className={`${styles['content-section']}`}>
                    <Container maxWidth="xl" >
                        <div className={`${styles['title']}`}>USERS</div>
                        <Button label="SIGN IN" />
                    </Container>
                </div> */}
            </div>
        </>
    );
}

export default UserManagement;