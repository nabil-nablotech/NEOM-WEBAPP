import Box from "@mui/material/Box";
/** indicating that we can send html later on wherever we parse */
import parse from "html-react-parser";
import { Grid } from "@mui/material";
import { GridViewCard_Events, InventoryAssociationType_Event } from '../../../../types/SearchResultsTabsProps'
import gridStyles from './index.module.css'
import MoreIcon from '../../../../assets/images/searchResults/MoreMenu.svg'
import { baseUrl, isEventRecordAttached } from "../../../../utils/services/helpers";
import NoImagePresent from "../../../NoDataScreens/NoImagePresent";
import MoreOptionsComponent from "../ListView/MoreOption";
import DetachedIcon from "../../../Icons/DetachedIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { modifyAssociatedEvents } from "../../../../store/reducers/searchResultsReducer";

export const Card = ({
  img,
  title,
  subTitle,
  dateString,
  isNew,
  record,
  id,
  setEdit
}: GridViewCard_Events) => {
  const { isAssociationsStepOpen, associatedEvents } = useSelector(
    (state: RootState) => state.searchResults
  );

  const dispatch = useDispatch()

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
                {isAssociationsStepOpen ?
                  <DetachedIcon
                    style={{
                      height: '18px',
                      position: 'relative',
                      top: '0.5em',
                    }}
                    shouldShowAttachIcon={isEventRecordAttached(record, associatedEvents)}
                    onClick={e => {
                      const data: InventoryAssociationType_Event = {
                        id: record.id,
                        visitNumber: record.attributes.visitNumber,
                        placeNameEnglish: record.attributes.visit_associate.data.attributes.place_unique_id.data.attributes.placeNameEnglish,
                        placeNameArabic: record.attributes.visit_associate.data.attributes.place_unique_id.data.attributes.placeNameArabic,
                        placeNumber: record.attributes.visit_associate.data.attributes.place_unique_id.data.attributes.placeNumber,
                      }
                      dispatch(modifyAssociatedEvents({
                        newItem: data,
                        removeId: null
                      }))
                    }}
                  /> :
                  <MoreOptionsComponent setEdit={setEdit} record={record} />
                }
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};