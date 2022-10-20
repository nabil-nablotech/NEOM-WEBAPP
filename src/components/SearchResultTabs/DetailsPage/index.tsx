import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { tabNameProps } from "../../../types/SearchResultsTabsProps";
import styles from './index.module.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import RenderFileData from "../../RenderFileData";
import { Place } from "../../../types/Place";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuList from "../../MenuList";
import { useAnchor } from "../../../hooks/useAnchor";
import { StyledAntTable } from "../../StyledAntTable";
import { ColumnsType } from "antd/lib/table";
// import { usePaginatedArray } from "../../../hooks/usePaginatedArray";
// import useLibrary from "../../../hooks/useLibrary";
import { MoreOptionsComponent } from "../Media/ListView/MoreOption";
import { antTablePaginationCss, formatWebDate, stringAvatar } from "../../../utils/services/helpers";
import { Tooltip } from "antd";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { Media } from "../../../types/Media";
import styled from "styled-components";
import { format } from "date-fns";
import useMedia from "../../../hooks/useMedia";
import CommentsSection from "../../CommentsSection";
import RenderInitials from "../../RenderInitials";
import { useDispatch } from "react-redux";
import { setActiveMediaItem, setActiveMediaItemIndex, setActivePlaceItem, setActivePlaceItemIndex } from "../../../store/reducers/searchResultsReducer";
import { CustomMoreOptionsComponent } from "../../CustomMoreOptionsComponent";

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
const DetailsPage = () => {
    let { tabName, itemId } = useParams<{ tabName?: tabNameProps, itemId: string }>();
    const navigate = useNavigate();

    const { places, library, events, media } = useSelector(
        (state: RootState) => state.searchResults
    );
    const { data } = useSelector((state: RootState) => state.login);

    let selectedPlaceObjIndex: number = 0
    let selectedPlaceObj: Place = places[0]


    useEffect(() => {
        if(selectedPlaceObj) {
            dispatch(setActivePlaceItem(selectedPlaceObj))
            dispatch(setActivePlaceItemIndex(selectedPlaceObjIndex))
        }
    }, [])

    places.forEach((placeItem: Place, inx: number) => {
        if (placeItem.attributes.uniqueId === itemId) {
            selectedPlaceObj = placeItem
            selectedPlaceObjIndex = inx
        }
    })

    const {
        placeNameEnglish, placeNameArabic, placeNumber,
        siteDescription,
    } = selectedPlaceObj.attributes

    const {latitude, longitude} = selectedPlaceObj

// console.log('hex: ', media)
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
                <Box
                    sx={{
                        display: "flex",
                        gap: "1em",
                    }}
                >
                    <InsertDriveFileOutlinedIcon fontSize="small" />
                    <Box>{value.title}</Box>
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

    const { fetchMediaItems, hasMoreData, loading } = useMedia();
    const dispatch = useDispatch()

    const handleClickMediaItem = (e: React.MouseEvent, itemIndex: number) => {
        /** itemIndex used to track which item being clicked out of 5;
         * 1st , 2nd etc.
         */
        e.preventDefault()
        if(media.length >= itemIndex) {
            navigate(`/search-results/Media/${media[itemIndex - 1].attributes.uniqueId}`, {replace: true})
            dispatch(setActiveMediaItem(media[itemIndex - 1]))
            dispatch(setActiveMediaItemIndex(itemIndex - 1))
        }
    }
    return (
        <Box className={`${styles['details-container']}`}>
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
                            navigate(`/search-results/${tabName}`, { replace: true })
                        }}
                    >
                        Back to search results
                    </Button>
                </Grid>
                <Box className={`${styles['content-section']}`}>
                    <Box className={`${styles['images-section']}`}>
                        <Box style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0
                        }}>
                            <Button variant="contained" type="button"
                                style={{
                                    color: '#fff',
                                    backgroundColor: 'var(--black-90-pct)',
                                    borderRadius: '2em',
                                    margin: '1em',
                                    padding: '0.4em 1.2em'
                                }}
                                onClick={e => {
                                    e.preventDefault()
                                    navigate(`/search-results/Media`, { replace: true })
                                }}
                            >
                                View all
                            </Button>
                        </Box>
                        <Grid container className={`${styles['justify-center']} ${styles['image-grid-gap']}`}
                            spacing={1}
                        >
                            <Grid item md={6} className={`${styles["grid-item"]}`}
                                onClick={e=> {
                                    handleClickMediaItem(e, 1)
                                }}
                            >
                                <RenderFileData
                                    fileData={{
                                        alt: "",
                                        src: images[0],
                                        className: `${styles["single-image"]} ${styles["left-image"]}`
                                    }}
                                    fileType="image"
                                />
                            </Grid>
                            <Grid item md={6} className={`${styles['image-grid-gap']} ${styles["image-side-grid"]}`}
                                
                            >
                                <Grid container className={`${styles['image-grid-gap']} ${styles['row-1']}`}
                                    spacing={1}
                                >
                                    <Grid item md={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}
                                        onClick={e=> {
                                            handleClickMediaItem(e, 2)
                                        }}
                                    >
                                        <RenderFileData
                                            fileData={{
                                                src: "https://www.youtube.com/watch?v=aU08MWXL0XY",
                                                className: `${styles["single-image"]} ${styles["right-image"]}`,
                                                // thumbnail URL for youtube
                                                thumbNail: "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg"
                                            }}
                                            fileType="video"
                                        />
                                    </Grid>
                                    <Grid item md={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}
                                        onClick={e=> {
                                            handleClickMediaItem(e, 3)
                                        }}
                                    >
                                        <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: images[2],
                                                className: `${styles["single-image"]} ${styles["right-image"]}`
                                            }}
                                            fileType="image"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={`${styles['image-grid-gap']}`}
                                    spacing={1}
                                >
                                    <Grid item md={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}
                                        onClick={e=> {
                                            handleClickMediaItem(e, 4)
                                        }}
                                    >
                                        <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: images[3],
                                                className: `${styles["single-image"]} ${styles["right-image"]}`
                                            }}
                                            fileType="image"
                                        />
                                    </Grid>
                                    <Grid item md={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}
                                        onClick={e=> {
                                            handleClickMediaItem(e, 5)
                                        }}
                                    >
                                        <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: images[4],
                                                className: `${styles["single-image"]} ${styles["right-image"]}`
                                            }}
                                            fileType="image"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box className={`${styles['title-section']}`}>
                        <Grid container className={`${styles['title-section-grid']}`}>
                            <Grid item className={`${styles['title-section-left-item']}`}>
                                {true && <Grid container>
                                    <Grid item>
                                        <Box className={`${styles['item-name']}`}>
                                            {placeNameEnglish}
                                        </Box>
                                    </Grid>
                                    {true && <Grid item>
                                        <Box className={`${styles['item-name-arabic']}`}>
                                            {placeNameArabic}
                                        </Box>
                                    </Grid>}
                                </Grid>}
                                <Box className={`${styles['item-number']}`}>
                                    {placeNumber}
                                </Box>
                            </Grid>
                            <Grid item className={`${styles['title-section-grid']}`}>
                                <Box className={`${styles['more-icon-box']}`}
                                >
                                    <CustomMoreOptionsComponent
                                        menuActions={menuItems}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                    <Box className={`${styles['details-section']}`}>
                        <Grid container className={`${styles['details-section-main-grid']}`}
                            rowSpacing={2}
                        >
                            <Grid item md={7} className={`${styles['text-left']} ${styles['section-left']}`}>
                                <Box className={`${styles['site-desc']}`}>
                                    <Box className={`${styles['site-desc-condensed']}`}>
                                        {siteDescription.substring(0, !isSeeMore ? 500 : siteDescription.length-1)}
                                    </Box>
                                    {/* <Box onClick={e => {
                                        toggleSeeMore(state => !state)
                                    }}>See {isSeeMore ? 'More' : 'Less'}</Box> */}
                                </Box>
                                <Box className={`${styles['table']}`}>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item md={4} className={`${styles['table-parameter']} `}>
                                            Site Type
                                        </Grid>
                                        <Grid item>
                                            <Box component={"a"} href="#" className={`${styles['anchor']}`}>
                                                Building
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item md={4} className={`${styles['table-parameter']}`}>
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
                                        <Grid item md={4} className={`${styles['table-parameter']}`}>
                                            State of Conservation
                                        </Grid>
                                        <Grid item>
                                            Poor
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item md={4} className={`${styles['table-parameter']}`}>
                                            Risk
                                        </Grid>
                                        <Grid item>
                                            Actively damaged
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item md={4} className={`${styles['table-parameter']}`}>
                                            Tourism Value
                                        </Grid>
                                        <Grid item>
                                            Local
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item md={4} className={`${styles['table-parameter']}`}>
                                            Research Value
                                        </Grid>
                                        <Grid item>
                                            Limited
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item md={4} className={`${styles['table-parameter']}`}>
                                            Assessment
                                        </Grid>
                                        <Grid item>
                                            -
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item md={4} className={`${styles['table-parameter']}`}>
                                            Recommendation
                                        </Grid>
                                        <Grid item>
                                            Protected
                                        </Grid>
                                    </Grid>
                                    <Grid container className={`${styles['table-row']}`}>
                                        <Grid item md={4} className={`${styles['table-parameter']}`}>
                                            URL
                                        </Grid>
                                        <Grid item>
                                            {/* to-do */}
                                            {/* When clicking on the URL link, the link should be copied to the clip board. 
                                            A success message will be displayed with the message “URL copied to clipboard” */}
                                                https://www.neomheritage.com/place/N00381
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={5}>
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
                    <Box className={`${styles['heading']} ${styles['text-left']}`}>
                        <Box className={`${styles['heading-title']}`}>
                            <Box>Library</Box>
                            <Box>3 Items</Box>
                        </Box>
                        <Box>
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
                    <Box className={`${styles['events-section']} ${styles['heading']} ${styles['text-left']}`}>
                        <Box className={`${styles['heading-title']}`}>
                            <Box>Events</Box>
                            <Box>1 Item</Box>
                        </Box>
                        <Box>
                            <StyledTableWrapper
                                rowKey={"id"}
                                size="small"
                                columns={tableHeaderJson_media}
                                dataSource={events.slice(0,1)}
                                pagination={false}
                                loading={loading ? loading : false}
                                bordered
                                scroll={{ y: 500, scrollToFirstRowOnChange: true }}
                                style={{
                                    background: "transparent",
                                }}
                            ></StyledTableWrapper>
                        </Box>
                    </Box>
                    <Box className={`${styles['remarks-section']}  ${styles['heading']} ${styles['text-left']}`}>
                        <Box className={`${styles['heading-title']}`}>
                            <Box>Remarks</Box>
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

export default DetailsPage;