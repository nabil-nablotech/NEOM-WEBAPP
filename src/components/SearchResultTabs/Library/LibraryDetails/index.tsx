
import { Box, Grid, Button } from '@mui/material';
import styles from './index.module.css';
import { CustomModal } from '../../../CustomModal';
import { LibraryDetailsPageProps, tabNameProps } from '../../../../types/SearchResultsTabsProps';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveLibraryItem, setActiveLibraryItemIndex } from '../../../../store/reducers/searchResultsReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomMoreOptionsComponent } from '../../../CustomMoreOptionsComponent';
import useMediaDetails from '../../../../hooks/useMediaDetails';
import Loader from '../../../Common/Loader';
import useLibraryDetails from '../../../../hooks/useLibraryDetails';
import { baseUrl, isDocumentTypeImage } from '../../../../utils/services/helpers';
import dayjs from 'dayjs';
import { Place } from '../../../../types/Place';
import BlankDocImage from '../../../../assets/images/searchResults/BlankDocument.svg' 

const LibraryDetailsPage = ({
    currentItemIndex,
    data,
    currentRecord,
    handleClose
}: LibraryDetailsPageProps) => {

    const { places } = useSelector(
        (state: RootState) => state.searchResults
    );

    const { data: libraryDetails, setEdit } = useLibraryDetails();

    const locationRef = window.location.href

    if (!libraryDetails) {
        return <>Cant display Library Details</>
    }

    // console.log('hex: ', libraryDetails)
    const { description, title, id, referenceURL, citation,

    } = libraryDetails


    const menuItems = [
        {
            label: "Edit",
            action: () => {
                setEdit({record: libraryDetails, type: "Library"})
                // handleClose();
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
            <Box component="div">

                <Box component="div" className={`${styles['img-wrapper']}`} >
                    {
                        isDocumentTypeImage(libraryDetails?.object?.ext) ?
                            <Box className={`${styles['image']}`} component="img" alt={""} src={`${baseUrl}${libraryDetails?.object?.url}`} />
                            :
                            <>
                                <Box
                                    component = "img"
                                    src={BlankDocImage}
                                    alt={""}
                                    className={`${styles['blank-doc-image']}`}
                                />
                            </>
                    }
                </Box>

            </Box>
            <Box component="div" className={`${styles['desc']}`} >
                <Grid container className={`${styles['bottom-desc-main-grid']}`}>
                    <Grid container className={`${styles['bottom-desc-row-1']}`} style={{
                        justifyContent: 'space-between'
                    }}>
                        <Grid item sm={12} >
                            <Grid container style={{ gap: '2em', alignItems: 'center' }}>
                                <Grid item>
                                    <Box component="div" className={`${styles['overview-title']}`}>
                                        {title}
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
                        </Grid>

                    </Grid>
                    <Grid container >
                        <Grid item sm={12}>
                            <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                <p>ID: {id}</p>
                                <br />
                                <div>{description}</div>
                            </Box>
                            <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                <p>Details</p>
                                <div>Source URL: {referenceURL}</div>
                                <div>Citation: {citation}</div>
                                <div>Item URL: {locationRef}</div>
                            </Box>

                            {
                                libraryDetails.object && <Box component="div" className={`${styles[`bottom-grid`]}`} >
                                    <p>Metadata</p>
                                    <div>File Name: {libraryDetails.object.name}</div>
                                    <div>Size: {libraryDetails.object.size}MB</div>
                                    <div>
                                        <span>Created: <span>{`${dayjs(libraryDetails.object.createdAt).format("MM/DD/YYYY")}`}</span></span>
                                    </div>
                                    <div>
                                        <span>Modified: <span>{`${dayjs(libraryDetails.object.updatedAt).format("MM/DD/YYYY")}`}</span></span>
                                    </div>
                                    <div>Extensions: {libraryDetails.object.ext && libraryDetails.object.ext.replace('.', '')}</div>
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

                    </Grid>
                </Grid>
            </Box>
        </Box>
    </>
}

export const LibraryDetailsModal = () => {

    const [isModalOpen, setModalOpen] = useState<boolean>(true)

    const { activeMediaItemIndex } = useSelector(
        (state: RootState) => state.searchResults
    )
    let { tabName } = useParams<{ tabName?: tabNameProps }>();

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { loading: libraryLoading, data: libraryDetails } = useMediaDetails();


    if (libraryLoading) {
        return <Loader />
    }

    if (!libraryLoading && !libraryDetails) {
        return <div>Cant fetch media</div>
    }

    if (!libraryDetails) {
        return null
    }


    const handleClose = () => {
        setModalOpen(false)
        dispatch(setActiveLibraryItem(null))
        dispatch(setActiveLibraryItemIndex(0))
        navigate(`/search-results/Library`, { replace: true, state: null })
    }


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
                    <Grid item>
                        <Button variant="text" type="button"
                            startIcon={<KeyboardArrowLeftIcon fontSize="small" />}
                            style={{
                                color: 'var(--medium-gray',
                                textTransform: 'none'
                            }}
                            onClick={e => {
                                e.preventDefault()
                                /** resetters */
                                handleClose()
                            }}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            }
            handleClose={() => handleClose()}
        >
            <LibraryDetailsPage
                data={libraryDetails}
                currentItemIndex={activeMediaItemIndex}
                currentRecord={libraryDetails}
                handleClose={handleClose}
            />
        </CustomModal>
    </>
}