import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { GridViewCard } from '../../../../types/SearchResultsTabsProps'
import gridStyles from './index.module.css'
import { Grid, Stack } from '@mui/material';
import { format } from "date-fns";

/** indicating that we can send html later on wherever we parse */
import parse from 'html-react-parser';

const Card = ({
    key,
    img,
    title,
    subTitle,
    dateString,
    keywords
}: GridViewCard) => {
    return <>
        <Box className={`${gridStyles['card-container']}`} key={key}>
            <Grid container spacing={1} className={`${gridStyles['card-grid']}`}>
                <Grid item xl={4} lg={5}>
                    <Box className={`${gridStyles['card-image']}`} component="img" alt={""} src={img} />
                </Grid>
                <Grid item xl={7} lg={7} className={`${gridStyles['content']}`}>
                    <div className={`${gridStyles['card-title']}`}>{parse(title)}</div>
                    <div className={`${gridStyles['card-subtitle']}`}>{subTitle}</div>
                    <div className={`${gridStyles['card-date']}`}>{dateString}</div>
                    <div className={`${gridStyles['card-keywords']}`}>{
                        keywords.map((item, keyInx) => (
                            <div key={keyInx} className={`${gridStyles['keyword-pill']}`}>
                                {item}
                            </div>
                        ))}</div>
                </Grid>
            </Grid>
        </Box>
    </>
}

const GridView = () => {

    const [data, setData] = useState<any>([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(res => setData(res.slice(0, 10)))


    }, [])

    return (
        <Box className={`${gridStyles['left-grid-container']}`}
        >
            <Grid container spacing={1} className={`${gridStyles['']}`}>
                {
                    data?.map((item: any, index: number) => <>
                        <Grid item sm={12} className={`${gridStyles['']}`}>
                            <Card
                                key={index}
                                img={item.thumbnailUrl}
                                title={item.title.substr(0, 10)}
                                subTitle={item.title.substr(0, 40) + '...'}
                                dateString={`Last login on ${format(new Date(), 'yyyy-MM-dd')}`}
                                keywords={['fist', 'new']}
                            />
                        </Grid>
                    </>)
                }
            </Grid>
        </Box>
    );
}

export default GridView;