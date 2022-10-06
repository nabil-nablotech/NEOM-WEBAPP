import React, { Component } from 'react'
import Header from '../../components/Header';
import UserMenuComponent from '../../components/UserMenu/index';

const UserManagement = () => {
    return (
        <>
            <div>
                <Header />
                <UserMenuComponent />
            </div>
        </>
    );
}
 
export default UserManagement;