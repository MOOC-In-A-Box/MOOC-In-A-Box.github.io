import React, { useState } from 'react';
import './UserProfile.css';
import {Button} from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FormControl, FormHelperText, InputLabel, Input, IconButton } from '@material-ui/core';

import * as FirebaseService from '../../service/firebase.service'


const userKeyToDisplayMap = {
  "displayName": "Display Name",
  "email": "Email Address",
  "password": "Password"
}

const passwordValue = "*******";



function EditDialog(props){
  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.field}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the Field below to update your {props.field}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={props.field}
            value={props.value}
            onChange={props.onChange}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}




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
            <EditIcon onClick={props.openDialog}/>
          </IconButton>
        </span>
      </Typography>
      <EditDialog 
        isOpen={props.isDialogOpen}
        handleClose={props.handleClose}
        handleSubmit={props.handleSubmit}
        field={userKeyToDisplayMap[props.displayKey]}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}





function UserProfile(props) {

  const [displayName, setDisplayName] = useState(null);
  const [error, setError] = useState();
  const [isDisplayNameDialogOpen, setIsDisplayNameDialogOpen] = useState(false)

 function  handleDisplayNameClose(){
    setIsDisplayNameDialogOpen(false)
  }

  function handleDisplayNameSubmit(){
    FirebaseService.updateUser(props.user.id, {
      displayName
    }).then( result => {
        setIsDisplayNameDialogOpen(false)
      })
      .catch( err => {
        console.log(err);
      })
  
  }
 
  function openDisplayNameDialog(){
    setIsDisplayNameDialogOpen(true)
  }

  function onDisplayNameChange(e){
    setDisplayName(e.target.value);
  }

  if (props.user && displayName === null){
    setDisplayName(props.user.displayName)
  }

  if (props.user){
    console.log(props.user);
    return (
      <div className="userProfile">
        <CssBaseline />
        <Typography className="center" variant="h3" component="h3">
            User Profile
        </Typography>
        <Container maxWidth="lg">
          <Paper className="paper">
  
            <UserProfileSectionComponent 
              displayKey={"displayName"} 
              value={displayName}
              handleClose={handleDisplayNameClose}
              handleSubmit={handleDisplayNameSubmit}  
              isDialogOpen={isDisplayNameDialogOpen} 
              openDialog={openDisplayNameDialog}  
              onChange={onDisplayNameChange}
            ></UserProfileSectionComponent>
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
