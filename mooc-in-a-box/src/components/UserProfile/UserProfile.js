import React, { useState } from 'react';
import './UserProfile.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserProfileSection from './UserProfileSection/UserProfileSection.component';
import * as FirebaseService from '../../service/firebase.service';

const passwordValue = "*******";

function UserProfile(props) {

  const [displayName, setDisplayName] = useState(null);
  const [oldDisplayName, setOldDiplayName] = useState(null);
  const [error, setError] = useState();
  const [isDisplayNameDialogOpen, setIsDisplayNameDialogOpen] = useState(false)

 function  handleDisplayNameClose(){
    setDisplayName(oldDisplayName)
    setIsDisplayNameDialogOpen(false)
  }

  function handleDisplayNameSubmit(){
    FirebaseService.updateUser(props.user.id, {
      displayName
    }).then( result => {
        setIsDisplayNameDialogOpen(false)
        setOldDiplayName(displayName)
      })
      .catch( err => {
        console.log(err);
      })
  
  }
 
  function openDisplayNameDialog(){
    setOldDiplayName(displayName)
    setIsDisplayNameDialogOpen(true)
  }

  function onDisplayNameChange(e){
    setDisplayName(e.target.value);
  }

  if (props.user && displayName === null){
    setDisplayName(props.user.displayName)
  }

  if (props.user){
    return (
      <div className="userProfile">
        <CssBaseline />
        <Typography className="center" variant="h3" component="h3">
            User Profile
        </Typography>
        <Container maxWidth="lg">
          <Paper className="paper">
  
            <UserProfileSection 
              displayKey={"displayName"} 
              value={displayName}
              handleClose={handleDisplayNameClose}
              handleSubmit={handleDisplayNameSubmit}  
              isDialogOpen={isDisplayNameDialogOpen} 
              openDialog={openDisplayNameDialog}  
              onChange={onDisplayNameChange}
            ></UserProfileSection>
            <Divider />
            <UserProfileSection displayKey="email" value={props.user.email}></UserProfileSection>
            <Divider />
            <UserProfileSection displayKey="password" value={passwordValue}></UserProfileSection>
  
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
