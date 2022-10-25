import { Box } from "@mui/material";
import { RenderFileDataProps } from "../../types/SearchResultsTabsProps";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import styles from './index.module.css';
import { useState } from "react";
import ReactPlayer from "react-player";
import ThreeDIcon from '../../assets/images/icon-3d-model.svg';

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
                    <Box component="div" style={{
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
                            <Box component="div" className={`${styles['video-player-box']}`}>
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
            {
                fileType === '3d' &&
                <>
                    <Box component="div" style={{
                        position: 'relative'
                    }}>
                        <Box
                            className={fileData.className}
                            component="img"
                            alt={fileData.alt ? fileData.alt : ''}
                            src={fileData.thumbNail}
                        />
                        <Box
                            component="img"
                            src={ThreeDIcon}
                            sx={{
                                width: 1 / 4,
                                height: 1 / 4,
                            }}
                            className={`${styles['video-play-icon']}`}
                            onClick={e => {
                                e.preventDefault()
                            }}
                        />
                    </Box>
                </>
            }
        </>
    );
}

export default RenderFileData;