import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
/** indicating that we can send html later on wherever we parse */
import parse from 'html-react-parser';
import { useDispatch } from "react-redux";
import { Grid } from '@mui/material';
import { format } from "date-fns";
import { GridViewCard_Events } from '../../../../types/SearchResultsTabsProps'
import gridStyles from './index.module.css'
import MoreIcon from '../../../../assets/images/searchResults/MoreMenu.svg'

import { setSelectedCardIndex } from '../../../../store/reducers/searchResultsReducer';

const Card = ({
    key,
    img,
    title,
    subTitle,
    dateString,
    isNew
}: GridViewCard_Events) => {
    return <>
        <Box className={`${gridStyles['card-container']}`} key={key}>
            <Grid container spacing={1} className={`${gridStyles['card-grid']}`}>
                <Grid item xl={4} lg={4} md={11} sm={11} className={`${gridStyles['card-image-wrapper']}`}>
                    <Box className={`${gridStyles['card-image']}`} component="img" alt={""} src={img} />
                </Grid>
                <Grid item xl={7} lg={7} md={11} sm={11} className={`${gridStyles['content']}`}>
                    <div className={`${gridStyles['card-title']}`}>{parse(title)} on {dateString}</div>
                    <div className={`${gridStyles['card-subtitle']}`}>{subTitle}</div>
                    {isNew && <div className={`${gridStyles['card-new-flag']}`}>
                        NEW!
                    </div>}
                    <Box className={`${gridStyles['more-icon-span']}`} component={"span"}>
                        <Box className={`${gridStyles['more-icon']}`} component="img" alt={""} src={MoreIcon}></Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </>
}

const GridView = () => {

    const [data, setData] = useState<any>([])
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(res => setData(res.slice(0, 10)))


    }, []);

    return (
        <Box className={`${gridStyles['']}`}
        >
            <Grid container spacing={1} className={`${gridStyles['left-grid-container']}`}>
                {
                    data?.map((item: any, index: number) => <div key={index}>
                        <Grid key={index} item sm={12} className={`${gridStyles['']}`} onClick={e => {
                            dispatch(setSelectedCardIndex(index))
                        }}>
                            <Card
                                img={item.thumbnailUrl}
                                title={item.title.substr(0, 20)}
                                subTitle={item.title.substr(0, 40) + '...'}
                                dateString={`Last login on ${format(new Date(), 'yyyy-MM-dd')}`}
                                isNew={index%2 === 0 ? true : false}
                            />
                        </Grid>
                    </div>)
                }
            </Grid>
        </Box>
    );
}

export default GridView;