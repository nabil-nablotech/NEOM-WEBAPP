import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
/** indicating that we can send html later on wherever we parse */
import InfiniteScroll from "react-infinite-scroll-component";
import gridStyles from "./index.module.css";
import commonStyles from "../../index.module.css";
import { setSelectedCardIndex } from "../../../../store/reducers/searchResultsReducer";
import {Card} from './Card';
import { Place, PlaceApi } from "../../../../types/Place";
import { useNavigate } from "react-router-dom";
import {formatDateTime} from '../../../../utils/services/helpers';
import { tabNameProps } from "../../../../types/SearchResultsTabsProps";
import { Media } from "../../../../types/Media";
import { Event } from "../../../../types/Event";

export type PlacesProps = {
  data: Place[];
  fetchData: () => void;
  hasMoreData: boolean;
  loading: boolean;
  totalData?: number;
  setEdit: (payload:  {record: Place | PlaceApi | Media | Event, type: tabNameProps}) => void
}

const GridView = (props: PlacesProps) => {

  const {data, loading, fetchData, hasMoreData, totalData, setEdit} = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!data) {
    return <h1>loadig....</h1>
  }

  if (totalData === 0) {
    return <h1>No data found</h1>
  }
  return (
    <Box component="div" className={`${gridStyles["left-grid-box"]}`}>
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={() => fetchData()}
        hasMore={hasMoreData}
        
        loader={loading ? <h4>Loading...</h4>: null}
        endMessage={
          <p style={{ textAlign: "center", marginTop: 5 }}>
            <b>END OF RESULTS</b>
          </p>
        }
        scrollableTarget={"places-scrollable-div"}
        className={`${commonStyles["infinite-scroll-cls"]}`}
      >
        <Grid
          container
          id={"places-scrollable-div"}
          spacing={1}
          className={`${gridStyles["left-grid-container"]}`}
        >
          {data?.map((item: Place, index: number) => (
              <Grid
                item
                key={index}
                sm={12}
                className={`${gridStyles[""]}`}
                onClick={(e) => {
                  dispatch(setSelectedCardIndex(index));
                  navigate(`/search-results/Places/${item.attributes.uniqueId}`, {replace: true})
                }}
              >
                <Card
                  key={index}
                  img={item.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.media_type?.data[0]?.attributes?.categoryCode === "MEDIA" && item.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.media_type?.data[0]?.attributes?.typeCode === "IMAGE" ? item.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.object?.data?.attributes?.url : ''}
                  title={`${item.attributes?.placeNameEnglish} ${item.attributes?.placeNameArabic} - ${item.attributes?.placeNumber}`}
                  subTitle={item.attributes?.siteDescription}
                  dateString={`Last login on ${formatDateTime(item.attributes.updatedAt)}`}
                  period={item?.attributes?.period}
                  setEdit={setEdit}
                  record={item}
                />
              </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default GridView;
