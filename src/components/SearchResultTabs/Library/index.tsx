import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styles from "../index.module.css";
import Button from "../../../components/Button";
import type { ColumnsType } from "antd/es/table";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import LinkIcon from "@mui/icons-material/Link";
import { StyledAntTable } from "../../StyledAntTable";
import InfiniteScroll from "react-infinite-scroll-component";
import commonStyles from "../index.module.css";
import useLibrary from "../../../hooks/useLibrary";
import { Meta } from "../../../types/Place";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import {formatWebDate, formatBytes} from '../../../utils/services/helpers';
import MoreOptionsComponent from '../Places/ListView/MoreOption';
import { Media } from "../../../types/Media";
import {HtmlTooltip} from '../../../components/Tooltip';
import { Typography } from "@mui/material";
import { setSelectedCardIndex } from "../../../store/reducers/searchResultsReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExportModal from "../../ExportModal";

let viewWidths = ["20vw", "20vw", "20vw", "20vw", "5vw"];

const LibraryTab = () => {
  const { selectedCardIndex, library, places, totalCounts, libararyMetaData } =
    useSelector((state: RootState) => state.searchResults);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { fetchLibraryItems, hasMoreData, loading, setEdit,searchData } = useLibrary();
  const tableHeaderJson: ColumnsType<any> = [
    {
      title: "NAME",
      key: "attributes",
      dataIndex: "attributes",
      width: viewWidths[0],
      sorter: (a, b) => a?.title?.localeCompare(b?.title),
      sortDirections: ["ascend"],
      defaultSortOrder: "ascend",
      className: "name-column",
      render: (value: any, record: any) => (
        <Box component="div"
          sx={{
            display: "flex",
            gap: "1em",
          }}
        >
          <InsertDriveFileOutlinedIcon fontSize="small" />
          <Box component="div">{value.title}</Box>
        </Box>
      ),
    },
    {
      title: "DESCRIPTION",
      key: "attributes",
      className: "description-column",
      //   dataIndex: "description",
      dataIndex: "attributes", // temporary
      render: (value: any, index) => {
        // temporary
        return value.description;
      },
    },
    {
      title: "CITATION",
      className: "citation-column",
      //   dataIndex: "citation",
      dataIndex: "attributes", // temporary
      render: (value: any, index) => {
        // temporary
        return value.citation;
      },
      //   width: viewWidths[2],
    },
    {
      title: "URL",
      key: "attributes",
      //   dataIndex: "url",
      dataIndex: "attributes", // temporary
      render: (value, index) => (
        <Box
          component={"a"}
          sx={{
            color: "initial",
            textDecoration: "underline",
          }}
        >
          <HtmlTooltip
        title={
          <div className={`${styles["reference-url"]}`}>
            <div className={`${styles["link"]}`}>
              <LinkIcon sx={{color: 'white'}} />
            </div>
            <a href={value.referenceURL} target="_blank"><Typography style={{fontSize: 12, margin: 1}} color="white">{value.referenceURL}</Typography></a>
          </div>
        }
      >
            <Typography color="inherit">{value.referenceURL}</Typography>
          </HtmlTooltip>
        </Box>
      ),
    },
    {
      title: "SIZE",
      key: "attributes",
      dataIndex: "attributes",
      width: viewWidths[10],
      render: (value, index) => formatBytes(value.object?.data?.attributes?.size || 0), 
    },
    {
      title: "UPDATED",
      key: "attributes",
      dataIndex: "attributes",
      width: viewWidths[10],
      render: (value, index) => formatWebDate(value.updatedAt), 
    },
    {
      title: "",
      key: "action",
      dataIndex: "id",
      fixed: "right",
      className: "more-menu-ant-cell",
      render: (value: any, record: Media) => (
        <MoreOptionsComponent type="Library" setEdit={setEdit} record={record} />
      ),
    },
  ];
  const [filter, setFilter] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    /** Needs to be done , since InfiniteSCroll needs a relation with
     * div being scrolled. Here its tbody of ant table
     */
    const ele = document.querySelector("#library-list-parent .ant-table-body");
    if (ele) {
      ele.id = "library-list-div";
    }
  }, []);
  const meta: Meta | null = libararyMetaData;

  const handleNext = () => {
    fetchLibraryItems();
  };

  if (!library) {
    return <h1>No data found</h1>
  }


  /* Event hanlders */
  const exportLibrary = async () => {
    let filter: any={ media_type :{
        categoryCode: {
          $containsi: "LIBRARY"
      }
    }};
if (searchData?.search) {
  filter = {...filter,
    $or: [
      {
        title: {
          $containsi: searchData.search,
        },
      },
      {
        description: {
          $containsi: searchData.search,
        },
      },
      {
        fileName: {
          $containsi: searchData.search,
        },
      },
      {
        citation: {
          $containsi: searchData.search,
        },
      },
      ,
    ],
  };
}
setFilter(filter);
setOpen(true);
};
  return (
    <Box component="div" className={`${styles["main-tab-content"]}`}>
      <Box component="div" className={`${styles["utility-bar"]}`}>
        
        <Box component="div">{meta?.pagination?.total} Results | {totalCounts?.library} Total Library Items</Box>
        <Box component="div">
        <Button
            colors={[
              "transparent",
              "var(--table-black-text)",
              "var(--table-black-text)",
            ]}
            className={`${styles["export-btn"]}`}
            label="Export"
            style={{
              border: "1px solid var(--light-grey-border)",
              borderRadius: "40px",
              padding: "0.2em 15px",
              lineHeight: "2",
              height: "100%",
              textAlign: "center",
            }}
            onClick={exportLibrary}
          />
        </Box>
      </Box>
      <ExportModal open={open} setOpen={setOpen} count={meta?.pagination?.total} path={'medias'} filter={filter}/>
      <Box component="div" id={"library-list-parent"}>
        <InfiniteScroll
          dataLength={library.length} //This is important field to render the next data
          next={() => handleNext()}
          hasMore={hasMoreData}
          loader={loading ? <h4>Loading...</h4>: null}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>END OF RESULTS</b>
            </p>
          }
          scrollableTarget={"library-list-div"}
          className={`${commonStyles["infinite-scroll-cls"]}`}
        >
          <StyledAntTable
            className={`${styles["table-container"]}`}
            rowKey={"id"}
            size="small"
            columns={tableHeaderJson}
            dataSource={library}
            pagination={false}
            loading={loading ? loading : false}
            bordered
            scroll={{ x: 'max-content',  y: 500, scrollToFirstRowOnChange: true }}
            style={{
              background: "transparent",
            }}
            onRow={(record: any, rowIndex) => {
              return {
                onClick: (event: React.MouseEvent<HTMLElement>) => {

                  dispatch(setSelectedCardIndex(rowIndex || record.id))
                  navigate(`/search-results/Library/${record.attributes.uniqueId}`, { replace: true })
                },
              };
            }}
          ></StyledAntTable>
        </InfiniteScroll>
      </Box>
      <ExportModal open={open} setOpen={setOpen} count={meta?.pagination?.total} path={'medias'} filter={filter}/>
    </Box>
  );
};

export default LibraryTab;
