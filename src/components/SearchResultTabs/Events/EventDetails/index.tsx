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
import { antTablePaginationCss, copyToClipboard, formatWebDate, stringAvatar } from "../../../../utils/services/helpers";
import { Tooltip } from "antd";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { Media } from "../../../../types/Media";
import styled from "styled-components";
import { format } from "date-fns";
import useMedia from "../../../../hooks/useMedia";
import CommentsSection from "../../../CommentsSection";
import RenderInitials from "../../../RenderInitials";
import { useDispatch } from "react-redux";
import { setActiveMediaItem, setActiveMediaItemIndex, setActivePlaceItem, setActivePlaceItemIndex, toggleGalleryView } from "../../../../store/reducers/searchResultsReducer";
import { CustomMoreOptionsComponent } from "../../../CustomMoreOptionsComponent";
import PositionedSnackbar from "../../../Snackbar";
import YellowStar from '../../../../assets/images/searchResults/YellowStar.svg'
import { useMediaQuery } from 'react-responsive'
import useEventDetails from "../../../../hooks/useEventDetails";

const StyledTableWrapper = styled(StyledAntTable)`
    
    .ant-table-container {
    }
    .ant-table {
        margin-block: 2em;
    }
    
    .ant-table-thead > tr > th:not(.ant-table-thead > tr > th.more-menu-ant-cell) ,
    .ant-table-tbody > tr > td:not(.ant-table-tbody > tr > td.more-menu-ant-cell) {
        min-width: 50px;
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
    const {data: eventDetails} = useEventDetails();

    const { places, library, events, media } = useSelector(
        (state: RootState) => state.searchResults
    );
    const { data } = useSelector((state: RootState) => state.login);
    const [mediaGridActiveItems, setMediaGridActiveItems] = useState<number>(0)

    let mediaCount = 8
    const isTablet = useMediaQuery({ query: '(min-width: 575px) and (max-width: 1025px)' })
    if(isTablet) {
        mediaCount = 6
    }

    const mediaList = mediaGridActiveItems + mediaCount <= places.length ? places.slice(0, mediaGridActiveItems + mediaCount) :
        places.slice(
            0,
            mediaGridActiveItems + (places.length - mediaGridActiveItems)
        )

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

    const {
        placeNameEnglish, placeNameArabic, placeNumber,
        siteDescription,
    } = selectedPlaceObj?.attributes

    const { latitude, longitude } = selectedPlaceObj

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

    // const { fetchLibraryItems, hasMoreData, loading } = useLibrary();

    const {
        anchorEl,
        open,
        handleClick,
        handleClose,
        handleSettingsClose
    } = useAnchor()

    const tableHeaderJson: ColumnsType<any> = [
        {
            title: "NAME",
            key: "attributes",
            dataIndex: "attributes",
            sorter: (a, b) => a?.title?.localeCompare(b?.title),
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
                    <Box component="div">{value.title}</Box>
                </Box>
            ),
        },
        {
            title: "DESCRIPTION",
            key: "attributes",
            className: "description-column",
            dataIndex: "attributes", // temporary
            render: (value: any, index) => {
                return value.description;
            },
        },
        {
            title: "CITATION",
            className: "citation-column cell-citation",
            dataIndex: "attributes", // temporary
            render: (value: any, index) => {
                return value.citation;
            },
        },
        {
            title: "URL",
            key: "attributes",
            dataIndex: "attributes", // temporary
            render: (value, index) => (
                <Box
                    component={"a"}
                    sx={{
                        color: "initial",
                        textDecoration: "underline",
                    }}
                >
                    <Tooltip>
                        {value.referenceURL}
                    </Tooltip>
                </Box>
            ),
        },
        {
            title: "SIZE",
            key: "attributes",
            dataIndex: "attributes",
            render: (value, index) => value?.imageMetadata?.fileSize ?? 'Temp',
        },
        {
            title: "UPDATED",
            key: "attributes",
            dataIndex: "attributes",
            render: (value, index) => formatWebDate(value.updatedAt),
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

    const tableHeaderJson_media: ColumnsType<any> = [
        {
            title: "",
            key: "attributes",
            dataIndex: "attributes",
            className: "cell-image",
            render: (value: any, index: any) => (
                <>
                    <Box
                        className={`media-table-image`}
                        component="img"
                        alt={""}
                        src={value.thumbnailUrl}
                    ></Box>
                </>
            ),
        },
        {
            title: "",
            key: "new",
            dataIndex: "new",
            className: "cell-new",
            render: (value: any, index: any) => "New",
        },
        {
            title: "Type",
            key: "attributes",
            dataIndex: "attributes",
            render: (value, index) => "render_type"
        },
        {
            title: "Date of Event",
            key: "attributes",
            dataIndex: "attributes",
            // to-do
            // Events will be sorted by Date of Event newest to oldest

            // sorter: (a: { title: string }, b: { title: any }) => {
            //     return a.title?.localeCompare(b.title);
            //   },
            render: (value, index) => format(
                new Date(
                    // item.attributes.updatedAt
                ),
                "MM-dd-yyyy"
            ),
        },
        {
            title: "Participants",
            key: "attributes",
            dataIndex: "attributes",
            className: "cell-bearing",
            render: (value: any, index: any) => "Adam Biernaski, Julian Jansen van Rensburg",
        },
        {
            title: "",
            key: "action",
            fixed: "right",
            className: "more-menu-ant-cell events-table-more-menu",
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

    const { fetchMediaItems, hasMoreData, loading } = useMedia();
    const dispatch = useDispatch()

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
                                {true && <Grid container>
                                    <Grid item>
                                        <Box component="div" className={`${styles['item-name']}`}>
                                            Al-Muwaylih   Al-Muwaylih
                                        </Box>
                                    </Grid>
                                    {true && <Grid item>
                                        <Box component="div" className={`${styles['item-name-arabic']}`}>
                                            الُموَيْلح - الحي التراثي
                                        </Box>
                                    </Grid>}
                                    {true && <Grid item>
                                        <Box component="div" className={`${styles['item-number']}`}>
                                            - N00381
                                        </Box>
                                    </Grid>}
                                </Grid>}
                                <Box component="div" className={`${styles['visited-by-main-box']}`}>
                                    <Box component="span">Visited on 7 September, 2022 by </Box>
                                    <Box component="span">Adam Biernaski, Julian Jansen van Rensburg</Box>
                                </Box>
                                <Box component="div" className={`${styles['visit-count']}`}>
                                    VISIT 1
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
                                            <Box component={"a"} href="#" className={`${styles['anchor']}`}>
                                                Settlement
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
                                            <Box component={"a"} href="#" className={`${styles['anchor']}`}>
                                                Modern,Ottoman
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Field Narrative
                                        </Grid>
                                        <Grid item sm={8} className={`${styles['table-parameter-value']}`}>
                                            {
                                                `The site is west of highway 55, on a terrace overlooking a Wadi Sh site has one feature (F001). F001 is a rectangular rock alignment w concentration with an open center that is roughly square in the south`
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            State of Conservation
                                        </Grid>
                                        <Grid item>
                                            Good
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Risk
                                        </Grid>
                                        <Grid item>
                                            No threat
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Tourism Value
                                        </Grid>
                                        <Grid item sm={8} md={7} className={`${styles['table-parameter-value']}`}>
                                            Local - Only of local interest, although could provide the basis for an overnight stop
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Research Value
                                        </Grid>
                                        <Grid item>
                                            Has very little or no academic research value
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item sm={3} md={4} className={`${styles['table-parameter']}`}>
                                            Recommendation
                                        </Grid>
                                        <Grid item>
                                            Protected
                                        </Grid>
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
                                                    copyToClipboard('https://www.neomheritage.com/place/N00381')
                                                }}
                                            >
                                                https://www.neomheritage.com/place/N00381
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
                                <RenderFileData
                                    fileData={{
                                        alt: "",
                                        src: images[4],
                                        className: `${styles["single-image"]} ${styles["map-right-image"]}`
                                    }}
                                    fileType="image"
                                />
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

                    </Box>
                    <Box component="div" className={`${styles['heading']} ${styles['text-left']}`}>
                        <Box component="div" className={`${styles['heading-title']}`}>
                            <Box component="div">Library</Box>
                            <Box component="div">3 Items</Box>
                        </Box>
                        <Box component="div">
                            <StyledTableWrapper
                                className={`${styles["table-container"]}`}
                                rowKey={"id"}
                                size="small"
                                columns={tableHeaderJson}
                                dataSource={library}
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
                            <Box component="div">12 Items</Box>
                        </Box>
                        <Box component="div">
                            <Grid container className={`${styles['media-grid']}`}>
                                {
                                    mediaList && mediaList.map((itemObj, inx) => (
                                        <Grid item lg={3} md={4} sm={4} key={inx} className={`${styles['media-grid-item']}`}
                                            onClick={e => {
                                                dispatch(setActiveMediaItem(media[inx]))
                                                dispatch(setActiveMediaItemIndex(inx))
                                                navigate(`/search-results/Media/${media[inx].attributes.uniqueId}`, { replace: true, state: {from: 'events'} })
                                            }}
                                        >
                                            <RenderFileData
                                                fileData={{
                                                    alt: "",
                                                    // src: itemObj.attributes.media_associates.data[0].attributes.media_unique_id.data.attributes.object.data.attributes.url,
                                                    src: '',
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
                                    disabled={mediaList.length === places.length}
                                    onClick={e => {
                                        e.preventDefault()
                                        setMediaGridActiveItems(state => state + 8)
                                    }}
                                >
                                    See More
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