import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function CreateLessonDialog(props){
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [video, setVideo] = useState();


  
  function onCourseTitleChange(e){
    setTitle(e.target.value);
  }

  function onCourseDescriptionChange(e){
    setDescription(e.target.value);

  }

  function onVideoUrlChange(e){
      setVideo(e.target.value);
  }



  function handleSubmit(e){
      const lessonInfo = {
          title,
          description,
          video
      }
      props.addNewLesson(lessonInfo);

  }

    return (
      <div>
        <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create New Lesson</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Add a new lesson to your course
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Lesson Title"
              onChange={onCourseTitleChange}
              type="text"
              fullWidth
            />
             <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Lesson Description"
              onChange={onCourseDescriptionChange}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="video"
              label="Video URL"
              onChange={onVideoUrlChange}
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

  export default CreateLessonDialog