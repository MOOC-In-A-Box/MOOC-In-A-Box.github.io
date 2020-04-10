import React from 'react';
import Paper from '@material-ui/core/Paper';
import CourseLesson from './CourseLesson/CourseLesson.component';
import { Button } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, ContentState } from "draft-js";

import './CourseOverviewPane.css'



import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function CourseOverviewPane(props) {

    function navigateToNextLesson(lesson){
        console.log("NAVIGATE TO NEXT LESSON FROM: ", lesson);
        const indexOfCurrentLesson = props.activeChapter.lessons.indexOf(lesson);
        props.setActiveLesson(props.activeChapter.lessons[indexOfCurrentLesson + 1]);
    }

    function navigateToPreviousLesson(lesson){
        console.log("NAVIGATE TO PREVIOUS LESSON FROM: ", lesson);
        const indexOfCurrentLesson = props.activeChapter.lessons.indexOf(lesson);
        props.setActiveLesson(props.activeChapter.lessons[indexOfCurrentLesson - 1]);

    }


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

    function getLessonInformation(){
        // props.activeChapter.lessons
        const lengthOfLessons = props.activeChapter.lessons.length;
        const indexOfActiveLesson = props.activeChapter.lessons.indexOf(props.activeLesson);
        return [(indexOfActiveLesson === 0), (indexOfActiveLesson === (lengthOfLessons - 1))]
    }


    let isFirstLesson, isLastLesson = false;
    if (props.activeLesson) {
        [ isFirstLesson, isLastLesson ] = getLessonInformation();
    }
    // if (props.activeLesson)

    return (
        <Paper className="paper">
            {props.activeChapter ?
                <div>
                    <h2>Chapter: {props.activeChapter.title}</h2>
                    <CourseLesson 
                        navigateToNextLesson={navigateToNextLesson} 
                        navigateToPreviousLesson={navigateToPreviousLesson}
                        isFirstLesson={isFirstLesson} 
                        isLastLesson={isLastLesson} 
                        lesson={props.activeLesson} 
                    />
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