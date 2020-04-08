import React from 'react';
import Paper from '@material-ui/core/Paper';
import CourseLesson from './CourseLesson/CourseLesson.component';
import { Button } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, ContentState } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function CourseOverviewPane(props) {

    let openEditCourseOverviewDialogButton;
    if (props.editable) {
        openEditCourseOverviewDialogButton = <Button onClick={props.openEditCourseOverviewDialog} color="secondary" variant="contained"> Edit Overview </Button>
    }

    let content = undefined;
    if (props.course.overview) {
        const contentStateObj = JSON.parse(props.course.overview);
        const editorState = EditorState.createWithContent(convertFromRaw(contentStateObj));
        content = <Editor
            toolbarHidden
            editorState={editorState}
            readOnly={true}
        />
    }
    else {
        content = <Editor
            toolbarHidden
            editorState={EditorState.createWithContent(ContentState.createFromText("No text entered."))}
            readOnly={true}
        />
    }

    return (
        <Paper className="paper">
            {props.activeChapter ?
                <div>
                    <h2>Chapter: {props.activeChapter.title}</h2>
                    <CourseLesson lesson={props.activeLesson} />
                </div> :
                <div>
                    {content}
                    {openEditCourseOverviewDialogButton}
                </div>
            }
        </Paper>
    )
}

export default CourseOverviewPane;