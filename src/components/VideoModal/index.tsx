import { Box } from "@mui/material";
import { VideoModalProps } from "../../types/SearchResultsTabsProps";
import styles from './index.module.css'
import { Dialog } from '@mui/material';
import ReactPlayer from 'react-player/lazy'

const VideoModal = ({
    videoSrc,
    isModalOpen,
    toggleModal
}: VideoModalProps) => {
    return (
        <Dialog  fullWidth onClose={toggleModal} open={isModalOpen} sx={{
            '& .MuiPaper-root.MuiDialog-paper' : {
                width: 'fit-content',
                height: 'fit-content'
            }
        }}>
            <Box className={`${styles['']}`}>
                <ReactPlayer url={videoSrc} />
            </Box>
        </Dialog>
    );
}

export default VideoModal;