import { Box, Grid } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import styles from '../../NoDataScreens/index.module.css';

const NoImagePresent = ({
    message
}: {message: string}) => {
    return (
        <Box component="div" className={`${styles['wrapper']}`}>
            <Grid container className={`${styles['content-grid']}`} style={{
                
            }}>
                <Grid item >
                    <ImageOutlinedIcon className={`${styles['content-image']}`} />
                </Grid>
                <Grid item className={`${styles['content-text']}`}>
                    {message}
                </Grid>
            </Grid>
        </Box>
    );
}

export default NoImagePresent;