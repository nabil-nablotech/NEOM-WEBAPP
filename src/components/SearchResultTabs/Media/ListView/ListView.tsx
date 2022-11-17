import { useState, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { ColumnsType } from "antd/lib/table";
import { StyledAntTable } from "../../../StyledAntTable";
import styled from "styled-components";
import { antTablePaginationCss } from "../../../../utils/services/helpers";
import InfiniteScroll from "react-infinite-scroll-component";
import commonStyles from "../../index.module.css";
import { Loader } from "../../../Loader";
import { MediaProps } from "../GridView/GridView";
import { baseUrl, detectMediaTypeFromMediaList } from '../../../../utils/services/helpers';
import RenderFileData from '../../../RenderFileData';

import { MoreOptionsComponent } from './MoreOption';
import { Media, MediaAttributes } from "../../../../types/Media";
// import {CustomModal} from '../../../CustomModal';
// import {MediaDetailsPage} from '../DetailsPage';
// import styles from './index.module.css';
// import CloseIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from 'react-responsive'

import { setActiveMediaItem, setActiveMediaItemIndex, setSelectedCardIndex } from '../../../../store/reducers/searchResultsReducer';
import NoImagePresent from "../../../NoDataScreens/NoImagePresent";
import { useHistory } from "../../../../hooks/useHistory";
import styles from '../GridView/index.module.css'

const StyledTableWrapper = styled(StyledAntTable)`
  .ant-table-container {
  }
  .ant-table {
    margin-block: 2em;
  }

  td {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  }
  .more-menu-ant-cell,
  .more-menu-ant-cell > div,
  .ant-table-tbody > tr > td.more-menu-ant-cell {
    width: 20px !important;
    min-width: 20px !important;
    max-width: 20px !important;
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
  .ant-table-tbody > tr > td.more-menu-ant-cell {
    min-width: unset;
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

    .ant-table td {
      font-size: 12px;
      white-space: break-spaces;
    }
    .ant-table th {
      font-size: 13px;
    }

    .ant-table-tbody > tr > td {
      word-wrap: unset;
      word-break: unset;
      white-space: break-spaces;
    }

    .cell-image {
      min-width: 20ch !important;
    }

    .cell-description {
      min-width: 20ch !important;
    }

    .cell-bearing {
      min-width: 18ch !important;
    }
  }
  ${antTablePaginationCss}
`;

const ListView = (props: MediaProps) => {
  const { data, hasMoreData, fetchData, loading, setEdit } = props;
  const isTablet = useMediaQuery({ query: '(min-width: 575px) and (max-width: 1025px)' })
  const { navigateTo } = useHistory()
  const tableHeaderJson: ColumnsType<any> = [
    {
      title: "Image",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-image",
      width: 150,
      render: (value: MediaAttributes, index: number) => (
        <>
          {/* {value?.object?.data?.attributes ? <Box
            className={`media-table-image`}
            component="img"
            alt={""}
            src={`${baseUrl}${value?.object?.data?.attributes?.url}`}
          ></Box> : <NoImagePresent message={"No image to preview"} />} */}
           <>
           <RenderFileData
              fileData={{
                  alt: "",
                  src: value.object?.data?.attributes?.url ? `${baseUrl}${value?.object?.data?.attributes?.url}` : undefined,
                  className: detectMediaTypeFromMediaList({attributes: value, id: index.toString()}) === "video" ?
                      `${styles['video-card-parent']}` : detectMediaTypeFromMediaList({attributes: value, id: index.toString()}) === "image" ?
                          `${styles['card-image']}` : `${styles['three-d-card-parent']}`,
                  objectURL: value.objectURL || '',
                  videoType: value.videoType,
                  iframeVideoLink: (value.videoType === "url") ? value.referenceURL : undefined,
                  staticVideoLink:  (detectMediaTypeFromMediaList({attributes: value, id: index.toString()}) === "video" && value.videoType === "video") ? `${baseUrl}${value.object?.data?.attributes?.url}` : undefined
              }}
              fileType={detectMediaTypeFromMediaList({attributes: value, id: index.toString()})}
          />
          </>
        </>
      ),
    },

    {
      title: "TITLE",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-title",
      width: 170,
      render: (value: any, index: any) => value?.fileName?.substring(0, 20),
    },
    {
      title: "DESCRIPTION",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-description",
      width: 200,
      render: (value: any, index: any) => value?.description || '',
    },
    {
      title: "TYPE",
      key: "attributes",
      dataIndex: "attributes",
      width: 100,
      render: (value, index) => value.categoryType ? value.categoryType.join(', ') : '',
    },
    {
      title: "BEARING",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-bearing",
      width: isTablet? 80 : 60,
      render: (value: any, index: any) => value?.bearing,
    },
    {
      title: "FEATURED",
      key: "attributes",
      dataIndex: "attributes",
      className: "cell-bearing",
      width: isTablet? 80 : 60,
      sorter: (a: Media, b: Media ) => {
        return a?.attributes?.featuredImage.toString().localeCompare(b?.attributes?.featuredImage.toString())
    },
      render: (value: any, index: any) =>{
        return  value.featuredImage ? 'Yes' : 'No'
      },
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      width: 20,
      className: "more-menu-ant-cell",
      render: (value: any, record: Media) => (
        <MoreOptionsComponent id={record.id} record={record} setEdit={setEdit} />
      ),
    },
  ];


  const [isModalOpen, setModalOpen] = useState(false);
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
                  // navigate(`/search-results/Media/${record.attributes.uniqueId}`, { replace: true })
                  navigateTo(`/search-results/Media/${record.attributes.uniqueId}`)
                }
              },
            };
          }}
        ></StyledTableWrapper>
      </InfiniteScroll>
    </Box>
  );
};

export default ListView;
