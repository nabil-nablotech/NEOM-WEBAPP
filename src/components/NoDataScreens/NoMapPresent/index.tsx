import { Box, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from '../../NoDataScreens/index.module.css';

const NoMapPresent = ({
    message
}: { message: string }) => {

    return <Box component="div" className={`${styles['wrapper']} ${styles['no-map-wrapper']}`}>
        <Grid container className={`${styles['content-grid']}`} style={{
                flexDirection: 'column'
        }}>
            <Grid item >
                <LocationOnIcon className={`${styles['content-image']}`} />
            </Grid>
            <Grid item className={`${styles['content-text']}`}>
                {message}
            </Grid>
        </Grid>
    </Box>
}

export default NoMapPresent;