import Box from "@mui/material/Box";
/** indicating that we can send html later on wherever we parse */
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { format } from "date-fns";
import { Event } from '../../../../types/Event'
import { MediaAssociateObj } from '../../../../types/Place'
import { Media } from '../../../../types/Media'
import gridStyles from './index.module.css'
import commonStyles from '../../index.module.css'
import MoreIcon from '../../../../assets/images/searchResults/MoreMenu.svg'
import InfiniteScroll from 'react-infinite-scroll-component';

import { setSelectedCardIndex } from "../../../../store/reducers/searchResultsReducer";
import { Card } from './Card';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { tabNameProps } from "../../../../types/SearchResultsTabsProps";

export type EventsProps = {
    data: Event[];
    handleNext: () => void;
    hasMoreData: boolean;
    loading: boolean;
    setEdit: (payload: { record: Event | Media | MediaAssociateObj, type: tabNameProps }) => void
}

const GridView = (props: EventsProps) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, handleNext, hasMoreData, loading, setEdit } = props;

    if (!data) {
        return <h1>Loading...</h1>
    }

    const checkIsNew = (updatedDate: string) => {
        const expDate = dayjs(updatedDate).add(30, "d").toDate();
        return dayjs().isBefore(expDate);
    }

    const handleClick = (item: Event, index: number) => {
        dispatch(setSelectedCardIndex(index))
        navigate(`/search-results/Events/${item.attributes.uniqueId}`, { replace: true })
    }

    return (
        <Box component="div" className={`${gridStyles['']}`}
        >
            <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={() => handleNext()}

                hasMore={hasMoreData}

                loader={loading ? <h4>Loading...</h4> : null}
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
                            <Grid item className={`${gridStyles['card-grid-item']}`} key={index} sm={12} onClick={() => handleClick(item, index)}>
                                <Card
                                    key={index}
                                    img={item.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.media_type?.data[0]?.attributes?.categoryCode === "MEDIA" && item.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.media_type?.data[0]?.attributes?.typeCode === "IMAGE" ? item.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.object?.data?.attributes?.url : ''}
                  
                                    // img={item?.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.object?.data?.attributes?.url || ''}
                                    title={item?.attributes?.visit_associate.data?.attributes?.place_unique_id ? `${item?.attributes?.visit_associate.data?.attributes?.place_unique_id?.data?.attributes?.placeNameEnglish}${item.attributes.visit_associate.data?.attributes?.place_unique_id?.data?.attributes?.placeNameArabic} - ${item.attributes.visit_associate.data?.attributes?.place_unique_id?.data?.attributes?.placeNumber}` : ''}
                                    subTitle={item?.attributes?.siteDescription || ''}
                                    dateString={`${format(
                                        new Date(item?.attributes?.visitDate),
                                        "MM/dd/yyyy"
                                    )}`}
                                    isNew={checkIsNew(item.attributes.createdAt)}
                                    handleClick={handleClick}
                                    record={item}
                                    id={item.id}
                                    setEdit={setEdit}
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
