import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styles from "../index.module.css";
import Button from "../../../components/Button";
import styled from "styled-components";
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { StyledAntTable } from "../../StyledAntTable";
import { usePaginatedArray } from "../../../hooks/usePaginatedArray";
import InfiniteScroll from "react-infinite-scroll-component";
import commonStyles from "../index.module.css";
import { Loader } from "../../../components/Loader";
import useLibrary from "../../../hooks/useLibrary";
import { Meta } from "../../../types/Place";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

let viewWidths = ["20vw", "20vw", "20vw", "20vw", "5vw"];

const LibraryTab = () => {
  const { selectedCardIndex, library, places, searchText, libararyMetaData } =
    useSelector((state: RootState) => state.searchResults);

  const { fetchLibraryItems, hasMoreData, loading } = useLibrary();
  const tableHeaderJson: ColumnsType<any> = [
    {
      title: "",
      key: "attributes",
      dataIndex: "attributes",
      width: viewWidths[4],
      className: "name-column",
      render: (value: any, record: any) => (
        <Box
          sx={{
            display: "flex",
            // gap: "1em",
          }}
        >
          <InsertDriveFileOutlinedIcon fontSize="small" />
        </Box>
      ),
    },
    {
      title: "NAME",
      key: "attributes",
      dataIndex: "attributes",
      width: viewWidths[0],
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["ascend"],
      defaultSortOrder: "ascend",
      className: "name-column",
      render: (value: any, record: any) => (
        <Box
          sx={{
            display: "flex",
            gap: "1em",
          }}
        >
          {/* <InsertDriveFileOutlinedIcon fontSize="small" /> */}
          <Box>{value.title}</Box>
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
          {value.referenceURL}
        </Box>
      ),
    },
    {
      title: "SITE",
      key: "attributes",
      width: viewWidths[0],
      dataIndex: "attributes",
      render: (value, index) => value.fileName, 
    },
  ];
  // const {
  //     data,
  //     hasMoreData,
  //     fetchData,
  //     loading
  // } = usePaginatedArray({
  //     apiUrl: 'https://jsonplaceholder.typicode.com/users',
  //     step: 10
  // })

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
    fetchLibraryItems({ search_one: searchText });
  };

  if (!library) {
    return <h1>No data found</h1>
  }

  return (
    <Box className={`${styles["main-tab-content"]}`}>
      <Box className={`${styles["utility-bar"]}`}>
        <Box>{meta?.pagination?.total} Total Library Items</Box>
        <Box>
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
            // onClick={handleCancel}
          />
        </Box>
      </Box>
      <Box id={"library-list-parent"}>
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
            scroll={{ y: 500, scrollToFirstRowOnChange: true }}
            style={{
              background: "transparent",
            }}
          ></StyledAntTable>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default LibraryTab;
