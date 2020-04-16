import React, { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './CreateCourseDialog.css'


function CreateCourseDialog(props) {
  const [description, setDescription] = useState(props.course?.description);
  const [title, setTitle] = useState(props.course?.title);
  const [editorState, setEditorState] = useState();
  const [overview, setOverview] = useState(props.course?.overview);


  function onCourseTitleChange(e) {
    setTitle(e.target.value);
  }

  function onCourseDescriptionChange(e) {
    setDescription(e.target.value);

  }

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  };


  function handleKeyCommand(command) {
    console.log("In here: ", command);
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      setOverview(convertToRaw(newState.getCurrentContent()));

      return 'handled';
    }
    return 'not-handled';
  };



  function handleSubmit() {

    const currentContentState = editorState.getCurrentContent();
    setOverview(convertToRaw(currentContentState));

    const courseDetails = {
      title,
      description,
      overview: convertToRaw(currentContentState)
    }
    console.log(courseDetails);
    props.handleSubmit(courseDetails);
  }



  useEffect(() => {
    if (overview) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(overview))));
    }
    else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);


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
            color="secondary"
            value={title}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Course Description"
            onChange={onCourseDescriptionChange}
            helperText="This is the text that is shown on the Course Card in the course library"
            type="text"
            color="secondary"
            value={description}
            fullWidth
          />
          <h4>Course Overview:</h4>
          <div className="course-overview-section">
            <Editor
              editorState={editorState}
              editorClassName="editor-textbox"
              handleKeyCommand={handleKeyCommand}
              onEditorStateChange={onEditorStateChange}
              label="Course Overview"
            />
          </div>
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

export default CreateCourseDialog