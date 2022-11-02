import { useState, useEffect } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { ColumnsType } from 'antd/lib/table';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User } from '../../../../types/User';
import { StyledAntTable } from '../../../StyledAntTable';
import styled from "styled-components";
import { antTablePaginationCss } from '../../../../utils/services/helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import commonStyles from '../../index.module.css';
import { Loader } from '../../../Loader';
import {EventsProps} from '../GridView/GridView';
import { setSelectedCardIndex } from "../../../../store/reducers/searchResultsReducer";
import MoreOptionsComponent from './MoreOption';
import { Event } from '../../../../types/Event';

const StyledTableWrapper = styled(StyledAntTable)`
    
    .ant-table-container {
    }
    .ant-table {
        margin-block: 2em;
    }
    
    .ant-table-thead > tr > th:not(.ant-table-thead > tr > th.more-menu-ant-cell) ,
    .ant-table-tbody > tr > td:not(.ant-table-tbody > tr > td.more-menu-ant-cell) {
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
    
    .cell-conserve {
        min-width: 15ch !important;
    }
    .ant-table-cell.more-menu-ant-cell {
        vertical-align:middle;
        min-width: 20px;
        width: 20px;
    }
    .more-menu-div {
        vertical-align:middle;
    }
    .ant-table-thead > tr > th.ant-table-cell-fix-right,
    .ant-table-cell-fix-right {
        background: var(--off-white-background-color);
    }
    
    .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr > th.more-menu-ant-cell.ant-table-cell-fix-right {
        border-left: 1px solid #f0f0f0;
    }

    @media (min-width: 575px) and (max-width: 1025px) {

        .ant-table-thead > tr > th:not(.ant-table-thead > tr > th.more-menu-ant-cell) ,
        .ant-table-tbody > tr > td:not(.ant-table-tbody > tr > td.more-menu-ant-cell) {
            min-width: 90px;
        }

        .ant-table-thead > tr > th.more-menu-ant-cell.ant-table-cell-fix-right ,
        .ant-table-tbody > tr > td.more-menu-ant-cell.ant-table-cell-fix-right {
            right: -5vw !important;
        }

        th.ant-table-cell ,
        th.ant-table-cell * {
        }
        td.ant-table-cell {
        }
        .cell-research{
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
` 

// const MoreOptionsComponent = ({
//     record,
//     id,
// }: {
//     id: number;
//     record: User;
// }) => {
//     const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (e: any) => {
//         setAnchorEl(e.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <>
//             <div
//                 className=""
//             >
//                 <MoreHorizIcon className="more-menu-div" />
//             </div>
//             <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 MenuListProps={{
//                     "aria-labelledby": "basic-button",
//                 }}
//             >
//                 <MenuItem
//                     key={1}
//                 >
//                     Edit
//                 </MenuItem>
//                 <MenuItem key={2}>
//                    Delete
//                 </MenuItem>
//             </Menu>
//         </>
//     );
// };

const ListView = (props: EventsProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tableHeaderJson: ColumnsType<any> = [
        {
            title: "NAME",
            key: `attributes`,
            dataIndex: "attributes",
            className: 'cell-name',
            // sorter: (a: { attributes: {visit_associate: VisitAssociate} }, b: { attributes: {visit_associate: VisitAssociate} }) => {
            //     return a.attributes.visit_associate.data.attributes.place_unique_id.data.attributes.placeNameEnglish.localeCompare(b.attributes.visit_associate.data.attributes.place_unique_id.data.attributes.placeNameEnglish);
            // },
            // sortDirections: ["ascend"],
            // defaultSortOrder: "ascend",
            render: (value: any, index: number) => {
              return `${value.visit_associate?.data?.attributes?.place_unique_id.data?.attributes.placeNameEnglish}${value.visit_associate.data?.attributes?.place_unique_id?.data?.attributes?.placeNameArabic || ''}`          
            }
        },
        {
            title: "NUMBER",
            key: `attributes`,
            dataIndex: "attributes",
            className: 'cell-number',
            render: (value: any, index: number) => value.visit_associate.data?.attributes.place_unique_id.data?.attributes.placeNumber || ''
        },
        {
            title: "TYPE",
            key: `attributes`,
            dataIndex: "attributes",
            render: (value: any, index: number) => value.visit_associate.data?.attributes.place_unique_id.data?.attributes.siteType.map((x: string) => `${x};`) || ''
        },
        {
            title: "RESEARCH VALUE",
            key: `attributes`,
            dataIndex: "attributes",
            className: 'cell-research',
            render: (value: any, index: number) => {
                return value?.researchValue.length > 0 ? value?.researchValue?.map((x: string) => `${x};`) : '';
            },
        },
        {
            title: "TOURISM VALUE",
            key: `attributes`,
            dataIndex: "attributes",
            className: 'cell-tourism',
            render: (value: any, index: number) => value?.tourismValue.length > 0 ? value?.tourismValue?.map((x: string) => `${x};`) : ''
            // render: (value: any, index: number) => "Temp"
        },
        {
            title: "STATE OF CONSERVATION",
            key: `attributes`,
            dataIndex: "attributes",
            className: 'cell-conserve',
            render: (value: any, index: number) => value?.stateOfConservation.length > 0 ? value?.stateOfConservation?.map((x: string) => `${x};`) : ''
        },
        {
            title: "RECOMMENDATION",
            key: `attributes`,
            dataIndex: "attributes",
            className: 'cell-recommend',
            render: (value: any, index: number) => value?.recommendation.length > 0 ? value?.recommendation?.map((x: string) => `${x || ''};`) : ''
            // render: (value: any, index: number) => "temp"
        },
        {
            title: "PERIOD",
            key: `attributes`,
            dataIndex: "attributes",
            className: 'cell-period',
            render: (value: any, index: number) => value?.period.length > 0 ? value?.period?.map((x: string) => `${x};`) : ''
        },
        {
            title: "RISK",
            key: `attributes`,
            dataIndex: "attributes",
            render: (value: any, index: number) => value?.risk?.length > 0 ? value?.risk?.map((x: string) => `${x};`) : ''
        },
        {
            title: "",
            key: "action",
            fixed: 'right',
            className: 'more-menu-ant-cell',
            render: (value: any, record: Event) => (

                <MoreOptionsComponent setEdit={props.setEdit} dispatch={dispatch} id={record.id} record={record} />
            ),
        },
    ]

    const {data, handleNext: fetchData, hasMoreData, loading} = props;
    useEffect(() => {
        /** Needs to be done , since InfiniteSCroll needs a relation with
         * div being scrolled. Here its tbody of ant table
         */
        const ele = document.querySelector('#events-list-parent .ant-table-body')
        if (ele) {
            ele.id = "events-list-div"
        }

    }, []);

    return (
        <Box component="div" id={'events-list-parent'}>
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
                scrollableTarget={'events-list-div'}
                className={`${commonStyles['infinite-scroll-cls']}`}
            >
                {data.length > 0 ? <StyledTableWrapper
                    // className={`${styles["table-container"]}`}
                    rowKey={"id"}
                    // onRow={(record: any, rowIndex) => {
                    //     return {
                    //       onClick: event => {
                    //         dispatch(setSelectedCardIndex(rowIndex || record.id))
                    //         navigate(`/search-results/Events/${record.attributes.uniqueId}`, {replace: true})
                    //       }, // click row
                    //     };
                    //   }}
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
                ></StyledTableWrapper> : <h1>No data available</h1>}
            </InfiniteScroll>
        </Box>
    );
}

export default ListView;