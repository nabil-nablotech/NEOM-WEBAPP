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

const DetailsPage = () => {
    let { tabName, itemId } = useParams<{ tabName?: tabNameProps, itemId: string }>();
    const navigate = useNavigate();

    const { places } = useSelector(
        (state: RootState) => state.searchResults
    );

    const selectedPlaceObj = places.filter((placeItem: Place) => placeItem.attributes.uniqueId === itemId)[0]

    const {
        placeNameEnglish, placeNameArabic, placeNumber,
        siteDescription
    } = selectedPlaceObj.attributes

    // get from api
    let [images, setImages] = useState<any>([
        'https://via.placeholder.com/150/92c952',
        'https://via.placeholder.com/150/771796',
        'https://via.placeholder.com/150/24f355',
        'https://via.placeholder.com/150/d32776',
        'https://via.placeholder.com/150/f66b97',
    ])
    const [isMoreTitleMenuOpen, setMoreTitleMenuOpen] = useState<false>(false)

    const menuItems = [
        {
            label: "Share",
            handleClickMenuItem: () => { },
        },
        {
            label: "Edit",
            handleClickMenuItem: () => {
            },
        },
        {
            label: "Delete",
            handleClickMenuItem: () => {
            },
        },
    ]

    const {
        anchorEl,
        open,
        handleClick,
        handleClose,
        handleSettingsClose
    } = useAnchor()

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
                            color: 'var(--table-black-text)'
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
                        <Grid container className={`${styles['justify-center']} ${styles['image-grid-gap']}`}
                            spacing={1}
                        >
                            <Grid item md={6} className={`${styles["grid-item"]}`}>
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
                                spacing={1}
                            >
                                <Grid container className={`${styles['image-grid-gap']} ${styles['row-1']}`}
                                    spacing={1}
                                >
                                    <Grid item md={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}>
                                        <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: images[1],
                                                className: `${styles["single-image"]} ${styles["right-image"]}`
                                            }}
                                            fileType="image"
                                        />
                                    </Grid>
                                    <Grid item md={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}>
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
                                    <Grid item md={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}>
                                        <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: images[3],
                                                className: `${styles["single-image"]} ${styles["right-image"]}`
                                            }}
                                            fileType="image"
                                        />
                                    </Grid>
                                    <Grid item md={6} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}>
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
                                    <Box onClick={e => handleClick(e)}>
                                        <MoreHorizIcon />

                                    </Box>
                                    <MenuList
                                        anchorEl={anchorEl}
                                        open={open}
                                        handleClose={handleClose}
                                        options={menuItems}
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
                                    {siteDescription}
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
                                            <Box component={"a"} href="https://www.neomheritage.com/place/N00381"
                                                className={`${styles['anchor']}`}
                                            >
                                                https://www.neomheritage.com/place/N00381
                                            </Box>
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
                    <Box className={`${styles['library-section']}`}>

                    </Box>
                    <Box className={`${styles['events-section']}`}>

                    </Box>
                    <Box className={`${styles['remarks-section']}`}>

                    </Box>
                </Box>
            </Grid>
        </Box>
    );
}

export default DetailsPage;