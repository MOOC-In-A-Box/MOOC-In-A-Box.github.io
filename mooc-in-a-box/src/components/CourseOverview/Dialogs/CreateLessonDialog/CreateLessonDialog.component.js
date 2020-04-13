import React, { useState } from 'react';

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

  function onCourseTitleChange(e) {
    setTitle(e.target.value);
  }

  function onCourseDescriptionChange(e) {
    setDescription(e.target.value);

  }

  function onVideoUrlChange(e) {
    setVideo(e.target.value);
  }

  function handleSubmit(e) {
    const id = props.lesson?.id ? props.lesson.id : undefined;
    let titleUpdate = title;
    let descrUpdate = description;
    let videoUpdate = video;
    if (props.lesson) {
      titleUpdate = titleUpdate ? titleUpdate : props.lesson.title;
      descrUpdate = descrUpdate ? descrUpdate : props.lesson.description;
      videoUpdate = videoUpdate ? videoUpdate : props.lesson.video;
    }
    const lessonInfo = {
      id,
      title: titleUpdate,
      description: descrUpdate,
      video: videoUpdate
    }
    props.updateLesson(lessonInfo, props.add);
  }

  let initialTitle;
  let initialDescription;
  let initialVideo;
  if (!props.add && props.lesson) {
    initialTitle = props.lesson.title;
    initialDescription = props.lesson.description;
    initialVideo = props.lesson.video;
  } else {
    initialTitle = "";
    initialDescription = "";
    initialVideo = "";
  }

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.add ? "Create New" : "Edit"} Lesson</DialogTitle>
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
            color="secondary"
            defaultValue={initialTitle}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Lesson Description"
            onChange={onCourseDescriptionChange}
            type="text"
            color="secondary"
            defaultValue={initialDescription}
            fullWidth
          />
          <TextField
            margin="dense"
            id="video"
            label="Video URL"
            onChange={onVideoUrlChange}
            type="text"
            color="secondary"
            defaultValue={initialVideo}
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