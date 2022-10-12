import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import styles from '../index.module.css'
import placesStyles from './index.module.css'
import Button from "../../../components/Button";
import ListView from '../../../assets/images/searchResults/ListView.svg'
import DetailsView from '../../../assets/images/searchResults/DetailsView.svg'
import GridViewIcon from '../../../assets/images/searchResults/GridView.svg'

import GridView from './GridView/GridView';
import { Grid } from '@mui/material';
import MapImg1 from '../../../assets/images/searchResults/mapImage1.webp'
import MapImg2 from '../../../assets/images/searchResults/mapImage2.jpg'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useToggledView } from './../../../hooks/useToggledView';

const MediaTab = ({
    resultCount = 1053
}) => {
    const { selectedCardIndex } = useSelector((state: RootState) => state.searchResults);
    const [img, setimg] = useState(MapImg1)
    useEffect(() => {
    
        setimg(selectedCardIndex%2 === 0 ? MapImg2 : MapImg1)
    }, [selectedCardIndex])
    
    const {openStates, toggleOpenStates} = useToggledView({count: 3})

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
                <Box className={`${styles['view-toggler-icon']}`} component="img" alt={""} src={DetailsView}
                    onClick={e => toggleOpenStates([false, true, false])}
                    style={{
                        opacity: openStates[1] ? '1' : '0.5'
                    }}
                />
                <Box className={`${styles['view-toggler-icon']}`} component="img" alt={""} src={GridViewIcon}
                    onClick={e => toggleOpenStates([true, false, false])}
                    style={{
                        opacity: openStates[0] ? '1' : '0.5'
                    }}

                />
                <Box className={`${styles['view-toggler-icon']}`} component="img" alt={""} src={ListView}
                    onClick={e => toggleOpenStates([false, false, true])}
                    style={{
                        opacity: openStates[2] ? '1' : '0.5'
                    }}
                />
            </Box>
            <Box component={'section'} className={`${styles['result-section']}`}>
                <Grid container spacing={1}>
                    <Grid item xl={6} lg={6} md={5} sm={5}>
                        <GridView />
                    </Grid>
                    {/* To-do: map view */}
                    <Grid item xl={6} lg={6} md={7} sm={7}>
                        <Box className={`${placesStyles['map-img']}`} component="img" alt={""} src={img} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
 
export default MediaTab;