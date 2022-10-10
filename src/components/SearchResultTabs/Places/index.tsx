import React, { Component } from 'react'
import Box from '@mui/material/Box';
import styles from '../index.module.css'
import placesStyles from './index.module.css'
import Button from "../../../components/Button";
import GridViewOpen from '../../../assets/images/searchResults/GridViewOpen.svg'
import ListViewClosed from '../../../assets/images/searchResults/ListViewClosed.svg'
import GridView from './GridView/GridView';
import { Grid } from '@mui/material';

const PlacesTab = ({
    resultCount = 1053
}) => {
     
    return (
        <Box className={`${styles['main-tab-content']}`}>
            <Box className={`${styles['utility-bar']}`}>
                <Box>{resultCount} Total Places</Box>
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
                <Box className={`${styles['view-toggler-icon']}`} component="img" alt={""} src={GridViewOpen} />
                <Box className={`${styles['view-toggler-icon']}`} component="img" alt={""} src={ListViewClosed} />
            </Box>
            <Box component={'section'} className={`${styles['result-section']}`}>
                <Grid container spacing={1}>
                    <Grid item xl={5} lg={6}>
                        <GridView />
                    </Grid>
                    {/* To-do: map view */}
                    {/* <Grid item xs={4}>
                        <Item>xs=4</Item>
                    </Grid> */}
                </Grid>
            </Box>
        </Box>
    );
}
 
export default PlacesTab;