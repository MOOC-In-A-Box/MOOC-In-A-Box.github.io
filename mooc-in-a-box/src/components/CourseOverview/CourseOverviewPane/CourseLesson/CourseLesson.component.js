import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { IconButton, Button, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, ContentState } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import './CourseLesson.css';

// Youtube Constants

const YoutubeComponentConfig = {
    opts: {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    },
    videoId: "BKorP55Aqvg"

}


function EditCourseLesson(props) {

    let hasYoutubeVideo = false;

    function _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }


    function openDeleteDialog(e){
        props.openDeleteDialog("Lesson", props.lesson);
    }


    function goToPreviousLesson() {
        props.navigateToPreviousLesson(props.lesson);
    }

    function goToNextLesson() {
        props.navigateToNextLesson(props.lesson);
    }

    function getButtonDiv() {
        if (props.isFirstLesson && props.isLastLesson) {
            return '';
        }

        let leftButton, rightButton;

        if (props.nextLesson || props.nextChapter) {
            leftButton =
                <Button variant="contained" onClick={goToNextLesson} className="next-button" color="secondary" endIcon={<ArrowForwardIosIcon />}>
                    {props.nextLesson ? "Next Lesson" : "Next Chapter"}
                </Button>
        }

        if (props.prevLesson || props.prevChapter) {
            rightButton =
                <Button variant="contained" onClick={goToPreviousLesson} className="previous-button" color="secondary" startIcon={<ArrowBackIosIcon />}>
                    {props.prevLesson ? "Previous Lesson" : "Previous Chapter"}
                </Button>
        }

        return (
            <div className="button-div">
                {leftButton}
                {rightButton}
            </div>
        )
    }

    function getVideoConfig() {
        const youtubeConfig = { ...YoutubeComponentConfig };
        const url = props.lesson?.video;
        if (url && url.includes("youtube") && (url.includes("v="))) {
            const myParamters = url.split("?");
            var searchParams = new URLSearchParams(myParamters[1]);
            youtubeConfig.videoId = searchParams.get('v');
            hasYoutubeVideo = true;
        }
        return youtubeConfig;
    }

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    let content = undefined;
    if (props.lesson?.description && isJson(props.lesson.description)) {
        const contentStateObj = JSON.parse(props.lesson.description);
        const editorState = EditorState.createWithContent(convertFromRaw(contentStateObj));
        content = <Editor
            toolbarHidden
            editorState={editorState}
            readOnly={true}
        />
    }
    else {
        const text = props.lesson?.description ? props.lesson.description : "No text entered.";
        content = <Editor
            toolbarHidden
            editorState={EditorState.createWithContent(ContentState.createFromText(text))}
            readOnly={true}
        />
    }

    if (props.lesson) {
        const youtubeConfig = getVideoConfig();

        return (
            <div>
                <span className="class-title">
                    <p> {props.lesson.title}
                    {   props.editable ? 
                        <IconButton onClick={openDeleteDialog}>
                            <DeleteForeverIcon/>
                        </IconButton>
                        :
                        ''
                    }
                    </p>
                </span>
                {
                    hasYoutubeVideo
                        ?
                        <YouTube videoId={youtubeConfig.videoId} opts={youtubeConfig.opts} onReady={_onReady} />
                        :
                        ""
                }
                {content}
                {getButtonDiv()}
            </div>
        )
    } else {
        return (
            <div>
                <h5> No Lesson Details </h5>
            </div>
        )
    }
}

export default EditCourseLesson;