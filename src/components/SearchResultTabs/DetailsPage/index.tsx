import {useEffect, useState} from "react";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { tabNameProps } from "../../../types/SearchResultsTabsProps";
import styles from './index.module.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import RenderFileData from "../../RenderFileData";

const DetailsPage = () => {
    let { tabName } = useParams<{ tabName?: tabNameProps, itemId: string }>();
    const navigate = useNavigate();

    const { places } = useSelector(
        (state: RootState) => state.searchResults
    );

    // get from api
    let [images, setImages] = useState<any>([
        'https://via.placeholder.com/150/92c952',
        'https://via.placeholder.com/150/771796',
        'https://via.placeholder.com/150/24f355',
        'https://via.placeholder.com/150/d32776',
        'https://via.placeholder.com/150/f66b97',
    ])

    return (
        <Box className={`${styles['details-container']}`}>
            <Grid className={`${styles['image-grid-gap']}`} container style={{
                flexDirection: 'column'
            }}>
                <Grid item style={{
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
                        <Grid container className={`${styles['justify-center']} ${styles['image-grid-gap']}`}>
                            <Grid item md={5} className={`${styles["grid-item"]}`}>
                                <RenderFileData
                                    fileData={{
                                        alt: "",
                                        src: images[0],
                                        className: `${styles["single-image"]} ${styles["left-image"]}`
                                    }}
                                    fileType="image"
                                />
                            </Grid>
                            <Grid item md={5} className={`${styles['image-grid-gap']} ${styles["image-side-grid"]}`}>
                                <Grid container className={`${styles['image-grid-gap']} ${styles['row-1']}`}>
                                    <Grid item md={5} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}>
                                        <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: images[1],
                                                className: `${styles["single-image"]} ${styles["right-image"]}`
                                            }}
                                            fileType="image"
                                        />
                                    </Grid>
                                    <Grid item md={5} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}>
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
                                <Grid container className={`${styles['image-grid-gap']}`}>
                                    <Grid item md={5} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}>
                                        <RenderFileData
                                            fileData={{
                                                alt: "",
                                                src: images[3],
                                                className: `${styles["single-image"]} ${styles["right-image"]}`
                                            }}
                                            fileType="image"
                                        />
                                    </Grid>
                                    <Grid item md={5} className={`${styles["side-grid-image"]} ${styles["grid-item"]}`}>
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
                                            sasas
                    </Box>
                    <Box className={`${styles['details-section']}`}>

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