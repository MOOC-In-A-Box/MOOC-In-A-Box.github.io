import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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
            <Button onClick={props.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={props.handleSubmit} color="secondary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  export default EditDialog