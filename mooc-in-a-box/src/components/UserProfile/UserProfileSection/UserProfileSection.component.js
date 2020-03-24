import React from 'react';


import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditDialog from '../EditDialog/EditDialog.component';

const userKeyToDisplayMap = {
    "displayName": "Display Name",
    "email": "Email Address",
    "password": "Password"
  }

function UserProfileSection(props){
    return (
      <div>
        <Typography align="center" variant="h6" component="h6">
          <strong>{props.displayValue}</strong>
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

export default UserProfileSection
  