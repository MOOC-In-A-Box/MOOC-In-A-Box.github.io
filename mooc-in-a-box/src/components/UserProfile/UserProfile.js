import React from 'react';
import './UserProfile.css';
import {Button} from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';



import { FormControl, FormHelperText, InputLabel, Input, IconButton } from '@material-ui/core';


const userKeyToDisplayMap = {
  "displayName": "Display Name",
  "email": "Email Address",
  "password": "Password"
}

const passwordValue = "*******";

function UserProfileSectionComponent(props){
  return (
    <div>
      <Typography align="center" variant="h6" component="h6">
        <strong>{userKeyToDisplayMap[props.displayKey]}</strong>
      </Typography>
      <Typography align="center" variant="body1" component="body1">
        <span>
        {props.value}
          <IconButton className="menu-button" color="inherit" aria-label="menu">
            <EditIcon />
          </IconButton>
        </span>
      </Typography>
    </div>
  )
}





function UserProfile(props) {
  console.log(props);
  if (props.user){
    return (
      <div className="userProfile">
        <CssBaseline />
        <Typography className="center" variant="h3" component="h3">
            User Profile
        </Typography>
        <Container maxWidth="lg">
          <Paper className="paper">
  
            <UserProfileSectionComponent displayKey={"displayName"} value={props.user.displayName}></UserProfileSectionComponent>
            <Divider />
            <UserProfileSectionComponent displayKey="email" value={props.user.email}></UserProfileSectionComponent>
            <Divider />
            <UserProfileSectionComponent displayKey="password" value={passwordValue}></UserProfileSectionComponent>
  
          </Paper>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        Loading..
        <CircularProgress></CircularProgress>
      </div>
    )
  }

}

export default UserProfile;
