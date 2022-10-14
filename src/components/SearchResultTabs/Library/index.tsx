import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import styles from '../index.module.css'
import Button from "../../../components/Button";
import styled from 'styled-components';
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { StyledAntTable } from '../../StyledAntTable';
import { usePaginatedArray } from '../../../hooks/usePaginatedArray';
import InfiniteScroll from 'react-infinite-scroll-component';
import commonStyles from '../index.module.css';
import { Loader } from '../../../components/Loader';

let viewWidths = ["20vw", "20vw", "20vw", "20vw", "5vw"];


const LibraryTab = ({
    resultCount = 1053
}) => {

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
    const {
        data,
        hasMoreData,
        fetchData,
        loading
    } = usePaginatedArray({
        apiUrl: 'https://jsonplaceholder.typicode.com/users',
        step: 10
    })

    useEffect(() => {
        /** Needs to be done , since InfiniteSCroll needs a relation with
         * div being scrolled. Here its tbody of ant table
         */
        const ele = document.querySelector('#library-list-parent .ant-table-body')
        if (ele) {
            ele.id = "library-list-div"
        }
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
            <Box id={'library-list-parent'}>
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
                    scrollableTarget={'library-list-div'}
                    className={`${commonStyles['infinite-scroll-cls']}`}
                >
                    <StyledAntTable
                        className={`${styles["table-container"]}`}
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
                    ></StyledAntTable>
                </InfiniteScroll>
            </Box>
        </Box>
    );
}

export default LibraryTab;