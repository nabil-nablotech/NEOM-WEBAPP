import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import styles from '../index.module.css'
// import placesStyles from './index.module.css'
import Button from "../../../components/Button";
import ListViewIcon from '../../../assets/images/searchResults/ListView.svg'
// import DetailsView from '../../../assets/images/searchResults/DetailsView.svg'
import GridViewIcon from '../../../assets/images/searchResults/GridView.svg'

import GridView from './GridView/GridView';
import ListView from './ListView/ListView';
import { Grid } from '@mui/material';
import MapImg1 from '../../../assets/images/searchResults/mapImage1.webp'
import MapImg2 from '../../../assets/images/searchResults/mapImage2.jpg'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useToggledView } from './../../../hooks/useToggledView';
import useMedia from '../../../hooks/useMedia';
import { Meta } from '../../../types/Place';

const MediaTab = () => {
    const { selectedCardIndex, media, mediaMetaData, totalCounts } = useSelector(
        (state: RootState) => state.searchResults
    );
    const [img, setimg] = useState(MapImg1);

    const { fetchMediaItems, hasMoreData, loading, setEdit } = useMedia();

    const meta: Meta | null = mediaMetaData;
    useEffect(() => {

        setimg(selectedCardIndex % 2 === 0 ? MapImg2 : MapImg1)
    }, [selectedCardIndex])

    const { openStates, toggleOpenStates } = useToggledView({ count: 2 })

    return (
        <Box component="div" className={`${styles['main-tab-content']}`}>
            <Box component="div" className={`${styles['utility-bar']}`}>
                <Box component="div">{meta?.pagination?.total} Results | {totalCounts?.media} Total Media Items</Box>
                <Box component="div">
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
                {/* <Box component="div" className={`${styles['view-toggler-icon']}`} component="img" alt={""} src={DetailsView}
                    onClick={e => toggleOpenStates([false, true, false])}
                    style={{
                        opacity: openStates[1] ? '1' : '0.5'
                    }}
                /> */}
                <Box className={`${styles['view-toggler-icon']}`} component="img" alt={""} src={GridViewIcon}
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
                    {/* {openStates[0] &&<Grid item xl={6} lg={6} md={5} sm={5}>
                        <GridView />
                    </Grid>} */}
                    {openStates[0] && <Grid item xl={12}>
                        <GridView totalData={meta?.pagination?.total} loading={loading} data={media} fetchData={fetchMediaItems} hasMoreData={hasMoreData} setEdit={setEdit} />
                    </Grid>}
                    {/* To-do: map view */}
                    {/* <Grid item xl={6} lg={6} md={7} sm={7}>
                        <Box component="div" className={`${placesStyles['map-img']}`} component="img" alt={""} src={img} />
                    </Grid> */}
                    {
                        openStates[1] &&
                        <Box component={'div'} style={{
                            width: '100%'
                        }}>
                            <ListView loading={loading} data={media} fetchData={fetchMediaItems} hasMoreData={hasMoreData} setEdit={setEdit} />
                        </Box>
                    }
                </Grid>
            </Box>
        </Box>
    );
}

export default MediaTab;