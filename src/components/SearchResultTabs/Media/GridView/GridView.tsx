
import Box from '@mui/material/Box';
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
import { setActiveMediaItem, setActiveMediaItemIndex, setSelectedCardIndex } from '../../../../store/reducers/searchResultsReducer';
import { Media } from '../../../../types/Media';
import {Card} from './Card';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useNavigate } from 'react-router-dom';
import { useHistory } from '../../../../hooks/useHistory';


export type MediaProps = {
    data: Media[];
    fetchData: () => void;
    hasMoreData: boolean;
    loading: boolean;
    totalData?: number;
    setEdit: (payload: Media) => void
  }

const GridView = (props: MediaProps) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { navigateTo } = useHistory();

    const {data, hasMoreData, fetchData, loading, totalData, setEdit} = props;

    const { media } = useSelector(
        (state: RootState) => state.searchResults
    );

    if (totalData === 0) {
        return <h1>No data found</h1>
      }
    return (
        <Box component="div" className={`${gridStyles['left-grid-box']}`}
        >
            {/* to-do: infinite scroll based on data length */}
             <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={fetchData}
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
                    <Grid key={index} item lg={4} md={4} className={`${gridStyles['card-item']}`} onClick={e => {
                        e.stopPropagation()
                        dispatch(setSelectedCardIndex(index))
                        dispatch(setActiveMediaItem(media[index]))
                        dispatch(setActiveMediaItemIndex(index))
                        navigateTo(`/Media/${media[index].attributes.uniqueId}`)
                    }}>
                            <Card
                                itemIndex={index}
                                img={item?.attributes?.object?.data?.attributes?.url}
                                title={(item?.attributes?.media_associate?.data?.attributes?.place_unique_ids?.data !== null && item?.attributes?.media_associate?.data?.attributes?.place_unique_ids?.data.length > 0) ? `${item?.attributes?.media_associate?.data?.attributes?.place_unique_ids?.data[0]?.attributes?.placeNameEnglish}${item.attributes.media_associate.data?.attributes?.place_unique_ids?.data[0]?.attributes?.placeNameArabic}` : item.attributes.title}
                                subTitle={item?.attributes?.description.substr(0, 40) + '...'}
                                setEdit={setEdit}
                                record={item}
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