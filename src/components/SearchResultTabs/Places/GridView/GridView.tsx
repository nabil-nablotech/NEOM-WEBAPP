import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { GridViewCard_Places } from "../../../../types/SearchResultsTabsProps";
import gridStyles from "./index.module.css";
import { Grid } from "@mui/material";
import { format } from "date-fns";
import MoreIcon from "../../../../assets/images/searchResults/MoreMenu.svg";
import { useDispatch } from "react-redux";

/** indicating that we can send html later on wherever we parse */
import parse from "html-react-parser";
import { setSelectedCardIndex } from "../../../../store/reducers/searchResultsReducer";

const Card = ({
  key,
  img,
  title,
  subTitle,
  dateString,
  keywords,
}: GridViewCard_Places) => {
  return (
    <>
      <Box className={`${gridStyles["card-container"]}`} key={key}>
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
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((res) => setData(res.slice(0, 10)));
  }, []);

  return (
    <Box className={`${gridStyles["left-grid-box"]}`}>
      <Grid
        container
        spacing={1}
        className={`${gridStyles["left-grid-container"]}`}
      >
        {data?.map((item: any, index: number) => (
          <div key={index}>
            <Grid
              
              item
              sm={12}
              className={`${gridStyles[""]}`}
              onClick={(e) => {
                dispatch(setSelectedCardIndex(index));
              }}
            >
              <Card
                img={item.thumbnailUrl}
                title={item.title.substr(0, 20)}
                subTitle={item.title.substr(0, 40) + "..."}
                dateString={`Last login on ${format(new Date(), "yyyy-MM-dd")}`}
                keywords={["fist", "new"]}
              />
            </Grid>
          </div>
        ))}
      </Grid>
    </Box>
  );
};

export default GridView;
