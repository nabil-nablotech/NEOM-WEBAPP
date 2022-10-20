import { Box } from "@mui/material";
import { RenderFileDataProps } from "../../types/SearchResultsTabsProps";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import styles from './index.module.css';
import { useState } from "react";
import VideoModal from "../VideoModal";

/** component created to erender normal image -video - blob based on props */
const RenderFileData = ({
    fileType,
    fileData
}: RenderFileDataProps) => {
    const [openVideoModal, toggleVideoModal] = useState<boolean>(false)
    return (
        <>
            {
                fileType === 'image' &&
                <Box
                    className={fileData.className}
                    component="img"
                    alt={fileData.alt ? fileData.alt : ''}
                    src={fileData.src}
                />
            }
            {
                fileType === 'video' &&
                <>
                    <Box style={{
                        position: 'relative'
                    }}>
                        <Box
                            className={fileData.className}
                            component="img"
                            alt={fileData.alt ? fileData.alt : ''}
                            src={fileData.thumbNail}
                        />
                        {!fileData.isOpened ? <PlayCircleFilledWhiteIcon
                            sx={{
                                width: 1 / 4,
                                height: 1 / 4,
                            }}
                            fontSize="large" className={`${styles['video-play-icon']}`}
                            onClick={e => {
                                e.preventDefault()
                                toggleVideoModal(true)
                            }}
                        /> :
                        <VideoModal
                            videoSrc={fileData.src}
                            isModalOpen={openVideoModal}
                            toggleModal={() => toggleVideoModal(false)}
                        />}
                    </Box>
                </>
            }
        </>
    );
}
 
export default RenderFileData;