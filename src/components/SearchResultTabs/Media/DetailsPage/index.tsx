
import { Box, Grid } from '@mui/material';
import YellowStar from '../../../../assets/images/searchResults/YellowStar.svg'
import styles from './index.module.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const DetailsPage = ({
    itemObject
}: { itemObject: any }) => {

    // const [modalOpen, setModalOpen] = useState(false)

    return <>
        <Box className={`${styles['details-page-wrapper']}`}>
            <Box className={`${styles['img-wrapper']}`} >
                <Box className={`${styles['arrow-icon']} ${styles['arrow-prev']}`}
                >
                    <ArrowBackIosNewIcon className={`${styles['']}`} sx={{ color: '#fff' }} />
                </Box>
                <Box className={`${styles['arrow-icon']} ${styles['arrow-next']}`}
                >
                    <ArrowForwardIosIcon className={`${styles['']}`} sx={{ color: '#fff' }} />
                </Box>
                <Box className={`${styles['image']}`} component="img" alt={""} src={itemObject.thumbnailUrl} />
            </Box>
            <Box className={`${styles['desc']}`} >
                <Grid container className={`${styles['bottom-desc-main-grid']}`}>
                    <Grid container className={`${styles['bottom-desc-row-1']}`} style={{
                             justifyContent: 'space-between'
                        }}>
                        <Grid item sm={12} >
                            <Grid container style={{ gap: '2em', alignItems: 'center' }}>
                                <Grid item>
                                    <Box className={`${styles['overview-title']}`}>Overview of Site
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box>
                                        <Box className={`${styles['star-icon-box']}`}>
                                            <Box
                                                component="img"
                                                alt={""}
                                                src={YellowStar}
                                            ></Box>
                                            <Box>Featured</Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item sm={1} style={{
                                    marginLeft: 'auto'
                                }}>
                                    <Box className={`${styles['more-icon-box']}`}
                                    >
                                        <MoreHorizIcon sx={{ color: '#fff' }} />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container sm={10} md={8} lg={9} style={{ marginTop: '1em' }}>
                                Ed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore.
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid container >
                        <Grid item lg={6} md={6} sm={5}>
                            <Box className={`${styles[`bottom-grid`]}`} >
                                <p>Details</p>
                                <div>Unit Number: 12345</div>
                                <div>Type: Artifact</div>
                                <div>Bearing: Detail</div>
                            </Box>
                            <Box className={`${styles[`bottom-grid`]}`} >
                                <p>Recorded</p>
                                <div>Date: 08/04/2022 7:41:10 AM</div>
                                <div>By: Harland Ash</div>
                                <div>Initials: DS</div>
                            </Box>
                            <Box className={`${styles[`bottom-grid`]}`} >
                                <p>Metadata</p>
                                <div>Size: 10MB</div>
                                <div>Date: 08/04/2022</div>
                                <div>Dimensions: 1024x768</div>
                                <div>Extensions: png</div>
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} sm={7}>
                            <Box className={`${styles['map-image']}`} component="img" alt={""} src={itemObject.thumbnailUrl} />
                            <Grid container className={`${styles['map-loctn-details']}`} >
                                <Grid item lg={5} md={5} sm={5}>
                                    <Grid container className={`${styles['map-loctn-line']}`}>
                                        <Grid item style={{ fontWeight: 'bold' }} >Latitude</Grid>
                                        <Grid item>28.090884</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={5} md={5} sm={6}>
                                    <Grid container className={`${styles['map-loctn-line']}`}>
                                        <Grid item style={{ fontWeight: 'bold' }} >Longitude</Grid>
                                        <Grid item>35.475373</Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </>
}