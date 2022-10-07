import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import styles from "./index.module.css";
import useAuth from "../../hooks/useAuth";
import PositionedSnackbar from "../../components/Snackbar";

import { validateEmail, validatePassword, baseUrl } from "../../utils/services/helpers";
import LoginScreenTemplate from "../../components/LoginScreenTemplate";
import Box from '@mui/material/Box';
import PasswordValid from '../../assets/images/password-valid.svg'
import PasswordInalid from '../../assets/images/password-invalid.svg'

type stateInput = {
  confirmPassword: string;
  password: string;
};

type FormError = {
  show: boolean;
  message: string;
};

type FormErrors = {
  confirmPassword: FormError;
  password: FormError;
};

export const SetPassword = () => {


  const navigate = useNavigate();

  const [state, setState] = useState<stateInput>({
    confirmPassword: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    confirmPassword: {
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
  const [isSetPasswordDisabled, toggleSetPasswordDisabled] = useState<boolean>(true);

  const [validatorsArray, setValidatorsArray] = useState<Array<validtr>>([
    {
      name: '8 characters',
      rule: /^.{8,}$/,
      fulfilled: false
    },
    {
      name: '1 uppercase letter',
      rule: /^(?=.*?[A-Z]).{1,}$/,
      fulfilled: false
    },
    {
      name: '1 special character',
      rule: /^(?=.*?[#?!@$%^&*-]).{1,}$/,
      fulfilled: false
    }
  ])

  // useEffect(() => {
  // if (
  //   (formErrors.password.show && state.password) ||
  //   (formErrors.confirmPassword.show && state.confirmPassword) ||
  //   !state.password ||
  //   !state.confirmPassword
  // ) {
  //   console.log('hex')
  //   toggleSetPasswordDisabled(true);
  // } else {
  //   toggleSetPasswordDisabled(false);
  // }
  // }, [formErrors, state, validatorsArray]);

  type validtr = {
    name: string
    rule: RegExp
    fulfilled: boolean
  }

  // on input change function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "confirmPassword" | "password"
  ) => {
    const lclState = state;
    lclState[name] = e.target.value;

    setState(state => ({
      ...state,
      [name]: e.target.value
    }))

    /**static if block setting to debug error message */
    if (!e.target.value) {

      validateCredentials(name);
    }

    if (name === 'password') {
      let newValidtrArray: Array<validtr> = []

      validatorsArray.forEach(ruleObj => {

        let tempObj = { ...ruleObj }
        let flag = e.target.value.match(ruleObj.rule)

        tempObj = {
          name: ruleObj.name,
          rule: ruleObj.rule,
          fulfilled: !!flag,
        }

        newValidtrArray.push(tempObj)

      })

      setValidatorsArray(newValidtrArray)
    }
  };

  // Function is responsible for the validation of input fields
  const validateCredentials = (name: "confirmPassword" | "password") => {
    setFormErrors({
      ...formErrors,
      [name]: {
        show: true,
        message: "sample",
      }
    });
  }

  // Form submission
  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

  };


  return (
    <>
      <LoginScreenTemplate>
        <Grid className={`${styles["content"]}`}>
          <Grid className="">
            <div className={`${styles["header"]}`}>WELCOME to neom heritage</div>
          </Grid>
          <div className={`${styles["subHeader"]}`}>Set your password</div>
          <TextInput
            className={`${styles["password"]}`}
            label="Password"
            value={state.password}
            error={formErrors.password.message ? true : false}
            errorText={formErrors.password.message}
            onChange={(e) => handleChange(e, "password")}
            onBlur={() => validateCredentials('password')}
          />
          <TextInput
            className={`${styles["confirm-password"]}`}
            label="Confirm Password"
            type={"password"}
            value={state.confirmPassword}
            error={formErrors.confirmPassword.message ? true : false}
            errorText={formErrors.confirmPassword.message}
            onChange={(e) => handleChange(e, "confirmPassword")}
            onBlur={() => validateCredentials('confirmPassword')}
          />
          <div className={`${styles["password-help-section"]}`}>
            <div className={`${styles["password-help-title"]}`}>Your password must have at least:</div>
            <section className={`${styles["validtr-list"]}`}>
              {
                validatorsArray.map(validateConditionObj => {

                  return <>
                    <div className={`${styles["validate-statement-row"]}`}>
                      <div>
                        <Box
                          component="img"
                          alt="NEOM logo"
                          src={validateConditionObj.fulfilled ? PasswordValid : PasswordInalid}
                        />
                      </div>
                      <div>
                        {validateConditionObj.name} {validateConditionObj.fulfilled}
                      </div>
                    </div>
                  </>
                })
              }
            </section>
          </div>
          <Button
            className={`${styles["sign-in-btn"]}`}
            label="SET PASSWORD"
            disabled={isSetPasswordDisabled}
            onClick={(e) => submit(e)}
          />
        </Grid>
      </LoginScreenTemplate>
    </>
  );
}
