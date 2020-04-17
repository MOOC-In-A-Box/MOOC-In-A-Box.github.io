import React, { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, ContentState, convertToRaw, RichUtils } from "draft-js";

import './CreateLessonDialog.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function CreateLessonDialog(props) {
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [video, setVideo] = useState();
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isYoutubeError, setIsYoutubeError] = useState(false);
  const [editorState, setEditorState] = useState();

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
    const currentContentState = editorState.getCurrentContent();
    setDescription(JSON.stringify(convertToRaw(currentContentState)));
  };

  function handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  function onCourseTitleChange(e) {
    setTitle(e.target.value);
  }

  function onVideoUrlChange(e) {
    setVideo(e.target.value);
  }

  function isValidTitle() {
    if (title && title.length > 0) {
      setIsTitleError(false)
      return true;
    } else {
      setIsTitleError(true);
      return false;
    }

  }

  function isValidDescription() {
    if (description && (isJson(description) || description.length > 0)) {
      setIsDescriptionError(false)
      return true;
    } else {
      setIsDescriptionError(true);
      return false;
    }
  }

  function isValidYoutubeURL() {
    if (video === undefined || video.length === 0) {
      setIsYoutubeError(false);
      return true;
    } else if (video && video.includes("youtube") && (video.includes("v="))) {
      setIsYoutubeError(false);
      return true;
    } else {
      setIsYoutubeError(true);
      return false;
    }
  }

  function handleSubmit(e) {
    const id = props.lesson?.id ? props.lesson.id : undefined;

    const currentContentState = editorState.getCurrentContent();
    const descriptionJSON = JSON.stringify(convertToRaw(currentContentState));
    setDescription(descriptionJSON);

    let tempVideo = "";
    if (isValidTitle() && isValidDescription() && isValidYoutubeURL()) {
      if (video === undefined || video.length === 0) {
        setVideo(""); // So firebase won't die with undefined.
      } else {
        tempVideo = video;
      }
      const lessonInfo = {
        id,
        title,
        description: descriptionJSON,
        video: tempVideo,
      }
      props.updateLesson(lessonInfo, props.add);
    }
  }

  function handleClose() {
    // Reset State
    setTitle();
    setVideo();
    setDescription();
    setIsTitleError(false);
    setIsDescriptionError(false);
    setIsYoutubeError(false);
    setEditorState(EditorState.createEmpty());
    props.handleClose();
  }

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (!props.add && props.lesson) {
      setTitle(props.lesson.title);
      setDescription(props.lesson.description);
      setVideo(props.lesson.video);
      if (props.lesson.description) {
        if (isJson(props.lesson.description)) {
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(props.lesson.description))));
        } else {
          // For backwards compatibility
          setEditorState(EditorState.createWithContent(ContentState.createFromText(props.lesson.description)));
        }
      }
      else {
        setEditorState(EditorState.createEmpty());
      }
    } else {
      setTitle()
      setDescription()
      setVideo()
      setEditorState(EditorState.createEmpty());
    }

  }, [props]);

  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
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
            margin="normal"
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
            margin="normal"
            error={isYoutubeError}
            id="video"
            label="Video URL (optional)"
            onChange={onVideoUrlChange}
            type="text"
            color="secondary"
            value={video}
            helperText={isYoutubeError ? "Youtube URL is malformed. It must have the form: https://www.youtube.com?v=<SomeCharacterString>" : ""}
            fullWidth
          />
          <Editor
            editorState={editorState}
            wrapperClassName="editor-wrapper"
            editorClassName="editor-textbox"
            handleKeyCommand={handleKeyCommand}
            onEditorStateChange={onEditorStateChange}
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