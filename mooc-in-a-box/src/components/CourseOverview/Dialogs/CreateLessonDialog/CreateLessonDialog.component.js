import React, { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function CreateLessonDialog(props) {
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [video, setVideo] = useState();
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isYoutubeError, setIsYoutubeError] = useState(false);

  function onCourseTitleChange(e) {
    setTitle(e.target.value);
  }

  function onCourseDescriptionChange(e) {
    setDescription(e.target.value);

  }

  function onVideoUrlChange(e) {
    setVideo(e.target.value);
  }

  function isValidTitle(){
    console.log("TITLE: ", title);
    if (title && title.length > 0){
      setIsTitleError(false)
      return true;
    } else {
      setIsTitleError(true);
      console.log("TITLE ERROR: ", isTitleError)
      return false;
    }

  }

  function isValidDescription() {
    console.log("DESCRIPTION: ", description);

    if (description && description.length > 0){
      setIsDescriptionError(false)
      return true;
    } else {
      setIsDescriptionError(true);
      return false;
    }
  }

  function isValidYoutubeURL(){
    if (video && video.includes("youtube") && (video.includes("v="))) {
      setIsYoutubeError(false);
      return true;
    } else {
      setIsYoutubeError(true);
      return false;
    }
  }

  function handleSubmit(e) {
    const id = props.lesson?.id ? props.lesson.id : undefined;

    if( isValidTitle() && isValidDescription() && isValidYoutubeURL() ){
      const lessonInfo = {
        id,
        title,
        description,
        video
      }
      props.updateLesson(lessonInfo, props.add);
    } 
  }

  function handleClose(){
    // Reset State
    setTitle();
    setVideo();
    setDescription();
    setIsTitleError(false);
    setIsDescriptionError(false);
    setIsYoutubeError(false);
    props.handleClose();
  }

  useEffect( () => {
    if (!props.add && props.lesson) {
      console.log("Coming in here....");
      setTitle(props.lesson.title);
      setDescription(props.lesson.description);
      setVideo(props.lesson.video);
    } else {
      setTitle()
      setDescription()
      setVideo()
    }
  }, [props]);

  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.add ? "Create New" : "Edit"} Lesson</DialogTitle>
        <DialogContent>
          {props.add ? 
            <DialogContentText>
              Add a new lesson to your course
            </DialogContentText>
          :
            <DialogContentText>
              Edit existing lesson
            </DialogContentText>
          }

          <TextField
            autoFocus
            required
            margin="dense"
            error={isTitleError}
            id="title"
            label="Lesson Title"
            onChange={onCourseTitleChange}
            type="text"
            color="secondary"
            value={title}  
            helperText={isTitleError ? "Title is a required field" : ""}
            fullWidth
          />
          <TextField
            margin="dense"
            required
            error={isDescriptionError}
            id="description"
            label="Lesson Description"
            onChange={onCourseDescriptionChange}
            type="text"
            color="secondary"
            value={description}
            helperText={isDescriptionError ? "Description is a required field" : ""}
            fullWidth
          />
          <TextField
            margin="dense"
            error={isYoutubeError}
            id="video"
            label="Video URL"
            onChange={onVideoUrlChange}
            type="text"
            color="secondary"
            value={video}
            helperText={isYoutubeError ? "Youtube URL is malformed. It must have the form: https://www.youtube.com?v=<SomeCharacterString>" : ""}

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