import React, { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
// import { Editor } from 'react-draft-wysiwyg';
import { ContentState, Editor, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function EditCourseOverviewDialog(props) {
  const [overview, setOverview] = useState();
  const [contentState, setContentState] = useState(props.course.overview);
  const [editorState, setEditorState] = useState();

  // handle initial content

  function handleSubmit(e) {
    // parse from editor state
    // setOverview(e.target.value);

    const currentContentState = editorState.getCurrentContent();
    setContentState(convertToRaw(currentContentState));
    props.updateCourseOverview(currentContentState);
  }

  useEffect(() => {

    // if (contentState) {
    const contentStateObj = JSON.parse(contentState);
    //   // contentStateObj.blocks = [];  // working around a bug??
    // setEditorState(EditorState.createWithContent(convertFromRaw(contentStateObj)));
    // }
    // else {
    // setEditorState(EditorState.createEmpty());
    // }
    setEditorState(EditorState.createWithContent(ContentState.createFromText("hello")));
  }, []);

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  };

  function handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (


    <div>
      <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Course Overview</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit course information, providing students with a basic description of the class and learning objectives.
            </DialogContentText>
          <Editor
            editorState={editorState}
            // toolbarClassName="toolbarClassName"
            // wrapperClassName="wrapperClassName"
            // editorClassName="editorClassName"
            handleKeyCommand={handleKeyCommand}
            onChange={onEditorStateChange}
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

export default EditCourseOverviewDialog