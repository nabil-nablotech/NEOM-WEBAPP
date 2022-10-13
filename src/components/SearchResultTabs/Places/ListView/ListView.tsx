import { useState, useEffect } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { ColumnsType } from 'antd/lib/table';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { User } from '../../../../types/User';
import { StyledAntTable } from '../../../StyledAntTable';
import styled from "styled-components";
import { antTablePaginationCss } from '../../../../utils/services/helpers';

const StyledTableWrapper = styled(StyledAntTable)`
    
    .ant-table-container {
    }
    .ant-table {
        margin-block: 2em;
    }
    .ant-table-thead > tr > th ,
    .ant-table-tbody > tr > td {
        min-width: 50px;
    }

    th.ant-table-cell {
        white-space: break-spaces;
    }

    .cell-recommend {
        width: 19ch;
    }
    .cell-conserve {
        width: 16ch;
    }
    .ant-table-cell.more-menu-ant-cell {
        vertical-align:middle;
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
        .ant-table-tbody > tr > td {
            min-width: 90px;
        }

        .ant-table-thead > tr > th.more-menu-ant-cell.ant-table-cell-fix-right ,
        .ant-table-tbody > tr > td.more-menu-ant-cell.ant-table-cell-fix-right {
            right: -5vw !important;
        }

        th.ant-table-cell ,
        th.ant-table-cell * {
            font-size: 12px;
        }
        td.ant-table-cell {
            font-size: 11px;
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
    const [dataList, setDataList] = useState<any>([])
    const [loading, setloading] = useState<boolean>(false)


    const tableHeaderJson: ColumnsType<any> = [
        {
            title: "NAME",
            key: "title",
            dataIndex: "title",
            sorter: (a, b) => {
                return a.title.localeCompare(b.title)
            },
            sortDirections: ["ascend"],
            defaultSortOrder: "ascend",
            render: (value, index) => value.substring(0, 20)
        },
        {
            title: "NUMBER",
            key: "albumId",
            dataIndex: "albumId",
        },
        {
            title: "TYPE",
            key: "title",
            dataIndex: "title",
            render: (value, index) => value.substring(0, 8)
        },
        {
            title: "RESEARCH VALUE",
            key: "title",
            dataIndex: "title",
            render: (value, index) => {
                return value.substring(0, 8)
            },
        },
        {
            title: "TOURISM VALUE",
            key: "title",
            dataIndex: "title",
            render: (value, index) => value.substring(21, 24)
        },
        {
            title: "STATE OF CONSERVATION",
            key: "title",
            dataIndex: "title",
            className: 'cell-conserve',
            render: (value, index) => "Good"
        },
        {
            title: "RECOMMENDATION",
            key: "title",
            dataIndex: "title",
            className: 'cell-recommend',
            render: (value, index) => "Protected"
        },
        {
            title: "PERIOD",
            key: "title",
            dataIndex: "title",
            render: (value, index) => "Neolithic"
        },
        {
            title: "RISK",
            key: "title",
            dataIndex: "title",
            render: (value, index) => "None"
        },
        {
            title: "",
            key: "action",
            fixed: 'right',
            className: 'more-menu-ant-cell',
            render: (value, record: User) => (
                <MoreOptionsComponent id={record.id} record={record} />
            ),
        },
    ]


    useEffect(() => {
        setloading(true)
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(res => {
                setloading(false)
                setDataList(res)
            })

    }, []);
    return (
        <Box>
            <StyledTableWrapper
                // className={`${styles["table-container"]}`}
                rowKey={"id"}
                size="small"
                columns={tableHeaderJson}
                dataSource={dataList}
                pagination={{ position: ['bottomCenter'] }}
                loading={loading ? loading : false}
                bordered
                scroll={{ x: true, y: 300 }}
                style={{
                    background: "transparent",
                }}
            ></StyledTableWrapper>
        </Box>
    );
}

export default ListView;