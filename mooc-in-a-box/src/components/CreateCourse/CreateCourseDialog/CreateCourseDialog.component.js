import React, { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
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
  const [isTitleError, setIsTitleError] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState();



  function onCourseTitleChange(e) {
    setTitle(e.target.value);
  }

  function onCourseDescriptionChange(e) {
    setDescription(e.target.value);

  }

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  };

  function onFileUploadChange({target}){
    // const fileReader = new FileReader();
    // const name = target.accept.includes('image') ? 'images' : 'videos';
    const file = target.files[0];
    setThumbnailFile(file);
  }


  function handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      setOverview(convertToRaw(newState.getCurrentContent()));

      return 'handled';
    }
    return 'not-handled';
  };

  function isValidTitle(){
    if (title && title.length > 0) {
      setIsTitleError(false)
      return true;
    } else {
      setIsTitleError(true);
      return false;
    }

  }

  function isValidDescription(){
    if (description && description.length > 0) {
      setIsDescriptionError(false)
      return true;
    } else {
      setIsDescriptionError(true);
      return false;
    }
    

  }


  function handleSubmit() {

    const titleIsGood = isValidTitle();
    const descriptionIsGood = isValidDescription();

    if( titleIsGood && descriptionIsGood){
      const currentContentState = editorState.getCurrentContent();
      setOverview(convertToRaw(currentContentState));

      const courseDetails = {
        title,
        description,
        overview: convertToRaw(currentContentState),
        thumbnailFile
      }
      props.handleSubmit(courseDetails);
    }
  }

  function handleClose(){
    setIsTitleError(false)
    setIsDescriptionError(false)
    setDescription(props.course?.description)
    setTitle(props.course?.title)
    setOverview(props.course?.overview)
    props.handleClose();
  }


  useEffect(() => {
    if (overview) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(overview))));
    }
    else {
      setEditorState(EditorState.createEmpty());
    }
  },[]);


  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create A New Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { 
              props.course ?
              "Edit this existing courses title, description, or overview."
              :
              "Create a new course. Start by entering at least the title and description below."
            }
            </DialogContentText>
          <TextField
            autoFocus
            required
            error={isTitleError}
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
            error={isDescriptionError}
            label="Course Description"
            required
            onChange={onCourseDescriptionChange}
            helperText="This is a required field and is shown on the card in the Course Library"
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
          <h4>Course Thumbnail:</h4>
          <Input
            label="Upload Course Thumbnail"
            type="file"
            onChange={onFileUploadChange}
            >
            
          </Input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
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