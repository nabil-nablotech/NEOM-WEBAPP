
import Box from '@mui/material/Box';
import { GridViewCard_Media } from '../../../../types/SearchResultsTabsProps'
import gridStyles from './index.module.css'
import styles from './index.module.css'
import { Grid } from '@mui/material';
import MoreIcon from '../../../../assets/images/searchResults/MoreMenu.svg'
// import { usePaginatedArray } from '../../../../hooks/usePaginatedArray';
/** indicating that we can send html later on wherever we parse */
import { baseUrl } from '../../../../utils/services/helpers';
import RenderFileData from '../../../RenderFileData';

export const Card = ({
    itemIndex,
    img,
    title,
    subTitle,
    dateString
}: GridViewCard_Media) => {
    return <>
        <Box component="div" className={`${gridStyles['card-container']}`} >
            <Grid container spacing={1} className={`${gridStyles['card-grid']}`}>
                <Grid item sm={12} className={`${gridStyles['card-image-wrapper']}`}>
                    
                    {
                        itemIndex === 1 ?
                            <>
                                <RenderFileData
                                    fileData={{
                                        src: "https://www.youtube.com/watch?v=aU08MWXL0XY",
                                        className: `${styles['video-card-parent']}`,
                                        // thumbnail URL for youtube
                                        thumbNail: "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg"
                                    }}
                                    fileType="video"
                                />
                            </> :
                            itemIndex === 2 ?
                                <>
                                    <RenderFileData
                                        fileData={{
                                            alt: "",
                                            // src: images[2],
                                            thumbNail: "https://img.youtube.com/vi/aU08MWXL0XY/mqdefault.jpg",
                                            className: `${styles['three-d-card-parent']}`
                                        }}
                                        fileType="3d"
                                    />
                                </> :
                                <RenderFileData
                                    fileData={{
                                        alt: "",
                                        src: `${baseUrl}${img}`,
                                        className: `${gridStyles['card-image']}`
                                    }}
                                    fileType="image"
                                />
                    }
                </Grid>
                <Grid item sm={12} className={`${gridStyles['content']}`}>
                    <Grid item sm={11}>
                        <div className={`${gridStyles['card-title']}`}>{title}</div>
                    </Grid>
                    <Grid item sm={1}>
                        <Box className={`${gridStyles['more-icon-span']}`} component={"span"}>
                            <Box className={`${gridStyles['more-icon']}`} component="img" alt={""} src={MoreIcon}></Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </>
}