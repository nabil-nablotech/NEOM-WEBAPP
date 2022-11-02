
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
/** indicating that we can send html later on wherever we parse */
import parse from "html-react-parser";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { GridViewCard_Places } from "../../../../types/SearchResultsTabsProps";
import gridStyles from "./index.module.css";
import MoreIcon from "../../../../assets/images/searchResults/MoreMenu.svg";
import {baseUrl} from "../../../../utils/services/helpers";
import { CustomMoreOptionsComponent } from "../../../CustomMoreOptionsComponent";
import NoImagePresent from "../../../NoDataScreens/NoImagePresent";

export const Card = ({
  img,
  title,
  subTitle,
  dateString,
  period,
}: GridViewCard_Places) => {

  const menuItems = [
    {
      label: "Share",
      action: () => { },
    },
    {
      label: "Edit",
      action: () => {
      },
    },
    {
      label: "Delete",
      action: () => {
      },
    },
  ]

  return (
    <>
      <Box component="div" className={`${gridStyles["card-container"]}`}>
        <Grid container spacing={1} className={`${gridStyles["card-grid"]}`}>
          <Grid
            item
            xl={5}
            lg={5}
            md={11}
            sm={11}
            className={`${gridStyles["card-image-wrapper"]}`}
          >
            
            {img ?<Box
              className={`${gridStyles["card-image"]}`}
              component="img"
              alt={""}
              src={`${baseUrl}${img}`}
            /> : <NoImagePresent message={"No media item is available"} />}
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
              {period && period.length > 0 && period?.map((item, keyInx) => (
               <> {2 > keyInx ? <div key={keyInx} className={`${gridStyles["keyword-pill"]}`}>
                  {item}
                </div> : null}
                </>
              ))}
            </div>
            <Box
              className={`${gridStyles["more-icon-span"]}`}
              component={"span"}
            >
              <CustomMoreOptionsComponent
                moreIconClassName={`${gridStyles["more-icon"]}`}
                menuActions={menuItems}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
