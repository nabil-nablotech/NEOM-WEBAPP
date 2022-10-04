import React from 'react';
import { Grid } from '@mui/material';
import login_bg from '../../assets/images/login_bg.png';
import logo_with_name from '../../assets/images/logo_with_name.png';
import './style.css';

export const SideContent = () => {
  return (
    <Grid item sm={6} md={2} lg={4} xl={4} className='sideGrid'>
      <div className='bgImgContainer'>
        <img src={login_bg} className="bgImg" />
        <Grid display={'flex'} item alignItems={'center'} justifyContent={'center'}>

          <img src={logo_with_name} className="logo" />
        </Grid>
      </div>
    </Grid>
  )
}
