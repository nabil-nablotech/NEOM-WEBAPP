
import { Box, Grid, Button } from '@mui/material';
import YellowStar from '../../../../assets/images/searchResults/YellowStar.svg'
import styles from './index.module.css';
// import { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CustomModal } from '../../../CustomModal';
import { InventoryAssociationType, InventoryAssociationType_Event, MediaDetailsPageProps, tabNameProps } from '../../../../types/SearchResultsTabsProps';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveMediaItemIndex, setActiveMediaItem, toggleDeleteConfirmationWindowOpen, setDeleteItemType, setDeletePayload } from '../../../../store/reducers/searchResultsReducer';
import { useLocation, useParams } from 'react-router-dom';
import RenderFileData from '../../../RenderFileData';
import { CustomMoreOptionsComponent } from '../../../CustomMoreOptionsComponent';
import ModelViewer from '../../../Model';
import { useEffect } from 'react';
import useMediaDetails from '../../../../hooks/useMediaDetails';
import Loader from '../../../Common/Loader';
import { baseUrl, MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO, MEDIA_TYPE_3D, NO_LOCATION, detectMediaRecordApiType, NO_IMAGE, toFixedFromString, MEDIA_TAB_NAME, isRecordHavingAssociations, itemAddEditAccess, itemDeleteAccess, copyToClipboard } from '../../../../utils/services/helpers';
import dayjs from 'dayjs';
import { Place } from '../../../../types/Place';
import NoMapPresent from '../../../NoDataScreens/NoMapPresent';
import NoImagePresent from '../../../NoDataScreens/NoImagePresent';
import parse from 'html-react-parser';
import { MediaApi } from '../../../../types/Media';
import MapView from '../../GoogleMap/MapView';
import RenderValueWithDefault from '../../../NoDataScreens/DefaultText';
import { useHistory } from '../../../../hooks/useHistory';
import PositionedSnackbar from '../../../Snackbar';


const TextualContent = ({
    mediaDetails
}: { mediaDetails: MediaApi }) => {
    const locationRef = window.location.href
    const { places } = useSelector(
        (state: RootState) => state.searchResults
    );
    const {
        referenceURL, citation,
        categoryType, Author, bearing
    } = mediaDetails
    const [isCopyDone, setCopyDone] = useState<boolean>(false);

    return <>
        <Box component="div" className={`${styles[`bottom-grid`]}`} >
            <p>Details</p>
            <div>Author: {RenderValueWithDefault(Author)}</div>
            <div>Category Type: {RenderValueWithDefault(categoryType)}</div>
            <div>Bearing: {RenderValueWithDefault(bearing)}</div>
            <div>Source URL: {RenderValueWithDefault(referenceURL)}</div>
            <div>Citation: {RenderValueWithDefault(citation)}</div>
            <Grid container style={{
                gap: '10px'
            }}>
                <Grid item sm={2} style={{
                    maxWidth: 'fit-content'
                }}>
                    Item URL:
                </Grid>
                <Grid item sm={10}>
                    <Box
                        component="div"
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={(e) => {
                            setCopyDone(true);
                            copyToClipboard(locationRef ?? "");
                        }}
                    >
                        {RenderValueWithDefault(locationRef)}

                    </Box>
                </Grid>
            </Grid>
            <PositionedSnackbar
                message={"Copied to clipboard"}
                severity={"success"}
                open={isCopyDone}
                handleClose={() => setCopyDone(false)}
            />
        </Box>
        {
            (mediaDetails.object || mediaDetails.media_type) && <Box component="div" className={`${styles[`bottom-grid`]}`} >
                <p>Metadata</p>
                <div>File Name: {RenderValueWithDefault(mediaDetails?.object?.name)}</div>
                <div>
                    <span>Created: <span>{RenderValueWithDefault(`${dayjs(mediaDetails?.createdAt).format("MM/DD/YYYY")}`)}</span></span>
                </div>
                <div>
                    <span>Modified: <span>{RenderValueWithDefault(`${dayjs(mediaDetails?.updatedAt).format("MM/DD/YYYY")}`)}</span></span>
                </div>
                <div>Size: {RenderValueWithDefault(mediaDetails?.object?.size)} {mediaDetails?.object?.size ? 'MB' : ''}</div>

                <div>Storage: {RenderValueWithDefault('')}</div>
                <div>Depth: {RenderValueWithDefault('')}</div>
                <div>Dimensions: {
                    mediaDetails?.object?.width && mediaDetails?.object?.height ?
                        `${mediaDetails?.object?.width} x ${mediaDetails?.object?.height}` :
                        RenderValueWithDefault('')
                }</div>
                <div>Make: {RenderValueWithDefault('')}</div>
                <div>Model: {RenderValueWithDefault('')}</div>
                <div>Extensions: {RenderValueWithDefault(mediaDetails?.object?.ext && mediaDetails?.object?.ext?.replace('.', ''))}</div>
            </Box>
        }
        <Box component="div">
            <p>Associations</p>
            <p>Places</p>
            <Box component="div" className={`${styles[`bottom-grid`]}`}>
                {
                    (mediaDetails.media_associate?.place_unique_ids && (mediaDetails.media_associate?.place_unique_ids?.length > 0)) ?
                        (
                            mediaDetails.media_associate?.place_unique_ids?.map((placeObj: InventoryAssociationType) => (
                                <div>{placeObj.placeNameEnglish} {placeObj.placeNameArabic}</div>
                            ))
                        ) :
                        RenderValueWithDefault('')
                }
            </Box>
            <p>Events</p>
            <Box component="div" className={`${styles[`bottom-grid`]}`}>
                {
                    (mediaDetails.media_associate?.visit_unique_ids && mediaDetails.media_associate?.visit_unique_ids.length > 0) ?
                        (
                            mediaDetails.media_associate?.visit_unique_ids?.map((visitObj: InventoryAssociationType_Event) => (
                                <>
                                    {
                                        visitObj &&
                                        <div>{visitObj?.visit_associate?.place_unique_id?.placeNameArabic} {
                                            mediaDetails.media_associate?.visit_unique_ids[0].visitNumber ?
                                                `Visit ${mediaDetails.media_associate?.visit_unique_ids[0].visitNumber}` :
                                                ''
                                        }</div>
                                    }
                                </>
                            ))
                        ) :
                        RenderValueWithDefault('')
                }
            </Box>
        </Box>
    </>
}

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
    const [isFilter, setIsFilter] = useState(null)

    const dispatch = useDispatch()
    const { navigateTo } = useHistory()

    const { data: mediaDetails, setEdit } = useMediaDetails();

    let [mediaType, setMediaType] = useState<"image" | "video" | "3d">("image")

    useEffect(() => {
        /** To-do: make this flag based on a api variable */
        // setMediaType("image")
        // setMediaType("video")
        // setMediaType("3d")

        if (mediaDetails && (Object.keys(mediaDetails).length !== 0) ) {
            if (
                detectMediaRecordApiType(mediaDetails) === MEDIA_TYPE_VIDEO
            ) {
                setMediaType(MEDIA_TYPE_VIDEO)
            } else if (detectMediaRecordApiType(mediaDetails) === MEDIA_TYPE_IMAGE) {
                setMediaType(MEDIA_TYPE_IMAGE)
            } else if (detectMediaRecordApiType(mediaDetails) === MEDIA_TYPE_3D) {
                setMediaType(MEDIA_TYPE_3D)
            }
        }


    }, [mediaDetails])

    if (!mediaDetails) {
        return <>Cant display Media Details</>
    }

    const {
        description, title, id, objectURL, featuredImage, referenceURL, citation,
        categoryType, Author, bearing, latitude, longitude
    } = mediaDetails

    const handleNextOrPrevious = (e: handleAction['e'], action: handleAction['action']) => {
        e.preventDefault()
        let newIndex = activeMediaItemIndex

        if (action === 'next') {
            if (newIndex + 1 < media.length) {
                newIndex = newIndex + 1
                dispatch(setActiveMediaItem(media[newIndex]))
                dispatch(setActiveMediaItemIndex(newIndex))
                // navigate(`/search-results/Media/${media[newIndex].attributes.uniqueId}`, { replace: true, state: null })
                navigateTo(`/search-results/Media/${media[newIndex].attributes.uniqueId}`)
            }

        }

        if (action === 'previous') {
            if (newIndex - 1 >= 0) {
                newIndex = newIndex - 1

                dispatch(setActiveMediaItem(media[newIndex]))
                dispatch(setActiveMediaItemIndex(newIndex))
                // navigate(`/search-results/Media/${media[newIndex].attributes.uniqueId}`, { replace: true, state: null })
                navigateTo(`/search-results/Media/${media[newIndex].attributes.uniqueId}`)

            }

        }
    }

    const menuItems = [
        {
            label: "Edit",
            action: () => {
                setEdit({ record: mediaDetails, type: "Media" });
                // handleClose()
            },
        }
    ]
    if (itemDeleteAccess) {
        menuItems.push({
            label: "Delete",
            action: () => {
                dispatch(toggleDeleteConfirmationWindowOpen({
                    flag: true,
                    isAssociatedToPlacesOrEvents: media ? isRecordHavingAssociations(
                        media.filter(item => item?.id === mediaDetails?.media_unique_id?.id?.toString())[0]
                    ) : false,
                }))
                dispatch(setDeleteItemType(MEDIA_TAB_NAME))
                dispatch(setDeletePayload({
                    id: typeof mediaDetails.id === 'string' ? parseInt(mediaDetails.id) : mediaDetails.id
                }))
            },
        })
    }

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
                                    typeof mediaDetails.objectURL === 'string' ?
                                        mediaDetails.objectURL : ""
                                ,
                                iframeVideoLink: mediaDetails.referenceURL ? mediaDetails.referenceURL : "",  // means its an iframe
                                staticVideoLink: typeof mediaDetails.object?.url === 'string' ? //means its an uploaded video
                                    `${baseUrl}${mediaDetails.object.url}` : "",
                                className: `${styles["single-image"]}`,
                                thumbNail:
                                    // TO-DO : api based thumnail
                                    // mediaDetails.object.url ?
                                    // `${baseUrl}${mediaDetails.object.url}` :
                                    "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg"
                                , // thumbnail URL for youtube
                                isOpened: true,
                                noVideoStyles: {
                                    height: '400px'
                                }
                            }}
                            fileType="video"
                        />
                    }
                    {
                        mediaType === MEDIA_TYPE_3D &&
                        <Box component="div" className={`${styles['threeD-model-wrapper']}`}>
                            {/* <ModelViewer
                            /> */}
                            {mediaDetails.objectURL ? parse(mediaDetails.objectURL) : ''}
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
                                        {itemAddEditAccess && <CustomMoreOptionsComponent
                                            moreIconClassName={`${styles['more-icon']}`}
                                            menuActions={menuItems}
                                        />}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box component="div" className={`${styles[`bottom-grid`]} ${styles[`id-row`]}`} >
                                <p>ID: {id}</p>
                                <br />
                                <div>{description}</div>
                            </Box>
                        </Grid>
                        <Grid container style={{
                            justifyContent: 'space-between'
                        }}>
                            <Grid item sm={6} lg={7}>
                                <TextualContent
                                    mediaDetails={mediaDetails}
                                />
                            </Grid>
                            <Grid item sm={6} lg={5} className={`${styles[`map-wrapper`]}`}>
                                {(latitude && longitude) ? <>
                                    <MapView filterId={setIsFilter} key={4} marker={[{
                                        id: 0,
                                        name: `${mediaDetails?.media_associate?.data?.attributes?.place_unique_ids.data !== null ?
                                                mediaDetails?.media_associate?.data?.attributes?.place_unique_ids?.data[0]?.attributes.placeNameEnglish
                                            : ''}`,
                                            position: {
                                                lat: latitude || 24.11,
                                                lng: longitude || 34.98
                                            }
                                        }]}
                                        zoom={10}
                                    />
                                    <Grid container className={`${styles['map-loctn-details']}`} >
                                        <Grid item lg={5} md={5} sm={5}>
                                            <Grid container className={`${styles['map-loctn-line']}`}>
                                                <Grid item style={{ fontWeight: 'bold' }} >Latitude</Grid>
                                                <Grid item>{`${toFixedFromString(latitude, 6)}`}</Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={5} md={5} sm={6}>
                                            <Grid container className={`${styles['map-loctn-line']}`}>
                                                <Grid item style={{ fontWeight: 'bold' }} >Longitude</Grid>
                                                <Grid item>{`${toFixedFromString(longitude, 6)}`}</Grid>
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
                                
                                {itemAddEditAccess && <CustomMoreOptionsComponent
                                            moreIconClassName={`${styles['more-icon']}`}
                                            menuActions={menuItems}
                                        />}
                            </Grid>
                        </Grid>
                        <Box component="div" className={`${styles[`video-desc`]}`}>
                            {description}
                        </Box>
                            <Grid container style={{
                                justifyContent: 'space-between'
                            }}>
                                <Grid item sm={6} lg={7}>
                                    <TextualContent
                                        mediaDetails={mediaDetails}
                                    />
                                </Grid>
                                <Grid item sm={6} lg={5} className={`${styles[`map-wrapper`]}`}>
                                    {(latitude && longitude) ? <>
                                        <MapView filterId={setIsFilter} key={4} marker={[{
                                            id: 0,
                                            name: `${mediaDetails?.media_associate?.data?.attributes?.place_unique_ids.data !== null ?
                                                    mediaDetails?.media_associate?.data?.attributes?.place_unique_ids?.data[0]?.attributes.placeNameEnglish
                                                    : ''}`,
                                                position: {
                                                    lat: latitude || 24.11,
                                                    lng: longitude || 34.98
                                                }
                                            }]}
                                            zoom={10}
                                        />
                                        <Grid container className={`${styles['map-loctn-details']}`} >
                                            <Grid item lg={5} md={5} sm={5}>
                                                <Grid container className={`${styles['map-loctn-line']}`}>
                                                    <Grid item style={{ fontWeight: 'bold' }} >Latitude</Grid>
                                                    <Grid item>{`${toFixedFromString(latitude, 6)}`}</Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={5} md={5} sm={6}>
                                                <Grid container className={`${styles['map-loctn-line']}`}>
                                                    <Grid item style={{ fontWeight: 'bold' }} >Longitude</Grid>
                                                    <Grid item>{`${toFixedFromString(longitude, 6)}`}</Grid>
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
                                {itemAddEditAccess && <CustomMoreOptionsComponent
                                            moreIconClassName={`${styles['more-icon']}`}
                                            menuActions={menuItems}
                                        />}
                            </Grid>
                        </Grid>
                        <Box component="div" className={`${styles[`three-d-modeldesc`]}`}>
                            {description}
                        </Box>
                        <Box component="div">
                            <TextualContent
                                mediaDetails={mediaDetails}
                            />
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

    const dispatch = useDispatch();
    const {goBack} = useHistory();

    // const TotalMediaCount= (activeEventItem && activeEventItem?.visit_unique_id) ? activeEventItem.visit_unique_id.media_associates: 0
    const TotalMediaCount = (activeEventItem && activeEventItem?.visit_unique_id) ? activeEventItem.visit_unique_id.media_associates
        : media ? media.length : 0



    const handleClose = () => {
        setModalOpen(false)
        dispatch(setActiveMediaItem(null))
        dispatch(setActiveMediaItemIndex(0))
        // navigate(`/search-results/Media`, { replace: true, state: null })
        goBack()
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
                                // navigate(`/search-results/${tabName}`, { replace: true })
                                goBack()
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