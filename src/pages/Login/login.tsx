import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import "./style.css";
import useAuth from "../../hooks/useAuth";
import { SideContent } from "./sideContent";
import PositionedSnackbar from "../../components/Snackbar";

import { validateEmail, validatePassword, baseUrl } from "../../utils/services/helpers";

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
};

type FormError = {
  show: boolean;
  message: string;
};

type FormErrors = {
  email: FormError;
  password: FormError;
};

export function Login() {

  const { clientLogin, fetchLoginData, data, loading } = useAuth();

  const navigate = useNavigate();

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
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: {
      show: false,
      message: "",
    },
    password: {
      show: false,
      message: "",
    },
  });

  const [snackbarErrorMessage, setSnackbarErrorMessage] =
    useState<boolean>(false);
  const [isSignInDisabled, toggleSignInDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      (formErrors.email.show && state.email) ||
      (formErrors.password.show && state.password) ||
      !state.email ||
      !state.password
    ) {
      toggleSignInDisabled(true);
    } else {
      toggleSignInDisabled(false);
    }
  }, [formErrors, state]);

// on input change function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "email" | "password"
  ) => {
    const lclState = state;
    lclState[name] = e.target.value;
    setFormErrors({
      ...formErrors,
      email: {
        show: false,
        message: "",
      }
    });

    if (name === "password") {
      validateCredentials("password");
    }
    setState({ ...state, ...lclState });
  };

  // Function is responsible for the validation of input fields
  const validateCredentials = (name: "email" | "password") => {
    if (name === "email") {
      /** temporary static email validation */
      
      if (!validateEmail(state.email)) {
        setFormErrors((state: any) => ({
          ...state,
          email: {
            show: true,
            message: "Invalid email",
          },
        }));
      } else {
        setFormErrors((state: any) => ({
          ...state,
          email: {
            show: false,
            message: "",
          },
        }));
      }
    }
    if (name === "password") {
      /** temporary static email validation */
      const matchFlag = validatePassword(state.password);

      if (!matchFlag) {
        setFormErrors((state: any) => ({
          ...state,
          password: {
            show: true,
            message:
              "Password must contain min 8 letter with at least a symbol, upper and lower case letters and a number",
          },
        }));
      } else {
        setFormErrors((state: any) => ({
          ...state,
          password: {
            show: false,
            message: "",
          },
        }));
      }
    }
  }

  // Form submission
  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await clientLogin({
      identifier: state.email,
      password: state.password,
    });
    if (data) {
      navigate('/');
    } else {
      setSnackbarErrorMessage(true);
    }
  };

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
        lg={8}
        xl={8}
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
            error={formErrors.email.message ? true : false}
            errorText={formErrors.email.message}
            onChange={(e) => handleChange(e, "email")}
            onBlur={() => validateCredentials('email')}
          />
          <TextInput
            className={`login-pwd`}
            label="Password"
            type={"password"}
            value={state.password}
            onChange={(e) => handleChange(e, "password")}
            onBlur={() => validateCredentials('password')}
          />
          <Button
            className={"sign-in-btn"}
            label="SIGN IN"
            disabled={isSignInDisabled}
            onClick={(e) => submit(e)}
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
      <PositionedSnackbar
        message={"User not found"}
        severity={"error"}
        open={snackbarErrorMessage}
        handleClose={() => setSnackbarErrorMessage(false)}
      />
    </Grid>
  );
}
