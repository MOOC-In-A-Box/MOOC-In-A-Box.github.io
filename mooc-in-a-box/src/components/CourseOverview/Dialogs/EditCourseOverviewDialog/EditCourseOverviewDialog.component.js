import React, { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function EditCourseOverviewDialog(props) {
  const [contentState, setContentState] = useState(props.course.overview);
  const [editorState, setEditorState] = useState();

  function handleSubmit(e) {
    const currentContentState = editorState.getCurrentContent();
    setContentState(convertToRaw(currentContentState));
    props.updateCourseOverview(convertToRaw(currentContentState));
  }

  useEffect(() => {
    if (contentState) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(contentState))));
    }
    else {
      setEditorState(EditorState.createEmpty());
    }
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

export default EditCourseOverviewDialog