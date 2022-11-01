import { Box, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const NoMapPresent = ({
    message
}: {message: string}) => {
    return (
        <Box component="div" style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--no-map-bg)'
        }}>
            <Grid container style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Grid item>
                    <LocationOnIcon />
                </Grid>
                <Grid item>
                    {message}
                </Grid>
            </Grid>
        </Box>
    );
}

export default NoMapPresent;