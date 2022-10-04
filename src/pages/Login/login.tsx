import React, {useState} from "react";
import { Grid, Typography } from "@mui/material";
import { useQuery, gql } from '@apollo/client';
import {SideContent} from './sideContent';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import './style.css';
import useFetch from '../../hooks/useFetch';

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
  const {error, loading, data} = useFetch('https://7ca1-49-204-165-45.in.ngrok.io/api/login?populate=*');
  // const {error, loading, data} = useQuery(LOGINDATA);
  console.log('login data', data);
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
    <Grid className="loginContainer" container direction='row' item xs={12}>
        <SideContent />
        <Grid className="contentContainer" display='flex' alignItems="center" justifyContent="center" item sm={8} md={8} lg={8}>
          <Grid className="content">
            <Grid className="">
              <Typography className="header">
              Sign in to neom heritage
              </Typography>
            </Grid>
            <Typography className="subHeader">
            Enter your details below
            </Typography>
            <TextInput label="Email Address" value={state.email} onChange={(e) => handleChange(e, 'email')} />
            <TextInput label="Password" type={"password"} value={state.password} onChange={(e) => handleChange(e, 'password')} />
            <Button label="SIGN IN" onClick={submit}/>
          </Grid>
        </Grid>
    </Grid>
  );
};

const searchField2Data = {
  className: "search-field-1",
};

const userMenu2Data = {
  className: "user-menu-1",
};

const landingPageData = {
  searchFieldProps: searchField2Data,
  userMenuProps: userMenu2Data,
};

const textField1Data = {
  children: "Email Address",
};

const textField2Data = {
  children: "Password",
  className: "text-field-1",
};

const group26088471Data = {
  textField1Props: textField1Data,
  textField2Props: textField2Data,
};

const loginData = {
  group2608847Props: group26088471Data,
};

const textField3Data = {
  children: "Email Address",
};

const textField4Data = {
  children: "Password",
  className: "text-field-3",
};

const group26088472Data = {
  className: "group-2608847-1",
  textField1Props: textField3Data,
  textField2Props: textField4Data,
};

const group26088462Data = {
  className: "group-2608846-1",
};

const loginIpadData = {
  group2608847Props: group26088472Data,
  group2608846Props: group26088462Data,
};

const textField5Data = {
  children: "Email Address",
  className: "text-field-4",
};

const textField6Data = {
  children: "Password",
  className: "text-field-5",
};

const button22Data = {
  children: "SIGN IN",
};

const frame2608161Data = {
  textField1Props: textField5Data,
  textField2Props: textField6Data,
  button22Props: button22Data,
};

const textField32Data = {
  children: "Email Address",
};

const textField33Data = {
  children: "Password",
  className: "text-field-7",
};

const login1Data = {
  overlapGroup1: "./src/assets/images/rectangle-126-1@2x.png",
  image3: "../../assets/images/image-3-1@2x.png",
  spanText1: "Sign in to neom heritage",
  spanText2: "Enter your details below",
  spanText3: "Sign in",
  spanText4: "Don’t have an account yet or forgot your password? ",
  spanText5: "Contact                                               m",
  spanText6: "support@",
  spanText7: "neomheritage",
  spanText8: ".com",
  textField1Props: textField32Data,
  textField2Props: textField33Data,
};

const textField34Data = {
  children: "Email Address",
};

const textField35Data = {
  children: "Password",
  className: "text-field-9",
};

const iPadPro119Data = {
  overlapGroup: "/img/rectangle-126-2@2x.png",
  image3: "/img/image-3-1@2x.png",
  spanText1: "Sign in to neom heritage",
  spanText2: "Enter your details below",
  spanText3: "Sign in",
  spanText4: "Don’t have an account yet or forgot your password? ",
  spanText5: "Contact                                               m",
  spanText6: "support@",
  spanText7: "neomheritage",
  spanText8: ".com",
  textField1Props: textField34Data,
  textField2Props: textField35Data,
};
