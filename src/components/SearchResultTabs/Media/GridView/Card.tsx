
import Box from '@mui/material/Box';
import { GridViewCard_Media } from '../../../../types/SearchResultsTabsProps'
import gridStyles from './index.module.css'
import styles from './index.module.css'
import { Grid } from '@mui/material';
import { MoreOptionsComponent } from "../ListView/MoreOption";
// import { usePaginatedArray } from '../../../../hooks/usePaginatedArray';
/** indicating that we can send html later on wherever we parse */
import { baseUrl, detectMediaTypeFromMediaList } from '../../../../utils/services/helpers';
import RenderFileData from '../../../RenderFileData';

export const Card = ({
    itemIndex,
    img,
    title,
    subTitle,
    dateString,
    setEdit,
    record
}: GridViewCard_Media) => {

    return <>
        <Box component="div" className={`${gridStyles['card-container']}`} >
            <Grid container spacing={1} className={`${gridStyles['card-grid']}`}>
                <Grid item sm={12} className={`${gridStyles['card-image-wrapper']}`}>
                    <RenderFileData
                        fileData={{
                            alt: "",
                            src: `${baseUrl}${record?.attributes?.object?.data?.attributes?.url}`,
                            className: detectMediaTypeFromMediaList(record) === "video" ?
                                `${styles['video-card-parent']}` : detectMediaTypeFromMediaList(record) === "image" ?
                                    `${gridStyles['card-image']}` : `${styles['three-d-card-parent']}`,
                            objectURL: record?.attributes.objectURL || ''

                        }}
                        fileType={detectMediaTypeFromMediaList(record)}
                    />
                </Grid>
                <Grid item sm={12} className={`${gridStyles['content']}`}>
                    <Grid item sm={11}>
                        <div className={`${gridStyles['card-title']}`}>{record.attributes.title}</div>
                    </Grid>
                    <Grid item sm={1}>
                        <Box className={`${gridStyles["more-icon-span"]}`} component={"span"}>
                            <Box
                                className={`${gridStyles["more-icon"]}`}
                                component={"span"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('click on more')
                                }}
                            >
                                <MoreOptionsComponent setEdit={setEdit} record={record} id={record.id} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </>
}