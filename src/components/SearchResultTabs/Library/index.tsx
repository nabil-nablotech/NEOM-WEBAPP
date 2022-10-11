import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import styles from '../index.module.css'
import Button from "../../../components/Button";
import styled from 'styled-components';
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const StyledTable = styled(Table)`
  th,
  .cellnowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ant-table-fixed {
    table-layout: fixed;
  }

  .ant-table {
    font-family: 'Roboto-Regular';
    margin-block: 50px
  }

  .ant-table-thead > tr > th,
  .ant-table {
    background: transparent;
  }

  .ant-table-thead > tr > th {
    border: none;
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > thead > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > thead > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > thead > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tbody > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tbody > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tbody > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tfoot > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tfoot > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tfoot > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tfoot > tr > th,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tfoot > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tfoot > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tfoot > tr > td,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tfoot > tr > td {
    border: none
  }

  .ant-table.ant-table-bordered > .ant-table-container {
    border: none;
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table {
    border: none
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table,
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td {
    border-bottom: 1px solid var(--user-table-border);
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table th {
    color: var(--grey-text);
  }
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table td {
    color: var(--table-black-text);
  }

  .ant-table-tbody > tr > td {
    word-wrap: break-word;
    word-break: break-all;
    min-width: 125px;
  } 

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td.more-icon {
    border-left: 1px solid var(--user-table-border);
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td.more-icon .cellnowrap {
    width: fit-content;
  }

  td.ant-table-cell-row-hover {
    background: var(--user-table-cell-hover-bg) !important;
  }import { styled } from 'styled-components';
import { useEffect, useState } from 'react';


  .ant-table.ant-table-bordered .ant-table-body tr.ant-table-row td:last-of-type {
  }

  td.ant-table-column-sort {
    background-color: transparent;
  }

  .ant-table-column-sorter-inner {
  }

`;
let viewWidths = ["20vw", "20vw", "20vw", "20vw", "5vw"];


const tableHeaderJson: ColumnsType<any> = [
    {
        title: 'NAME',
        key: 'name',
        dataIndex: 'name',
        width: viewWidths[0],
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['ascend'],
        defaultSortOrder: 'ascend',
        render: (value, record: any) => (<Box sx={{
            display: 'flex',
            gap: '1em'
        }}>
            <InsertDriveFileOutlinedIcon fontSize='small' />
            <Box>{value}</Box>
        </Box>)
    },
    {
        title: "DESCRIPTION",
        key: "description",
        //   dataIndex: "description",
        dataIndex: "company", // temporary
        render: (value, index) => { // temporary
            return value.name
        },
    },
    {
        title: "CITATION",
        //   dataIndex: "citation",
        dataIndex: "company", // temporary
        render: (value, index) => { // temporary
            return value.catchPhrase
        },
        //   width: viewWidths[2],
    },
    {
        title: "URL",
        key: "url",
        //   dataIndex: "url",
        dataIndex: "website", // temporary
        render: (value, index) => (
            <Box component={'a'} sx={{
                color: 'initial',
                textDecoration: 'underline'
            }}>
                {value}
            </Box>
        ),
    },
    {
        title: "SITE",
        key: "site",
        width: viewWidths[4],
        //   dataIndex: "site",
        dataIndex: "username", // temporary
        render: (value, index) => value, // temporary
    },
]


const LibraryTab = ({
    resultCount = 1053
}) => {

    const [dataList, setDataList] = useState<any>([])
    const [loading, setloading] = useState<boolean>(false)

    useEffect(() => {
        setloading(true)
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                setloading(false)
                setDataList(res.slice(0, 10))
            })

    }, [])


    return (
        <Box className={`${styles['main-tab-content']}`}>
            <Box className={`${styles['utility-bar']}`}>
                <Box>{resultCount} Total Library Items</Box>
                <Box>
                    <Button
                        colors={["transparent", "var(--table-black-text)", "var(--table-black-text)"]}
                        className={`${styles["export-btn"]}`}
                        label="Export"
                        style={{
                            border: '1px solid var(--light-grey-border)',
                            borderRadius: '40px',
                            padding: '0.2em 15px',
                            lineHeight: '2',
                            height: '100%',
                            textAlign: 'center'
                        }}
                    // onClick={handleCancel}
                    />
                </Box>
            </Box>
            <Box>
                <StyledTable
                    className={`${styles["table-container"]}`}
                    rowKey={"id"}
                    size="small"
                    columns={tableHeaderJson}
                    dataSource={dataList}
                    pagination={false}
                    loading={loading ? loading : false}
                    bordered
                    scroll={{ x: true, y: 300 }}
                    style={{
                        background: "transparent",
                    }}
                ></StyledTable>
            </Box>
        </Box>
    );
}

export default LibraryTab;