import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import styles from '../index.module.css'
import placesStyles from './index.module.css'
import Button from "../../../components/Button";
import DetailsView from '../../../assets/images/searchResults/DetailsView.svg'
import ListViewIcon from '../../../assets/images/searchResults/ListView.svg'
import GridView from './GridView/GridView';
import ListView from './ListView/ListView';
import { Grid } from '@mui/material';
import MapImg1 from '../../../assets/images/searchResults/mapImage1.webp'
import MapImg2 from '../../../assets/images/searchResults/mapImage2.jpg'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useToggledView } from './../../../hooks/useToggledView';
import useEvent from '../../../hooks/useEvent';
import { Meta } from '../../../types/Place';

const PlacesTab = ({
    resultCount = 1053
}) => {
    
  const { selectedCardIndex, events } = useSelector(
    (state: RootState) => state.searchResults
  );
  const [img, setimg] = useState(MapImg1);

  const { data, fetchEvents, hasMoreData, loading } = useEvent();

    useEffect(() => {
        setimg(selectedCardIndex % 2 === 0 ? MapImg2 : MapImg1)
    }, [selectedCardIndex])
    
    const {openStates, toggleOpenStates} = useToggledView({count: 2})

    const meta: Meta = data?.places?.meta;

    return (
        <Box className={`${styles['main-tab-content']}`}>
            <Box className={`${styles['utility-bar']}`}>
                <Box>{meta?.pagination?.total} Total Events</Box>
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
                    onClick={e => toggleOpenStates([true, false])}
                    style={{
                        opacity: openStates[0] ? '1' : '0.5'
                    }}
                />
                <Box className={`${styles['view-toggler-icon']}`} component="img" alt={""} src={ListViewIcon}
                    onClick={e => toggleOpenStates([false, true])}
                    style={{
                        opacity: openStates[1] ? '1' : '0.5'
                    }}
                />
            </Box>
            <Box component={'section'} className={`${styles['result-section']}`}>
                <Grid container spacing={1}>
                    {openStates[0] && <><Grid item xl={6} lg={6} md={5} sm={5}>
                        <GridView loading={loading} data={events} fetchEvents={fetchEvents} hasMoreData={hasMoreData}  />
                    </Grid>
                    {/* To-do: map view */}
                    <Grid item xl={6} lg={6} md={7} sm={7}>
                        <Box className={`${placesStyles['map-img']}`} component="img" alt={""} src={img} />
                    </Grid></>}
                    {
                        openStates[1] &&
                        <Box component={'div'} style={{
                            width: '100%'
                        }}>
                            <ListView />
                        </Box>
                    }
                </Grid>
                
            </Box>
        </Box>
    );
}
 
export default PlacesTab;