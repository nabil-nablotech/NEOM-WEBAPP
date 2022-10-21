import Box from "@mui/material/Box";
/** indicating that we can send html later on wherever we parse */
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { format } from "date-fns";
import { Event } from '../../../../types/Event'
import gridStyles from './index.module.css'
import commonStyles from '../../index.module.css'
import MoreIcon from '../../../../assets/images/searchResults/MoreMenu.svg'
import InfiniteScroll from 'react-infinite-scroll-component';

import { setSelectedCardIndex } from "../../../../store/reducers/searchResultsReducer";
import {Card} from './Card';
import { useSelector } from "react-redux";

export type EventsProps = {
  data: Event[];
  handleNext: () => void;
  hasMoreData: boolean;
  loading: boolean;
}

const GridView = (props: EventsProps) => {

    const dispatch = useDispatch();

    const {data, handleNext, hasMoreData, loading} = props;

    if (!data) {
        return <h1>Loading...</h1>   
    }

    return (
        <Box className={`${gridStyles['']}`}
        >
            <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={() => handleNext()}

                hasMore={hasMoreData}
                
                loader={loading ? <h4>Loading...</h4>: null}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>END OF RESULTS</b>
                    </p>
                }
                scrollableTarget={'events-scrollable-div'}
                className={`${commonStyles['infinite-scroll-cls']}`}
            >

                <Grid container id={'events-scrollable-div'} spacing={1} className={`${gridStyles['left-grid-container']}`}>
                    {
                        data?.map((item: Event, index: number) => 
                            <Grid item key={index} sm={12} className={`${gridStyles['']}`} onClick={() => {
                                dispatch(setSelectedCardIndex(index))
                            }}>
                                <Card
                                    key={index}
                                    img={item.attributes.media_associates.data[0].attributes.mediaUniqueId.data.attributes.object.data.attributes.url}
                                    title={`${item.attributes.recordingTeam}`}
                                    subTitle={item.attributes.siteDescription}
                                    dateString={`Last login on ${format(
                                      new Date(item.attributes.updatedAt),
                                      "yyyy-MM-dd"
                                    )}`}
                                    isNew={index % 2 === 0 ? true : false}
                                />
                            </Grid>
                       )
                    }
                </Grid>
            </InfiniteScroll>
        </Box>
    );
}

export default GridView;
