import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function CreateChapterDialog(props){
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();

  
  function onCourseTitleChange(e){
    setTitle(e.target.value);
  }

  function onCourseDescriptionChange(e){
    setDescription(e.target.value);

  }

  function handleSubmit(e){
      const chapterInfo = {
          title,
          description
      }

      props.handleSubmit(chapterInfo);
  }


    return (
      <div>
        <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create New Chapter</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Create a new chapter within your course. Enter a title and description below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Chapter Title"
              onChange={onCourseTitleChange}
              type="text"
              fullWidth
            />
             <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Chapter Description"
              onChange={onCourseDescriptionChange}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  export default CreateChapterDialog