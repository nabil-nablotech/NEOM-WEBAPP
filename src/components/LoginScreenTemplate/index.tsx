import React, { Component } from 'react'
import { Grid } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import styles from "./index.module.css";
import useAuth from "../../hooks/useAuth";
import PositionedSnackbar from "../../components/Snackbar";
import login_bg from '../../assets/images/login_bg.png';
import logo_with_name from '../../assets/images/logo_with_name.png';

type LoginTemplate = {
    children: Array<React.ReactElement> | boolean | React.ReactElement
}
const LoginScreenTemplate = ({children}: LoginTemplate) => {
    return (
        <div>
            <Grid className={`${styles["loginContainer"]}`} container direction="row" item xs={12}>
            <Grid item sm={6} md={3} lg={4} xl={4} className={`${styles["sideGrid"]}`}>
                <div className={`${styles["bgImgContainer"]}`}>
                    <img src={login_bg} className={`${styles["bgImg"]}`} alt="left-bg"/>
                    <Grid display={'flex'} item alignItems={'center'} justifyContent={'center'}>

                    <img src={logo_with_name} className={`${styles["logo"]}`} alt="logo"/>
                    </Grid>
                </div>
                </Grid>
                <Grid
                    className={`${styles["contentContainer"]}`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    item
                    sm={6}
                    md={9}
                    lg={8}
                    xl={8}
                >
                    {children}
                </Grid>
                {/* <PositionedSnackbar
                    message={"User not found"}
                    severity={"error"}
                    open={snackbarErrorMessage}
                    handleClose={() => setSnackbarErrorMessage(false)}
                /> */}
            </Grid>
        </div>
    );
}

export default LoginScreenTemplate;