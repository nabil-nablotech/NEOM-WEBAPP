import React, {useState, useEffect} from "react";
import { Grid, ThemeProvider, Typography } from "@mui/material";
import { useQuery, gql } from '@apollo/client';
import LoginCom from '../../components/Login';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import './style.css';
import useFetch from '../../hooks/useFetch';
import { SideContent } from './sideContent';
import PositionedSnackbar from "../../components/Snackbar";

const LOGINDATA = gql`
  query GetLoginData {
    login{
      data{
        id,
        attributes{
          title,
          laebl,
          button {
            theme
          }
        }
      }
    }
  }
`

type stateInput = {
  email: string
  password: string
} 
export function Login() {
  const baseUrl = `https://8130-49-204-165-45.in.ngrok.io`;
  const {error, loading, data} = useFetch(`${baseUrl}/api/login?populate[0]=button&populate[1]=input&populate[2]=backgroundImage.image&populate[4]=bottomText&populate[5]=logo.image`);
  // const {error, loading, data} = useQuery(LOGINDATA);
  console.log('login data', data);

  const textField1Data = {
    children: "Email Address",
  };
  
  const textField2Data = {
    children: data?.attributes?.input[1].placeholder || '',
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
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState<any>({
    email: {
      show: false,
      message: ''
    },
    password: {
      show: false,
      message: ''
    },
  })
  
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState<boolean>(false)
  const [isSignInDisabled, toggleSignInDisabled] = useState<boolean>(true)
  const mailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  useEffect(() => {
    if(
      (formErrors.email.show && state.email) ||
      (formErrors.password.show && state.password) ||
      !state.email || 
      !state.password
    ) {
      toggleSignInDisabled(true)
    } else {
      toggleSignInDisabled(false)
    }
  
  }, [formErrors, state])
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: 'email' | 'password') => {
    const lclState = state;
    lclState[name] = e.target.value;

    if(name === 'email') {
      /** temporary static email validation */
      const matchFlag = e.target.value.match(mailRegex)

      if (matchFlag === null) {
        setFormErrors((state: any) => ({
          ...state,
          email: {
            show: true,
            message: 'Invalid email address'
          }
        }))
      } else {
        setFormErrors((state: any) => ({
          ...state,
          email: {
            show: false,
            message: ''
          }
        }))
      }
    }
    setState({...state, ...lclState});
  }

  const submit = (e:any)  => {
    // console.log('hex: ', state)
    /** API call to validate */

    e.preventDefault()
    /**SImulate floating message */
    if(state.email && state.password) {
      setSnackbarErrorMessage(true)
    }
  }

  
  return (
    <Grid className="loginContainer" container direction='row' item xs={12}>
      <SideContent />
      <Grid className="contentContainer" display='flex' alignItems="center" justifyContent="center" item
        sm={6} md={9} lg={9} xl={9}>
        <Grid className="content">
          <Grid className="">
            <div className="header">
              Sign in to neom heritage
            </div>
          </Grid>
          <div className="subHeader">
            Enter your details below
          </div>
          <TextInput className={`login-email`} label="Email Address" value={state.email} 
          error={formErrors.email.message ? true : false} errorText={formErrors.email.message} onChange={(e) => handleChange(e, 'email')} />
          <TextInput className={`login-pwd`} label="Password" type={"password"} value={state.password} onChange={(e) => handleChange(e, 'password')} />
          <Button className={'sign-in-btn'} label="SIGN IN" disabled={isSignInDisabled} onClick={submit} />
          
        </Grid>
        <div className="bottomText">
          <p>Don’t have an account yet or forgot your password?</p>
          <p>Contact <span>
            <a
              href="support@neomheritage.com"
              target={'_blank'}
            >
              support@neomheritage.com
            </a>
          </span></p>
        </div>
      </Grid>
      <PositionedSnackbar
        message={'User not found'}
        severity={'error'} 
        open={snackbarErrorMessage} 
        handleClose={() => setSnackbarErrorMessage(false)}
      />
    </Grid>
  );
};
