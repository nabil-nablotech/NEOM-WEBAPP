
import { Box, Grid } from '@mui/material';
import YellowStar from '../../../../assets/images/searchResults/YellowStar.svg'
import styles from './index.module.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CustomModal } from '../../../CustomModal';
import { MediaDetailsPageProps } from '../../../../types/SearchResultsTabsProps';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveMediaItemIndex, setActiveMediaItem } from '../../../../store/reducers/searchResultsReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import RenderFileData from '../../../RenderFileData';
import { CustomMoreOptionsComponent } from '../../../CustomMoreOptionsComponent';
import ModelViewer from '../../../Model';
import { useEffect } from 'react';
import useMediaDetails from '../../../../hooks/useMediaDetails';

const MediaDetailsPage = ({
    currentItemIndex,
    data,
    currentRecord,
}: MediaDetailsPageProps) => {

    type handleAction = {
        e: React.MouseEvent<HTMLElement>
        action: string
    }
    const {media, activeMediaItemIndex } = useSelector(
        (state: RootState) => state.searchResults
    );

    const dispatch = useDispatch()

    const {data:mediaDetails} = useMediaDetails();

    const handleNextOrPrevious = (e: handleAction['e'], action: handleAction['action']) => {
        e.preventDefault()

        let newIndex = currentItemIndex

        if (action === 'next') {
            if (newIndex + 1 < data.length) {
                newIndex = newIndex + 1
            }
            dispatch(setActiveMediaItem(data[newIndex]))
            dispatch(setActiveMediaItemIndex(newIndex))
        }

        if (action === 'previous') {
            if (newIndex - 1 >= 0) {
                newIndex = newIndex - 1
            }
            dispatch(setActiveMediaItem(data[newIndex]))
            dispatch(setActiveMediaItemIndex(newIndex))
        }
    }

    const menuItems = [
        {
            label: "Share",
            action: () => { },
        },
        {
            label: "Edit",
            action: () => {
            },
        },
        {
            label: "Delete",
            action: () => {
            },
        },
    ]

    let [mediaType, setMediaType]  = useState<"image" | "video" | "3d">("image")
    
    useEffect(() => {
        /** To-do: make this flag based on a api variable */
        // setMediaType("image")
        // setMediaType("video")
        setMediaType("3d")
    },[])


    return <>
        <Box component="div" className={`${styles['details-page-wrapper']}`}>
            <Box component="div" className={`${styles['img-wrapper']}`} >
                <Box component="div" className={`${styles['arrow-icon']} ${styles['arrow-prev']}`}
                    onClick={e => handleNextOrPrevious(e, 'previous')}
                >
                    <ArrowBackIosNewIcon className={`${styles['']}`} sx={{ color: '#fff' }} />
                </Box>
                <Box component="div" className={`${styles['arrow-icon']} ${styles['arrow-next']}`}
                    onClick={e => handleNextOrPrevious(e, 'next')}
                >
                    <ArrowForwardIosIcon className={`${styles['']}`} sx={{ color: '#fff' }} />
                </Box>

                {/* to-do: api parameter based conditions */}
                {
                    activeMediaItemIndex === 0 &&
                    <Box className={`${styles['image']}`} component="img" alt={""} src={currentRecord.thumbnailUrl} />
                }
                {/* static video */}
                {
                    activeMediaItemIndex === 1 &&
                    <RenderFileData
                        fileData={{
                            src: "https://www.youtube.com/watch?v=aU08MWXL0XY",
                            className: `${styles["single-image"]}`,
                            thumbNail: "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg", // thumbnail URL for youtube
                            isOpened: true
                        }}
                        fileType="video"
                    />
                }
                {
                    activeMediaItemIndex === 2 &&
                    <Box component="div" className={`${styles['threeD-model-wrapper']}`}>
                        <ModelViewer
                        />
                    </Box>
                }
            </Box>
            <Box component="div" className={`${styles['desc']}`} >
                {
                    mediaType === 'image' &&
                    <Grid container className={`${styles['bottom-desc-main-grid']}`}>
                        <Grid container className={`${styles['bottom-desc-row-1']}`} style={{
                            justifyContent: 'space-between'
                        }}>
                            <Grid item sm={12} >
                                <Grid container style={{ gap: '2em', alignItems: 'center' }}>
                                    <Grid item>
                                        <Box component="div" className={`${styles['overview-title']}`}>Overview of Site
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box component="div">
                                            <Box component="div" className={`${styles['star-icon-box']}`}>
                                                <Box
                                                    component="img"
                                                    alt={""}
                                                    src={YellowStar}
                                                ></Box>
                                                <Box component="div">Featured</Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={1} className={`${styles['more-icon-grid-item']}`} style={{
                                        marginLeft: 'auto'
                                    }}>
                                        <CustomMoreOptionsComponent
                                            moreIconClassName={`${styles['more-icon']}`}
                                            menuActions={menuItems}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item sm={10} md={8} lg={9} style={{ marginTop: '1em' }}>
                                    Ed ut perspiciatis unde omnis iste natus error sit voluptatem
                                    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                    quae ab illo inventore.
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid container >
                            <Grid item lg={6} md={6} sm={5}>
                                <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                    <p>Details</p>
                                    <div>Unit Number: 12345</div>
                                    <div>Type: Artifact</div>
                                    <div>Bearing: Detail</div>
                                </Box>
                                <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                    <p>Recorded</p>
                                    <div>Date: 08/04/2022 7:41:10 AM</div>
                                    <div>By: Harland Ash</div>
                                </Box>
                                <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                    <p>Metadata</p>
                                    <div>Size: 10MB</div>
                                    <div>Date: 08/04/2022</div>
                                    <div>Dimensions: 1024x768</div>
                                    <div>Extensions: png</div>
                                </Box>
                                <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                    <p>Assiciations</p>
                                    <div>Al-Muwaylih بئر فُحَيْماَن</div>
                                </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={7}>
                                <Box className={`${styles['map-image']}`} component="img" alt={""} src={currentRecord.thumbnailUrl} />
                                <Grid container className={`${styles['map-loctn-details']}`} >
                                    <Grid item lg={5} md={5} sm={5}>
                                        <Grid container className={`${styles['map-loctn-line']}`}>
                                            <Grid item style={{ fontWeight: 'bold' }} >Latitude</Grid>
                                            <Grid item>28.090884</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={5} md={5} sm={6}>
                                        <Grid container className={`${styles['map-loctn-line']}`}>
                                            <Grid item style={{ fontWeight: 'bold' }} >Longitude</Grid>
                                            <Grid item>35.475373</Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
                {
                    mediaType === 'video' &&
                    <Box component="div" className={`${styles[`line-height-1dot5`]}`}>
                        <Grid container className={`${styles[`video-title-grid`]}`} style={{
                            alignItems: 'start'
                        }}>
                            <Grid item sm={9} className={`${styles[`video-title`]}`}>
                                Archaeologists in Saudi Arabia Excavate Forgotten Kingdoms
                            </Grid>
                            <Grid item sm={1} className={`${styles['more-icon-grid-item']}`} style={{
                                marginLeft: 'auto'
                            }}>
                                <CustomMoreOptionsComponent
                                    moreIconClassName={`${styles['more-icon']}`}
                                    menuActions={menuItems}
                                />
                            </Grid>
                        </Grid>
                        <Box component="div" className={`${styles[`video-desc`]}`}>
                            This panel not only contains a rich assortment of unique medicine bags, but an intricate eagle is depicted to the left of center here at Little Petroglyph Canyon in California.
                        </Box>
                        <Box component="div">
                            <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                <p>Details</p>
                                <div className={`${styles[`video-info-grid`]}`}>
                                    <Box component="div">URL:</Box>
                                    <Box component={"a"} href="#" className={`${styles['anchor']}`}>
                                        https://sketchfab.com/3d-models/medicine-bag-panel-2-8037cae6290b4e5284a92c23a99c9499
                                    </Box>
                                </div>
                                <div className={`${styles[`video-info-grid`]}`}>
                                    <Box component="div">Citation:</Box>
                                    <Box component="div">
                                        PaleoWest - Medicine Bag Panel 2
                                    </Box>
                                </div>
                            </Box>
                            <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                <p>Associations</p>
                                <div>Al-Muwaylih بئر فُحَيْماَن</div>
                                <div>Al-Muwaylih بئر فُحَيْماَن Visit 2</div>
                                <div>Aynuna لوكِي كٌومي</div>
                            </Box>
                        </Box>
                    </Box>
                }
                {
                    mediaType === '3d' &&
                    <Box component="div" className={`${styles[`line-height-1dot5`]}`}>
                        <Grid container className={`${styles[`three-d-model-title-grid`]}`} style={{
                            alignItems: 'start'
                        }}>
                            <Grid item sm={9} className={`${styles[`three-d-model-title`]}`}>
                                Roadside 3d model
                            </Grid>
                            <Grid item sm={1} className={`${styles['more-icon-grid-item']}`} style={{
                                marginLeft: 'auto'
                            }}>
                                <CustomMoreOptionsComponent
                                    moreIconClassName={`${styles['more-icon']}`}
                                    menuActions={menuItems}
                                />
                            </Grid>
                        </Grid>
                        <Box component="div" className={`${styles[`three-d-modeldesc`]}`}>
                            This panel not only contains a rich assortment of unique medicine bags, but an intricate eagle is depicted to the left of center here at Little Petroglyph Canyon in California.
                        </Box>
                        <Box component="div">
                            <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                <p>Details</p>
                                <div className={`${styles[`three-d-modelinfo-grid`]}`}>
                                    <Box component="div">URL:</Box>
                                    <Box component={"a"} href="#" className={`${styles['anchor']}`}>
                                        https://sketchfab.com/3d-models/medicine-bag-panel-2-8037cae6290b4e5284a92c23a99c9499
                                    </Box>
                                </div>
                                <div className={`${styles[`three-d-modelinfo-grid`]}`}>
                                    <Box component="div">Citation:</Box>
                                    <Box component="div">
                                        PaleoWest - Medicine Bag Panel 2
                                    </Box>
                                </div>
                            </Box>
                            <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                <p>Associations</p>
                                <div>Al-Muwaylih بئر فُحَيْماَن</div>
                                <div>Al-Muwaylih بئر فُحَيْماَن Visit 2</div>
                                <div>Aynuna لوكِي كٌومي</div>
                            </Box>
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    </>
}

export const MediaDetailsModal = () => {

    const [isModalOpen, setModalOpen] = useState<boolean>(true)

    const { media, activeMediaItem, activeMediaItemIndex } = useSelector(
        (state: RootState) => state.searchResults
    )
    const location = useLocation()

    const navigate = useNavigate()
    const dispatch = useDispatch();

    if (!activeMediaItem) {
        return <>Error display</>
    }

    const handleClose = () => {
        setModalOpen(false)
        dispatch(setActiveMediaItem(null))
        dispatch(setActiveMediaItemIndex(0))
        navigate(`/search-results/Media`, { replace: true, state: null })
    }

    const showVisitCount = (location.state && location.state.from === 'events')  && activeMediaItem 

    return <>
        <CustomModal
            open={isModalOpen}
            titleContent={
                <Grid
                    container
                    className={`${styles["modal-title"]}`}
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Grid item sm={6}>
                        {activeMediaItem.attributes.title.substring(0, 30)} {
                            showVisitCount ? '- static count 1' : ''
                        }
                    </Grid>
                    <Grid
                        item
                        style={{
                            position: "absolute",
                            left: "50%",
                            right: "50%",
                        }}
                    >
                        {activeMediaItemIndex + 1}/{media.length}
                    </Grid>
                    <Grid item>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                handleClose()
                            }}
                            aria-label="close"
                            sx={{
                                marginLeft: "auto",
                                marginRight: "0",
                            }}
                        >
                            <CloseIcon fontSize="large" sx={{ color: "#fff" }} />
                        </IconButton>
                    </Grid>
                </Grid>
            }
            handleClose={() => handleClose()}
        >
            <MediaDetailsPage
                data={media}
                currentItemIndex={activeMediaItemIndex}
                currentRecord={activeMediaItem}
            />
        </CustomModal>
    </>
}