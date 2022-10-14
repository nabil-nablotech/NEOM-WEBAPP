import { useState, useEffect } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { ColumnsType } from 'antd/lib/table';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { User } from '../../../../types/User';
import { StyledAntTable } from '../../../StyledAntTable';
import styled from "styled-components";
import { antTablePaginationCss } from '../../../../utils/services/helpers';
import { usePaginatedArray } from './../../../../hooks/usePaginatedArray';
import InfiniteScroll from 'react-infinite-scroll-component';
import commonStyles from '../../index.module.css';
import { Loader } from '../../../Loader';

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

        .cell-image {
            min-width: 20ch !important;
        }

        .cell-description {
            min-width: 20ch !important;
        }

    }
    ${antTablePaginationCss}
`

const MoreOptionsComponent = ({
    record,
    id,
}: {
    id: number;
    record: User;
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const showRecoveryLink = record.recoveryToken;
    return (
        <>
            <div
                className=""
            >
                <MoreHorizIcon className="more-menu-div" />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    key={1}
                >
                    Menu 1
                </MenuItem>
                <MenuItem key={2}>
                    Menu 2
                </MenuItem>
            </Menu>
        </>
    );
};





const ListView = () => {


    const tableHeaderJson: ColumnsType<any> = [
        {
            title: "Image",
            key: "thumbnailUrl",
            dataIndex: "thumbnailUrl",
            className: 'cell-image',
            render: (value: string, index: any) => <>
                <Box className={`media-table-image`} component="img" alt={""} src={value}>

                </Box>
            </>
        },

        {
            title: "IMAGE DESCRIPTION",
            key: "title",
            dataIndex: "title",
            className: 'cell-description',
            render: (value: string, index: any) => value.substring(0, 8)
        },
        {
            title: "SITE",
            key: "title",
            dataIndex: "title",
            className: 'cell-site',
            sorter: (a: { title: string; }, b: { title: any; }) => {
                return a.title.localeCompare(b.title)
            },
            sortDirections: ["ascend"],
            defaultSortOrder: "ascend",
            render: (value: string, index: any) => value.substring(0, 8)
        },
        {
            title: "NUMBER",
            key: "id",
            dataIndex: "id",
            className: 'cell-id',
            render: (value: string, index: any) => value,
        },
        {
            title: "TYPE",
            key: "title",
            dataIndex: "title",
            className: 'cell-type',
            render: (value: string, index: any) => value.substring(0, 10)
        },
        {
            title: "BEARING",
            key: "title",
            dataIndex: "title",
            className: 'cell-bearing',
            render: (value: string, index: any) => value.substring(0, 2)
        },
        {
            title: "FEATURED",
            key: "title",
            dataIndex: "title",
            className: 'cell-bearing',
            render: (value: string, index: any) => value.substring(2, 5),
        },
        {
            title: "",
            key: "action",
            fixed: 'right',
            className: 'more-menu-ant-cell',
            render: (value: any, record: User) => (
                <MoreOptionsComponent id={record.id} record={record} />
            ),
        },
    ]
    const {
        data,
        hasMoreData,
        fetchData,
        loading
    } = usePaginatedArray({
        apiUrl: 'https://jsonplaceholder.typicode.com/photos',
        step: 10
    })

    useEffect(() => {
        /** Needs to be done , since InfiniteSCroll needs a relation with
         * div being scrolled. Here its tbody of ant table
         */
        const ele = document.querySelector('#media-list-parent .ant-table-body')
        if (ele) {
            ele.id = "media-list-div"
        }
    }, []);

    return (
        <Box id={'media-list-parent'} >
            <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={() => fetchData()}

                hasMore={hasMoreData}
                loader={<Loader />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>END OF RESULTS</b>
                    </p>
                }
                scrollableTarget={'media-list-div'}
                className={`${commonStyles['infinite-scroll-cls']}`}
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
                ></StyledTableWrapper>
            </InfiniteScroll>
        </Box>
    );
}

export default ListView;