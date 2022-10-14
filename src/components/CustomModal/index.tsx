import { AppBar, Toolbar, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { CustomModalTypes } from '../../types/CustomModalTypes';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import modalStyles from './index.module.css';

export const CustomModal = ({
    open,
    handleClose,
    children
}: CustomModalTypes) => {

    return <>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
        >
            <AppBar sx={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}>
                <Toolbar sx={{
                    paddingLeft: '0 !important',
                    paddingRight: '0 !important'
                }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{
                            marginLeft: 'auto',
                            marginRight: '0',
                        }}
                    >
                        <CloseIcon sx={{ color: '#000' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box className={`${modalStyles['content']}`}>
                {children}
            </Box>
        </Dialog>
    </>
}