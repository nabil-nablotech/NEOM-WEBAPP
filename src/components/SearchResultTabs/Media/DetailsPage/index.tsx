
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
            <Box className={`${styles['title']}`} >{itemObject.title}</Box>
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
                    <Grid container className={`${styles['bottom-desc-row-1']}`}>
                        <Grid item lg={7}>
                            <Box>Ed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore.
                            </Box>
                        </Grid>
                        <Grid container lg={5}>
                            <Grid item lg={11}>
                                <Box className={`${styles['star-icon-box']}`}>
                                    <Box
                                        component="img"
                                        alt={""}
                                        src={YellowStar}
                                    ></Box>
                                    <Box>Featured</Box>
                                </Box>
                            </Grid>
                            <Grid item lg={1}>
                                <Box className={`${styles['more-icon-box']}`}
                                >
                                    <MoreHorizIcon sx={{ color: '#fff' }} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item lg={6}>
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
                            {/* <Grid item lg={4} className={`${styles[`bottom-grid`]}`} >
                                <p>Image Location</p>
                                <div>Latitude: 28.038206</div>
                                <div>Longitude: 35.231070 </div>
                                <div>Zone: 36</div>
                            </Grid>
                            <Grid item lg={4} className={`${styles[`bottom-grid`]}`} >
                                <p>_</p>
                                <div>Easting: 719318</div>
                                <div>Northing: 3103443</div>
                            </Grid> */}
                        </Grid>
                        <Grid item lg={6}>
                            <Box className={`${styles['image']}`} component="img" alt={""} src={itemObject.thumbnailUrl} />
                        </Grid>

                    </Grid>

                </Grid>
            </Box>
        </Box>
    </>
}