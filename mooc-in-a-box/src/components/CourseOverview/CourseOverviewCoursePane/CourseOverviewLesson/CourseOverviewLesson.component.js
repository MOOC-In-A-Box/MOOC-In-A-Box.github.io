import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';


function CourseOverviewLesson(props) {
    return (
        <div>
            <h3>{props.lesson.title}</h3>
            <h6>Link: {props.lesson.video}</h6>
            <strong>Description: </strong>
            <p>{props.lesson.description}</p>
        </div>
    )
}

export default CourseOverviewLesson;