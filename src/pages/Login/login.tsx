import React, {useState} from "react";
import { Grid, ThemeProvider, Typography } from "@mui/material";
import { useQuery, gql } from '@apollo/client';
import LoginCom from '../../components/Login';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import './style.css';
import useFetch from '../../hooks/useFetch';
import { SideContent } from './sideContent';

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: 'email' | 'password') => {
    const lclState = state;
    lclState[name] = e.target.value;
    setState({...state, ...lclState});
  }

  const submit = () => {

  }

  
  return (
    <Grid className="loginContainer" container direction='row' item xs={12} md={12}>
      <SideContent />
      <Grid className="contentContainer" display='flex' alignItems="center" justifyContent="center" item
        sm={8} md={4} lg={8}>
        <Grid className="content">
          <Grid className="">
            <div className="header">
              Sign in to neom heritage
            </div>
          </Grid>
          <div className="subHeader">
            Enter your details below
          </div>
          <TextInput className={`login-email`} label="Email Address" value={state.email} onChange={(e) => handleChange(e, 'email')} />
          <TextInput className={`login-pwd`} label="Password" type={"password"} value={state.password} onChange={(e) => handleChange(e, 'password')} />
          <Button className={'sign-in-btn'} label="SIGN IN" disabled={true} onClick={submit} />
          
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
      
    </Grid>
  );
};
