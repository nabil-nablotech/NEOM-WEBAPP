import { Box } from "@mui/material";
import { RenderFileDataProps } from "../../types/SearchResultsTabsProps";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import styles from './index.module.css';
import { useState } from "react";
import ReactPlayer from "react-player";
import NoVideoPresent from "../NoDataScreens/NoVideoPresent";
import NoImagePresent from "../NoDataScreens/NoImagePresent";
import { isImagePathInvalid, NO_IMAGE } from "../../utils/services/helpers";
import ThreeDIcon from '../../assets/images/icon-3d-model.svg';
import parse from 'html-react-parser';

/** component created to erender normal image -video - blob based on props */
const RenderFileData = ({
    fileType,
    fileData,
}: RenderFileDataProps) => {
    const [openVideoModal, toggleVideoModal] = useState<boolean>(false)

    const noVideoCondition  = !fileData.src && !fileData.iframeVideoLink && !fileData.staticVideoLink && !fileData.objectURL

    return (
        <>
            {
                fileType === 'image' &&
                <>
                    {
                        fileData.src
                            &&
                            !isImagePathInvalid(fileData.src)
                            ?
                            <Box
                                className={fileData.className}
                                component="img"
                                alt={fileData.alt ? fileData.alt : ''}
                                src={fileData.src}
                            /> :
                            <NoImagePresent
                                className="light-version"
                                message={NO_IMAGE}
                                style={{
                                    backgroundColor: 'var(--blank-doc-bg)',
                                    color: 'var(--no-map-bg)'
                                }}
                            />
                    }
                </>
            }
            {
                fileType === 'video' &&
                <>
                {}
                    <Box component="div"
                        style={{
                            position: 'relative',
                            width: noVideoCondition || fileData.objectURL ? '100%' : 'inherit'
                        }}>
                        {(noVideoCondition) ?
                            <NoVideoPresent message="Video not found" style={{
                                ...fileData.noVideoStyles,
                                width: '100%'
                            }} /> :
                            // !fileData.isOpened ? <>
                            //     <Box
                            //         className={`${fileData.className} ${fileData.thumbnailClassname}`}
                            //         component="img"
                            //         alt={fileData.alt ? fileData.alt : ''}
                            //         src={fileData.thumbNail}
                            //     />
                            //     <PlayCircleFilledWhiteIcon
                            //         sx={{
                            //             width: '40%',
                            //             height: '40%',
                            //         }}
                            //         fontSize="large" className={`${styles['video-play-icon']}`}
                            //         onClick={e => {
                            //             e.preventDefault()
                            //             toggleVideoModal(true)
                            //         }}
                            //     />
                            // </> :
                                <>
                                    {
                                        fileData.iframeVideoLink ?
                                            <>
                                                {
                                                    fileData.iframeVideoLink.indexOf('https://www.youtube.com/watch') !== -1 ?
                                                        <>
                                                            <ReactPlayer
                                                                width="100%" height="auto"
                                                                playing={fileData.isOpened} url={fileData.iframeVideoLink}
                                                                style={{
                                                                    aspectRatio: '3/1.65'
                                                                }}
                                                            />
                                                        </> :
                                                        <>
                                                            <iframe title="video-player-iframe" style={{
                                                                width: '100%',
                                                            }}

                                                                src={fileData.iframeVideoLink.replace('/watch', '/embed')}
                                                            >

                                                            </iframe>
                                                        </>
                                                }
                                            </> :
                                            fileData.staticVideoLink ?
                                                <>
                                                    <video width="100%" height="100%" controls autoPlay={false}>
                                                        <source
                                                            src={fileData.staticVideoLink}
                                                            type={
                                                                fileData.fileObject && fileData.fileObject?.mime ?
                                                                fileData.fileObject.mime :
                                                                // "video/mp4"
                                                                "auto"
                                                            }
                                                        />
                                                    </video>
                                                </> :
                                                <>
                                                {fileData.objectURL ?
                                                    <>
                                                        {
                                                            fileData.objectURL.indexOf('iframe') !== -1 ?
                                                                <div dangerouslySetInnerHTML={{ __html: fileData.objectURL }} /> :
                                                                <ReactPlayer
                                                                    width="100%" height="auto"
                                                                    playing={fileData.isOpened}
                                                                    url={fileData.objectURL}
                                                                    style={{
                                                                        aspectRatio: '3/1.65'
                                                                    }}
                                                                />

                                                        }
                                                    </>
                                                :
                                                    <Box component="div" className={`${styles['video-player-box']}`}>
                                                        {
                                                            !fileData.isOpened &&
                                                            <PlayCircleFilledWhiteIcon
                                                                sx={{
                                                                    width: 'fit-content',
                                                                    height: '40%',
                                                                    background: "rgba(255,255,255,0.5)",
                                                                    borderRadius: '50%',
                                                                }}
                                                                fontSize="large" className={`${styles['video-play-icon']}`}
                                                                onClick={e => {
                                                                    e.preventDefault()
                                                                    // toggleVideoModal(true)
                                                                }}
                                                            />
                                                        }
                                                        <ReactPlayer
                                                            width="100%" height="auto"
                                                            playing={fileData.isOpened}
                                                            url={fileData.src}
                                                            style={{
                                                                aspectRatio: '3/1.65'
                                                            }}
                                                        />
                                                    </Box>}
                                                </>
                                    }
                                </>

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
                            className={`${fileData.className} ${styles['three-d-model-box']}`}
                            component="div"
                        >
                            {fileData.objectURL ? parse(fileData.objectURL) : ''}
                        </Box>
                        <Box
                            component="img"
                            src={ThreeDIcon}
                            sx={{
                                width: 1 / 4,
                                height: 1 / 4,
                            }}
                            className={`${styles['video-play-icon']}`}
                        // onClick={e => {
                        //     e.preventDefault()
                        // }}
                        />
                    </Box>
                </>
            }
        </>
    );
}

export default RenderFileData;