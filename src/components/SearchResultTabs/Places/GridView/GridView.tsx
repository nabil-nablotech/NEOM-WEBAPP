import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
/** indicating that we can send html later on wherever we parse */
import InfiniteScroll from "react-infinite-scroll-component";
import gridStyles from "./index.module.css";
import commonStyles from "../../index.module.css";
import { usePaginatedArray } from "../../../../hooks/usePaginatedArray";
import { setSelectedCardIndex } from "../../../../store/reducers/searchResultsReducer";
import {Card} from './Card';
import { Place } from "../../../../types/Place";

export type PlacesProps = {
  data: Place[];
  fetchPlaces: () => void;
  hasMoreData: boolean;
  loading: boolean;
}

const GridView = (props: PlacesProps) => {
  // const { data, hasMoreData, fetchData: fetchPlaces } = usePaginatedArray({
  //   apiUrl: "https://jsonplaceholder.typicode.com/photos",
  //   step: 10,
  // });

  const {data, loading, fetchPlaces, hasMoreData} = props;

  const dispatch = useDispatch();

  if (!data) {
    return <h1>loadig....</h1>
  }

  return (
    <Box className={`${gridStyles["left-grid-box"]}`}>
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={() => fetchPlaces()}
        hasMore={hasMoreData}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
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
            <>
              <Grid
                item
                key={index}
                sm={12}
                className={`${gridStyles[""]}`}
                onClick={(e) => {
                  dispatch(setSelectedCardIndex(index));
                }}
              >
                <Card
                  img={item.attributes.thumbnailUrl}
                  title={item.attributes.placeNameEnglish.substr(0, 20)}
                  subTitle={item.attributes.placeNameArabic.substr(0, 40) + "..."}
                  dateString={`Last login on ${format(
                    new Date(item.attributes.updatedAt),
                    "yyyy-MM-dd"
                  )}`}
                  keywords={item.attributes.keywords}
                />
              </Grid>
            </>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default GridView;
