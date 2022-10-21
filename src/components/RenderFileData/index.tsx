import { Box } from "@mui/material";
import { RenderFileDataProps } from "../../types/SearchResultsTabsProps";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import styles from './index.module.css';
import { useState } from "react";
import ReactPlayer from "react-player";

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
                        {!fileData.isOpened ? <>
                            <Box
                                className={fileData.className}
                                component="img"
                                alt={fileData.alt ? fileData.alt : ''}
                                src={fileData.thumbNail}
                            />
                            <PlayCircleFilledWhiteIcon
                                sx={{
                                    width: 1 / 4,
                                    height: 1 / 4,
                                }}
                                fontSize="large" className={`${styles['video-play-icon']}`}
                                onClick={e => {
                                    e.preventDefault()
                                    toggleVideoModal(true)
                                }}
                            />
                        </> :
                            <Box className={`${styles['video-player-box']}`}>
                                <ReactPlayer
                                    width="100%" height="auto"
                                    playing={fileData.isOpened} url={fileData.src}
                                    style={{
                                        aspectRatio: '3/1.65'
                                    }}
                                />
                            </Box>
                        }
                    </Box>
                </>
            }
        </>
    );
}

export default RenderFileData;