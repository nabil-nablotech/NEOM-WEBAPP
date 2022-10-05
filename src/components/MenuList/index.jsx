import React, { Component } from 'react';
import './index.css'

const MenuList = ({
    menuOpen,
    menuItemsArray
}) => {

    return (
        <>
            <div className="menu-wrapper" style={{ 
            display: menuOpen ? 'block': 'none'
            }}>
                {
                    menuItemsArray.map((obj, key) => (
                        <div className="menu-item" key={key}
                            onClick={e => {
                                e.preventDefault()
                                obj.handleClickMenuItem(e)
                            }}
                        >{obj.label}</div>
                    ))
                }
            </div>
        </>
    );
}
 
export default MenuList;