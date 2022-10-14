import { AppBar, Toolbar, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { CustomModalTypes } from '../../types/CustomModalTypes';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import modalStyles from './index.module.css';
import styled from 'styled-components';

const CustomModal_ = ({
    open,
    handleClose,
    children
}: CustomModalTypes) => {

    return <>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            className={`${modalStyles['dialog-wrapper']}`}
            style={{
                background: 'rgba(19, 16, 13, 0.9)',
                

            }}
            PaperProps={{
                sx: {
                    '& .MuiDialog-paper': {
                        backgroundColor: 'rgba(19, 16, 13, 0.9)',
                    }
                    // to-do
                }
            }}
        >
            <AppBar sx={{ position: 'relative', background: 'rgba(19, 16, 13, 0.9)', boxShadow: 'none' }}>
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
            <Box className={`${modalStyles['content']}`} sx={{
                background: 'rgba(19, 16, 13, 0.9)'
            }}>
                {children}
            </Box>
        </Dialog>
    </>
}

export const CustomModal = styled(CustomModal_)`
    .MuiPaper-root.MuiPaper-elevation.MuiDialog-paper {
        background-color: transparent !important;
    }
`