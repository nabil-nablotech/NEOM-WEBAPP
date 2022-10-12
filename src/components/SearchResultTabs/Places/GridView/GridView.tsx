import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { GridViewCard_Places } from "../../../../types/SearchResultsTabsProps";
import gridStyles from "./index.module.css";
import { Grid } from "@mui/material";
import { format } from "date-fns";
import MoreIcon from "../../../../assets/images/searchResults/MoreMenu.svg";
import { useDispatch } from "react-redux";
/** indicating that we can send html later on wherever we parse */
import parse from 'html-react-parser';
import InfiniteScroll from 'react-infinite-scroll-component';
import { usePaginatedArray } from '../../../../hooks/usePaginatedArray';
import { setSelectedCardIndex } from "../../../../store/reducers/searchResultsReducer";

const Card = ({
  img,
  title,
  subTitle,
  dateString,
  keywords,
}: GridViewCard_Places) => {
  return (
    <>
      <Box className={`${gridStyles["card-container"]}`}>
        <Grid container spacing={1} className={`${gridStyles["card-grid"]}`}>
          <Grid
            item
            xl={5}
            lg={5}
            md={11}
            sm={11}
            className={`${gridStyles["card-image-wrapper"]}`}
          >
            <Box
              className={`${gridStyles["card-image"]}`}
              component="img"
              alt={""}
              src={img}
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={11}
            sm={11}
            className={`${gridStyles["content"]}`}
          >
            <div className={`${gridStyles["card-title"]}`}>{parse(title)}</div>
            <div className={`${gridStyles["card-subtitle"]}`}>{subTitle}</div>
            <div className={`${gridStyles["card-date"]}`}>{dateString}</div>
            <div className={`${gridStyles["card-keywords"]}`}>
              {keywords.map((item, keyInx) => (
                <div key={keyInx} className={`${gridStyles["keyword-pill"]}`}>
                  {item}
                </div>
              ))}
            </div>
            <Box
              className={`${gridStyles["more-icon-span"]}`}
              component={"span"}
            >
              <Box
                className={`${gridStyles["more-icon"]}`}
                component="img"
                alt={""}
                src={MoreIcon}
              ></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const GridView = () => {
  // const [data, setData] = useState<any>([]);
  // const dispatch = useDispatch();

    const {
        data,
        hasMoreData,
        fetchData
    } = usePaginatedArray({
        apiUrl: 'https://jsonplaceholder.typicode.com/photos',
        step: 10
    })


    const dispatch = useDispatch();


    return (
        <Box className={`${gridStyles['left-grid-box']}`}
        >
            <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={() => fetchData()}

                hasMore={hasMoreData}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>END OF RESULTS</b>
                    </p>
                }
                scrollableTarget={'places-scrollable-div'}
                className={`${gridStyles['infinite-scroll-cls']}`}
            >
                <Grid container id={'places-scrollable-div'} spacing={1} className={`${gridStyles['left-grid-container']}`}>

                    {
                        data?.map((item: any, index: number) => <div key={index}>
                            <Grid item sm={12} className={`${gridStyles['']}`} onClick={e => {
                                dispatch(setSelectedCardIndex(index))
                            }}>
                                <Card
                                    img={item.thumbnailUrl}
                                    title={item.title.substr(0, 20)}
                                    subTitle={item.title.substr(0, 40) + '...'}
                                    dateString={`Last login on ${format(new Date(), 'yyyy-MM-dd')}`}
                                    keywords={['fist', 'new']}
                                />
                            </Grid>
                        </div>)
                    }
                </Grid>
            </InfiniteScroll>
        </Box>
    );
}

export default GridView;
