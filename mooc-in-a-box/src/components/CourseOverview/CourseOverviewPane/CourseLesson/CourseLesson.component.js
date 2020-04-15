import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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

    if (props.lesson) {
        const youtubeConfig = getVideoConfig();

        return (
            <div>
                <h3>{props.lesson.title}</h3>
                <h6>Link: {props.lesson.video}</h6>
                <strong>Description: </strong>
                <p>{props.lesson.description}</p>
                {
                    hasYoutubeVideo 
                    ?
                        <YouTube videoId={youtubeConfig.videoId} opts={youtubeConfig.opts} onReady={_onReady} />
                    :
                        ""
                }
                
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