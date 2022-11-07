
import { Box, Grid, Button } from '@mui/material';
import YellowStar from '../../../../assets/images/searchResults/YellowStar.svg'
import styles from './index.module.css';
// import { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CustomModal } from '../../../CustomModal';
import { MediaDetailsPageProps, tabNameProps } from '../../../../types/SearchResultsTabsProps';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveMediaItemIndex, setActiveMediaItem } from '../../../../store/reducers/searchResultsReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RenderFileData from '../../../RenderFileData';
import { CustomMoreOptionsComponent } from '../../../CustomMoreOptionsComponent';
import ModelViewer from '../../../Model';
import { useEffect } from 'react';
import useMediaDetails from '../../../../hooks/useMediaDetails';
import Loader from '../../../Common/Loader';
import { baseUrl, MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO, MEDIA_TYPE_3D, NO_LOCATION, detectMediaRecordApiType, NO_IMAGE } from '../../../../utils/services/helpers';
import dayjs from 'dayjs';
import { Place } from '../../../../types/Place';
import NoMapPresent from '../../../NoDataScreens/NoMapPresent';
import NoImagePresent from '../../../NoDataScreens/NoImagePresent';

const MediaDetailsPage = ({
    currentItemIndex,
    handleClose
}: MediaDetailsPageProps) => {

    type handleAction = {
        e: React.MouseEvent<HTMLElement>
        action: string
    }
    const { media, activeMediaItemIndex, places } = useSelector(
        (state: RootState) => state.searchResults
    );

    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {data:mediaDetails, setEdit} = useMediaDetails();
    
    let [mediaType, setMediaType] = useState<"image" | "video" | "3d">("image")

    useEffect(() => {
        /** To-do: make this flag based on a api variable */
        // setMediaType("image")
        // setMediaType("video")
        // setMediaType("3d")

        
        if (mediaDetails) {
            if (
                detectMediaRecordApiType(mediaDetails) === MEDIA_TYPE_VIDEO
            ) {
                setMediaType(MEDIA_TYPE_VIDEO)
            } else if (detectMediaRecordApiType(mediaDetails) === MEDIA_TYPE_IMAGE) {
                setMediaType(MEDIA_TYPE_IMAGE)
            }
        }
        

    }, [mediaDetails])

    if(!mediaDetails) {
        return <>Cant display Media Details</>
    }

    const {
        description, title, id, objectURL, featuredImage, referenceURL, citation,
        categoryType, Author, bearing, latitude, longitude 
    } = mediaDetails

    const locationRef = window.location.href

    const handleNextOrPrevious = (e: handleAction['e'], action: handleAction['action']) => {
        e.preventDefault()
        let newIndex = activeMediaItemIndex

        if (action === 'next') {
            if (newIndex + 1 < media.length) {
                newIndex = newIndex + 1
                dispatch(setActiveMediaItem(media[newIndex]))
                dispatch(setActiveMediaItemIndex(newIndex))
                navigate(`/search-results/Media/${media[newIndex].attributes.uniqueId}`, { replace: true, state: null })
            }

        }

        if (action === 'previous') {
            if (newIndex - 1 >= 0) {
                newIndex = newIndex - 1
                
                dispatch(setActiveMediaItem(media[newIndex]))
                dispatch(setActiveMediaItemIndex(newIndex))
                navigate(`/search-results/Media/${media[newIndex].attributes.uniqueId}`, { replace: true, state: null })
            }

        }
    }

    const menuItems = [
        {
            label: "Edit",
            action: () => {
                setEdit({record: mediaDetails, type: "Media"});
                // handleClose()
            },
        },
        {
            label: "Delete",
            action: () => {
            },
        },
    ]


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

                <Box component="div" className={`${styles['media-player-wrapper']}`}>
                    {/* to-do: api parameter based conditions */}
                    {
                        mediaType === MEDIA_TYPE_IMAGE &&
                        <>
                            {
                                mediaDetails?.object?.url ?
                                    <Box className={`${styles['image']}`} component="img" alt={""} src={`${baseUrl}${mediaDetails?.object?.url}`}
                                    style={{
                                        objectFit: (mediaDetails && (mediaDetails?.object.width / mediaDetails?.object.height > 1.5)) ? 'cover' : 'contain'
                                    }}
                                    /> :
                                    <NoImagePresent
                                        className="light-version"
                                        message={NO_IMAGE}
                                        style={{
                                            backgroundColor: 'var(--blank-doc-bg)',
                                            color: 'var(--no-map-bg)',
                                            minHeight: '400px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    />
                            }
                        </>
                    }
                    {
                        mediaType === MEDIA_TYPE_VIDEO &&
                        <RenderFileData
                            fileData={{
                                src:
                                    typeof mediaDetails.objectURL === 'string' ? // means its an iframe
                                        mediaDetails.objectURL : (
                                            typeof mediaDetails.object.url === 'string' ? //means its an uploaded video
                                                `${baseUrl}${mediaDetails.object.url}` :
                                                ''
                                        )
                                ,
                                className: `${styles["single-image"]}`,
                                thumbNail:
                                // TO-DO : api based thumnail
                                    // mediaDetails.object.url ?
                                    // `${baseUrl}${mediaDetails.object.url}` :
                                    "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg"
                                , // thumbnail URL for youtube
                                isOpened: true
                            }}
                            fileType="video"
                        />
                    }
                    {
                        mediaType === MEDIA_TYPE_3D &&
                        <Box component="div" className={`${styles['threeD-model-wrapper']}`}>
                            <ModelViewer
                            />
                        </Box>
                    }
                </Box>
            </Box>
            <Box component="div" className={`${styles['desc']}`} >
                {
                    mediaType === 'image' &&
                    <Grid container className={`${styles['bottom-desc-main-grid']}`}>
                        <Grid container className={`${styles['bottom-desc-row-1']}`} style={{
                            justifyContent: 'space-between'
                        }}>
                            <Grid item sm={12} >
                                <Grid container style={{ gap: '10px', alignItems: 'center' }}>
                                    <Grid item>
                                        <Box component="div" className={`${styles['overview-title']}`}>
                                            {title}
                                        </Box>
                                    </Grid>
                                    {featuredImage && <Grid item>
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
                                    </Grid>}
                                    <Grid item sm={1} className={`${styles['more-icon-grid-item']}`} style={{
                                        marginLeft: 'auto'
                                    }}>
                                        <CustomMoreOptionsComponent
                                            moreIconClassName={`${styles['more-icon']}`}
                                            menuActions={menuItems}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid container style={{
                            justifyContent: 'space-between'
                        }}>
                            <Grid item sm={6} lg={7}>
                                    <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                        <p>ID: {id}</p>
                                        <br />
                                        <div>{description}</div>
                                    </Box>
                                    <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                        <p>Details</p>
                                        <div>Author: {Author}</div>
                                        <div>Category Type: {categoryType.join(', ')}</div>
                                        <div>Bearing: {bearing}</div>
                                        <div>Source URL: {referenceURL}</div>
                                        <div>Citation: {citation}</div>
                                        <div>Item URL: {locationRef}</div>
                                    </Box>
                                    {
                                        mediaDetails.object && <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                            <p>Metadata</p>
                                            <div>File Name: {mediaDetails.object.name}</div>
                                            <div>
                                                <span>Created: <span>{`${dayjs(mediaDetails.object.createdAt).format("MM/DD/YYYY")}`}</span></span>
                                            </div>
                                            <div>
                                                <span>Modified: <span>{`${dayjs(mediaDetails.object.updatedAt).format("MM/DD/YYYY")}`}</span></span>
                                            </div>
                                            <div>Size: {mediaDetails.object.size}MB</div>

                                            <div>Storage: -</div>
                                            <div>Depth: -</div>
                                            <div>Dimensions: {mediaDetails.object.width}x{mediaDetails.object.height}</div>
                                            <div>Make: -</div>
                                            <div>Model: -</div>
                                            <div>Extensions: {mediaDetails.object.ext && mediaDetails.object.ext.replace('.', '')}</div>
                                        </Box>
                                    }
                                    <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                        <p>Associations</p>
                                        {
                                            (places && places.length > 0) &&
                                            places.map((placeObj: Place) => (
                                                <div>{placeObj.attributes.placeNameEnglish} {placeObj.attributes.placeNameArabic}</div>
                                            ))
                                        }
                                    </Box>
                            </Grid>
                            <Grid item sm={6} lg={5}>
                                    {(latitude && longitude) ? <>
                                        <Box className={`${styles['map-image']}`} component="img" alt={""} src={mediaDetails.thumbnailUrl} />
                                        <Grid container className={`${styles['map-loctn-details']}`} >
                                            <Grid item lg={5} md={5} sm={5}>
                                                <Grid container className={`${styles['map-loctn-line']}`}>
                                                    <Grid item style={{ fontWeight: 'bold' }} >Latitude</Grid>
                                                    <Grid item>{`${latitude}`}</Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={5} md={5} sm={6}>
                                                <Grid container className={`${styles['map-loctn-line']}`}>
                                                    <Grid item style={{ fontWeight: 'bold' }} >Longitude</Grid>
                                                    <Grid item>{`${longitude}`}</Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid> </>
                                        :
                                        <NoMapPresent
                                            className="light-version"
                                            message={NO_LOCATION}
                                            style={{
                                                backgroundColor: 'var(--blank-doc-bg)',
                                                color: 'var(--no-map-bg)'
                                            }}
                                        />}
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
                                {title}
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
                            {description}
                        </Box>
                        <Box component="div">
                            <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                <p>Details</p>
                                <div className={`${styles[`video-info-grid`]}`}>
                                    <Box component="div">URL:</Box>
                                    <Box component={"a"} href="#" className={`${styles['anchor']}`}>
                                        {}
                                    </Box>
                                </div>
                                <div className={`${styles[`video-info-grid`]}`}>
                                    <Box component="div">Citation:</Box>
                                    <Box component="div">
                                        {citation}
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
                                {title}
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
                            {description}
                        </Box>
                        <Box component="div">
                            <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                <p>Details</p>
                                <div className={`${styles[`three-d-modelinfo-grid`]}`}>
                                    <Box component="div">URL:</Box>
                                    <Box component={"a"} href="#" className={`${styles['anchor']}`}>
                                        {objectURL}
                                    </Box>
                                </div>
                                <div className={`${styles[`three-d-modelinfo-grid`]}`}>
                                    <Box component="div">Citation:</Box>
                                    <Box component="div">
                                        {citation}
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

    const { media, activeMediaItem, activeMediaItemIndex, activeEventItem } = useSelector(
        (state: RootState) => state.searchResults
    )
    let { tabName } = useParams<{ tabName?: tabNameProps }>();

    const location = useLocation()

    const navigate = useNavigate()
    const dispatch = useDispatch();

    // const TotalMediaCount= (activeEventItem && activeEventItem?.visit_unique_id) ? activeEventItem.visit_unique_id.media_associates: 0
    const TotalMediaCount= (activeEventItem && activeEventItem?.visit_unique_id) ? activeEventItem.visit_unique_id.media_associates
    : media ? media.length : 0
        
    

    const handleClose = () => {
        setModalOpen(false)
        dispatch(setActiveMediaItem(null))
        dispatch(setActiveMediaItemIndex(0))
        navigate(`/search-results/Media`, { replace: true, state: null })
    }

    const showVisitCount = (location.state && location.state.from === 'events') && activeMediaItem

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
                        {/* {mediaDetails?.attributes?.title.substring(0, 30)} {
                            showVisitCount ? '- static count 1' : ''
                        } */}
                        <Button variant="text" type="button"
                            startIcon={<KeyboardArrowLeftIcon fontSize="small" />}
                            style={{
                                color: 'var(--medium-gray',
                                textTransform: 'none'
                            }}
                            onClick={e => {
                                e.preventDefault()
                                setModalOpen(false)
                                /** resetters */
                                dispatch(setActiveMediaItem(null))
                                dispatch(setActiveMediaItemIndex(0))
                                navigate(`/search-results/${tabName}`, { replace: true })
                            }}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid
                        item
                        style={{
                            position: "absolute",
                            left: "50%",
                            right: "50%",
                        }}
                    >
                        {`${activeMediaItemIndex + 1}/${TotalMediaCount}`}
                    </Grid>
                </Grid>
            }
            handleClose={() => handleClose()}
        >
            <MediaDetailsPage
                currentItemIndex={activeMediaItemIndex}
                handleClose={handleClose}
            />
        </CustomModal>
    </>
}