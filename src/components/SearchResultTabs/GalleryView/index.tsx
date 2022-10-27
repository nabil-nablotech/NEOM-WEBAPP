import { Box, Grid, Button } from "@mui/material";
import styles from "./index.module.css";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useDispatch, useSelector } from "react-redux";
import { setActiveMediaItem, setActiveMediaItemIndex, toggleGalleryView } from "../../../store/reducers/searchResultsReducer";
import { RootState } from "../../../store";
import RenderFileData from "../../RenderFileData";
import YellowStar from '../../../assets/images/searchResults/YellowStar.svg'
import { CustomMoreOptionsComponent } from "../../CustomMoreOptionsComponent";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const GalleryView = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { media, places, activePlaceItem, activeMediaItem } = useSelector(
        (state: RootState) => state.searchResults
    );
    
    const actionsArray = [
        {
            label: 'Feature',
            action: () => { }
        },
        {
            label: 'Share',
            action: () => { }
        },
        {
            label: 'Edit',
            action: () => { }
        },
        {
            label: 'Delete',
            action: () => { }
        }
    ]

    useEffect(() => {

        // console.log('hex: ', activeMediaItem)
        if(activeMediaItem) {
            navigate(`/search-results/Media/${activeMediaItem.attributes.uniqueId}`, { replace: true })
        }

    }, [activeMediaItem])

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
                    {`${activePlaceItem?.attributes.placeNameEnglish.substr(0, 20)}${activePlaceItem?.attributes.placeNameArabic.substr(0, 20)}`}
                </Grid>
                <Grid item >{`${places.length} Items`}</Grid>
            </Grid>
            <Grid container className={`${styles['media-grid']}`}>
                {
                    places && places.map((itemObj, inx) => (
                        <Grid item md={3} lg={4} key={inx} className={`${styles['media-grid-item']}`}
                            onClick = {e => {
                                dispatch(setActiveMediaItem(media[inx]))
                                dispatch(setActiveMediaItemIndex(inx))
                            }}
                        >
                            {/* to-do: api based flag to show featured */}
                            {
                                inx === 1 ?
                                    <>
                                        <RenderFileData
                                            fileData={{
                                                src: "https://www.youtube.com/watch?v=aU08MWXL0XY",
                                                className: `${styles["single-image"]} ${styles["right-image"]}`,
                                                // thumbnail URL for youtube
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
                                                    // src: images[2],
                                                    thumbNail: "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg",
                                                    className: `${styles["single-image"]} ${styles["right-image"]}`
                                                }}
                                                fileType="3d"
                                            />
                                        </> :
                                        <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: itemObj.attributes.media_associates.data[0].attributes.media_unique_id.data.attributes.object.data.attributes.url,
                                                className: styles['image']
                                            }}
                                            fileType="image"
                                        />
                            }
                            <Grid container className={`${styles['media-grid-item-options-row']}`}>
                                <Grid item>
                                    {/* to-do: api based flag to show featured */}
                                    {inx === 0 && <Box component="div">
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
                                <Grid item>
                                    <CustomMoreOptionsComponent
                                        menuActions={actionsArray}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default GalleryView;