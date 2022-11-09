import { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { ColumnsType } from "antd/lib/table";
import { StyledAntTable } from "../../../StyledAntTable";
import styled from "styled-components";
import { antTablePaginationCss, DETACH_ICON_CLASSNAME, isRecordAttached, shouldAddAtttachColumnHeader } from '../../../../utils/services/helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import commonStyles from '../../index.module.css';
import { Loader } from '../../../Loader';
import {PlacesProps} from '../GridView/GridView';
import { FieldOption, Place } from "../../../../types/Place";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import DetachedIcon from "../../../Icons/DetachedIcon";
import { useDispatch } from "react-redux";
import { modifyAssociatedPlaces } from "../../../../store/reducers/searchResultsReducer";
import MoreOptionsComponent from './MoreOption';
import { InventoryAssociationType } from "../../../../types/SearchResultsTabsProps";
 
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
  .cell-number {
    min-width: 8ch !important;
  }
  .cell-tourism {
    min-width: 10ch !important;
  }
  .cell-recommend {
    min-width: 20ch !important;
  }

  .cell-period {
    min-width: 20ch !important;
  }

  .cell-conserve {
    min-width: 15ch !important;
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
    .cell-research {
      min-width: 16ch !important;
    }
    .cell-tourism {
      min-width: 14ch !important;
    }
    .cell-recommend {
      min-width: 20ch !important;
    }

    .cell-conserve {
      min-width: 15ch !important;
    }

    .cell-name {
      min-width: 25ch !important;
    }
  }
  ${antTablePaginationCss}
`;

const ListView = (props: PlacesProps) => {

  const dispatch = useDispatch()

  const { isAssociationsStepOpen, associatedPlaces } = useSelector(
    (state: RootState) => state.searchResults
  );

    const [tableHeaderJson, setTableHeaderJson] = useState<ColumnsType<any>>([
      {
          title: "NAME",
          key: `attributes`,
          dataIndex: "attributes",
          className: 'cell-name',
          sorter: (a: { attributes: {placeNameEnglish: string;} }, b: { attributes: {placeNameEnglish: string;} }) => {
              return a.attributes.placeNameEnglish.localeCompare(b.attributes.placeNameEnglish)
          },
          sortDirections: ["ascend"],
          defaultSortOrder: "ascend",
          render: (value: any, index: number) => {
            return `${value.placeNameEnglish}${value.placeNameArabic}`            
          }
      },
      {
          title: "NUMBER",
          key: `attributes`,
          dataIndex: "attributes",
          className: 'cell-number',
          render: (value: any, index: number) => value.placeNumber
      },
      {
          title: "TYPE",
          key: `attributes`,
          dataIndex: "attributes",
          render: (value: any, index: number) => value?.siteType.map((x: string) => `${x}`)
      },
      {
          title: "RESEARCH VALUE",
          key: `attributes`,
          dataIndex: "attributes",
          className: 'cell-research',
          render: (value: any, index: number) => {
              return value.researchValue
          },
      },
      {
          title: "TOURISM VALUE",
          key: `attributes`,
          dataIndex: "attributes",
          className: 'cell-tourism',
          render: (value: any, index: number) => value.tourismValue.map((x: string) => `${x}`)
      },
      {
          title: "STATE OF CONSERVATION",
          key: `attributes`,
          dataIndex: "attributes",
          className: 'cell-conserve',
          render: (value: any, index: number) => value.stateOfConservation.map((x: string) => `${x}`)
      },
      {
          title: "RECOMMENDATION",
          key: `attributes`,
          dataIndex: "attributes",
          className: 'cell-recommend',
          render: (value: any, index: number) => value.recommendation.map((x: string) => `${x}`)
      },
      {
          title: "PERIOD",
          key: `attributes`,
          dataIndex: "attributes",
          className: 'cell-period',
          render: (value: any, index: number) => value.period.map((x: string) => `${x}`)
      },
      {
          title: "RISK",
          key: `attributes`,
          dataIndex: "attributes",
          render: (value: any, index: number) => value.risk.map((x: string) => `${x}`)
      },
      {
          title: "",
          key: "action",
          fixed: 'right',
          className: 'more-menu-ant-cell',
          render: (value: any, record: Place) => (
              <MoreOptionsComponent type="Places" setEdit={props.setEdit} record={record} />
          ),
      },
  ])


  const handleAttachClick = (e:any, record: Place) => {
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
  }

  const attachIconColumnHeader: any = useMemo(() => ({
    title: "",
    key: "action",
    fixed: 'left',
    className: 'more-menu-ant-cell attach-icon',
    render: (value: any, record: Place) => {

      return <Box component="div">
        <DetachedIcon
          style={{
            height: '18px',
            position: 'relative',
            top: '3px',
          }}
          shouldShowAttachIcon={isRecordAttached(record, associatedPlaces)}
          onClick={e => {
          }}
        />
      </Box>
    }
  }), [associatedPlaces]
  )

    const {data, hasMoreData, fetchData, loading} = props;

    useEffect(() => {
        /** Needs to be done , since InfiniteSCroll needs a relation with
         * div being scrolled. Here its tbody of ant table
         */
        const ele = document.querySelector('#places-list-parent .ant-table-body')
        if (ele) {
            ele.id = "places-list-div"
        }
 
    }, []);

    /** Effect needed to refresh the headers, 
     * when associations have changed.
     */
    useEffect(() => {
      setTableHeaderJson(state => state.filter(item => {
        return shouldAddAtttachColumnHeader(item)
      }))

      setTableHeaderJson(state => {
        let newState = [...state]
        if(newState.every(item => shouldAddAtttachColumnHeader(item))) {
          newState = [attachIconColumnHeader , ...state]
        }

        return newState 
      })
    }, [associatedPlaces]);

    useEffect(() => {

        if(isAssociationsStepOpen) {
          setTableHeaderJson(state => {
            let newState = [...state]
            if(newState.every(item => shouldAddAtttachColumnHeader(item))) {
              newState = [attachIconColumnHeader , ...state]
            }

            return newState 
          })
        } else {
          setTableHeaderJson(state => state.filter(item => {
            return shouldAddAtttachColumnHeader(item)
          }))
        }
 
    }, [isAssociationsStepOpen]);

    return (
        <Box component="div" id={'places-list-parent'}>
            <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={() => fetchData()}

                hasMore={hasMoreData}
                loader={loading ? <Loader /> : null}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>END OF RESULTS</b>
                    </p>
                }
                scrollableTarget={'places-list-div'}
                className={`${commonStyles['infinite-scroll-cls']}`}
            >
                <StyledTableWrapper
                    // className={`${styles["table-container"]}`}
                    rowKey={"id"}
                    size="small"
                    columns={tableHeaderJson}
                    dataSource={data}
                    pagination={false}
                    loading={loading}
                    bordered
                    scroll={{ x: true, y: 300 }}
                    style={{
                        background: "transparent",
                    }}
                    onRow={(record: any, rowIndex) => {
                      return {
                        onClick: (event: React.MouseEvent<HTMLElement>) => {
                          const target = event.target as Element;
                          const clsList = target.classList

                          if ([...clsList].includes(DETACH_ICON_CLASSNAME)) {
                            handleAttachClick(event, record)
                          }
                        }, // click row
                      };
                    }}
                />
            </InfiniteScroll>
        </Box>
    );
}

export default ListView;
