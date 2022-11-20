
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

export default TextualContent