import { Box, Grid, Button } from "@mui/material";
import styles from "./index.module.css";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useDispatch, useSelector } from "react-redux";
import { setActiveMediaItem, setActiveMediaItemIndex, setDeleteItemType, setDeletePayload, toggleDeleteConfirmationWindowOpen, toggleGalleryView } from "../../../store/reducers/searchResultsReducer";
import { RootState } from "../../../store";
import RenderFileData from "../../RenderFileData";
import YellowStar from '../../../assets/images/searchResults/YellowStar.svg'
import { CustomMoreOptionsComponent } from "../../CustomMoreOptionsComponent";
import { useNavigate } from 'react-router-dom';
import { baseUrl, detectMediaTypeFromMediaAssociate, isRecordHavingAssociations, itemAddEditAccess, itemDeleteAccess, MEDIA_TAB_NAME } from "../../../utils/services/helpers";
import usePlaceDetails from "../../../hooks/usePlaceDetails";
import Loader from "../../Common/Loader";
import useEventDetails from "../../../hooks/useEventDetails";
import { useHistory } from "../../../hooks/useHistory";

const GalleryView = () => {
    const dispatch = useDispatch()
    const { navigateTo } = useHistory()
    const { media } = useSelector(
        (state: RootState) => state.searchResults
    );
    const { loading: placeLoading, data: placeData, setFeaturedMedia } = usePlaceDetails();
    const { setEdit } = useEventDetails();
    
    const menuItems = [
        {
            label: 'Feature',
            action: (data: any) => { 
                setFeaturedMedia(data);
            }
        },
        {
            label: "Edit",
            action: (data: any) => {
                if(data) {
                    setEdit({record: data, type: "Media"});
                }
            },
        },
    ]

    if (itemDeleteAccess) {
        menuItems.push( {
            label: "Delete",
            action: (data: any) => {
                if (data) {
                    dispatch(toggleDeleteConfirmationWindowOpen({
                        flag: true,
                        isAssociatedToPlacesOrEvents: media ? isRecordHavingAssociations(
                            media.filter(item => item?.id === data?.media_unique_id?.id?.toString())[0]
                        ) : false,
                    }))
                    dispatch(setDeleteItemType(MEDIA_TAB_NAME))
                    dispatch(setDeletePayload({
                        id: data?.media_unique_id?.id
                    }))
                }

            },
        })
    }
    
    if (placeLoading) {
        return <Loader />
    }
    
    if (!placeData) {
        return <></>
    }

    return (
        <Box component="div" className={`${styles["gallery-container"]}`} style={{
        }}>
            <Box component="div" style={{
                width: 'fit-content',
                float: 'left'
            }}>
                <Button variant="text" type="button"
                    startIcon={<KeyboardArrowLeftIcon fontSize="small" />}
                    style={{
                        color: 'var(--table-black-text)',
                        textTransform: 'none'
                    }}
                    onClick={e => {
                        dispatch(toggleGalleryView(false))
                    }}
                >
                    Back
                </Button>
            </Box>
            <Grid container className={`${styles['title-section']}`}>
                <Grid item >
                    {`${placeData?.placeNameEnglish.substr(0, 20)}${placeData?.placeNameArabic.substr(0, 20)}`}
                </Grid>
                {placeData && <Grid item >{`${placeData?.mediaItems.length} Items`}</Grid>}
            </Grid>
            <Grid container className={`${styles['media-grid']}`}>
                {
                    placeData && placeData.mediaItems.map((itemObj, inx) => (
                        <Grid item md={3} lg={4} key={inx} className={`${styles['media-grid-item']}`}
                            onClick = {e => {
                                let respMediaItemObj = null
                                let respMediaItemIndex = 0
                                
                                media.forEach((item, inx_)=> {

                                    if(item.attributes.uniqueId === itemObj.media_unique_id.uniqueId) {
                                        respMediaItemObj = item
                                        respMediaItemIndex = inx_
                                    }
                                })
                                dispatch(setActiveMediaItem(respMediaItemObj))
                                dispatch(setActiveMediaItemIndex(respMediaItemIndex))
                                // navigate(`/search-results/Media/${itemObj.media_unique_id.uniqueId}`, { replace: true })
                                navigateTo(`/search-results/Media/${itemObj.media_unique_id.uniqueId}`)
                            }}
                        >
                            {/* to-do: api based flag to show featured */}
                            {/* {
                                inx === 1 ?
                                    <>
                                        <RenderFileData
                                            fileData={{
                                                src: "https://www.youtube.com/watch?v=aU08MWXL0XY",
                                                className: `${styles["single-image"]} ${styles["right-image"]}`,
                                                thumbNail: "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg"
                                            }}
                                            fileType="video"
                                        />
                                    </> :
                                    inx === 2 ?
                                        <>
                                            <RenderFileData
                                                fileData={{
                                                    alt: "",
                                                    thumbNail: "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg",
                                                    className: `${styles["single-image"]} ${styles["right-image"]}`
                                                }}
                                                fileType="3d"
                                            />
                                        </> : */}
                                        {!itemObj?.media_unique_id.deleted && <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: `${baseUrl}${itemObj?.media_unique_id.object?.url}`,
                                                // src: itemObj.media_unique_id.object.attributes.url,
                                                className: styles['image'],
                                                objectURL: itemObj.media_unique_id.objectURL || ''

                                            }}
                                            fileType={detectMediaTypeFromMediaAssociate(itemObj)}
                                        />}
                            <Grid container className={`${styles['media-grid-item-options-row']}`}>
                                <Grid item>
                                    {/* to-do: api based flag to show featured */}
                                    {itemObj?.media_unique_id.featuredImage && <Box component="div">
                                        <Grid container className={`${styles['star-icon-box']}`}>
                                            <Grid item>
                                                <Box
                                                    component="img"
                                                    alt={""}
                                                    src={YellowStar}
                                                ></Box>
                                            </Grid>
                                            <Grid item>Featured</Grid>
                                        </Grid>
                                    </Box>}
                                </Grid>
                                {itemAddEditAccess && <Grid item>
                                    <CustomMoreOptionsComponent
                                        menuActions={menuItems}
                                        data={itemObj}
                                    />
                                </Grid>}
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default GalleryView;