import { Box, Grid, Button } from "@mui/material";
import styles from "./index.module.css";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useDispatch, useSelector } from "react-redux";
import { toggleGalleryView } from "../../../store/reducers/searchResultsReducer";
import { RootState } from "../../../store";
import RenderFileData from "../../RenderFileData";
import YellowStar from '../../../assets/images/searchResults/YellowStar.svg'
import { CustomMoreOptionsComponent } from "../../CustomMoreOptionsComponent";
import { useNavigate } from 'react-router-dom';

const GalleryView = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { media, places, activePlaceItem } = useSelector(
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

    return (
        <Box className={`${styles["gallery-container"]}`} style={{
        }}>
            <Box style={{
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
                                navigate(`/search-results/Media`, { replace: true })
                            }}
                        >
                            <RenderFileData
                                fileData={{
                                    alt: "",
                                    src: itemObj.attributes.media_associates.data[0].attributes.mediaUniqueId.data.attributes.object.data.attributes.url,
                                    className: styles['image']
                                }}
                                fileType="image"
                            />
                            <Grid container className={`${styles['media-grid-item-options-row']}`}>
                                <Grid item>
                                    <Box>
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
                                    </Box>
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