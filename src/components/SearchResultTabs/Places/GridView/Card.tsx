
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
/** indicating that we can send html later on wherever we parse */
import parse from "html-react-parser";
import { GridViewCard_Places, InventoryAssociationType } from "../../../../types/SearchResultsTabsProps";
import gridStyles from "./index.module.css";
import {baseUrl, detectMediaTypeFromMediaAssociateGraphQlRes, isRecordAttached} from "../../../../utils/services/helpers";
import MoreOptionsComponent from "../ListView/MoreOption";
import { useSelector } from "react-redux";
import DetachedIcon from "../../../Icons/DetachedIcon";
import { modifyAssociatedPlaces } from "../../../../store/reducers/searchResultsReducer";
import { RootState } from "../../../../store";
import { useDispatch } from "react-redux";
import RenderFileData from "../../../RenderFileDataForGrid";

export const Card = ({
  img,
  title,
  subTitle,
  dateString,
  period,
  setEdit,
  record
}: GridViewCard_Places) => {
  const { isAssociationsStepOpen, associatedPlaces } = useSelector(
    (state: RootState) => state.searchResults
  );

  const dispatch = useDispatch()

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
            /> :
            <RenderFileData
            fileData={{
                alt: "",
                src: record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.object?.data?.attributes?.url ? `${baseUrl}${record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.object?.data?.attributes?.url}` : undefined,
                className: record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.media_type?.data[0]?.attributes?.typeCode === "VIDEO" ?
                    `${gridStyles['video-card-parent']}` : record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.media_type?.data[0]?.attributes?.typeCode === "IMAGE" ?
                        `${gridStyles['card-image']}` : `${gridStyles['three-d-card-parent']}`,
                objectURL: record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.objectURL || '',
                videoType: record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes?.videoType,
                iframeVideoLink: (record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes.videoType === "url") ? record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes.referenceURL : undefined,
                staticVideoLink:  (record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes.videoType === "video") ? `${baseUrl}${record.attributes?.media_associates?.data[0]?.attributes?.media_unique_id?.data?.attributes.object?.data?.attributes?.url}` : undefined
            }}
            fileType={detectMediaTypeFromMediaAssociateGraphQlRes(record)}

        /> }
        {/* :<NoImagePresent message={"No media item is available"} />} */}
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
                    shouldShowAttachIcon={isRecordAttached(record, associatedPlaces)}
                    onClick={e => {
                      const data: InventoryAssociationType = {
                        id: Number(record.id),
                        placeNameEnglish: record.attributes.placeNameEnglish,
                        placeNameArabic: record.attributes.placeNameArabic,
                        placeNumber: record.attributes.placeNumber,
                      }
                      dispatch(modifyAssociatedPlaces({
                        newItem: data,
                        removeId: null
                      }))
                    }}
                  /> :
                  <MoreOptionsComponent type="Places" setEdit={setEdit} record={record} />
                }
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
