
import { Box, Grid } from '@mui/material';
import MoreIcon from '../../../../assets/images/searchResults/MoreMenu.svg'
import YellowStar from '../../../../assets/images/searchResults/YellowStar.svg'
import styles from './index.module.css';

export const DetailsPage = ({
    itemObject
}: { itemObject: any }) => {

    return <>
        <Box className={`${styles['details-page-wrapper']}`}>
            <Box className={'title'} >{itemObject.title}</Box>
            <Box className={'image'} component="img" alt={""} src={itemObject.thumbnailUrl} />
            <Box className={'desc'} >
                <Grid container>
                    <Grid item lg={7}>
                        <Box>Ed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                            quae ab illo inventore.
                        </Box>
                    </Grid>
                    <Grid item lg={4}>
                        <Box
                            className={`star-icon`}
                            component="img"
                            alt={""}
                            src={YellowStar}
                        ></Box>Featured
                    </Grid>
                    <Grid item lg={1}>
                        <Box
                            className={`more-icon`}
                            component="img"
                            alt={""}
                            src={MoreIcon}
                        ></Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container>
                    <Grid item lg={3}>
                        <p>Details</p>
                        <div>Unit Number: 12345</div>
                        <div>Type: Artifact</div>
                        <div>Bearing: Detail</div>
                    </Grid>
                    <Grid item lg={3}>
                        <p>Image Location</p>
                        <div>Latitude: 28.038206</div>
                        <div>Longitude: 35.231070 </div>
                        <div>Zone: 36</div>
                    </Grid>
                    <Grid item lg={3}>
                        <p>.</p>
                        <div>Easting: 719318</div>
                        <div>Northing: 3103443</div>
                    </Grid>
                    <Grid item lg={3}>
                        <p>Recorded</p>
                        <div>Date: 08/04/2022 7:41:10 AM</div>
                        <div>By: Harland Ash</div>
                        <div>Initials: DS</div>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </>
}