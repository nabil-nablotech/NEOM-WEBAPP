import { useState, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { ColumnsType } from "antd/lib/table";
import { StyledAntTable } from "../../../StyledAntTable";
import styled from "styled-components";
import { antTablePaginationCss, baseUrl } from "../../../../utils/services/helpers";
import InfiniteScroll from "react-infinite-scroll-component";
import commonStyles from "../../index.module.css";
import { Loader } from "../../../Loader";
import { MediaProps } from "../GridView/GridView";
import { formatWebDate, formatBytes } from '../../../../utils/services/helpers'
import { MoreOptionsComponent } from './MoreOption';
import { Media } from "../../../../types/Media";
// import {CustomModal} from '../../../CustomModal';
// import {MediaDetailsPage} from '../DetailsPage';
// import styles from './index.module.css';
// import CloseIcon from '@mui/icons-material/CloseOutlined';
import { MediaDetailsModal } from "../MediaDetails";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setActiveMediaItem, setActiveMediaItemIndex, setSelectedCardIndex } from '../../../../store/reducers/searchResultsReducer';

const StyledTableWrapper = styled(StyledAntTable)`
  .ant-table-container {
  }
  .ant-table {
    margin-block: 2em;
  }

  .ant-table-thead > tr > th:not(.ant-table-thead > tr > th.more-menu-ant-cell),
  .ant-table-tbody
    > tr
    > td:not(.ant-table-tbody > tr > td.more-menu-ant-cell) {
    min-width: 50px;
  }

  th.ant-table-cell {
    white-space: break-spaces;
  }
  .ant-table-cell.more-menu-ant-cell {
    vertical-align: middle;
    min-width: 20px;
    width: 20px;
  }
  .more-menu-div {
    vertical-align: middle;
  }
  .ant-table-thead > tr > th.ant-table-cell-fix-right,
  .ant-table-cell-fix-right {
    background: var(--off-white-background-color);
  }

  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > thead
    > tr
    > th.more-menu-ant-cell.ant-table-cell-fix-right {
    border-left: 1px solid #f0f0f0;
  }

  .ant-table-cell.cell-image {
    width: 15vw;
  }
  .media-table-image {
    object-fit: cover;
    width: 100%;
    aspect-ratio: 3/2;
  }
  .ant-table-cell {
    vertical-align: middle;
  }

  @media (min-width: 575px) and (max-width: 1025px) {
    .ant-table-thead
      > tr
      > th:not(.ant-table-thead > tr > th.more-menu-ant-cell),
    .ant-table-tbody
      > tr
      > td:not(.ant-table-tbody > tr > td.more-menu-ant-cell) {
      min-width: 90px;
    }

    .ant-table-thead > tr > th.more-menu-ant-cell.ant-table-cell-fix-right,
    .ant-table-tbody > tr > td.more-menu-ant-cell.ant-table-cell-fix-right {
      right: -5vw !important;
    }

    th.ant-table-cell,
    th.ant-table-cell * {
    }
    td.ant-table-cell {
    }

    .cell-image {
      min-width: 20ch !important;
    }

    .cell-description {
      min-width: 20ch !important;
    }
  }
  ${antTablePaginationCss}
`;

const ListView = (props: MediaProps) => {
  const { data, hasMoreData, fetchData, loading, setEdit } = props;

  const tableHeaderJson: ColumnsType<any> = [
    {
      title: "Image",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-image",
      render: (value: any, index: any) => (
        <>
          <Box
            className={`media-table-image`}
            component="img"
            alt={""}
            src={`${baseUrl}${value.object.data.attributes.url}`}
          ></Box>
        </>
      ),
    },

    {
      title: "IMAGE DESCRIPTION",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-description",
      render: (value: any, index: any) => value.description?.substring(0, 8),
    },
    {
      title: "SITE",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-site",
      sorter: (a: { title: string }, b: { title: any }) => {
        return a.title?.localeCompare(b.title);
      },
      sortDirections: ["ascend"],
      defaultSortOrder: "ascend",
      // render: (value: string, index: any) => value.substring(0, 8),
      render: (value: any, index: any) => value.title?.substring(0, 8), // need to remove once ste is confrmed
    },
    {
      title: "SIZE",
      key: "attributes",
      dataIndex: "attributes",
      render: (value, index) => formatBytes(value?.imageMetadata?.fileSize),
    },
    {
      title: "UPDATED",
      key: "attributes",
      dataIndex: "attributes",
      render: (value, index) => formatWebDate(value.updatedAt),
    },
    {
      title: "BEARING",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-bearing",
      render: (value: any, index: any) => value?.bearing?.substring(0, 2),
    },
    {
      title: "FEATURED",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-bearing",
      render: (value: any, index: any) => value.featuredImg ? 'Yes' : 'No',
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      className: "more-menu-ant-cell",
      render: (value: any, record: Media) => (
        <MoreOptionsComponent id={record.id} record={record} setEdit={setEdit} />
      ),
    },
  ];


  const [isModalOpen, setModalOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const [currentRecord, setCurrentRecord] = useState<any>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    /** Needs to be done , since InfiniteSCroll needs a relation with
     * div being scrolled. Here its tbody of ant table
     */
    const ele = document.querySelector("#media-list-parent .ant-table-body");
    if (ele) {
      ele.id = "media-list-div";
    }
  }, []);

  return (
    <Box component="div" id={"media-list-parent"}>
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={() => fetchData()}
        hasMore={hasMoreData}
        loader={loading ? <Loader /> : null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>END OF RESULTS</b>
          </p>
        }
        scrollableTarget={"media-list-div"}
        className={`${commonStyles["infinite-scroll-cls"]}`}
      >
        <StyledTableWrapper
          rowKey={"id"}
          size="small"
          columns={tableHeaderJson}
          dataSource={data}
          pagination={false}
          loading={loading ? loading : false}
          bordered
          scroll={{ y: 500, scrollToFirstRowOnChange: true }}
          style={{
            background: "transparent",
          }}
          onRow={(record: any, rowIndex: number | undefined) => {
            return {
              onClick: (event) => {
                // click row
                setModalOpen(true);

                if (typeof rowIndex === "number") {
                  dispatch(setActiveMediaItem(record))
                  dispatch(setActiveMediaItemIndex(rowIndex))
                  navigate(`/search-results/Media/${record.attributes.uniqueId}`, { replace: true })
                }
              },
            };
          }}
        //   onC
        ></StyledTableWrapper>
      </InfiniteScroll>
      <MediaDetailsModal
      />
    </Box>
  );
};

export default ListView;
