import React, { Component } from 'react'
import Box from '@mui/material/Box';
import styles from '../index.module.css'
// import placesStyles from './index.module.css'
import Button from "../../../components/Button";
// import { Grid } from '@mui/material';

const LibraryTab = ({
    resultCount = 1053
}) => {
     
    return (
        <Box className={`${styles['main-tab-content']}`}>
            <Box className={`${styles['utility-bar']}`}>
                <Box>{resultCount} Total Library Items</Box>
                <Box>
                <Button
                    colors={["transparent", "var(--table-black-text)", "var(--table-black-text)"]}
                    className={`${styles["export-btn"]}`}
                    label="Export"
                    style={{
                        border: '1px solid var(--light-grey-border)',
                        borderRadius: '40px',
                        padding: '0.2em 15px',
                        lineHeight: '2',
                        height: '100%',
                        textAlign: 'center'
                    }}
                    // onClick={handleCancel}
                />
                </Box>
            </Box>
        </Box>
    );
}
 
export default LibraryTab;