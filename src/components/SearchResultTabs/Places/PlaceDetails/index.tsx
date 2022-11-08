import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryAssociationType, tabNameProps } from "../../../../types/SearchResultsTabsProps";
import styles from './index.module.css'
import gridStyles from '../GridView/index.module.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import RenderFileData from "../../../RenderFileData";
import { Place } from "../../../../types/Place";
import { useAnchor } from "../../../../hooks/useAnchor";
import { StyledAntTable } from "../../../StyledAntTable";
import { ColumnsType } from "antd/lib/table";
// import { usePaginatedArray } from "../../../hooks/usePaginatedArray";
// import useLibrary from "../../../hooks/useLibrary";
import { antTablePaginationCss, baseUrl, copyToClipboard, formatBytes, formatWebDate, isEmptyValue, NO_DESCRIPTION, NO_MEDIA, NO_LOCATION, NO_TABLE_ROWS, NO_TEXT, shallRenderMedia, checkIsNew, isRecordAttached, isPlaceDetailAttached, detectMediaTypeFromMediaAssociate } from "../../../../utils/services/helpers";
import { Tooltip } from "antd";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { Media } from "../../../../types/Media";
import { Event } from "../../../../types/Event";
import styled from "styled-components";
import { format } from "date-fns";
import useMedia from "../../../../hooks/useMedia";
import CommentsSection from "../../../CommentsSection";
import RenderInitials from "../../../RenderInitials";
import { useDispatch } from "react-redux";
import { modifyAssociatedPlaces, setActiveEventItem, setActiveEventItemIndex, setActiveMediaItem, setActiveMediaItemIndex, setActivePlaceItem, setActivePlaceItemIndex, toggleGalleryView } from "../../../../store/reducers/searchResultsReducer";
import { CustomMoreOptionsComponent } from "../../../CustomMoreOptionsComponent";
import PositionedSnackbar from "../../../Snackbar";
import usePlace from "../../../../hooks/usePlace";
import usePlaceDetails from "../../../../hooks/usePlaceDetails";
import Loader from "../../../Common/Loader";
import MapView from "../../GoogleMap/MapView";
import NoImagePresent from "../../../NoDataScreens/NoImagePresent";
import NoTextPresent from "../../../NoDataScreens/NoText";
import { isEmpty } from 'lodash'
import NoMapPresent from "../../../NoDataScreens/NoMapPresent";
import DetachedIcon from "../../../Icons/DetachedIcon";
import MoreOption from '../ListView/MoreOption'
import useRemarks from "../../../../hooks/useRemarks";

const StyledTableWrapper = styled(StyledAntTable)`
    
    .ant-table-container {
    }
    .ant-table {
        margin-block: 2em;
    }
    
    .ant-table-thead > tr > th:not(.ant-table-thead > tr > th.more-menu-ant-cell) ,
    .ant-table-tbody > tr > td:not(.ant-table-tbody > tr > td.more-menu-ant-cell) {
        min-width: 50px;
        max-width: 150px;
    }

    th.ant-table-cell {
        white-space: break-spaces;
    }
    .cell-citation {
        min-width: 18ch !important;
    }

    .ant-table-cell.more-menu-ant-cell {
        vertical-align:middle;
        min-width: 20px;
        width: 20px;
    }

    .ant-table-cell {
        vertical-align: middle;
    }
    .more-menu-div {
        vertical-align:middle;
    }
    .ant-table-thead > tr > th.ant-table-cell-fix-right,
    .ant-table-cell-fix-right {
        background: var(--off-white-background-color);
    }
    
    .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr > th.more-menu-ant-cell.ant-table-cell-fix-right {
        border-left: 1px solid #f0f0f0;
    }

    .events-table-more-menu > div:nth-child(1) {
        text-align: right;
    }

    @media (min-width: 575px) and (max-width: 1025px) {

        .ant-table-thead > tr > th:not(.ant-table-thead > tr > th.more-menu-ant-cell) ,
        .ant-table-tbody > tr > td:not(.ant-table-tbody > tr > td.more-menu-ant-cell) {
            min-width: 90px;
        }

        .ant-table-thead > tr > th.more-menu-ant-cell.ant-table-cell-fix-right ,
        .ant-table-tbody > tr > td.more-menu-ant-cell.ant-table-cell-fix-right {
            right: -5vw !important;
        }

        th.ant-table-cell ,
        th.ant-table-cell * {
        }
        td.ant-table-cell {
        }
        .cell-research{
            min-width: 16ch !important;
        }
        .cell-tourism {
            min-width: 14ch !important;
        }
        .cell-recommend {
            min-width: 20ch !important;
        }
        
        .cell-conserve {
            min-width: 15ch !important;
        }

        .cell-name {
            min-width: 25ch !important;
        }
        
    }
    ${antTablePaginationCss}
`
const PlaceDetailsPage = () => {
    let { tabName, uniqueId } = useParams<{ tabName?: tabNameProps, uniqueId: string }>();
    const navigate = useNavigate();
    const [isFilter, setIsFilter] = useState(null)

    const { places, media, isAssociationsStepOpen, associatedPlaces } = useSelector(
        (state: RootState) => state.searchResults
    );
    const { data } = useSelector((state: RootState) => state.login);

    let selectedPlaceObjIndex: number = 0
    let selectedPlaceObj: Place = places[0]

    useEffect(() => {
        if (selectedPlaceObj) {
            dispatch(setActivePlaceItem(selectedPlaceObj))
            dispatch(setActivePlaceItemIndex(selectedPlaceObjIndex))
        }
    }, [])

    places.forEach((placeItem: Place, inx: number) => {
        if (placeItem.attributes.uniqueId === uniqueId) {
            selectedPlaceObj = placeItem
            selectedPlaceObjIndex = inx
        }
    })

    const [isSeeMoreHidden, toggleSeeMoreHidden] = useState<boolean>(false)
    const [isCopyDone, setCopyDone] = useState<boolean>(false)
    // const { fetchLibraryItems, hasMoreData, loading } = useLibrary();

    const tableHeaderJson: ColumnsType<any> = [
        {
            title: "NAME",
            key: "attributes",
            dataIndex: "media_unique_id",
            sorter: (a, b) => a?.fileName?.localeCompare(b?.fileName),
            sortDirections: ["ascend"],
            defaultSortOrder: "ascend",
            className: "name-column",
            render: (value: any, record: any) => (
                <Box component="div"
                    sx={{
                        display: "flex",
                        gap: "1em",
                    }}
                >
                    <InsertDriveFileOutlinedIcon fontSize="small" />
                    <Box component="div">{value?.fileName}</Box>
                </Box>
            ),
        },
        {
            title: "DESCRIPTION",
            key: "attributes",
            className: "description-column",
            dataIndex: "media_unique_id", // temporary
            render: (value: any, index) => {
                return value?.description || '-';
            },
        },
        {
            title: "CITATION",
            className: "citation-column cell-citation",
            dataIndex: "media_unique_id", // temporary
            render: (value: any, index) => {
                return value.citation ? value?.citation : '';
            },
        },
        {
            title: "URL",
            key: "attributes",
            dataIndex: "media_unique_id", // temporary
            render: (value, index) => (
                <Box
                    component={"a"}
                    sx={{
                        color: "initial",
                        textDecoration: "underline",
                    }}
                >
                    <Tooltip>
                        {value?.referenceURL || ''}
                    </Tooltip>
                </Box>
            ),
        },
        {
            title: "SIZE",
            key: "attributes",
            dataIndex: "media_unique_id",
            render: (value, index) => value.object?.size ? formatBytes(value.object.size) : "",
        },
        {
            title: "UPDATED",
            key: "media_unique_id",
            dataIndex: "media_unique_id",
            render: (value, index) => formatWebDate(value?.updatedAt),
        },
        {
            title: "",
            key: "action",
            fixed: "right",
            className: "more-menu-ant-cell",
            render: (value: any, record: Media) => (
                // <MoreOptionsComponent id={record.id} record={record} setEdit={setEdit} />
                <MoreOption type="Library" setEdit={setEdit} record={record} />
            ),
        },
    ];

    const tableHeaderJson_events: ColumnsType<any> = [
        {
            title: "",
            key: "visit_unique_id",
            dataIndex: "visit_unique_id",
            className: "cell-image",
            render: (value: any, index: any) => {
                return <>
                    {value?.media_associates[0] ? <Box
                        className={`media-table-image`}
                        component="img"
                        alt={""}
                        // src={value.thumbnailUrl}
                        src={`${baseUrl}${value?.media_associates[0]?.media_unique_id?.object?.url}`}
                        style={{
                            maxWidth: '100%'
                        }}
                    ></Box> : <NoImagePresent message="No media items to display" />}
                </>
            },
        },
        {
            title: "",
            key: "new",
            dataIndex: "new",
            className: "cell-new",
            // render: (value: any, index: any) => "New",
            render: (value: any, index: any) => <div className={`${gridStyles["card-new-flag"]}`}>{checkIsNew(value?.createdAt) ? 'NEW!' : ''}</div>,
        },
        {
            title: "Type",
            key: "attributes",
            dataIndex: "attributes",
            render: (value, index) => value?.siteType?.map((x: string) => `${x};`)
        },
        {
            title: "Date of Event",
            key: "visit_unique_id",
            dataIndex: "visit_unique_id",
            // to-do
            // Events will be sorted by Date of Event newest to oldest

            // sorter: (a: { title: string }, b: { title: any }) => {
            //     return a.title?.localeCompare(b.title);
            //   },
            render: (value, index) => value?.visitDate ? format(
                new Date(
                    // item.attributes.updatedAt
                    value?.visitDate
                ),
                "MM-dd-yyyy"
            ) : '-',
        },
        {
            title: "Participants",
            key: "visit_unique_id",
            dataIndex: "visit_unique_id",
            className: "cell-bearing",
            // render: (value: any, index: any) => "Adam Biernaski, Julian Jansen van Rensburg",
            render: (value: any, index: any) => value?.recordingTeam || '',
        },
        {
            title: "",
            key: "action",
            fixed: "right",
            className: "more-menu-ant-cell events-table-more-menu",
            render: (value: any, record: Event) => (
                // <MoreOptionsComponent id={record.id} record={record} setEdit={setEdit} />
                <MoreOption type="Events" setEdit={setEdit} record={record} />
            ),
        },
    ];

    const { loading } = useMedia();
    const { loading: placeLoading, error, data: placeData, setEdit } = usePlaceDetails();
    const {loading: loadingRemarks, data: remarks, addRemarksMutation, updateRemarksMutation } = useRemarks();

    const dispatch = useDispatch()

    const handleClickMediaItem = (e: React.MouseEvent, itemIndex: number, uniqueId: string, ) => {
        /** itemIndex used to track which item being clicked out of 5;
         * 1st , 2nd etc.
         */
        e.preventDefault()
        if (media.length >= itemIndex) {
            navigate(`/search-results/Media/${uniqueId}`, { replace: true })
            dispatch(setActiveMediaItem(media[itemIndex - 1]))
            dispatch(setActiveMediaItemIndex(itemIndex - 1))
        }
    }


    useEffect(() => {
        if (placeData && (placeData?.siteDescription?.length < 500)) {
            toggleSeeMoreHidden(true)
        }

        if(placeData) {
            dispatch(setActivePlaceItem(placeData))
        }
    }, [placeData])

    if (placeLoading) {
        return <Loader />
    }

    if (!placeLoading && !placeData) {
        return <div>Cant fetch places</div>
    }

    if (!placeData) {
        return null
    }

    const handleSearch = (searchData: any) => {
        // navigate(`/search-results/Places?{"search":"","refinedSearch":{"artifacts":["Observed"]}}`)
        navigate({
            pathname: `/search-results/Places`,
            search: decodeURIComponent(JSON.stringify({
                refinedSearch: searchData
            }))
          });
    }

    const {
        placeNameEnglish, placeNameArabic, placeNumber,
        siteDescription, siteType, period, stateOfConservation,
        risk, tourismValue, researchValue, recommendation,
        placeUIPath, media_associates, libraryItems, visit_associates,
    } = placeData

    const { latitude, longitude } = placeData;

    // console.log('hex: ', shallRenderMedia(4, media_associates))
    return (
        <Box component="div" className={`${styles['details-container']}`}>
            <Grid className={`${styles['image-grid-gap']}`} container style={{
                flexDirection: 'column'
            }}>
                <Grid item style={{
                    width: 'fit-content',
                    float: 'left'
                }}>
                    <Button variant="text" type="button"
                        startIcon={<KeyboardArrowLeftIcon fontSize="small" />}
                        style={{
                            color: 'var(--table-black-text)',
                            textTransform: 'none'
                        }}
                        sx={{
                            '& .MuiButton-startIcon': {
                                marginRight: '4px'
                            }
                        }}
                        onClick={e => {
                            e.preventDefault()
                            /** resetters */
                            dispatch(setActivePlaceItem(null))
                            dispatch(setActivePlaceItemIndex(0))
                            dispatch(setActiveMediaItem(null))
                            dispatch(setActiveMediaItemIndex(0))

                            navigate(`/search-results/${tabName}`, { replace: true })
                        }}
                    >
                        Back to search results
                    </Button>
                </Grid>
                <Box component="div" className={`${styles['content-section']}`}>
                    {
                        // If you dont 1 image also, show placeholder section
                        !media_associates || (media_associates && media_associates.length < 0) ?
                            <Box component="div" className={`${styles['no-images-section']}`}>
                                <NoImagePresent
                                    message={NO_MEDIA}
                                />
                            </Box> :
                            <Box component="div" className={`${styles['images-section']}`}>
                                <Box component="div" style={{
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 10
                                }}>
                                    {
                                        media_associates &&
                                        media_associates.length > 5
                                        && <Button variant="contained" type="button"
                                            style={{
                                                color: '#fff',
                                                backgroundColor: 'var(--black-90-pct)',
                                                borderRadius: '2em',
                                                margin: '1em',
                                                padding: '0.4em 1.2em'
                                            }}
                                            onClick={e => {
                                                e.preventDefault()
                                                dispatch(toggleGalleryView(true))
                                            }}
                                        >
                                            View all
                                        </Button>
                                    }
                                </Box>
                                <Grid container className={`${styles['justify-center']} ${styles['image-grid-gap']}`}
                                    spacing={1}
                                >
                                    <Grid item sm={6} className={`${styles["grid-item"]}`}
                                        onClick={e => {
                                            handleClickMediaItem(e, 1, media_associates[0]?.media_unique_id.uniqueId)
                                        }}
                                    >
                                        {/* {media_associates[0] && <RenderFileData */}
                                        {shallRenderMedia(1, media_associates) && <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: `${baseUrl}${media_associates[0]?.media_unique_id?.object?.url}`,
                                                className: `${styles["single-image"]} ${styles["left-image"]}`
                                            }}
                                            fileType={detectMediaTypeFromMediaAssociate(media_associates[0])}
                                        />}
                                    </Grid>
                                    <Grid item sm={6} className={`${styles['image-grid-gap']} ${styles["image-side-grid"]}`}

                                    >
                                        <Grid container className={`${styles['image-grid-gap']} ${styles['row-1']}`}
                                            spacing={1}
                                        >
                                            <Grid item sm={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}
                                                onClick={e => {
                                                    handleClickMediaItem(e, 2,  media_associates[1]?.media_unique_id.uniqueId)
                                                }}
                                            >
                                                {shallRenderMedia(2, media_associates) && <RenderFileData
                                                    fileData={{
                                                        alt: "",
                                                        src: `${baseUrl}${media_associates[1].media_unique_id?.object?.url}`,
                                                        className: `${styles["single-image"]} ${styles["right-image"]}`
                                                    }}
                                                    fileType={detectMediaTypeFromMediaAssociate(media_associates[1])}
                                                />}
                                                {/* YOUTUBE VIDEO LOAD REFERENCE: DONT DELETE YET */}
                                                {/* <RenderFileData
                                            fileData={{
                                                src: "https://www.youtube.com/watch?v=aU08MWXL0XY",
                                                className: `${styles["single-image"]} ${styles["right-image"]}`,
                                                // thumbnail URL for youtube
                                                thumbNail: "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg"
                                            }}
                                            fileType="video"
                                        /> */}
                                            </Grid>
                                            <Grid item sm={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}
                                                onClick={e => {
                                                    handleClickMediaItem(e, 3,  media_associates[2]?.media_unique_id.uniqueId)
                                                }}
                                            >
                                                {shallRenderMedia(3, media_associates) && <RenderFileData
                                                    fileData={{
                                                        alt: "",
                                                        src: `${baseUrl}${media_associates[2].media_unique_id?.object?.url}`,
                                                        className: `${styles["single-image"]} ${styles["right-image"]}`
                                                    }}
                                                    fileType={detectMediaTypeFromMediaAssociate(media_associates[2])}
                                                />}
                                                {/* 3D model LOAD REFERENCE: DONT DELETE YET */}
                                                {/* <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: images[2],
                                                thumbNail: "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg",
                                                className: `${styles["single-image"]} ${styles["right-image"]}`
                                            }}
                                            fileType="3d"
                                        /> */}
                                            </Grid>
                                        </Grid>
                                        <Grid container className={`${styles['image-grid-gap']}`}
                                            spacing={1}
                                        >
                                            <Grid item sm={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}
                                                onClick={e => {
                                                    handleClickMediaItem(e, 4,  media_associates[3]?.media_unique_id.uniqueId)
                                                }}
                                            >
                                                {shallRenderMedia(4, media_associates) && <RenderFileData
                                                    fileData={{
                                                        alt: "",
                                                        src: `${baseUrl}${media_associates[3].media_unique_id?.object?.url}`,
                                                        className: `${styles["single-image"]} ${styles["right-image"]}`,
                                                        objectURL: media_associates[3].media_unique_id.objectURL || ''

                                                    }}
                                                    fileType={detectMediaTypeFromMediaAssociate(media_associates[3])}
                                                />}
                                                {/* <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: images[3],
                                                className: `${styles["single-image"]} ${styles["right-image"]}`
                                            }}
                                            fileType="image"
                                        /> */}
                                            </Grid>
                                            <Grid item sm={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}
                                                onClick={e => {
                                                    handleClickMediaItem(e, 5,  media_associates[4]?.media_unique_id.uniqueId)
                                                }}
                                            >
                                                {shallRenderMedia(5, media_associates) && <RenderFileData
                                                    fileData={{
                                                        alt: "",
                                                        src: `${baseUrl}${media_associates[4].media_unique_id?.object?.url}`,
                                                        className: `${styles["single-image"]} ${styles["right-image"]}`,
                                                        objectURL: media_associates[4].media_unique_id.objectURL || ''
                                                    }}
                                                    fileType={detectMediaTypeFromMediaAssociate(media_associates[4])}
                                                />}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                    }
                    <Box component="div" className={`${styles['title-section']}`}>
                        <Grid container className={`${styles['title-section-grid']}`}>
                            <Grid item sm={11} className={`${styles['title-section-left-item']}`}>
                                {/* to-do:  Make these true && dependent on incoming API variable.
                                If it exists, render the jsx */}
                                {placeNameEnglish && <Grid container>
                                    <Grid item>
                                        <Box component="div" className={`${styles['item-name']}`}>
                                            {placeNameEnglish}
                                        </Box>
                                    </Grid>
                                    {placeNameArabic && <Grid item>
                                        <Box component="div" className={`${styles['item-name-arabic']}`}>
                                            {placeNameArabic}
                                        </Box>
                                    </Grid>}
                                </Grid>}
                                <Box component="div" className={`${styles['item-number']}`}>
                                    {placeNumber}
                                </Box>
                            </Grid>
                            <Grid item sm={1}>
                                <Box component="div" className={`${styles['more-icon-box']}`}
                                >
                                    {isAssociationsStepOpen ?
                                        <DetachedIcon
                                            style={{
                                                // height: '18px',
                                                // position: 'relative',
                                                // top: '3px',
                                            }}
                                            shouldShowAttachIcon={isPlaceDetailAttached(placeData, associatedPlaces)}
                                            onClick={e => {
                                                const data: InventoryAssociationType = {
                                                    id: Number(placeData.id),
                                                    placeNameEnglish: placeData.placeNameEnglish,
                                                    placeNameArabic: placeData.placeNameArabic,
                                                    placeNumber: placeData.placeNumber,
                                                }

                                                dispatch(modifyAssociatedPlaces({
                                                    newItem: data,
                                                    removeId: null
                                                }))
                                            }}
                                        /> :
                                        // <></>: 
                                        <MoreOption
                                            type="Places"
                                            setEdit={setEdit}
                                            record={placeData}
                                        />}
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                    <Box component="div" className={`${styles['details-section']}`}>
                        <Grid container className={`${styles['details-section-main-grid']}`}
                            rowSpacing={2}
                        >
                            <Grid item sm={7} className={`${styles['text-left']} ${styles['section-left']}`}>
                                {
                                    <Box component="div" className={`${styles['site-desc']}`}>
                                        {siteDescription ?
                                            <>
                                                <Box component="div"
                                                    className={`${styles['site-desc-condensed']} ${isSeeMoreHidden ? styles['see-more-active'] : ''}`}
                                                >
                                                    {siteDescription.substring(0, !isSeeMoreHidden ? 500 : siteDescription.length - 1)}
                                                </Box>
                                                {
                                                    !isSeeMoreHidden && <Box component="div" className={`${styles['see-more-box']}`} onClick={e => {
                                                        toggleSeeMoreHidden(state => !state)
                                                    }}>{!isSeeMoreHidden ? '...See More' : ''}</Box>
                                                }
                                            </> :
                                            <NoTextPresent
                                                message={NO_DESCRIPTION}
                                            />}
                                    </Box>
                                }
                                <Box component="div" className={`${styles['table']}`}>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={5} md={4} className={`${styles['table-parameter']} `}>
                                            Site Type
                                        </Grid>
                                        <Grid item>
                                            <Box component={"div"} className={`${styles['text-anchors-parent']}`}>
                                                {
                                                    !isEmpty(siteType) ? siteType.map((item: string, index: number) => (
                                                        <Box
                                                            key={index}
                                                            component="div"
                                                            className={`${styles['text-anchor']}`}
                                                            onClick={() => handleSearch({siteType: [item]})}
                                                        >
                                                            {item}
                                                        </Box>
                                                    )) :
                                                        <NoTextPresent
                                                            message={NO_TEXT}
                                                        />
                                                }
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={5} md={4} className={`${styles['table-parameter']}`}>
                                            Period
                                        </Grid>
                                        <Grid item>
                                            {/* 
                                            to-do::
                                            Site type and period will act as a link to a quick search. For example if 
                                            the Site Type says  “Building”, when the user clicks on it, the user will 
                                            be redirected to the search results page where they will see the list of 
                                            all places where the site type = building. */}
                                            <Box component={"div"} className={`${styles['text-anchors-parent']}`}>
                                                {
                                                    !isEmpty(period) ? period.map((item, index) => (
                                                        <Box
                                                            key={index}
                                                            component="div"
                                                            className={`${styles['text-anchor']}`}
                                                        >
                                                            {item}
                                                        </Box>
                                                    )) :
                                                        <NoTextPresent
                                                            message={NO_TEXT}
                                                        />
                                                }
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={5} md={4} className={`${styles['table-parameter']}`}>
                                            State of Conservation
                                        </Grid>
                                        {
                                            !isEmptyValue(stateOfConservation) ? stateOfConservation.map((item: string, index: number) =>
                                                <Grid item key={index}>
                                                    {item}
                                                </Grid>) :
                                                <Grid item>
                                                    <NoTextPresent
                                                        message={NO_TEXT}
                                                    />
                                                </Grid>

                                        }
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={5} md={4} className={`${styles['table-parameter']}`}>
                                            Risk
                                        </Grid>
                                        {
                                            !isEmptyValue(risk) ? risk.map((item: string, index: number) =>
                                                <Grid item key={index}>
                                                    {item}
                                                </Grid>) :
                                                <Grid item>
                                                    <NoTextPresent
                                                        message={NO_TEXT}
                                                    />
                                                </Grid>
                                        }
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={5} md={4} className={`${styles['table-parameter']}`}>
                                            Tourism Value
                                        </Grid>
                                        {
                                            !isEmptyValue(tourismValue) ? tourismValue.map((item: string, index: number) =>
                                                <Grid item key={index}>
                                                    {item}
                                                </Grid>) :
                                                <Grid item>
                                                    <NoTextPresent
                                                        message={NO_TEXT}
                                                    />
                                                </Grid>
                                        }

                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={5} md={4} className={`${styles['table-parameter']}`}>
                                            Research Value
                                        </Grid>
                                        {
                                            !isEmptyValue(researchValue) ? researchValue.map((item: string, index: number) =>
                                                <Grid item key={index}>
                                                    {item}
                                                </Grid>) :
                                                <Grid item>
                                                    <NoTextPresent
                                                        message={NO_TEXT}
                                                    />
                                                </Grid>
                                        }
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={5} md={4} className={`${styles['table-parameter']}`}>
                                            Assessment
                                        </Grid>
                                        <Grid item>
                                            -
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={5} md={4} className={`${styles['table-parameter']}`}>
                                            Recommendation
                                        </Grid>
                                        {
                                            !isEmptyValue(recommendation) ? recommendation.map((item: string, index: number) =>
                                                <Grid item key={index}>
                                                    {item}
                                                </Grid>) :
                                                <Grid item>
                                                    <NoTextPresent
                                                        message={NO_TEXT}
                                                    />
                                                </Grid>
                                        }
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={5} md={4} className={`${styles['table-parameter']}`}>
                                            URL
                                        </Grid>
                                        <Grid item sm={7} md={8}>
                                            {/* to-do */}
                                            {/* When clicking on the URL link, the link should be copied to the clip board. 
                                            A success message will be displayed with the message “URL copied to clipboard” */}
                                            <Box component="div"
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onClick={e => {
                                                    setCopyDone(true)
                                                    copyToClipboard(placeUIPath ?? '')
                                                }}
                                            >
                                                {placeUIPath}
                                            </Box>
                                            <PositionedSnackbar
                                                message={"Copied to clipboard"}
                                                severity={"success"}
                                                open={isCopyDone}
                                                handleClose={() => setCopyDone(false)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item sm={5}>
                                {
                                    (latitude && longitude) ?
                                        <>
                                            <MapView filterId={setIsFilter} key={4} marker={[{
                                                id: 0,
                                                name: `${placeNameEnglish}`,
                                                position: {
                                                    lat: latitude || 24.11,
                                                    lng: longitude || 34.98
                                                }
                                            }]} />
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
                                            </Grid>
                                        </> :
                                        <NoMapPresent
                                            message={NO_LOCATION}
                                        />
                                }
                            </Grid>
                        </Grid>

                    </Box>
                    <Box component="div" className={`${styles['heading']} ${styles['text-left']}`}>
                        <Box component="div" className={`${styles['heading-title']}`}>
                            <Box component="div">Library</Box>
                            {!isEmpty(libraryItems) && <Box component="div">{libraryItems.length} Items</Box>}
                        </Box>
                        <Box component="div" className={`${styles["table-wrapper"]}`}>
                            {
                                !isEmpty(libraryItems) ?
                                    <StyledTableWrapper
                                        className={`${styles["table-container"]}`}
                                        rowKey={"id"}
                                        size="small"
                                        columns={tableHeaderJson}
                                        dataSource={libraryItems ? libraryItems : []}
                                        pagination={false}
                                        loading={false}
                                        bordered
                                        scroll={{ x: true, y: 300 }}
                                        style={{
                                            background: "transparent",
                                        }}
                                    ></StyledTableWrapper> :
                                    <NoTextPresent
                                        message={NO_TABLE_ROWS}
                                    />
                            }
                        </Box>
                    </Box>
                    {/* Currently showing only 1 events oit of available list */}
                    <Box component="div" className={`${styles['events-section']} ${styles['heading']} ${styles['text-left']}`}>
                        <Box component="div" className={`${styles['heading-title']}`}>
                            <Box component="div">Events</Box>
                            {!isEmpty(visit_associates) && <Box component="div">{visit_associates.length} Items</Box>}
                        </Box>
                        <Box component="div" className={`${styles["table-wrapper"]}`}>
                            {
                                !isEmpty(visit_associates) ?
                                    <StyledTableWrapper
                                        rowKey={"id"}
                                        size="small"
                                        columns={tableHeaderJson_events}
                                        // dataSource={events.slice(0,1)}
                                        dataSource={visit_associates}
                                        pagination={false}
                                        loading={loading ? loading : false}
                                        bordered
                                        scroll={{ y: 500, scrollToFirstRowOnChange: true }}
                                        style={{
                                            background: "transparent",
                                        }}
                                        onRow={(record: any, rowIndex: number | undefined) => {
                                            return {
                                                onClick: (event) => {
                                                    if (typeof rowIndex === "number") {
                                                        dispatch(setActiveEventItem(record))
                                                        dispatch(setActiveEventItemIndex(rowIndex))
                                                        navigate(`/search-results/Events/${record.visit_unique_id.uniqueId}`, { replace: true })
                                                    }
                                                },
                                            };
                                        }}
                                    ></StyledTableWrapper> :
                                    <NoTextPresent
                                        message={NO_TABLE_ROWS}
                                    />
                            }
                        </Box>
                    </Box>
                    <Box component="div" className={`${styles['remarks-section']}  ${styles['heading']} ${styles['text-left']}`}>
                        <Box component="div" className={`${styles['heading-title']}`}>
                            <Box component="div">Remarks</Box>
                        </Box>
                        <CommentsSection
                            id={placeData?.id}
                            type={"Place"}
                            remarks={remarks}
                            addRemarks={addRemarksMutation}
                            updateRemarks={updateRemarksMutation}
                            SelfIcon={() => <RenderInitials firstName={data?.firstName} lastName={data?.lastName} />}
                        />
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
}

export default PlaceDetailsPage;