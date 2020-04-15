import React from 'react';
import Paper from '@material-ui/core/Paper';
import CourseLesson from './CourseLesson/CourseLesson.component';
import { Button } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, ContentState } from "draft-js";

import './CourseOverviewPane.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function CourseOverviewPane(props) {

    let lessonArray = [];
    for (let i = 0; i < props.course.chapters.length; i++) {
        for (let j = 0; j < props.course.chapters[i].lessons?.length; j++) {
            lessonArray.push(props.course.chapters[i].lessons[j]);
        }
    }

    function navigateToNextLesson(lesson) {
        const indexOfCurrentLesson = props.activeChapter.lessons.indexOf(lesson);
        if (indexOfCurrentLesson !== props.activeChapter.lessons.length - 1) {
            props.setActiveLesson(props.activeChapter.lessons[indexOfCurrentLesson + 1]);
            return;
        } else {
            const activeChapterIndex = props.course.chapters.indexOf(props.activeChapter);
            const nextChapter = props.course.chapters[activeChapterIndex + 1];
            props.setChapterInContext(nextChapter);
            props.setActiveLesson(nextChapter.lessons[0]);
        }
    }

    function navigateToPreviousLesson(lesson) {
        const indexOfCurrentLesson = props.activeChapter.lessons.indexOf(lesson);

        if (indexOfCurrentLesson !== 0) {
            props.setActiveLesson(props.activeChapter.lessons[indexOfCurrentLesson - 1]);
            return;
        } else {
            const activeChapterIndex = props.course.chapters.indexOf(props.activeChapter);
            const prevChapter = props.course.chapters[activeChapterIndex - 1];
            props.setChapterInContext(prevChapter);
            props.setActiveLesson(prevChapter.lessons[prevChapter.lessons.length - 1]);
        }

    }

    function openLessonModal() {
        props.openLessonModal(/**addLesson=*/false);
    }


    let openEditCourseOverviewDialogButton;
    let addNewLessonButton;
    if (props.editable) {
        openEditCourseOverviewDialogButton = <Button onClick={props.openEditCourseOverviewDialog} color="secondary" variant="contained"> Edit Overview </Button>
        addNewLessonButton = <Button variant="contained" onClick={openLessonModal} color="secondary" className="add-content-btn"> Edit Lesson </Button>
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

    function getLessonInformation() {
        let prevLesson, nextLesson, prevChapter, nextChapter = false;

        if (props.activeLesson) {
            const currentLessonIndex = lessonArray.indexOf(props.activeLesson);
            const currentLessonIndexInChapter = props.activeChapter.lessons.indexOf(props.activeLesson);
            const numLessonsInChapter = props.activeChapter.lessons.length;
            const numChapters = props.course.chapters.length;
            const activeChapterIndex = props.course.chapters.indexOf(props.activeChapter);

            prevLesson = currentLessonIndexInChapter > 0;
            nextLesson = currentLessonIndexInChapter < numLessonsInChapter - 1;
            prevChapter = currentLessonIndexInChapter === 0 && currentLessonIndex > 0
            nextChapter = currentLessonIndexInChapter === numLessonsInChapter - 1
                && currentLessonIndex < lessonArray.length - 1
                && activeChapterIndex !== numChapters - 1;
        }

        return [prevLesson, nextLesson, prevChapter, nextChapter]
    }


    let prevLesson, nextLesson, prevChapter, nextChapter = false;
    if (props.activeLesson) {
        [prevLesson, nextLesson, prevChapter, nextChapter] = getLessonInformation();
    }

    return (
        <Paper className="paper">
            {props.activeChapter ?
                <div>
                    <h2>Chapter: {props.activeChapter.title}</h2>
                    <CourseLesson
                        navigateToNextLesson={navigateToNextLesson}
                        navigateToPreviousLesson={navigateToPreviousLesson}
                        prevLesson={prevLesson}
                        nextLesson={nextLesson}
                        prevChapter={prevChapter}
                        nextChapter={nextChapter}
                        lesson={props.activeLesson}
                    />
                    {addNewLessonButton}
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