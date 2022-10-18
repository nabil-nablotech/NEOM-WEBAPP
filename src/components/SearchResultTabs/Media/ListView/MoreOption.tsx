import { useState, useEffect } from "react";
import { Box, Menu, MenuItem, Grid } from "@mui/material";
import { ColumnsType } from "antd/lib/table";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { User } from "../../../../types/User";
import { StyledAntTable } from "../../../StyledAntTable";
import styled from "styled-components";
import { antTablePaginationCss } from "../../../../utils/services/helpers";
import { usePaginatedArray } from "./../../../../hooks/usePaginatedArray";
import InfiniteScroll from "react-infinite-scroll-component";
import commonStyles from "../../index.module.css";
import styles from "./index.module.css";
import { Loader } from "../../../Loader";
import { CustomModal } from "../../../CustomModal";
import { DetailsPage } from "./../DetailsPage/index";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { MediaProps } from "../GridView/GridView";
import {formatWebDate} from '../../../../utils/services/helpers'
import { Media } from "../../../../types/Media";

export const MoreOptionsComponent = ({ record, id }: { id: string; record: Media }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    // const showRecoveryLink = record.recoveryToken;
    return (
      <>
        <div className="">
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
          <MenuItem key={1}>Menu 1</MenuItem>
          <MenuItem key={2}>Menu 2</MenuItem>
        </Menu>
      </>
    );
  };