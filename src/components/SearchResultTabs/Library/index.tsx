import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import styles from '../index.module.css'
import Button from "../../../components/Button";
import styled from 'styled-components';
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { StyledAntTable } from '../../StyledAntTable';

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
        className: 'name-column',
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
        className: 'description-column',
        //   dataIndex: "description",
        dataIndex: "company", // temporary
        render: (value, index) => { // temporary
            return value.name
        },
    },
    {
        title: "CITATION",
        className: 'citation-column',
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

    }, []);


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
                <StyledAntTable
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
                ></StyledAntTable>
            </Box>
        </Box>
    );
}

export default LibraryTab;