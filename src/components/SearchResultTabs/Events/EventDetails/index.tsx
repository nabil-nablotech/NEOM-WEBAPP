import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { tabNameProps } from "../../../../types/SearchResultsTabsProps";
import styles from './index.module.css'
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
import { MoreOptionsComponent } from "../../Media/ListView/MoreOption";
import { antTablePaginationCss, baseUrl, computeArrayFromDelimiter, copyToClipboard, formatBytes, formatWebDate, stringAvatar } from "../../../../utils/services/helpers";
import { Tooltip } from "antd";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { Media } from "../../../../types/Media";
import styled from "styled-components";
import { format } from "date-fns";
import useMedia from "../../../../hooks/useMedia";
import CommentsSection from "../../../CommentsSection";
import RenderInitials from "../../../RenderInitials";
import { useDispatch } from "react-redux";
import {  setActiveMediaItem, setActiveMediaItemIndex, setActivePlaceItem, setActivePlaceItemIndex } from "../../../../store/reducers/searchResultsReducer";
import { CustomMoreOptionsComponent } from "../../../CustomMoreOptionsComponent";
import PositionedSnackbar from "../../../Snackbar";
import YellowStar from '../../../../assets/images/searchResults/YellowStar.svg'
import { useMediaQuery } from 'react-responsive'
import useEventDetails from "../../../../hooks/useEventDetails";
import Loader from "../../../Common/Loader";
import MapView from "../../GoogleMap/MapView";

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

        .ant-table {
            margin-block: 1em;
        }

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
const EventDetailsPage = () => {
    let { tabName, uniqueId } = useParams<{ tabName?: tabNameProps, uniqueId: string }>();
    const navigate = useNavigate();
    
    const { places, library, events, media } = useSelector(
        (state: RootState) => state.searchResults
    );
    const { data } = useSelector((state: RootState) => state.login);

    let selectedPlaceObjIndex: number = 0
    let selectedPlaceObj: Place = places[0]

    const {loading: eventLoading, data: eventDetails} = useEventDetails();

    useEffect(() => {
        // if (eventDetails) {
        //     dispatch(setActiveEventItem(eventDetails))
        //     dispatch(setActiveEventItemIndex(0))
        // }
    }, [])

    places.forEach((placeItem: Place, inx: number) => {
        if (placeItem.attributes.uniqueId === uniqueId) {
            selectedPlaceObj = placeItem
            selectedPlaceObjIndex = inx
        }
    })

    // get from api
    let [images, setImages] = useState<any>([
        'https://via.placeholder.com/150/92c952',
        'https://via.placeholder.com/150/771796',
        'https://via.placeholder.com/150/24f355',
        'https://via.placeholder.com/150/d32776',
        'https://via.placeholder.com/150/f66b97',
    ])
    const [isMoreTitleMenuOpen, setMoreTitleMenuOpen] = useState<false>(false)
    const [isSeeMore, toggleSeeMore] = useState<boolean>(false)
    const [isCopyDone, setCopyDone] = useState<boolean>(false)


    // const { fetchLibraryItems, hasMoreData, loading } = useLibrary();

    const {
        anchorEl,
        open,
        handleClick,
        handleClose,
        handleSettingsClose
    } = useAnchor()


    const { fetchMediaItems, hasMoreData, loading } = useMedia();
    const dispatch = useDispatch()

    const [mediaGridActiveItems, setMediaGridActiveItems] = useState<number>(0)

    let mediaCount = 8
    const isTablet = useMediaQuery({ query: '(min-width: 575px) and (max-width: 1025px)' })
    if(isTablet) {
        mediaCount = 6
    }



    if(eventLoading) {
        return <Loader />
    }
    
    if(!eventLoading && !eventDetails) {
        return <div>Cant fetch event</div>
    }

    if (!eventDetails) {
        return null
    }

    const {
        siteDescription, siteType, period, fieldNarrative, stateOfConservation,
        risk, tourismValue, researchValue, recommendation,
        visitUIPath, visitDate, recordingTeam,
        visitNumber,
        libraryItems, mediaGallery, visit_associate,
    } = eventDetails

    const mediaGalleryLocal = mediaGridActiveItems + mediaCount <= mediaGallery.length ? mediaGallery.slice(0, mediaGridActiveItems + mediaCount) :
        mediaGallery.slice(
            0,
            mediaGridActiveItems + (mediaGallery.length - mediaGridActiveItems)
        )


    
    const {latitude, longitude} = eventDetails

    if (visit_associate?.place_unique_id) {

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
                    <Box component="div">{value.fileName}</Box>
                </Box>
            ),
        },
        {
            title: "DESCRIPTION",
            key: "attributes",
            className: "description-column",
            dataIndex: "media_unique_id", // temporary
            render: (value: any, index) => {
                return value?.description;
            },
        },
        {
            title: "CITATION",
            className: "citation-column cell-citation",
            dataIndex: "media_unique_id", // temporary
            render: (value: any, index) => {
                return value.citation ? value.citation : 'static citation';
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
                        {value.referenceURL ?? "static URL"}
                    </Tooltip>
                </Box>
            ),
        },
        {
            title: "SIZE",
            key: "attributes",
            dataIndex: "media_unique_id",
            render: (value, index) => value.object.size ? formatBytes(value.object.size) : "static size",
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
                <MoreOptionsComponent id={record.id} record={record} />
            ),
        },
    ];

    
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

    const handleClickMediaItem = (e: React.MouseEvent, itemIndex: number) => {
        /** itemIndex used to track which item being clicked out of 5;
         * 1st , 2nd etc.
         */
        e.preventDefault()
        if (media.length >= itemIndex) {
            navigate(`/search-results/Media/${media[itemIndex - 1].attributes.uniqueId}`, { replace: true })
            dispatch(setActiveMediaItem(media[itemIndex - 1]))
            dispatch(setActiveMediaItemIndex(itemIndex - 1))
        }
    }
    // const { placeNameEnglish, placeNameArabic, placeNumber} = visit_associate?.place_unique_id;

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
                        Back
                    </Button>
                </Grid>
                <Box component="div" className={`${styles['content-section']}`}>
                    <Box component="div" className={`${styles['title-section']}`}>
                        <Grid container className={`${styles['title-section-grid']}`}>
                            <Grid item className={`${styles['title-section-left-item']}`}>
                                {/* to-do:  Make these true && dependent on incoming API variable.
                                If it exists, render the jsx */}
                                {visit_associate?.place_unique_id?.placeNameEnglish && <Grid container>
                                    <Grid item>
                                        <Box component="div" className={`${styles['item-name']}`}>
                                            {visit_associate?.place_unique_id?.placeNameEnglish}
                                        </Box>
                                    </Grid>
                                    {visit_associate?.place_unique_id?.placeNameArabic && <Grid item>
                                        <Box component="div" className={`${styles['item-name-arabic']}`}>
                                            {visit_associate?.place_unique_id?.placeNameArabic}
                                        </Box>
                                    </Grid>}
                                    {visit_associate?.place_unique_id?.placeNumber && <Grid item>
                                        <Box component="div" className={`${styles['item-number']}`}>
                                            {`- ${visit_associate?.place_unique_id?.placeNumber}`}
                                        </Box>
                                    </Grid>}
                                </Grid>}
                                <Box component="div" className={`${styles['visited-by-main-box']}`}>
                                    <Box component="span">Visited on {visitDate} by </Box>
                                    <Box component="span">{recordingTeam}</Box>
                                </Box>
                                <Box component="div" className={`${styles['visit-count']}`}>
                                    VISIT {visitNumber}
                                </Box>
                            </Grid>
                            <Grid item className={`${styles['title-section-grid']}`}>
                                <Box component="div" className={`${styles['more-icon-box']}`}
                                >
                                    <CustomMoreOptionsComponent
                                        menuActions={menuItems}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                    <Box component="div" className={`${styles['details-section']}`}>
                        <Grid container className={`${styles['details-section-main-grid']}`}
                            rowSpacing={2}
                        >
                            <Grid item sm={7} className={`${styles['text-left']} ${styles['section-left']}`}>
                                <Box component="div" className={`${styles['site-desc']}`}>
                                    {/* If needed See More functionality in future, copy from PlaceDetails */}
                                    <Box component="div"
                                        className={`${styles['site-desc-condensed']} ${styles['see-more-active']}`}
                                    >
                                        {siteDescription.substring(0, 200)}
                                    </Box>
                                </Box>
                                <Box component="div" className={`${styles['table']}`}>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']} `}>
                                            Site Type
                                        </Grid>
                                        <Grid item>
                                            <Box component={"div"} className={`${styles['text-anchors-parent']}`}>
                                                {
                                                    siteType && siteType.map(item => (
                                                        <Box
                                                            component="div"
                                                            className={`${styles['text-anchor']}`}
                                                        >
                                                            {item}
                                                        </Box>
                                                    ))
                                                }
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
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
                                                    period && period.map(item => (
                                                        <Box
                                                            component="div"
                                                            className={`${styles['text-anchor']}`}
                                                        >
                                                            {item}
                                                        </Box>
                                                    ))
                                                }
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Field Narrative
                                        </Grid>
                                        <Grid item sm={8} className={`${styles['table-parameter-value']}`}>
                                            {
                                                fieldNarrative
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            State of Conservation
                                        </Grid>
                                        {stateOfConservation.map(item => <Grid item>
                                            {item}
                                        </Grid>)}
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Risk
                                        </Grid>
                                        
                                        {risk.map(item => <Grid item>
                                            {item}
                                        </Grid>)}
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Tourism Value
                                        </Grid>
                                        
                                        {tourismValue.map(item => <Grid item sm={8} md={7} className={`${styles['table-parameter-value']}`}>
                                            {item}
                                        </Grid>)}
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Research Value
                                        </Grid>
                                        {researchValue.map(item => <Grid item>
                                            {item}
                                        </Grid>)}
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Recommendation
                                        </Grid>
                                        {recommendation.map(item => <Grid item>
                                            {item}
                                        </Grid>)}
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            URL
                                        </Grid>
                                        <Grid item>
                                            {/* to-do */}
                                            {/* When clicking on the URL link, the link should be copied to the clip board. 
                                            A success message will be displayed with the message “URL copied to clipboard” */}
                                            <Box component="div"
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onClick={e => {
                                                    setCopyDone(true)
                                                    copyToClipboard(visitUIPath)
                                                }}
                                            >
                                                {visitUIPath}
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
                                <MapView key={14} marker={[{
                                    id: 0,
                                    name: `${"P event name"}`,
                                    position: {
                                        lat: latitude,
                                        lng: longitude
                                    }
                                }]}/>
                                <Grid container className={`${styles['map-loctn-details']}`} >
                                    <Grid item lg={5} md={5} sm={5}>
                                        <Grid container className={`${styles['map-loctn-line']}`}>
                                            <Grid item style={{ fontWeight: 'bold' }} >Latitude</Grid>
                                            <Grid item>{latitude}</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={5} md={5} sm={6}>
                                        <Grid container className={`${styles['map-loctn-line']}`}>
                                            <Grid item style={{ fontWeight: 'bold' }} >Longitude</Grid>
                                            <Grid item>{longitude}</Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Box>
                    <Box component="div" className={`${styles['heading']} ${styles['text-left']}`}>
                        <Box component="div" className={`${styles['heading-title']}`}>
                            <Box component="div">Library</Box>
                            <Box component="div">{libraryItems.length} Items</Box>
                        </Box>
                        <Box component="div">
                            <StyledTableWrapper
                                className={`${styles["table-container"]}`}
                                rowKey={"id"}
                                size="small"
                                columns={tableHeaderJson}
                                dataSource={libraryItems ? libraryItems: []}
                                pagination={false}
                                loading={false}
                                bordered
                                scroll={{ x: true, y: 300 }}
                                style={{
                                    background: "transparent",
                                }}
                            ></StyledTableWrapper>
                        </Box>
                    </Box>
                    {/* Currently showing only 1 events oit of available list */}
                    <Box component="div" className={`${styles['events-section']} ${styles['heading']} ${styles['text-left']}`}>
                        <Box component="div" className={`${styles['heading-title']}`}>
                            <Box component="div">Media Gallery</Box>
                            <Box component="div">{mediaGallery.length} Items</Box>
                        </Box>
                        <Box component="div">
                            <Grid container className={`${styles['media-grid']}`}>
                                {
                                    mediaGalleryLocal && mediaGalleryLocal.map((itemObj, inx) => (
                                        <Grid item lg={3} md={4} sm={4} key={inx} className={`${styles['media-grid-item']}`}
                                            onClick={e => {
                                                dispatch(setActiveMediaItem(itemObj))
                                                dispatch(setActiveMediaItemIndex(inx))
                                                navigate(`/search-results/Media/${itemObj.media_unique_id.uniqueId}`, { replace: true, state: {from: 'events'} })
                                            }}
                                        >
                                            <RenderFileData
                                                fileData={{
                                                    alt: "",
                                                    // src: itemObj.attributes.media_associates.data[0].attributes.media_unique_id.data.attributes.object.data.attributes.url,
                                                    src: `${baseUrl}${itemObj.media_unique_id.object.url}`,
                                                    className: styles['media-image']
                                                }}
                                                fileType="image"
                                            />
                                            <Box component="div">
                                                <Grid container className={`${styles['media-grid-item-options-row']}`}>
                                                    <Grid item>
                                                        {/* To-do: modify featured image flag */}
                                                        {inx === 0 && <Box component="div">
                                                            <Grid container className={`${styles['star-icon-grid']}`}>
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
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                        <Grid container sx={{
                            justifyContent: 'center',
                            '& .MuiGrid-root.MuiGrid-item:has(.Mui-disabled.MuiButtonBase-root.MuiButton-root)': {
                                cursor: 'not-allowed'
                            },
                            '& .MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary:hover': {
                                backgroundColor: 'unset'
                            }
                        }}>
                            <Grid item sx={{
                                width: 'fit-content',
                                '& .MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary:hover': {
                                    backgroundColor: 'unset'
                                }
                            }}>
                                <Button variant="contained" type="button"
                                    sx={{
                                        color: 'var(--black-90-pct)',
                                        backgroundColor: 'transparent',
                                        borderRadius: '2em',
                                        margin: '1em',
                                        padding: '0.4em 1.2em',
                                        cursor: 'pointer'
                                    }}
                                    onClick={e => {
                                        e.preventDefault()

                                        if(mediaGalleryLocal.length === mediaGallery.length) {
                                            setMediaGridActiveItems(8)
                                        } else {
                                            setMediaGridActiveItems(state => state + 8)
                                        }
                                    }}
                                >
                                    See {mediaGalleryLocal.length === mediaGallery.length ? 'Less': 'More'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component="div" className={`${styles['remarks-section']}  ${styles['heading']} ${styles['text-left']}`}>
                        <Box component="div" className={`${styles['heading-title']}`}>
                            <Box component="div">Remarks</Box>
                        </Box>
                        <CommentsSection
                            SelfIcon={() => <RenderInitials firstName={data?.firstName} lastName={data?.lastName} />}
                        />
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
}

export default EventDetailsPage;