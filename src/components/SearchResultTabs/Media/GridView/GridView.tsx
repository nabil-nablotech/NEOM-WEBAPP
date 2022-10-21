
import Box from '@mui/material/Box';
import { GridViewCard_Places } from '../../../../types/SearchResultsTabsProps'
import gridStyles from './index.module.css'
import commonStyles from '../../index.module.css'
import { Grid } from '@mui/material';
import { format } from "date-fns";
import MoreIcon from '../../../../assets/images/searchResults/MoreMenu.svg'
import { useDispatch } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { usePaginatedArray } from '../../../../hooks/usePaginatedArray';
/** indicating that we can send html later on wherever we parse */
import parse from 'html-react-parser';
import { setSelectedCardIndex } from '../../../../store/reducers/searchResultsReducer';
import { Media } from '../../../../types/Media';
import {Card} from './Card';


export type MediaProps = {
    data: Media[];
    fetchData: () => void;
    hasMoreData: boolean;
    loading: boolean;
  }

const GridView = (props: MediaProps) => {

    const dispatch = useDispatch();

    const {data, hasMoreData, fetchData, loading} = props;

    return (
        <Box className={`${gridStyles['left-grid-box']}`}
        >
             <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={() => fetchData()}

                hasMore={hasMoreData}
                loader={loading ? <h4>Loading...</h4> : null}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>END OF RESULTS</b>
                    </p>
                }
                scrollableTarget={'media-scrollable-div'}
                className={`${commonStyles['infinite-scroll-cls']}`}
            >

            <Grid container spacing={1} id={'media-scrollable-div'} className={`${gridStyles['left-grid-container']}`}>
                {
                    data?.map((item: Media, index: number ) => 
                    <Grid key={index} item lg={3} md={5} className={`${gridStyles['card-item']}`} onClick={e => {
                        dispatch(setSelectedCardIndex(index))
                    }}>
                            <Card
                                img={item.attributes.object.data.attributes.url}
                                title={item.attributes.media_associate.data.attributes.placeUniqueId?.data !== null ? `${item.attributes.media_associate.data.attributes.placeUniqueId?.data?.attributes?.placeNameEnglish}${item.attributes.media_associate.data.attributes.placeUniqueId?.data?.attributes?.placeNameArabic}` : item.attributes.title}
                                subTitle={item.attributes.description.substr(0, 40) + '...'}
                                dateString={`Last login on ${format(new Date(item.attributes.updatedAt), 'yyyy-MM-dd')}`}
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