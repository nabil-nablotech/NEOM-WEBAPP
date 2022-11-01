import { Box, Grid } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const NoImagePresent = ({
    message
}: {message: string}) => {
    return (
        <Box component="div" style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--user-table-cell-hover-bg)'
        }}>
            <Grid container style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Grid item>
                    <ImageOutlinedIcon />
                </Grid>
                <Grid item>
                    {message}
                </Grid>
            </Grid>
            
        </Box>
    );
}

export default NoImagePresent;