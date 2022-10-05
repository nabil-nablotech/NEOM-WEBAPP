import React, { useState } from "react";
import { Grid, ThemeProvider, Typography } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import LoginCom from "../../components/Login";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import "./style.css";
import useFetch from "../../hooks/useFetch";
import { SideContent } from "./sideContent";
import useLogin from "../../hooks/useLogin";
import {validateEmail, validatePassword} from '../../utils/services/helpers';

const LOGINDATA = gql`
  query GetLoginData {
    login {
      data {
        id
        attributes {
          title
          laebl
          button {
            theme
          }
        }
      }
    }
  }
`;

type stateInput = {
  email: string;
  password: string;
  passwordError: string;
  emailError: string;
  disabled: boolean
};
export function Login() {
  const baseUrl = `https://8130-49-204-165-45.in.ngrok.io`;
  const { error, loading, data } = useFetch(
    `/api/login?populate[0]=button&populate[1]=input&populate[2]=backgroundImage.image&populate[4]=bottomText&populate[5]=logo.image`,
    "GET",
    null
  );
  const {data: loginRes, error: loginErr, loading: loginLoad, fetchData} = useLogin();
  console.log("login data", data);

  const textField1Data = {
    children: "Email Address",
  };

  const textField2Data = {
    children: data?.attributes?.input[1].placeholder || "",
    className: "text-field-1",
  };

  const login1Data = {
    overlapGroup1: `${baseUrl}${data?.attributes?.backgroundImage.data.attributes.url}`,
    image3: `${baseUrl}${data?.attributes?.logo.image.data.attributes.url}`,
    spanText1: data?.attributes?.title,
    spanText2: data?.attributes.label,
    spanText3: data?.attributes.button.label,
    spanText4: data?.attributes.bottomText.title,
    spanText5: data?.attributes.bottomText.label,
    spanText6: "support@",
    spanText7: "neomheritage",
    spanText8: ".com",
    textField1Props: textField1Data,
    textField2Props: textField2Data,
  };
  const [state, setState] = useState<stateInput>({
    email: "",
    password: "",
    passwordError: '',
    emailError: '',
    disabled: true
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "email" | "password"
  ) => {
    const lclState = state;
    lclState[name] = e.target.value;
    if (name === "email" && !validatePassword(lclState.email)) {
      lclState.disabled = true;
      lclState.emailError = 'Invalid email';
    }
    if (name === "password" && !validatePassword(lclState.password)) {
      lclState.disabled = true;
      lclState.passwordError = 'Password must contain min 8 letter with at least a symbol, upper and lower case letters and a number';
    }
    if (validateEmail(lclState.email)) {
      lclState.emailError = '';
    }
    if (validatePassword(lclState.password)) {
      lclState.passwordError = '';
    }
    if (validateEmail(lclState.email) && validatePassword(lclState.password)) {
      lclState.disabled = false;
    }
    setState({ ...state, ...lclState });
  };

  const submit = async () => {
    await fetchData({
      identifier: state.email,
      password: state.password
    })
  };
console.log('login Error', loginErr)
  return (
    <Grid className="loginContainer" container direction="row" item xs={12}>
      <SideContent />
      <Grid
        className="contentContainer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        item
        sm={6}
        md={9}
        lg={9}
        xl={9}
      >
        <Grid className="content">
          <Grid className="">
            <div className="header">Sign in to neom heritage</div>
          </Grid>
          <div className="subHeader">Enter your details below</div>
          <TextInput
            className={`login-email`}
            label="Email Address"
            value={state.email}
            error={state.emailError.length > 0}
            errorText={state.emailError}
            onChange={(e) => handleChange(e, "email")}
          />
          <TextInput
            className={`login-pwd`}
            label="Password"
            type={"password"}
            value={state.password}
            error={state.passwordError.length > 0}
            errorText={state.passwordError}
            onChange={(e) => handleChange(e, "password")}
          />
          <Button
            className={"sign-in-btn"}
            label="SIGN IN"
            disabled={state.disabled}
            onClick={submit}
          />
        </Grid>
        <div className="bottomText">
          <p>Don’t have an account yet or forgot your password?</p>
          <p>
            Contact{" "}
            <span>
              <a href="support@neomheritage.com" target={"_blank"}>
                support@neomheritage.com
              </a>
            </span>
          </p>
        </div>
      </Grid>
    </Grid>
  );
}
