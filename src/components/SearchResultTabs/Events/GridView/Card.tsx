import Box from "@mui/material/Box";
/** indicating that we can send html later on wherever we parse */
import parse from "html-react-parser";
import { Grid } from "@mui/material";
import { GridViewCard_Events } from '../../../../types/SearchResultsTabsProps'
import gridStyles from './index.module.css'
import MoreIcon from '../../../../assets/images/searchResults/MoreMenu.svg'
import { baseUrl } from "../../../../utils/services/helpers";
import NoImagePresent from "../../../NoDataScreens/NoImagePresent";
import MoreOptionsComponent from "../ListView/MoreOption";

export const Card = ({
  img,
  title,
  subTitle,
  dateString,
  isNew,
  record,
  id,
  dispatch,
  setEdit
}: GridViewCard_Events) => {
  return (
    <>
      <Box component="div" className={`${gridStyles["card-container"]}`}>
        <Grid container spacing={1} className={`${gridStyles["card-grid"]}`}>
          <Grid
            item
            xl={4}
            lg={4}
            md={11}
            sm={11}
            className={`${gridStyles["card-image-wrapper"]}`}
            onClick={() => {}}
          >
            {img ? <Box
              className={`${gridStyles["card-image"]}`}
              component="img"
              alt={""}
              src={`${baseUrl}${img}`}
            /> : <NoImagePresent message={"No media item is available"} />}
          </Grid>
          <Grid
            item
            xl={7}
            lg={7}
            md={11}
            sm={11}
            className={`${gridStyles["content"]}`}
          >
            <div className={`${gridStyles["card-title"]}`}>
              {parse(title)} on {dateString}
            </div>
            <div className={`${gridStyles["card-subtitle"]}`}>{subTitle}</div>
            {isNew && (
              <div className={`${gridStyles["card-new-flag"]}`}>NEW!</div>
            )}
            <Box
              className={`${gridStyles["more-icon-span"]}`}
              component={"span"}
            >
              <Box
                className={`${gridStyles["more-icon"]}`}
                component={"span"}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('click on more')
                }}
              >
                <MoreOptionsComponent setEdit={setEdit} record={record} id={id} dispatch={dispatch}  />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};