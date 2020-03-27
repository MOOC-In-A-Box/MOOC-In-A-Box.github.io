import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function CreateCourseDialog(props){
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();

  
  function onCourseTitleChange(e){
    setTitle(e.target.value);
  }

  function onCourseDescriptionChange(e){
    setDescription(e.target.value);

  }

  function handleSubmit(){
      console.log(`Title: ${title}`);
      console.log(`Description: ${description}`);
      const courseDetails = {
          title,
          description
      }

      props.handleSubmit(courseDetails);
  }


    return (
      <div>
        <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create A New Course</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Create a new course. Start by entering a title and description below!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Course Title"
              onChange={onCourseTitleChange}
              type="text"
              fullWidth
            />
             <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Course Description"
              onChange={onCourseDescriptionChange}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  export default CreateCourseDialog